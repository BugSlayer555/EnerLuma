import { aiInsightsData, createSeededRandom } from "../data/mockData.js";
import { getOrSetCache } from "../utils/cache.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

export async function getAIInsights(userId) {
    return getOrSetCache(`ai:${userId}`, async () => {
        const data = clone(aiInsightsData);
        const rand = createSeededRandom(userId.toString());
        const factor = 0.7 + rand() * 0.6; // between 0.7 and 1.3

        if (data.recommendations) {
            data.recommendations.forEach(rec => {
                if (rec.potentialSavings) {
                    rec.potentialSavings = Math.floor(rec.potentialSavings * factor);
                    rec.impact = `Save about ₹${rec.potentialSavings}/month`;
                }
                if (rec.carbonImpact) {
                    rec.carbonImpact = Number((rec.carbonImpact * factor).toFixed(1));
                }
            });
        }
        return data;
    });
}
