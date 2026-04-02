import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        severity: {
            type: String,
            enum: ["info", "warning", "critical"],
            default: "info",
            index: true,
        },
        status: {
            type: String,
            enum: ["active", "resolved", "acknowledged"],
            default: "active",
            index: true,
        },
        device: {
            type: String,
            default: "",
            trim: true,
        },
        occurredAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    { timestamps: true }
);

alertSchema.index({ owner: 1, status: 1, severity: 1, occurredAt: -1 });

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
