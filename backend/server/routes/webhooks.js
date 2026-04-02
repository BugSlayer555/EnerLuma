import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { receiveWebhook } from "../controllers/webhookController.js";

const router = Router();

router.post("/events", asyncHandler(receiveWebhook));

export default router;
