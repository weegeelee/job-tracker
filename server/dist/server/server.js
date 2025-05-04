"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", userRoutes_1.default);
app.use("/", appRoutes_1.default);
(0, mongodb_1.default)();
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
exports.default = app;
