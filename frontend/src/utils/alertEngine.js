// Alert Engine — generates mock alert data for the Alerts page

export function getAlertHistory() {
  return [
    { id: 1, title: 'High Energy Spike', device: 'HVAC', severity: 'critical', status: 'active', time: '2 min ago', message: 'Consumption 3.2 kW exceeds threshold of 2.5 kW' },
    { id: 2, title: 'Water Leak Detected', device: 'Kitchen Sink', severity: 'critical', status: 'active', time: '15 min ago', message: 'Continuous flow detected for 20 minutes' },
    { id: 3, title: 'Off-peak Usage', device: 'EV Charger', severity: 'info', status: 'resolved', time: '1h ago', message: 'Charging started during peak hours' },
    { id: 4, title: 'Device Offline', device: 'Bedroom AC', severity: 'warning', status: 'active', time: '2h ago', message: 'Device has not responded for 2 hours' },
    { id: 5, title: 'Unusual Pattern', device: 'Refrigerator', severity: 'warning', status: 'resolved', time: '5h ago', message: 'Compressor cycling 30% more than usual' },
    { id: 6, title: 'Efficiency Drop', device: 'Water Heater', severity: 'info', status: 'resolved', time: '1d ago', message: 'Heating efficiency dropped to 78%' },
    { id: 7, title: 'Firmware Available', device: 'Smart Thermostat', severity: 'info', status: 'active', time: '2d ago', message: 'Version 4.3.0 is available for update' },
  ]
}

export function getToastQueue() {
  return [
    { id: 1, title: 'High Energy Spike', message: 'HVAC exceeding threshold', severity: 'critical' },
  ]
}

export function getAlertGroups() {
  return [
    { id: 1, name: 'Energy Alerts', count: 3, severity: 'critical', devices: ['HVAC', 'EV Charger', 'Water Heater'] },
    { id: 2, name: 'Water Alerts', count: 2, severity: 'warning', devices: ['Kitchen Sink', 'Shower'] },
    { id: 3, name: 'Device Health', count: 2, severity: 'info', devices: ['Bedroom AC', 'Smart Thermostat'] },
  ]
}

export function getThresholdConfigs() {
  return [
    { id: 1, name: 'Energy Spike', metric: 'Power Draw', threshold: 2.5, unit: 'kW', enabled: true },
    { id: 2, name: 'Water Flow', metric: 'Continuous Flow', threshold: 15, unit: 'min', enabled: true },
    { id: 3, name: 'Temperature', metric: 'Room Temp', threshold: 28, unit: '°C', enabled: false },
    { id: 4, name: 'Device Offline', metric: 'No Response', threshold: 60, unit: 'min', enabled: true },
  ]
}

export function getAnomalyAlerts() {
  return [
    { id: 1, device: 'HVAC', type: 'Spike', confidence: 94, time: '14:00', expected: 1.8, actual: 3.2, status: 'active' },
    { id: 2, device: 'Refrigerator', type: 'Pattern', confidence: 87, time: '03:00', expected: 0.3, actual: 0.8, status: 'investigating' },
    { id: 3, device: 'Water Heater', type: 'Duration', confidence: 91, time: '06:30', expected: 15, actual: 45, status: 'resolved' },
  ]
}

export function getPredictiveWarnings() {
  return [
    { id: 1, device: 'HVAC', prediction: 'Filter replacement needed in 5 days', confidence: 88, severity: 'warning' },
    { id: 2, device: 'Refrigerator', prediction: 'Compressor efficiency declining — maintenance in 2 weeks', confidence: 76, severity: 'info' },
    { id: 3, device: 'Water Heater', prediction: 'Heating element degradation — replace within 1 month', confidence: 82, severity: 'warning' },
  ]
}

export function getDeviceHealthData() {
  return [
    { id: 1, name: 'Smart Thermostat', health: 95, status: 'online', signal: 92, uptime: '99.8%' },
    { id: 2, name: 'Refrigerator', health: 88, status: 'online', signal: 95, uptime: '99.5%' },
    { id: 3, name: 'Water Heater', health: 82, status: 'online', signal: 88, uptime: '98.2%' },
    { id: 4, name: 'Bedroom AC', health: 0, status: 'offline', signal: 0, uptime: '94.1%' },
    { id: 5, name: 'EV Charger', health: 91, status: 'online', signal: 90, uptime: '99.1%' },
  ]
}

export function getAlertAnalytics() {
  return {
    totalAlerts: 156,
    resolvedAlerts: 142,
    avgResolutionTime: '12 min',
    criticalRate: '8%',
    weeklyTrend: [
      { day: 'Mon', count: 5 }, { day: 'Tue', count: 3 },
      { day: 'Wed', count: 7 }, { day: 'Thu', count: 2 },
      { day: 'Fri', count: 4 }, { day: 'Sat', count: 1 },
      { day: 'Sun', count: 2 },
    ],
  }
}
