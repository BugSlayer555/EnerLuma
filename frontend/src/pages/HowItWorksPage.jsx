import { motion } from "framer-motion";
import { IMG } from "../assets/images";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const STEPS = [
  {
    num: "01", icon: "📝", title: "Log Your Consumption",
    subtitle: "Automatic Utility Sync or Manual Entry",
    desc: "Connect your Indian utility provider (like BESCOM) for automatic 24-hour data synchronisation. EnerLuma securely links to your utility account to pull daily consumption data without manual effort. Alternatively, enter readings manually with value, unit, and cost for quick tracking.",
    details: [
      "Auto-sync via API: BESCOM and other Indian utility providers",
      "24-hour automatic synchronisation of electricity & water data",
      "Manual entry form for quick logging of kWh or litres",
      "Supports multi-resource tracking within a single interface",
    ],
    screen: IMG.energySync,
    screenAlt: "EnerLuma Energy Auto-Sync dashboard showing linked BESCOM account",
  },
  {
    num: "02", icon: "⚙️", title: "Data Processing Pipeline",
    subtitle: "Real-time Monitoring & Alert Logic",
    desc: "The EnerLuma monitoring engine scans your consumption data in real-time. If a reading exceeds your custom monthly limit or triggers an anomaly rule, the system instantly fires a notification. The Monitoring Alerts module manages active issues like high energy spikes, water leaks, and device connectivity.",
    details: [
      "Real-time rule engine for custom kWh and litre limits",
      "Instant push notifications for threshold violations",
      "Continuous flow detection to identify potential water leaks",
      "Device health monitoring with offline status alerts",
    ],
    screen: IMG.analyticsCharts,
    screenAlt: "EnerLuma Monitoring Alerts dashboard showing active spikes and leaks",
  },
  {
    num: "03", icon: "🧠", title: "AI Analytics Engine",
    subtitle: "Predictive Consumption Watch",
    desc: "The AI Intelligence Hub processes your data to generate hyper-personalised recommendations. The Predictive Consumption Watch identifies specific optimisation opportunities — like tuning HVAC, Water Heater, or Lighting runtime — showing you the exact ₹/month savings and CO₂ impact of each action.",
    details: [
      "Predictive Consumption Watch for appliance optimisation",
      "Personalised savings tips based on actual usage patterns",
      "Exact rupee and carbon impact estimates per recommendation",
      "Smart scheduling suggestions for peak and off-peak hours",
    ],
    screen: IMG.aiInsights,
    screenAlt: "EnerLuma AI Intelligence Hub showing predictive consumption watch",
  },
  {
    num: "04", icon: "📊", title: "Interactive Dashboard",
    subtitle: "Eco-Score & Carbon Footprint Trend",
    desc: "The Sustainability module visualises your environmental impact. View your real-time Eco-Score, monthly CO₂ footprint, and carbon footprint trends compared against the community average. EnerLuma converts your resource conservation into tangible metrics like equivalent trees planted and car kilometres saved.",
    details: [
      "Monthly Eco-Score (0–100) based on conservation habits",
      "Carbon Footprint Trend vs Community Average chart",
      "Tangible impact metrics: Trees Planted & Car km Equivalents",
      "Environmental impact tracking for both energy and water",
    ],
    screen: IMG.sustainabilityDashboard,
    screenAlt: "EnerLuma Sustainability dashboard showing carbon score and community trend",
  },
];

const TABS = [
  { icon: "🏠", name: "Overview", desc: "Real-time KPI cards, live consumption chart, recent alerts, and top AI recommendations — everything at a glance." },
  { icon: "📊", name: "Analytics", desc: "Deep-dive into consumption with multi-period bar charts, donut breakdowns by appliance, and cost projection graphs." },
  { icon: "🤖", name: "AI Insights", desc: "Personalized energy-saving tips, anomaly detection timeline, predictive forecast, and efficiency scoring." },
  { icon: "🔔", name: "Alerts", desc: "Real-time notifications for unusual spikes, potential leaks, budget overruns, and maintenance reminders." },
  { icon: "🌿", name: "Sustainability", desc: "CO₂ footprint tracker, green efficiency score, eco-improvement checklist, and carbon savings visualisation." },
  { icon: "📱", name: "Devices", desc: "Manage all connected meters and smart devices, view device health, and configure monitoring thresholds." },
  { icon: "📜", name: "History", desc: "Complete log of all usage entries and uploaded bills with filter by resource type and date range." },
  { icon: "⚙️", name: "Settings", desc: "User profile, notification preferences, API sync configuration, and billing integration settings." },
];

export default function HowItWorksPage() {
  return (
    <div style={{ background: "#ffffff" }}>

      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 100,
        background: "linear-gradient(160deg, #ffffff 0%, #f7fdfd 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", bottom: -80, right: "15%", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(50,199,197,0.08)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.2)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28,
            }}>System Architecture</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.2rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: 24, maxWidth: 720,
            }}>
              How EnerLuma Turns Meter Data Into Intelligence
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem",
              color: "#5a7a7e", lineHeight: 1.8, maxWidth: 640,
            }}>
              A 4-step pipeline takes your raw electricity and water readings from manual input or bill upload all the way to AI-powered insights — displayed on a real-time interactive dashboard.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Pipeline Flow ─── */}
      <section style={{ padding: "60px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}
          >
            {["Log Data", "Process", "AI Analyse", "Dashboard"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  padding: "11px 26px", borderRadius: 100,
                  background: "linear-gradient(135deg,#e8fafa,#d4f4f3)",
                  border: "1px solid #c0e8e7",
                  color: "#2aada8", fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.84rem", fontWeight: 700, letterSpacing: "0.04em",
                }}>{label}</div>
                {i < 3 && (
                  <svg width="32" height="14" viewBox="0 0 32 14">
                    <path d="M0 7h24M21 2.5l6 4.5-6 4.5" fill="none" stroke="#b0d8d7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 4 Steps ─── */}
      <section style={{ padding: "20px 32px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60, alignItems: "center",
                marginBottom: i < STEPS.length - 1 ? 90 : 0,
                direction: i % 2 !== 0 ? "rtl" : "ltr",
              }} className="resp-grid-2"
            >
              {/* Text */}
              <motion.div variants={fadeUp} transition={{ duration: 0.7 }} style={{ direction: "ltr" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: "#32C7C5",
                  }}>{step.num}</div>
                  <div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 2 }}>Step {step.num}</p>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", color: "#9ab5b8" }}>{step.subtitle}</p>
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                  color: "#1a2e35", marginBottom: 18, letterSpacing: "0.02em", lineHeight: 1.08,
                }}>{step.title}</h3>

                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 24 }}>{step.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {step.details.map((d, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 7, marginTop: 1,
                        background: "rgba(50,199,197,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.62rem", color: "#32C7C5", flexShrink: 0, fontWeight: 800,
                      }}>✓</div>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", color: "#6a8a8e", lineHeight: 1.6 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Screen */}
              <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }} style={{ direction: "ltr" }}>
                <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 56px rgba(0,0,0,0.1)", border: "1px solid rgba(50,199,197,0.1)" }}>
                  <div style={{ background: "var(--el-accent-heavy)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                    <span style={{ marginLeft: 10, fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)" }}>EnerLuma — Step {step.num}</span>
                  </div>
                  <img src={step.screen} alt={step.screenAlt} style={{ width: "100%", height: "auto", maxHeight: 500, objectFit: "contain", objectPosition: "center", display: "block" }} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Dashboard Tabs ─── */}
      <section style={{ padding: "90px 32px", background: "var(--el-bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 56 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Dashboard Modules</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 14 }}>8 Powerful Dashboard Tabs</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Every tab in EnerLuma's dashboard serves a distinct analytical purpose — covering everything from real-time KPIs to long-term sustainability tracking.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            className="resp-grid-4"
          >
            {TABS.map((tab, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "30px 22px",
                  textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 14 }}>{tab.icon}</div>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em" }}>{tab.name}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8", lineHeight: 1.65 }}>{tab.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Technology Stack</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10 }}>Built End-to-End With Modern Tools</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            className="resp-grid-4"
          >
            {[
              { icon: "⚛️", title: "React + Vite", desc: "Component-based UI with fast HMR, Framer Motion animations, and Recharts visualisations.", tech: "Frontend" },
              { icon: "🟢", title: "Node.js + Express", desc: "REST API handling auth (JWT + Google OAuth), file uploads (Multer), and data ingestion.", tech: "Backend" },
              { icon: "🍃", title: "MongoDB", desc: "Flexible NoSQL time-series storage with Mongoose ODM for usage entries, bills, and user profiles.", tech: "Database" },
              { icon: "🔐", title: "JWT + OAuth 2.0", desc: "Secure authentication with JSON Web Tokens, Google OAuth, and bcrypt password hashing.", tech: "Auth" },
            ].map((a, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "32px 24px",
                  textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#e8fafa,#d2f5f4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "1.7rem" }}>{a.icon}</div>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: "rgba(50,199,197,0.07)", fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#32C7C5", letterSpacing: "0.06em", marginBottom: 12 }}>{a.tech}</span>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.45rem", color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em" }}>{a.title}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8", lineHeight: 1.65 }}>{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "80px 32px", textAlign: "center", background: "#f7fbfb" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.4rem", color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 18 }}>Experience the Full Pipeline</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", color: "#7a9a9e", lineHeight: 1.75, marginBottom: 36 }}>
              Sign up, log your first energy or water reading, and let EnerLuma's 4-step pipeline do the rest.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/signup" style={{
                display: "inline-block", padding: "14px 42px", borderRadius: 100,
                background: "linear-gradient(135deg,#32C7C5,#1fa8a6)",
                color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(50,199,197,0.3)",
              }}>Get Started Free</a>
              <a href="/services" style={{
                display: "inline-block", padding: "14px 42px", borderRadius: 100,
                border: "1.5px solid #d0e8e8",
                color: "#2aada8", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none",
              }}>View All Services</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
