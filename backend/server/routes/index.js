import { Router } from "express";

import authRoutes from "./auth.js";
import dashboardRoutes from "./dashboard.js";
import energyRoutes from "./energy.js";
import waterRoutes from "./water.js";
import deviceRoutes from "./devices.js";
import aiRoutes from "./ai.js";
import alertRoutes from "./alerts.js";
import webhookRoutes from "./webhooks.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/energy", energyRoutes);
router.use("/water", waterRoutes);
router.use("/devices", deviceRoutes);
router.use("/ai", aiRoutes);
router.use("/alerts", alertRoutes);
router.use("/webhooks", webhookRoutes);

export default router;
