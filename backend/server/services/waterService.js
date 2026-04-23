import { waterAnalyticsData, createSeededRandom } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getWaterAnalytics(userId) {
    return getOrSetCache(`water:${userId}`, async () => {
        const data = clone(waterAnalyticsData);
        const rand = createSeededRandom(userId.toString());
        const factor = 0.7 + rand() * 0.6; // between 0.7 and 1.3

        // Perturb hourly
        if (data.hourlyData) {
            data.hourlyData.forEach(d => {
                d.value = Math.floor(d.value * factor);
            });
        }
        // Perturb weekly
        if (data.weeklyData) {
            data.weeklyData.forEach(d => {
                d.water = Math.floor(d.water * factor);
            });
        }
        // Perturb kpis
        if (data.kpis) {
            data.kpis.forEach(kpi => {
                if (kpi.label === "Today Total") {
                    const val = parseFloat(kpi.value);
                    kpi.value = `${Math.floor(val * factor)} L`;
                }
                if (kpi.label === "Today's Cost") {
                    const val = parseInt(kpi.value.replace(/[^0-9]/g, ""));
                    kpi.value = `₹${Math.floor(val * factor)}`;
                }
                if (kpi.label === "Current Flow") {
                    const val = parseFloat(kpi.value);
                    kpi.value = `${(val * factor).toFixed(1)} L/min`;
                }
            });
        }

        return data;
    });
}
