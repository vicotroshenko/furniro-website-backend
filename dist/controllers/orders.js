"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlWrapper_1 = require("../helpers/ctrlWrapper");
const HttpError_1 = require("../helpers/HttpError");
const order_1 = __importDefault(require("../models/order"));
const getListOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 16, price, date } = req.query;
    const skip = (+page - 1) * +limit;
    const sortByPrice = price ? { totalPrice: Number(price) } : {};
    const sortByDate = date ? { createdAt: Number(date) } : {};
    const result = yield order_1.default.find({}, null, {
        skip,
        limit: Number(limit),
        sort: Object.assign(Object.assign({}, sortByPrice), sortByDate),
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let random = Math.random().toString(36).slice(2, 7).toUpperCase();
    let date = new Date();
    const orderNumber = date.toLocaleDateString().replaceAll(".", "") + "-" + random;
    const data = Object.assign(Object.assign({}, req.body), { orderNumber, createdAt: date.toString() });
    const result = yield order_1.default.create(data);
    res.status(201).json(result);
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).exec();
    console.log(result);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_1.default.findByIdAndDelete(id).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json({
        message: "contact deleted",
    });
});
exports.default = {
    getListOfOrders: (0, ctrlWrapper_1.ctrlWrapper)(getListOfOrders),
    addOrder: (0, ctrlWrapper_1.ctrlWrapper)(addOrder),
    updateOrder: (0, ctrlWrapper_1.ctrlWrapper)(updateOrder),
    deleteOrder: (0, ctrlWrapper_1.ctrlWrapper)(deleteOrder),
};
//# sourceMappingURL=orders.js.map