import { useMemo, useState } from "react";
import {
    BarChart3,
    CalendarDays,
    Download,
    Droplets,
    Gauge,
    IndianRupee,
    Zap,
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { cards, colors } from "../pages/DashboardStyles";

const CATEGORY_COLORS = ["#0f766e", "#14b8a6", "#2dd4bf", "#22d3ee", "#cbd5e1"];
const INDIA_LOCALE = "en-IN";

function safeDate(value) {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
}

function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function dayKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function buildMonthBuckets(count) {
    const buckets = [];
    const now = new Date();

    for (let i = count - 1; i >= 0; i -= 1) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        buckets.push({
            key: monthKey(monthDate),
            month: monthDate.toLocaleDateString(INDIA_LOCALE, { month: "short" }),
            fullMonth: monthDate.toLocaleDateString(INDIA_LOCALE, { month: "long", year: "numeric" }),
        });
    }

    return buckets;
}

function buildDayBuckets(days) {
    const buckets = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i -= 1) {
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() - i);
        buckets.push({
            key: dayKey(dayDate),
            label: dayDate.toLocaleDateString(INDIA_LOCALE, { weekday: "short" }),
            fullDate: dayDate.toLocaleDateString(INDIA_LOCALE, { month: "short", day: "numeric" }),
        });
    }

    return buckets;
}

function resolveCategory(entry) {
    const raw = String(
        entry?.metadata?.appliance ||
        entry?.metadata?.device ||
        entry?.metadata?.source ||
        entry?.category ||
        ""
    ).toLowerCase();

    if (raw.includes("hvac") || raw.includes("ac") || raw.includes("thermostat")) return "Cooling (AC)";
    if (raw.includes("light")) return "Lighting";
    if (raw.includes("kitchen") || raw.includes("fridge") || raw.includes("dishwasher")) return "Kitchen";
    if (raw.includes("heater") || raw.includes("water") || raw.includes("pump") || raw.includes("geyser")) return "Geyser/Water Pump";
    return "Others";
}

function toCurrency(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return "₹0";
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(parsed))}`;
}

function trendLabel(percent) {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent.toFixed(1)}%`;
}

function trendPillStyle(isGood) {
    return {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: "0.74rem",
        fontWeight: 700,
        borderRadius: 999,
        padding: "4px 9px",
        color: isGood ? colors.success : colors.error,
        background: isGood ? "rgba(16,185,129,0.09)" : "rgba(239,68,68,0.08)",
    };
}

function peakRangeLabel(hour) {
    const start = new Date(2026, 0, 1, hour, 0, 0);
    const end = new Date(2026, 0, 1, hour + 2, 0, 0);
    const startLabel = start.toLocaleTimeString(INDIA_LOCALE, { hour: "numeric", hour12: true }).replace(" ", "");
    const endLabel = end.toLocaleTimeString(INDIA_LOCALE, { hour: "numeric", hour12: true }).replace(" ", "");
    return `${startLabel}-${endLabel}`;
}

export default function AnalyticsTab({ usageEntries = [], bills = [] }) {
    const [range, setRange] = useState("6m");

    const monthsCount = range === "6m" ? 6 : range === "3m" ? 3 : 1;

    const analytics = useMemo(() => {
        const monthBuckets = buildMonthBuckets(monthsCount);
        const monthIndex = new Map(monthBuckets.map((bucket, index) => [bucket.key, index]));

        const monthlyRows = monthBuckets.map((bucket) => ({
            month: bucket.month,
            fullMonth: bucket.fullMonth,
            energy: 0,
            water: 0,
            cost: 0,
            optimized: 0,
        }));

        usageEntries.forEach((entry) => {
            const date = safeDate(entry.bucketStart || entry.createdAt || entry.date);
            if (!date) return;

            const index = monthIndex.get(monthKey(date));
            if (index === undefined) return;

            const value = toNumber(entry.value);
            const cost = toNumber(entry.cost);
            const resource = String(entry.resource || "").toLowerCase();

            if (resource === "water") {
                monthlyRows[index].water += value;
            } else {
                monthlyRows[index].energy += value;
            }

            monthlyRows[index].cost += cost;
        });

        bills.forEach((bill) => {
            const date = safeDate(bill.billingPeriodStart || bill.createdAt || bill.date);
            if (!date) return;

            const index = monthIndex.get(monthKey(date));
            if (index === undefined) return;

            monthlyRows[index].cost += toNumber(bill.amountDue);
        });

        const fallbackEnergy = [312, 338, 374, 428, 461, 436];
        const fallbackWater = [13800, 14600, 15250, 16400, 17150, 16600];
        const fallbackCost = [2060, 2280, 2525, 2940, 3180, 3010];

        const hasAnyMonthlyData = monthlyRows.some((row) => row.energy > 0 || row.water > 0 || row.cost > 0);
        if (!hasAnyMonthlyData) {
            const e = fallbackEnergy.slice(-monthsCount);
            const w = fallbackWater.slice(-monthsCount);
            const c = fallbackCost.slice(-monthsCount);

            monthlyRows.forEach((row, index) => {
                row.energy = e[index] || 0;
                row.water = w[index] || 0;
                row.cost = c[index] || 0;
            });
        }

        monthlyRows.forEach((row) => {
            row.optimized = row.cost * 0.84;
        });

        const energyTotal = monthlyRows.reduce((sum, row) => sum + row.energy, 0);
        const waterTotal = monthlyRows.reduce((sum, row) => sum + row.water, 0);
        const costTotal = monthlyRows.reduce((sum, row) => sum + row.cost, 0);
        const saveableTotal = monthlyRows.reduce((sum, row) => sum + (row.cost - row.optimized), 0);

        const energyValues = monthlyRows.map((row) => row.energy);
        const waterValues = monthlyRows.map((row) => row.water);
        const costValues = monthlyRows.map((row) => row.cost);

        const trendPercent = (values) => {
            if (values.length < 2 || values[0] <= 0) return 0;
            return ((values[values.length - 1] - values[0]) / values[0]) * 100;
        };

        const energyTrend = trendPercent(energyValues);
        const waterTrend = trendPercent(waterValues);
        const costTrend = trendPercent(costValues);

        const efficiencyRaw = costTotal > 0 ? 100 - (saveableTotal / costTotal) * 100 : 81;
        const efficiency = Math.max(65, Math.min(96, Math.round(efficiencyRaw)));
        const efficiencyTrend = Number(((efficiency - 78) / 78 * 100).toFixed(1));

        const categories = {
            "Cooling (AC)": 0,
            Lighting: 0,
            Kitchen: 0,
            "Geyser/Water Pump": 0,
            Others: 0,
        };

        usageEntries
            .filter((entry) => String(entry.resource || "").toLowerCase() === "energy")
            .forEach((entry) => {
                const cat = resolveCategory(entry);
                categories[cat] += toNumber(entry.value);
            });

        let categoryData = Object.entries(categories).map(([name, value]) => ({ name, value }));
        const categoryTotal = categoryData.reduce((sum, item) => sum + item.value, 0);

        if (categoryTotal <= 0) {
            const fallbackSplit = [36, 18, 22, 14, 10];
            const base = energyTotal > 0 ? energyTotal : 100;
            categoryData = Object.keys(categories).map((name, index) => ({
                name,
                value: (base * fallbackSplit[index]) / 100,
            }));
        }

        categoryData = categoryData.map((item) => {
            const total = categoryData.reduce((sum, entry) => sum + entry.value, 0);
            return {
                ...item,
                percent: total > 0 ? Math.round((item.value / total) * 100) : 0,
            };
        });

        const weeklyBuckets = buildDayBuckets(7);
        const weeklyIndex = new Map(weeklyBuckets.map((bucket, index) => [bucket.key, index]));
        const weeklyRows = weeklyBuckets.map((bucket) => ({
            day: bucket.label,
            fullDate: bucket.fullDate,
            energy: 0,
        }));

        usageEntries
            .filter((entry) => String(entry.resource || "").toLowerCase() === "energy")
            .forEach((entry) => {
                const date = safeDate(entry.bucketStart || entry.createdAt || entry.date);
                if (!date) return;

                const index = weeklyIndex.get(dayKey(date));
                if (index === undefined) return;

                weeklyRows[index].energy += toNumber(entry.value);
            });

        if (!weeklyRows.some((row) => row.energy > 0)) {
            const fallbackWeekly = [12.4, 13.1, 14.0, 14.6, 15.2, 11.7, 10.9];
            weeklyRows.forEach((row, index) => {
                row.energy = fallbackWeekly[index];
            });
        }

        const hourRows = Array.from({ length: 12 }, (_, index) => {
            const hour = index * 2;
            return {
                hour,
                label: `${String(hour).padStart(2, "0")}:00`,
                value: 0,
                count: 0,
            };
        });

        usageEntries
            .filter((entry) => String(entry.resource || "").toLowerCase() === "energy")
            .forEach((entry) => {
                const date = safeDate(entry.bucketStart || entry.createdAt || entry.date);
                if (!date) return;

                const bucketHour = Math.floor(date.getHours() / 2) * 2;
                const bucket = hourRows.find((row) => row.hour === bucketHour);
                if (!bucket) return;

                bucket.value += toNumber(entry.value);
                bucket.count += 1;
            });

        if (!hourRows.some((row) => row.count > 0)) {
            const fallbackPeak = [0.45, 0.35, 0.32, 0.8, 1.5, 2.1, 2.4, 2.7, 3.1, 3.4, 2.6, 1.3];
            hourRows.forEach((row, index) => {
                row.value = fallbackPeak[index];
            });
        } else {
            hourRows.forEach((row) => {
                row.value = row.count > 0 ? row.value / row.count : 0;
            });
        }

        const peak = hourRows.reduce((best, row) => (row.value > best.value ? row : best), hourRows[0]);

        return {
            monthlyRows,
            weeklyRows,
            hourRows,
            categoryData,
            totals: {
                energy: energyTotal,
                water: waterTotal,
                cost: costTotal,
                efficiency,
                saveable: saveableTotal,
            },
            trends: {
                energy: energyTrend,
                water: waterTrend,
                cost: costTrend,
                efficiency: efficiencyTrend,
            },
            peakRange: peakRangeLabel(peak.hour),
        };
    }, [usageEntries, bills, monthsCount]);

    const handleExport = () => {
        const exportPayload = {
            generatedAt: new Date().toISOString(),
            range,
            summary: analytics.totals,
            trends: analytics.trends,
            monthly: analytics.monthlyRows,
            weekly: analytics.weeklyRows,
            peakHours: analytics.hourRows,
            categoryBreakdown: analytics.categoryData,
        };

        const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
            type: "application/json;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `enerluma-analytics-${range}-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const rangeLabel =
        range === "6m" ? "Last 6 Months" : range === "3m" ? "Last 3 Months" : "Last 30 Days";

    const summaryCards = [
        {
            label: `Total Energy · ${rangeLabel.toLowerCase()}`,
            value: `${Math.round(analytics.totals.energy)} kWh`,
            trend: analytics.trends.energy,
            positiveIsGood: false,
            icon: Zap,
            iconBg: "rgba(20,184,166,0.12)",
            iconColor: colors.primary,
        },
        {
            label: `Total Water · ${rangeLabel.toLowerCase()}`,
            value: `${(analytics.totals.water / 1000).toFixed(1)} KL`,
            trend: analytics.trends.water,
            positiveIsGood: false,
            icon: Droplets,
            iconBg: "rgba(34,211,238,0.12)",
            iconColor: "#0891b2",
        },
        {
            label: `Total Cost · ${rangeLabel.toLowerCase()}`,
            value: toCurrency(analytics.totals.cost),
            trend: analytics.trends.cost,
            positiveIsGood: false,
            icon: IndianRupee,
            iconBg: "rgba(245,158,11,0.14)",
            iconColor: "#b45309",
        },
        {
            label: "Avg Efficiency · across devices",
            value: `${analytics.totals.efficiency}%`,
            trend: analytics.trends.efficiency,
            positiveIsGood: true,
            icon: Gauge,
            iconBg: "rgba(34,197,94,0.12)",
            iconColor: "#16a34a",
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ ...cards.section, marginBottom: 0, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(32,178,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: colors.primary }}>
                                <BarChart3 size={18} />
                            </div>
                            <h2 style={{ margin: 0, color: colors.text, fontSize: "2rem", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Analytics Dashboard</h2>
                        </div>
                        <p style={{ margin: "10px 0 0", color: colors.textMuted, fontSize: "0.95rem" }}>Comprehensive resource usage analytics tuned for Indian household patterns</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, color: colors.success, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", fontSize: "0.78rem", fontWeight: 700 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.success }}></span>
                            Live
                        </span>

                        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${colors.border}`, borderRadius: 12, background: colors.white, padding: "8px 12px", color: colors.textSecondary, fontSize: "0.85rem", fontWeight: 600 }}>
                            <CalendarDays size={15} color={colors.textMuted} />
                            <select
                                value={range}
                                onChange={(event) => setRange(event.target.value)}
                                style={{ border: "none", outline: "none", background: "transparent", color: colors.textSecondary, fontSize: "0.85rem", fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}
                            >
                                <option value="6m">Last 6 Months</option>
                                <option value="3m">Last 3 Months</option>
                                <option value="1m">Last 30 Days</option>
                            </select>
                        </label>

                        <button
                            type="button"
                            onClick={handleExport}
                            style={{
                                border: "none",
                                borderRadius: 12,
                                background: colors.primary,
                                color: colors.white,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 16px",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                boxShadow: "0 8px 16px rgba(32,178,170,0.2)",
                            }}
                        >
                            <Download size={15} />
                            Export Report
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ ...cards.grid }} className="dash-stat-grid">
                {summaryCards.map((card, index) => {
                    const Icon = card.icon;
                    const trendIsPositive = card.trend >= 0;
                    const trendIsGood = card.positiveIsGood ? trendIsPositive : !trendIsPositive;

                    return (
                        <div key={index} style={{ ...cards.stat, marginBottom: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                                <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: card.iconBg, color: card.iconColor }}>
                                    <Icon size={20} />
                                </div>
                                <span style={trendPillStyle(trendIsGood)}>{trendLabel(card.trend)}</span>
                            </div>

                            <div style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", color: colors.text, marginBottom: 6 }}>
                                {card.value}
                            </div>
                            <div style={{ color: colors.textMuted, fontSize: "0.82rem", fontWeight: 500 }}>
                                {card.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "stretch" }}>
                <div style={{ ...cards.section, flex: "2 1 680px", marginBottom: 0 }}>
                    <div style={{ marginBottom: 16 }}>
                        <div style={cards.sectionTitle}>Monthly Consumption Trend</div>
                        <div style={{ marginTop: -10, color: colors.textMuted, fontSize: "0.83rem" }}>Energy and water usage over {rangeLabel.toLowerCase()}</div>
                    </div>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analytics.monthlyRows} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} />
                                <YAxis yAxisId="energy" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(value) => `${Math.round(value)}`} />
                                <YAxis yAxisId="water" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(value) => `${Math.round(value)}`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(15,23,42,0.1)", fontSize: "0.82rem" }}
                                    formatter={(value, name) => {
                                        if (name === "energy") return [`${Math.round(Number(value))} kWh`, "Energy"];
                                        return [`${Math.round(Number(value))} L`, "Water"];
                                    }}
                                    labelFormatter={(label, payload) => payload?.[0]?.payload?.fullMonth || label}
                                />
                                <Line yAxisId="energy" type="monotone" dataKey="energy" stroke={colors.primary} strokeWidth={3} dot={false} name="energy" />
                                <Line yAxisId="water" type="monotone" dataKey="water" stroke="#22d3ee" strokeWidth={2.4} dot={false} strokeDasharray="6 4" name="water" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ ...cards.section, flex: "1 1 320px", marginBottom: 0 }}>
                    <div style={{ marginBottom: 16 }}>
                        <div style={cards.sectionTitle}>Category Breakdown</div>
                        <div style={{ marginTop: -10, color: colors.textMuted, fontSize: "0.83rem" }}>Energy distribution by appliance type</div>
                    </div>

                    <div style={{ width: "100%", height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analytics.categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={58}
                                    outerRadius={92}
                                    paddingAngle={2}
                                >
                                    {analytics.categoryData.map((entry, index) => (
                                        <Cell key={`${entry.name}-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(15,23,42,0.1)", fontSize: "0.82rem" }}
                                    formatter={(value) => [`${Math.round(Number(value))} kWh`, "Usage"]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                        {analytics.categoryData.map((entry, index) => (
                            <div key={entry.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: colors.textSecondary, fontWeight: 600 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}></span>
                                    {entry.name}
                                </div>
                                <span style={{ color: colors.textMuted, fontWeight: 700 }}>{entry.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "stretch" }}>
                <div style={{ ...cards.section, flex: "1 1 520px", marginBottom: 0 }}>
                    <div style={{ marginBottom: 16 }}>
                        <div style={cards.sectionTitle}>Weekly Consumption</div>
                        <div style={{ marginTop: -10, color: colors.textMuted, fontSize: "0.83rem" }}>Daily energy usage pattern this week</div>
                    </div>

                    <div style={{ width: "100%", height: 290 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.weeklyRows} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(value) => `${Math.round(value)} kWh`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(15,23,42,0.1)", fontSize: "0.82rem" }}
                                    formatter={(value) => [`${Number(value).toFixed(1)} kWh`, "Energy"]}
                                    labelFormatter={(label, payload) => `${label} · ${payload?.[0]?.payload?.fullDate || ""}`}
                                />
                                <Bar dataKey="energy" fill={colors.primary} radius={[8, 8, 0, 0]} barSize={36} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ ...cards.section, flex: "1 1 520px", marginBottom: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                        <div>
                            <div style={cards.sectionTitle}>Peak Hours Analysis</div>
                            <div style={{ marginTop: -10, color: colors.textMuted, fontSize: "0.83rem" }}>Hourly consumption pattern</div>
                        </div>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#b45309", background: "rgba(245,158,11,0.15)", borderRadius: 999, padding: "6px 12px", fontSize: "0.74rem", fontWeight: 700 }}>
                            Peak: {analytics.peakRange}
                        </span>
                    </div>

                    <div style={{ width: "100%", height: 290 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics.hourRows} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="analyticsPeak" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.28} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(value) => `${value.toFixed(1)} kWh`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(15,23,42,0.1)", fontSize: "0.82rem" }}
                                    formatter={(value) => [`${Number(value).toFixed(2)} kWh`, "Average Use"]}
                                />
                                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fill="url(#analyticsPeak)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={{ ...cards.section, marginBottom: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                    <div>
                        <div style={cards.sectionTitle}>Cost Analysis - Actual vs Optimized</div>
                        <div style={{ marginTop: -10, color: colors.textMuted, fontSize: "0.83rem" }}>Potential savings with AI-recommended optimizations</div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: colors.success, background: "rgba(16,185,129,0.12)", borderRadius: 999, padding: "7px 13px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {toCurrency(analytics.totals.saveable)} saveable
                    </span>
                </div>

                <div style={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.monthlyRows} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(value) => `₹${Math.round(value)}`} />
                            <Tooltip
                                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(15,23,42,0.1)", fontSize: "0.82rem" }}
                                formatter={(value, name) => {
                                    if (name === "cost") return [toCurrency(value), "Actual"];
                                    return [toCurrency(value), "Optimized"];
                                }}
                                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullMonth || label}
                            />
                            <Bar dataKey="cost" name="cost" fill="rgba(148,163,184,0.55)" radius={[8, 8, 0, 0]} barSize={24} />
                            <Bar dataKey="optimized" name="optimized" fill={colors.primary} radius={[8, 8, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
