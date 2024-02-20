"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrderSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const handleMongooseError_1 = require("../helpers/handleMongooseError");
const orderSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    additional: {
        type: String,
    },
    orderType: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    order: {
        type: [Object],
        required: true,
    },
    createdAt: {
        type: String,
    }
});
orderSchema.post("save", (mongo) => (0, handleMongooseError_1.handleMongooseError)(Object.assign({ data: 0, error: undefined, next: undefined }, mongo)));
exports.addOrderSchema = joi_1.default.object({
    orderNumber: joi_1.default.string(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    company: joi_1.default.string(),
    country: joi_1.default.string().required(),
    region: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    zip: joi_1.default.string(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    additional: joi_1.default.string(),
    orderType: joi_1.default.string().required(),
    totalPrice: joi_1.default.string().required(),
    order: joi_1.default.array().items(joi_1.default.object({
        _id: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        price: joi_1.default.string().required(),
        amount: joi_1.default.number().required(),
        pictures: joi_1.default.array().required(),
        discount: joi_1.default.string().required(),
        buyAmount: joi_1.default.number().required(),
        date: joi_1.default.string().required(),
    })),
    createdAt: joi_1.default.string()
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map