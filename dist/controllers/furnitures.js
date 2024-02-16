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
// function divider(element:any) {
//   if(element){
//     const [string] = element;
//     const stringToArray = string.split(",")
//     return stringToArray
//   }
// }
const addFurniture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield furniture_1.default.create(req.body);
    res.status(201).json(result);
});
const listFurnitures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 16, price } = req.query;
    const status = req.query.status ? { status: req.query.status } : {};
    const skip = (+page - 1) * +limit;
    const sortByPrice = req.query.price ? { price: Number(price) } : {};
    const tagsLine = req.query.tags;
    const categoryLine = req.query.category;
    const tagsDivided = req.query.tags ? tagsLine.join("").split(",") : [];
    const categoryDivided = req.query.category ? categoryLine.join("").split(",") : [];
    const tags = req.query.tags ? { tags: { $in: [...tagsDivided] } } : {};
    const category = req.query.category ? { category: [...categoryDivided] } : {};
    const result = yield furniture_1.default.find(Object.assign(Object.assign(Object.assign({}, status), tags), category), "-createdAt -updatedAt -amount -size -colors -reviews -rating -general -product -dimensions -warranty", {
        skip,
        limit: Number(limit),
        sort: sortByPrice,
    }).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const getFurnitureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield furniture_1.default.findByIdAndUpdate(id).exec();
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    res.json(result);
});
const getDescribeInfor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { part } = req.params;
    const result = yield furniture_1.default.distinct(part).exec();
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const rating = Object.assign({ id: (0, nanoid_1.nanoid)() }, body);
    const newRating = [...resultItem.rating, rating];
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const updatedRating = resultItem.rating.map((element) => {
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.rating) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const ratingRemoved = resultItem.rating.filter((element) => element.id !== ratItem);
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!body.date) {
        body.date = new Date();
    }
    const review = Object.assign({ id: (0, nanoid_1.nanoid)() }, body);
    const newReview = [...resultItem.reviews, review];
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const updatedReview = resultItem.reviews.map((element) => {
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
    const resultItem = yield furniture_1.default.findByIdAndUpdate(id);
    if (!resultItem) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    if (!resultItem.reviews) {
        throw (0, HttpError_1.HttpError)(404, "Not found");
    }
    const reviewRemoved = resultItem.reviews.filter((element) => element.id !== reveiwItem);
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
    getFurnitureById: (0, ctrlWrapper_1.ctrlWrapper)(getFurnitureById),
    getDescribeInfor: (0, ctrlWrapper_1.ctrlWrapper)(getDescribeInfor),
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