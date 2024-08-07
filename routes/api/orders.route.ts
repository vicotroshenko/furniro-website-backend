import express, { Router } from "express";
import { addOrderSchema } from "../../models/order.model";
import { ctrlWrapper, validateBody, isValidId } from "../../middlewares";
import orderController from "../../controllers/orders.controller";


export const ordersRouter: Router = express.Router();

ordersRouter.get(
  "/",
  ctrlWrapper(orderController.getListOfOrders.bind(orderController))
);

ordersRouter.get(
  "/:id",
  isValidId,
  ctrlWrapper(orderController.getOrder.bind(orderController))
);

ordersRouter.post(
  "/",
  validateBody(addOrderSchema),
  ctrlWrapper(orderController.addOrder.bind(orderController))
);

ordersRouter.put(
  "/:id",
  isValidId,
  validateBody(addOrderSchema),
  ctrlWrapper(orderController.updateOrder.bind(orderController))
);

ordersRouter.delete(
  "/:id",
  isValidId,
  ctrlWrapper(orderController.deleteOrder.bind(orderController))
);


export default ordersRouter;