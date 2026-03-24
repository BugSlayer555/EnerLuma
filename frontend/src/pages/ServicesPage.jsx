import { motion } from "framer-motion";
import { IMG } from "../assets/images";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SERVICES = [
  {
    icon: "⚡", title: "Smart Energy Monitoring",
    desc: "Track real-time electricity consumption across appliances, rooms, and time periods with realistic simulated smart meter data that mirrors actual household energy patterns.",
    features: ["Real-time usage tracking", "Appliance-level breakdown", "Peak hour identification"],
  },
  {
    icon: "💧", title: "Water Consumption Analytics",
    desc: "Monitor water usage patterns with precision analytics. From daily consumption tracking to seasonal trend analysis, our platform demonstrates smart water meter capabilities.",
    features: ["Daily flow monitoring", "Leak detection alerts", "Usage optimization tips"],
  },
  {
    icon: "🤖", title: "AI-Based Usage Insights",
    desc: "Leverage artificial intelligence to uncover hidden patterns in resource consumption. Our AI engine processes historical data to generate personalized insights and recommendations.",
    features: ["Pattern recognition", "Anomaly detection", "Behavioral analysis"],
  },
  {
    icon: "📊", title: "Consumption Trend Analysis",
    desc: "Visualize consumption trends across days, weeks, and months with interactive charts. Identify seasonal patterns and forecast future resource demands with precision.",
    features: ["Multi-period comparisons", "Seasonal forecasting", "Cost projections"],
  },
  {
    icon: "📈", title: "Dashboard Visualization",
    desc: "Transform raw consumption data into beautiful, interactive visualizations. Our dashboards make complex analytics accessible through intuitive charts and real-time data panels.",
    features: ["Interactive charts", "Custom date ranges", "Export capabilities"],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 90,
        background: "linear-gradient(180deg, #f0fafa 0%, #e4f7f7 40%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }} className="resp-hero">
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 350, height: 350, borderRadius: "50%",
          border: "1px solid rgba(50,199,197,0.08)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }} className="resp-container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.15)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24,
            }}>What We Offer</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.08, marginBottom: 20, maxWidth: 650,
            }}>
              Intelligent Monitoring Services
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.12rem",
              color: "#5a7a7e", lineHeight: 1.75, maxWidth: 580,
            }}>
              Transforming resource consumption through AI-powered analytics, simulated sensor data, and intelligent dashboard visualization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section style={{ padding: "90px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ textAlign: "center", marginBottom: 50 }}
          >
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Our Capabilities</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12,
            }}>EnerLuma Platform Services</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e",
              maxWidth: 600, margin: "0 auto", lineHeight: 1.7,
            }}>Each service demonstrates how modern smart monitoring platforms optimize energy and water management.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
            className="resp-grid-3"
          >
            {SERVICES.map((svc, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "36px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)", border: "1px solid #eef5f5",
                  transition: "all 0.35s",
                  ...(i >= 3 ? {} : {}),
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, fontSize: "1.5rem",
                }}>{svc.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem",
                  color: "#1a2e35", marginBottom: 12, letterSpacing: "0.02em",
                }}>{svc.title}</h3>
                <p style={{
                  fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem",
                  lineHeight: 1.75, color: "#5a7a7e", marginBottom: 18,
                }}>{svc.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {svc.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#32C7C5", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── How Simulated Data Works ─── */}
      <section style={{ padding: "90px 32px", background: "#f7fbfb" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Data Pipeline</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                color: "#1a2e35", lineHeight: 1.1, marginBottom: 22, letterSpacing: "0.02em",
              }}>How Simulated Data Replicates Real IoT Systems</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                EnerLuma uses sophisticated API-based simulation to replicate real smart meters and IoT sensors. Instead of physical hardware, our data pipelines generate realistic consumption patterns.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 26 }}>
                This approach lets users experience a fully functional monitoring platform without deploying physical IoT infrastructure.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { s: "01", t: "API generates time-series consumption data" },
                  { s: "02", t: "Data normalized and stored in analytics engine" },
                  { s: "03", t: "AI models process patterns and anomalies" },
                  { s: "04", t: "Insights visualized through interactive dashboard" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.85rem", color: "#32C7C5", flexShrink: 0,
                    }}>{item.s}</div>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem", fontWeight: 500, color: "#3a5a5e" }}>{item.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src={IMG.sensorNetwork} alt="IoT sensor network" style={{ width: "100%", height: 450, objectFit: "cover", display: "block" }} className="resp-img" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Platform Capabilities ─── */}
      <section style={{ padding: "90px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src={IMG.dataFlow} alt="Data platform" style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }} className="resp-img" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Platform Power</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                color: "#1a2e35", lineHeight: 1.1, marginBottom: 22, letterSpacing: "0.02em",
              }}>Built for Modern Resource Intelligence</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 26 }}>
                Every layer is optimized for performance and clarity — from data ingestion to visualization.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="resp-grid-2-inner">
                {[
                  { n: "99.9%", l: "Data accuracy" },
                  { n: "< 2s", l: "Dashboard load time" },
                  { n: "24/7", l: "Continuous monitoring" },
                  { n: "100+", l: "Analytics metrics" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "18px 16px", borderRadius: 14,
                    background: "#f7fbfb", border: "1px solid #eef5f5",
                  }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: "#32C7C5", marginBottom: 3 }}>{item.n}</div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", color: "#9ab5b8" }}>{item.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "70px 32px", background: "#f7fbfb", textAlign: "center" }} className="resp-section">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 16,
            }}>Ready to Explore Smart Monitoring?</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem",
              color: "#7a9a9e", lineHeight: 1.7, marginBottom: 32,
            }}>
              Discover how EnerLuma transforms raw consumption data into actionable intelligence.
            </motion.p>
            <motion.a variants={fadeUp} href="/contact" style={{
              display: "inline-block", padding: "14px 40px", borderRadius: 100,
              background: "linear-gradient(135deg,#32C7C5,#56E0E0)",
              color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem",
              fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase",
              boxShadow: "0 6px 20px rgba(50,199,197,0.25)",
            }}>Get in Touch</motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
