import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { getInsights } from "../controllers/aiController.js";

const router = Router();

router.get("/insights", requireAuth, asyncHandler(getInsights));

export default router;
