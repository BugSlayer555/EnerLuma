// ─── Enterprise AI Engine — Mock Data & Simulation ──────────────────────────
// In production, these would call ML microservices via API.
// For the frontend demo, we generate realistic simulated data.

import type {
    AppliancePrediction, BillPrediction, BillBreakdownItem,
    SeasonalPattern, SmartThreshold, ApplianceEfficiency,
    CarbonFootprint, CarbonMonthly, CarbonBreakdown,
    BehavioralInsight, MaintenanceAlert, SavingsScenario,
    AIRecommendation,
} from '@/types/ai.types'

// ─── Appliance Predictive Modeling ──────────────────────────────────────────
export function getAppliancePredictions(): AppliancePrediction[] {
    return [
        { applianceId: 'hvac', name: 'HVAC System', icon: '❄️', currentUsage: 8.4, predictedUsage: 9.1, usageTrend: 8.3, anomalyDetected: false, confidence: 94, predictedCost: 72, category: 'energy' },
        { applianceId: 'water-heater', name: 'Water Heater', icon: '🔥', currentUsage: 4.2, predictedUsage: 4.8, usageTrend: 14.3, anomalyDetected: true, confidence: 87, predictedCost: 38, category: 'energy' },
        { applianceId: 'refrigerator', name: 'Refrigerator', icon: '🧊', currentUsage: 2.1, predictedUsage: 2.0, usageTrend: -4.8, anomalyDetected: false, confidence: 96, predictedCost: 16, category: 'energy' },
        { applianceId: 'washing-machine', name: 'Washing Machine', icon: '🫧', currentUsage: 1.8, predictedUsage: 1.6, usageTrend: -11.1, anomalyDetected: false, confidence: 91, predictedCost: 13, category: 'energy' },
        { applianceId: 'ev-charger', name: 'EV Charger', icon: '🔌', currentUsage: 6.5, predictedUsage: 7.2, usageTrend: 10.8, anomalyDetected: false, confidence: 88, predictedCost: 57, category: 'energy' },
        { applianceId: 'shower', name: 'Shower System', icon: '🚿', currentUsage: 85, predictedUsage: 78, usageTrend: -8.2, anomalyDetected: false, confidence: 92, predictedCost: 6, category: 'water' },
    ]
}

// ─── Monthly Bill Prediction ────────────────────────────────────────────────
export function getBillPrediction(): BillPrediction {
    const breakdown: BillBreakdownItem[] = [
        { category: 'HVAC', amount: 720, percentage: 36, color: '#14b8a6' },
        { category: 'EV Charging', amount: 570, percentage: 28.5, color: '#06b6d4' },
        { category: 'Water Heating', amount: 380, percentage: 19, color: '#f59e0b' },
        { category: 'Appliances', amount: 210, percentage: 10.5, color: '#8b5cf6' },
        { category: 'Lighting', amount: 120, percentage: 6, color: '#10b981' },
    ]
    return {
        month: 'March 2026',
        predictedAmount: 2000,
        confidenceLow: 1780,
        confidenceHigh: 2220,
        previousAmount: 2180,
        savingsPotential: 340,
        confidence: 91,
        breakdown,
    }
}

// ─── Seasonal Pattern Detection ─────────────────────────────────────────────
export function getSeasonalPatterns(): SeasonalPattern[] {
    return [
        { season: 'summer', avgConsumption: 28.5, peakMonth: 'May', dominantAppliance: 'HVAC (AC)', expectedChange: 42, tips: ['Pre-cool home during off-peak hours', 'Raise thermostat by 2°C', 'Use ceiling fans to supplement AC'], color: '#ef4444' },
        { season: 'monsoon', avgConsumption: 18.2, peakMonth: 'Aug', dominantAppliance: 'Water Heater', expectedChange: -12, tips: ['Shorter hot water cycles', 'Collect rainwater for garden', 'Check for humidity-related leaks'], color: '#3b82f6' },
        { season: 'winter', avgConsumption: 22.1, peakMonth: 'Jan', dominantAppliance: 'Space Heater', expectedChange: 18, tips: ['Use smart thermostat scheduling', 'Seal drafty windows', 'Layer clothing before heating'], color: '#6366f1' },
        { season: 'spring', avgConsumption: 15.8, peakMonth: 'Mar', dominantAppliance: 'Lighting', expectedChange: -28, tips: ['Maximize natural daylight', 'Open windows for ventilation', 'Great time to audit devices'], color: '#10b981' },
    ]
}

// ─── Smart Auto-Threshold Adjustment ────────────────────────────────────────
export function getSmartThresholds(): SmartThreshold[] {
    return [
        { applianceId: 'hvac', name: 'HVAC System', currentThreshold: 10, suggestedThreshold: 8.5, reason: 'Consumption patterns show avg 7.2 kWh; tighter threshold catches anomalies earlier', impact: 'Catch 23% more anomalies', autoAdjusted: true, lastUpdated: '2 hours ago' },
        { applianceId: 'water-heater', name: 'Water Heater', currentThreshold: 5, suggestedThreshold: 4.2, reason: 'Recent 14% spike suggests degradation; lower threshold for early detection', impact: 'Prevent ₹400/mo waste', autoAdjusted: false, lastUpdated: '1 day ago' },
        { applianceId: 'ev-charger', name: 'EV Charger', currentThreshold: 8, suggestedThreshold: 7.5, reason: 'Nighttime charging pattern stabilized; fine-tune for off-peak optimization', impact: 'Save ₹180/mo on peak billing', autoAdjusted: true, lastUpdated: '5 hours ago' },
        { applianceId: 'shower', name: 'Shower System', currentThreshold: 100, suggestedThreshold: 90, reason: 'Water usage consistently below 85L; lowering detects leaks faster', impact: 'Detect leaks 40% faster', autoAdjusted: false, lastUpdated: '3 days ago' },
    ]
}

// ─── Efficiency Scoring per Appliance ───────────────────────────────────────
export function getEfficiencyScores(): ApplianceEfficiency[] {
    return [
        { applianceId: 'refrigerator', name: 'Refrigerator', icon: '🧊', score: 94, grade: 'A+', gradeColor: '#10b981', avgUsage: 2.1, optimalUsage: 2.0, wastedEnergy: 0.1, wastedCost: 8, recommendations: ['Excellent efficiency — maintain current settings'] },
        { applianceId: 'washing-machine', name: 'Washing Machine', icon: '🫧', score: 88, grade: 'A', gradeColor: '#14b8a6', avgUsage: 1.8, optimalUsage: 1.5, wastedEnergy: 0.3, wastedCost: 24, recommendations: ['Use cold water for light loads', 'Run full loads only'] },
        { applianceId: 'hvac', name: 'HVAC System', icon: '❄️', score: 72, grade: 'B', gradeColor: '#f59e0b', avgUsage: 8.4, optimalUsage: 6.5, wastedEnergy: 1.9, wastedCost: 152, recommendations: ['Clean filters monthly', 'Schedule off during away hours', 'Raise temp by 1°C'] },
        { applianceId: 'water-heater', name: 'Water Heater', icon: '🔥', score: 58, grade: 'C', gradeColor: '#ef4444', avgUsage: 4.2, optimalUsage: 2.8, wastedEnergy: 1.4, wastedCost: 112, recommendations: ['Insulate hot water pipes', 'Lower thermostat to 50°C', 'Schedule heating cycles'] },
        { applianceId: 'ev-charger', name: 'EV Charger', icon: '🔌', score: 81, grade: 'A', gradeColor: '#14b8a6', avgUsage: 6.5, optimalUsage: 5.8, wastedEnergy: 0.7, wastedCost: 56, recommendations: ['Shift charging to 11PM–5AM off-peak', 'Enable smart charge scheduling'] },
    ]
}

// ─── Carbon Footprint Estimation ────────────────────────────────────────────
export function getCarbonFootprint(): CarbonFootprint {
    const monthlyTrend: CarbonMonthly[] = [
        { month: 'Sep', emissions: 48 }, { month: 'Oct', emissions: 52 },
        { month: 'Nov', emissions: 58 }, { month: 'Dec', emissions: 62 },
        { month: 'Jan', emissions: 55 }, { month: 'Feb', emissions: 45 },
    ]
    const breakdown: CarbonBreakdown[] = [
        { source: 'Electricity (Grid)', emissions: 32, percentage: 58, color: '#f59e0b' },
        { source: 'Natural Gas', emissions: 12, percentage: 22, color: '#ef4444' },
        { source: 'Water Treatment', emissions: 6, percentage: 11, color: '#3b82f6' },
        { source: 'EV Charging', emissions: 5, percentage: 9, color: '#10b981' },
    ]
    return {
        totalEmissions: 55,
        monthlyTrend,
        breakdown,
        treesEquivalent: 3,
        carKmEquivalent: 220,
        offsetSuggestions: [
            'Switch to 100% renewable energy plan',
            'Install solar panels (estimated payback: 4 yrs)',
            'Reduce water heater usage by 20%',
        ],
        comparedToAvg: -18,
    }
}

// ─── Behavioral Pattern Insights ────────────────────────────────────────────
export function getBehavioralInsights(): BehavioralInsight[] {
    return [
        { id: 'b1', type: 'habit', title: 'Night Owl Energy Pattern', description: 'Your energy consumption spikes 35% between 11 PM – 2 AM on weekdays. Shifting heavy appliances to daytime could save ₹280/mo.', metric: '+35% after 11 PM', impact: 'negative', icon: '🌙', detectedAt: '2 days ago', confidence: 91 },
        { id: 'b2', type: 'achievement', title: 'Weekend Water Champion', description: 'Your weekend water usage dropped 22% over the last 3 months — consistent improvement!', metric: '-22% weekends', impact: 'positive', icon: '🏆', detectedAt: '1 week ago', confidence: 95 },
        { id: 'b3', type: 'anomaly', title: 'Phantom Load Detected', description: 'Standby power consumption of 0.8 kWh/day detected from entertainment system. Smart plug can eliminate this.', metric: '0.8 kWh/day wasted', impact: 'negative', icon: '👻', detectedAt: '3 hours ago', confidence: 88 },
        { id: 'b4', type: 'optimization', title: 'Optimal Laundry Window', description: 'Running your washing machine between 2–4 PM (solar peak) could reduce grid dependency by 40%.', metric: '40% solar aligned', impact: 'positive', icon: '☀️', detectedAt: '5 days ago', confidence: 84 },
        { id: 'b5', type: 'habit', title: 'Morning Shower Duration', description: 'Average shower duration increased from 8 min to 12 min over 30 days, adding ~40L daily water usage.', metric: '+50% duration', impact: 'negative', icon: '⏱️', detectedAt: '1 day ago', confidence: 92 },
    ]
}

// ─── Predictive Maintenance Alerts ──────────────────────────────────────────
export function getMaintenanceAlerts(): MaintenanceAlert[] {
    return [
        { applianceId: 'water-heater', name: 'Water Heater', icon: '🔥', status: 'needs_attention', healthScore: 62, predictedFailure: 'Mar 15, 2026', daysUntilMaintenance: 24, issueType: 'Heating element degradation', recommendation: 'Schedule inspection — element efficiency dropped 28% over 60 days', urgency: 'high', estimatedCost: 2500 },
        { applianceId: 'hvac', name: 'HVAC Filter', icon: '🌬️', status: 'degraded', healthScore: 45, predictedFailure: 'Feb 28, 2026', daysUntilMaintenance: 9, issueType: 'Filter clogging detected', recommendation: 'Replace HVAC filter — airflow reduced by 35%, causing 18% more energy draw', urgency: 'critical', estimatedCost: 800 },
        { applianceId: 'washer-pump', name: 'Washer Drain Pump', icon: '🫧', status: 'optimal', healthScore: 89, predictedFailure: 'Jun 2026', daysUntilMaintenance: 120, issueType: 'Normal wear', recommendation: 'No action needed — schedule routine check in 4 months', urgency: 'low', estimatedCost: 1200 },
    ]
}

// ─── Savings Simulation ─────────────────────────────────────────────────────
export function getSavingsScenarios(): SavingsScenario[] {
    return [
        { id: 's1', title: 'Reduce HVAC by 10%', description: 'Raise thermostat by 1°C and use fan-assist mode', reductionPercent: 10, monthlySavings: 180, annualSavings: 2160, carbonReduction: 4.2, difficulty: 'easy', appliances: ['HVAC'] },
        { id: 's2', title: 'Off-peak EV Charging', description: 'Shift EV charging to 11 PM – 5 AM time-of-use window', reductionPercent: 15, monthlySavings: 320, annualSavings: 3840, carbonReduction: 6.8, difficulty: 'easy', appliances: ['EV Charger'] },
        { id: 's3', title: 'Water Heater Optimization', description: 'Lower temp to 50°C + insulate pipes + schedule heating', reductionPercent: 25, monthlySavings: 240, annualSavings: 2880, carbonReduction: 3.6, difficulty: 'medium', appliances: ['Water Heater'] },
        { id: 's4', title: 'Full Smart Home Bundle', description: 'Implement all optimizations + solar panels + smart plugs', reductionPercent: 40, monthlySavings: 880, annualSavings: 10560, carbonReduction: 18.5, difficulty: 'hard', appliances: ['All Appliances'] },
        { id: 's5', title: 'Eliminate Phantom Loads', description: 'Install smart plugs on standby-heavy devices', reductionPercent: 5, monthlySavings: 95, annualSavings: 1140, carbonReduction: 2.1, difficulty: 'easy', appliances: ['Entertainment', 'Office'] },
    ]
}

// ─── AI Recommendations with Confidence ─────────────────────────────────────
export function getAIRecommendations(): AIRecommendation[] {
    return [
        { id: 'r1', title: 'Replace HVAC Filter Immediately', description: 'Clogged filter is causing 18% excess energy draw. Replacement will pay for itself in 2 weeks.', category: 'maintenance', priority: 'critical', confidence: 96, potentialSavings: 280, carbonImpact: 5.2, timeToImplement: '30 minutes', actionLabel: 'Schedule Service', implemented: false, icon: '🔧' },
        { id: 'r2', title: 'Switch to Off-Peak EV Charging', description: 'Your EV charges during peak hours (6-9 PM). Shifting to off-peak saves 38% on charging costs.', category: 'cost', priority: 'high', confidence: 93, potentialSavings: 320, carbonImpact: 6.8, timeToImplement: '5 minutes', actionLabel: 'Set Schedule', implemented: false, icon: '⚡' },
        { id: 'r3', title: 'Insulate Water Heater Pipes', description: 'Heat loss through uninsulated pipes wastes ₹112/month. Quick DIY fix with pipe foam.', category: 'energy', priority: 'medium', confidence: 89, potentialSavings: 112, carbonImpact: 2.4, timeToImplement: '1 hour', actionLabel: 'View Guide', implemented: false, icon: '🔥' },
        { id: 'r4', title: 'Install Smart Power Strips', description: 'Phantom loads from entertainment system waste 0.8 kWh/day. Smart strips auto-cut standby power.', category: 'energy', priority: 'medium', confidence: 88, potentialSavings: 95, carbonImpact: 2.1, timeToImplement: '15 minutes', actionLabel: 'Shop Now', implemented: false, icon: '🔌' },
        { id: 'r5', title: 'Reduce Shower Duration to 8 min', description: 'Recent trend shows 12-min avg showers. Reducing to 8 min saves 40L water/day.', category: 'water', priority: 'low', confidence: 92, potentialSavings: 45, carbonImpact: 0.8, timeToImplement: 'Ongoing', actionLabel: 'Set Timer', implemented: true, icon: '🚿' },
        { id: 'r6', title: 'Solar Panel Installation', description: 'Based on your roof area and consumption, solar could offset 65% of grid usage with 4-year payback.', category: 'sustainability', priority: 'low', confidence: 78, potentialSavings: 1200, carbonImpact: 22, timeToImplement: '2 weeks', actionLabel: 'Get Quote', implemented: false, icon: '☀️' },
    ]
}
