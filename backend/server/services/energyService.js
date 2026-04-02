import { energyAnalyticsData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getEnergyAnalytics(userId) {
    return getOrSetCache(`energy:${userId}`, async () => clone(energyAnalyticsData));
}
