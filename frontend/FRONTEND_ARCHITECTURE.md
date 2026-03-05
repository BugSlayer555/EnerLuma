# Smart Home Dashboard - Frontend Architecture

**Stack:** Vite + React + TypeScript + TailwindCSS + React Query + React Router

---

## 📁 Folder Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
│       └── images/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarItem.tsx
│   │   │   │   └── Sidebar.css
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── NotificationIcon.tsx
│   │   │   │   ├── UserMenu.tsx
│   │   │   │   └── Navbar.css
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.types.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Card.types.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Modal.types.ts
│   │   │   ├── Toast/
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── ToastContainer.tsx
│   │   │   │   └── toast.types.ts
│   │   │   ├── Loading/
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── LoadingOverlay.tsx
│   │   │   ├── EmptyState/
│   │   │   │   └── EmptyState.tsx
│   │   │   └── Badge/
│   │   │       └── Badge.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── ChartContainer.tsx
│   │   │   ├── EnergyChart/
│   │   │   │   ├── EnergyLineChart.tsx
│   │   │   │   ├── EnergyBarChart.tsx
│   │   │   │   ├── EnergyAreaChart.tsx
│   │   │   │   ├── EnergyStackedChart.tsx
│   │   │   │   ├── EnergyPieChart.tsx
│   │   │   │   └── EnergyChart.types.ts
│   │   │   ├── WaterChart/
│   │   │   │   ├── WaterLineChart.tsx
│   │   │   │   ├── WaterBarChart.tsx
│   │   │   │   ├── WaterAreaChart.tsx
│   │   │   │   ├── WaterStackedChart.tsx
│   │   │   │   ├── WaterPieChart.tsx
│   │   │   │   └── WaterChart.types.ts
│   │   │   ├── DeviceBreakdownChart.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   └── GaugeChart.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── SummaryCard.tsx
│   │   │   ├── QuickChart.tsx
│   │   │   ├── WeatherWidget.tsx
│   │   │   └── AlertPanel.tsx
│   │   │
│   │   ├── data-display/
│   │   │   ├── DataTable/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── TablePagination.tsx
│   │   │   │   ├── TableFilters.tsx
│   │   │   │   └── DataTable.types.ts
│   │   │   ├── DeviceCard.tsx
│   │   │   ├── DeviceList.tsx
│   │   │   └── ConsumptionDetail.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── TimeRangePicker.tsx
│   │   │   ├── ThresholdInput.tsx
│   │   │   ├── DeviceSettingsForm.tsx
│   │   │   └── UserSettingsForm.tsx
│   │   │
│   │   ├── alerts/
│   │   │   ├── AlertCard.tsx
│   │   │   ├── AlertPanel.tsx
│   │   │   ├── AlertBadge.tsx
│   │   │   ├── AlertConfiguration.tsx
│   │   │   └── AlertHistory.tsx
│   │   │
│   │   └── analytics/
│   │       ├── InsightsPanel.tsx
│   │       ├── RecommendationCard.tsx
│   │       ├── EfficiencyScore.tsx
│   │       └── TrendAnalysis.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── index.ts
│   │   ├── Energy/
│   │   │   ├── EnergyPage.tsx
│   │   │   └── index.ts
│   │   ├── Water/
│   │   │   ├── WaterPage.tsx
│   │   │   └── index.ts
│   │   ├── Devices/
│   │   │   ├── DevicesPage.tsx
│   │   │   ├── DeviceDetailModal.tsx
│   │   │   └── index.ts
│   │   ├── Analytics/
│   │   │   ├── AnalyticsPage.tsx
│   │   │   └── index.ts
│   │   ├── Alerts/
│   │   │   ├── AlertsPage.tsx
│   │   │   └── index.ts
│   │   ├── Settings/
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── NotificationSettings.tsx
│   │   │   └── index.ts
│   │   └── NotFound/
│   │       ├── NotFoundPage.tsx
│   │       └── index.ts
│   │
│   ├── hooks/
│   │   ├── api/
│   │   │   ├── useDashboard.ts
│   │   │   ├── useEnergy.ts
│   │   │   ├── useWater.ts
│   │   │   ├── useDevices.ts
│   │   │   ├── useAlerts.ts
│   │   │   ├── useAnalytics.ts
│   │   │   ├── useSettings.ts
│   │   │   └── useRealtime.ts
│   │   ├── useWebSocket.ts
│   │   ├── useToast.ts
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── dashboard.api.ts
│   │   │   ├── energy.api.ts
│   │   │   ├── water.api.ts
│   │   │   ├── devices.api.ts
│   │   │   ├── alerts.api.ts
│   │   │   ├── analytics.api.ts
│   │   │   └── settings.api.ts
│   │   ├── websocket/
│   │   │   └── websocket.service.ts
│   │   └── storage/
│   │       └── storage.service.ts
│   │
│   ├── store/
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx
│   │   │   ├── AuthContext.tsx
│   │   │   └── ToastContext.tsx
│   │   └── slices/
│   │       ├── userSlice.ts
│   │       └── uiSlice.ts
│   │
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── dashboard.types.ts
│   │   ├── energy.types.ts
│   │   ├── water.types.ts
│   │   ├── device.types.ts
│   │   ├── alert.types.ts
│   │   ├── analytics.types.ts
│   │   └── common.types.ts
│   │
│   ├── utils/
│   │   ├── format.ts
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   │
│   ├── config/
│   │   ├── routes.ts
│   │   ├── api.config.ts
│   │   └── theme.config.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx
│   ├── App.css
│   └── index.css
│
├── .env
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

---

## 🛣️ Routing Structure

### Route Configuration

```typescript
// src/config/routes.ts
export const ROUTES = {
  DASHBOARD: '/',
  ENERGY: '/energy',
  WATER: '/water',
  DEVICES: '/devices',
  ANALYTICS: '/analytics',
  ALERTS: '/alerts',
  SETTINGS: '/settings',
} as const;
```

### Router Setup

```typescript
// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { 
  DashboardPage, 
  EnergyPage, 
  WaterPage, 
  DevicesPage, 
  AnalyticsPage, 
  AlertsPage, 
  SettingsPage,
  NotFoundPage 
} from './pages';
import { ROUTES } from './config/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.ENERGY,
        element: <EnergyPage />,
      },
      {
        path: ROUTES.WATER,
        element: <WaterPage />,
      },
      {
        path: ROUTES.DEVICES,
        element: <DevicesPage />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <AnalyticsPage />,
      },
      {
        path: ROUTES.ALERTS,
        element: <AlertsPage />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
```

---

## 🧩 Reusable Components

### Layout Components

1. **Layout** (`components/layout/Layout.tsx`)
   - Main app wrapper
   - Contains Sidebar, Navbar, and main content area
   - Handles responsive layout

2. **Sidebar** (`components/layout/Sidebar/Sidebar.tsx`)
   - Left navigation menu
   - Collapsible on mobile
   - Active route highlighting
   - Icon + text navigation items

3. **Navbar** (`components/layout/Navbar/Navbar.tsx`)
   - Top navigation bar
   - Search functionality
   - Notification bell with badge
   - User menu dropdown
   - Theme switcher

4. **Footer** (`components/layout/Footer.tsx`)
   - Footer with copyright and links

### UI Components

5. **Button** (`components/ui/Button/Button.tsx`)
   - Variants: primary, secondary, danger, ghost
   - Sizes: sm, md, lg
   - Loading state
   - Icon support
   - Disabled state

6. **Card** (`components/ui/Card/Card.tsx`)
   - Container with shadow and border
   - Header, body, footer sections
   - Hover effects

7. **Modal** (`components/ui/Modal/Modal.tsx`)
   - Overlay with backdrop
   - Close on outside click
   - Close button
   - Scrollable content
   - Multiple sizes

8. **Toast** (`components/ui/Toast/Toast.tsx`)
   - Success, error, warning, info variants
   - Auto-dismiss with timer
   - Manual dismiss
   - Stack positioning
   - Animation

9. **LoadingSpinner** (`components/ui/Loading/LoadingSpinner.tsx`)
   - Circular spinner
   - Full page overlay option
   - Inline spinner option
   - Customizable size and color

10. **EmptyState** (`components/ui/EmptyState/EmptyState.tsx`)
    - Icon/image support
    - Title and description
    - Action button
    - Customizable message

11. **Badge** (`components/ui/Badge/Badge.tsx`)
    - Status indicators
    - Notification counts
    - Color variants
    - Rounded/rectangular shapes

### Chart Components

12. **ChartContainer** (`components/charts/ChartContainer.tsx`)
    - Wrapper for all charts
    - Time range selector
    - Chart type switcher
    - Export button (PNG, CSV)
    - Loading and error states
    - Responsive container

13. **EnergyLineChart** (`components/charts/EnergyChart/EnergyLineChart.tsx`)
    - Time-series line chart
    - Multiple series support
    - Interactive tooltips
    - Zoom and pan

14. **EnergyBarChart** (`components/charts/EnergyChart/EnergyBarChart.tsx`)
    - Vertical/horizontal bar chart
    - Grouped bars
    - Stacked option

15. **EnergyAreaChart** (`components/charts/EnergyChart/EnergyAreaChart.tsx`)
    - Area chart with gradient fill
    - Stacked area option

16. **EnergyStackedChart** (`components/charts/EnergyChart/EnergyStackedChart.tsx`)
    - Stacked area chart
    - Device breakdown visualization

17. **EnergyPieChart** (`components/charts/EnergyChart/EnergyPieChart.tsx`)
    - Pie/Donut chart
    - Device distribution
    - Interactive segments
    - Legend

18. **Water Charts** (Same structure as Energy charts)
    - WaterLineChart
    - WaterBarChart
    - WaterAreaChart
    - WaterStackedChart
    - WaterPieChart

19. **DeviceBreakdownChart** (`components/charts/DeviceBreakdownChart.tsx`)
    - Pie chart for device/fixture breakdown
    - Dynamic data binding

20. **ComparisonChart** (`components/charts/ComparisonChart.tsx`)
    - Side-by-side period comparison
    - Bar chart with two series

21. **GaugeChart** (`components/charts/GaugeChart.tsx`)
    - Circular gauge/speedometer
    - Efficiency scores
    - Percentage indicators
    - Color zones (good/warning/critical)

### Dashboard Components

22. **SummaryCard** (`components/dashboard/SummaryCard.tsx`)
    - Metric display card
    - Title, value, unit, trend
    - Icon support
    - Click handlers
    - Color-coded trends

23. **QuickChart** (`components/dashboard/QuickChart.tsx`)
    - Mini chart widget
    - Simplified line/bar chart
    - Link to detailed view

24. **WeatherWidget** (`components/dashboard/WeatherWidget.tsx`)
    - Weather information display
    - Temperature, condition, humidity
    - Icon representation

25. **AlertPanel** (`components/dashboard/AlertPanel.tsx`)
    - Recent alerts summary
    - List of recent alerts
    - Link to full alerts page

### Data Display Components

26. **DataTable** (`components/data-display/DataTable/DataTable.tsx`)
    - Sortable columns
    - Filterable rows
    - Pagination
    - Row selection
    - Export functionality
    - Responsive design
    - Loading and empty states

27. **DeviceCard** (`components/data-display/DeviceCard.tsx`)
    - Device status card
    - Name, type, status indicator
    - Current consumption
    - Quick actions
    - Status badge (online/offline)

28. **DeviceList** (`components/data-display/DeviceList.tsx`)
    - Grid/list view of devices
    - Filter and search
    - Group by room/zone
    - Status indicators

29. **ConsumptionDetail** (`components/data-display/ConsumptionDetail.tsx`)
    - Detailed consumption breakdown
    - Device/fixture list with values
    - Percentage distribution

### Form Components

30. **TimeRangePicker** (`components/forms/TimeRangePicker.tsx`)
    - Date range selection
    - Preset ranges (Today, Week, Month, Year, Custom)
    - Calendar picker
    - Relative time options

31. **ThresholdInput** (`components/forms/ThresholdInput.tsx`)
    - Number input with unit
    - Validation
    - Min/max constraints

32. **DeviceSettingsForm** (`components/forms/DeviceSettingsForm.tsx`)
    - Device configuration form
    - Settings fields
    - Schedule configuration
    - Save/cancel actions

33. **UserSettingsForm** (`components/forms/UserSettingsForm.tsx`)
    - User preferences form
    - Theme, units, currency
    - Notification preferences
    - Save/cancel actions

### Alert Components

34. **AlertCard** (`components/alerts/AlertCard.tsx`)
    - Individual alert display
    - Type, severity, message
    - Timestamp
    - Acknowledge button
    - Severity color coding

35. **AlertPanel** (`components/alerts/AlertPanel.tsx`)
    - Alerts list container
    - Filter by type/severity
    - Sort options

36. **AlertBadge** (`components/alerts/AlertBadge.tsx`)
    - Unread alert count
    - Severity indicator

37. **AlertConfiguration** (`components/alerts/AlertConfiguration.tsx`)
    - Alert threshold settings
    - Enable/disable alerts
    - Sensitivity settings

38. **AlertHistory** (`components/alerts/AlertHistory.tsx`)
    - Historical alerts table
    - Filter and search
    - Acknowledgment status

### Analytics Components

39. **InsightsPanel** (`components/analytics/InsightsPanel.tsx`)
    - AI-generated insights list
    - Insight cards with recommendations
    - Severity indicators

40. **RecommendationCard** (`components/analytics/RecommendationCard.tsx`)
    - Actionable suggestion card
    - Title, description, action button
    - Impact indicators

41. **EfficiencyScore** (`components/analytics/EfficiencyScore.tsx`)
    - Efficiency score display
    - Gauge chart integration
    - Trend indicators

42. **TrendAnalysis** (`components/analytics/TrendAnalysis.tsx`)
    - Trend visualization
    - Predictive charts
    - Period comparison

---

## 🎨 Global UI Layout

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Navbar (Top Bar)                      │
│  [Logo]  [Search]              [Notifications] [User]    │
├──────────┬──────────────────────────────────────────────┤
│          │                                               │
│ Sidebar  │           Main Content Area                   │
│          │                                               │
│ • Dashboard│              (Page Content)                 │
│ • Energy  │                                               │
│ • Water   │                                               │
│ • Devices │                                               │
│ • Analytics│                                              │
│ • Alerts │                                               │
│ • Settings│                                               │
│          │                                               │
│          │                                               │
└──────────┴──────────────────────────────────────────────┘
│                      Footer                              │
└─────────────────────────────────────────────────────────┘
```

### Layout Component Structure

**Layout.tsx** - Main container component
- **Structure:**
  - Fixed top Navbar (height: 64px)
  - Fixed left Sidebar (width: 240px, collapsible to 64px)
  - Scrollable main content area (flex-1)
  - Fixed bottom Footer (height: 48px)

- **Responsive Behavior:**
  - Desktop (≥1024px): Sidebar visible, full layout
  - Tablet (768px-1023px): Sidebar overlay/hamburger menu
  - Mobile (<768px): Sidebar drawer, bottom navigation option

- **Theme Support:**
  - Light/Dark mode toggle
  - Theme persisted in localStorage
  - Smooth transitions between themes

- **Features:**
  - Scroll to top on route change
  - Breadcrumb navigation (optional)
  - Loading states
  - Error boundaries

### Sidebar Structure

- **Header:** Logo + App name
- **Navigation Items:**
  - Icon + Label
  - Active state highlighting
  - Badge for unread alerts (if applicable)
  - Expandable submenus (if needed)
- **Footer:** User info or app version
- **Collapse/Expand:** Toggle button

### Navbar Structure

- **Left Section:** 
  - Logo (optional, or breadcrumbs)
  - Search bar (global search)
- **Right Section:**
  - Notification bell with badge count
  - Theme switcher (light/dark toggle)
  - User menu dropdown (profile, settings, logout)

---

## 🔌 Required API Hooks (React Query)

### Dashboard Hooks

**useDashboard** (`hooks/api/useDashboard.ts`)
```typescript
// Get dashboard summary
useDashboardSummary()
// Returns: DashboardSummary (energy, water, alerts)

// Real-time dashboard updates
useDashboardRealtime(refreshInterval: number)
```

### Energy Hooks

**useEnergy** (`hooks/api/useEnergy.ts`)
```typescript
// Get energy consumption data
useEnergyConsumption(params: {
  startDate: string;
  endDate: string;
  granularity: 'hourly' | 'daily' | 'weekly' | 'monthly';
  deviceId?: string;
})

// Get energy statistics
useEnergyStatistics(params: {
  startDate: string;
  endDate: string;
})

// Get today's energy summary
useTodayEnergy()

// Mutations
useUpdateEnergySettings() // Update device energy settings
```

### Water Hooks

**useWater** (`hooks/api/useWater.ts`)
```typescript
// Get water consumption data
useWaterConsumption(params: {
  startDate: string;
  endDate: string;
  granularity: 'hourly' | 'daily' | 'weekly' | 'monthly';
  fixtureId?: string;
})

// Get water statistics
useWaterStatistics(params: {
  startDate: string;
  endDate: string;
})

// Get today's water summary
useTodayWater()

// Get leak detection data
useLeakDetection()
```

### Device Hooks

**useDevices** (`hooks/api/useDevices.ts`)
```typescript
// Get all devices
useDevices(filters?: {
  status?: 'online' | 'offline' | 'all';
  room?: string;
  type?: string;
})

// Get single device
useDevice(deviceId: string)

// Get device consumption
useDeviceConsumption(deviceId: string, params: {
  startDate: string;
  endDate: string;
})

// Mutations
useUpdateDevice(deviceId: string) // Update device settings
useToggleDevice(deviceId: string) // Turn device on/off
useCreateDevice() // Add new device
useDeleteDevice(deviceId: string) // Remove device
```

### Alert Hooks

**useAlerts** (`hooks/api/useAlerts.ts`)
```typescript
// Get all alerts
useAlerts(filters?: {
  status?: 'active' | 'acknowledged' | 'all';
  type?: string;
  severity?: 'info' | 'warning' | 'critical';
  limit?: number;
})

// Get unread alerts count
useUnreadAlertsCount()

// Get alert by ID
useAlert(alertId: string)

// Mutations
useAcknowledgeAlert(alertId: string) // Mark alert as acknowledged
useDismissAlert(alertId: string) // Dismiss alert
useUpdateAlertThresholds() // Update alert configuration
```

### Analytics Hooks

**useAnalytics** (`hooks/api/useAnalytics.ts`)
```typescript
// Get insights and recommendations
useInsights(params: {
  startDate: string;
  endDate: string;
  type?: 'energy' | 'water' | 'all';
})

// Get trend analysis
useTrendAnalysis(params: {
  resource: 'energy' | 'water';
  startDate: string;
  endDate: string;
})

// Get predictions
usePredictions(params: {
  resource: 'energy' | 'water';
  period: 'week' | 'month';
})

// Get comparison data
useComparison(params: {
  resource: 'energy' | 'water';
  currentStart: string;
  currentEnd: string;
  previousStart: string;
  previousEnd: string;
})

// Export data
useExportData() // Mutation for exporting data
```

### Settings Hooks

**useSettings** (`hooks/api/useSettings.ts`)
```typescript
// Get user settings
useUserSettings()

// Get notification preferences
useNotificationSettings()

// Mutations
useUpdateUserSettings() // Update user preferences
useUpdateNotificationSettings() // Update notification preferences
useUpdateThresholds() // Update consumption thresholds
```

### Real-Time Hooks

**useRealtime** (`hooks/api/useRealtime.ts`)
```typescript
// Real-time consumption data
useRealtimeConsumption() // WebSocket subscription

// Real-time device status
useRealtimeDeviceStatus() // WebSocket subscription

// Real-time alerts
useRealtimeAlerts() // WebSocket subscription
```

### WebSocket Hook

**useWebSocket** (`hooks/useWebSocket.ts`)
```typescript
// Generic WebSocket hook
useWebSocket<T>(url: string, onMessage: (data: T) => void)
// Returns: connection status, send function
```

---

## 📦 Additional Required Dependencies

Update `package.json` with these TypeScript and React Query dependencies:

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",
    "date-fns": "^3.0.0",
    "recharts": "^3.4.1",
    "react-router-dom": "^7.9.6",
    "socket.io-client": "^4.7.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2"
  }
}
```

---

## 🔧 Key Configuration Files

### TypeScript Config (`tsconfig.json`)
- Strict mode enabled
- Path aliases for clean imports
- React JSX support

### Vite Config (`vite.config.ts`)
- React plugin
- Path aliases
- Environment variables
- Build optimization

### Tailwind Config (`tailwind.config.js`)
- Custom color palette (energy blue, water aqua)
- Custom spacing scale
- Dark mode support
- Responsive breakpoints

### React Query Config
- Query client setup with default options
- Error handling
- Retry logic
- Cache configuration
- DevTools integration

---

## 🎯 Implementation Priority

### Phase 1: Core Foundation
1. Project setup (TypeScript, Tailwind, React Query)
2. Layout components (Sidebar, Navbar, Layout)
3. Routing structure
4. Basic UI components (Button, Card, Modal, Loading)

### Phase 2: Dashboard & Data Display
1. Dashboard page with summary cards
2. Energy and Water pages
3. Basic chart components
4. Data table component

### Phase 3: Advanced Features
1. Real-time updates (WebSocket integration)
2. Device management page
3. Alerts system
4. Analytics and insights

### Phase 4: Polish & Optimization
1. Settings page
2. Performance optimization
3. Accessibility improvements
4. Error handling and edge cases

