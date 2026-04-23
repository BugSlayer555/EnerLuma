import mongoose from "mongoose";

const integrationSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        providerId: {
            type: String,
            required: true, // e.g. "bescom", "tneb"
        },
        providerName: {
            type: String,
            required: true, // e.g. "BESCOM (Bangalore)"
        },
        resource: {
            type: String,
            enum: ["energy", "water"],
            required: true,
        },
        consumerNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "error", "syncing"],
            default: "active",
        },
        lastSync: {
            type: Date,
            default: null,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

// A user should only link a specific meter once
integrationSchema.index({ owner: 1, providerId: 1, consumerNumber: 1 }, { unique: true });

const Integration = mongoose.model("Integration", integrationSchema);
export default Integration;
