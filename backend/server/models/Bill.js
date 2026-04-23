import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
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
        },
        provider: {
            type: String,
            trim: true,
            default: "",
        },
        billingPeriodStart: {
            type: Date,
            default: null,
        },
        billingPeriodEnd: {
            type: Date,
            default: null,
        },
        amountDue: {
            type: Number,
            default: 0,
        },
        unitsConsumed: {
            type: Number,
            default: 0,
        },
        unit: {
            type: String,
            default: "kWh",
        },
        filePath: {
            type: String,
            required: true,
        },
        originalFileName: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            default: "",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

billSchema.index({ owner: 1, resource: 1, createdAt: -1 });

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
