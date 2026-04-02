import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { listAlerts } from "../controllers/alertController.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(listAlerts));

export default router;
