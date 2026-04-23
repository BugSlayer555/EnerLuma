import { alertsData, createSeededRandom } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getAlerts(userId) {
    return getOrSetCache(`alerts:${userId}`, async () => {
        const data = clone(alertsData);
        const rand = createSeededRandom(userId.toString());
        const factor = 0.7 + rand() * 0.6; // between 0.7 and 1.3

        if (Array.isArray(data)) {
            data.forEach(alert => {
                if (alert.message && alert.message.match(/₹\d+/)) {
                    const costMatch = alert.message.match(/₹(\d+)/);
                    if (costMatch) {
                        const newCost = Math.floor(parseInt(costMatch[1]) * factor);
                        alert.message = alert.message.replace(/₹\d+/, `₹${newCost}`);
                    }
                }
                if (alert.message && alert.message.match(/\d+%|% \d+/)) {
                     // Optionally perturb percentage, but might be too complex regex. Keep it simple.
                }
            });
        }
        return data;
    });
}
