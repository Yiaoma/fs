import express from "express";
import * as authController from "../controllers/authController";
import { loginValidation } from "../validators/loginValidation";

export const authRouter = express.Router();

authRouter.post("/login", loginValidation, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refresh);
