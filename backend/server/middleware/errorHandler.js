import { ZodError } from "zod";
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
import { logger } from "../utils/logger.js";

export function notFoundHandler(req, _res, next) {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, _req, res, _next) {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation failed",
            details: err.flatten(),
        });
    }

    // Handle Mongoose connection errors
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
        logger.error("MongoDB connection error", {
            message: err.message,
        });
        return res.status(503).json({
            error: "Database unavailable. Please try again shortly.",
        });
    }

    // Handle Mongoose validation errors
    if (err instanceof mongoose.Error.ValidationError) {
        const details = Object.entries(err.errors).reduce((acc, [field, fieldErr]) => {
            acc[field] = fieldErr.message;
            return acc;
        }, {});
        return res.status(400).json({
            error: "Validation failed",
            details,
        });
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            error: `An account with this ${field} already exists`,
        });
    }

    // Handle custom ApiError
    if (err instanceof ApiError) {
        const status = err.statusCode || 500;
        if (status >= 500) {
            logger.error("Unhandled server error", {
                message: err.message,
                stack: err.stack,
            });
        } else {
            logger.warn("Handled API error", {
                status,
                message: err.message,
                details: err.details,
            });
        }
        return res.status(status).json({
            error: err.message,
            ...(err.details ? { details: err.details } : {}),
        });
    }

    // Handle all other errors
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    if (status >= 500) {
        logger.error("Unhandled server error", {
            message: err.message,
            stack: err.stack,
            name: err.name,
        });
    } else {
        logger.warn("Handled error", {
            status,
            message,
            name: err.name,
        });
    }

    return res.status(status).json({
        error: message,
    });
}

