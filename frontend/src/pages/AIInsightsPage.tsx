import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, Sparkles, Activity, Receipt, Sun, SlidersHorizontal,
    Award, Leaf, Eye, Wrench, Calculator, ChevronDown,
} from 'lucide-react'

// ── AI Components ───────────────────────────────────────────────────────────
import AIRecommendationCard from '@/components/ai/AIRecommendationCard'
import AppliancePredictiveModel from '@/components/ai/AppliancePredictiveModel'
import BillPredictor from '@/components/ai/BillPredictor'
import SeasonalPatterns from '@/components/ai/SeasonalPatterns'
import SmartThresholdAdjust from '@/components/ai/SmartThreshold'
import EfficiencyScoring from '@/components/ai/EfficiencyScoring'
import CarbonFootprintView from '@/components/ai/CarbonFootprint'
import BehavioralInsights from '@/components/ai/BehavioralInsights'
import PredictiveMaintenanceAlerts from '@/components/ai/PredictiveMaintenanceAlerts'
import SavingsSimulator from '@/components/ai/SavingsSimulator'

// ── AI Engine ───────────────────────────────────────────────────────────────
import {
    getAppliancePredictions, getBillPrediction, getSeasonalPatterns,
    getSmartThresholds, getEfficiencyScores, getCarbonFootprint,
    getBehavioralInsights, getMaintenanceAlerts, getSavingsScenarios,
    getAIRecommendations,
} from '@/utils/aiEngine'

// ── Tab definition ──────────────────────────────────────────────────────────
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

// ── Page ────────────────────────────────────────────────────────────────────
export default function AIInsightsPage() {
    const [activeTab, setActiveTab] = useState('recommendations')
    const [tabDropdownOpen, setTabDropdownOpen] = useState(false)

    // Data
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

    const activeTabData = tabs.find(t => t.id === activeTab)!

    return (
        <div className="space-y-6">
            {/* ── Header ──────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20">
                        <Brain className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Intelligence Hub</h1>
                        <p className="text-xs text-gray-400">Enterprise-grade analytics &amp; predictions</p>
                    </div>
                </div>
                <div className="sm:ml-auto flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Models Active
                    </span>
                    <span className="text-[10px] text-gray-500">10 features • Real-time</span>
                </div>
            </motion.div>

            {/* ── Tab Navigation (Desktop: horizontal scroll, Mobile: dropdown) */}
            {/* Desktop tabs */}
            <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
                <div className="flex gap-1.5 min-w-max">
                    {tabs.map(t => {
                        const isActive = activeTab === t.id
                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${isActive
                                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                                    }`}
                            >
                                <t.icon className="w-3.5 h-3.5" />
                                {t.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Mobile tab dropdown */}
            <div className="sm:hidden relative">
                <button
                    onClick={() => setTabDropdownOpen(!tabDropdownOpen)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-semibold text-white"
                >
                    <div className="flex items-center gap-2">
                        <activeTabData.icon className="w-4 h-4 text-teal-400" />
                        {activeTabData.label}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${tabDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {tabDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl overflow-hidden border border-white/10"
                            style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)' }}
                        >
                            {tabs.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => { setActiveTab(t.id); setTabDropdownOpen(false) }}
                                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${activeTab === t.id ? 'bg-teal-500/15 text-teal-300' : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                                        }`}
                                >
                                    <t.icon className="w-3.5 h-3.5" />
                                    {t.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Tab Content ─────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeTab === 'recommendations' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <h2 className="text-sm font-bold text-white">Top AI Recommendations</h2>
                                <span className="text-[10px] text-gray-500 ml-auto">{recommendations.filter(r => !r.implemented).length} actionable</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
