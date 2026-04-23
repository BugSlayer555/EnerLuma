import { clearCacheByPrefix } from "../utils/cache.js";
import { logger } from "../utils/logger.js";

let maintenanceInterval;

export function startMaintenanceJob() {
    if (maintenanceInterval) {
        return;
    }

    maintenanceInterval = setInterval(() => {
        clearCacheByPrefix("energy:");
        clearCacheByPrefix("water:");
        clearCacheByPrefix("devices:");
        clearCacheByPrefix("device-analytics:");
        clearCacheByPrefix("ai:");
        clearCacheByPrefix("alerts:");

        logger.info("Periodic cache maintenance completed");
    }, 6 * 60 * 60 * 1000);

    logger.info("Maintenance job started (every 6 hours)");
}

export function stopMaintenanceJob() {
    if (!maintenanceInterval) return;

    clearInterval(maintenanceInterval);
    maintenanceInterval = undefined;
    logger.info("Maintenance job stopped");
}
