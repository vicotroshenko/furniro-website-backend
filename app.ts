import express, { Express, NextFunction, Request, Response } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { ErrorExpanded } from "types/types";
import AppRouter from "./routes";

dotenv.config();

const app = express();
const router = new AppRouter(app);

app.use(cors());
app.use(express.json());

router.init();

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
