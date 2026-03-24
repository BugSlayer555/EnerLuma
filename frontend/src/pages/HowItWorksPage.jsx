import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const STEPS = [
  {
    num: "01", icon: "📡", title: "Data Simulation Layer",
    subtitle: "Virtual Smart Meters & Sensors",
    desc: "EnerLuma operates using a sophisticated API that generates realistic electricity and water consumption data. This simulation layer replicates how real IoT devices continuously stream usage data into monitoring systems.",
    details: ["Simulated smart meter data streams", "Realistic household consumption patterns", "Time-series data generation via API", "Multi-sensor data points (power, flow, temperature)"],
  },
  {
    num: "02", icon: "⚙️", title: "Data Processing",
    subtitle: "Intelligent Data Pipeline",
    desc: "Raw simulated data is processed through a structured analytics pipeline that normalizes, cleanses, and structures information. AI algorithms analyze consumption patterns and identify trends.",
    details: ["Data normalization and cleansing", "Pattern extraction algorithms", "Time-series aggregation and storage", "Real-time stream processing engine"],
  },
  {
    num: "03", icon: "🧠", title: "Analytics Engine",
    subtitle: "AI-Powered Intelligence",
    desc: "The analytics engine uses machine learning models to process historical patterns, generate predictive insights, detect anomalies, and identify opportunities for resource optimization.",
    details: ["Predictive consumption forecasting", "Anomaly detection for leaks and spikes", "Usage efficiency scoring", "Personalized optimization recommendations"],
  },
  {
    num: "04", icon: "📊", title: "Visualization Dashboard",
    subtitle: "Interactive Insights Display",
    desc: "The final layer transforms processed analytics into beautiful, interactive visualizations. Users explore data through charts, graphs, and real-time panels that communicate insights instantly.",
    details: ["Interactive consumption charts", "Real-time usage monitoring", "Trend comparison visualizations", "Exportable analytics reports"],
  },
];

export default function HowItWorksPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 90,
        background: "linear-gradient(180deg, #f0fafa 0%, #e4f7f7 40%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }} className="resp-hero">
        <div style={{
          position: "absolute", bottom: -60, right: "15%",
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(50,199,197,0.08)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }} className="resp-container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.15)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24,
            }}>System Architecture</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.08, marginBottom: 20, maxWidth: 650,
            }}>
              How EnerLuma Works
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.12rem",
              color: "#5a7a7e", lineHeight: 1.75, maxWidth: 600,
            }}>
              Discover the end-to-end technology pipeline — from data simulation to actionable insights.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Flow Diagram ─── */}
      <section style={{ padding: "60px 32px" }} className="resp-section">
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>End-to-End Pipeline</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12,
            }}>From Simulated Sensors to Smart Insights</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e",
              maxWidth: 620, margin: "0 auto", lineHeight: 1.75,
            }}>
              EnerLuma processes simulated consumption data through four interconnected layers, each replicating how production-grade monitoring systems operate.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, marginTop: 44, flexWrap: "wrap",
            }}
          >
            {["Sensors", "Processing", "Analytics", "Dashboard"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  padding: "10px 24px", borderRadius: 100,
                  background: "#f0fafa", border: "1px solid #d8f0ef",
                  color: "#2aada8", fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em",
                }}>{label}</div>
                {i < 3 && (
                  <svg width="28" height="14" viewBox="0 0 28 14"><path d="M0 7h20M17 2.5l5 4.5-5 4.5" fill="none" stroke="#c0e0df" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 4 Steps ─── */}
      <section style={{ padding: "40px 32px 90px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56, alignItems: "center",
                marginBottom: i < STEPS.length - 1 ? 70 : 0,
                direction: i % 2 !== 0 ? "rtl" : "ltr",
              }} className="resp-grid-2"
            >
              {/* Text */}
              <motion.div variants={fadeUp} transition={{ duration: 0.7 }} style={{ direction: "ltr" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", color: "#32C7C5",
                  }}>{step.num}</div>
                  <div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 1 }}>Step {step.num}</p>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8" }}>{step.subtitle}</p>
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.4rem",
                  color: "#1a2e35", marginBottom: 16, letterSpacing: "0.02em", lineHeight: 1.1,
                }}>{step.title}</h3>

                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 22 }}>{step.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {step.details.map((d, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: "rgba(50,199,197,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.6rem", color: "#32C7C5", flexShrink: 0,
                      }}>✓</div>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", color: "#6a8a8e" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Visual Card */}
              <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }} style={{ direction: "ltr" }}>
                <motion.div
                  whileHover={{ y: -5 }}
                  style={{
                    borderRadius: 20, background: "#f7fbfb", border: "1px solid #eef5f5",
                    padding: 32, textAlign: "center", transition: "all 0.35s",
                  }}
                >
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: "2.4rem",
                  }}>{step.icon}</div>
                  <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", color: "#32C7C5", letterSpacing: "0.02em", marginBottom: 8 }}>{step.title}</h4>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", color: "#9ab5b8", lineHeight: 1.6 }}>{step.subtitle}</p>
                  <div style={{ margin: "20px auto 0", width: "50%", height: 3, borderRadius: 2, background: "linear-gradient(90deg,transparent,#d2f5f4,transparent)" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Architecture Cards ─── */}
      <section style={{ padding: "80px 32px", background: "#f7fbfb" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Technology Stack</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10,
            }}>Technology Behind EnerLuma</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}
            className="resp-grid-4"
          >
            {[
              { icon: "🔌", title: "Data Ingestion", desc: "API-driven data simulation", tech: "REST APIs" },
              { icon: "🔄", title: "Stream Processing", desc: "Real-time data normalization", tech: "Node.js" },
              { icon: "🧮", title: "AI/ML Engine", desc: "Pattern recognition models", tech: "AI Analytics" },
              { icon: "🖥️", title: "Visualization", desc: "Interactive dashboards", tech: "React + D3" },
            ].map((a, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                style={{
                  background: "#fff", borderRadius: 18, padding: "32px 24px",
                  textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: "1.6rem",
                }}>{a.icon}</div>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: "#1a2e35", marginBottom: 8, letterSpacing: "0.02em" }}>{a.title}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", color: "#9ab5b8", lineHeight: 1.55, marginBottom: 14 }}>{a.desc}</p>
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: 100,
                  background: "rgba(50,199,197,0.06)", fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.72rem", fontWeight: 600, color: "#32C7C5", letterSpacing: "0.04em",
                }}>{a.tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "70px 32px", textAlign: "center" }} className="resp-section">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 16,
            }}>See the Platform in Action</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem",
              color: "#7a9a9e", lineHeight: 1.7, marginBottom: 32,
            }}>Register to explore EnerLuma's intelligent dashboard and experience AI-driven consumption monitoring.</motion.p>
            <motion.a variants={fadeUp} href="/signup" style={{
              display: "inline-block", padding: "14px 40px", borderRadius: 100,
              background: "linear-gradient(135deg,#32C7C5,#56E0E0)",
              color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem",
              fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase",
              boxShadow: "0 6px 20px rgba(50,199,197,0.25)",
            }}>Get Started</motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
