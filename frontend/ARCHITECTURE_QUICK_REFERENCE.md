# Frontend Architecture - Quick Reference

## 📋 Key Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | Overview with summary cards and quick charts |
| `/energy` | Energy | Detailed energy consumption analysis |
| `/water` | Water | Detailed water consumption analysis |
| `/devices` | Devices | Device management and monitoring |
| `/analytics` | Analytics | Advanced analytics and insights |
| `/alerts` | Alerts | Alert management and history |
| `/settings` | Settings | User preferences and configuration |

## 🎯 Core Components by Category

### Layout
- `Layout` - Main app container
- `Sidebar` - Left navigation
- `Navbar` - Top navigation bar
- `Footer` - Bottom footer

### Charts
- `ChartContainer` - Wrapper with controls
- `EnergyLineChart`, `EnergyBarChart`, `EnergyAreaChart`, `EnergyStackedChart`, `EnergyPieChart`
- `WaterLineChart`, `WaterBarChart`, `WaterAreaChart`, `WaterStackedChart`, `WaterPieChart`
- `GaugeChart`, `ComparisonChart`, `DeviceBreakdownChart`

### Data Display
- `DataTable` - Sortable, filterable table
- `DeviceCard` - Individual device status
- `DeviceList` - Device grid/list view
- `SummaryCard` - Metric display card

### Alerts & Analytics
- `AlertCard`, `AlertPanel`, `AlertBadge`
- `InsightsPanel`, `RecommendationCard`, `EfficiencyScore`

## 🔌 Essential React Query Hooks

```typescript
// Dashboard
useDashboardSummary()
useDashboardRealtime()

// Energy
useEnergyConsumption(params)
useTodayEnergy()

// Water
useWaterConsumption(params)
useTodayWater()

// Devices
useDevices()
useDevice(deviceId)
useUpdateDevice(deviceId)

// Alerts
useAlerts()
useUnreadAlertsCount()
useAcknowledgeAlert(alertId)

// Analytics
useInsights(params)
useTrendAnalysis(params)

// Real-time
useRealtimeConsumption()
useWebSocket(url, onMessage)
```

## 📁 Key Folders

```
src/
├── components/     # All reusable UI components
├── pages/         # Route page components
├── hooks/         # Custom React hooks (including API hooks)
├── services/      # API clients and services
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
└── config/        # Configuration files
```

## 🎨 Layout Structure

```
┌─────────────────────────────────────┐
│           Navbar (64px)             │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │      Main Content            │
│ bar  │      (Scrollable)            │
│(240px)│                              │
│      │                              │
├──────┴──────────────────────────────┤
│           Footer (48px)             │
└─────────────────────────────────────┘
```

