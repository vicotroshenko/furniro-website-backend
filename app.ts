import express, { Express, NextFunction, Request, Response } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { ErrorExpanded } from "types/types";
import { router as furnituresRouter } from "./routes/api/furnitures";
import { router as ordersRouter } from "./routes/api/orders";

dotenv.config();

const app: Express = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/furnitures", furnituresRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: ErrorExpanded,
    req: Request,
    res: Response,
    next: NextFunction
  ): any => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  }
);

export default app;
