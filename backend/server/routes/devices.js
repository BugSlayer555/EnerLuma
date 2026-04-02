import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { getAnalytics, listDevices } from "../controllers/deviceController.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(listDevices));
router.get("/:deviceId/analytics", requireAuth, asyncHandler(getAnalytics));

export default router;
