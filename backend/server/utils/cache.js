import NodeCache from "node-cache";
import env from "../config/env.js";

const cache = new NodeCache({ stdTTL: env.cacheTtlSeconds, useClones: false });

export async function getOrSetCache(key, producer, ttlSeconds = env.cacheTtlSeconds) {
    const existing = cache.get(key);
    if (existing !== undefined) {
        return existing;
    }

    const fresh = await producer();
    cache.set(key, fresh, ttlSeconds);
    return fresh;
}

export function clearCacheByPrefix(prefix) {
    cache.keys().forEach((key) => {
        if (key.startsWith(prefix)) {
            cache.del(key);
        }
    });
}
