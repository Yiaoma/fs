import dotenv from "dotenv";
import express from "express";
import { authRouter } from "./routes/authRouter";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(express.json());

  app.use("/auth", authRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

main();
