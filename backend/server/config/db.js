import mongoose from "mongoose";
import env from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDatabase() {
    try {
        mongoose.set("strictQuery", true);

        // Set connection timeout and socketTimeout
        const mongooseOpts = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            maxPoolSize: 10,
        };

        await mongoose.connect(env.mongoUri, mongooseOpts);
        logger.info(`MongoDB connected: ${mongoose.connection.host}`);

        // Handle connection events for diagnostics
        mongoose.connection.on("disconnected", () => {
            logger.warn("MongoDB disconnected");
        });

        mongoose.connection.on("error", (err) => {
            logger.error("MongoDB connection error", {
                message: err.message,
                code: err.code,
            });
        });

        mongoose.connection.on("reconnect", () => {
            logger.info("MongoDB reconnected");
        });
    } catch (err) {
        logger.error("Failed to connect to MongoDB", {
            message: err.message,
            code: err.code,
        });
        throw err;
    }
}

