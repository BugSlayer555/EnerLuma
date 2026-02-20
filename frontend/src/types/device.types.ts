// ─── Device Drill-Down Analytics Types ──────────────────────────────────────

// ─── Device Overview ────────────────────────────────────────────────────────
export interface DeviceProfile {
    id: string
    name: string
    icon: string
    type: string
    brand: string
    model: string
    location: string
    installDate: string
    warrantyExpiry: string
    status: 'online' | 'offline' | 'degraded' | 'maintenance'
    category: 'energy' | 'water'
}

// ─── Real-Time Consumption ──────────────────────────────────────────────────
export interface DeviceRealTime {
    currentPower: number            // kW or L/min
    unit: string
    todayUsage: number              // kWh or L
    todayUnit: string
    liveReadings: { time: string; value: number }[]
}

// ─── Historical Trend ───────────────────────────────────────────────────────
export interface DeviceHistorical {
    daily: { date: string; usage: number; cost: number }[]
    weekly: { week: string; usage: number; cost: number }[]
    monthly: { month: string; usage: number; cost: number }[]
}

// ─── KPI Data ───────────────────────────────────────────────────────────────
export interface DeviceKPI {
    label: string
    value: string | number
    unit: string
    trend: number                   // % change
    trendLabel: string
    icon: string
    color: string
}

// ─── Efficiency Score ───────────────────────────────────────────────────────
export interface DeviceEfficiency {
    score: number                   // 0-100
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
    gradeColor: string
    avgUsage: number
    optimalUsage: number
    wastedEnergy: number
    wastedCost: number
    tips: string[]
}

// ─── AI Recommendation ──────────────────────────────────────────────────────
export interface DeviceAIRecommendation {
    id: string
    title: string
    description: string
    confidence: number              // 0-100
    savingsPotential: number        // ₹/month
    priority: 'low' | 'medium' | 'high' | 'critical'
    actionLabel: string
}

// ─── Health Status ──────────────────────────────────────────────────────────
export interface DeviceHealthStatus {
    overallHealth: number           // 0-100
    status: 'healthy' | 'degraded' | 'critical'
    components: { name: string; health: number; status: 'good' | 'warning' | 'critical' }[]
    lastCheckup: string
    nextMaintenance: string
}

// ─── Monthly Cost Estimate ──────────────────────────────────────────────────
export interface DeviceCostEstimate {
    currentMonth: number            // ₹
    projectedMonth: number          // ₹
    lastMonth: number               // ₹
    dailyAvg: number                // ₹
    costTrend: { day: string; cost: number }[]
}

// ─── Carbon Footprint ───────────────────────────────────────────────────────
export interface DeviceCarbonImpact {
    monthlyEmissions: number        // kg CO₂
    yearlyEmissions: number
    comparedToAvg: number           // % vs similar devices
    treesEquivalent: number
    trend: { month: string; emissions: number }[]
}

// ─── Comparison vs Similar Devices ──────────────────────────────────────────
export interface DeviceComparison {
    metric: string
    yourValue: number
    avgValue: number
    bestValue: number
    unit: string
    percentile: number              // your device's percentile rank
}

// ─── Anomaly History ────────────────────────────────────────────────────────
export interface DeviceAnomaly {
    id: string
    date: string
    type: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    deviation: number               // %
    resolved: boolean
}

// ─── Maintenance Log ────────────────────────────────────────────────────────
export interface MaintenanceEntry {
    id: string
    date: string
    type: 'scheduled' | 'unscheduled' | 'repair' | 'inspection'
    description: string
    technician: string
    cost: number                    // ₹
    status: 'completed' | 'pending' | 'overdue'
}

// ─── Full Device Analytics Bundle ───────────────────────────────────────────
export interface DeviceAnalyticsData {
    profile: DeviceProfile
    realTime: DeviceRealTime
    historical: DeviceHistorical
    kpis: DeviceKPI[]
    efficiency: DeviceEfficiency
    aiRecommendations: DeviceAIRecommendation[]
    health: DeviceHealthStatus
    costEstimate: DeviceCostEstimate
    carbonImpact: DeviceCarbonImpact
    comparisons: DeviceComparison[]
    anomalies: DeviceAnomaly[]
    maintenanceLog: MaintenanceEntry[]
}
