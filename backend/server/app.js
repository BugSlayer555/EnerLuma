import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import env from "./config/env.js";
import configurePassport from "./config/passport.js";
import apiRoutes from "./routes/index.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const allowedOrigins = new Set([
    env.frontendUrl,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
]);

function isAllowedOrigin(origin) {
    if (!origin) {
        return true;
    }

    if (allowedOrigins.has(origin)) {
        return true;
    }

    if (env.nodeEnv !== "production") {
        try {
            const url = new URL(origin);
            return ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
        } catch {
            return false;
        }
    }

    return false;
}

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(
    cors({
        origin(origin, callback) {
            if (isAllowedOrigin(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
    morgan("tiny", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

app.use(passport.initialize());
configurePassport(passport);

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

// Serve uploaded files
app.use("/api/uploads", express.static(uploadsDir));

app.use("/api", generalLimiter, apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
