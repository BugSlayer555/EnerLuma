import { syncAllActiveIntegrations } from "../services/utilityIntegrationService.js";

let syncIntervalId = null;

// Run sync every 24 hours (86400000 ms)
const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000; 

export function startUtilitySyncJob() {
    if (syncIntervalId) return;

    console.log("[Jobs] Starting Utility Auto-Sync Job...");
    
    // Initial run a few seconds after startup
    setTimeout(() => {
        syncAllActiveIntegrations().catch(e => console.error("Sync job error:", e));
    }, 5000);

    // Schedule
    syncIntervalId = setInterval(() => {
        syncAllActiveIntegrations().catch(e => console.error("Sync job error:", e));
    }, SYNC_INTERVAL_MS);
}

export function stopUtilitySyncJob() {
    if (syncIntervalId) {
        clearInterval(syncIntervalId);
        syncIntervalId = null;
        console.log("[Jobs] Stopped Utility Auto-Sync Job.");
    }
}
