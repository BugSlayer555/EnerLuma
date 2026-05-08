import { motion } from "framer-motion";
import { IMG } from "../assets/images";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SERVICES = [
  {
    icon: "🏠", title: "Dashboard Overview",
    desc: "A unified view of your entire resource ecosystem. Monitor real-time KPI cards for energy today (kWh), estimated daily cost in Rupees, and current draw. View your AI vs Actual consumption trend lines and recent monitoring alerts at a single glance.",
    features: ["Real-time KPI cards for energy & water", "Live AI vs Actual consumption chart", "Quick-access recent alerts panel", "Current draw and total daily cost metrics"],
  },
  {
    icon: "⚡", title: "Energy Auto-Sync",
    desc: "Link your Indian utility provider (e.g. BESCOM) for automatic 24-hour data synchronisation. EnerLuma connects directly to your utility account to pull daily consumption units and billing details without any manual entry required.",
    features: ["Automatic BESCOM (Bangalore) integration", "24-hour scheduled usage synchronization", "Historical billing period comparison", "Supports multi-provider account linking"],
  },
  {
    icon: "🤖", title: "AI Intelligence Hub",
    desc: "EnerLuma's AI engine processes your consumption data to generate Predictive Consumption Watch reports. Receive specific optimization recommendations for HVAC, Water Heaters, and Lighting with exact ₹/month savings and CO₂ impact estimates.",
    features: ["Predictive Consumption Watch reports", "HVAC, Lighting & Appliance optimization", "Personalized savings tips with ₹/month impact", "Smart scheduling based on usage patterns"],
  },
  {
    icon: "🔔", title: "Monitoring Alerts",
    desc: "Set custom thresholds for energy and water usage to prevent budget overruns. EnerLuma monitors your consumption in real-time and fires instant notifications for High Energy Spikes, Water Leaks (continuous flow), and Device Offline events.",
    features: ["Custom monthly kWh and litre limit settings", "Instant High Energy Spike notifications", "Continuous flow water leak detection", "Device connectivity and health monitoring"],
  },
  {
    icon: "💧", title: "Water Auto-Sync",
    desc: "Maintain a complete log of your water resource consumption. Whether entered manually or synced via utility provider, EnerLuma tracks daily flow rates in litres and provides deep-dive analytics to identify waste and optimization opportunities.",
    features: ["Daily litre flow monitoring & logging", "Resource-specific usage analytics", "Water cost tracking and budget alerts", "Linked account synchronization support"],
  },
  {
    icon: "🌿", title: "Sustainability Tracker",
    desc: "Visualize your environmental footprint with real-time Eco-Scoring. Track your monthly CO₂ emissions, compare your impact against community averages, and see your progress represented as equivalent trees planted and car kilometres saved.",
    features: ["Monthly Eco-Score (0–100) calculation", "Carbon Footprint Trend vs Community chart", "CO₂ emissions tracking per resource", "Trees Planted & Car km impact equivalents"],
  },
];

const PIPELINE = [
  { s: "01", t: "Log usage manually or upload a utility bill", icon: "📝" },
  { s: "02", t: "API pipeline normalizes & structures the time-series data", icon: "⚙️" },
  { s: "03", t: "AI engine runs pattern recognition & anomaly detection", icon: "🧠" },
  { s: "04", t: "Interactive dashboard visualizes insights in real time", icon: "📊" },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#ffffff" }}>

      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 100,
        background: "linear-gradient(160deg, #ffffff 0%, #f7fdfd 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(50,199,197,0.08)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.2)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28,
            }}>Platform Services</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.2rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: 24, maxWidth: 720,
            }}>
              Everything You Need to Monitor, Analyse & Optimise
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem",
              color: "#5a7a7e", lineHeight: 1.8, maxWidth: 620,
            }}>
              Six powerful modules that take you from raw meter readings to AI-powered insights — covering energy, water, sustainability, and cost optimisation in one unified platform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Core Capabilities</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 14,
            }}>EnerLuma's Six Core Services</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e",
              maxWidth: 620, margin: "0 auto", lineHeight: 1.7,
            }}>Each module is purpose-built to give you a different dimension of resource intelligence — from raw data to actionable savings.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}
            className="resp-grid-3"
          >
            {SERVICES.map((svc, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -7 }}
                style={{
                  background: "#fff", borderRadius: 22, padding: "38px 30px",
                  boxShadow: "0 2px 18px rgba(0,0,0,0.05)", border: "1px solid #eef5f5",
                  transition: "all 0.35s",
                }}
              >
                <div style={{
                  width: 54, height: 54, borderRadius: 15,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 22, fontSize: "1.6rem",
                }}>{svc.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.75rem",
                  color: "#1a2e35", marginBottom: 14, letterSpacing: "0.02em",
                }}>{svc.title}</h3>
                <p style={{
                  fontFamily: "'Outfit',sans-serif", fontSize: "0.91rem",
                  lineHeight: 1.78, color: "#5a7a7e", marginBottom: 20,
                }}>{svc.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {svc.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#32C7C5", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#8ab0b3", fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Analytics Preview ─── */}
      <section style={{ padding: "90px 32px", background: "var(--el-bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 14, display: "block" }}>Analytics Module</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "#1a2e35", lineHeight: 1.08, marginBottom: 22, letterSpacing: "0.02em" }}>
                See Your Consumption in Every Dimension
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                The Analytics module gives you 15+ chart types covering daily/weekly/monthly trends, appliance-level breakdowns, cost comparisons, and seasonal forecasting — all filterable by date range and resource type.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 28 }}>
                Compare your current month to the previous billing period, spot which appliances are driving up your electricity bill, and project costs for the next 30 days with confidence.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="resp-grid-2-inner">
                {[
                  { n: "15+", l: "Chart types & visualisations" },
                  { n: "3", l: "Resource types tracked" },
                  { n: "90d", l: "Historical data window" },
                  { n: "24h", l: "Granular time resolution" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "18px 18px", borderRadius: 14, background: "#fff", border: "1px solid #eef5f5" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", color: "#32C7C5", marginBottom: 4 }}>{item.n}</div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", color: "#9ab5b8" }}>{item.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.1)" }}>
                <img src={IMG.analyticsCharts} alt="EnerLuma Monitoring Alerts dashboard showing threshold settings and active alerts like High Energy Spike" style={{ width: "100%", height: "auto", maxHeight: 460, objectFit: "contain", objectPosition: "center", display: "block" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Data Pipeline ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.1)" }}>
                <img src={IMG.dashboardOverview} alt="EnerLuma dashboard overview with real-time KPI cards for energy, cost and current draw" style={{ width: "100%", height: "auto", maxHeight: 440, objectFit: "contain", objectPosition: "center", display: "block" }} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 14, display: "block" }}>Data Pipeline</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "#1a2e35", lineHeight: 1.08, marginBottom: 22, letterSpacing: "0.02em" }}>
                From Meter Reading to AI Insight in 4 Steps
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 28 }}>
                EnerLuma's pipeline replicates how enterprise IoT monitoring platforms process sensor data — cleansing, structuring, and analysing it before presenting it in an intuitive dashboard.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {PIPELINE.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", color: "#32C7C5", flexShrink: 0,
                    }}>{item.s}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.93rem", fontWeight: 500, color: "#3a5a5e" }}>{item.t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Sustainability Preview ─── */}
      <section style={{ padding: "90px 32px", background: "var(--el-bg-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 14, display: "block" }}>Sustainability Module</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "#1a2e35", lineHeight: 1.08, marginBottom: 22, letterSpacing: "0.02em" }}>
                Track Your Carbon Footprint in Real Time
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                EnerLuma calculates your monthly CO₂ emissions from electricity and water consumption using standard conversion factors. Your green score is updated automatically as you log new data.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 26 }}>
                See how many trees your savings are equivalent to, compare your footprint against household benchmarks, and follow a personalised eco-improvement checklist to raise your rating.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {[
                  "CO₂ footprint calculated per kWh & litre consumed",
                  "Green efficiency score updated monthly (A–F)",
                  "Eco-tip checklist with measurable impact estimates",
                  "Carbon savings visualised as trees planted equivalent",
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#32C7C5", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.91rem", color: "#5a7a7e" }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 50px rgba(0,0,0,0.1)" }}>
                <img src={IMG.sustainabilityDashboard} alt="EnerLuma Sustainability dashboard showing Carbon Footprint Trend vs Community Average" style={{ width: "100%", height: "auto", maxHeight: 440, objectFit: "contain", objectPosition: "center", display: "block" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.4rem", color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 18 }}>
              Ready to See Your Data Come Alive?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", color: "#7a9a9e", lineHeight: 1.75, marginBottom: 36 }}>
              Sign up, enter your first meter reading, and watch EnerLuma's AI turn it into a complete consumption story.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/signup" style={{
                display: "inline-block", padding: "14px 42px", borderRadius: 100,
                background: "linear-gradient(135deg,#32C7C5,#1fa8a6)",
                color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(50,199,197,0.3)",
              }}>Start for Free</a>
              <a href="/contact" style={{
                display: "inline-block", padding: "14px 42px", borderRadius: 100,
                border: "1.5px solid #d0e8e8",
                color: "#2aada8", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none",
              }}>Talk to Us</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
