import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import {
    createUsage,
    getUserUsage,
    deleteUsage,
} from "../controllers/usageController.js";

const router = Router();

router.post("/", requireAuth, asyncHandler(createUsage));
router.get("/", requireAuth, asyncHandler(getUserUsage));
router.delete("/:id", requireAuth, asyncHandler(deleteUsage));

export default router;
