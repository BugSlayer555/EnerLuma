import { energyAnalyticsData, createSeededRandom } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getEnergyAnalytics(userId) {
    return getOrSetCache(`energy:${userId}`, async () => {
        const data = clone(energyAnalyticsData);
        const rand = createSeededRandom(userId.toString());
        const factor = 0.7 + rand() * 0.6; // between 0.7 and 1.3

        // Perturb hourly
        if (data.hourlyData) {
            data.hourlyData.forEach(d => {
                d.actual = Number((d.actual * factor).toFixed(2));
                d.forecast = Number((d.forecast * factor).toFixed(2));
            });
        }
        // Perturb weekly
        if (data.weeklyData) {
            data.weeklyData.forEach(d => {
                d.value = Number((d.value * factor).toFixed(1));
            });
        }
        // Perturb monthly
        if (data.monthlyData) {
            data.monthlyData.forEach(d => {
                d.consumption = Math.floor(d.consumption * factor);
                d.cost = Math.floor(d.cost * factor);
            });
        }
        // Perturb kpis
        if (data.kpis) {
            data.kpis.forEach(kpi => {
                if (kpi.label === "Today Total") {
                    const val = parseFloat(kpi.value);
                    kpi.value = `${(val * factor).toFixed(1)} kWh`;
                }
                if (kpi.label === "Today's Cost") {
                    const val = parseInt(kpi.value.replace(/[^0-9]/g, ""));
                    kpi.value = `₹${Math.floor(val * factor)}`;
                }
                if (kpi.label === "Current Draw") {
                    const val = parseFloat(kpi.value);
                    kpi.value = `${(val * factor).toFixed(1)} kW`;
                }
            });
        }

        return data;
    });
}
