// ─── EnerLuma Dashboard — Shared Styles (Light Theme) ────────────────────────

export const colors = {
    primary: "#20B2AA", // Light Teal
    primaryLight: "#48D1CC",
    primaryMedium: "#32C7C5",
    primaryBg: "rgba(32, 178, 170, 0.08)",
    primaryBorder: "rgba(32, 178, 170, 0.15)",
    accent: "#00CED1",
    accentGlow: "transparent",

    bg: "#f8fafc", // Very clean light gray/off-white background
    bgGradient: "#f8fafc", 
    
    // Sidebar colors
    sidebarBg: "#ffffff",
    sidebarText: "#64748b",
    sidebarActive: "#0f172a",
    sidebarActiveBg: "#ecfdf5", // soft green bubble
    
    // Cards
    cardBg: "#ffffff",
    cardBorder: "#f1f5f9",
    cardShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",

    text: "#0f172a", // Dark gray titles
    textSecondary: "#334155", 
    textMuted: "#94a3b8",
    textLight: "#cbd5e1",

    success: "#10b981", 
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",

    white: "#ffffff",
    border: "#e2e8f0",

    uploadBg: "#f8fafc",
    uploadBorder: "#cbd5e1",
    uploadBorderActive: "#20B2AA",
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export const layout = {
    page: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
        background: colors.bg,
        color: colors.text,
    },
    sidebar: {
        width: 250,
        minWidth: 250,
        background: colors.sidebarBg,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        height: "100vh",
        overflowY: "auto",
        zIndex: 100,
    },
    sidebarLogo: {
        padding: "24px 20px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    sidebarLogoText: {
        fontSize: "1.2rem",
        fontWeight: 700,
        color: colors.text,
        letterSpacing: "-0.02em",
    },
    sidebarLogoSub: {
        fontSize: "0.6rem",
        letterSpacing: "0.05em",
        color: colors.textMuted,
        textTransform: "uppercase",
        fontWeight: 600,
    },
    sidebarNav: {
        padding: "8px 16px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 4,
    },
    sidebarNavLabel: {
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: colors.textLight,
        padding: "16px 12px 6px",
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: "0.85rem",
        fontWeight: 500,
        color: colors.sidebarText,
        cursor: "pointer",
        transition: "all 0.15s ease",
        border: "none",
        background: "transparent",
        width: "100%",
        textAlign: "left",
        fontFamily: "inherit",
    },
    navItemActive: {
        background: colors.sidebarActiveBg,
        color: colors.primary,
        fontWeight: 600,
    },
    navItemHover: {
        background: colors.uploadBg,
        color: colors.sidebarActive,
    },
    sidebarFooter: {
        padding: "20px",
        borderTop: `1px solid ${colors.border}`,
    },
    
    // Top Navigation (New)
    topBar: {
        height: 70,
        minHeight: 70,
        background: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // Space-between if we add left items
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 90,
    },
    contentArea: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginLeft: 250,
        width: "calc(100% - 250px)",
    },
    mainContent: {
        flex: 1,
        padding: "24px 32px",
        overflowY: "auto",
        maxWidth: "100%",
    },
    pageHeader: {
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    pageTitleBox: {
        display: "flex",
        flexDirection: "column",
    },
    pageTitle: {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: colors.text,
        letterSpacing: "-0.01em",
    },
    pageSubtitle: {
        fontSize: "0.85rem",
        color: colors.textMuted,
        marginTop: 4,
    },
};

// ─── Cards ────────────────────────────────────────────────────────────────────
export const cards = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
    },
    stat: {
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 16,
        padding: "20px",
        boxShadow: colors.cardShadow,
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    statHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8
    },
    statIconWrap: {
        fontSize: "1rem",
        color: colors.primaryMedium,
    },
    statValue: {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: colors.text,
        letterSpacing: "-0.02em",
        display: "flex",
        alignItems: "baseline",
    },
    statValueUnit: {
        fontSize: "0.8rem",
        color: colors.textMuted,
        fontWeight: 500,
        marginLeft: 2,
    },
    statLabel: {
        fontSize: "0.8rem",
        fontWeight: 500,
        color: colors.textMuted,
        marginTop: 2,
        marginBottom: 12,
    },
    statTrend: {
        fontSize: "0.75rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 2,
    },
    section: {
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 16,
        padding: "24px",
        boxShadow: colors.cardShadow,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: "1rem",
        fontWeight: 600,
        color: colors.text,
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
};

// ─── Form Elements ────────────────────────────────────────────────────────────
export const formStyles = {
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    group: { display: "flex", flexDirection: "column", gap: 6 },
    label: { fontSize: "0.8rem", fontWeight: 600, color: colors.textSecondary },
    input: {
        width: "100%", padding: "10px 14px", fontSize: "0.9rem",
        border: `1px solid ${colors.border}`, borderRadius: 8,
        outline: "none", transition: "border-color 0.2s",
        fontFamily: "inherit", color: colors.text, background: colors.white,
    },
    select: {
        width: "100%", padding: "10px 14px", fontSize: "0.9rem",
        border: `1px solid ${colors.border}`, borderRadius: 8,
        outline: "none", transition: "border-color 0.2s",
        fontFamily: "inherit", color: colors.text, background: colors.white,
        cursor: "pointer", appearance: "none",
    },
    submitBtn: {
        padding: "10px 24px", background: colors.primary, color: "#fff",
        fontSize: "0.9rem", fontWeight: 600, border: "none", borderRadius: 8,
        cursor: "pointer", transition: "opacity 0.2s", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    },
    submitBtnDisabled: { opacity: 0.55, cursor: "not-allowed" },
    successMsg: { background: "#ecfdf5", border: "1px solid #a7f3d0", color: colors.success, borderRadius: 8, padding: "12px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 8 },
    errorMsg: { background: "#fef2f2", border: "1px solid #fecaca", color: colors.error, borderRadius: 8, padding: "12px", fontSize: "0.85rem" },
};

// ─── Upload Zone ──────────────────────────────────────────────────────────────
export const uploadStyles = {
    zone: {
        border: `2px dashed ${colors.uploadBorder}`, borderRadius: 12, padding: "40px 20px",
        textAlign: "center", cursor: "pointer", transition: "all 0.2s ease", background: colors.uploadBg,
    },
    zoneActive: { borderColor: colors.primary, background: colors.primaryBg },
    zoneIcon: { fontSize: "2rem", marginBottom: 12, color: colors.primaryMedium },
    zoneTitle: { fontSize: "0.95rem", fontWeight: 600, color: colors.text, marginBottom: 6 },
    zoneSub: { fontSize: "0.75rem", color: colors.textMuted },
    preview: { marginTop: 16, padding: 12, background: colors.white, borderRadius: 8, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", gap: 12 },
    previewImg: { width: 48, height: 48, borderRadius: 6, objectFit: "cover", border: `1px solid ${colors.border}` },
    previewInfo: { flex: 1 },
    previewName: { fontSize: "0.85rem", fontWeight: 600, color: colors.text },
    previewSize: { fontSize: "0.7rem", color: colors.textMuted, marginTop: 2 },
    removeBtn: { padding: "4px 8px", background: "#fef2f2", color: colors.error, border: "none", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" },
};

// ─── Table ────────────────────────────────────────────────────────────────────
export const tableStyles = {
    wrapper: { width: "100%", overflowX: "auto" },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
    th: { textAlign: "left", padding: "10px 16px", fontSize: "0.7rem", fontWeight: 600, color: colors.textMuted, borderBottom: `1px solid ${colors.border}`, whiteSpace: "nowrap" },
    td: { padding: "12px 16px", borderBottom: `1px solid ${colors.border}`, color: colors.text, fontSize: "0.85rem", whiteSpace: "nowrap", fontWeight: 500 },
    badge: (type) => ({
        display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 600,
        background: type === "energy" ? "#fef3c7" : "#dbeafe",
        color: type === "energy" ? "#b45309" : "#1d4ed8",
    }),
    deleteBtn: { padding: "4px 8px", background: "transparent", color: colors.textMuted, border: "none", cursor: "pointer" },
    empty: { textAlign: "center", padding: "40px", color: colors.textMuted, fontSize: "0.85rem" },
};

// ─── Tab Bar (mobile bottom nav) ──────────────────────────────────────────────
export const tabBar = {
    wrapper: { display: "none", position: "fixed", bottom: 0, left: 0, right: 0, background: colors.white, borderTop: `1px solid ${colors.border}`, padding: "6px 0", zIndex: 200 },
    inner: { display: "flex", justifyContent: "space-around", alignItems: "center" },
    item: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px", border: "none", background: "transparent", fontSize: "0.6rem", fontWeight: 600, color: colors.textMuted },
    itemActive: { color: colors.primary },
};

// ─── Chart Container ──────────────────────────────────────────────────────────
export const chartStyles = {
    wrapper: { width: "100%", height: 320 },
};
