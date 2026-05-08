import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Sparkles, Activity, Receipt, Sun, SlidersHorizontal,
  Award, Leaf, Eye, Wrench, Calculator, RefreshCw,
} from 'lucide-react'

import AIRecommendationCard from '../components/ai/AIRecommendationCard'
import AppliancePredictiveModel from '../components/ai/AppliancePredictiveModel'
import BillPredictor from '../components/ai/BillPredictor'
import SeasonalPatterns from '../components/ai/SeasonalPatterns'
import SmartThresholdAdjust from '../components/ai/SmartThreshold'
import EfficiencyScoring from '../components/ai/EfficiencyScoring'
import CarbonFootprintView from '../components/ai/CarbonFootprint'
import BehavioralInsights from '../components/ai/BehavioralInsights'
import PredictiveMaintenanceAlerts from '../components/ai/PredictiveMaintenanceAlerts'
import SavingsSimulator from '../components/ai/SavingsSimulator'

import {
  getAppliancePredictions, getBillPrediction, getSeasonalPatterns,
  getSmartThresholds, getEfficiencyScores, getCarbonFootprint,
  getBehavioralInsights, getMaintenanceAlerts, getSavingsScenarios,
  getAIRecommendations,
} from '../utils/aiEngine'

const API_CANDIDATES = (() => {
  const primary = '/api/ai/insights'
  const base = String(import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '')

  if (!base) {
    return [primary]
  }

  const normalized = base.toLowerCase()
  const fallback = normalized.endsWith('/api') ? `${base}/ai/insights` : `${base}/api/ai/insights`

  return fallback === primary ? [primary] : [primary, fallback]
})()

const tabs = [
  { id: 'recommendations', label: 'AI Recs', icon: Sparkles },
  { id: 'predictive', label: 'Predictive', icon: Activity },
  { id: 'billing', label: 'Bill Forecast', icon: Receipt },
  { id: 'seasonal', label: 'Seasonal', icon: Sun },
  { id: 'thresholds', label: 'Thresholds', icon: SlidersHorizontal },
  { id: 'efficiency', label: 'Efficiency', icon: Award },
  { id: 'carbon', label: 'Carbon', icon: Leaf },
  { id: 'behavior', label: 'Behavior', icon: Eye },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'savings', label: 'Simulator', icon: Calculator },
]

function normalizeInsightsData(data) {
  if (!data || typeof data !== 'object') return null

  const iconMap = {
    AC: '❄️',
    WH: '🚿',
    SM: '🌡️',
    LF: '🚰',
    WT: '🚿',
    LT: '💡',
    SH: '🚿',
    MT: '🔧',
  }

  const mapIcon = (value) => iconMap[value] || value || '✨'

  return {
    recommendations: Array.isArray(data.recommendations)
      ? data.recommendations.map((item) => ({ ...item, icon: mapIcon(item.icon) }))
      : [],
    predictions: Array.isArray(data.predictions)
      ? data.predictions.map((item) => ({ ...item, icon: mapIcon(item.icon) }))
      : [],
    billPrediction: data.billPrediction || data.bill || null,
    seasonalPatterns: Array.isArray(data.seasonalPatterns) ? data.seasonalPatterns : [],
    smartThresholds: Array.isArray(data.smartThresholds) ? data.smartThresholds : [],
    efficiencyScores: Array.isArray(data.efficiencyScores)
      ? data.efficiencyScores.map((item) => ({ ...item, icon: mapIcon(item.icon) }))
      : [],
    carbonFootprint: data.carbonFootprint || null,
    behavioralInsights: Array.isArray(data.behavioralInsights)
      ? data.behavioralInsights.map((item) => ({ ...item, icon: mapIcon(item.icon) }))
      : [],
    maintenanceAlerts: Array.isArray(data.maintenanceAlerts)
      ? data.maintenanceAlerts.map((item) => ({ ...item, icon: mapIcon(item.icon) }))
      : [],
    savingsScenarios: Array.isArray(data.savingsScenarios) ? data.savingsScenarios : [],
  }
}

function getLocalInsightsData() {
  return normalizeInsightsData({
    recommendations: getAIRecommendations(),
    predictions: getAppliancePredictions(),
    billPrediction: getBillPrediction(),
    seasonalPatterns: getSeasonalPatterns(),
    smartThresholds: getSmartThresholds(),
    efficiencyScores: getEfficiencyScores(),
    carbonFootprint: getCarbonFootprint(),
    behavioralInsights: getBehavioralInsights(),
    maintenanceAlerts: getMaintenanceAlerts(),
    savingsScenarios: getSavingsScenarios(),
  })
}

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState('recommendations')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sourceLabel, setSourceLabel] = useState('Local model')
  const [insights, setInsights] = useState(() => getLocalInsightsData())

  const loadInsights = async () => {
    setLoading(true)
    setError('')

    const token = localStorage.getItem('enerluma_token')
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined

    for (const url of API_CANDIDATES) {
      try {
        const response = await fetch(url, { headers })

        if (!response.ok) {
          continue
        }

        const data = normalizeInsightsData(await response.json())
        if (data) {
          setInsights(data)
          setSourceLabel('Backend AI insights')
          setLoading(false)
          return
        }
      } catch {
        // Try the next candidate.
      }
    }

    setInsights(getLocalInsightsData())
    setSourceLabel('Local AI model')
    setError(token ? 'Using local fallback because the insights API was unavailable.' : 'Sign in to load personalized backend insights.')
    setLoading(false)
  }

  useEffect(() => {
    loadInsights()
  }, [])

  const metrics = useMemo(() => {
    const recommendations = insights?.recommendations || []
    const predictions = insights?.predictions || []
    const maintenance = insights?.maintenanceAlerts || []
    const carbon = insights?.carbonFootprint
    const bill = insights?.billPrediction

    const savingsFromRecommendations = recommendations.reduce((sum, item) => sum + (Number(item.potentialSavings) || 0), 0)
    const highPriorityCount = recommendations.filter((item) => ['critical', 'high'].includes(item.priority)).length
    const anomalyCount = predictions.filter((item) => item.anomalyDetected).length
    const maintenanceCount = maintenance.filter((item) => Number(item.daysUntilMaintenance) <= 30).length
    const carbonBelowAvg = carbon && Number(carbon.comparedToAvg) < 0 ? `${Math.abs(carbon.comparedToAvg)}% below avg` : 'At baseline'

    return {
      savingsFromRecommendations,
      highPriorityCount,
      anomalyCount,
      maintenanceCount,
      carbonBelowAvg,
      billSavings: bill?.savingsPotential || bill?.savingsOpportunity || 0,
    }
  }, [insights])

  const recommendations = insights?.recommendations || []
  const predictions = insights?.predictions || []
  const billPrediction = insights?.billPrediction || getBillPrediction()
  const seasonal = insights?.seasonalPatterns || []
  const thresholds = insights?.smartThresholds || []
  const efficiency = insights?.efficiencyScores || []
  const carbon = insights?.carbonFootprint || getCarbonFootprint()
  const behavioral = insights?.behavioralInsights || []
  const maintenance = insights?.maintenanceAlerts || []
  const savings = insights?.savingsScenarios || []

  const activeTabData = tabs.find((t) => t.id === activeTab)

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '24px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            padding: '12px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
            border: '1px solid #99f6e4',
          }}>
            <Brain style={{ width: '24px', height: '24px', color: '#0f766e' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0 }}>AI Intelligence Hub</h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '2px 0 0' }}>Enterprise-grade analytics & predictions</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', borderRadius: '20px',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            fontSize: '11px', fontWeight: 600, color: '#16a34a',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
            {sourceLabel}
          </span>
          <button
            type="button"
            onClick={loadInsights}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '18px',
              border: '1px solid #e5e7eb', background: '#ffffff',
              fontSize: '11px', fontWeight: 600, color: '#374151', cursor: 'pointer',
            }}
          >
            <RefreshCw style={{ width: '12px', height: '12px' }} />
            Refresh
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {[
          { label: 'Potential savings', value: `₹${metrics.savingsFromRecommendations.toLocaleString()}/mo`, detail: 'Combined recommendation impact' },
          { label: 'High priority items', value: metrics.highPriorityCount, detail: 'Critical and high-priority actions' },
          { label: 'Anomalies detected', value: metrics.anomalyCount, detail: 'Prediction signals needing attention' },
          { label: 'Maintenance within 30 days', value: metrics.maintenanceCount, detail: 'Items to schedule soon' },
        ].map((item) => (
          <div key={item.label} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '18px', padding: '16px 18px' }}>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', margin: 0 }}>{item.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>{item.value}</span>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '8px 0 0', lineHeight: 1.4 }}>{item.detail}</p>
          </div>
        ))}
      </motion.div>

      {error && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '14px', background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {/* Desktop Tabs */}
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '6px', minWidth: 'max-content', paddingBottom: '2px' }}>
          {tabs.map(t => {
            const isActive = activeTab === t.id
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '12px',
                  fontSize: '13px', fontWeight: 600,
                  border: isActive ? '1px solid #99f6e4' : '1px solid transparent',
                  background: isActive ? '#f0fdfa' : 'transparent',
                  color: isActive ? '#0f766e' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 1px 4px rgba(15,118,110,0.08)' : 'none',
                }}
              >
                <Icon style={{ width: '14px', height: '14px' }} />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', margin: 0 }}>{activeTabData?.label}</h2>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '3px 0 0' }}>Insights tuned to energy, water, devices, alerts, sustainability, and savings.</p>
        </div>
        <span style={{ fontSize: '11px', color: '#6b7280' }}>{loading ? 'Loading insights…' : 'Updated for the current EnerLuma dashboard'}</span>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'recommendations' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Sparkles style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', margin: 0 }}>Top AI Recommendations</h2>
                <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: 'auto' }}>
                  {recommendations.filter(r => !r.implemented).length} actionable
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
                {recommendations.map((r, i) => (
                  <AIRecommendationCard key={r.id} recommendation={r} index={i} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'predictive' && <AppliancePredictiveModel predictions={predictions} />}
          {activeTab === 'billing' && <BillPredictor prediction={billPrediction} />}
          {activeTab === 'seasonal' && <SeasonalPatterns patterns={seasonal} />}
          {activeTab === 'thresholds' && <SmartThresholdAdjust thresholds={thresholds} />}
          {activeTab === 'efficiency' && <EfficiencyScoring scores={efficiency} />}
          {activeTab === 'carbon' && <CarbonFootprintView data={carbon} />}
          {activeTab === 'behavior' && <BehavioralInsights insights={behavioral} />}
          {activeTab === 'maintenance' && <PredictiveMaintenanceAlerts alerts={maintenance} />}
          {activeTab === 'savings' && <SavingsSimulator scenarios={savings} />}
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: '16px', fontSize: '11px', color: '#9ca3af' }}>
        {metrics.billSavings ? `Estimated bill savings opportunity: ₹${metrics.billSavings}/mo. ` : ''}
        Carbon status: {metrics.carbonBelowAvg}.
      </div>
    </div>
  )
}
