"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "interview", "rejected", "no_response", "offer"],
        required: true,
    },
    applicationDate: {
        type: String,
        required: true,
    },
    followUpDate: {
        type: String,
    },
    notes: {
        type: String,
    },
    creatDate: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Application", ApplicationSchema);
