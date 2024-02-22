import express from 'express';
import ctrl  from "../../controllers/furnitures"
import validateBody from '../../middlewares/validateBody';
import { addSchema, addRating, addReview } from '../../models/furniture';

export const router = express.Router();

router.post("/", validateBody(addSchema), ctrl.addFurniture);
router.post("/:id/rating", validateBody(addRating), ctrl.addRating);
router.post("/:id/review", validateBody(addReview), ctrl.addReview);

router.get("/", ctrl.listFurnitures);
router.get("/info/:part", ctrl.getDescribeInfor);
router.get("/:id", ctrl.getFurnitureById);

router.put("/:id", validateBody(addSchema), ctrl.updateFurnitureById);
router.put("/:id/rating/:ratItem", validateBody(addRating), ctrl.updateRating);
router.put("/:id/review/:reveiwItem", validateBody(addReview), ctrl.updateReview);

router.delete("/:id", ctrl.deleteFurnitureById);
router.delete("/:id/rating/:ratItem", ctrl.deleteRating);
router.delete("/:id/review/:reveiwItem", ctrl.deleteReview);

