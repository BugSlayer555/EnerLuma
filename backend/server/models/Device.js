import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        room: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["online", "offline", "idle", "degraded"],
            default: "online",
        },
        signal: {
            type: Number,
            min: 0,
            max: 100,
            default: 100,
        },
        latestConsumption: {
            type: String,
            default: "0",
        },
    },
    { timestamps: true }
);

deviceSchema.index({ owner: 1, slug: 1 }, { unique: true });

const Device = mongoose.model("Device", deviceSchema);
export default Device;
