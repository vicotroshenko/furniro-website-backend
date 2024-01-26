"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const furnitures_1 = __importDefault(require("../../controllers/furnitures"));
const validateBody_1 = __importDefault(require("../../middlewares/validateBody"));
const furniture_1 = require("../../models/furniture");
exports.router = express_1.default.Router();
exports.router.get("/", furnitures_1.default.listFurnitures);
exports.router.post("/", (0, validateBody_1.default)(furniture_1.addSchema), furnitures_1.default.addFurniture);
exports.router.put("/:id", (0, validateBody_1.default)(furniture_1.addSchema), furnitures_1.default.updateFurnitureById);
exports.router.delete("/:id", furnitures_1.default.deleteFurnitureById);
exports.router.post("/:id/rating", (0, validateBody_1.default)(furniture_1.addRating), furnitures_1.default.addRating);
exports.router.put("/:id/rating/:ratItem", (0, validateBody_1.default)(furniture_1.addRating), furnitures_1.default.updateRating);
exports.router.delete("/:id/rating/:ratItem", furnitures_1.default.deleteRating);
exports.router.post("/:id/review", (0, validateBody_1.default)(furniture_1.addReview), furnitures_1.default.addReview);
exports.router.put("/:id/review/:reveiwItem", (0, validateBody_1.default)(furniture_1.addReview), furnitures_1.default.updateReview);
exports.router.delete("/:id/review/:reveiwItem", furnitures_1.default.deleteReview);
//# sourceMappingURL=furnitures.js.map