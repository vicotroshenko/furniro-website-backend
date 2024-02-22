"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.addRating = exports.addSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const handleMongooseError_1 = require("../helpers/handleMongooseError");
const furnitureSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    discount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "new",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    size: {
        type: [String],
        required: false,
    },
    pictures: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    reviews: {
        type: [],
    },
    rating: {
        type: [],
    },
    general: {
        type: [],
    },
    product: {
        type: [],
    },
    dimensions: {
        type: [],
    },
    warranty: {
        type: Object,
    },
    category: {
        type: String,
        required: true,
    },
});
furnitureSchema.post("save", (mongo) => (0, handleMongooseError_1.handleMongooseError)(Object.assign({ data: 0, error: undefined, next: undefined }, mongo)));
exports.addSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.string().required(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    discount: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    size: joi_1.default.array().items(joi_1.default.string()),
    pictures: joi_1.default.array().items(joi_1.default.string()),
    colors: joi_1.default.array().items(joi_1.default.string()),
    reviews: joi_1.default.array().items(joi_1.default.object()),
    rating: joi_1.default.array().items(joi_1.default.object({ user: joi_1.default.string(), id: joi_1.default.string(), mark: joi_1.default.number() })),
    general: joi_1.default.array().items(joi_1.default.object({ title: joi_1.default.string(), value: joi_1.default.string() })),
    product: joi_1.default.array().items(joi_1.default.object({ title: joi_1.default.string(), value: joi_1.default.string() })),
    dimensions: joi_1.default.array().items(joi_1.default.object({ title: joi_1.default.string(), value: joi_1.default.string() })),
    warranty: joi_1.default.object(),
    category: joi_1.default.string().required(),
});
exports.addRating = joi_1.default.object({
    user: joi_1.default.string().required(),
    id: joi_1.default.string(),
    mark: joi_1.default.number().min(0).max(5),
});
exports.addReview = joi_1.default.object({
    id: joi_1.default.string(),
    author: joi_1.default.string(),
    name: joi_1.default.string().required(),
    review: joi_1.default.string().required(),
    date: joi_1.default.string(),
});
const Furniture = (0, mongoose_1.model)("Furniture", furnitureSchema);
exports.default = Furniture;
//# sourceMappingURL=furniture.js.map