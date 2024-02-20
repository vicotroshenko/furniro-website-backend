import express from 'express';
import ctrl  from "../../controllers/orders"
import validateBody from '../../middlewares/validateBody';
import { addOrderSchema } from '../../models/order';

export const router = express.Router();

router.get("/", ctrl.getListOfOrders);
router.post("/", validateBody(addOrderSchema), ctrl.addOrder);
router.put("/:id", validateBody(addOrderSchema), ctrl.updateOrder);
router.delete("/:id", validateBody(addOrderSchema), ctrl.deleteOrder);