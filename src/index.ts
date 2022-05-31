import express, { Application } from "express";
import UserRouter from "./routes/user";

const app: Application = express();
const PORT: number = 5000 || process.env.PORT;

app.use(express.json());
app.use("/users", UserRouter);

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
