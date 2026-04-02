import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { getOverview } from "../controllers/dashboardController.js";

const router = Router();

router.get("/overview", requireAuth, asyncHandler(getOverview));

export default router;
