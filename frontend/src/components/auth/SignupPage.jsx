// ─── EnerLuma — Sign Up Page ──────────────────────────────────────────────────
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    DashboardPreview,
    AuthBranding,
    AmbientBg,
    SocialLogin,
    EyeOpen,
    EyeClosed,
    LockIcon,
} from "./Authcomponents";
import { globalCSS, layout, card, form, colors } from "./Authstyles";

// ─── Password strength helper ─────────────────────────────────────────────────
function getPasswordStrength(pwd) {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const levels = [
        { label: "", color: "" },
        { label: "Weak", color: "#e53935" },
        { label: "Fair", color: "#fb8c00" },
        { label: "Good", color: "#43a047" },
        { label: "Strong", color: "#00897b" },
    ];
    return { score, ...levels[score] };
}

// ─── Signup Form ──────────────────────────────────────────────────────────────
function SignupForm() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
    const strength = getPasswordStrength(password);

    const clearFieldError = (field) =>
        setErrors((prev) => ({ ...prev, [field]: "" }));

    const isEnabled =
        fullName.trim().length >= 2 &&
        isValidEmail(email) &&
        password.length >= 8 &&
        confirmPwd === password &&
        agreeTerms;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = {};
        if (fullName.trim().length < 2) errs.fullName = "Please enter your full name.";
        if (!isValidEmail(email)) errs.email = "Please enter a valid email address.";
        if (password.length < 8) errs.password = "Password must be at least 8 characters.";
        if (confirmPwd !== password) errs.confirmPwd = "Passwords do not match.";
        if (!agreeTerms) errs.terms = "You must agree to the terms to continue.";
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setErrors({});
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: fullName, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrors({ general: data.error || "Signup failed. Please try again." });
                setLoading(false);
                return;
            }
            localStorage.setItem("enerluma_token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setErrors({ general: "Network error. Please check your connection." });
            setLoading(false);
        }
    };

    const strengthBarColors = ["#e0e0e0", "#e53935", "#fb8c00", "#43a047", "#00897b"];

    return (
        <form onSubmit={handleSubmit} noValidate style={form.wrapper}>
            <h2 style={form.title}>Create Account</h2>
            <p style={form.subtitle}>Start monitoring smarter with EnerLuma</p>

            {errors.general && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13, color: "#dc2626" }}>
                    {errors.general}
                </div>
            )}

            {/* ── Full Name ── */}
            <div style={form.group}>
                <label style={form.label} htmlFor="signup-name">Full Name</label>
                <input
                    id="signup-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); clearFieldError("fullName"); }}
                    style={{ ...form.input, ...(errors.fullName ? form.inputError : {}) }}
                    required
                />
                {errors.fullName && <span style={form.errorMsg}>{errors.fullName}</span>}
            </div>

            {/* ── Email ── */}
            <div style={form.group}>
                <label style={form.label} htmlFor="signup-email">Email Address</label>
                <input
                    id="signup-email"
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
                <label style={form.label} htmlFor="signup-password">Password</label>
                <div style={{ position: "relative" }}>
                    <input
                        id="signup-password"
                        type={showPwd ? "text" : "password"}
                        placeholder="Min. 8 characters"
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

                {/* Strength bars */}
                {password.length > 0 && (
                    <>
                        <div style={form.passwordStrength}>
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    style={form.strengthBar(strength.score >= level, strengthBarColors[strength.score])}
                                />
                            ))}
                        </div>
                        <span style={{ ...form.strengthLabel, color: strengthBarColors[strength.score] || "#aaa" }}>
                            {strength.label}
                        </span>
                    </>
                )}
            </div>

            {/* ── Confirm Password ── */}
            <div style={form.group}>
                <label style={form.label} htmlFor="signup-confirm">Confirm Password</label>
                <div style={{ position: "relative" }}>
                    <input
                        id="signup-confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPwd}
                        onChange={(e) => { setConfirmPwd(e.target.value); clearFieldError("confirmPwd"); }}
                        style={{ ...form.input, paddingRight: 44, ...(errors.confirmPwd ? form.inputError : {}) }}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        style={form.eyeBtn}
                    >
                        {showConfirm ? <EyeClosed /> : <EyeOpen />}
                    </button>
                </div>
                {errors.confirmPwd && <span style={form.errorMsg}>{errors.confirmPwd}</span>}
                {/* Match indicator */}
                {confirmPwd.length > 0 && !errors.confirmPwd && (
                    <span style={{ fontSize: 12, color: confirmPwd === password ? "#00897b" : "#e53935", marginTop: 2 }}>
                        {confirmPwd === password ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </span>
                )}
            </div>

            {/* ── Terms ── */}
            <div style={{ ...form.group, gap: 2 }}>
                <label style={{ ...form.rememberLabel, alignItems: "flex-start", gap: 8, fontSize: 13, color: "#555", lineHeight: 1.4 }}>
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => { setAgreeTerms(e.target.checked); clearFieldError("terms"); }}
                        style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    I agree to the{" "}
                    <a href="/terms" style={form.link}>Terms of Service</a>{" "}
                    and{" "}
                    <a href="/privacy" style={form.link}>Privacy Policy</a>
                </label>
                {errors.terms && <span style={form.errorMsg}>{errors.terms}</span>}
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
                {loading ? "Creating Account…" : "Create Account"}
            </button>

            {/* ── Secure indicator ── */}
            <div style={form.secureRow}>
                <LockIcon />
                <span>Secured with 256-bit encryption</span>
            </div>

            <p style={form.footerText}>
                Already have an account?{" "}
                <Link to="/login" style={form.link}>Login</Link>
            </p>
        </form>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SignupPage() {
    return (
        <div style={layout.page}>
            <style>{globalCSS}</style>

            {/* Left pane */}
            <div style={layout.leftPane}>
                <AmbientBg />
                <DashboardPreview />
                <AuthBranding />
            </div>

            {/* Right pane — scrollable for taller signup form */}
            <div style={{ ...layout.rightPane, justifyContent: "flex-start", paddingTop: 60 }}>
                <div style={{ ...card.wrapper, marginBottom: 0 }}>
                    <div style={card.tabs}>
                        <Link to="/login" style={card.tab}>Login</Link>
                        <button style={{ ...card.tab, ...card.tabActive }}>Sign Up</button>
                    </div>
                    <SignupForm />
                </div>
                <SocialLogin />
            </div>
        </div>
    );
}