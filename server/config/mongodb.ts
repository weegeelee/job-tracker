import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI!); 
        console.log("MongoDB Atlas connection successful");
    } catch (error) {
        console.error("MongoDB Atlas connection faile", error);
        process.exit(1);
    }
};

export default connectDB;