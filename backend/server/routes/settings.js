import { Router } from "express";
import { z } from "zod";

import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import {
    handleUpdateProfile,
    handleUpdatePreferences,
    handleChangePassword,
    handleDeleteAccount,
} from "../controllers/settingsController.js";

const router = Router();

const profileSchema = z.object({
    name: z.string().trim().min(1).max(80).optional(),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().max(20).optional(),
});

const preferencesSchema = z.object({
    currency: z.enum(["INR", "USD", "EUR", "GBP"]).optional(),
    notifications: z.boolean().optional(),
});

const changePasswordSchema = z.object({
    currentPassword: z.string().min(8).max(128),
    newPassword: z.string().min(8).max(128),
});

router.put(
    "/profile",
    requireAuth,
    validateBody(profileSchema),
    asyncHandler(handleUpdateProfile)
);

router.put(
    "/preferences",
    requireAuth,
    validateBody(preferencesSchema),
    asyncHandler(handleUpdatePreferences)
);

router.put(
    "/password",
    requireAuth,
    validateBody(changePasswordSchema),
    asyncHandler(handleChangePassword)
);

router.delete(
    "/account",
    requireAuth,
    asyncHandler(handleDeleteAccount)
);

export default router;
