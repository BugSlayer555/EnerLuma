// ─── Device Drill-Down Engine — Mock Data ───────────────────────────────────
import type { DeviceAnalyticsData } from '@/types/device.types'

// ─── All devices list ───────────────────────────────────────────────────────
export const deviceList = [
    { id: 'hvac', name: 'HVAC System', icon: '❄️', type: 'Climate', category: 'energy' as const },
    { id: 'water-heater', name: 'Water Heater', icon: '🔥', type: 'Heating', category: 'energy' as const },
    { id: 'ev-charger', name: 'EV Charger', icon: '🔌', type: 'Charging', category: 'energy' as const },
    { id: 'refrigerator', name: 'Refrigerator', icon: '🧊', type: 'Cooling', category: 'energy' as const },
    { id: 'washing-machine', name: 'Washing Machine', icon: '🫧', type: 'Laundry', category: 'water' as const },
    { id: 'shower', name: 'Shower System', icon: '🚿', type: 'Plumbing', category: 'water' as const },
]

// ─── Get full analytics for a device ────────────────────────────────────────
export function getDeviceAnalytics(deviceId: string): DeviceAnalyticsData {
    // Default to HVAC if unknown
    const devices: Record<string, DeviceAnalyticsData> = {
        'hvac': hvacData(),
        'water-heater': waterHeaterData(),
        'ev-charger': evChargerData(),
        'refrigerator': fridgeData(),
        'washing-machine': washerData(),
        'shower': showerData(),
    }
    return devices[deviceId] || devices['hvac']
}

// ─── HVAC System ────────────────────────────────────────────────────────────
function hvacData(): DeviceAnalyticsData {
    return {
        profile: {
            id: 'hvac', name: 'HVAC System', icon: '❄️', type: 'Split AC + Furnace',
            brand: 'Daikin', model: 'FTKF50TV16U', location: 'Living Room',
            installDate: 'Mar 2023', warrantyExpiry: 'Mar 2028',
            status: 'online', category: 'energy',
        },
        realTime: {
            currentPower: 2.4, unit: 'kW', todayUsage: 8.4, todayUnit: 'kWh',
            liveReadings: [
                { time: '2:00', value: 1.8 }, { time: '2:05', value: 2.1 },
                { time: '2:10', value: 2.3 }, { time: '2:15', value: 2.4 },
                { time: '2:20', value: 2.6 }, { time: '2:25', value: 2.4 },
                { time: '2:30', value: 2.2 }, { time: '2:35', value: 2.5 },
                { time: '2:40', value: 2.3 }, { time: '2:45', value: 2.4 },
            ],
        },
        historical: {
            daily: [
                { date: 'Mon', usage: 7.2, cost: 58 }, { date: 'Tue', usage: 8.1, cost: 65 },
                { date: 'Wed', usage: 9.4, cost: 75 }, { date: 'Thu', usage: 7.8, cost: 62 },
                { date: 'Fri', usage: 8.4, cost: 67 }, { date: 'Sat', usage: 6.5, cost: 52 },
                { date: 'Sun', usage: 5.9, cost: 47 },
            ],
            weekly: [
                { week: 'W1', usage: 52, cost: 416 }, { week: 'W2', usage: 58, cost: 464 },
                { week: 'W3', usage: 49, cost: 392 }, { week: 'W4', usage: 55, cost: 440 },
            ],
            monthly: [
                { month: 'Sep', usage: 180, cost: 1440 }, { month: 'Oct', usage: 210, cost: 1680 },
                { month: 'Nov', usage: 240, cost: 1920 }, { month: 'Dec', usage: 280, cost: 2240 },
                { month: 'Jan', usage: 250, cost: 2000 }, { month: 'Feb', usage: 220, cost: 1760 },
            ],
        },
        kpis: [
            { label: 'Today', value: '8.4', unit: 'kWh', trend: 8.3, trendLabel: 'vs yesterday', icon: '⚡', color: '#14b8a6' },
            { label: 'This Month', value: '₹1,760', unit: '', trend: -12, trendLabel: 'vs Jan', icon: '💰', color: '#10b981' },
            { label: 'Efficiency', value: 72, unit: '%', trend: -3, trendLabel: 'vs last month', icon: '📊', color: '#f59e0b' },
            { label: 'Health', value: 78, unit: '%', trend: -5, trendLabel: 'declining', icon: '💚', color: '#ef4444' },
            { label: 'CO₂ Impact', value: '12.8', unit: 'kg/mo', trend: -8, trendLabel: 'improving', icon: '🌱', color: '#10b981' },
        ],
        efficiency: {
            score: 72, grade: 'B', gradeColor: '#f59e0b',
            avgUsage: 8.4, optimalUsage: 6.5, wastedEnergy: 1.9, wastedCost: 152,
            tips: ['Clean filters monthly — airflow down 35%', 'Schedule off during away hours', 'Raise thermostat by 1°C to save 8%', 'Use fan-assist mode in spring'],
        },
        aiRecommendations: [
            { id: 'ar1', title: 'Replace HVAC Filter Now', description: 'Clogged filter causing 18% excess energy draw. Pays for itself in 2 weeks.', confidence: 96, savingsPotential: 280, priority: 'critical', actionLabel: 'Schedule Service' },
            { id: 'ar2', title: 'Enable Smart Scheduling', description: 'Auto off during 9 AM–5 PM weekdays when house is empty.', confidence: 91, savingsPotential: 180, priority: 'high', actionLabel: 'Set Schedule' },
            { id: 'ar3', title: 'Raise Temp by 1°C', description: 'Small change, big savings — reduces cooling load ~8%.', confidence: 88, savingsPotential: 65, priority: 'medium', actionLabel: 'Adjust' },
        ],
        health: {
            overallHealth: 78, status: 'degraded', lastCheckup: 'Jan 15, 2026', nextMaintenance: 'Mar 01, 2026',
            components: [
                { name: 'Compressor', health: 85, status: 'good' },
                { name: 'Air Filter', health: 45, status: 'critical' },
                { name: 'Thermostat', health: 92, status: 'good' },
                { name: 'Fan Motor', health: 78, status: 'warning' },
                { name: 'Refrigerant', health: 88, status: 'good' },
            ],
        },
        costEstimate: {
            currentMonth: 1540, projectedMonth: 1760, lastMonth: 2000, dailyAvg: 62,
            costTrend: [
                { day: 'Mon', cost: 58 }, { day: 'Tue', cost: 65 }, { day: 'Wed', cost: 75 },
                { day: 'Thu', cost: 62 }, { day: 'Fri', cost: 67 }, { day: 'Sat', cost: 52 }, { day: 'Sun', cost: 47 },
            ],
        },
        carbonImpact: {
            monthlyEmissions: 12.8, yearlyEmissions: 154, comparedToAvg: -14, treesEquivalent: 1.2,
            trend: [
                { month: 'Sep', emissions: 10.5 }, { month: 'Oct', emissions: 12.2 },
                { month: 'Nov', emissions: 14.0 }, { month: 'Dec', emissions: 16.3 },
                { month: 'Jan', emissions: 14.5 }, { month: 'Feb', emissions: 12.8 },
            ],
        },
        comparisons: [
            { metric: 'Daily Usage', yourValue: 8.4, avgValue: 7.2, bestValue: 5.0, unit: 'kWh', percentile: 62 },
            { metric: 'Monthly Cost', yourValue: 1760, avgValue: 1500, bestValue: 1050, unit: '₹', percentile: 55 },
            { metric: 'Efficiency', yourValue: 72, avgValue: 78, bestValue: 95, unit: '%', percentile: 38 },
            { metric: 'Carbon/mo', yourValue: 12.8, avgValue: 10.5, bestValue: 6.0, unit: 'kg', percentile: 42 },
        ],
        anomalies: [
            { id: 'x1', date: 'Feb 19, 2:12 PM', type: 'Power Spike', severity: 'critical', description: 'Drew 12.4 kWh — 24% above 10 kWh threshold', deviation: 24, resolved: false },
            { id: 'x2', date: 'Feb 17, 11:30 PM', type: 'Night Usage', severity: 'medium', description: 'Ran at full power during sleep hours (11 PM – 5 AM)', deviation: 45, resolved: true },
            { id: 'x3', date: 'Feb 14, 3:00 PM', type: 'Cycle Anomaly', severity: 'high', description: 'Compressor cycling 40% more than baseline — filter issue', deviation: 40, resolved: false },
            { id: 'x4', date: 'Feb 10, 9:00 AM', type: 'Temp Drift', severity: 'low', description: 'Room temp exceeded setpoint by 3°C for 2+ hours', deviation: 12, resolved: true },
        ],
        maintenanceLog: [
            { id: 'm1', date: 'Jan 15, 2026', type: 'inspection', description: 'Annual inspection — found filter clogging', technician: 'Rajesh K.', cost: 500, status: 'completed' },
            { id: 'm2', date: 'Mar 01, 2026', type: 'scheduled', description: 'Filter replacement + coil cleaning', technician: 'Pending', cost: 1200, status: 'pending' },
            { id: 'm3', date: 'Oct 20, 2025', type: 'repair', description: 'Fan motor bearing replacement', technician: 'Amit S.', cost: 3500, status: 'completed' },
            { id: 'm4', date: 'Jun 05, 2025', type: 'scheduled', description: 'Refrigerant top-up + deep clean', technician: 'Rajesh K.', cost: 2800, status: 'completed' },
        ],
    }
}

// ─── Water Heater ───────────────────────────────────────────────────────────
function waterHeaterData(): DeviceAnalyticsData {
    return {
        profile: { id: 'water-heater', name: 'Water Heater', icon: '🔥', type: 'Storage Geyser 25L', brand: 'Havells', model: 'Instanio Prime', location: 'Bathroom', installDate: 'Nov 2022', warrantyExpiry: 'Nov 2027', status: 'degraded', category: 'energy' },
        realTime: { currentPower: 1.8, unit: 'kW', todayUsage: 4.2, todayUnit: 'kWh', liveReadings: [{ time: '6:00', value: 2.0 }, { time: '6:10', value: 1.9 }, { time: '6:20', value: 1.8 }, { time: '6:30', value: 0 }, { time: '6:40', value: 0 }, { time: '7:00', value: 2.0 }, { time: '7:10', value: 1.9 }, { time: '7:20', value: 1.8 }] },
        historical: { daily: [{ date: 'Mon', usage: 3.8, cost: 30 }, { date: 'Tue', usage: 4.1, cost: 33 }, { date: 'Wed', usage: 4.5, cost: 36 }, { date: 'Thu', usage: 3.9, cost: 31 }, { date: 'Fri', usage: 4.2, cost: 34 }, { date: 'Sat', usage: 5.0, cost: 40 }, { date: 'Sun', usage: 4.8, cost: 38 }], weekly: [{ week: 'W1', usage: 28, cost: 224 }, { week: 'W2', usage: 31, cost: 248 }, { week: 'W3', usage: 27, cost: 216 }, { week: 'W4', usage: 30, cost: 240 }], monthly: [{ month: 'Sep', usage: 95, cost: 760 }, { month: 'Oct', usage: 105, cost: 840 }, { month: 'Nov', usage: 120, cost: 960 }, { month: 'Dec', usage: 135, cost: 1080 }, { month: 'Jan', usage: 125, cost: 1000 }, { month: 'Feb', usage: 115, cost: 920 }] },
        kpis: [{ label: 'Today', value: '4.2', unit: 'kWh', trend: 14.3, trendLabel: 'vs yesterday', icon: '⚡', color: '#ef4444' }, { label: 'This Month', value: '₹920', unit: '', trend: -8, trendLabel: 'vs Jan', icon: '💰', color: '#10b981' }, { label: 'Efficiency', value: 58, unit: '%', trend: -12, trendLabel: 'dropping', icon: '📊', color: '#ef4444' }, { label: 'Health', value: 62, unit: '%', trend: -10, trendLabel: 'declining', icon: '💚', color: '#ef4444' }, { label: 'CO₂', value: '6.7', unit: 'kg/mo', trend: 5, trendLabel: 'rising', icon: '🌱', color: '#f59e0b' }],
        efficiency: { score: 58, grade: 'C', gradeColor: '#ef4444', avgUsage: 4.2, optimalUsage: 2.8, wastedEnergy: 1.4, wastedCost: 112, tips: ['Insulate hot water pipes', 'Lower thermostat to 50°C', 'Schedule heating for morning/evening only', 'Flush tank to remove sediment'] },
        aiRecommendations: [{ id: 'wr1', title: 'Flush Tank Immediately', description: 'Sediment buildup causing 58% efficiency drop and 28% more energy per cycle.', confidence: 92, savingsPotential: 180, priority: 'high', actionLabel: 'Schedule Flush' }, { id: 'wr2', title: 'Lower Thermostat to 50°C', description: 'Currently at 68°C — well above needed. Lower temp saves ₹90/mo.', confidence: 95, savingsPotential: 90, priority: 'medium', actionLabel: 'Adjust Temp' }],
        health: { overallHealth: 62, status: 'degraded', lastCheckup: 'Dec 10, 2025', nextMaintenance: 'Mar 10, 2026', components: [{ name: 'Heating Element', health: 55, status: 'warning' }, { name: 'Thermostat', health: 70, status: 'warning' }, { name: 'Anode Rod', health: 40, status: 'critical' }, { name: 'Tank Lining', health: 82, status: 'good' }] },
        costEstimate: { currentMonth: 780, projectedMonth: 920, lastMonth: 1000, dailyAvg: 34, costTrend: [{ day: 'Mon', cost: 30 }, { day: 'Tue', cost: 33 }, { day: 'Wed', cost: 36 }, { day: 'Thu', cost: 31 }, { day: 'Fri', cost: 34 }, { day: 'Sat', cost: 40 }, { day: 'Sun', cost: 38 }] },
        carbonImpact: { monthlyEmissions: 6.7, yearlyEmissions: 80, comparedToAvg: 22, treesEquivalent: 0.6, trend: [{ month: 'Sep', emissions: 5.5 }, { month: 'Oct', emissions: 6.1 }, { month: 'Nov', emissions: 7.0 }, { month: 'Dec', emissions: 7.8 }, { month: 'Jan', emissions: 7.3 }, { month: 'Feb', emissions: 6.7 }] },
        comparisons: [{ metric: 'Daily Usage', yourValue: 4.2, avgValue: 3.0, bestValue: 2.0, unit: 'kWh', percentile: 35 }, { metric: 'Monthly Cost', yourValue: 920, avgValue: 650, bestValue: 400, unit: '₹', percentile: 30 }, { metric: 'Efficiency', yourValue: 58, avgValue: 75, bestValue: 94, unit: '%', percentile: 22 }],
        anomalies: [{ id: 'wa1', date: 'Feb 18', type: 'Temp Spike', severity: 'high', description: 'Thermostat reached 68°C — above safe 55°C limit', deviation: 24, resolved: false }, { id: 'wa2', date: 'Feb 12', type: 'Long Cycle', severity: 'medium', description: 'Heating cycle lasted 45 min vs normal 20 min', deviation: 125, resolved: true }],
        maintenanceLog: [{ id: 'wm1', date: 'Dec 10, 2025', type: 'inspection', description: 'Found sediment buildup and anode rod corrosion', technician: 'Suresh P.', cost: 600, status: 'completed' }, { id: 'wm2', date: 'Mar 10, 2026', type: 'scheduled', description: 'Tank flush + anode rod replacement', technician: 'Pending', cost: 2200, status: 'pending' }],
    }
}

// ─── EV Charger ─────────────────────────────────────────────────────────────
function evChargerData(): DeviceAnalyticsData {
    return {
        profile: { id: 'ev-charger', name: 'EV Charger', icon: '🔌', type: 'Level 2 Wallbox', brand: 'Tata Power', model: 'EZ Home 7.2', location: 'Garage', installDate: 'Jun 2024', warrantyExpiry: 'Jun 2029', status: 'online', category: 'energy' },
        realTime: { currentPower: 0, unit: 'kW', todayUsage: 6.5, todayUnit: 'kWh', liveReadings: [{ time: '11 PM', value: 7.2 }, { time: '12 AM', value: 7.2 }, { time: '1 AM', value: 7.0 }, { time: '2 AM', value: 6.8 }, { time: '3 AM', value: 5.2 }, { time: '4 AM', value: 2.1 }, { time: '5 AM', value: 0 }, { time: '6 AM', value: 0 }] },
        historical: { daily: [{ date: 'Mon', usage: 6.2, cost: 50 }, { date: 'Tue', usage: 0, cost: 0 }, { date: 'Wed', usage: 7.1, cost: 57 }, { date: 'Thu', usage: 0, cost: 0 }, { date: 'Fri', usage: 6.5, cost: 52 }, { date: 'Sat', usage: 5.8, cost: 46 }, { date: 'Sun', usage: 0, cost: 0 }], weekly: [{ week: 'W1', usage: 25, cost: 200 }, { week: 'W2', usage: 28, cost: 224 }, { week: 'W3', usage: 22, cost: 176 }, { week: 'W4', usage: 26, cost: 208 }], monthly: [{ month: 'Sep', usage: 85, cost: 680 }, { month: 'Oct', usage: 92, cost: 736 }, { month: 'Nov', usage: 88, cost: 704 }, { month: 'Dec', usage: 95, cost: 760 }, { month: 'Jan', usage: 100, cost: 800 }, { month: 'Feb', usage: 90, cost: 720 }] },
        kpis: [{ label: 'Today', value: '6.5', unit: 'kWh', trend: 10.8, trendLabel: 'vs avg', icon: '⚡', color: '#14b8a6' }, { label: 'This Month', value: '₹720', unit: '', trend: -10, trendLabel: 'vs Jan', icon: '💰', color: '#10b981' }, { label: 'Efficiency', value: 94, unit: '%', trend: 2, trendLabel: 'improving', icon: '📊', color: '#10b981' }, { label: 'Health', value: 97, unit: '%', trend: 0, trendLabel: 'stable', icon: '💚', color: '#10b981' }, { label: 'CO₂', value: '5.2', unit: 'kg/mo', trend: -15, trendLabel: 'great', icon: '🌱', color: '#10b981' }],
        efficiency: { score: 94, grade: 'A+', gradeColor: '#10b981', avgUsage: 6.5, optimalUsage: 5.8, wastedEnergy: 0.7, wastedCost: 56, tips: ['Shift charging to 11 PM–5 AM off-peak', 'Enable smart charge scheduling'] },
        aiRecommendations: [{ id: 'er1', title: 'Switch to Off-Peak Only', description: '38% of sessions during peak pricing. Off-peak scheduling saves ₹320/mo.', confidence: 93, savingsPotential: 320, priority: 'high', actionLabel: 'Set Schedule' }],
        health: { overallHealth: 97, status: 'healthy', lastCheckup: 'Feb 01, 2026', nextMaintenance: 'Aug 2026', components: [{ name: 'Charging Module', health: 98, status: 'good' }, { name: 'Cable', health: 95, status: 'good' }, { name: 'WiFi Module', health: 96, status: 'good' }] },
        costEstimate: { currentMonth: 610, projectedMonth: 720, lastMonth: 800, dailyAvg: 35, costTrend: [{ day: 'Mon', cost: 50 }, { day: 'Tue', cost: 0 }, { day: 'Wed', cost: 57 }, { day: 'Thu', cost: 0 }, { day: 'Fri', cost: 52 }, { day: 'Sat', cost: 46 }, { day: 'Sun', cost: 0 }] },
        carbonImpact: { monthlyEmissions: 5.2, yearlyEmissions: 62, comparedToAvg: -25, treesEquivalent: 0.5, trend: [{ month: 'Sep', emissions: 5.0 }, { month: 'Oct', emissions: 5.4 }, { month: 'Nov', emissions: 5.1 }, { month: 'Dec', emissions: 5.5 }, { month: 'Jan', emissions: 5.8 }, { month: 'Feb', emissions: 5.2 }] },
        comparisons: [{ metric: 'Daily Usage', yourValue: 6.5, avgValue: 8.0, bestValue: 4.5, unit: 'kWh', percentile: 72 }, { metric: 'Monthly Cost', yourValue: 720, avgValue: 900, bestValue: 500, unit: '₹', percentile: 68 }, { metric: 'Efficiency', yourValue: 94, avgValue: 85, bestValue: 97, unit: '%', percentile: 88 }],
        anomalies: [{ id: 'ea1', date: 'Feb 15', type: 'Peak Charging', severity: 'medium', description: 'Charged during 6–9 PM peak pricing', deviation: 38, resolved: true }],
        maintenanceLog: [{ id: 'em1', date: 'Feb 01, 2026', type: 'inspection', description: 'Routine check — all systems nominal', technician: 'Auto-diagnostic', cost: 0, status: 'completed' }],
    }
}

// ─── Refrigerator ───────────────────────────────────────────────────────────
function fridgeData(): DeviceAnalyticsData {
    return {
        profile: { id: 'refrigerator', name: 'Refrigerator', icon: '🧊', type: 'Double Door Frost-Free', brand: 'Samsung', model: 'RT42T5538S9', location: 'Kitchen', installDate: 'Jan 2024', warrantyExpiry: 'Jan 2034', status: 'online', category: 'energy' },
        realTime: { currentPower: 0.12, unit: 'kW', todayUsage: 2.1, todayUnit: 'kWh', liveReadings: [{ time: '12 AM', value: 0.15 }, { time: '4 AM', value: 0.10 }, { time: '8 AM', value: 0.12 }, { time: '12 PM', value: 0.14 }, { time: '4 PM', value: 0.13 }, { time: '8 PM', value: 0.12 }] },
        historical: { daily: [{ date: 'Mon', usage: 2.0, cost: 16 }, { date: 'Tue', usage: 2.1, cost: 17 }, { date: 'Wed', usage: 2.2, cost: 18 }, { date: 'Thu', usage: 2.0, cost: 16 }, { date: 'Fri', usage: 2.1, cost: 17 }, { date: 'Sat', usage: 2.3, cost: 18 }, { date: 'Sun', usage: 2.1, cost: 17 }], weekly: [{ week: 'W1', usage: 14.5, cost: 116 }, { week: 'W2', usage: 14.8, cost: 118 }, { week: 'W3', usage: 14.2, cost: 114 }, { week: 'W4', usage: 14.6, cost: 117 }], monthly: [{ month: 'Sep', usage: 60, cost: 480 }, { month: 'Oct', usage: 62, cost: 496 }, { month: 'Nov', usage: 58, cost: 464 }, { month: 'Dec', usage: 61, cost: 488 }, { month: 'Jan', usage: 63, cost: 504 }, { month: 'Feb', usage: 60, cost: 480 }] },
        kpis: [{ label: 'Today', value: '2.1', unit: 'kWh', trend: -4.8, trendLabel: 'vs avg', icon: '⚡', color: '#10b981' }, { label: 'Monthly', value: '₹480', unit: '', trend: -5, trendLabel: 'stable', icon: '💰', color: '#14b8a6' }, { label: 'Efficiency', value: 91, unit: '%', trend: 1, trendLabel: 'stable', icon: '📊', color: '#10b981' }, { label: 'Health', value: 88, unit: '%', trend: 0, trendLabel: 'stable', icon: '💚', color: '#10b981' }, { label: 'CO₂', value: '3.5', unit: 'kg/mo', trend: -3, trendLabel: 'good', icon: '🌱', color: '#10b981' }],
        efficiency: { score: 91, grade: 'A', gradeColor: '#10b981', avgUsage: 2.1, optimalUsage: 2.0, wastedEnergy: 0.1, wastedCost: 8, tips: ['Excellent efficiency — maintain current settings', 'Check door seal annually'] },
        aiRecommendations: [{ id: 'fr1', title: 'Clean Condenser Coils', description: 'Annual cleaning maintains efficiency. Next due: April 2026.', confidence: 85, savingsPotential: 15, priority: 'low', actionLabel: 'Set Reminder' }],
        health: { overallHealth: 88, status: 'healthy', lastCheckup: 'Auto', nextMaintenance: 'Apr 2026', components: [{ name: 'Compressor', health: 90, status: 'good' }, { name: 'Door Seal', health: 85, status: 'good' }, { name: 'Thermostat', health: 92, status: 'good' }, { name: 'Condenser', health: 82, status: 'good' }] },
        costEstimate: { currentMonth: 410, projectedMonth: 480, lastMonth: 504, dailyAvg: 17, costTrend: [{ day: 'Mon', cost: 16 }, { day: 'Tue', cost: 17 }, { day: 'Wed', cost: 18 }, { day: 'Thu', cost: 16 }, { day: 'Fri', cost: 17 }, { day: 'Sat', cost: 18 }, { day: 'Sun', cost: 17 }] },
        carbonImpact: { monthlyEmissions: 3.5, yearlyEmissions: 42, comparedToAvg: -22, treesEquivalent: 0.3, trend: [{ month: 'Sep', emissions: 3.5 }, { month: 'Oct', emissions: 3.6 }, { month: 'Nov', emissions: 3.4 }, { month: 'Dec', emissions: 3.5 }, { month: 'Jan', emissions: 3.7 }, { month: 'Feb', emissions: 3.5 }] },
        comparisons: [{ metric: 'Daily Usage', yourValue: 2.1, avgValue: 2.5, bestValue: 1.6, unit: 'kWh', percentile: 75 }, { metric: 'Efficiency', yourValue: 91, avgValue: 82, bestValue: 96, unit: '%', percentile: 82 }],
        anomalies: [{ id: 'fa1', date: 'Feb 17', type: 'Compressor Cycle', severity: 'medium', description: 'Cycling 67% more than baseline — possible door issue', deviation: 67, resolved: false }],
        maintenanceLog: [{ id: 'fm1', date: 'Jan 2025', type: 'scheduled', description: 'Coil cleaning and seal check', technician: 'Self', cost: 0, status: 'completed' }],
    }
}

// ─── Washing Machine ────────────────────────────────────────────────────────
function washerData(): DeviceAnalyticsData {
    return {
        profile: { id: 'washing-machine', name: 'Washing Machine', icon: '🫧', type: 'Front Load 7kg', brand: 'LG', model: 'FHM1207SDM', location: 'Utility Room', installDate: 'May 2023', warrantyExpiry: 'May 2026', status: 'online', category: 'water' },
        realTime: { currentPower: 0, unit: 'kW', todayUsage: 1.8, todayUnit: 'kWh', liveReadings: [{ time: '8:00', value: 0.5 }, { time: '8:15', value: 1.2 }, { time: '8:30', value: 0.8 }, { time: '8:45', value: 0.3 }, { time: '9:00', value: 0 }] },
        historical: { daily: [{ date: 'Mon', usage: 1.5, cost: 12 }, { date: 'Tue', usage: 0, cost: 0 }, { date: 'Wed', usage: 1.8, cost: 14 }, { date: 'Thu', usage: 0, cost: 0 }, { date: 'Fri', usage: 1.6, cost: 13 }, { date: 'Sat', usage: 2.2, cost: 18 }, { date: 'Sun', usage: 1.9, cost: 15 }], weekly: [{ week: 'W1', usage: 8, cost: 64 }, { week: 'W2', usage: 9, cost: 72 }, { week: 'W3', usage: 7, cost: 56 }, { week: 'W4', usage: 8.5, cost: 68 }], monthly: [{ month: 'Sep', usage: 30, cost: 240 }, { month: 'Oct', usage: 32, cost: 256 }, { month: 'Nov', usage: 28, cost: 224 }, { month: 'Dec', usage: 35, cost: 280 }, { month: 'Jan', usage: 33, cost: 264 }, { month: 'Feb', usage: 30, cost: 240 }] },
        kpis: [{ label: 'Today', value: '1.8', unit: 'kWh', trend: -11, trendLabel: 'efficient', icon: '⚡', color: '#10b981' }, { label: 'Monthly', value: '₹240', unit: '', trend: -9, trendLabel: 'vs Jan', icon: '💰', color: '#10b981' }, { label: 'Efficiency', value: 85, unit: '%', trend: 3, trendLabel: 'improving', icon: '📊', color: '#14b8a6' }, { label: 'Health', value: 90, unit: '%', trend: 0, trendLabel: 'stable', icon: '💚', color: '#10b981' }, { label: 'CO₂', value: '1.7', unit: 'kg/mo', trend: -5, trendLabel: 'good', icon: '🌱', color: '#10b981' }],
        efficiency: { score: 85, grade: 'A', gradeColor: '#14b8a6', avgUsage: 1.8, optimalUsage: 1.5, wastedEnergy: 0.3, wastedCost: 24, tips: ['Use cold water for light loads', 'Run full loads only', 'Use eco-wash mode'] },
        aiRecommendations: [{ id: 'wr1', title: 'Use Solar Peak Window', description: 'Run wash cycles between 2–4 PM when solar output is highest.', confidence: 84, savingsPotential: 35, priority: 'low', actionLabel: 'Schedule' }],
        health: { overallHealth: 90, status: 'healthy', lastCheckup: 'Jan 2026', nextMaintenance: 'Jul 2026', components: [{ name: 'Drum', health: 92, status: 'good' }, { name: 'Drain Pump', health: 88, status: 'good' }, { name: 'Motor', health: 91, status: 'good' }] },
        costEstimate: { currentMonth: 200, projectedMonth: 240, lastMonth: 264, dailyAvg: 10, costTrend: [{ day: 'Mon', cost: 12 }, { day: 'Tue', cost: 0 }, { day: 'Wed', cost: 14 }, { day: 'Thu', cost: 0 }, { day: 'Fri', cost: 13 }, { day: 'Sat', cost: 18 }, { day: 'Sun', cost: 15 }] },
        carbonImpact: { monthlyEmissions: 1.7, yearlyEmissions: 20, comparedToAvg: -18, treesEquivalent: 0.15, trend: [{ month: 'Sep', emissions: 1.7 }, { month: 'Oct', emissions: 1.8 }, { month: 'Nov', emissions: 1.6 }, { month: 'Dec', emissions: 2.0 }, { month: 'Jan', emissions: 1.9 }, { month: 'Feb', emissions: 1.7 }] },
        comparisons: [{ metric: 'Per Load', yourValue: 0.8, avgValue: 1.1, bestValue: 0.5, unit: 'kWh', percentile: 72 }, { metric: 'Monthly Cost', yourValue: 240, avgValue: 320, bestValue: 180, unit: '₹', percentile: 70 }],
        anomalies: [],
        maintenanceLog: [{ id: 'wm1', date: 'Jan 2026', type: 'inspection', description: 'Drum clean and drain check', technician: 'Self', cost: 0, status: 'completed' }],
    }
}

// ─── Shower ─────────────────────────────────────────────────────────────────
function showerData(): DeviceAnalyticsData {
    return {
        profile: { id: 'shower', name: 'Shower System', icon: '🚿', type: 'Rain Shower + Mixer', brand: 'Grohe', model: 'Rainshower 310', location: 'Master Bath', installDate: 'Aug 2023', warrantyExpiry: 'Aug 2028', status: 'online', category: 'water' },
        realTime: { currentPower: 0, unit: 'L/min', todayUsage: 85, todayUnit: 'L', liveReadings: [{ time: '7:00', value: 9 }, { time: '7:02', value: 10 }, { time: '7:05', value: 11 }, { time: '7:08', value: 10 }, { time: '7:11', value: 8 }, { time: '7:12', value: 0 }] },
        historical: { daily: [{ date: 'Mon', usage: 80, cost: 6 }, { date: 'Tue', usage: 90, cost: 7 }, { date: 'Wed', usage: 75, cost: 5 }, { date: 'Thu', usage: 85, cost: 6 }, { date: 'Fri', usage: 95, cost: 7 }, { date: 'Sat', usage: 110, cost: 8 }, { date: 'Sun', usage: 100, cost: 7 }], weekly: [{ week: 'W1', usage: 560, cost: 42 }, { week: 'W2', usage: 600, cost: 45 }, { week: 'W3', usage: 520, cost: 39 }, { week: 'W4', usage: 580, cost: 44 }], monthly: [{ month: 'Sep', usage: 2200, cost: 165 }, { month: 'Oct', usage: 2400, cost: 180 }, { month: 'Nov', usage: 2100, cost: 158 }, { month: 'Dec', usage: 2500, cost: 188 }, { month: 'Jan', usage: 2600, cost: 195 }, { month: 'Feb', usage: 2300, cost: 173 }] },
        kpis: [{ label: 'Today', value: '85', unit: 'L', trend: -8.2, trendLabel: 'vs avg', icon: '💧', color: '#3b82f6' }, { label: 'Monthly', value: '₹173', unit: '', trend: -11, trendLabel: 'vs Jan', icon: '💰', color: '#10b981' }, { label: 'Efficiency', value: 78, unit: '%', trend: 5, trendLabel: 'improving', icon: '📊', color: '#14b8a6' }, { label: 'Health', value: 95, unit: '%', trend: 0, trendLabel: 'great', icon: '💚', color: '#10b981' }, { label: 'CO₂', value: '0.8', unit: 'kg/mo', trend: -10, trendLabel: 'good', icon: '🌱', color: '#10b981' }],
        efficiency: { score: 78, grade: 'B', gradeColor: '#f59e0b', avgUsage: 85, optimalUsage: 60, wastedEnergy: 25, wastedCost: 19, tips: ['Reduce shower to 8 min (currently 12 min avg)', 'Install low-flow showerhead', 'Use cold starts'] },
        aiRecommendations: [{ id: 'sr1', title: 'Reduce Duration to 8 min', description: 'Recent trend shows 12-min avg. Reducing saves 40L/day and ₹45/mo.', confidence: 92, savingsPotential: 45, priority: 'medium', actionLabel: 'Set Timer' }],
        health: { overallHealth: 95, status: 'healthy', lastCheckup: 'Auto', nextMaintenance: 'Aug 2026', components: [{ name: 'Showerhead', health: 96, status: 'good' }, { name: 'Mixer Valve', health: 94, status: 'good' }, { name: 'Hose', health: 90, status: 'good' }] },
        costEstimate: { currentMonth: 145, projectedMonth: 173, lastMonth: 195, dailyAvg: 6.5, costTrend: [{ day: 'Mon', cost: 6 }, { day: 'Tue', cost: 7 }, { day: 'Wed', cost: 5 }, { day: 'Thu', cost: 6 }, { day: 'Fri', cost: 7 }, { day: 'Sat', cost: 8 }, { day: 'Sun', cost: 7 }] },
        carbonImpact: { monthlyEmissions: 0.8, yearlyEmissions: 10, comparedToAvg: -5, treesEquivalent: 0.08, trend: [{ month: 'Sep', emissions: 0.8 }, { month: 'Oct', emissions: 0.9 }, { month: 'Nov', emissions: 0.8 }, { month: 'Dec', emissions: 0.9 }, { month: 'Jan', emissions: 1.0 }, { month: 'Feb', emissions: 0.8 }] },
        comparisons: [{ metric: 'Daily Usage', yourValue: 85, avgValue: 95, bestValue: 55, unit: 'L', percentile: 65 }, { metric: 'Duration', yourValue: 12, avgValue: 10, bestValue: 6, unit: 'min', percentile: 40 }],
        anomalies: [{ id: 'sa1', date: 'Feb 18', type: 'Duration Spike', severity: 'low', description: 'Shower lasted 18 min — well above 12 min avg', deviation: 50, resolved: true }],
        maintenanceLog: [],
    }
}
