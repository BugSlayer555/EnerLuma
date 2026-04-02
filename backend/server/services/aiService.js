import { aiInsightsData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getAIInsights(userId) {
    return getOrSetCache(`ai:${userId}`, async () => clone(aiInsightsData));
}
