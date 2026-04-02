import { alertsData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getAlerts(userId) {
    return getOrSetCache(`alerts:${userId}`, async () => clone(alertsData));
}
