import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { linkProvider, getUserIntegrations, triggerSync, deleteIntegration } from "../controllers/integrationController.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(getUserIntegrations));
router.post("/link", requireAuth, asyncHandler(linkProvider));
router.post("/:id/sync", requireAuth, asyncHandler(triggerSync));
router.delete("/:id", requireAuth, asyncHandler(deleteIntegration));

export default router;
