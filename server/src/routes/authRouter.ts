import express from "express";
import * as authController from "../controllers/authController";
import { loginValidation } from "../validators/loginValidation";

export const authRouter = express.Router();

authRouter.post("/login", loginValidation, authController.login);
