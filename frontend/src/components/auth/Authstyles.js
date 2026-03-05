// ─── EnerLuma Auth — Shared Styles ───────────────────────────────────────────

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Space Grotesk', sans-serif; background: #f0faf9; }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  input:focus { outline: none; border-color: #0f6a66 !important; box-shadow: 0 0 0 3px rgba(15,106,102,0.12); }
  a { text-decoration: none; }
`;

// ─── Color Tokens ─────────────────────────────────────────────────────────────
export const colors = {
  primary:       "#0f6a66",
  primaryLight:  "#4dd4dc",
  primaryBg:     "rgba(15,106,102,0.06)",
  primaryBorder: "rgba(15,106,102,0.18)",
  primaryHover:  "#0c5450",
  error:         "#e53935",
  text:          "#111",
  textMuted:     "#888",
  textSecondary: "#555",
  border:        "#e0e0e0",
  white:         "#ffffff",
  bgPage:        "#f0faf9",
  bgLeftPane:    "linear-gradient(145deg, #e8f7f6 0%, #d0f0ee 40%, #b8e8e6 100%)",
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export const layout = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Space Grotesk', sans-serif",
    background: colors.bgPage,
  },
  leftPane: {
    flex: 1,
    background: colors.bgLeftPane,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    position: "relative",
    overflow: "hidden",
  },
  rightPane: {
    width: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px",
    background: colors.white,
    boxShadow: "-4px 0 24px rgba(15,106,102,0.07)",
    overflowY: "auto",
  },
  ambientCircle: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
  },
};

// ─── Dashboard Preview ────────────────────────────────────────────────────────
export const dashboard = {
  dashboardPreview: {
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(15,106,102,0.15)",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 420,
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(15,106,102,0.10)",
    animation: "fadeIn 0.6s ease both",
  },
  previewHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  dot: { width: 10, height: 10, borderRadius: "50%" },
  previewTitle: { marginLeft: 8, fontSize: 13, color: "#666", fontWeight: 500 },
  metricsRow: { display: "flex", gap: 10, marginBottom: 16 },
  metricCard: {
    flex: 1,
    background: "#f0fafa",
    border: "1px solid rgba(15,106,102,0.12)",
    borderRadius: 10,
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  metricIcon:  { color: colors.primary, marginBottom: 2 },
  metricData:  { display: "flex", flexDirection: "column" },
  metricValue: { fontSize: 18, fontWeight: 700, color: colors.text, lineHeight: 1.1 },
  metricUnit:  { fontSize: 11, color: colors.primary, fontWeight: 400, marginLeft: 2 },
  metricLabel: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  metricTrend: { fontSize: 11, fontWeight: 600, color: colors.primary },
  chartWrap:   { background: "rgba(15,106,102,0.05)", borderRadius: 8, padding: "10px 12px" },
  chartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  chartTitle:  { fontSize: 12, color: "#666" },
  chartBadge:  { fontSize: 11, color: colors.primary, fontWeight: 600 },
};

// ─── Branding ─────────────────────────────────────────────────────────────────
export const branding = {
  wrapper:  { marginTop: 28, textAlign: "center", animation: "fadeIn 0.8s ease 0.2s both" },
  name:     { fontSize: 32, fontWeight: 800, color: colors.primary, letterSpacing: -1 },
  sub:      { fontSize: 14, color: "#4a8a87", marginTop: 4 },
  tag: {
    display: "inline-block",
    marginTop: 10,
    fontSize: 11,
    color: colors.primary,
    border: `1px solid ${colors.primaryBorder}`,
    borderRadius: 20,
    padding: "4px 14px",
    letterSpacing: 0.5,
    background: colors.primaryBg,
  },
};

// ─── Card / Tabs ──────────────────────────────────────────────────────────────
export const card = {
  wrapper: { width: "100%", maxWidth: 380 },
  tabs: {
    display: "flex",
    borderBottom: `2px solid #f0f0f0`,
    marginBottom: 28,
  },
  tab: {
    flex: 1,
    padding: "12px 0",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    borderBottom: "2px solid transparent",
    marginBottom: -2,
    transition: "color .2s",
    fontFamily: "inherit",
    textDecoration: "none",
  },
  tabActive: {
    color: colors.primary,
    borderBottom: `2px solid ${colors.primary}`,
  },
};

// ─── Form Elements ────────────────────────────────────────────────────────────
export const form = {
  wrapper:     { display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.5s ease both" },
  title:       { fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 2 },
  subtitle:    { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  group:       { display: "flex", flexDirection: "column", gap: 5 },
  label:       { fontSize: 13, fontWeight: 500, color: "#333" },
  input: {
    width: "100%",
    padding: "11px 14px",
    fontSize: 14,
    border: `1.5px solid ${colors.border}`,
    borderRadius: 8,
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
    fontFamily: "inherit",
    color: colors.text,
    background: "#fff",
  },
  inputError:  { border: `1.5px solid ${colors.error}` },
  errorMsg:    { fontSize: 12, color: colors.error, marginTop: 2 },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 13,
    color: colors.textSecondary,
  },
  rememberLabel: { display: "flex", alignItems: "center", cursor: "pointer", fontSize: 13 },
  link: { color: colors.primary, fontWeight: 500, fontSize: 13 },
  submitBtn: {
    padding: "13px",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity .2s, transform .1s",
    fontFamily: "inherit",
    cursor: "pointer",
    width: "100%",
  },
  spinner: {
    width: 16,
    height: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
  secureRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#aaa",
    fontSize: 12,
    gap: 5,
  },
  footerText: { textAlign: "center", fontSize: 13, color: colors.textMuted },
  passwordStrength: {
    display: "flex",
    gap: 4,
    marginTop: 6,
  },
  strengthBar: (active, color) => ({
    flex: 1,
    height: 3,
    borderRadius: 2,
    background: active ? color : "#e0e0e0",
    transition: "background 0.3s",
  }),
  strengthLabel: { fontSize: 11, marginTop: 3 },
};

// ─── Social Login ─────────────────────────────────────────────────────────────
export const social = {
  divider: {
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
    position: "relative",
    margin: "20px 0 16px",
    borderTop: "1px solid #eee",
  },
  dividerText: {
    background: colors.white,
    padding: "0 10px",
    fontSize: 12,
    color: "#aaa",
    position: "relative",
    top: -10,
  },
  row: {
    width: "100%",
    maxWidth: 380,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    width: "100%",
    padding: "11px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    transition: "opacity .2s",
    gap: 8,
  },
};