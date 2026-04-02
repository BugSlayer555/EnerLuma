import { devicesData, getDeviceAnalyticsData } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getDevices(userId) {
    return getOrSetCache(`devices:${userId}`, async () => clone(devicesData));
}

export async function getDeviceAnalytics(userId, deviceId) {
    return getOrSetCache(
        `device-analytics:${userId}:${deviceId}`,
        async () => clone(getDeviceAnalyticsData(deviceId))
    );
}
