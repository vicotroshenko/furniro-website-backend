"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const { DB_HOST, PORT = 3000 } = process.env;
mongoose_1.default.set("strictQuery", true);
if (DB_HOST !== undefined) {
    mongoose_1.default.connect(DB_HOST)
        .then(() => {
        app_1.default.listen(PORT, () => {
            console.log("Database connect success");
        });
    })
        .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
}
//# sourceMappingURL=server.js.map