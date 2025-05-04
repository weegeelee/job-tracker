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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authJWT_1 = __importDefault(require("../middleware/authJWT"));
const Application_1 = __importDefault(require("../models/Application"));
const calculateController_1 = require("../controllers/calculateController");
const router = express_1.default.Router();
router.post("/application", authJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("add");
    try {
        const userId = req.userId;
        console.log("UserId:", req.userId);
        const { company, position, applicationDate, status, followUpDate, notes } = req.body;
        console.log("Received body:", req.body);
        const application = new Application_1.default(Object.assign(Object.assign({}, req.body), { user: new mongoose_1.default.Types.ObjectId(userId) }));
        yield application.save();
        res.json({ success: true, company });
    }
    catch (error) {
        console.error("Error creating application:", error);
        res.status(500).json({ message: "Failed to create application", error });
    }
}));
router.put("/application/:id", authJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("edit");
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { company, position, applicationDate, status, followUpDate, notes } = req.body;
        const updatedApplication = yield Application_1.default.findOneAndUpdate({ _id: id, user: new mongoose_1.default.Types.ObjectId(userId) }, {
            company,
            position,
            applicationDate,
            status,
            followUpDate,
            notes
        }, { new: true });
        res.json({ success: true, updatedApplication });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create application", error });
    }
}));
router.get("/applications", authJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const applications = yield Application_1.default.find({ user: new mongoose_1.default.Types.ObjectId(userId) }).sort({ applicationDate: -1 });
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get applications", error });
    }
}));
router.get("/application/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.delete("/application/:id", authJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { id } = req.params;
        yield Application_1.default.findOneAndDelete({ _id: id, user: new mongoose_1.default.Types.ObjectId(userId) });
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete", error });
    }
}));
router.get("/stats", authJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const applications = yield Application_1.default.find({ user: new mongoose_1.default.Types.ObjectId(userId) });
        const stats = (0, calculateController_1.calculateStats)(applications);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get calculateStats", error });
    }
}));
exports.default = router;
