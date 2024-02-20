"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("../../controllers/orders"));
const validateBody_1 = __importDefault(require("../../middlewares/validateBody"));
const order_1 = require("../../models/order");
exports.router = express_1.default.Router();
exports.router.get("/", orders_1.default.getListOfOrders);
exports.router.post("/", (0, validateBody_1.default)(order_1.addOrderSchema), orders_1.default.addOrder);
exports.router.put("/:id", (0, validateBody_1.default)(order_1.addOrderSchema), orders_1.default.updateOrder);
exports.router.delete("/:id", (0, validateBody_1.default)(order_1.addOrderSchema), orders_1.default.deleteOrder);
//# sourceMappingURL=orders.js.map