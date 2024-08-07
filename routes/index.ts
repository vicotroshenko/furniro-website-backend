import { Application } from "express";
import furnitureRouter from "./api/furnitures.route";
import ordersRouter from "./api/orders.route";

class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/api/furnitures", furnitureRouter);
    this.app.use("/api/orders", ordersRouter);
  }
}

export default AppRouter;
