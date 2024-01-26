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
const furniture_1 = __importDefault(require("../models/furniture"));
const ctrlWrapper_1 = require("../helpers/ctrlWrapper");
const HttpError_1 = require("../helpers/HttpError");
const nanoid_1 = require("nanoid");
const addFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_1.default.create(req.body);
    res.status(201).json(result);
});
const listFurnitures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_1.default.find().exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const updateFurnitureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield furniture_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const deleteFurnitureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield furniture_1.default.findByIdAndDelete(id).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json({
        message: "contact deleted",
    });
});
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const rating = Object.assign({ id: (0, nanoid_1.nanoid)() }, body);
    const newRating = [...object.rating, rating];
    const result = yield furniture_1.default.findByIdAndUpdate(id, { rating: newRating }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(rating);
});
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ratItem } = req.params;
    const { body } = req;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const updatedRating = object.rating.map((element) => {
        if (element.id === ratItem) {
            return Object.assign(Object.assign({}, element), body);
        }
        else {
            return element;
        }
    });
    const result = yield furniture_1.default.findByIdAndUpdate(id, { rating: updatedRating }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(updatedRating);
});
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ratItem } = req.params;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const ratingRemoved = object.rating.filter((element) => element.id !== ratItem);
    const result = yield furniture_1.default.findByIdAndUpdate(id, { rating: ratingRemoved }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(ratingRemoved);
});
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!body.date) {
        body.date = new Date();
    }
    const review = Object.assign({ id: (0, nanoid_1.nanoid)() }, body);
    const newReview = [...object.reviews, review];
    const result = yield furniture_1.default.findByIdAndUpdate(id, { reviews: newReview }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(review);
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reveiwItem } = req.params;
    const { body } = req;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const updatedReview = object.reviews.map((element) => {
        if (element.id === reveiwItem) {
            return Object.assign(Object.assign({}, element), body);
        }
        else {
            return element;
        }
    });
    const result = yield furniture_1.default.findByIdAndUpdate(id, { rating: updatedReview }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(updatedReview);
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reveiwItem } = req.params;
    const resultItem = yield furniture_1.default.find({ id });
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const [object] = resultItem;
    if (!object.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const reviewRemoved = object.reviews.filter((element) => element.id !== reveiwItem);
    const result = yield furniture_1.default.findByIdAndUpdate(id, { rating: reviewRemoved }, {
        new: true,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(reviewRemoved);
});
exports.default = {
    addFurniture: (0, ctrlWrapper_1.ctrlWrapper)(addFurniture),
    listFurnitures: (0, ctrlWrapper_1.ctrlWrapper)(listFurnitures),
    updateFurnitureById: (0, ctrlWrapper_1.ctrlWrapper)(updateFurnitureById),
    deleteFurnitureById: (0, ctrlWrapper_1.ctrlWrapper)(deleteFurnitureById),
    addRating: (0, ctrlWrapper_1.ctrlWrapper)(addRating),
    updateRating: (0, ctrlWrapper_1.ctrlWrapper)(updateRating),
    deleteRating: (0, ctrlWrapper_1.ctrlWrapper)(deleteRating),
    addReview: (0, ctrlWrapper_1.ctrlWrapper)(addReview),
    updateReview: (0, ctrlWrapper_1.ctrlWrapper)(updateReview),
    deleteReview: (0, ctrlWrapper_1.ctrlWrapper)(deleteReview),
};
//# sourceMappingURL=furnitures.js.map