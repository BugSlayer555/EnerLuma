import { Router } from "express";
import passport from "passport";
import { z } from "zod";

import env from "../config/env.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { login, me, oauthCallback, signup } from "../controllers/authController.js";

const router = Router();

const signupSchema = z.object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email(),
    password: z.string().min(8).max(128),
});

const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8).max(128),
});

router.post(
    "/signup",
    authLimiter,
    validateBody(signupSchema),
    asyncHandler(signup)
);

router.post(
    "/login",
    authLimiter,
    validateBody(loginSchema),
    asyncHandler(login)
);

router.get("/me", requireAuth, asyncHandler(me));

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${env.frontendUrl}/login?error=google_failed`,
    }),
    asyncHandler(oauthCallback)
);

router.get(
    "/apple",
    passport.authenticate("apple", {
        scope: ["name", "email"],
        session: false,
    })
);

router.post(
    "/apple/callback",
    passport.authenticate("apple", {
        session: false,
        failureRedirect: `${env.frontendUrl}/login?error=apple_failed`,
    }),
    asyncHandler(oauthCallback)
);

export default router;
