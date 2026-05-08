// ─── EnerLuma — Login Page ────────────────────────────────────────────────────
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AuthBranding,
    AmbientBg,
    SocialLogin,
    EyeOpen,
    EyeClosed,
    LockIcon,
} from "./Authcomponents";
import { globalCSS, layout, card, form } from "./Authstyles";

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
    const isEnabled = isValidEmail(email) && password.length >= 8;

    const clearFieldError = (field) =>
        setErrors((prev) => ({ ...prev, [field]: "" }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = {};
        if (!isValidEmail(email)) errs.email = "Please enter a valid email address.";
        if (password.length < 8) errs.password = "Password must be at least 8 characters.";
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setErrors({});
        setLoading(true);
        try {
            const res = await fetch(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth/login` : "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const contentType = res.headers.get("content-type") || "";
            const payload = contentType.includes("application/json")
                ? await res.json()
                : { error: await res.text() };

            if (!res.ok) {
                const isDbUnavailable =
                    res.status === 503 ||
                    (typeof payload.error === "string" && payload.error.toLowerCase().includes("database unavailable"));

                setErrors({
                    general: isDbUnavailable
                        ? "Service is temporarily unavailable. Please try again in a moment."
                        : payload.error || "Login failed. Please try again.",
                });
                return;
            }

            localStorage.setItem("enerluma_token", payload.token);
            navigate("/dashboard");
        } catch (_err) {
            setErrors({ general: "Network error. Please check your connection." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate style={form.wrapper}>
            <h2 style={form.title}>Welcome Back</h2>
            <p style={form.subtitle}>Access your EnerLuma account</p>

            {errors.general && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13, color: "#dc2626" }}>
                    {errors.general}
                </div>
            )}

            {/* ── Email ── */}
            <div style={form.group}>
                <label style={form.label} htmlFor="login-email">Email Address</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                    style={{ ...form.input, ...(errors.email ? form.inputError : {}) }}
                    required
                />
                {errors.email && <span style={form.errorMsg}>{errors.email}</span>}
            </div>

            {/* ── Password ── */}
            <div style={form.group}>
                <label style={form.label} htmlFor="login-password">Password</label>
                <div style={{ position: "relative" }}>
                    <input
                        id="login-password"
                        type={showPwd ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
                        style={{ ...form.input, paddingRight: 44, ...(errors.password ? form.inputError : {}) }}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                        style={form.eyeBtn}
                    >
                        {showPwd ? <EyeClosed /> : <EyeOpen />}
                    </button>
                </div>
                {errors.password && <span style={form.errorMsg}>{errors.password}</span>}
            </div>

            {/* ── Options ── */}
            <div style={form.options}>
                <label style={form.rememberLabel}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ marginRight: 6 }}
                    />
                    Remember me
                </label>
                <a href="/forgot-password" style={form.link}>Forgot password?</a>
            </div>

            {/* ── Submit ── */}
            <button
                type="submit"
                disabled={!isEnabled || loading}
                style={{
                    ...form.submitBtn,
                    opacity: (!isEnabled || loading) ? 0.55 : 1,
                    cursor: (!isEnabled || loading) ? "not-allowed" : "pointer",
                }}
            >
                {loading && <span style={form.spinner} />}
                {loading ? "Logging in…" : "Login"}
            </button>

            {/* ── Secure indicator ── */}
            <div style={form.secureRow}>
                <LockIcon />
                <span>Secured with 256-bit encryption</span>
            </div>

            <p style={form.footerText}>
                Don't have an account?{" "}
                <Link to="/signup" style={form.link}>Sign Up</Link>
            </p>
        </form>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
    return (
        <div style={layout.page} className="auth-page">
            <style>{globalCSS}</style>

            {/* Left pane */}
            <div style={layout.leftPane} className="auth-left">
                <AmbientBg />
                <AuthBranding />
            </div>

            {/* Right pane */}
            <div style={layout.rightPane} className="auth-right">
                {/* Tabs */}
                <div style={{ ...card.wrapper, marginBottom: 0 }}>
                    <div style={card.tabs}>
                        <button style={{ ...card.tab, ...card.tabActive }}>Login</button>
                        <Link to="/signup" style={card.tab}>Sign Up</Link>
                    </div>
                    <LoginForm />
                </div>
                <SocialLogin />
            </div>
        </div>
    );
}