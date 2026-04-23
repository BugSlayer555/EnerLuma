import Integration from "../models/Integration.js";
import UsageSnapshot from "../models/UsageSnapshot.js";

// Generates a random usage based on provider profile
function generateMockReading(resource) {
    if (resource === "energy") {
        // Average Indian household uses 100-300 kWh a month -> roughly 3 to 15 kWh a day
        const value = (Math.random() * 12 + 3).toFixed(2);
        // Average cost per kWh in India varies, approx ₹6 to ₹8. Let's say $0.10 for standard currency.
        const cost = (value * 0.10).toFixed(2);
        return { value: parseFloat(value), cost: parseFloat(cost), unit: "kWh" };
    } else {
        // Average water usage per household roughly 300 to 800 Liters a day
        const value = (Math.random() * 500 + 300).toFixed(2);
        const cost = (value * 0.005).toFixed(2); // just a mock cost
        return { value: parseFloat(value), cost: parseFloat(cost), unit: "liters" };
    }
}

export async function syncIntegration(integration) {
    try {
        integration.status = "syncing";
        await integration.save();

        // If it's a new link, backfill 30 days. Otherwise just sync today if missing.
        const now = new Date();
        const daysToSync = integration.lastSync ? 1 : 30;

        const newSnapshots = [];
        
        for (let i = daysToSync - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            // Check if we already have a reading for this exact date from this exact integration
            const existing = await UsageSnapshot.findOne({
                owner: integration.owner,
                "metadata.integrationId": integration._id.toString(),
                bucketStart: {
                    $gte: date,
                    $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                }
            });

            if (!existing) {
                const reading = generateMockReading(integration.resource);
                newSnapshots.push({
                    owner: integration.owner,
                    resource: integration.resource,
                    granularity: "day",
                    bucketStart: date,
                    value: reading.value,
                    unit: reading.unit,
                    cost: reading.cost,
                    metadata: {
                        source: "auto_sync",
                        integrationId: integration._id.toString(),
                        provider: integration.providerId
                    }
                });
            }
        }

        if (newSnapshots.length > 0) {
            await UsageSnapshot.insertMany(newSnapshots);
        }

        integration.lastSync = new Date();
        integration.status = "active";
        await integration.save();
        
        return { success: true, syncedDays: newSnapshots.length };

    } catch (error) {
        console.error(`Sync failed for integration ${integration._id}:`, error);
        integration.status = "error";
        integration.metadata = { ...integration.metadata, lastError: error.message };
        await integration.save();
        return { success: false, error: error.message };
    }
}

export async function syncAllActiveIntegrations() {
    console.log("[Auto-Sync] Starting background utility sync...");
    const integrations = await Integration.find({ status: { $ne: "error" } });
    let successCount = 0;

    for (const integration of integrations) {
        const res = await syncIntegration(integration);
        if (res.success) successCount++;
    }
    
    console.log(`[Auto-Sync] Finished running. Successfully synced ${successCount}/${integrations.length} accounts.`);
}
