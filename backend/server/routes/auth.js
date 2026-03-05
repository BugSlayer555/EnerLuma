import { Router } from "express";
import passport from "passport";
import User from "../models/User.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── Local Signup ──────────────────────────────────────────────────────────────
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters" });
        }

        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ error: "An account with this email already exists" });
        }

        const user = await User.create({
            name: name || "",
            email: email.toLowerCase(),
            password,
            provider: "local",
        });

        const token = signToken(user);

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error during signup" });
    }
});

// ─── Local Login ───────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user with password field included
        const user = await User.findOne({ email: email.toLowerCase() }).select(
            "+password"
        );

        if (!user || !user.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = signToken(user);

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

// ─── Get Current User ──────────────────────────────────────────────────────────
router.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, provider: user.provider },
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// ─── Google OAuth ──────────────────────────────────────────────────────────────
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login?error=google_failed",
    }),
    (req, res) => {
        const token = signToken(req.user);
        // Redirect to frontend with token as query param
        const frontendURL = process.env.FRONTEND_URL || "http://localhost:5174";
        res.redirect(`${frontendURL}/auth/callback?token=${token}`);
    }
);

// ─── Apple Sign-In ─────────────────────────────────────────────────────────────
router.get(
    "/apple",
    passport.authenticate("apple", { scope: ["name", "email"] })
);

router.post(
    "/apple/callback",
    passport.authenticate("apple", {
        session: false,
        failureRedirect: "/login?error=apple_failed",
    }),
    (req, res) => {
        const token = signToken(req.user);
        const frontendURL = process.env.FRONTEND_URL || "http://localhost:5174";
        res.redirect(`${frontendURL}/auth/callback?token=${token}`);
    }
);

export default router;
