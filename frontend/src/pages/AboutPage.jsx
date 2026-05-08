import { motion } from "framer-motion";
import { IMG } from "../assets/images";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const STATS = [
  { stat: "30%", label: "Average energy savings achieved through smart monitoring", icon: "⚡" },
  { stat: "25%", label: "Water waste reduction via AI-powered leak detection", icon: "💧" },
  { stat: "87%", label: "User efficiency score improvement within first month", icon: "📈" },
  { stat: "< 2s", label: "Dashboard load time with real-time data updates", icon: "🚀" },
];

const FEATURES = [
  { t: "Real-time Consumption Tracking", d: "Monitor energy & water usage as it happens" },
  { t: "AI Anomaly Detection", d: "Catch leaks and spikes automatically" },
  { t: "Predictive Analytics", d: "Forecast your next month's usage & cost" },
  { t: "Smart Recommendations", d: "Get personalized AI tips to cut your bill" },
  { t: "Bill Upload & OCR", d: "Upload utility bills for instant analysis" },
  { t: "Sustainability Scoring", d: "Track your carbon footprint over time" },
];

const TECH_STACK = [
  { icon: "⚛️", name: "React + Vite", role: "Frontend Framework", desc: "Lightning-fast interactive dashboards with real-time state updates and animated charts." },
  { icon: "🟢", name: "Node.js + Express", role: "Backend API", desc: "RESTful API server handling auth, data pipelines, bill uploads, and AI model triggers." },
  { icon: "🍃", name: "MongoDB Atlas", role: "Data Storage", desc: "Flexible NoSQL storage for time-series consumption data, user profiles, and bill history." },
  { icon: "🤖", name: "AI Analytics Engine", role: "Intelligence Layer", desc: "Custom ML models for pattern recognition, anomaly detection, and usage forecasting." },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff" }}>

      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 100,
        background: "linear-gradient(160deg, #f0fafa 0%, #e8f9f9 50%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(50,199,197,0.1)" }} />
        <div style={{ position: "absolute", bottom: -60, left: "5%", width: 260, height: 260, borderRadius: "50%", background: "rgba(50,199,197,0.04)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.2)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28,
            }}>About EnerLuma</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.2rem)",
              color: "#1a2e35", letterSpacing: "0.02em",
              lineHeight: 1.05, marginBottom: 24, maxWidth: 720,
            }}>
              India's AI-Powered Energy & Water Intelligence Platform
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem",
              color: "#5a7a7e", lineHeight: 1.8, maxWidth: 600, marginBottom: 36,
            }}>
              EnerLuma transforms how households and organizations understand their electricity and water consumption — turning raw meter data into actionable intelligence through AI, real-time dashboards, and smart alerts.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/signup" style={{
                display: "inline-block", padding: "13px 36px", borderRadius: 100,
                background: "linear-gradient(135deg,#32C7C5,#1fa8a6)",
                color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(50,199,197,0.3)",
              }}>Try the Dashboard →</a>
              <a href="/how-it-works" style={{
                display: "inline-block", padding: "13px 36px", borderRadius: 100,
                border: "1.5px solid #d0e8e8", background: "transparent",
                color: "#2aada8", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none",
              }}>How It Works</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Dashboard Preview ─── */}
      <section style={{ padding: "0 32px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              borderRadius: 24, overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
              border: "1px solid rgba(50,199,197,0.15)",
            }}
          >
            <div style={{ background: "#1a2e35", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
              <span style={{ marginLeft: 12, fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>EnerLuma Dashboard — Overview</span>
            </div>
            <img
              src={IMG.dashboardOverview}
              alt="EnerLuma live dashboard — 24.9 kWh energy today, ₹176 daily cost, 1.6 kW current draw"
              style={{ width: "100%", height: "auto", maxHeight: 600, objectFit: "contain", objectPosition: "center", display: "block" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Who We Are ─── */}
      <section style={{ padding: "80px 32px", background: "#f7fbfb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 14, display: "block",
              }}>What We Built</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
                color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.08, marginBottom: 22,
              }}>A Full-Stack Smart Monitoring Platform</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                EnerLuma is a full-stack web application built with React, Node.js, and MongoDB that simulates an IoT-grade smart monitoring system. Using a realistic API-based data pipeline, it replicates how smart meters and sensors stream consumption data — without requiring physical hardware.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 28 }}>
                Users can manually log usage, upload utility bills for AI-powered extraction, view interactive consumption charts, receive AI-generated optimization recommendations, and track their sustainability progress over time — all from a single, beautiful dashboard.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {FEATURES.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 9,
                      background: "rgba(50,199,197,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#32C7C5", fontSize: "0.72rem", fontWeight: 800, flexShrink: 0,
                    }}>✓</div>
                    <div>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem", fontWeight: 600, color: "#1a2e35" }}>{f.t}</span>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8", marginLeft: 8 }}>— {f.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}>
                <img src={IMG.aiInsights} alt="EnerLuma AI Intelligence Hub showing Predictive Consumption Watch with HVAC, Water Heater and Lighting optimisation" style={{ width: "100%", height: "auto", maxHeight: 500, objectFit: "contain", objectPosition: "center", display: "block" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 56 }}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Our Purpose</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10,
            }}>Mission & Vision</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
            className="resp-grid-2"
          >
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                p1: "To make energy and water intelligence accessible to every household and organization in India. We believe that the first step toward sustainability is visibility — knowing exactly how much you consume, where it's wasted, and how to fix it.",
                p2: "EnerLuma provides that visibility through AI-driven dashboards that translate complex consumption data into simple, actionable steps anyone can take.",
              },
              {
                icon: "🌍",
                title: "Our Vision",
                p1: "A future where every Indian home runs on full resource transparency — where electricity leaks are caught before the bill arrives, water wastage is flagged in real time, and every rupee spent on utilities delivers maximum efficiency.",
                p2: "We envision smart cities where connected infrastructure, AI analytics, and community data sharing combine to create a genuinely sustainable India.",
              },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} style={{
                background: "#fff", borderRadius: 22, padding: "44px 38px",
                boxShadow: "0 2px 24px rgba(0,0,0,0.05)", border: "1px solid #eef5f5",
                transition: "all 0.35s",
              }}>
                <div style={{
                  width: 58, height: 58, borderRadius: 16,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 24, fontSize: "1.7rem",
                }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: "#1a2e35", marginBottom: 18, letterSpacing: "0.02em" }}>{card.title}</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.97rem", lineHeight: 1.82, color: "#5a7a7e", marginBottom: 14 }}>{card.p1}</p>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.94rem", lineHeight: 1.82, color: "#7a9a9e" }}>{card.p2}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section style={{ padding: "80px 32px", background: "#f7fbfb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Platform Metrics</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12 }}>What EnerLuma Delivers</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Real outcomes from smart monitoring — measurable reductions in waste, cost, and carbon emissions.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            className="resp-grid-4"
          >
            {STATS.map((item, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "36px 24px",
                  textAlign: "center", boxShadow: "0 2px 18px rgba(0,0,0,0.05)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <div style={{ fontSize: "1.9rem", marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "#32C7C5", marginBottom: 10 }}>{item.stat}</div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "#7a9a9e" }}>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Technology Stack ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Tech Stack</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12 }}>Built With Modern Technology</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              EnerLuma's full-stack architecture is designed for speed, reliability, and real-world scalability.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            className="resp-grid-4"
          >
            {TECH_STACK.map((t, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "32px 24px",
                  boxShadow: "0 2px 18px rgba(0,0,0,0.05)", border: "1px solid #eef5f5",
                  transition: "all 0.35s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{t.icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 6 }}>{t.role}</div>
                <h4 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em" }}>{t.name}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", lineHeight: 1.7, color: "#7a9a9e" }}>{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Dashboard Screens ─── */}
      <section style={{ padding: "90px 32px", background: "#f7fbfb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Live Platform</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12 }}>Inside the EnerLuma Dashboard</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              A glimpse of the analytics and sustainability insights that power smarter consumption decisions.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
            className="resp-grid-2"
          >
            {[
              { img: IMG.energySync, label: "⚡ Energy Auto-Sync", sub: "BESCOM linked — auto-syncs daily consumption every 24 hours" },
              { img: IMG.waterSync, label: "💧 Water Auto-Sync", sub: "Link your water utility for automatic daily sync" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}
                style={{
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <img src={s.img} alt={s.label} style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "top", display: "block" }} />
                <div style={{ padding: "20px 24px", background: "#fff" }}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a2e35", marginBottom: 4 }}>{s.label}</div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", color: "#9ab5b8" }}>{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "90px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.4rem", color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 18 }}>
              Start Monitoring Smarter Today
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", color: "#7a9a9e", lineHeight: 1.75, marginBottom: 36 }}>
              Sign up free, log your first consumption entry, and let EnerLuma's AI reveal exactly where your energy and water is going.
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
                border: "1.5px solid #d0e8e8", background: "transparent",
                color: "#2aada8", fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem",
                fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none",
              }}>Explore Services</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
