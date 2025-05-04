import express from "express";
import mongoose from "mongoose";
import authJWT from "../middleware/authJWT";
import Application from "../models/Application";
import { calculateStats } from "../controllers/calculateController";

const router = express.Router();

router.post("/application", authJWT, async (req, res) => {
    console.log("add");
    try {
        const userId = req.userId;
        console.log("UserId:", req.userId);

        const { company, position, applicationDate, status, followUpDate, notes } = req.body;
        console.log("Received body:", req.body);
        const application = new Application({ ...req.body, user: new mongoose.Types.ObjectId(userId) });
        await application.save();
        res.json({ success: true, company });
    } catch (error) {
        console.error("Error creating application:", error);
        res.status(500).json({ message: "Failed to create application", error });
    }
});

router.put("/application/:id", authJWT, async (req, res) => {
    console.log("edit");
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { company, position, applicationDate, status, followUpDate, notes } = req.body;
        const updatedApplication = await Application.findOneAndUpdate(
            { _id: id, user: new mongoose.Types.ObjectId(userId)},
            {
                company,
                position,
                applicationDate,
                status,
                followUpDate,
                notes
            },
            { new: true }
        );
        res.json({ success: true, updatedApplication });
    } catch (error) {
        res.status(500).json({ message: "Failed to create application", error });
    }
});

router.get("/applications", authJWT, async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ applicationDate: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Failed to get applications", error });
    }
});

router.get("/application/:id", async (req, res) => {

});

router.delete("/application/:id", authJWT, async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        await Application.findOneAndDelete({ _id: id, user: new mongoose.Types.ObjectId(userId) });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete", error });
    }
});

router.get("/stats", authJWT, async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ user: new mongoose.Types.ObjectId(userId) });
        const stats = calculateStats(applications);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: "Failed to get calculateStats", error });
    }
});

export default router;