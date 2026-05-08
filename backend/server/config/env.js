import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env") });

const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 5000),
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/enerluma",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    serverUrl: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`,
    jwtSecret: process.env.JWT_SECRET || "enerluma-dev-secret-change-me",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    logLevel: process.env.LOG_LEVEL || "info",
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 200),
    authRateLimitMax: Number(process.env.AUTH_RATE_LIMIT_MAX || 15),
    cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 120),
    webhookSecret: process.env.WEBHOOK_SECRET || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    appleClientId: process.env.APPLE_CLIENT_ID || "",
    appleTeamId: process.env.APPLE_TEAM_ID || "",
    appleKeyId: process.env.APPLE_KEY_ID || "",
    applePrivateKeyPath: process.env.APPLE_PRIVATE_KEY_PATH || "",
    geminiApiKey: process.env.GEMINI_API_KEY || "",
};

if (env.nodeEnv === "production") {
    const required = ["MONGO_URI", "JWT_SECRET", "FRONTEND_URL", "SERVER_URL"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}

export default env;
