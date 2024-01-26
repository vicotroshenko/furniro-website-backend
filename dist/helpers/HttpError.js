"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const errorMessageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};
const HttpError = (status = 400, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.HttpError = HttpError;
//# sourceMappingURL=HttpError.js.map