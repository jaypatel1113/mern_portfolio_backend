import mongoose from "mongoose";

const totalVisitorSchema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0,
    },
    timestamp: [Date],
});

export const AllVisitor = mongoose.model("AllVisitor", totalVisitorSchema);
