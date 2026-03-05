# Smart Home Energy & Water Consumption Dashboard - Frontend Requirements Summary

## Required Pages/Screens

- **Dashboard (Home)**
  - Overview summary cards
  - Quick charts for energy and water
  - Real-time consumption indicators

- **Energy Consumption Page**
  - Detailed energy usage analysis
  - Charts and visualizations

- **Water Consumption Page**
  - Detailed water usage analysis
  - Charts and visualizations

- **Devices Management Page**
  - Device list and status
  - Device controls

- **Settings Page**
  - User preferences
  - System configuration

- **Analytics Page**
  - Historical analysis
  - Reports

- **Alerts Page**
  - Alert management
  - Notifications

## Required UI Components

### Layout Components
- **Sidebar** - Navigation menu
- **Navbar** - Top navigation bar
- **Layout Container** - Main layout wrapper

### Dashboard Components
- **Summary Cards** - Metric display cards (today's energy, water, cost)
- **Quick Charts** - Small chart widgets

### Chart Components
- **EnergyChart** - Energy consumption visualizations
- **WaterChart** - Water consumption visualizations
- **Chart Container** - Wrapper with controls

### Data Display
- **Data Tables** - Sortable, filterable tables
- **Device Cards** - Individual device status cards
- **Device List** - List view of devices

### Form Components
- **Time Range Picker** - Date/time selector
- **Settings Forms** - Configuration forms

### UI Elements
- **Buttons** - Action buttons
- **Modals** - Dialog windows
- **Toast Notifications** - Alert messages
- **Loading Spinner** - Loading indicators

## Required Charts

### Energy Charts
- **Line Chart** - Time-series energy consumption
- **Bar Chart** - Daily/weekly/monthly totals
- **Area Chart** - Cumulative consumption
- **Stacked Area Chart** - Device-level breakdown
- **Pie/Donut Chart** - Device distribution

### Water Charts
- **Line Chart** - Time-series water consumption
- **Bar Chart** - Daily/weekly/monthly totals
- **Area Chart** - Cumulative consumption
- **Stacked Area Chart** - Fixture-level breakdown
- **Pie/Donut Chart** - Fixture distribution

## Required Real-Time Views

- **Real-Time Dashboard** - Live consumption updates
- **Live Consumption Indicators** - Current power/flow rates
- **Device Status Monitor** - Real-time device states
- **Alert Feed** - Live notification stream

## Required Tables

- **Consumption Data Table** - Historical consumption records
  - Sortable columns
  - Filterable by date range
  - Export functionality

- **Device Status Table** - Device list with consumption
  - Device name, status, current consumption
  - Sortable and filterable

- **Alert History Table** - Past alerts and notifications
  - Alert type, severity, timestamp
  - Acknowledgment status

## Alerts and AI Recommendations UI

### Alert Components
- **Alert Panel** - Recent alerts display
- **Alert Card** - Individual alert component
- **Alert Badge** - Unread alert indicator
- **Alert Configuration** - Threshold settings

### Alert Types
- High consumption alerts
- Leak detection alerts
- Device offline alerts
- Threshold breach notifications

### AI Recommendations
- **Insights Panel** - AI-generated insights
- **Recommendation Cards** - Actionable suggestions
- **Efficiency Score Display** - Performance metrics
- **Trend Analysis** - Predictive insights

## API Data Contracts

### Dashboard Summary
```json
GET /api/dashboard/summary
Response: {
  "energy": {
    "today": { "consumption": 5.2, "unit": "kWh", "cost": 0.78 },
    "efficiencyScore": 85
  },
  "water": {
    "today": { "consumption": 42, "unit": "L", "cost": 0.12 },
    "efficiencyScore": 78
  },
  "alerts": []
}
```

### Energy Consumption
```json
GET /api/energy/consumption?start=DATE&end=DATE&granularity=HOURLY
Response: {
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "consumption": 4.8,
      "devices": { "hvac": 2.1, "refrigerator": 1.2 }
    }
  ]
}
```

### Water Consumption
```json
GET /api/water/consumption?start=DATE&end=DATE&granularity=HOURLY
Response: {
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "consumption": 42,
      "fixtures": { "shower": 18, "kitchen_tap": 12 }
    }
  ]
}
```

### Real-Time Updates (WebSocket)
```json
{
  "timestamp": "2024-01-15T14:46:00Z",
  "energy": { "currentPower": 1.5, "unit": "kW" },
  "water": { "currentFlowRate": 0.0, "unit": "L/min" }
}
```

### Devices
```json
GET /api/devices
Response: {
  "devices": [
    {
      "id": "device-001",
      "name": "HVAC System",
      "status": "online",
      "currentConsumption": 1.2
    }
  ]
}
```

### Alerts
```json
GET /api/alerts
Response: {
  "alerts": [
    {
      "id": "alert-001",
      "type": "high_consumption",
      "severity": "warning",
      "message": "Energy consumption exceeded threshold",
      "timestamp": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### Analytics/Insights
```json
GET /api/analytics/insights
Response: {
  "insights": [
    {
      "type": "trend",
      "title": "Consumption Trend",
      "message": "Energy consumption increased by 5.2%",
      "recommendation": "Consider optimizing HVAC usage"
    }
  ]
}
```

