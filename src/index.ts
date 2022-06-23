import "reflect-metadata";
import "dotenv-safe/config";
import 'dotenv/config'
import express, { Application } from "express";
import { createConnection } from "typeorm";

import UserRouter from "./routes/user";

const main = async () => {
  await createConnection();

  const app: Application = express();

  app.use(express.json());
  app.use("/user", UserRouter);

  app.listen(process.env.PORT, (): void => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
