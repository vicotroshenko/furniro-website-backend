"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamsFromString = void 0;
const getParamsFromString = (element) => {
    if (element && element.length === 1) {
        if (element[0].length === 0) {
            return null;
        }
        return element.join().split(",");
    }
    else {
        return null;
    }
};
exports.getParamsFromString = getParamsFromString;
//# sourceMappingURL=getParamsFromString.js.map