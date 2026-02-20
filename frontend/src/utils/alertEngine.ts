// ─── Enterprise Alert Engine — Mock Data & Simulation ───────────────────────
import type {
    AlertItem, ToastAlert, AlertGroup, ThresholdConfig,
    AnomalyAlert, PredictiveWarning, DeviceHealth, AlertAnalytics,
} from '@/types/alerts.types'

// ─── Severity Colors (Light Theme) ──────────────────────────────────────────
export const severityConfig = {
    low: { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', label: 'Low', icon: 'ℹ️' },
    medium: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', label: 'Medium', icon: '⚠️' },
    high: { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', label: 'High', icon: '🔴' },
    critical: { color: '#dc2626', bg: '#fef2f2', border: '#f87171', label: 'Critical', icon: '🚨' },
}

// ─── Alert History ──────────────────────────────────────────────────────────
export function getAlertHistory(): AlertItem[] {
    return [
        { id: 'a1', title: 'HVAC Power Spike', message: 'HVAC drawing 12.4 kWh, exceeding 10 kWh threshold by 24%', severity: 'critical', status: 'active', category: 'threshold', device: 'HVAC System', deviceIcon: '❄️', timestamp: '2 min ago', value: 12.4, threshold: 10, unit: 'kWh' },
        { id: 'a2', title: 'Water Leak Suspected', message: 'Continuous water flow detected for 45 min with no scheduled usage', severity: 'high', status: 'active', category: 'anomaly', device: 'Kitchen Sink', deviceIcon: '🚰', timestamp: '18 min ago', value: 3.2, unit: 'L/min', confidence: 87 },
        { id: 'a3', title: 'EV Charger Peak Rate', message: 'Charging during peak hours (6-9 PM). Off-peak saves 38%', severity: 'medium', status: 'acknowledged', category: 'predictive', device: 'EV Charger', deviceIcon: '🔌', timestamp: '1 hr ago', value: 7.2, threshold: 6, unit: 'kWh' },
        { id: 'a4', title: 'Water Heater Temp High', message: 'Water heater thermostat at 68°C, above recommended 55°C', severity: 'high', status: 'active', category: 'threshold', device: 'Water Heater', deviceIcon: '🔥', timestamp: '2 hr ago', value: 68, threshold: 55, unit: '°C' },
        { id: 'a5', title: 'Refrigerator Door Ajar', message: 'Temperature rising — compressor cycling +40% more than baseline', severity: 'medium', status: 'snoozed', category: 'device', device: 'Refrigerator', deviceIcon: '🧊', timestamp: '3 hr ago', snoozedUntil: '30 min' },
        { id: 'a6', title: 'Solar Inverter Offline', message: 'Solar panel inverter lost connection at 14:22', severity: 'high', status: 'active', category: 'device', device: 'Solar Inverter', deviceIcon: '☀️', timestamp: '4 hr ago' },
        { id: 'a7', title: 'Shower Usage Above Average', message: 'Morning shower 14 min vs 8 min avg — 75% more water', severity: 'low', status: 'resolved', category: 'anomaly', device: 'Shower', deviceIcon: '🚿', timestamp: '6 hr ago', value: 14, threshold: 8, unit: 'min' },
        { id: 'a8', title: 'Monthly Budget 85% Used', message: 'Energy budget ₹1,700 of ₹2,000 used with 9 days remaining', severity: 'medium', status: 'active', category: 'predictive', device: 'System', deviceIcon: '💰', timestamp: '8 hr ago' },
        { id: 'a9', title: 'Washing Machine Cycle Complete', message: 'Eco-wash cycle finished — used 0.8 kWh (22% below avg)', severity: 'low', status: 'resolved', category: 'system', device: 'Washing Machine', deviceIcon: '🫧', timestamp: '12 hr ago' },
        { id: 'a10', title: 'Smart Plug Unresponsive', message: 'Entertainment center smart plug not responding for 2+ hours', severity: 'medium', status: 'active', category: 'device', device: 'Smart Plug #3', deviceIcon: '🔌', timestamp: '1 day ago' },
        { id: 'a11', title: 'Nighttime Consumption Anomaly', message: 'Unusual 2.1 kWh usage between 2-4 AM with no scheduled devices', severity: 'high', status: 'acknowledged', category: 'anomaly', device: 'Main Meter', deviceIcon: '⚡', timestamp: '1 day ago', value: 2.1, confidence: 92 },
        { id: 'a12', title: 'Filter Replacement Due', message: 'HVAC air filter at 92% capacity — replace within 5 days', severity: 'low', status: 'active', category: 'maintenance', device: 'HVAC Filter', deviceIcon: '🌬️', timestamp: '2 days ago' },
    ]
}

// ─── Toast Queue ────────────────────────────────────────────────────────────
export function getToastQueue(): ToastAlert[] {
    return [
        { id: 't1', title: 'HVAC Power Spike', message: 'Drawing 12.4 kWh — exceeds threshold', severity: 'critical', device: 'HVAC System', deviceIcon: '❄️', timestamp: 'Just now', autoDismiss: 8000 },
        { id: 't2', title: 'Water Leak Suspected', message: 'Continuous flow 45 min, no schedule', severity: 'high', device: 'Kitchen Sink', deviceIcon: '🚰', timestamp: '1 min ago', autoDismiss: 10000 },
    ]
}

// ─── Smart Alert Groups ─────────────────────────────────────────────────────
export function getAlertGroups(): AlertGroup[] {
    return [
        {
            groupId: 'g1', title: 'HVAC Threshold Breaches', device: 'HVAC System', deviceIcon: '❄️',
            severity: 'critical', count: 5, firstOccurrence: 'Feb 17, 9:30 AM', lastOccurrence: '2 min ago',
            snoozed: false,
            alerts: [
                { id: 'g1a1', title: 'HVAC Power Spike', message: '12.4 kWh at peak', severity: 'critical', status: 'active', category: 'threshold', device: 'HVAC', deviceIcon: '❄️', timestamp: '2 min ago', value: 12.4, threshold: 10, unit: 'kWh', groupId: 'g1' },
                { id: 'g1a2', title: 'HVAC Power Spike', message: '11.8 kWh at peak', severity: 'high', status: 'resolved', category: 'threshold', device: 'HVAC', deviceIcon: '❄️', timestamp: '6 hr ago', value: 11.8, threshold: 10, unit: 'kWh', groupId: 'g1' },
                { id: 'g1a3', title: 'HVAC Power Spike', message: '10.5 kWh at peak', severity: 'medium', status: 'resolved', category: 'threshold', device: 'HVAC', deviceIcon: '❄️', timestamp: '1 day ago', value: 10.5, threshold: 10, unit: 'kWh', groupId: 'g1' },
            ],
        },
        {
            groupId: 'g2', title: 'Water Usage Anomalies', device: 'Kitchen Sink', deviceIcon: '🚰',
            severity: 'high', count: 3, firstOccurrence: 'Feb 18, 2:15 PM', lastOccurrence: '18 min ago',
            snoozed: true, snoozeUntil: '1 hour',
            alerts: [
                { id: 'g2a1', title: 'Continuous Flow', message: 'Flow for 45 min', severity: 'high', status: 'active', category: 'anomaly', device: 'Kitchen Sink', deviceIcon: '🚰', timestamp: '18 min ago', groupId: 'g2' },
                { id: 'g2a2', title: 'Unusual Flow Rate', message: 'Flow rate 3.2 L/min at off-hours', severity: 'medium', status: 'resolved', category: 'anomaly', device: 'Kitchen Sink', deviceIcon: '🚰', timestamp: '1 day ago', groupId: 'g2' },
            ],
        },
        {
            groupId: 'g3', title: 'EV Charging Off-Peak Warnings', device: 'EV Charger', deviceIcon: '🔌',
            severity: 'medium', count: 8, firstOccurrence: 'Feb 14', lastOccurrence: '1 hr ago',
            snoozed: false,
            alerts: [
                { id: 'g3a1', title: 'Peak Rate Charging', message: 'Charging during 6-9 PM peak', severity: 'medium', status: 'acknowledged', category: 'predictive', device: 'EV Charger', deviceIcon: '🔌', timestamp: '1 hr ago', groupId: 'g3' },
            ],
        },
    ]
}

// ─── Threshold Configurations ───────────────────────────────────────────────
export function getThresholdConfigs(): ThresholdConfig[] {
    return [
        { id: 'th1', device: 'HVAC System', deviceIcon: '❄️', metric: 'Power Consumption', unit: 'kWh', currentValue: 8.4, minThreshold: 0, maxThreshold: 10, enabled: true, notifyVia: ['toast', 'email'], severity: 'high' },
        { id: 'th2', device: 'Water Heater', deviceIcon: '🔥', metric: 'Temperature', unit: '°C', currentValue: 58, minThreshold: 40, maxThreshold: 55, enabled: true, notifyVia: ['toast'], severity: 'high' },
        { id: 'th3', device: 'EV Charger', deviceIcon: '🔌', metric: 'Power Draw', unit: 'kWh', currentValue: 6.5, minThreshold: 0, maxThreshold: 8, enabled: true, notifyVia: ['toast', 'email', 'sms'], severity: 'medium' },
        { id: 'th4', device: 'Shower System', deviceIcon: '🚿', metric: 'Water Flow', unit: 'L/session', currentValue: 65, minThreshold: 0, maxThreshold: 80, enabled: true, notifyVia: ['toast'], severity: 'low' },
        { id: 'th5', device: 'Main Meter', deviceIcon: '⚡', metric: 'Daily Energy', unit: 'kWh', currentValue: 22.5, minThreshold: 0, maxThreshold: 30, enabled: true, notifyVia: ['toast', 'email'], severity: 'medium' },
        { id: 'th6', device: 'Refrigerator', deviceIcon: '🧊', metric: 'Power Consumption', unit: 'kWh', currentValue: 2.1, minThreshold: 0, maxThreshold: 3, enabled: false, notifyVia: ['toast'], severity: 'low' },
    ]
}

// ─── Anomaly Alerts ─────────────────────────────────────────────────────────
export function getAnomalyAlerts(): AnomalyAlert[] {
    return [
        { id: 'an1', device: 'Kitchen Sink', deviceIcon: '🚰', metric: 'Water Flow', expected: 0, actual: 3.2, deviation: 100, severity: 'high', confidence: 94, timestamp: '18 min ago', description: 'Continuous water flow detected with no scheduled usage. Pattern suggests a potential leak or faucet left open.', suggestedAction: 'Inspect kitchen sink plumbing and check for dripping faucets' },
        { id: 'an2', device: 'Main Meter', deviceIcon: '⚡', metric: 'Night Consumption', expected: 0.4, actual: 2.1, deviation: 425, severity: 'high', confidence: 92, timestamp: '1 day ago', description: 'Sudden 425% spike in nighttime energy consumption between 2-4 AM. No scheduled appliances during this window.', suggestedAction: 'Check for phantom loads or unauthorized device usage' },
        { id: 'an3', device: 'Refrigerator', deviceIcon: '🧊', metric: 'Compressor Cycles', expected: 6, actual: 10, deviation: 67, severity: 'medium', confidence: 86, timestamp: '3 hr ago', description: 'Compressor cycling 67% more than baseline — possibly door seal issue or temperature setting.', suggestedAction: 'Check door seal integrity and clean condenser coils' },
        { id: 'an4', device: 'Water Heater', deviceIcon: '🔥', metric: 'Energy per Heat Cycle', expected: 1.2, actual: 1.9, deviation: 58, severity: 'medium', confidence: 81, timestamp: '5 hr ago', description: 'Each heat cycle consuming 58% more energy than baseline — possible sediment buildup.', suggestedAction: 'Flush tank and inspect heating element' },
    ]
}

// ─── Predictive Warnings ────────────────────────────────────────────────────
export function getPredictiveWarnings(): PredictiveWarning[] {
    return [
        {
            id: 'pw1', device: 'HVAC System', deviceIcon: '❄️', metric: 'Power', unit: 'kWh',
            currentValue: 8.4, threshold: 10, predictedBreachTime: 'Today, 4:30 PM',
            timeUntilBreach: '~2 hours', confidence: 91, severity: 'high',
            trendData: [
                { time: '12 PM', value: 6.2 }, { time: '1 PM', value: 7.1 },
                { time: '2 PM', value: 7.8 }, { time: '3 PM', value: 8.4 },
                { time: '4 PM', value: 9.2 }, { time: '4:30 PM', value: 10.1 },
            ],
            preventiveAction: 'Pre-cool now and switch to eco mode before 4 PM to stay under threshold',
        },
        {
            id: 'pw2', device: 'Monthly Budget', deviceIcon: '💰', metric: 'Spending', unit: '₹',
            currentValue: 1700, threshold: 2000, predictedBreachTime: 'Feb 24',
            timeUntilBreach: '~5 days', confidence: 85, severity: 'medium',
            trendData: [
                { time: 'Feb 10', value: 850 }, { time: 'Feb 13', value: 1100 },
                { time: 'Feb 16', value: 1400 }, { time: 'Feb 19', value: 1700 },
                { time: 'Feb 22', value: 1900 }, { time: 'Feb 24', value: 2050 },
            ],
            preventiveAction: 'Reduce HVAC usage by 15% and shift EV charging to off-peak for remaining days',
        },
        {
            id: 'pw3', device: 'Water Heater', deviceIcon: '🔥', metric: 'Energy', unit: 'kWh',
            currentValue: 4.2, threshold: 5, predictedBreachTime: 'Tomorrow, 8 AM',
            timeUntilBreach: '~12 hours', confidence: 78, severity: 'medium',
            trendData: [
                { time: '6 AM', value: 2.8 }, { time: '10 AM', value: 3.4 },
                { time: '2 PM', value: 3.9 }, { time: '6 PM', value: 4.2 },
                { time: '10 PM', value: 4.6 }, { time: '8 AM+1', value: 5.1 },
            ],
            preventiveAction: 'Lower thermostat to 50°C and schedule heating only for morning/evening',
        },
    ]
}

// ─── Device Health ──────────────────────────────────────────────────────────
export function getDeviceHealthData(): DeviceHealth[] {
    return [
        { id: 'd1', name: 'HVAC System', icon: '❄️', status: 'online', healthScore: 78, uptime: '99.2%', lastPing: '30s ago', issues: ['Filter needs replacement'], metrics: [{ label: 'Power', value: '8.4 kWh', status: 'warning' }, { label: 'Temp', value: '22°C', status: 'good' }, { label: 'Efficiency', value: '72%', status: 'warning' }] },
        { id: 'd2', name: 'Water Heater', icon: '🔥', status: 'degraded', healthScore: 58, uptime: '97.8%', lastPing: '1m ago', issues: ['Heating element degradation', 'Temp above safe range'], metrics: [{ label: 'Temp', value: '68°C', status: 'critical' }, { label: 'Cycles', value: '12/day', status: 'warning' }, { label: 'Efficiency', value: '58%', status: 'critical' }] },
        { id: 'd3', name: 'EV Charger', icon: '🔌', status: 'online', healthScore: 92, uptime: '99.9%', lastPing: '15s ago', issues: [], metrics: [{ label: 'Power', value: '6.5 kWh', status: 'good' }, { label: 'Sessions', value: '2/day', status: 'good' }, { label: 'Efficiency', value: '94%', status: 'good' }] },
        { id: 'd4', name: 'Solar Inverter', icon: '☀️', status: 'offline', healthScore: 0, uptime: '94.1%', lastPing: '4 hr ago', issues: ['Connection lost', 'No output since 14:22'], metrics: [{ label: 'Output', value: '0 kW', status: 'critical' }, { label: 'Today', value: '3.2 kWh', status: 'warning' }, { label: 'Status', value: 'Offline', status: 'critical' }] },
        { id: 'd5', name: 'Refrigerator', icon: '🧊', status: 'degraded', healthScore: 71, uptime: '99.5%', lastPing: '45s ago', issues: ['Compressor cycling high'], metrics: [{ label: 'Temp', value: '4.2°C', status: 'good' }, { label: 'Power', value: '2.1 kWh', status: 'good' }, { label: 'Cycles', value: '10/day', status: 'warning' }] },
        { id: 'd6', name: 'Smart Plug #3', icon: '🔌', status: 'offline', healthScore: 0, uptime: '88.4%', lastPing: '2 hr ago', issues: ['Unresponsive', 'Firmware may need update'], metrics: [{ label: 'Status', value: 'Offline', status: 'critical' }, { label: 'Uptime', value: '88%', status: 'critical' }, { label: 'Signal', value: 'N/A', status: 'critical' }] },
    ]
}

// ─── Alert Analytics ────────────────────────────────────────────────────────
export function getAlertAnalytics(): AlertAnalytics {
    return {
        totalAlerts: 147,
        activeAlerts: 8,
        resolvedAlerts: 132,
        avgResponseTime: '4.2 min',
        severityDistribution: [
            { severity: 'critical', count: 12, color: '#dc2626' },
            { severity: 'high', count: 38, color: '#ef4444' },
            { severity: 'medium', count: 56, color: '#f59e0b' },
            { severity: 'low', count: 41, color: '#3b82f6' },
        ],
        dailyTrend: [
            { day: 'Mon', low: 5, medium: 8, high: 4, critical: 1 },
            { day: 'Tue', low: 3, medium: 6, high: 6, critical: 2 },
            { day: 'Wed', low: 7, medium: 10, high: 3, critical: 0 },
            { day: 'Thu', low: 4, medium: 7, high: 5, critical: 1 },
            { day: 'Fri', low: 6, medium: 5, high: 2, critical: 0 },
            { day: 'Sat', low: 2, medium: 4, high: 3, critical: 1 },
            { day: 'Sun', low: 3, medium: 3, high: 1, critical: 0 },
        ],
        topDevices: [
            { device: 'HVAC System', count: 34, icon: '❄️' },
            { device: 'Water Heater', count: 28, icon: '🔥' },
            { device: 'EV Charger', count: 22, icon: '🔌' },
            { device: 'Kitchen Sink', count: 18, icon: '🚰' },
            { device: 'Main Meter', count: 14, icon: '⚡' },
        ],
        categoryBreakdown: [
            { category: 'threshold', count: 52, color: '#ef4444' },
            { category: 'anomaly', count: 31, color: '#8b5cf6' },
            { category: 'predictive', count: 24, color: '#f59e0b' },
            { category: 'device', count: 22, color: '#3b82f6' },
            { category: 'maintenance', count: 12, color: '#14b8a6' },
            { category: 'system', count: 6, color: '#6b7280' },
        ],
    }
}
