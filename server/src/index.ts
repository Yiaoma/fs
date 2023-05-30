import dotenv from "dotenv";
import express from "express";

dotenv.config();

const main = () => {
  const app = express();

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

main();
