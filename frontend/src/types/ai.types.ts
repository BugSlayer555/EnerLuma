// ─── Enterprise AI Module Types ──────────────────────────────────────────────

export type ConfidenceLevel = 'high' | 'medium' | 'low'
export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Season = 'summer' | 'monsoon' | 'winter' | 'spring'
export type ApplianceStatus = 'optimal' | 'degraded' | 'needs_attention' | 'critical'

// ─── Appliance Predictive Model ─────────────────────────────────────────────
export interface AppliancePrediction {
    applianceId: string
    name: string
    icon: string
    currentUsage: number          // kWh today
    predictedUsage: number        // kWh predicted
    usageTrend: number            // % change
    anomalyDetected: boolean
    confidence: number            // 0-100
    predictedCost: number         // ₹
    category: 'energy' | 'water'
}

// ─── Bill Prediction ────────────────────────────────────────────────────────
export interface BillPrediction {
    month: string
    predictedAmount: number       // ₹
    confidenceLow: number         // lower bound ₹
    confidenceHigh: number        // upper bound ₹
    previousAmount: number        // ₹
    savingsPotential: number      // ₹
    confidence: number            // 0-100
    breakdown: BillBreakdownItem[]
}

export interface BillBreakdownItem {
    category: string
    amount: number
    percentage: number
    color: string
}

// ─── Seasonal Pattern ───────────────────────────────────────────────────────
export interface SeasonalPattern {
    season: Season
    avgConsumption: number        // kWh
    peakMonth: string
    dominantAppliance: string
    expectedChange: number        // % vs current
    tips: string[]
    color: string
}

// ─── Smart Auto-Threshold ───────────────────────────────────────────────────
export interface SmartThreshold {
    applianceId: string
    name: string
    currentThreshold: number
    suggestedThreshold: number
    reason: string
    impact: string
    autoAdjusted: boolean
    lastUpdated: string
}

// ─── Efficiency Score ───────────────────────────────────────────────────────
export interface ApplianceEfficiency {
    applianceId: string
    name: string
    icon: string
    score: number                 // 0-100
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
    gradeColor: string
    avgUsage: number
    optimalUsage: number
    wastedEnergy: number          // kWh
    wastedCost: number            // ₹
    recommendations: string[]
}

// ─── Carbon Footprint ───────────────────────────────────────────────────────
export interface CarbonFootprint {
    totalEmissions: number        // kg CO₂
    monthlyTrend: CarbonMonthly[]
    breakdown: CarbonBreakdown[]
    treesEquivalent: number
    carKmEquivalent: number
    offsetSuggestions: string[]
    comparedToAvg: number         // % above/below avg
}

export interface CarbonMonthly {
    month: string
    emissions: number
}

export interface CarbonBreakdown {
    source: string
    emissions: number
    percentage: number
    color: string
}

// ─── Behavioral Insight ─────────────────────────────────────────────────────
export interface BehavioralInsight {
    id: string
    type: 'habit' | 'anomaly' | 'optimization' | 'achievement'
    title: string
    description: string
    metric: string
    impact: 'positive' | 'negative' | 'neutral'
    icon: string
    detectedAt: string
    confidence: number
}

// ─── Predictive Maintenance ─────────────────────────────────────────────────
export interface MaintenanceAlert {
    applianceId: string
    name: string
    icon: string
    status: ApplianceStatus
    healthScore: number           // 0-100
    predictedFailure: string      // date
    daysUntilMaintenance: number
    issueType: string
    recommendation: string
    urgency: Severity
    estimatedCost: number         // ₹ repair cost
}

// ─── Savings Simulation ─────────────────────────────────────────────────────
export interface SavingsScenario {
    id: string
    title: string
    description: string
    reductionPercent: number       // %
    monthlySavings: number         // ₹
    annualSavings: number          // ₹
    carbonReduction: number        // kg CO₂
    difficulty: 'easy' | 'medium' | 'hard'
    appliances: string[]
}

// ─── AI Recommendation ──────────────────────────────────────────────────────
export interface AIRecommendation {
    id: string
    title: string
    description: string
    category: 'energy' | 'water' | 'cost' | 'maintenance' | 'sustainability'
    priority: Severity
    confidence: number             // 0-100
    potentialSavings: number       // ₹ per month
    carbonImpact: number           // kg CO₂
    timeToImplement: string
    actionLabel: string
    implemented: boolean
    icon: string
}
