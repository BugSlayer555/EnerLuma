import { motion } from 'framer-motion'
import { Leaf, Zap, Droplets, DollarSign, Gauge, TrendingDown } from 'lucide-react'
import CarbonEmissionsPanel from '../components/sustainability/CarbonEmissionsPanel'
import WaterConservationPanel from '../components/sustainability/WaterConservationPanel'
import CostSavingsTimeline from '../components/sustainability/CostSavingsTimeline'
import EcoScoreGauge from '../components/sustainability/EcoScoreGauge'
import EfficiencyIndex from '../components/sustainability/EfficiencyIndex'
import GreenBadgeAchievements from '../components/sustainability/GreenBadgeAchievements'
import NeighborhoodRanking from '../components/sustainability/NeighborhoodRanking'
import SustainabilityProgressTracker from '../components/sustainability/SustainabilityProgressTracker'
import GamificationPanel from '../components/sustainability/GamificationPanel'
import YearOverYearComparison from '../components/sustainability/YearOverYearComparison'

/* ════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ════════════════════════════════════════════════════════════ */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function SustainabilityPage() {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-[1400px] mx-auto space-y-6"
        >
            {/* ─── Page Header ─── */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Leaf className="w-6 h-6 text-primary-500" />
                        Sustainability Impact Panel
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Comprehensive environmental impact analysis with gamification &amp; academic-grade KPIs
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="live-badge">Live</div>
                    <select className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none">
                        <option>This Month</option>
                        <option>This Quarter</option>
                        <option>This Year</option>
                        <option>All Time</option>
                    </select>
                </div>
            </motion.div>

            {/* ─── KPI Summary Row ─── */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Leaf, label: 'CO₂ Saved', value: '14.6 kg', sub: '↑ 12% vs last month', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
                    { icon: Droplets, label: 'Water Saved', value: '1,850 L', sub: '↑ 18% vs baseline', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
                    { icon: DollarSign, label: 'Cost Saved', value: '₹1,580', sub: '↑ 15% vs last month', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
                    { icon: Gauge, label: 'Efficiency Index', value: '78 / 100', sub: '4-Star BEE Rating', iconBg: 'bg-primary-50', iconColor: 'text-primary-600' },
                ].map(kpi => (
                    <motion.div key={kpi.label} whileHover={{ y: -2 }} className="kpi-card">
                        <div className={`p-2 rounded-xl ${kpi.iconBg} w-fit`}>
                            <kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} />
                        </div>
                        <div className="mt-3">
                            <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                        <p className="text-[10px] text-emerald-500 font-semibold mt-1">{kpi.sub}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* ─── 1. Carbon Emissions Estimate ─── */}
            <CarbonEmissionsPanel />

            {/* ─── 4. Monthly Eco-Score + 5. Home Efficiency Index ─── */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <EcoScoreGauge />
                <EfficiencyIndex />
            </motion.div>

            {/* ─── 2. Water Conservation Impact ─── */}
            <WaterConservationPanel />

            {/* ─── 3. Cost Savings Over Time ─── */}
            <CostSavingsTimeline />

            {/* ─── 10. Year-over-Year Comparison ─── */}
            <YearOverYearComparison />

            {/* ─── 8. Sustainability Progress Tracker ─── */}
            <SustainabilityProgressTracker />

            {/* ─── 6. Green Badge Achievements ─── */}
            <GreenBadgeAchievements />

            {/* ─── 7. Neighborhood Ranking ─── */}
            <NeighborhoodRanking />

            {/* ─── 9. Gamification Hub ─── */}
            <GamificationPanel />

            {/* ─── Academic Footer ─── */}
            <motion.div variants={fadeUp} className="card-static">
                <h2 className="section-title mb-3">Academic Framework References</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        { framework: 'GHG Protocol Scope 2', ref: 'WRI/WBCSD (2004)', domain: 'Carbon Accounting' },
                        { framework: 'AHP Weighting', ref: 'Saaty, T.L. (1980)', domain: 'Eco-Score Composite' },
                        { framework: 'BEE Star Rating', ref: 'Bureau of Energy Efficiency, India', domain: 'Efficiency Index' },
                        { framework: 'Fogg Behavior Model', ref: 'Fogg (2009)', domain: 'Gamification Design' },
                        { framework: 'Social Norm Theory', ref: 'Cialdini (2003); Allcott (2011)', domain: 'Neighborhood Ranking' },
                        { framework: 'Goal-Setting Theory', ref: 'Locke & Latham (1990)', domain: 'Progress Tracking' },
                    ].map(a => (
                        <div key={a.framework} className="p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs font-semibold text-gray-800">{a.framework}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{a.ref}</p>
                            <p className="text-[10px] text-primary-600 font-medium mt-0.5">{a.domain}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
