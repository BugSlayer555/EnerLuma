import { Router } from "express";

import authRoutes from "./auth.js";
import energyRoutes from "./energy.js";
import waterRoutes from "./water.js";
import deviceRoutes from "./devices.js";
import aiRoutes from "./ai.js";
import alertRoutes from "./alerts.js";
import webhookRoutes from "./webhooks.js";
import usageRoutes from "./usage.js";
import billRoutes from "./bills.js";
import integrationsRoutes from "./integrations.js";
import settingsRoutes from "./settings.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/energy", energyRoutes);
router.use("/water", waterRoutes);
router.use("/devices", deviceRoutes);
router.use("/ai", aiRoutes);
router.use("/alerts", alertRoutes);
router.use("/webhooks", webhookRoutes);
router.use("/usage", usageRoutes);
router.use("/bills", billRoutes);
router.use("/integrations", integrationsRoutes);
router.use("/settings", settingsRoutes);

export default router;
