import { motion } from 'framer-motion'
import { Receipt, TrendingDown, AlertCircle, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { BillPrediction } from '@/types/ai.types'

interface Props { prediction: BillPrediction }

export default function BillPredictor({ prediction: bp }: Props) {
    const diff = bp.previousAmount - bp.predictedAmount
    const pctChange = ((diff / bp.previousAmount) * 100).toFixed(1)
    const isSaving = diff > 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))',
                border: '1px solid rgba(20,184,166,0.15)',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Receipt className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-bold text-white">Monthly Bill Prediction</h2>
                <span className="ml-auto text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold">{bp.month}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Bill number */}
                <div>
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-4xl font-extrabold text-white">₹{bp.predictedAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">Predicted total
                        <span className="text-gray-600 ml-2">
                            (₹{bp.confidenceLow.toLocaleString()} – ₹{bp.confidenceHigh.toLocaleString()})
                        </span>
                    </p>

                    {/* Vs previous */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${isSaving ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {isSaving ? <TrendingDown className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                        {isSaving ? `↓ ₹${diff} (${pctChange}%) vs last month` : `↑ ₹${Math.abs(diff)} vs last month`}
                    </div>

                    {/* Savings potential */}
                    <div className="mt-4 p-3 rounded-xl bg-teal-500/[0.07] border border-teal-500/20">
                        <div className="flex items-center gap-2">
                            <ChevronDown className="w-4 h-4 text-teal-400" />
                            <span className="text-xs text-teal-300 font-semibold">Savings Potential</span>
                        </div>
                        <p className="text-2xl font-extrabold text-teal-400 mt-1">₹{bp.savingsPotential}/mo</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Apply AI recommendations to unlock</p>
                    </div>

                    {/* Confidence */}
                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-700 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: `${bp.confidence}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                            />
                        </div>
                        <span className="text-xs font-bold text-teal-400">{bp.confidence}% confident</span>
                    </div>
                </div>

                {/* Right: Pie breakdown */}
                <div>
                    <p className="text-xs text-gray-400 font-semibold mb-2">Cost Breakdown</p>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={bp.breakdown}
                                    cx="50%" cy="50%"
                                    innerRadius={40} outerRadius={65}
                                    dataKey="amount"
                                    paddingAngle={3}
                                    stroke="none"
                                >
                                    {bp.breakdown.map((b, i) => (
                                        <Cell key={i} fill={b.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12, color: '#fff' }}
                                    formatter={(val: number, _n: string, entry: { payload: { category: string } }) => [`₹${val}`, entry.payload.category]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {bp.breakdown.map(b => (
                            <div key={b.category} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                                <span className="text-[10px] text-gray-400">{b.category} ({b.percentage}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
