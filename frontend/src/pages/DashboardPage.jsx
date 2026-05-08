// ─── EnerLuma — User Dashboard ────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    Zap,
    Droplets,
    LayoutDashboard,
    Plus,
    FileText,
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    LogOut,
    Trash2,
    ChevronDown,
    X,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    Leaf,
    Activity,
    Settings,
    Cpu,
    Menu,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import AutoSyncTab from "../components/dashboard/tabs/AutoSyncTab.jsx";
import OverviewTab from "../components/dashboard/tabs/OverviewTab.jsx";
import TopBar from "../components/dashboard/layout/TopBar.jsx";
import Sidebar from "../components/dashboard/layout/Sidebar.jsx";
import AlertsTab from "../components/dashboard/tabs/AlertsTab.jsx";
import AiInsightsTab from "../components/dashboard/tabs/AiInsightsTab.jsx";
import AnalyticsTab from "../components/dashboard/tabs/AnalyticsTab.jsx";
import SustainabilityTab from "../components/dashboard/tabs/SustainabilityTab.jsx";
import SettingsTab from "../components/dashboard/tabs/SettingsTab.jsx";
import {
    layout,
    cards,
    formStyles,
    uploadStyles,
    tableStyles,
    tabBar,
    chartStyles,
    colors,
} from "../components/dashboard/DashboardStyles";

const API_BASE = "/api";

function getToken() {
    return localStorage.getItem("enerluma_token");
}

async function apiFetch(url, opts = {}) {
    const token = getToken();
    const headers = { ...opts.headers };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (!(opts.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }
    const res = await fetch(`${API_BASE}${url}`, { ...opts, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Request failed");
    return data;
}

// Component definitions imported above.

// ─── Enter Usage Tab ──────────────────────────────────────────────────────────
function EnterUsageTab({ onEntryAdded }) {
    const [resource, setResource] = useState("energy");
    const [value, setValue] = useState("");
    const [unit, setUnit] = useState("kWh");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const units = resource === "energy" ? ["kWh", "MWh", "Wh"] : ["liters", "kiloliters", "cubic meters"];

    useEffect(() => {
        setUnit(resource === "energy" ? "kWh" : "liters");
    }, [resource]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value || parseFloat(value) <= 0) {
            setMessage({ type: "error", text: "Please enter a valid positive value." });
            return;
        }

        setLoading(true);
        setMessage(null);
        try {
            await apiFetch("/usage", {
                method: "POST",
                body: JSON.stringify({
                    resource,
                    value: parseFloat(value),
                    unit,
                    cost: cost ? parseFloat(cost) : 0,
                    date,
                }),
            });
            setMessage({ type: "success", text: "Usage entry saved successfully!" });
            setValue("");
            setCost("");
            onEntryAdded();
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={cards.section}>
            <div style={cards.sectionTitle}>
                <Plus size={20} style={{ color: colors.primaryMedium }} />
                Enter Usage Manually
            </div>

            {message && (
                <div style={message.type === "success" ? formStyles.successMsg : formStyles.errorMsg}>
                    {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <div style={formStyles.grid} className="dash-form-grid">
                    {/* Resource Type */}
                    <div style={formStyles.group}>
                        <label style={formStyles.label}>Resource Type</label>
                        <div style={{ position: "relative" }}>
                            <select
                                value={resource}
                                onChange={(e) => setResource(e.target.value)}
                                style={formStyles.select}
                            >
                                <option value="energy">⚡ Electricity</option>
                                <option value="water">💧 Water</option>
                            </select>
                            <ChevronDown
                                size={16}
                                style={{
                                    position: "absolute",
                                    right: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    color: colors.textMuted,
                                }}
                            />
                        </div>
                    </div>

                    {/* Value */}
                    <div style={formStyles.group}>
                        <label style={formStyles.label}>Usage Value</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder={resource === "energy" ? "e.g., 350" : "e.g., 1200"}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            style={formStyles.input}
                            required
                        />
                    </div>

                    {/* Unit */}
                    <div style={formStyles.group}>
                        <label style={formStyles.label}>Unit</label>
                        <div style={{ position: "relative" }}>
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                style={formStyles.select}
                            >
                                {units.map((u) => (
                                    <option key={u} value={u}>
                                        {u}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                size={16}
                                style={{
                                    position: "absolute",
                                    right: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    color: colors.textMuted,
                                }}
                            />
                        </div>
                    </div>

                    {/* Cost */}
                    <div style={formStyles.group}>
                        <label style={formStyles.label}>Cost (₹)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="e.g., 45.00"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            style={formStyles.input}
                        />
                    </div>

                    {/* Date */}
                    <div style={formStyles.group}>
                        <label style={formStyles.label}>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={formStyles.input}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...formStyles.submitBtn,
                            ...(loading ? formStyles.submitBtnDisabled : {}),
                        }}
                    >
                        {loading ? (
                            <>
                                <span
                                    style={{
                                        width: 16,
                                        height: 16,
                                        border: "2px solid rgba(255,255,255,0.3)",
                                        borderTop: "2px solid #fff",
                                        borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite",
                                        display: "inline-block",
                                    }}
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Plus size={16} />
                                Save Entry
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ─── Upload Bill Tab ──────────────────────────────────────────────────────────
function UploadBillTab({ onBillUploaded }) {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [resource, setResource] = useState("energy");
    const [provider, setProvider] = useState("");
    const [periodStart, setPeriodStart] = useState("");
    const [periodEnd, setPeriodEnd] = useState("");
    const [amount, setAmount] = useState("");
    const [unitsConsumed, setUnitsConsumed] = useState("");
    const [unit, setUnit] = useState("kWh");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setUnit(resource === "energy" ? "kWh" : "liters");
    }, [resource]);

    const handleFile = useCallback((f) => {
        if (!f) return;
        setFile(f);
        if (f.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (ev) => setPreview(ev.target.result);
            reader.readAsDataURL(f);
        } else {
            setPreview(null);
        }
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        },
        [handleFile]
    );

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    }, []);

    const removeFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage({ type: "error", text: "Please upload a bill file." });
            return;
        }

        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("bill", file);
        formData.append("resource", resource);
        formData.append("provider", provider);
        if (periodStart) formData.append("billingPeriodStart", periodStart);
        if (periodEnd) formData.append("billingPeriodEnd", periodEnd);
        if (amount) formData.append("amountDue", amount);
        if (unitsConsumed) formData.append("unitsConsumed", unitsConsumed);
        formData.append("unit", unit);
        formData.append("notes", notes);

        try {
            const token = getToken();
            const res = await fetch(`${API_BASE}/bills/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            setMessage({ type: "success", text: "Bill uploaded successfully!" });
            removeFile();
            setProvider("");
            setPeriodStart("");
            setPeriodEnd("");
            setAmount("");
            setUnitsConsumed("");
            setNotes("");
            onBillUploaded();
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    };

    return (
        <div style={cards.section}>
            <div style={cards.sectionTitle}>
                <Upload size={20} style={{ color: colors.primaryMedium }} />
                Upload Utility Bill
            </div>

            {message && (
                <div
                    style={{
                        ...(message.type === "success" ? formStyles.successMsg : formStyles.errorMsg),
                        marginBottom: 16,
                    }}
                >
                    {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Upload Zone */}
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        ...uploadStyles.zone,
                        ...(dragActive ? uploadStyles.zoneActive : {}),
                    }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        style={{ display: "none" }}
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    <div style={uploadStyles.zoneIcon}>
                        <Upload size={40} />
                    </div>
                    <div style={uploadStyles.zoneTitle}>
                        {dragActive ? "Drop your file here" : "Drag & drop your bill or click to browse"}
                    </div>
                    <div style={uploadStyles.zoneSub}>
                        Supports JPEG, PNG, WebP, and PDF (max 10 MB)
                    </div>
                </div>

                {/* File Preview */}
                {file && (
                    <div style={uploadStyles.preview}>
                        {preview ? (
                            <img src={preview} alt="Bill preview" style={uploadStyles.previewImg} />
                        ) : (
                            <div
                                style={{
                                    ...uploadStyles.previewImg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "rgba(15,106,102,0.06)",
                                    color: colors.primaryMedium,
                                }}
                            >
                                <FileText size={28} />
                            </div>
                        )}
                        <div style={uploadStyles.previewInfo}>
                            <div style={uploadStyles.previewName}>{file.name}</div>
                            <div style={uploadStyles.previewSize}>{formatSize(file.size)}</div>
                        </div>
                        <button type="button" onClick={removeFile} style={uploadStyles.removeBtn}>
                            <X size={12} /> Remove
                        </button>
                    </div>
                )}

                {/* Bill Details Form */}
                <div style={{ marginTop: 24 }}>
                    <div
                        style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: colors.text,
                            marginBottom: 16,
                        }}
                    >
                        Bill Details
                    </div>
                    <div style={formStyles.grid} className="dash-form-grid">
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Resource Type</label>
                            <div style={{ position: "relative" }}>
                                <select
                                    value={resource}
                                    onChange={(e) => setResource(e.target.value)}
                                    style={formStyles.select}
                                >
                                    <option value="energy">⚡ Electricity</option>
                                    <option value="water">💧 Water</option>
                                </select>
                                <ChevronDown
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        right: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        pointerEvents: "none",
                                        color: colors.textMuted,
                                    }}
                                />
                            </div>
                        </div>

                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Provider / Utility Company</label>
                            <input
                                type="text"
                                placeholder="e.g., City Power Co."
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                style={formStyles.input}
                            />
                        </div>

                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Billing Period Start</label>
                            <input
                                type="date"
                                value={periodStart}
                                onChange={(e) => setPeriodStart(e.target.value)}
                                style={formStyles.input}
                            />
                        </div>

                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Billing Period End</label>
                            <input
                                type="date"
                                value={periodEnd}
                                onChange={(e) => setPeriodEnd(e.target.value)}
                                style={formStyles.input}
                            />
                        </div>

                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Amount Due (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="e.g., 85.50"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={formStyles.input}
                            />
                        </div>

                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Units Consumed</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder={resource === "energy" ? "e.g., 450" : "e.g., 3000"}
                                value={unitsConsumed}
                                onChange={(e) => setUnitsConsumed(e.target.value)}
                                style={formStyles.input}
                            />
                        </div>

                        <div style={{ ...formStyles.group, gridColumn: "1 / -1" }}>
                            <label style={formStyles.label}>Notes</label>
                            <textarea
                                placeholder="Any additional notes about this bill..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                style={{
                                    ...formStyles.input,
                                    resize: "vertical",
                                    minHeight: 80,
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                        <button
                            type="submit"
                            disabled={loading || !file}
                            style={{
                                ...formStyles.submitBtn,
                                ...(loading || !file ? formStyles.submitBtnDisabled : {}),
                            }}
                        >
                            {loading ? (
                                <>
                                    <span
                                        style={{
                                            width: 16,
                                            height: 16,
                                            border: "2px solid rgba(255,255,255,0.3)",
                                            borderTop: "2px solid #fff",
                                            borderRadius: "50%",
                                            animation: "spin 0.8s linear infinite",
                                            display: "inline-block",
                                        }}
                                    />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Upload Bill
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// ─── History Tab ──────────────────────────────────────────────────────────────
function HistoryTab({ usageEntries, bills, onDeleteEntry, onRefresh }) {
    const [filter, setFilter] = useState("all");
    const [activeSubTab, setActiveSubTab] = useState("usage");

    const filteredUsage =
        filter === "all"
            ? usageEntries
            : usageEntries.filter((e) => e.resource === filter);

    const filteredBills =
        filter === "all"
            ? bills
            : bills.filter((b) => b.resource === filter);

    // Chart data for bar chart
    const barData = filteredUsage
        .sort((a, b) => new Date(a.bucketStart) - new Date(b.bucketStart))
        .slice(-10)
        .map((e) => ({
            date: new Date(e.bucketStart).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
            }),
            value: e.value,
            cost: e.cost || 0,
        }));

    const subTabStyle = (active) => ({
        padding: "8px 20px",
        borderRadius: 8,
        border: "none",
        background: active ? colors.primary : "transparent",
        color: active ? "#fff" : colors.textSecondary,
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
    });

    return (
        <>
            {/* Filter + Sub-tabs */}
            <div style={cards.section}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setActiveSubTab("usage")} style={subTabStyle(activeSubTab === "usage")}>
                            Usage Entries
                        </button>
                        <button onClick={() => setActiveSubTab("bills")} style={subTabStyle(activeSubTab === "bills")}>
                            Uploaded Bills
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                        {["all", "energy", "water"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: 20,
                                    border: `1px solid ${filter === f ? colors.primary : colors.border}`,
                                    background: filter === f ? colors.primaryBg : "transparent",
                                    color: filter === f ? colors.primary : colors.textMuted,
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    textTransform: "capitalize",
                                    transition: "all 0.2s",
                                }}
                            >
                                {f === "all" ? "All" : f === "energy" ? "⚡ Electricity" : "💧 Water"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            {activeSubTab === "usage" && barData.length > 0 && (
                <div style={cards.section}>
                    <div style={cards.sectionTitle}>
                        <BarChart3 size={20} style={{ color: colors.primaryMedium }} />
                        Usage Distribution
                    </div>
                    <div style={chartStyles.wrapper}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: colors.textMuted }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: colors.textMuted }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(255,255,255,0.95)",
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: 10,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                        fontSize: "0.85rem",
                                    }}
                                />
                                <Bar dataKey="value" fill="#32C7C5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Usage Table */}
            {activeSubTab === "usage" && (
                <div style={cards.section}>
                    <div style={cards.sectionTitle}>
                        <History size={20} style={{ color: colors.primaryMedium }} />
                        All Usage Entries
                    </div>
                    {filteredUsage.length > 0 ? (
                        <div style={tableStyles.wrapper}>
                            <table style={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th style={tableStyles.th}>Type</th>
                                        <th style={tableStyles.th}>Value</th>
                                        <th style={tableStyles.th}>Unit</th>
                                        <th style={tableStyles.th}>Cost</th>
                                        <th style={tableStyles.th}>Date</th>
                                        <th style={tableStyles.th}>Source</th>
                                        <th style={tableStyles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsage.map((entry) => (
                                        <tr key={entry._id}>
                                            <td style={tableStyles.td}>
                                                <span style={tableStyles.badge(entry.resource)}>
                                                    {entry.resource === "energy" ? (
                                                        <Zap size={12} />
                                                    ) : (
                                                        <Droplets size={12} />
                                                    )}
                                                    {entry.resource}
                                                </span>
                                            </td>
                                            <td style={{ ...tableStyles.td, fontWeight: 600 }}>
                                                {entry.value}
                                            </td>
                                            <td style={tableStyles.td}>{entry.unit}</td>
                                            <td style={tableStyles.td}>
                                                ₹{(entry.cost || 0).toFixed(2)}
                                            </td>
                                            <td style={tableStyles.td}>
                                                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                                    <Calendar size={12} style={{ color: colors.textMuted }} />
                                                    {new Date(entry.bucketStart).toLocaleDateString("en-IN")}
                                                </span>
                                            </td>
                                            <td style={tableStyles.td}>
                                                <span
                                                    style={{
                                                        fontSize: "0.72rem",
                                                        padding: "3px 8px",
                                                        borderRadius: 6,
                                                        background: "rgba(15,106,102,0.06)",
                                                        color: colors.primary,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {entry.metadata?.source || "manual"}
                                                </span>
                                            </td>
                                            <td style={tableStyles.td}>
                                                <button
                                                    onClick={() => onDeleteEntry(entry._id)}
                                                    style={tableStyles.deleteBtn}
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={tableStyles.empty}>
                            <Plus size={24} style={{ marginBottom: 8, opacity: 0.3 }} />
                            <p>No usage entries found. Start adding your data!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Bills Table */}
            {activeSubTab === "bills" && (
                <div style={cards.section}>
                    <div style={cards.sectionTitle}>
                        <FileText size={20} style={{ color: colors.primaryMedium }} />
                        Uploaded Bills
                    </div>
                    {filteredBills.length > 0 ? (
                        <div style={tableStyles.wrapper}>
                            <table style={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th style={tableStyles.th}>Type</th>
                                        <th style={tableStyles.th}>Provider</th>
                                        <th style={tableStyles.th}>Period</th>
                                        <th style={tableStyles.th}>Amount</th>
                                        <th style={tableStyles.th}>Units</th>
                                        <th style={tableStyles.th}>File</th>
                                        <th style={tableStyles.th}>Uploaded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBills.map((bill) => (
                                        <tr key={bill._id}>
                                            <td style={tableStyles.td}>
                                                <span style={tableStyles.badge(bill.resource)}>
                                                    {bill.resource === "energy" ? (
                                                        <Zap size={12} />
                                                    ) : (
                                                        <Droplets size={12} />
                                                    )}
                                                    {bill.resource}
                                                </span>
                                            </td>
                                            <td style={tableStyles.td}>{bill.provider || "—"}</td>
                                            <td style={tableStyles.td}>
                                                {bill.billingPeriodStart
                                                    ? `${new Date(bill.billingPeriodStart).toLocaleDateString("en-IN")} – ${new Date(bill.billingPeriodEnd).toLocaleDateString("en-IN")}`
                                                    : "—"}
                                            </td>
                                            <td style={{ ...tableStyles.td, fontWeight: 600 }}>
                                                ₹{(bill.amountDue || 0).toFixed(2)}
                                            </td>
                                            <td style={tableStyles.td}>
                                                {bill.unitsConsumed
                                                    ? `${bill.unitsConsumed} ${bill.unit}`
                                                    : "—"}
                                            </td>
                                            <td style={tableStyles.td}>
                                                <a
                                                    href={bill.filePath ? `/api/uploads/${bill.filePath.split(/[\\/]/).pop()}` : "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: colors.primary,
                                                        fontSize: "0.78rem",
                                                        fontWeight: 600,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <FileText size={12} />
                                                    View
                                                </a>
                                            </td>
                                            <td style={tableStyles.td}>
                                                {new Date(bill.createdAt).toLocaleDateString("en-IN")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={tableStyles.empty}>
                            <Upload size={24} style={{ marginBottom: 8, opacity: 0.3 }} />
                            <p>No bills uploaded yet.</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [usageEntries, setUsageEntries] = useState([]);
    const [bills, setBills] = useState([]);
    const [integrations, setIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const [usageRes, billsRes, meRes, intRes] = await Promise.all([
                apiFetch("/usage?limit=100").catch(() => ({ entries: [] })),
                apiFetch("/bills?limit=50").catch(() => ({ bills: [] })),
                apiFetch("/auth/me").catch(() => ({ user: {} })),
                apiFetch("/integrations").catch(() => ({ integrations: [] }))
            ]);
            setUsageEntries(usageRes.entries || []);
            setBills(billsRes.bills || []);
            setIntegrations(intRes.integrations || []);
            setUserName(meRes.user?.name || meRes.user?.email || "User");
            setUserId(meRes.user?._id || meRes.user?.id || "");
        } catch (err) {
            console.error("Failed to load dashboard data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }
        fetchData();
    }, [navigate, fetchData]);

    const handleLogout = () => {
        localStorage.removeItem("enerluma_token");
        navigate("/login");
    };

    const handleDeleteEntry = async (id) => {
        try {
            await apiFetch(`/usage/${id}`, { method: "DELETE" });
            setUsageEntries((prev) => prev.filter((e) => e._id !== id));
        } catch (err) {
            alert("Failed to delete: " + err.message);
        }
    };

    const tabTitles = {
        overview: { title: "Dashboard Overview", subtitle: `Welcome back, ${userName}` },
        energy: { title: "Energy Auto-Sync", subtitle: "Connect Indian Utility accounts for automatic electricity data synchronization" },
        water: { title: "Water Auto-Sync", subtitle: "Connect Indian Utility accounts for automatic water data synchronization" },
        alerts: { title: "Monitoring Alerts", subtitle: "Set thresholds and monitor unusual consumption" },
        analytics: { title: "Analytics Dashboard", subtitle: "Deep visibility into usage trends, categories, and optimization opportunities" },
        ai: { title: "AI Energy Insights", subtitle: "Predictive analytics and optimization recommendations" },
        sustainability: { title: "Environmental Impact", subtitle: "Track your carbon footprint and eco-score metrics" },
        settings: { title: "Account Settings", subtitle: "Manage your profile, preferences, and security" },
    };

    const current = tabTitles[activeTab];
    const hidePageHeader = activeTab === "ai" || activeTab === "analytics";

    const navGroups = [
        {
            title: "MAIN",
            items: [
                { id: "overview", label: "Dashboard", icon: LayoutDashboard },
                { id: "energy", label: "Energy", icon: Zap },
                { id: "water", label: "Water", icon: Droplets },
            ]
        },
        {
            title: "MONITORING",
            items: [
                { id: "alerts", label: "Alerts", icon: AlertCircle },
                { id: "analytics", label: "Analytics", icon: BarChart3 },
                { id: "ai", label: "AI Insights", icon: Cpu },
                { id: "sustainability", label: "Sustainability", icon: Leaf },
            ]
        },
        {
            title: "SYSTEM",
            items: [
                { id: "settings", label: "Settings", icon: Settings },
            ]
        }
    ];

    if (loading) {
        return (
            <div
                style={{
                    ...layout.page,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            border: `3px solid ${colors.border}`,
                            borderTop: `3px solid ${colors.primary}`,
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 16px",
                        }}
                    />
                    <div style={{ color: colors.textMuted, fontSize: "0.85rem", fontWeight: 500 }}>
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={layout.page} className="dash-page">
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }

                * { box-sizing: border-box; }
                
                .dash-mobile-btn { display: none; }
                @media (max-width: 900px) {
                    .dash-sidebar { display: none !important; }
                    .dash-sidebar.mobile-open { display: flex !important; position: fixed !important; top: 0; left: 0; height: 100vh; z-index: 1000; animation: slideInLeft 0.25s ease; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
                    .dash-mobile-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 999; backdrop-filter: blur(2px); }
                    .dash-content { margin-left: 0 !important; width: 100% !important; }
                    .dash-main { padding: 20px 16px !important; }
                    .dash-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .dash-mobile-btn { display: flex !important; }
                }
                @media (max-width: 600px) {
                    .dash-stat-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="dash-mobile-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            <Sidebar
                navGroups={navGroups}
                activeTab={activeTab}
                onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                onLogout={handleLogout}
                className={sidebarOpen ? "mobile-open" : ""}
            />

            <div style={layout.contentArea} className="dash-content">
                <TopBar
                    userName={userName}
                    onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                    onLogout={handleLogout}
                />

                <main style={layout.mainContent} className="dash-main">
                    {!hidePageHeader && (
                        <div style={{ ...layout.pageHeader, animation: "fadeInUp 0.3s ease both" }}>
                            <div style={layout.pageTitleBox}>
                                <h1 style={layout.pageTitle}>{current?.title || "Dashboard"}</h1>
                                <p style={layout.pageSubtitle}>{current?.subtitle || "Overview"}</p>
                            </div>
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.1)", color: colors.success, padding: "6px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
                                    <div style={{ width: 6, height: 6, background: colors.success, borderRadius: "50%" }}></div> 
                                    Live
                                </div>
                                <div style={{ 
                                    display: "flex", alignItems: "center", gap: 6, 
                                    padding: "6px 12px", borderRadius: 8, border: `1px solid ${colors.border}`, 
                                    background: colors.white, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer"
                                }}>
                                    Today <ChevronDown size={14} color={colors.textMuted} />
                                </div>
                            </div>
                        </div>
                    )}

                <div style={{ animation: hidePageHeader ? "none" : "fadeInUp 0.5s ease 0.1s both" }}>
                    {activeTab === "settings" && (
                        <SettingsTab userName={userName} userEmail="" />
                    )}
                    {["energy", "water"].includes(activeTab) && (
                        <AutoSyncTab
                            integrations={integrations}
                            onLinked={fetchData}
                            onSync={fetchData}
                            apiFetch={apiFetch}
                            resourceType={activeTab}
                            onUnlinked={fetchData}
                        />
                    )}
                    {integrations.length === 0 && ["overview", "alerts", "analytics", "ai", "sustainability"].includes(activeTab) ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center", background: colors.white, borderRadius: 24, border: `1px solid ${colors.border}` }}>
                            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(32,178,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                                <Activity size={32} color={colors.primary} />
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: colors.text, marginBottom: 12 }}>Welcome to your Dashboard!</h3>
                            <p style={{ fontSize: "1rem", color: colors.textSecondary, maxWidth: 400, lineHeight: 1.6, marginBottom: 32 }}>
                                To see your personalized insights and data, you need to link your utility accounts first.
                            </p>
                            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                                <button
                                    onClick={() => setActiveTab("energy")}
                                    style={{ ...formStyles.submitBtn, fontSize: "0.9rem" }}
                                >
                                    <Zap size={16} /> Link Energy Account
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeTab === "overview" && (
                                <OverviewTab usageEntries={usageEntries} bills={bills} integrations={integrations} userId={userId} />
                            )}
                            {activeTab === "alerts" && (
                                <AlertsTab usageEntries={usageEntries} />
                            )}
                            {activeTab === "analytics" && (
                                <AnalyticsTab usageEntries={usageEntries} bills={bills} integrations={integrations} userId={userId} />
                            )}
                            {activeTab === "ai" && (
                                <AiInsightsTab />
                            )}
                            {activeTab === "sustainability" && (
                                <SustainabilityTab />
                            )}
                        </>
                    )}
                </div>
                </main>
            </div>
        </div>
    );
}
