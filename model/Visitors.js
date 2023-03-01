import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    ip: {
        type: String,
        default: "0.0.0.0",
    },
    total: {
        type: Number,
        default: 0,
    },
    timestamp: [Date],
});

export const Visitor = mongoose.model("Visitor", visitorSchema);
