/* ─── AI Engine — Mock data generators for the AI Insights dashboard ─── */

export function getAIRecommendations() {
  return [
    { id: 1, title: 'Switch HVAC to Eco Mode', description: 'HVAC consuming 40% above average during 10 AM–4 PM. Eco mode can cut usage significantly.', impact: 'Save ~₹340/month', priority: 'high', category: 'Energy', implemented: false },
    { id: 2, title: 'Optimize Water Heater Schedule', description: 'Water heater runs 6 hrs daily. Reducing to 4 hrs with smart scheduling covers your usage.', impact: 'Save ~₹180/month', priority: 'medium', category: 'Water', implemented: false },
    { id: 3, title: 'Upgrade to Smart Thermostat', description: 'Your thermostat is 5 years old. AI-enabled models can reduce costs by 10-15%.', impact: 'Save ~₹240/month', priority: 'low', category: 'Energy', implemented: false },
    { id: 4, title: 'Install Low-Flow Showerheads', description: 'Bathroom water usage is 30% above baseline. Low-flow fixtures reduce waste without impacting experience.', impact: 'Save ~₹120/month', priority: 'medium', category: 'Water', implemented: true },
    { id: 5, title: 'Schedule Appliances Off-Peak', description: 'Running dishwasher and washer during 10 PM–6 AM reduces cost thanks to off-peak rates.', impact: 'Save ~₹200/month', priority: 'high', category: 'Energy', implemented: false },
    { id: 6, title: 'Enable Motion-Based Lighting', description: 'Lights stay ON 3 hrs/day in unoccupied rooms. Motion sensors can eliminate this waste.', impact: 'Save ~₹90/month', priority: 'low', category: 'Energy', implemented: true },
  ]
}

export function getAppliancePredictions() {
  return [
    { name: 'HVAC', currentUsage: 12.4, predictedUsage: 14.2, trend: 'up', confidence: 92, unit: 'kWh' },
    { name: 'Water Heater', currentUsage: 5.8, predictedUsage: 5.2, trend: 'down', confidence: 88, unit: 'kWh' },
    { name: 'Lighting', currentUsage: 3.2, predictedUsage: 3.0, trend: 'stable', confidence: 95, unit: 'kWh' },
    { name: 'Kitchen Appliances', currentUsage: 4.5, predictedUsage: 5.1, trend: 'up', confidence: 79, unit: 'kWh' },
    { name: 'Smart Plugs', currentUsage: 1.8, predictedUsage: 1.7, trend: 'stable', confidence: 91, unit: 'kWh' },
  ]
}

export function getBillPrediction() {
  return {
    currentMonth: 2840,
    predictedMonth: 3120,
    lastMonth: 2650,
    breakdown: [
      { category: 'Electricity', amount: 1920, predicted: 2100 },
      { category: 'Water', amount: 620, predicted: 680 },
      { category: 'Gas', amount: 300, predicted: 340 },
    ],
    savingsOpportunity: 460,
    trend: [2200, 2450, 2650, 2840, 3120],
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  }
}

export function getSeasonalPatterns() {
  return {
    currentSeason: 'Summer',
    energyChange: 18,
    waterChange: 25,
    patterns: [
      { season: 'Winter', energy: 18.2, water: 130, avgBill: 2200 },
      { season: 'Spring', energy: 16.4, water: 145, avgBill: 2050 },
      { season: 'Summer', energy: 24.1, water: 185, avgBill: 2850 },
      { season: 'Autumn', energy: 17.8, water: 140, avgBill: 2150 },
    ],
    tip: 'Summer historically spikes HVAC usage by 35%. Pre-cool your home during off-peak hours.',
  }
}

export function getSmartThresholds() {
  return [
    { name: 'Daily Energy', current: 22, recommended: 18, unit: 'kWh', reason: 'Based on your 90-day average' },
    { name: 'Daily Water', current: 180, recommended: 150, unit: 'L', reason: 'Household size benchmark' },
    { name: 'Peak Hour Usage', current: 5.2, recommended: 3.8, unit: 'kW', reason: 'Off-peak optimization possible' },
    { name: 'Standby Power', current: 0.8, recommended: 0.3, unit: 'kW', reason: 'Smart plug scheduling' },
  ]
}

export function getEfficiencyScores() {
  return {
    overall: 74,
    categories: [
      { name: 'HVAC Efficiency', score: 62, maxScore: 100, color: '#f59e0b' },
      { name: 'Water Management', score: 78, maxScore: 100, color: '#06b6d4' },
      { name: 'Lighting', score: 91, maxScore: 100, color: '#10b981' },
      { name: 'Appliance Usage', score: 68, maxScore: 100, color: '#8b5cf6' },
      { name: 'Peak Optimization', score: 55, maxScore: 100, color: '#ef4444' },
    ],
    improvement: 12,
  }
}

export function getCarbonFootprint() {
  return {
    totalKg: 142,
    monthlyTrend: [180, 165, 158, 150, 142],
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    breakdown: [
      { source: 'Electricity', kg: 95, percent: 67 },
      { source: 'Gas', kg: 32, percent: 22 },
      { source: 'Water', kg: 15, percent: 11 },
    ],
    treesEquivalent: 2.4,
    reductionPercent: 21,
  }
}

export function getBehavioralInsights() {
  return [
    { insight: 'You leave lights on 2.3 hrs/day longer than similar households', type: 'warning', metric: '+2.3 hrs', suggestion: 'Use smart schedules or motion sensors' },
    { insight: 'Morning shower duration has decreased by 15% this month', type: 'positive', metric: '-15%', suggestion: 'Great progress! Keep up the habit' },
    { insight: 'Weekend energy use is 40% higher than weekdays', type: 'info', metric: '+40%', suggestion: 'Consider energy-aware weekend routines' },
    { insight: 'HVAC runs during work hours when nobody is home', type: 'warning', metric: '4 hrs/day', suggestion: 'Set up geofencing or smart schedules' },
  ]
}

export function getMaintenanceAlerts() {
  return [
    { device: 'HVAC Filter', status: 'due', daysUntil: -5, priority: 'high', message: 'Filter overdue by 5 days — efficiency drops 15%' },
    { device: 'Water Heater Anode', status: 'upcoming', daysUntil: 30, priority: 'medium', message: 'Anode rod replacement due in 30 days' },
    { device: 'Smart Thermostat', status: 'upcoming', daysUntil: 60, priority: 'low', message: 'Firmware update recommended for better AI predictions' },
    { device: 'Dishwasher Seal', status: 'ok', daysUntil: 120, priority: 'low', message: 'Next inspection in 4 months' },
  ]
}

export function getSavingsScenarios() {
  return [
    { scenario: 'Switch to Solar Panels', investment: 85000, monthlySaving: 1200, paybackMonths: 71, risk: 'low' },
    { scenario: 'Smart Home Automation', investment: 25000, monthlySaving: 450, paybackMonths: 56, risk: 'low' },
    { scenario: 'Energy-Efficient HVAC', investment: 45000, monthlySaving: 680, paybackMonths: 66, risk: 'medium' },
    { scenario: 'Rainwater Harvesting', investment: 30000, monthlySaving: 350, paybackMonths: 86, risk: 'medium' },
  ]
}
