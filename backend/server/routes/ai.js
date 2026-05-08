import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { chatAssistant, getInsights } from "../controllers/aiController.js";

const router = Router();

router.get("/insights", requireAuth, asyncHandler(getInsights));
router.post("/chat", asyncHandler(chatAssistant));

export default router;
