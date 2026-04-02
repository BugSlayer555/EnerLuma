import { dashboardOverviewData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getDashboardOverview(userId) {
    return getOrSetCache(`dashboard:${userId}`, async () => clone(dashboardOverviewData));
}
