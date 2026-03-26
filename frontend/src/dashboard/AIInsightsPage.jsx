import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Sparkles, Activity, Receipt, Sun, SlidersHorizontal,
  Award, Leaf, Eye, Wrench, Calculator, ChevronDown,
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

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState('recommendations')
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false)

  const recommendations = getAIRecommendations()
  const predictions = getAppliancePredictions()
  const billPrediction = getBillPrediction()
  const seasonal = getSeasonalPatterns()
  const thresholds = getSmartThresholds()
  const efficiency = getEfficiencyScores()
  const carbon = getCarbonFootprint()
  const behavioral = getBehavioralInsights()
  const maintenance = getMaintenanceAlerts()
  const savings = getSavingsScenarios()

  const activeTabData = tabs.find(t => t.id === activeTab)

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            Models Active
          </span>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>10 features</span>
        </div>
      </motion.div>

      {/* Desktop Tabs */}
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '6px', minWidth: 'max-content' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '14px' }}>
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
    </div>
  )
}
