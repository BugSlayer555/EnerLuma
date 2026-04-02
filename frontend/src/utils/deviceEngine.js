// Device Analytics Engine — generates mock device data for the Device Detail page

const deviceProfiles = {
  hvac: { name: 'Smart Thermostat', type: 'HVAC', brand: 'Nest', model: 'Learning 3rd Gen', location: 'Living Room', icon: '🌡️', status: 'online', installedDate: '2024-06-15', installDate: '2024-06-15', warrantyExpiry: '2027-06-15', category: 'climate' },
  refrigerator: { name: 'Refrigerator', type: 'Appliance', brand: 'Samsung', model: 'RT28', location: 'Kitchen', icon: '🧊', status: 'online', installedDate: '2023-01-20', installDate: '2023-01-20', warrantyExpiry: '2026-01-20', category: 'appliance' },
  'water-heater': { name: 'Water Heater', type: 'Water', brand: 'Havells', model: 'Instanio 25L', location: 'Bathroom', icon: '🚿', status: 'online', installedDate: '2024-02-10', installDate: '2024-02-10', warrantyExpiry: '2027-02-10', category: 'water' },
  'ev-charger': { name: 'EV Charger', type: 'Charging', brand: 'Ather', model: 'Dot', location: 'Garage', icon: '⚡', status: 'online', installedDate: '2024-09-05', installDate: '2024-09-05', warrantyExpiry: '2027-09-05', category: 'charging' },
  'washing-machine': { name: 'Washing Machine', type: 'Appliance', brand: 'LG', model: 'FHM1408', location: 'Utility', icon: '👕', status: 'online', installedDate: '2023-08-12', installDate: '2023-08-12', warrantyExpiry: '2026-08-12', category: 'appliance' },
  shower: { name: 'Shower System', type: 'Water', brand: 'Jaquar', model: 'ARI-39', location: 'Master Bath', icon: '🚿', status: 'online', installedDate: '2024-04-22', installDate: '2024-04-22', warrantyExpiry: '2027-04-22', category: 'water' },
}

function generateHourlyData(peak = 2.5) {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    value: +(Math.sin((i - 6) * 0.3) * peak * 0.5 + peak * 0.5 + Math.random() * 0.4).toFixed(2),
  }))
}

function generateDailyData() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    day,
    value: +(Math.random() * 6 + 2).toFixed(1),
  }))
}

export function getDeviceAnalytics(deviceId) {
  const profile = deviceProfiles[deviceId] || deviceProfiles.hvac

  return {
    profile,
    realTime: {
      currentDraw: +(Math.random() * 2 + 0.5).toFixed(2),
      todayTotal: +(Math.random() * 8 + 2).toFixed(1),
      todayUnit: 'kWh',
      todayHourly: generateHourlyData(),
    },
    historical: {
      daily: generateDailyData(),
      monthlyAvg: +(Math.random() * 80 + 40).toFixed(0),
    },
    kpis: [
      { label: 'Current Draw', value: `${(Math.random() * 2 + 0.3).toFixed(1)} kW`, change: -5 },
      { label: 'Today Total', value: `${(Math.random() * 8 + 1).toFixed(1)} kWh`, change: 3 },
      { label: 'Monthly Avg', value: `${(Math.random() * 80 + 30).toFixed(0)} kWh`, change: -8 },
      { label: 'Efficiency', value: `${(Math.random() * 20 + 78).toFixed(0)}%`, change: 2 },
    ],
    efficiency: {
      score: Math.floor(Math.random() * 15 + 80),
      rating: 'A',
      percentile: Math.floor(Math.random() * 20 + 75),
    },
    aiRecommendations: [
      { id: 1, text: 'Schedule this device to run during off-peak hours (10 PM – 6 AM) to save ₹45/month.', priority: 'high', savings: '₹45/mo' },
      { id: 2, text: 'Current usage pattern shows 15% higher than similar homes. Consider optimizing settings.', priority: 'medium', savings: '₹30/mo' },
      { id: 3, text: 'Enable eco-mode to reduce energy consumption by approximately 12%.', priority: 'low', savings: '₹20/mo' },
    ],
    health: {
      overall: Math.floor(Math.random() * 10 + 88),
      firmware: 'v4.2.1 (Latest)',
      uptime: '99.7%',
      signal: Math.floor(Math.random() * 15 + 82),
      lastCalibrated: '2024-12-15',
      components: [
        { name: 'Sensor Array', health: 95 },
        { name: 'Communication', health: 92 },
        { name: 'Power Supply', health: 98 },
      ],
    },
    costEstimate: {
      daily: +(Math.random() * 15 + 5).toFixed(0),
      monthly: +(Math.random() * 400 + 150).toFixed(0),
      yearly: +(Math.random() * 5000 + 2000).toFixed(0),
      projectedMonth: +(Math.random() * 400 + 200).toFixed(0),
      lastMonth: +(Math.random() * 350 + 180).toFixed(0),
      currentMonth: +(Math.random() * 300 + 150).toFixed(0),
      dailyAvg: +(Math.random() * 12 + 5).toFixed(0),
      costTrend: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        day,
        cost: +(Math.random() * 18 + 4).toFixed(0),
      })),
    },
    carbonImpact: {
      daily: +(Math.random() * 0.5 + 0.2).toFixed(2),
      monthly: +(Math.random() * 15 + 5).toFixed(1),
      treesEquivalent: +(Math.random() * 2 + 0.5).toFixed(1),
      monthlyEmissions: +(Math.random() * 15 + 5).toFixed(1),
      yearlyEmissions: +(Math.random() * 180 + 60).toFixed(0),
      comparedToAvg: Math.floor(Math.random() * 30 - 15),
      trend: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => ({
        month,
        emissions: +(Math.random() * 12 + 4).toFixed(1),
      })),
    },
    comparisons: {
      vsAverage: Math.floor(Math.random() * 20 - 10),
      vsSimilar: Math.floor(Math.random() * 15 - 5),
    },
    anomalies: [
      { id: 1, time: '2024-12-20 14:30', type: 'Spike', severity: 'warning', message: 'Consumption 40% above average for 30 minutes', resolved: true },
      { id: 2, time: '2024-12-18 03:15', type: 'Off-hours', severity: 'info', message: 'Device active during unusual hours', resolved: true },
      { id: 3, time: '2024-12-15 09:00', type: 'Pattern Change', severity: 'info', message: 'Usage pattern shifted compared to last week', resolved: false },
    ],
    maintenanceLog: [
      { id: 1, date: '2024-12-01', type: 'Firmware Update', desc: 'Updated to v4.2.1', status: 'completed' },
      { id: 2, date: '2024-11-15', type: 'Calibration', desc: 'Sensor recalibration', status: 'completed' },
      { id: 3, date: '2025-01-15', type: 'Filter Replacement', desc: 'Scheduled filter change', status: 'upcoming' },
    ],
  }
}
