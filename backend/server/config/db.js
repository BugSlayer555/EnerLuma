import mongoose from "mongoose";
import env from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDatabase() {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);
}
