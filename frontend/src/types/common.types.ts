// Common TypeScript types for the application

export type TimeGranularity = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export type AlertSeverity = 'info' | 'warning' | 'critical'

export type AlertType = 'high_consumption' | 'leak_detected' | 'device_offline' | 'threshold_breach'

export type DeviceStatus = 'online' | 'offline' | 'active' | 'idle'

export type ChartType = 'line' | 'bar' | 'area' | 'stacked' | 'pie' | 'donut'

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

