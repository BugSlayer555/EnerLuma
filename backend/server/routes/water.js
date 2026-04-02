import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { getAnalytics } from "../controllers/waterController.js";

const router = Router();

router.get("/analytics", requireAuth, asyncHandler(getAnalytics));

export default router;
