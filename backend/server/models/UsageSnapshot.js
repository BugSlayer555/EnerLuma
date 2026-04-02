import mongoose from "mongoose";

const usageSnapshotSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        resource: {
            type: String,
            enum: ["energy", "water"],
            required: true,
            index: true,
        },
        granularity: {
            type: String,
            enum: ["hour", "day", "month"],
            required: true,
            default: "hour",
        },
        bucketStart: {
            type: Date,
            required: true,
            index: true,
        },
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        cost: {
            type: Number,
            default: 0,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

usageSnapshotSchema.index({ owner: 1, resource: 1, granularity: 1, bucketStart: 1 });

const UsageSnapshot = mongoose.model("UsageSnapshot", usageSnapshotSchema);
export default UsageSnapshot;
