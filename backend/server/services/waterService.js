import { waterAnalyticsData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getWaterAnalytics(userId) {
    return getOrSetCache(`water:${userId}`, async () => clone(waterAnalyticsData));
}
