import express, { Router } from 'express';
import { addSchema, addRating, addReview } from '../../models/furniture.model';
import furnitureController from '../../controllers/furnitures.controller';
import { ctrlWrapper, isValidId, validateBody } from '../../middlewares';

const furnitureRouter: Router = express.Router();

furnitureRouter.post(
  "/", 
  validateBody(addSchema), 
  ctrlWrapper(furnitureController.addFurniture.bind(furnitureController))
);

furnitureRouter.get(
  "/",
  ctrlWrapper(furnitureController.listFurniture.bind(furnitureController))
);

furnitureRouter.get(
  "/info/:part",
  ctrlWrapper(furnitureController.getDistinctInfo.bind(furnitureController))
);

furnitureRouter.get(
  "/:id",
  isValidId,
  ctrlWrapper(furnitureController.getFurnitureById.bind(furnitureController))
);

furnitureRouter.put(
  "/:id",
  isValidId,
  validateBody(addSchema),
  ctrlWrapper(furnitureController.updateFurnitureById.bind(furnitureController))
);

furnitureRouter.put(
  "/:id/rating/",
  isValidId,
  validateBody(addRating),
  ctrlWrapper(furnitureController.updateRating.bind(furnitureController))
);

furnitureRouter.put(
  "/:id/review",
  isValidId,
  validateBody(addReview),
  ctrlWrapper(furnitureController.updateReview.bind(furnitureController))
);

furnitureRouter.delete(
  "/:id",
  isValidId,
  ctrlWrapper(furnitureController.deleteFurnitureById.bind(furnitureController))
);

furnitureRouter.delete(
  "/:id/review/",
  isValidId,
  ctrlWrapper(furnitureController.deleteReview.bind(furnitureController))
);

export default furnitureRouter;