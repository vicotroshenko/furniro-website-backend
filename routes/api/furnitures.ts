import express from 'express';
import ctrl  from "../../controllers/furnitures"
import validateBody from '../../middlewares/validateBody';
import { addSchema, addRating, addReview } from '../../models/furniture';

export const router = express.Router();

router.get("/", ctrl.listFurnitures);
router.post("/", validateBody(addSchema), ctrl.addFurniture);
router.get("/info/:part", ctrl.getDescribeInfor);
router.get("/:id", ctrl.getFurnitureById);
router.put("/:id", validateBody(addSchema), ctrl.updateFurnitureById);
router.delete("/:id", ctrl.deleteFurnitureById);

router.post("/:id/rating", validateBody(addRating), ctrl.addRating);
router.put("/:id/rating/:ratItem", validateBody(addRating), ctrl.updateRating);
router.delete("/:id/rating/:ratItem", ctrl.deleteRating);

router.post("/:id/review", validateBody(addReview), ctrl.addReview);
router.put("/:id/review/:reveiwItem", validateBody(addReview), ctrl.updateReview);
router.delete("/:id/review/:reveiwItem", ctrl.deleteReview);
