import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb";
import appRoutes from "./routes/appRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", appRoutes);

const port = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});

export default app;