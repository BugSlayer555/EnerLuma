// ─── EnerLuma Auth — Shared Components ───────────────────────────────────────
import { branding, social } from "./Authstyles";
import { IMG } from "../../assets/images";

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

// ─── Left Pane Branding ───────────────────────────────────────────────────────
export function AuthBranding() {
    return (
        <div style={{ ...branding.wrapper, position: "relative", zIndex: 1, width: "100%", maxWidth: 500 }}>
            {/* Header / Text */}
            <div style={{ textAlign: "left", marginBottom: 40 }}>
                <h1 style={{ ...branding.name, fontSize: 46 }}>EnerLuma</h1>
                <p style={{ ...branding.sub, fontSize: 16, marginTop: 8, lineHeight: 1.5, color: "#3a706e" }}>
                    The intelligent platform for enterprise energy &amp; water management. Monitor, optimize, and save in real-time.
                </p>
                <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                    <span style={branding.tag}>Real-Time Analytics</span>
                    <span style={branding.tag}>AI Optimization</span>
                    <span style={branding.tag}>ESG Tracking</span>
                </div>
            </div>

            {/* Dashboard Visual */}
            <div style={{ position: "relative", width: "100%" }}>
                <img 
                    src={IMG.dashboardOverview} 
                    alt="EnerLuma Dashboard Preview" 
                    style={{
                        width: "100%", 
                        height: "auto",
                        borderRadius: 16, 
                        boxShadow: "0 24px 48px rgba(15,106,102,0.18)",
                        border: "1px solid rgba(255,255,255,0.7)",
                        display: "block",
                        objectFit: "cover"
                    }} 
                />
                
                {/* Floating Glassmorphic Card */}
                <div style={{
                    position: "absolute",
                    bottom: -24,
                    right: -24,
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderRadius: 14,
                    padding: "16px 24px",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    animation: "fadeIn 0.8s ease 0.6s both"
                }}>
                    <div style={{ 
                        width: 44, height: 44, borderRadius: "50%", 
                        background: "linear-gradient(135deg, #0f6a66, #4dd4dc)", 
                        display: "flex", alignItems: "center", justifyContent: "center", 
                        color: "white", fontSize: 20 
                    }}>⚡</div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 0.6 }}>Avg. Energy Saved</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1.1 }}>24.8%</div>
                    </div>
                </div>
            </div>
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