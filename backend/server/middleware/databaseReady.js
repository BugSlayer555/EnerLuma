import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

export function requireDatabase(req, _res, next) {
    if (mongoose.connection.readyState === 1) {
        next();
        return;
    }

    next(new ApiError(503, "Database unavailable. Please try again shortly."));
}
