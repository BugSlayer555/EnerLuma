// ─── EnerLuma Auth — Shared Components ───────────────────────────────────────
import { dashboard, branding, social } from "./Authstyles";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
export const EyeOpen = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const EyeClosed = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0f6a66" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export const DropIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0f6a66" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 2C12 2 5 12 5 16a7 7 0 0014 0c0-4-7-14-7-14z" />
    </svg>
);

export const WifiIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0f6a66" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="1" />
    </svg>
);

export const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21.805 10.023h-9.78v3.954h5.602c-.242 1.502-1.632 4.404-5.602 4.404-3.368 0-6.114-2.77-6.114-6.184 0-3.414 2.746-6.184 6.114-6.184 1.918 0 3.194.819 3.928 1.507l2.673-2.574C17.454 3.01 15.39 2 12.025 2 6.92 2 2.8 6.086 2.8 11.203c0 5.117 4.12 9.203 9.225 9.203 5.32 0 8.81-3.732 8.81-8.997 0-.605-.07-1.07-.05-1.586z" fill="#4285F4" />
    </svg>
);

export const AppleIcon = () => (
    <svg width="16" height="18" viewBox="0 0 384 512" fill="currentColor">
        <path d="M318.7 268.7c-.3-55.1 45.1-81.6 47.1-83-25.6-37.4-65.5-42.5-79.7-43.3-33.9-3.4-66.1 20.1-83.4 20.1-17.5 0-44.5-19.6-73.2-19.1-37.6.5-72.2 22-91.4 55.8-39.1 67.9-10 168.4 28.1 223.7 18.6 26.2 40.6 55.6 69.5 54.5 27.2-1 37.5-17.6 70.5-17.6 32.8 0 42.3 17.6 70.7 17.1 29.4-.5 48-26.7 66.3-53 21-30.1 29.8-59.2 30.3-60.7-.7-.3-58.2-22.5-58.6-89.6z" />
    </svg>
);

// ─── Metric Card ──────────────────────────────────────────────────────────────
export function MetricCard({ icon, value, unit, label, trend }) {
    return (
        <div style={dashboard.metricCard}>
            <div style={dashboard.metricIcon}>{icon}</div>
            <div style={dashboard.metricData}>
                <span style={dashboard.metricValue}>
                    {value}<small style={dashboard.metricUnit}>{unit}</small>
                </span>
                <span style={dashboard.metricLabel}>{label}</span>
            </div>
            {trend && <span style={dashboard.metricTrend}>{trend}</span>}
        </div>
    );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
export function Sparkline() {
    return (
        <div style={dashboard.chartWrap}>
            <div style={dashboard.chartHeader}>
                <span style={dashboard.chartTitle}>Weekly Energy Trend</span>
                <span style={dashboard.chartBadge}>● Live</span>
            </div>
            <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ width: "100%", height: 60 }}>
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(15,106,102,0.20)" />
                        <stop offset="100%" stopColor="rgba(15,106,102,0)" />
                    </linearGradient>
                </defs>
                <path d="M0 45 Q20 40 40 38 T80 30 T120 25 T160 20 T200 28 T240 18 T280 12"
                    fill="none" stroke="#0f6a66" strokeWidth="2" />
                <path d="M0 45 Q20 40 40 38 T80 30 T120 25 T160 20 T200 28 T240 18 T280 12 V60 H0 Z"
                    fill="url(#chartGrad)" />
                <circle cx="280" cy="12" r="3" fill="#0f6a66">
                    <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// ─── Dashboard Preview ────────────────────────────────────────────────────────
export function DashboardPreview() {
    return (
        <div style={dashboard.dashboardPreview}>
            <div style={dashboard.previewHeader}>
                <div style={{ ...dashboard.dot, background: "#4caf50" }} />
                <div style={{ ...dashboard.dot, background: "#ffb300" }} />
                <div style={{ ...dashboard.dot, background: "#f44336" }} />
                <span style={dashboard.previewTitle}>EnerLuma Dashboard</span>
            </div>
            <div style={dashboard.metricsRow}>
                <MetricCard icon={<BoltIcon />} value="2.4" unit="kWh" label="Energy Today" trend="↓ 12%" />
                <MetricCard icon={<DropIcon />} value="148" unit="L" label="Water Usage" trend="↓ 8%" />
                <MetricCard icon={<WifiIcon />} value="7" unit="/9" label="Devices Online" />
            </div>
            <Sparkline />
        </div>
    );
}

// ─── Left Pane Branding ───────────────────────────────────────────────────────
export function AuthBranding() {
    return (
        <div style={branding.wrapper}>
            <h1 style={branding.name}>EnerLuma</h1>
            <p style={branding.sub}>Smart Energy &amp; Water Monitoring</p>
            <span style={branding.tag}>AI-Powered • Real-time • Sustainable</span>
        </div>
    );
}

// ─── Ambient Background Circles ───────────────────────────────────────────────
export function AmbientBg() {
    const circles = [
        { top: "8%", left: "4%", width: 200, height: 200, bg: "radial-gradient(circle,rgba(15,106,102,0.10),transparent 70%)" },
        { bottom: "14%", right: "8%", width: 260, height: 260, bg: "radial-gradient(circle,rgba(77,212,220,0.13),transparent 70%)" },
        { top: "50%", left: "38%", width: 180, height: 180, bg: "radial-gradient(circle,rgba(6,192,191,0.08),transparent 70%)" },
    ];
    return (
        <>
            {circles.map((c, i) => (
                <div key={i} style={{
                    position: "absolute", borderRadius: "50%", pointerEvents: "none",
                    top: c.top, left: c.left, bottom: c.bottom, right: c.right,
                    width: c.width, height: c.height, background: c.bg,
                }} />
            ))}
        </>
    );
}

// ─── Social Login Block ───────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function SocialLogin() {
    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/api/auth/google`;
    };

    const handleAppleLogin = () => {
        window.location.href = `${API_URL}/api/auth/apple`;
    };

    return (
        <>
            <div style={social.divider}>
                <span style={social.dividerText}>or continue with</span>
            </div>
            <div style={social.row}>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    style={{ ...social.btn, background: "#fff", color: "#333", border: "1px solid #ddd" }}
                >
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </button>
                <button
                    type="button"
                    onClick={handleAppleLogin}
                    style={{ ...social.btn, background: "#000", color: "#fff", border: "1px solid #000" }}
                >
                    <AppleIcon />
                    <span>Continue with Apple</span>
                </button>
            </div>
        </>
    );
}