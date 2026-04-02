import { ZodError } from "zod";
import ApiError from "../utils/apiError.js";
import { logger } from "../utils/logger.js";

export function notFoundHandler(req, _res, next) {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(err, _req, res, _next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: "Validation failed",
            details: err.flatten(),
        });
    }

    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    if (status >= 500) {
        logger.error("Unhandled server error", {
            message: err.message,
            stack: err.stack,
        });
    } else {
        logger.warn("Handled API error", {
            status,
            message,
            details: err.details,
        });
    }

    return res.status(status).json({
        error: message,
        ...(err.details ? { details: err.details } : {}),
    });
}
