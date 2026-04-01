/* ─── AI Engine — Mock data generators for the AI Insights dashboard ─── */

export function getAIRecommendations() {
  return [
    { id: 1, icon: '❄️', title: 'Switch HVAC to Eco Mode', description: 'HVAC consuming 40% above average during 10 AM–4 PM. Eco mode can cut usage significantly.', impact: 'Save ~₹340/month', priority: 'high', category: 'energy', confidence: 94, potentialSavings: 340, carbonImpact: 8.2, timeToImplement: '15 min', actionLabel: 'Enable Eco Mode', implemented: false },
    { id: 2, icon: '🚿', title: 'Optimize Water Heater Schedule', description: 'Water heater runs 6 hrs daily. Reducing to 4 hrs with smart scheduling covers your usage.', impact: 'Save ~₹180/month', priority: 'medium', category: 'water', confidence: 88, potentialSavings: 180, carbonImpact: 4.5, timeToImplement: '30 min', actionLabel: 'Set Schedule', implemented: false },
    { id: 3, icon: '🌡️', title: 'Upgrade to Smart Thermostat', description: 'Your thermostat is 5 years old. AI-enabled models can reduce costs by 10-15%.', impact: 'Save ~₹240/month', priority: 'low', category: 'energy', confidence: 82, potentialSavings: 240, carbonImpact: 6.1, timeToImplement: '1 day', actionLabel: 'View Options', implemented: false },
    { id: 4, icon: '🚰', title: 'Install Low-Flow Showerheads', description: 'Bathroom water usage is 30% above baseline. Low-flow fixtures reduce waste without impacting experience.', impact: 'Save ~₹120/month', priority: 'medium', category: 'water', confidence: 91, potentialSavings: 120, carbonImpact: 3.0, timeToImplement: '2 hours', actionLabel: 'Shop Now', implemented: true },
    { id: 5, icon: '⚡', title: 'Schedule Appliances Off-Peak', description: 'Running dishwasher and washer during 10 PM–6 AM reduces cost thanks to off-peak rates.', impact: 'Save ~₹200/month', priority: 'high', category: 'cost', confidence: 96, potentialSavings: 200, carbonImpact: 5.4, timeToImplement: '20 min', actionLabel: 'Set Off-Peak', implemented: false },
    { id: 6, icon: '💡', title: 'Enable Motion-Based Lighting', description: 'Lights stay ON 3 hrs/day in unoccupied rooms. Motion sensors can eliminate this waste.', impact: 'Save ~₹90/month', priority: 'low', category: 'sustainability', confidence: 78, potentialSavings: 90, carbonImpact: 2.3, timeToImplement: '1 hour', actionLabel: 'Configure Sensors', implemented: true },
    { id: 7, icon: '🔧', title: 'Replace HVAC Filter', description: 'HVAC filter overdue by 5 days — a clogged filter drops efficiency by up to 15% and raises energy bills.', impact: 'Save ~₹150/month', priority: 'critical', category: 'maintenance', confidence: 98, potentialSavings: 150, carbonImpact: 3.8, timeToImplement: '30 min', actionLabel: 'Order Filter', implemented: false },
  ]
}

export function getAppliancePredictions() {
  return [
    { applianceId: 'hvac', icon: '❄️', name: 'HVAC', currentUsage: 12.4, predictedUsage: 14.2, usageTrend: 14.5, confidence: 92, category: 'energy', predictedCost: 48, anomalyDetected: true },
    { applianceId: 'water-heater', icon: '🚿', name: 'Water Heater', currentUsage: 5.8, predictedUsage: 5.2, usageTrend: -10.3, confidence: 88, category: 'energy', predictedCost: 22, anomalyDetected: false },
    { applianceId: 'lighting', icon: '💡', name: 'Lighting', currentUsage: 3.2, predictedUsage: 3.0, usageTrend: -6.3, confidence: 95, category: 'energy', predictedCost: 12, anomalyDetected: false },
    { applianceId: 'kitchen', icon: '🍳', name: 'Kitchen Appliances', currentUsage: 4.5, predictedUsage: 5.1, usageTrend: 13.3, confidence: 79, category: 'energy', predictedCost: 19, anomalyDetected: false },
    { applianceId: 'smart-plugs', icon: '🔌', name: 'Smart Plugs', currentUsage: 1.8, predictedUsage: 1.7, usageTrend: -5.6, confidence: 91, category: 'energy', predictedCost: 7, anomalyDetected: false },
  ]
}

export function getBillPrediction() {
  return {
    predictedAmount: 3120,
    previousAmount: 2840,
    confidenceLow: 2890,
    confidenceHigh: 3350,
    confidence: 89,
    savingsPotential: 460,
    month: 'March 2026',
    breakdown: [
      { category: 'Electricity', amount: 2100, percentage: 67, color: '#0f766e' },
      { category: 'Water', amount: 680, percentage: 22, color: '#06b6d4' },
      { category: 'Gas', amount: 340, percentage: 11, color: '#f59e0b' },
    ],
    // kept for backward compatibility
    currentMonth: 2840,
    predictedMonth: 3120,
    lastMonth: 2650,
    savingsOpportunity: 460,
    trend: [2200, 2450, 2650, 2840, 3120],
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  }
}

export function getSeasonalPatterns() {
  return [
    { season: 'summer', peakMonth: 'June', avgConsumption: 24.1, expectedChange: 35, color: '#f59e0b', dominantAppliance: 'HVAC (Air Conditioning)', tips: ['Pre-cool home during off-peak hours', 'Use ceiling fans to reduce AC load', 'Close blinds during peak sun hours'] },
    { season: 'monsoon', peakMonth: 'August', avgConsumption: 19.5, expectedChange: 12, color: '#3b82f6', dominantAppliance: 'Water Heater', tips: ['Reduce water heater runtime on humid days', 'Check for moisture-related energy leaks'] },
    { season: 'winter', peakMonth: 'January', avgConsumption: 18.2, expectedChange: -8, color: '#8b5cf6', dominantAppliance: 'HVAC (Heating)', tips: ['Layer up before cranking heating', 'Seal window drafts to reduce heat loss'] },
    { season: 'spring', peakMonth: 'April', avgConsumption: 16.4, expectedChange: -15, color: '#10b981', dominantAppliance: 'Lighting', tips: ['Maximize natural light during longer days', 'Best season for solar panel efficiency'] },
  ]
}

export function getSmartThresholds() {
  return [
    { applianceId: 'daily-energy', name: 'Daily Energy', currentThreshold: '22 kWh', suggestedThreshold: '18 kWh', reason: 'Based on your 90-day average usage pattern', impact: 'Save ~₹120/mo', autoAdjusted: true, lastUpdated: '2 hours ago' },
    { applianceId: 'daily-water', name: 'Daily Water', currentThreshold: '180 L', suggestedThreshold: '150 L', reason: 'Household size benchmark suggests lower target', impact: 'Save ~₹60/mo', autoAdjusted: false, lastUpdated: '1 day ago' },
    { applianceId: 'peak-usage', name: 'Peak Hour Usage', currentThreshold: '5.2 kW', suggestedThreshold: '3.8 kW', reason: 'Off-peak optimization possible with scheduling', impact: 'Save ~₹200/mo', autoAdjusted: true, lastUpdated: '4 hours ago' },
    { applianceId: 'standby', name: 'Standby Power', currentThreshold: '0.8 kW', suggestedThreshold: '0.3 kW', reason: 'Smart plug scheduling can eliminate standby waste', impact: 'Save ~₹80/mo', autoAdjusted: false, lastUpdated: '3 days ago' },
  ]
}

export function getEfficiencyScores() {
  return [
    { applianceId: 'hvac', icon: '❄️', name: 'HVAC', score: 62, grade: 'C+', gradeColor: '#f59e0b', avgUsage: 12.4, optimalUsage: 8.5, wastedCost: 340, recommendations: ['Switch to eco mode during 10 AM–4 PM'] },
    { applianceId: 'water', icon: '🚿', name: 'Water Management', score: 78, grade: 'B+', gradeColor: '#06b6d4', avgUsage: 180, optimalUsage: 150, wastedCost: 120, recommendations: ['Install low-flow fixtures'] },
    { applianceId: 'lighting', icon: '💡', name: 'Lighting', score: 91, grade: 'A', gradeColor: '#10b981', avgUsage: 3.2, optimalUsage: 2.8, wastedCost: 45, recommendations: [] },
    { applianceId: 'appliances', icon: '🍳', name: 'Appliance Usage', score: 68, grade: 'C', gradeColor: '#8b5cf6', avgUsage: 4.5, optimalUsage: 3.2, wastedCost: 190, recommendations: ['Schedule high-draw appliances off-peak'] },
    { applianceId: 'peak', icon: '⚡', name: 'Peak Optimization', score: 55, grade: 'D+', gradeColor: '#ef4444', avgUsage: 5.2, optimalUsage: 3.0, wastedCost: 280, recommendations: ['Shift 40% of peak load to off-peak hours'] },
  ]
}

export function getCarbonFootprint() {
  return {
    totalEmissions: 142,
    comparedToAvg: -18,
    treesEquivalent: 2.4,
    carKmEquivalent: 580,
    breakdown: [
      { source: 'Electricity', emissions: 95, percentage: 67, color: '#0f766e' },
      { source: 'Gas', emissions: 32, percentage: 22, color: '#f59e0b' },
      { source: 'Water', emissions: 15, percentage: 11, color: '#06b6d4' },
    ],
    offsetSuggestions: [
      'Switch to renewable energy plan to cut 40% of electricity emissions',
      'Reduce gas usage with smart thermostat scheduling',
      'Install solar panels for long-term carbon neutrality',
    ],
    monthlyTrend: [
      { month: 'Oct', emissions: 180 },
      { month: 'Nov', emissions: 165 },
      { month: 'Dec', emissions: 158 },
      { month: 'Jan', emissions: 150 },
      { month: 'Feb', emissions: 148 },
      { month: 'Mar', emissions: 142 },
    ],
  }
}

export function getBehavioralInsights() {
  return [
    { id: 1, icon: '💡', title: 'Lights left on in empty rooms', description: 'You leave lights on 2.3 hrs/day longer than similar households. Motion sensors can eliminate this waste.', type: 'anomaly', impact: 'negative', metric: '+2.3 hrs/day', confidence: 94, detectedAt: '2 hours ago' },
    { id: 2, icon: '🚿', title: 'Shorter morning showers', description: 'Morning shower duration has decreased by 15% this month — saving both water and heating energy.', type: 'achievement', impact: 'positive', metric: '-15%', confidence: 91, detectedAt: '1 day ago' },
    { id: 3, icon: '📅', title: 'Weekend energy spike', description: 'Weekend energy use is 40% higher than weekdays. Consider energy-aware weekend routines.', type: 'habit', impact: 'negative', metric: '+40%', confidence: 87, detectedAt: '3 days ago' },
    { id: 4, icon: '🏠', title: 'HVAC runs when nobody home', description: 'HVAC runs during work hours when nobody is home — 4 hrs/day of wasted energy. Set up geofencing or smart schedules.', type: 'optimization', impact: 'negative', metric: '4 hrs/day', confidence: 96, detectedAt: '5 hours ago' },
  ]
}

export function getMaintenanceAlerts() {
  return [
    { applianceId: 'hvac-filter', icon: '🔧', name: 'HVAC Filter', urgency: 'critical', status: 'critical', healthScore: 25, issueType: 'Filter clogged', daysUntilMaintenance: -5, estimatedCost: 800, recommendation: 'Replace immediately — efficiency drops 15% with a clogged filter' },
    { applianceId: 'water-heater', icon: '🚿', name: 'Water Heater Anode', urgency: 'medium', status: 'degraded', healthScore: 62, issueType: 'Anode rod corrosion', daysUntilMaintenance: 30, estimatedCost: 2500, recommendation: 'Schedule anode rod replacement within 30 days to prevent tank damage' },
    { applianceId: 'thermostat', icon: '🌡️', name: 'Smart Thermostat', urgency: 'low', status: 'needs_attention', healthScore: 78, issueType: 'Firmware outdated', daysUntilMaintenance: 60, estimatedCost: 0, recommendation: 'Update firmware v2.3 for better AI predictions and energy savings' },
    { applianceId: 'dishwasher', icon: '🍽️', name: 'Dishwasher Seal', urgency: 'low', status: 'optimal', healthScore: 95, issueType: 'Routine check', daysUntilMaintenance: 120, estimatedCost: 500, recommendation: 'Next inspection in 4 months — all seals currently functioning' },
  ]
}

export function getSavingsScenarios() {
  return [
    { id: 'solar', title: 'Switch to Solar Panels', description: 'Install a 5kW rooftop solar system to offset 80% of electricity consumption. Government subsidies may reduce upfront cost.', appliances: ['All electrical'], reductionPercent: 40, monthlySavings: 1200, annualSavings: 14400, carbonReduction: 45.2, difficulty: 'hard' },
    { id: 'smart-home', title: 'Smart Home Automation', description: 'Deploy smart plugs, sensors, and automated schedules to eliminate standby waste and optimize usage patterns.', appliances: ['Smart Plugs', 'Lighting', 'HVAC'], reductionPercent: 18, monthlySavings: 450, annualSavings: 5400, carbonReduction: 12.8, difficulty: 'easy' },
    { id: 'hvac-upgrade', title: 'Energy-Efficient HVAC', description: 'Replace aging HVAC with a 5-star inverter model. Higher upfront cost but significant long-term savings.', appliances: ['HVAC'], reductionPercent: 25, monthlySavings: 680, annualSavings: 8160, carbonReduction: 22.1, difficulty: 'medium' },
    { id: 'rainwater', title: 'Rainwater Harvesting', description: 'Install a rainwater collection system to supplement non-potable water needs and reduce municipal water bills.', appliances: ['Water System'], reductionPercent: 15, monthlySavings: 350, annualSavings: 4200, carbonReduction: 5.6, difficulty: 'medium' },
  ]
}

