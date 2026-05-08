import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { startMaintenanceJob } from "./jobs/maintenanceJob.js";
import { startUtilitySyncJob } from "./jobs/syncJob.js";
import { logger } from "./utils/logger.js";

async function startServer() {
    app.listen(env.port, () => {
        logger.info(`EnerLuma API server running on ${env.serverUrl}`);
        logger.info(`Frontend origin allowed: ${env.frontendUrl}`);
    });

    startMaintenanceJob();

    try {
        await connectDatabase();
        startUtilitySyncJob();
    } catch (err) {
        logger.error("Database connection failed. Running in degraded mode.", {
            message: err.message,
            stack: err.stack,
        });
    }
}

startServer();
