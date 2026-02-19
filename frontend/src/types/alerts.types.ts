// ─── Enterprise Alerts Engine Types ─────────────────────────────────────────

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AlertStatus = 'active' | 'acknowledged' | 'snoozed' | 'resolved'
export type AlertCategory = 'threshold' | 'anomaly' | 'predictive' | 'maintenance' | 'device' | 'system'

// ─── Core Alert ─────────────────────────────────────────────────────────────
export interface AlertItem {
    id: string
    title: string
    message: string
    severity: AlertSeverity
    status: AlertStatus
    category: AlertCategory
    device: string
    deviceIcon: string
    timestamp: string               // ISO or relative
    value?: number                  // current reading
    threshold?: number              // threshold that was breached
    unit?: string
    groupId?: string                // for smart grouping
    snoozedUntil?: string
    acknowledged?: boolean
    predictedTime?: string          // for predictive alerts
    confidence?: number             // 0-100 for anomaly/predictive
}

// ─── Toast Notification ─────────────────────────────────────────────────────
export interface ToastAlert {
    id: string
    title: string
    message: string
    severity: AlertSeverity
    device: string
    deviceIcon: string
    timestamp: string
    autoDismiss: number             // ms
}

// ─── Alert Group ────────────────────────────────────────────────────────────
export interface AlertGroup {
    groupId: string
    title: string
    device: string
    deviceIcon: string
    severity: AlertSeverity
    count: number
    firstOccurrence: string
    lastOccurrence: string
    alerts: AlertItem[]
    snoozed: boolean
    snoozeUntil?: string
}

// ─── Threshold Config ───────────────────────────────────────────────────────
export interface ThresholdConfig {
    id: string
    device: string
    deviceIcon: string
    metric: string
    unit: string
    currentValue: number
    minThreshold: number
    maxThreshold: number
    enabled: boolean
    notifyVia: ('toast' | 'email' | 'sms')[]
    severity: AlertSeverity
}

// ─── Anomaly Detection ──────────────────────────────────────────────────────
export interface AnomalyAlert {
    id: string
    device: string
    deviceIcon: string
    metric: string
    expected: number
    actual: number
    deviation: number               // % deviation
    severity: AlertSeverity
    confidence: number              // 0-100
    timestamp: string
    description: string
    suggestedAction: string
}

// ─── Predictive Warning ─────────────────────────────────────────────────────
export interface PredictiveWarning {
    id: string
    device: string
    deviceIcon: string
    metric: string
    unit: string
    currentValue: number
    threshold: number
    predictedBreachTime: string
    timeUntilBreach: string
    trendData: { time: string; value: number }[]
    confidence: number
    preventiveAction: string
    severity: AlertSeverity
}

// ─── Device Health ──────────────────────────────────────────────────────────
export interface DeviceHealth {
    id: string
    name: string
    icon: string
    status: 'online' | 'offline' | 'degraded' | 'maintenance'
    healthScore: number              // 0-100
    uptime: string
    lastPing: string
    issues: string[]
    metrics: { label: string; value: string; status: 'good' | 'warning' | 'critical' }[]
}

// ─── Alert Analytics ────────────────────────────────────────────────────────
export interface AlertAnalytics {
    totalAlerts: number
    activeAlerts: number
    resolvedAlerts: number
    avgResponseTime: string
    severityDistribution: { severity: AlertSeverity; count: number; color: string }[]
    dailyTrend: { day: string; low: number; medium: number; high: number; critical: number }[]
    topDevices: { device: string; count: number; icon: string }[]
    categoryBreakdown: { category: AlertCategory; count: number; color: string }[]
}
