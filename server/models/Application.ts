import mongoose, { Schema, Document } from "mongoose"

export interface Application extends Document {
    _id: string;
    company: string;
    position: string;
    applicationDate: string;
    status: 'pending' | 'interview' | 'rejected' | 'no_response' | 'offer';
    notes?: string;
    followUpDate?: string;
    createAt?: Date;
    updateAt?: Date;
}

const ApplicationSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
export default mongoose.model<Application>("Application", ApplicationSchema);