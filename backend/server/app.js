import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

import env from "./config/env.js";
import configurePassport from "./config/passport.js";
import apiRoutes from "./routes/index.js";
import { generalLimiter } from "./middleware/rateLimit.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

const app = express();
const allowedOrigins = new Set([
    env.frontendUrl,
    "http://localhost:5173",
    "http://localhost:5174",
]);

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
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "1mb" }));
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

app.use("/api", generalLimiter, apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
