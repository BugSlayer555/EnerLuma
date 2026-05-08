import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
import { logger } from "../utils/logger.js";

export function requireDatabase(req, _res, next) {
    const readyState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    
    if (readyState === 1) {
        next();
        return;
    }

    const stateMap = {
        0: "disconnected",
        2: "connecting",
        3: "disconnecting",
    };

    const message =
        readyState === 2
            ? "Database connection in progress. Please try again shortly."
            : "Database unavailable. Please try again shortly.";

    logger.warn("Database unavailable", {
        readyState,
        state: stateMap[readyState] || "unknown",
        path: req.path,
        method: req.method,
    });

    next(new ApiError(503, message));
}
