import { z } from "zod";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import type { Request, Response } from "express";

const usernameRegex = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const validUsername = z
    .string()
    .trim()
    .regex(usernameRegex)
    .safeParse(username);
  if (!validUsername.success) {
    return res.status(401).json({ error: "Invalid username" });
  }

  const validPassword = z.string().regex(passwordRegex).safeParse(password);
  if (!validPassword.success) {
    return res.status(401).json({ error: "Invalid password" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: validUsername.data },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      validPassword.data
    );
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

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
