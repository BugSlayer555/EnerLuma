import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ─── Load .env BEFORE anything else ──────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

// ─── Now import everything else (env vars are available) ─────────────────────
const { default: express } = await import("express");
const { default: cors } = await import("cors");
const { default: mongoose } = await import("mongoose");
const { default: passport } = await import("passport");
const { default: configurePassport } = await import("./config/passport.js");
const { default: authRoutes } = await import("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/enerluma";

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5174",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ─── Passport Strategies ──────────────────────────────────────────────────────
configurePassport();

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

// ─── Connect to MongoDB & Start Server ────────────────────────────────────────
async function start() {
    try {
        console.log("\n🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log(`  ✓ MongoDB connected: ${mongoose.connection.host}`);

        app.listen(PORT, () => {
            console.log(`\n⚡ EnerLuma API server running on http://localhost:${PORT}`);
            console.log(`  Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5174"}\n`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
}

start();
