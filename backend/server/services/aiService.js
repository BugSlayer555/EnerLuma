import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiInsightsData, createSeededRandom } from "../data/mockData.js";
import {
    assistantIntents,
    assistantSuggestions,
    routeHints,
    websiteContext,
} from "../data/assistantKnowledge.js";
import { getOrSetCache } from "../utils/cache.js";
import env from "../config/env.js";

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

// Initialize Gemini API
console.log("GEMINI_API_KEY loaded:", env.geminiApiKey ? "✓ (exists)" : "✗ (missing)");
const genAI = env.geminiApiKey ? new GoogleGenerativeAI(env.geminiApiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

function normalizeMessage(message) {
    return String(message || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s/?-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function buildSuggestions() {
    return assistantSuggestions;
}

function findRouteHint(cleanedMessage) {
    for (const hint of routeHints) {
        if (hint.keys.some((key) => cleanedMessage.includes(key))) {
            return hint;
        }
    }

    return null;
}

function getFallbackReply(message) {
    const cleaned = normalizeMessage(message);

    for (const item of assistantIntents) {
        if (item.keys.some((key) => cleaned.includes(key))) {
            const routeHint = findRouteHint(cleaned);
            if (!routeHint) {
                return item.reply;
            }

            return `${item.reply} You can open ${routeHint.label} at ${routeHint.path}.`;
        }
    }

    const routeHint = findRouteHint(cleaned);
    if (routeHint) {
        return `You can open ${routeHint.label} at ${routeHint.path}. I can also explain what you can do on that page.`;
    }

    return [
        "I can help with questions about EnerLuma pages, dashboard sections, and core features.",
        "Try asking about /dashboard, /dashboard/energy, /dashboard/water, /dashboard/devices, /dashboard/alerts, /dashboard/sustainability, /dashboard/insights, or /contact.",
    ].join(" ");
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

export async function getAssistantReply(message) {
    const normalized = normalizeMessage(message);
    console.log(`[CHAT] Message: "${message}" | Normalized: "${normalized}" | API Key: ${env.geminiApiKey ? "✓" : "✗"}`);

    return getOrSetCache(`chat:${normalized}`, async () => {
        try {
            // If no API key, fall back to keyword matching
            if (!env.geminiApiKey || !model) {
                console.log("[CHAT] No API key found, using fallback");
                return {
                    reply: getFallbackReply(message),
                    suggestions: buildSuggestions(),
                };
            }

            console.log("[CHAT] Calling Gemini API...");
            const systemPrompt = `You are a helpful assistant for EnerLuma.
${websiteContext}

Rules:
- Answer questions about EnerLuma pages, features, routes, and how to use them.
- When useful, include exact page paths such as /dashboard/energy.
- Keep replies concise, practical, and user-friendly.
- If asked about unrelated topics, politely redirect to EnerLuma website help.`;

            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }],
                    },
                ],
            });

            const reply = result.response.text();
            console.log(`[CHAT] Gemini API succeeded: "${reply.substring(0, 50)}..."`);

            return {
                reply: reply || getFallbackReply(message),
                suggestions: buildSuggestions(),
            };
        } catch (error) {
            // Fallback to keyword matching if API errors
            console.error("[CHAT] Gemini API error:", error.message);
            console.error("[CHAT] Full error:", error);
            return {
                reply: getFallbackReply(message),
                suggestions: buildSuggestions(),
            };
        }
    });
}
