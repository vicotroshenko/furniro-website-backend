"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseError = void 0;
const handleMongooseError = ({ error, data, next }) => {
    console.log(error);
    if (error !== undefined && next !== undefined) {
        const { name, code } = error;
        const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
        error.status = status;
        next();
    }
};
exports.handleMongooseError = handleMongooseError;
//# sourceMappingURL=handleMongooseError.js.map