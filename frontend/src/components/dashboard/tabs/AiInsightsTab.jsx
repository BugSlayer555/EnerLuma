import { useEffect, useMemo, useState } from "react";
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Droplets,
    Eye,
    Flame,
    FlaskConical,
    Gauge,
    Leaf,
    Lightbulb,
    SlidersHorizontal,
    Snowflake,
    Sparkles,
    Sun,
    Thermometer,
    Wrench,
    Zap,
} from "lucide-react";
import "./AiInsightsTab.css";

const API_BASE = "/api";

function getToken() {
    return localStorage.getItem("enerluma_token");
}

async function apiFetch(url) {
    const token = getToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}${url}`, { headers });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

const CHANNELS = [
    { id: "recommendations", label: "AI Recs", icon: Sparkles },
    { id: "predictive", label: "Predictive", icon: Activity },
    { id: "bill", label: "Bill Forecast", icon: Activity },
    { id: "seasonal", label: "Seasonal", icon: Sun },
    { id: "thresholds", label: "Thresholds", icon: SlidersHorizontal },
    { id: "efficiency", label: "Efficiency", icon: Gauge },
    { id: "carbon", label: "Carbon", icon: Leaf },
    { id: "behavior", label: "Behavior", icon: Eye },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "simulator", label: "Simulator", icon: FlaskConical },
];

const PRIORITY_THEME = {
    high: {
        accent: "#F59E0B",
        soft: "rgba(245, 158, 11, 0.10)",
        border: "rgba(245, 158, 11, 0.28)",
        button: "#EA8A00",
    },
    medium: {
        accent: "#14B8A6",
        soft: "rgba(20, 184, 166, 0.10)",
        border: "rgba(20, 184, 166, 0.25)",
        button: "#0EAAA6",
    },
    low: {
        accent: "#4F46E5",
        soft: "rgba(79, 70, 229, 0.10)",
        border: "rgba(79, 70, 229, 0.22)",
        button: "#4F46E5",
    },
};

const FALLBACK_RECOMMENDATIONS = [
    {
        id: "fallback-1",
        icon: "AC",
        title: "Switch HVAC to Eco Mode",
        description: "HVAC consumption is above average during peak daylight hours. Eco mode can reduce this spike.",
        priority: "high",
        category: "energy",
        confidence: 94,
        potentialSavings: 340,
        carbonImpact: 8.2,
        timeToImplement: "15 min",
        actionLabel: "Enable Eco Mode",
        implemented: false,
    },
    {
        id: "fallback-2",
        icon: "WH",
        title: "Optimize Water Heater Schedule",
        description: "Smart scheduling can trim runtime while preserving your hot-water comfort window.",
        priority: "medium",
        category: "water",
        confidence: 88,
        potentialSavings: 180,
        carbonImpact: 4.5,
        timeToImplement: "30 min",
        actionLabel: "Set Schedule",
        implemented: false,
    },
    {
        id: "fallback-3",
        icon: "SM",
        title: "Upgrade to Smart Thermostat",
        description: "Modern learning thermostats can improve load balancing and cut avoidable run-time.",
        priority: "low",
        category: "energy",
        confidence: 82,
        potentialSavings: 240,
        carbonImpact: 6.1,
        timeToImplement: "1 day",
        actionLabel: "View Options",
        implemented: false,
    },
    {
        id: "fallback-4",
        icon: "LF",
        title: "Install Low-Flow Showerheads",
        description: "Bathroom consumption remains above baseline. Low-flow fixtures reduce waste with no comfort drop.",
        priority: "medium",
        category: "water",
        confidence: 91,
        potentialSavings: 120,
        carbonImpact: 3.0,
        timeToImplement: "2 hours",
        actionLabel: "Shop Now",
        implemented: true,
    },
    {
        id: "fallback-5",
        icon: "LT",
        title: "Schedule Appliances Off-Peak",
        description: "Running heavy loads overnight can lower your rate-card impact on monthly bills.",
        priority: "high",
        category: "cost",
        confidence: 96,
        potentialSavings: 210,
        carbonImpact: 2.8,
        timeToImplement: "10 min",
        actionLabel: "Create Schedule",
        implemented: false,
    },
    {
        id: "fallback-6",
        icon: "LT",
        title: "Enable Motion-Based Lighting",
        description: "Lights are running in low occupancy periods. Motion controls can eliminate idle usage.",
        priority: "low",
        category: "sustainability",
        confidence: 78,
        potentialSavings: 95,
        carbonImpact: 1.9,
        timeToImplement: "1 day",
        actionLabel: "Explore Sensors",
        implemented: true,
    },
];

function clampConfidence(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return 80;
    return Math.min(99, Math.max(55, Math.round(num)));
}

function normalizePriority(value) {
    const raw = String(value || "").toLowerCase();
    if (raw === "high" || raw === "medium" || raw === "low") return raw;
    return "medium";
}

function parseSavingsFromImpact(impact) {
    const match = String(impact || "").match(/(?:INR|₹)\s*([\d,]+)/i);
    if (!match) return null;
    const parsed = Number(match[1].replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
}

function toLabelCase(value) {
    if (!value) return "General";
    return String(value)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
}

function toCurrencyPerMonth(value) {
    if (!Number.isFinite(value)) return null;
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(value))}/mo`;
}

function toCarbonLabel(value) {
    if (!Number.isFinite(value)) return null;
    return `${Number(value).toFixed(1)} kg CO2`;
}

function recommendationIconFor(code, category) {
    const iconMap = {
        AC: Snowflake,
        WH: Flame,
        SM: Thermometer,
        LF: Droplets,
        LT: Lightbulb,
        WT: Droplets,
    };

    if (iconMap[code]) return iconMap[code];
    if (category === "water") return Droplets;
    if (category === "sustainability") return Leaf;
    if (category === "behavior") return Eye;
    return Zap;
}

function categoryIconFor(category) {
    const iconMap = {
        energy: Zap,
        water: Droplets,
        cost: Activity,
        sustainability: Leaf,
        behavior: Eye,
        maintenance: Wrench,
        simulator: FlaskConical,
        predictive: Activity,
    };

    return iconMap[category] || Sparkles;
}

function normalizeRecommendation(rec, index) {
    return {
        id: rec.id ?? `base-${index}`,
        iconCode: rec.icon || "",
        title: rec.title || "Optimization Opportunity",
        description:
            rec.description ||
            "AI identified a meaningful optimization opportunity based on your usage profile.",
        priority: normalizePriority(rec.priority),
        category: String(rec.category || "energy").toLowerCase(),
        confidence: clampConfidence(rec.confidence),
        potentialSavings:
            Number.isFinite(rec.potentialSavings) ? rec.potentialSavings : parseSavingsFromImpact(rec.impact),
        carbonImpact: Number.isFinite(rec.carbonImpact) ? rec.carbonImpact : null,
        timeToImplement: rec.timeToImplement || "20 min",
        actionLabel: rec.actionLabel || "Review",
        implemented: Boolean(rec.implemented),
    };
}

function behavioralToRecommendation(item, index) {
    const metricNumber = Number.parseFloat(String(item.metric || "").replace(/[^\d.]/g, ""));
    const estimatedSavings = Number.isFinite(metricNumber) ? Math.max(70, Math.round(metricNumber * 52)) : 95;

    return {
        id: `behavior-${item.id ?? index}`,
        iconCode: item.icon || "LT",
        title: item.title || "Behavior Pattern Opportunity",
        description:
            item.description ||
            "Daily behavior patterns indicate a practical automation opportunity.",
        priority: item.impact === "negative" ? "medium" : "low",
        category: "behavior",
        confidence: clampConfidence(item.confidence),
        potentialSavings: estimatedSavings,
        carbonImpact: Number((estimatedSavings * 0.02).toFixed(1)),
        timeToImplement: "10 min",
        actionLabel: "Apply Fix",
        implemented: false,
    };
}

function predictionToRecommendation(prediction, index) {
    const usageTrend = Number(prediction.usageTrend) || 0;
    const predictedCost = Number(prediction.predictedCost) || 20;
    const anomalyDetected = Boolean(prediction.anomalyDetected);
    const priority = anomalyDetected ? "high" : usageTrend > 0 ? "medium" : "low";
    const estimatedSavings = Math.max(60, Math.round(predictedCost * (usageTrend > 0 ? 3.4 : 1.8)));

    return {
        id: `prediction-${prediction.applianceId ?? index}`,
        iconCode: prediction.icon || "AC",
        title: `Tune ${prediction.name || "Appliance"} Runtime`,
        description: anomalyDetected
            ? `Usage rose ${Math.abs(usageTrend).toFixed(1)}% against pattern. A quick rule update can normalize consumption.`
            : `Predicted usage is ${usageTrend >= 0 ? "up" : "down"} ${Math.abs(usageTrend).toFixed(1)}%. Smart scheduling can optimize this curve.`,
        priority,
        category: String(prediction.category || "predictive").toLowerCase(),
        confidence: clampConfidence(prediction.confidence),
        potentialSavings: estimatedSavings,
        carbonImpact: Number((estimatedSavings * 0.018).toFixed(1)),
        timeToImplement: anomalyDetected ? "15 min" : "25 min",
        actionLabel: anomalyDetected ? "Inspect Now" : "Optimize",
        implemented: false,
    };
}

function buildRecommendationDeck(aiData) {
    const base = (aiData?.recommendations || []).map(normalizeRecommendation);
    const behavior = (aiData?.behavioralInsights || []).map(behavioralToRecommendation);
    const predictive = (aiData?.predictions || []).map(predictionToRecommendation);

    const combined = [...base];
    for (const item of behavior) {
        if (combined.length >= 6) break;
        combined.push(item);
    }
    for (const item of predictive) {
        if (combined.length >= 6) break;
        combined.push(item);
    }

    if (!combined.length) {
        return FALLBACK_RECOMMENDATIONS.map(normalizeRecommendation);
    }

    return combined.slice(0, 6);
}

function extractNumericValue(text) {
    const value = Number.parseFloat(String(text || "").replace(/[^\d.]/g, ""));
    return Number.isFinite(value) ? value : null;
}

function formatCurrency(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(num))}`;
}

function createInsightCard(partial, fallbackId) {
    const savingsValue = Number(partial.potentialSavings);
    const carbonValue = Number(partial.carbonImpact);

    return {
        id: partial.id ?? fallbackId,
        iconCode: partial.iconCode || partial.icon || "",
        title: partial.title || "AI Insight",
        description: partial.description || "Review this AI insight to optimize your usage.",
        priority: normalizePriority(partial.priority),
        category: String(partial.category || "general").toLowerCase(),
        confidence: clampConfidence(partial.confidence),
        potentialSavings: Number.isFinite(savingsValue) ? savingsValue : null,
        carbonImpact: Number.isFinite(carbonValue) ? carbonValue : null,
        timeToImplement: partial.timeToImplement || "20 min",
        actionLabel: partial.actionLabel || "Review",
        implemented: Boolean(partial.implemented),
    };
}

function buildChannelCards(channelId, aiData, recommendationDeck) {
    const predictions = aiData?.predictions || [];
    const billPrediction = aiData?.billPrediction || null;
    const seasonalPatterns = aiData?.seasonalPatterns || [];
    const smartThresholds = aiData?.smartThresholds || [];
    const efficiencyScores = aiData?.efficiencyScores || [];
    const carbonFootprint = aiData?.carbonFootprint || null;
    const behavioralInsights = aiData?.behavioralInsights || [];

    switch (channelId) {
        case "recommendations": {
            return recommendationDeck;
        }
        case "predictive": {
            const predictiveCards = predictions.map((prediction, index) =>
                predictionToRecommendation(prediction, index)
            );

            return predictiveCards.length
                ? predictiveCards
                : [
                    createInsightCard(
                        {
                            id: "predictive-fallback",
                            iconCode: "AC",
                            title: "Predictive model warming up",
                            description: "Need more recent appliance data before generating predictive trajectories.",
                            priority: "low",
                            category: "predictive",
                            confidence: 76,
                            potentialSavings: 0,
                            carbonImpact: 0,
                            timeToImplement: "Now",
                            actionLabel: "Sync Data",
                        },
                        "predictive-fallback"
                    ),
                ];
        }
        case "bill": {
            if (!billPrediction) {
                return [
                    createInsightCard(
                        {
                            id: "bill-fallback",
                            iconCode: "LT",
                            title: "Bill forecast unavailable",
                            description: "Upload one more utility bill to unlock monthly forecasting.",
                            priority: "medium",
                            category: "cost",
                            confidence: 72,
                            timeToImplement: "10 min",
                            actionLabel: "Upload Bill",
                        },
                        "bill-fallback"
                    ),
                ];
            }

            const billConfidence = clampConfidence(billPrediction.confidence);
            const predictedAmount = formatCurrency(billPrediction.predictedAmount) || "unavailable";
            const previousAmount = formatCurrency(billPrediction.previousAmount) || "unavailable";

            const billCards = [
                createInsightCard(
                    {
                        id: "bill-main",
                        iconCode: "LT",
                        title: `Forecast ${billPrediction.month || "Upcoming Month"}`,
                        description: `Projected bill is ${predictedAmount} compared with ${previousAmount} in the previous cycle.`,
                        priority:
                            Number(billPrediction.predictedAmount) > Number(billPrediction.previousAmount)
                                ? "high"
                                : "low",
                        category: "cost",
                        confidence: billConfidence,
                        potentialSavings: Number.isFinite(Number(billPrediction.savingsPotential))
                            ? Number(billPrediction.savingsPotential)
                            : Number.isFinite(Number(billPrediction.savingsOpportunity))
                                ? Number(billPrediction.savingsOpportunity)
                                : null,
                        carbonImpact: Number.isFinite(Number(billPrediction.savingsPotential))
                            ? Number((Number(billPrediction.savingsPotential) * 0.012).toFixed(1))
                            : null,
                        timeToImplement: "8 min",
                        actionLabel: "Review Forecast",
                    },
                    "bill-main"
                ),
            ];

            (billPrediction.breakdown || []).forEach((item, index) => {
                const amount = Number(item.amount);
                const categoryLabel = String(item.category || "Utility");

                billCards.push(
                    createInsightCard(
                        {
                            id: `bill-breakdown-${index}`,
                            iconCode: categoryLabel.toLowerCase().includes("water") ? "WT" : "LT",
                            title: `${categoryLabel} Share`,
                            description: `${item.percentage || 0}% of forecast spend (${formatCurrency(amount) || "unavailable"}).`,
                            priority: Number(item.percentage) >= 50 ? "high" : Number(item.percentage) >= 20 ? "medium" : "low",
                            category: "cost",
                            confidence: billConfidence,
                            potentialSavings: Number.isFinite(amount) ? Math.round(amount * 0.08) : null,
                            carbonImpact: Number.isFinite(amount) ? Number((amount * 0.002).toFixed(1)) : null,
                            timeToImplement: "10 min",
                            actionLabel: "Optimize",
                        },
                        `bill-breakdown-${index}`
                    )
                );
            });

            return billCards.slice(0, 6);
        }
        case "seasonal": {
            const seasonalCards = seasonalPatterns.map((season, index) => {
                const expectedChange = Number(season.expectedChange) || 0;
                const estimatedSavings =
                    expectedChange > 0
                        ? Math.round(expectedChange * 12)
                        : Math.round(Math.abs(expectedChange) * 4);

                return createInsightCard(
                    {
                        id: `season-${index}`,
                        iconCode: "AC",
                        title: `${toLabelCase(season.season)} Pattern`,
                        description: `Peak month ${season.peakMonth || "N/A"} with ${season.avgConsumption || "N/A"} kWh/day. Dominant load: ${season.dominantAppliance || "mixed"}.`,
                        priority: expectedChange >= 20 ? "high" : expectedChange >= 0 ? "medium" : "low",
                        category: "seasonal",
                        confidence: 86,
                        potentialSavings: estimatedSavings,
                        carbonImpact: Number((Math.max(estimatedSavings * 0.02, 0.8)).toFixed(1)),
                        timeToImplement: "20 min",
                        actionLabel: "Apply Seasonal Plan",
                    },
                    `season-${index}`
                );
            });

            return seasonalCards.length
                ? seasonalCards
                : [
                    createInsightCard(
                        {
                            id: "seasonal-fallback",
                            iconCode: "AC",
                            title: "Seasonal baseline not ready",
                            description: "A longer usage history is required to model seasonal behavior shifts.",
                            priority: "low",
                            category: "seasonal",
                            confidence: 74,
                            timeToImplement: "Now",
                            actionLabel: "Continue Tracking",
                        },
                        "seasonal-fallback"
                    ),
                ];
        }
        case "thresholds": {
            const thresholdCards = smartThresholds.map((threshold, index) => {
                const current = extractNumericValue(threshold.currentThreshold);
                const suggested = extractNumericValue(threshold.suggestedThreshold);
                const reductionPercent =
                    current && suggested && current > 0 ? ((current - suggested) / current) * 100 : 0;
                const savings = parseSavingsFromImpact(threshold.impact);

                return createInsightCard(
                    {
                        id: `threshold-${index}`,
                        iconCode: "SM",
                        title: threshold.name || `Threshold ${index + 1}`,
                        description: `${threshold.reason || "AI recommendation available"}. Suggested ${threshold.suggestedThreshold || "updated target"} from ${threshold.currentThreshold || "current baseline"}.`,
                        priority: reductionPercent >= 20 ? "high" : reductionPercent >= 8 ? "medium" : "low",
                        category: "thresholds",
                        confidence: 84,
                        potentialSavings: savings,
                        carbonImpact: Number.isFinite(savings) ? Number((savings * 0.011).toFixed(1)) : null,
                        timeToImplement: "15 min",
                        actionLabel: threshold.autoAdjusted ? "Monitor" : "Apply Threshold",
                        implemented: Boolean(threshold.autoAdjusted),
                    },
                    `threshold-${index}`
                );
            });

            return thresholdCards.length
                ? thresholdCards
                : [
                    createInsightCard(
                        {
                            id: "thresholds-fallback",
                            iconCode: "SM",
                            title: "Thresholds already optimized",
                            description: "Current usage is within expected bands. No new threshold updates needed.",
                            priority: "low",
                            category: "thresholds",
                            confidence: 81,
                            timeToImplement: "Now",
                            actionLabel: "Keep Monitoring",
                            implemented: true,
                        },
                        "thresholds-fallback"
                    ),
                ];
        }
        case "efficiency": {
            const efficiencyCards = efficiencyScores.map((score, index) => {
                const scoreValue = Number(score.score) || 0;
                const wastedCost = Number(score.wastedCost);

                return createInsightCard(
                    {
                        id: `efficiency-${index}`,
                        iconCode: score.icon || "SM",
                        title: `${score.name || "Appliance"} Efficiency`,
                        description: `Score ${scoreValue}/100 (${score.grade || "N/A"}). Avg usage ${score.avgUsage || "N/A"} vs optimal ${score.optimalUsage || "N/A"}.`,
                        priority: scoreValue < 65 ? "high" : scoreValue < 80 ? "medium" : "low",
                        category: "efficiency",
                        confidence: clampConfidence(scoreValue),
                        potentialSavings: Number.isFinite(wastedCost) ? Math.round(wastedCost) : null,
                        carbonImpact: Number.isFinite(wastedCost) ? Number((wastedCost * 0.02).toFixed(1)) : null,
                        timeToImplement: "35 min",
                        actionLabel: "Improve Score",
                    },
                    `efficiency-${index}`
                );
            });

            return efficiencyCards.length
                ? efficiencyCards
                : [
                    createInsightCard(
                        {
                            id: "efficiency-fallback",
                            iconCode: "SM",
                            title: "Efficiency report pending",
                            description: "Connect at least one smart device profile to calculate appliance efficiency grades.",
                            priority: "medium",
                            category: "efficiency",
                            confidence: 75,
                            timeToImplement: "12 min",
                            actionLabel: "Connect Device",
                        },
                        "efficiency-fallback"
                    ),
                ];
        }
        case "carbon": {
            if (!carbonFootprint) {
                return [
                    createInsightCard(
                        {
                            id: "carbon-fallback",
                            iconCode: "LT",
                            title: "Carbon profile unavailable",
                            description: "More billing history is needed to produce your emissions breakdown.",
                            priority: "medium",
                            category: "carbon",
                            confidence: 72,
                            timeToImplement: "Now",
                            actionLabel: "Continue Tracking",
                        },
                        "carbon-fallback"
                    ),
                ];
            }

            const carbonCards = [
                createInsightCard(
                    {
                        id: "carbon-main",
                        iconCode: "LT",
                        title: "Monthly Carbon Footprint",
                        description: `${carbonFootprint.totalEmissions || 0} kg CO2 this month, ${Number(carbonFootprint.comparedToAvg) > 0 ? `${carbonFootprint.comparedToAvg}% above` : `${Math.abs(Number(carbonFootprint.comparedToAvg) || 0)}% below`} similar homes.`,
                        priority: Number(carbonFootprint.comparedToAvg) > 0 ? "high" : "low",
                        category: "carbon",
                        confidence: 92,
                        carbonImpact: Number(carbonFootprint.totalEmissions) || 0,
                        timeToImplement: "12 min",
                        actionLabel: "Plan Offsets",
                    },
                    "carbon-main"
                ),
            ];

            (carbonFootprint.breakdown || []).forEach((source, index) => {
                const emissions = Number(source.emissions);

                carbonCards.push(
                    createInsightCard(
                        {
                            id: `carbon-source-${index}`,
                            iconCode: source.source?.toLowerCase().includes("water") ? "WT" : "LT",
                            title: `${source.source || "Source"} Emissions`,
                            description: `${source.percentage || 0}% share (${Number.isFinite(emissions) ? `${emissions} kg CO2` : "N/A"}).`,
                            priority: Number(source.percentage) >= 50 ? "high" : Number(source.percentage) >= 25 ? "medium" : "low",
                            category: "carbon",
                            confidence: 88,
                            potentialSavings: Number.isFinite(emissions) ? Math.round(emissions * 6) : null,
                            carbonImpact: Number.isFinite(emissions) ? emissions : null,
                            timeToImplement: "15 min",
                            actionLabel: "Reduce Source",
                        },
                        `carbon-source-${index}`
                    )
                );
            });

            (carbonFootprint.offsetSuggestions || []).slice(0, 2).forEach((suggestion, index) => {
                carbonCards.push(
                    createInsightCard(
                        {
                            id: `carbon-offset-${index}`,
                            iconCode: "LT",
                            title: `Offset Strategy ${index + 1}`,
                            description: suggestion,
                            priority: "medium",
                            category: "carbon",
                            confidence: 79,
                            carbonImpact: Number((Number(carbonFootprint.totalEmissions || 0) / 12).toFixed(1)),
                            timeToImplement: "20 min",
                            actionLabel: "Plan Action",
                        },
                        `carbon-offset-${index}`
                    )
                );
            });

            return carbonCards.slice(0, 6);
        }
        case "behavior": {
            const behaviorCards = behavioralInsights.map((item, index) =>
                behavioralToRecommendation(item, index)
            );

            return behaviorCards.length
                ? behaviorCards
                : [
                    createInsightCard(
                        {
                            id: "behavior-fallback",
                            iconCode: "LT",
                            title: "Behavior profile stable",
                            description: "No unusual household behavior patterns detected in the latest monitoring cycle.",
                            priority: "low",
                            category: "behavior",
                            confidence: 83,
                            timeToImplement: "Now",
                            actionLabel: "Keep Monitoring",
                            implemented: true,
                        },
                        "behavior-fallback"
                    ),
                ];
        }
        case "maintenance": {
            const maintenanceCards = [];

            predictions
                .filter((prediction) => prediction.anomalyDetected)
                .forEach((prediction, index) => {
                    const predictedCost = Number(prediction.predictedCost) || 30;

                    maintenanceCards.push(
                        createInsightCard(
                            {
                                id: `maintenance-anomaly-${prediction.applianceId || index}`,
                                iconCode: prediction.icon || "AC",
                                title: `Inspect ${prediction.name || "Device"} Anomaly`,
                                description: `Detected ${Math.abs(Number(prediction.usageTrend) || 0).toFixed(1)}% deviation from expected usage trend.`,
                                priority: "high",
                                category: "maintenance",
                                confidence: clampConfidence(prediction.confidence),
                                potentialSavings: Math.round(predictedCost * 3.2),
                                carbonImpact: Number((predictedCost * 3.2 * 0.018).toFixed(1)),
                                timeToImplement: "25 min",
                                actionLabel: "Create Ticket",
                            },
                            `maintenance-anomaly-${index}`
                        )
                    );
                });

            efficiencyScores
                .filter((score) => Number(score.score) < 75)
                .forEach((score, index) => {
                    const wastedCost = Number(score.wastedCost);

                    maintenanceCards.push(
                        createInsightCard(
                            {
                                id: `maintenance-efficiency-${score.applianceId || index}`,
                                iconCode: score.icon || "SM",
                                title: `Service ${score.name || "System"}`,
                                description: `Efficiency is ${score.score || "N/A"} (${score.grade || "N/A"}), indicating a tune-up opportunity.`,
                                priority: "medium",
                                category: "maintenance",
                                confidence: clampConfidence(score.score),
                                potentialSavings: Number.isFinite(wastedCost) ? Math.round(wastedCost) : null,
                                carbonImpact: Number.isFinite(wastedCost) ? Number((wastedCost * 0.018).toFixed(1)) : null,
                                timeToImplement: "40 min",
                                actionLabel: "Schedule Service",
                            },
                            `maintenance-efficiency-${index}`
                        )
                    );
                });

            smartThresholds
                .filter((threshold) => !threshold.autoAdjusted)
                .forEach((threshold, index) => {
                    maintenanceCards.push(
                        createInsightCard(
                            {
                                id: `maintenance-threshold-${threshold.applianceId || index}`,
                                iconCode: "SM",
                                title: `Manually Tune ${threshold.name || "Threshold"}`,
                                description: threshold.reason || "Threshold needs manual calibration review.",
                                priority: "medium",
                                category: "maintenance",
                                confidence: 80,
                                potentialSavings: parseSavingsFromImpact(threshold.impact),
                                carbonImpact: 1.2,
                                timeToImplement: "15 min",
                                actionLabel: "Adjust Rule",
                            },
                            `maintenance-threshold-${index}`
                        )
                    );
                });

            return maintenanceCards.length
                ? maintenanceCards.slice(0, 6)
                : [
                    createInsightCard(
                        {
                            id: "maintenance-fallback",
                            iconCode: "SM",
                            title: "Maintenance status healthy",
                            description: "No urgent maintenance issues detected by current AI diagnostics.",
                            priority: "low",
                            category: "maintenance",
                            confidence: 89,
                            timeToImplement: "Now",
                            actionLabel: "Run Routine Check",
                            implemented: true,
                        },
                        "maintenance-fallback"
                    ),
                ];
        }
        case "simulator": {
            const simulatorCards = recommendationDeck
                .filter((item) => !item.implemented)
                .slice(0, 4)
                .map((item, index) =>
                    createInsightCard(
                        {
                            id: `simulator-${item.id}`,
                            iconCode: item.iconCode,
                            title: `Simulate: ${item.title}`,
                            description: `What-if outcome: ${toCurrencyPerMonth(item.potentialSavings) || "lower monthly cost"} with ${toCarbonLabel(item.carbonImpact) || "lower emissions"}.`,
                            priority: item.priority,
                            category: "simulator",
                            confidence: item.confidence,
                            potentialSavings: item.potentialSavings,
                            carbonImpact: item.carbonImpact,
                            timeToImplement: "5 min",
                            actionLabel: "Run Simulation",
                        },
                        `simulator-${index}`
                    )
                );

            if (simulatorCards.length) return simulatorCards;

            const billSavings = Number(aiData?.billPrediction?.savingsPotential);

            return [
                createInsightCard(
                    {
                        id: "simulator-fallback",
                        iconCode: "LT",
                        title: "Scenario Planner",
                        description: "Test scheduling and efficiency actions to compare projected bill and carbon outcomes.",
                        priority: "medium",
                        category: "simulator",
                        confidence: 78,
                        potentialSavings: Number.isFinite(billSavings) ? billSavings : null,
                        carbonImpact: Number.isFinite(billSavings) ? Number((billSavings * 0.01).toFixed(1)) : null,
                        timeToImplement: "5 min",
                        actionLabel: "Create Scenario",
                    },
                    "simulator-fallback"
                ),
            ];
        }
        default:
            return recommendationDeck;
    }
}

function getChannelHeader(channelId, cards, aiData, actionableCount) {
    switch (channelId) {
        case "recommendations":
            return { title: "Top AI Recommendations", subtitle: `${actionableCount} actionable` };
        case "predictive":
            return { title: "Predictive Consumption Watch", subtitle: `${cards.length} modeled devices` };
        case "bill":
            return {
                title: "Bill Forecast & Breakdown",
                subtitle: aiData?.billPrediction?.month || `${cards.length} forecast insights`,
            };
        case "seasonal":
            return { title: "Seasonal Pattern Signals", subtitle: `${cards.length} seasonal insights` };
        case "thresholds":
            return { title: "Smart Threshold Suggestions", subtitle: `${cards.length} threshold updates` };
        case "efficiency":
            return { title: "Efficiency Scoreboard", subtitle: `${cards.length} appliance scorecards` };
        case "carbon":
            return { title: "Carbon Footprint Intelligence", subtitle: `${cards.length} emissions indicators` };
        case "behavior":
            return { title: "Behavioral Insights", subtitle: `${cards.length} behavior patterns` };
        case "maintenance":
            return { title: "Maintenance Actions", subtitle: `${cards.length} actions queued` };
        case "simulator":
            return { title: "Savings Simulator", subtitle: `${cards.length} what-if scenarios` };
        default:
            return { title: "AI Insights", subtitle: `${cards.length} insights` };
    }
}

export default function AiInsightsTab() {
    const [activeChannel, setActiveChannel] = useState(CHANNELS[0].id);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        apiFetch("/ai/insights")
            .then(setData)
            .catch((error) => {
                setLoadError(true);
                console.error("AI fetch failed:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    const recommendationDeck = useMemo(() => buildRecommendationDeck(data), [data]);
    const actionableCount = recommendationDeck.filter((item) => !item.implemented).length;
    const activeChannelCards = useMemo(
        () => buildChannelCards(activeChannel, data, recommendationDeck),
        [activeChannel, data, recommendationDeck]
    );
    const activeChannelHeader = useMemo(
        () => getChannelHeader(activeChannel, activeChannelCards, data, actionableCount),
        [activeChannel, activeChannelCards, data, actionableCount]
    );

    if (loading) {
        return <div className="ai-hub__loading">Loading AI insights...</div>;
    }

    return (
        <div className="ai-hub">
            <section className="ai-hub__hero">
                <div className="ai-hub__hero-left">
                    <div className="ai-hub__hero-icon">
                        <Sparkles size={24} />
                    </div>

                    <div>
                        <h2 className="ai-hub__title">AI Intelligence Hub</h2>
                        <p className="ai-hub__subtitle">Enterprise-grade analytics and predictions</p>
                    </div>
                </div>

                <div className="ai-hub__hero-meta">
                    <span className="ai-hub__active-pill">
                        <span className="ai-hub__active-dot" />
                        Models Active
                    </span>
                    <span className="ai-hub__feature-count">{CHANNELS.length} features</span>
                </div>
            </section>

            <div className="ai-hub__channels" aria-label="AI modules">
                {CHANNELS.map((channel) => {
                    const Icon = channel.icon;
                    const isActive = channel.id === activeChannel;

                    return (
                        <button
                            key={channel.id}
                            type="button"
                            className={`ai-channel ${isActive ? "is-active" : ""}`}
                            onClick={() => setActiveChannel(channel.id)}
                            aria-pressed={isActive}
                        >
                            <Icon size={14} />
                            {channel.label}
                        </button>
                    );
                })}
            </div>

            {loadError && (
                <div className="ai-hub__warning">
                    <AlertTriangle size={14} />
                    Live AI service is unavailable. Showing cached insights where possible.
                </div>
            )}

            <div className="ai-hub__section-head">
                <h3>{activeChannelHeader.title}</h3>
                <span>{activeChannelHeader.subtitle}</span>
            </div>

            {activeChannelCards.length > 0 ? (
                <div className="ai-grid">
                    {activeChannelCards.map((rec, index) => {
                        const theme = PRIORITY_THEME[rec.priority] || PRIORITY_THEME.medium;
                        const RecommendationGlyph = recommendationIconFor(rec.iconCode, rec.category);
                        const CategoryGlyph = categoryIconFor(rec.category);
                        const savingsLabel = toCurrencyPerMonth(rec.potentialSavings);
                        const carbonLabel = toCarbonLabel(rec.carbonImpact);

                        return (
                            <article
                                key={rec.id}
                                className="ai-card"
                                style={{
                                    "--ai-accent": theme.accent,
                                    "--ai-soft": theme.soft,
                                    "--ai-border": theme.border,
                                    "--ai-button": theme.button,
                                    "--ai-score": rec.confidence,
                                    animationDelay: `${index * 60}ms`,
                                }}
                            >
                                <div className="ai-card__top">
                                    <div className="ai-card__badge-wrap">
                                        <div className="ai-card__icon">
                                            <RecommendationGlyph size={18} />
                                        </div>

                                        <div className="ai-card__badges">
                                            <span className={`ai-pill ai-pill--${rec.priority}`}>
                                                {rec.priority.toUpperCase()}
                                            </span>

                                            <span className="ai-pill ai-pill--category">
                                                <CategoryGlyph size={12} />
                                                {toLabelCase(rec.category)}
                                            </span>

                                            {rec.implemented && (
                                                <span className="ai-pill ai-pill--done">
                                                    <CheckCircle2 size={12} />
                                                    Done
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ai-card__score">
                                        <span>{rec.confidence}%</span>
                                    </div>
                                </div>

                                <h4 className="ai-card__title">{rec.title}</h4>
                                <p className="ai-card__description">{rec.description}</p>

                                <div className="ai-card__metrics">
                                    {savingsLabel && (
                                        <span className="ai-metric ai-metric--savings">
                                            <Zap size={13} />
                                            {savingsLabel}
                                        </span>
                                    )}

                                    {carbonLabel && (
                                        <span className="ai-metric ai-metric--carbon">
                                            <Leaf size={13} />
                                            {carbonLabel}
                                        </span>
                                    )}

                                    <span className="ai-metric">
                                        <Clock3 size={13} />
                                        {rec.timeToImplement}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={`ai-card__action ${rec.implemented ? "is-complete" : ""}`}
                                    disabled={rec.implemented}
                                >
                                    {rec.implemented ? "Completed" : rec.actionLabel}
                                    {!rec.implemented && <ArrowRight size={14} />}
                                </button>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="ai-hub__empty">No insights are available for this module yet.</div>
            )}
        </div>
    );
}
