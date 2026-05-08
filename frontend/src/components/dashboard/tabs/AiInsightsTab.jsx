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
    X,
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

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`ai-toast ai-toast--${type}`}>
            <div className="ai-toast__content">{message}</div>
        </div>
    );
}

function ActionModal({ isOpen, action, onClose, onConfirm }) {
    if (!isOpen || !action) return null;

    const getModalContent = () => {
        const baseInputs = {
            "Enable Eco Mode": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>HVAC System</label>
                        <select className="ai-modal__select">
                            <option>Carrier AquaEdge - Living Room</option>
                            <option>Fujitsu ASY - Bedroom</option>
                            <option>Daikin Inverter - Kitchen</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Temperature Range</label>
                        <div className="ai-modal__temp-range">
                            <input 
                                type="range" 
                                min="18" 
                                max="28" 
                                defaultValue="22"
                                onChange={(e) => document.getElementById('temp-display').textContent = e.target.value + '°C'}
                            />
                            <span id="temp-display">22°C</span>
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Eco Mode Level</label>
                        <div className="ai-modal__radio-group">
                            {["Light (5-10% savings)", "Medium (10-15% savings)", "Aggressive (15-20% savings)"].map((level) => (
                                <label key={level} className="ai-modal__radio">
                                    <input type="radio" name="eco-level" defaultChecked={level === "Medium (10-15% savings)"} />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Expected savings: ₹340-450/month | Carbon reduction: 8-10 kg CO2/month
                    </div>
                </div>
            ),
            "View Options": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Smart Thermostat Recommendations</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                            <div className="ai-modal__product">
                                <div style={{ fontWeight: 800 }}>Nest Learning Thermostat</div>
                                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Learns schedule, WiFi, multi-zone support</div>
                                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                    <button className="ai-modal__btn ai-modal__btn--confirm" onClick={() => window.open('https://store.google.com/product/nest_thermostat', '_blank')}>View Details</button>
                                    <button className="ai-modal__btn ai-modal__btn--cancel" onClick={() => showToast('Added to wishlist', 'success')}>Add to Wishlist</button>
                                </div>
                            </div>

                            <div className="ai-modal__product">
                                <div style={{ fontWeight: 800 }}>Ecobee SmartThermostat</div>
                                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Room sensors, voice control, energy reports</div>
                                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                    <button className="ai-modal__btn ai-modal__btn--confirm" onClick={() => window.open('https://www.ecobee.com/en-us/smart-thermostats/', '_blank')}>View Details</button>
                                    <button className="ai-modal__btn ai-modal__btn--cancel" onClick={() => showToast('Added to wishlist', 'success')}>Add to Wishlist</button>
                                </div>
                            </div>

                            <div className="ai-modal__product">
                                <div style={{ fontWeight: 800 }}>Honeywell Home T9</div>
                                <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Sensor-driven comfort, simple scheduling</div>
                                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                    <button className="ai-modal__btn ai-modal__btn--confirm" onClick={() => window.open('https://www.honeywellhome.com/en/us/products/thermostats/', '_blank')}>View Details</button>
                                    <button className="ai-modal__btn ai-modal__btn--cancel" onClick={() => showToast('Added to wishlist', 'success')}>Add to Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 These options are recommended based on potential savings and compatibility. Click "View Details" to open the vendor page.
                    </div>
                </div>
            ),
            "Set Schedule": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Device</label>
                        <select className="ai-modal__select">
                            <option>Water Heater - Main Tank</option>
                            <option>Water Heater - Guest House</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Active Days</label>
                        <div className="ai-modal__checkbox-group">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                <label key={day} className="ai-modal__checkbox">
                                    <input type="checkbox" defaultChecked={["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day)} />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Heating Duration (minutes)</label>
                        <input type="number" min="30" max="120" defaultValue="60" className="ai-modal__input" placeholder="Minutes" />
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Smart scheduling can reduce consumption by 15-20% | ₹180-240/month savings
                    </div>
                </div>
            ),
            "Create Schedule": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Appliance</label>
                        <select className="ai-modal__select">
                            <option>Washing Machine - Primary</option>
                            <option>Dishwasher - Kitchen</option>
                            <option>EV Charger - Garage</option>
                            <option>Dryer - Laundry</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Off-Peak Hours</label>
                        <div className="ai-modal__time-inputs">
                            <input type="time" defaultValue="22:00" placeholder="Start time" />
                            <span>to</span>
                            <input type="time" defaultValue="06:00" placeholder="End time" />
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Frequency</label>
                        <div className="ai-modal__radio-group">
                            {["Daily", "Weekdays Only", "Custom"].map((freq) => (
                                <label key={freq} className="ai-modal__radio">
                                    <input type="radio" name="frequency" defaultChecked={freq === "Weekdays Only"} />
                                    {freq}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Off-peak rates are typically 30-40% cheaper | ₹210-280/month savings
                    </div>
                </div>
            ),
            "Apply Threshold": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Device/Service</label>
                        <select className="ai-modal__select">
                            <option>Thermostat - Living Room</option>
                            <option>Smart Meter - Main</option>
                            <option>Water Usage Monitor</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Current Threshold</label>
                        <input type="number" disabled defaultValue="65" className="ai-modal__input" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>New Threshold</label>
                        <input type="number" defaultValue="50" className="ai-modal__input" placeholder="Enter value" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Alert On Exceeding</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked />
                            Send notifications when threshold is exceeded
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Smart thresholds reduce peak consumption by 8-12%
                    </div>
                </div>
            ),
            "Connect Device": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Device Type</label>
                        <select className="ai-modal__select">
                            <option>Smart Thermostat</option>
                            <option>Smart Plug</option>
                            <option>Energy Monitor</option>
                            <option>Water Flow Meter</option>
                            <option>Solar Inverter</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Device Model</label>
                        <input type="text" className="ai-modal__input" placeholder="e.g., Nest Learning Thermostat" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Location/Room</label>
                        <input type="text" className="ai-modal__input" placeholder="e.g., Living Room" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Connection Method</label>
                        <div className="ai-modal__radio-group">
                            {["WiFi", "Bluetooth", "Zigbee", "Z-Wave"].map((method) => (
                                <label key={method} className="ai-modal__radio">
                                    <input type="radio" name="connection" defaultChecked={method === "WiFi"} />
                                    {method}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Connected devices unlock 25-35% more savings through automation
                    </div>
                </div>
            ),
            "Create Ticket": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Issue</label>
                        <select className="ai-modal__select">
                            <option selected>HVAC Efficiency Anomaly</option>
                            <option>Appliance Not Responding</option>
                            <option>High Usage Alert</option>
                            <option>Device Malfunction</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Priority</label>
                        <div className="ai-modal__radio-group">
                            {["Low", "Medium", "High"].map((priority) => (
                                <label key={priority} className="ai-modal__radio">
                                    <input type="radio" name="priority" defaultChecked={priority === "High"} />
                                    {priority}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Preferred Technician</label>
                        <select className="ai-modal__select">
                            <option>Any Available</option>
                            <option>John (HVAC Specialist)</option>
                            <option>Sarah (Electrician)</option>
                            <option>Mike (Plumber)</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Preferred Date</label>
                        <input type="date" defaultValue="2026-05-10" className="ai-modal__input" />
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Service appointment will be scheduled within 24-48 hours
                    </div>
                </div>
            ),
            "Adjust Rule": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Rule Name</label>
                        <input type="text" className="ai-modal__input" placeholder="e.g., Peak Hour Temperature" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Condition</label>
                        <div className="ai-modal__condition-builder">
                            <select className="ai-modal__select">
                                <option>When temperature exceeds</option>
                                <option>When usage is above</option>
                                <option>When time is between</option>
                            </select>
                            <input type="number" placeholder="Value" className="ai-modal__input" defaultValue="28" />
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Action</label>
                        <select className="ai-modal__select">
                            <option>Reduce by 2°C</option>
                            <option>Switch to eco mode</option>
                            <option>Send alert</option>
                            <option>Turn off device</option>
                        </select>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Automation rules run 24/7 to optimize your energy usage
                    </div>
                </div>
            ),
            "Improve Score": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Current Efficiency Score</label>
                        <div className="ai-modal__score-display">65/100 (D)</div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Recommended Actions</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked />
                            <span><strong>Replace Filter</strong> - Improves airflow by 15%</span>
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked />
                            <span><strong>Schedule Maintenance</strong> - Reduces runtime by 10%</span>
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" />
                            <span><strong>Upgrade Device</strong> - Could save ₹2000/year</span>
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Improving efficiency score by 10 points saves ₹150-200/month
                    </div>
                </div>
            ),
            "Schedule Service": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Service Type</label>
                        <select className="ai-modal__select">
                            <option>HVAC Maintenance</option>
                            <option>Plumbing Inspection</option>
                            <option>Electrical Check</option>
                            <option>Appliance Repair</option>
                            <option>General Maintenance</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Priority</label>
                        <div className="ai-modal__radio-group">
                            {["Low", "Medium", "High", "Emergency"].map((priority) => (
                                <label key={priority} className="ai-modal__radio">
                                    <input type="radio" name="service-priority" defaultChecked={priority === "Medium"} />
                                    {priority}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Preferred Date Range</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked />
                            <span>Today/Tomorrow</span>
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" />
                            <span>This Week</span>
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" />
                            <span>Next Week</span>
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Service will be scheduled at your earliest convenience. Technician will contact you within 2 hours.
                    </div>
                </div>
            ),
            "Review Forecast": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Forecast Summary</label>
                        <div className="ai-modal__summary">Projected bill details and category breakdown are shown here. Use Optimize to apply quick savings or export the breakdown.</div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Actions</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="ai-modal__btn ai-modal__btn--confirm">Optimize</button>
                            <button className="ai-modal__btn ai-modal__btn--cancel" onClick={() => window.open('/dashboard/billing', '_self')}>Open Billing</button>
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Optimizations target high-cost categories first to lower monthly bills.
                    </div>
                </div>
            ),
            "Apply Seasonal Plan": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Seasonal Plan</label>
                        <select className="ai-modal__select">
                            <option>Peak Cooling Plan (Summer)</option>
                            <option>Conservation Plan (Monsoon)</option>
                            <option>Heating Saver (Winter)</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Auto-Apply</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked /> Enable auto adjustments during seasonal window
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Seasonal plans tune device schedules and thermostat setpoints for the season.
                    </div>
                </div>
            ),
            "Plan Offsets": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Offset Options</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked /> Purchase certified carbon offsets (monthly)
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" /> Enroll in utility green tariff
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Offsetting small monthly emissions can make your household carbon-neutral over a year.
                    </div>
                </div>
            ),
            "Reduce Source": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Source Reduction Plan</label>
                        <textarea className="ai-modal__input" rows={4} defaultValue={'Replace old heater element with efficient model\nAdd sensor-based control'} />
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Suggested measures focus on high-emission appliances first.
                    </div>
                </div>
            ),
            "Plan Action": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Carbon Action</label>
                        <select className="ai-modal__select">
                            <option>Purchase Offsets</option>
                            <option>Reduce Source</option>
                            <option>Improve Efficiency</option>
                        </select>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Pick an action to plan short-term reductions or long-term offsets.
                    </div>
                </div>
            ),
            "Apply Fix": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Behavior Fix</label>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked /> Auto-reduce standby power on idle devices
                        </div>
                        <div className="ai-modal__checkbox">
                            <input type="checkbox" defaultChecked /> Add scheduling for high-use appliances
                        </div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Applying these fixes will automatically adjust device settings and monitor effectiveness.
                    </div>
                </div>
            ),
            "Run Simulation": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Simulation Scenario</label>
                        <select className="ai-modal__select">
                            <option>Eco Mode + Off-Peak Scheduling</option>
                            <option>Aggressive HVAC Reduction</option>
                            <option>Lighting + Appliance Management</option>
                        </select>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Horizon</label>
                        <div className="ai-modal__radio-group">
                            <label className="ai-modal__radio"><input type="radio" name="horizon" defaultChecked />1 Month</label>
                            <label className="ai-modal__radio"><input type="radio" name="horizon" />3 Months</label>
                            <label className="ai-modal__radio"><input type="radio" name="horizon" />12 Months</label>
                        </div>
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Preview</label>
                        <div className="ai-modal__summary">Estimated savings and carbon impact will be shown after running the simulation.</div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Use simulations to compare action bundles before applying changes live.
                    </div>
                </div>
            ),
            "Create Scenario": (
                <div className="ai-modal__form">
                    <div className="ai-modal__input-group">
                        <label>Scenario Name</label>
                        <input className="ai-modal__input" placeholder="e.g., Weekend Saver" />
                    </div>

                    <div className="ai-modal__input-group">
                        <label>Included Actions</label>
                        <div className="ai-modal__checkbox"><input type="checkbox" defaultChecked /> Enable Eco Mode</div>
                        <div className="ai-modal__checkbox"><input type="checkbox" defaultChecked /> Off-Peak Schedules</div>
                        <div className="ai-modal__checkbox"><input type="checkbox" /> Reduce Lighting Levels</div>
                    </div>

                    <div className="ai-modal__info-box">
                        💡 Save scenario to run simulations or apply across rooms and devices.
                    </div>
                </div>
            ),
        };

        return baseInputs[action.actionLabel] || null;
    };

    return (
        <div className="ai-modal-overlay" onClick={onClose}>
            <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ai-modal__header">
                    <h3>{action.actionLabel}</h3>
                    <button className="ai-modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="ai-modal__body">
                    <p className="ai-modal__subtitle">{action.title}</p>
                    {getModalContent()}
                </div>

                <div className="ai-modal__footer">
                    <button className="ai-modal__btn ai-modal__btn--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="ai-modal__btn ai-modal__btn--confirm" onClick={onConfirm}>
                        Confirm & Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AiInsightsTab() {
    const [activeChannel, setActiveChannel] = useState(CHANNELS[0].id);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [completedActions, setCompletedActions] = useState(new Set());
    const [toast, setToast] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    useEffect(() => {
        apiFetch("/ai/insights")
            .then(setData)
            .catch((error) => {
                setLoadError(true);
                console.error("AI fetch failed:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const handleActionClick = (rec) => {
        const actionType = rec.actionLabel;
        
        // Map specific predictive/navigation actions to richer modals
        const actionToModalMap = {
            "Inspect Now": "Create Ticket",
            "Tune HVAC Runtime": "Adjust Rule",
            "Tune Water Heater Runtime": "Adjust Rule",
            "Tune Lighting Runtime": "Adjust Rule",
            "Optimize": "Adjust Rule",
            "Review": "View Options",
            "Review Forecast": "Review Forecast",
            "Apply Seasonal Plan": "Apply Seasonal Plan",
            "Plan Offsets": "Plan Offsets",
            "Reduce Source": "Reduce Source",
            "Plan Action": "Plan Action",
            "Apply Fix": "Apply Fix",
            "Run Simulation": "Run Simulation",
            "Create Scenario": "Create Scenario",
        };

        // Actions that require modal forms
        const modalActions = [
            "Enable Eco Mode",
            "Set Schedule",
            "Create Schedule",
            "Apply Threshold",
            "Connect Device",
            "Create Ticket",
            "Adjust Rule",
            "Improve Score",
            "Schedule Service",
            "View Options",
        ];

        // Actions that complete immediately
        const directActions = [
            "Sync Data",
            "Continue Tracking",
            "Keep Monitoring",
            "Monitor",
            "View Options",
            "Shop Now",
            "Explore Sensors",
            "Optimize",
            "Inspect Now",
            "Plan Action",
            "Run Routine Check",
            "Review",
            "Apply Fix",
        ];

        // If action maps to a modal, open the mapped modal (preserve rec for context)
        if (actionToModalMap[actionType]) {
            const mapped = actionToModalMap[actionType];
            setModalAction({ ...rec, actionLabel: mapped });
            return;
        }

        if (modalActions.includes(actionType)) {
            setModalAction(rec);
        } else if (directActions.includes(actionType)) {
            handleDirectAction(rec);
        } else {
            // Fallback for any unknown action type
            showToast(`${actionType} initiated...`, "success");
            console.log(`Action: ${actionType}`, rec);
        }
    };

    const handleDirectAction = (rec) => {
        const actionType = rec.actionLabel;
        
        // Comprehensive message map for all direct actions
        const messages = {
            "Sync Data": "Device data synchronization started. This may take 2-3 minutes.",
            "Continue Tracking": "Monitoring continued. Check back next month for seasonal insights.",
            "Keep Monitoring": "Monitoring active. We'll alert you to any anomalies.",
            "Monitor": `${rec.title} is now being monitored.`,
            "View Options": "Redirecting to smart thermostat options...",
            "Shop Now": "Opening product recommendations...",
            "Explore Sensors": "Motion sensor products are loading...",
            "Optimize": `Optimization queued for ${rec.title}.`,
            "Inspect Now": `Inspection scheduled for ${rec.title}.`,
            "Plan Action": `Carbon offset strategy planned.`,
            "Run Routine Check": "Running maintenance diagnostic...",
            "Review": `Opening detailed analysis for ${rec.title}...`,
            "Apply Fix": `Fix applied to ${rec.title}.`,
        };

        const message = messages[actionType] || `✓ ${actionType} initiated for ${rec.title}`;
        
        // Mark as completed for maintenance/monitoring actions
        const completeImmediately = [
            "Run Routine Check",
            "Keep Monitoring",
            "Continue Tracking",
            "Apply Fix",
            "Monitor",
        ];
        
        if (completeImmediately.includes(actionType)) {
            setCompletedActions((prev) => new Set([...prev, rec.id]));
        }
        
        showToast(message, "success");
        console.log(`Direct action executed: ${actionType}`, rec);
    };

    const handleModalConfirm = (rec) => {
        // Only mark as completed after modal confirmation
        setCompletedActions((prev) => new Set([...prev, rec.id]));
        setModalAction(null);

        const nonCompletingModals = ["View Options", "Shop Now"];

        const confirmMessages = {
            "Enable Eco Mode": "✓ Eco mode enabled! Temperature range applied. Expect 10-15% savings.",
            "Set Schedule": "✓ Schedule set successfully on selected days. Water heater optimized.",
            "Create Schedule": "✓ Off-peak schedule activated. Appliances will run during off-peak hours.",
            "Apply Threshold": "✓ New threshold applied and monitoring started 24/7.",
            "Connect Device": "✓ Device connected successfully. Sync starting in background.",
            "Create Ticket": "✓ Maintenance ticket created with priority assigned. Technician notified.",
            "Adjust Rule": "✓ Rule adjusted successfully. Automation running now.",
            "Improve Score": "✓ Maintenance plan created. Expected score improvement: +15 points.",
            "Schedule Service": "✓ Service scheduled successfully. Technician will contact you soon.",
            "Review Forecast": "✓ Forecast reviewed. Recommendations queued.",
            "Apply Seasonal Plan": "✓ Seasonal plan applied. Settings will adjust during season.",
            "Plan Offsets": "✓ Offset plan created. Monthly offsets scheduled.",
            "Reduce Source": "✓ Source reduction plan saved.",
            "Plan Action": "✓ Carbon action planned successfully.",
            "Apply Fix": "✓ Fix applied and monitoring started.",
            "Run Simulation": "✓ Simulation completed. Preview available.",
            "Create Scenario": "✓ Scenario saved. You can run it from the simulator.",
        };

        const message = confirmMessages[rec.actionLabel] || "✓ Action completed successfully!";

        // Don't mark navigational/product modals as completed
        if (!nonCompletingModals.includes(rec.actionLabel)) {
            setCompletedActions((prev) => new Set([...prev, rec.id]));
        }

        showToast(message, "success");
    };

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
                        const isCompleted = completedActions.has(rec.id) || rec.implemented;

                        return (
                            <article
                                key={rec.id}
                                className={`ai-card ${isCompleted ? "is-completed" : ""}`}
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

                                            {isCompleted && (
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
                                    className={`ai-card__action ${isCompleted ? "is-complete" : ""}`}
                                    disabled={isCompleted}
                                    onClick={() => !isCompleted && handleActionClick(rec)}
                                >
                                    {isCompleted ? "Completed" : rec.actionLabel}
                                    {!isCompleted && <ArrowRight size={14} />}
                                </button>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="ai-hub__empty">No insights are available for this module yet.</div>
            )}

            <ActionModal
                isOpen={!!modalAction}
                action={modalAction}
                onClose={() => setModalAction(null)}
                onConfirm={() => handleModalConfirm(modalAction)}
            />

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}
