import dotenv from "dotenv";
import express from "express";
import { login } from "./controllers/authController";
import { loginValidation } from "./validators/loginValidation";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.post("/auth/login", loginValidation, login);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

main();
