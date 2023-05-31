import { z } from "zod";
import { usernameRegex, passwordRegex } from "../constants/regex";
import type { Request, Response, NextFunction } from "express";

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  req.body = {
    username: validUsername.data,
    password: validPassword.data,
  };

  return next();
};
