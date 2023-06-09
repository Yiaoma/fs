import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import type { Request, Response } from "express";
import { createAccessToken, createRefreshToken } from "../utils/createToken";

interface UserJWTPayload {
  id: string;
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = createAccessToken(user.id);

    const refreshToken = createRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("jid", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.jid;

  if (!refreshToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let decodedRefreshToken;
  try {
    decodedRefreshToken = (await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    )) as UserJWTPayload;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decodedRefreshToken.id },
    });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });

    res.clearCookie("jid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.jid;
  if (!refreshToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let decodedRefreshToken;
  try {
    decodedRefreshToken = (await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    )) as UserJWTPayload;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decodedRefreshToken.id },
    });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const accessToken = createAccessToken(user.id);

    return res.status(200).send({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
