"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("../helpers/HttpError");
const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log("schema", error);
        if (error) {
            next((0, HttpError_1.HttpError)(400, "missing required name field"));
        }
        next();
    };
    return func;
};
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map