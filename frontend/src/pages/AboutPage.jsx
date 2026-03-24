import { motion } from "framer-motion";
import { IMG } from "../assets/images";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function AboutPage() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 90,
        background: "linear-gradient(180deg, #f0fafa 0%, #e4f7f7 40%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }} className="resp-hero">
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 400, height: 400, borderRadius: "50%",
          border: "1px solid rgba(50,199,197,0.1)",
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: "10%",
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(50,199,197,0.04)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }} className="resp-container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.15)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: 24,
            }}>About EnerLuma</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              color: "#1a2e35", letterSpacing: "0.02em",
              lineHeight: 1.08, marginBottom: 20, maxWidth: 650,
            }}>
              Powering the Future of Smart Consumption
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.12rem",
              color: "#5a7a7e", lineHeight: 1.75, maxWidth: 560,
            }}>
              Bringing intelligence and transparency to resource consumption through AI-driven analytics and simulated smart monitoring systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Introduction ─── */}
      <section style={{ padding: "90px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Who We Are</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem",
                color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: 22,
              }}>Reimagining How We Monitor Resources</h2>
              <p style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "1rem",
                lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18,
              }}>
                EnerLuma is a conceptual smart monitoring platform that demonstrates how AI-powered analytics can transform the way households and organizations consume energy and water. Using simulated API-based data streams, we replicate the experience of real IoT monitoring systems.
              </p>
              <p style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "1rem",
                lineHeight: 1.85, color: "#5a7a7e", marginBottom: 28,
              }}>
                Our platform bridges the gap between complex consumption data and actionable insights, making sustainability accessible through intuitive dashboards and intelligent analytics.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["API-driven simulated sensor data", "Real-time consumption visualization", "AI-powered pattern recognition"].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: "rgba(50,199,197,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#32C7C5", fontSize: "0.7rem", fontWeight: 800, flexShrink: 0,
                    }}>✓</div>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem", fontWeight: 500, color: "#3a5a5e" }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src={IMG.smartHome} alt="Smart home technology" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} className="resp-img" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section style={{ padding: "80px 32px", background: "#f7fbfb" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Our Purpose</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10,
            }}>Mission & Vision</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} whileHover={{ y: -6 }} style={{
              background: "#fff", borderRadius: 20, padding: "44px 36px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: "1px solid #eef5f5",
              transition: "all 0.35s",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 22, fontSize: "1.6rem",
              }}>🎯</div>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: "#1a2e35", marginBottom: 16, letterSpacing: "0.02em" }}>Our Mission</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.98rem", lineHeight: 1.8, color: "#5a7a7e", marginBottom: 14 }}>
                To empower individuals and communities with intelligent tools that reveal hidden patterns in energy and water consumption.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "#7a9a9e" }}>
                EnerLuma transforms raw data into actionable insights using cutting-edge AI. Understanding resource usage is the first step toward sustainable living.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ y: -6 }} style={{
              background: "#fff", borderRadius: 20, padding: "44px 36px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: "1px solid #eef5f5",
              transition: "all 0.35s",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 22, fontSize: "1.6rem",
              }}>🌍</div>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: "#1a2e35", marginBottom: 16, letterSpacing: "0.02em" }}>Our Vision</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.98rem", lineHeight: 1.8, color: "#5a7a7e", marginBottom: 14 }}>
                A world where every home, building, and city operates with full transparency in resource consumption — powered by artificial intelligence.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "#7a9a9e" }}>
                We envision smart communities where water leaks are detected in seconds, energy waste is eliminated, and every individual contributes to a sustainable future.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Impact Stats ─── */}
      <section style={{ padding: "80px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Why It Matters</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12,
            }}>The Impact of Smart Consumption</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e",
              maxWidth: 580, margin: "0 auto", lineHeight: 1.7,
            }}>Smart monitoring technology can significantly reduce waste and optimize resource usage across households and buildings.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
            className="resp-grid-4"
          >
            {[
              { stat: "30%", label: "Energy savings with smart monitoring", icon: "⚡" },
              { stat: "25%", label: "Water waste reduction through AI", icon: "💧" },
              { stat: "50B+", label: "IoT devices projected by 2030", icon: "📡" },
              { stat: "40%", label: "Carbon reduction in smart buildings", icon: "🌿" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                style={{
                  background: "#fff", borderRadius: 18, padding: "32px 24px",
                  textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  border: "1px solid #eef5f5", transition: "all 0.35s",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{item.icon}</div>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                  color: "#32C7C5", marginBottom: 8,
                }}>{item.stat}</div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", lineHeight: 1.55, color: "#7a9a9e" }}>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── AI in Sustainability ─── */}
      <section style={{ padding: "90px 32px", background: "#f7fbfb" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src={IMG.aiDashboard} alt="AI analytics" style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }} className="resp-img" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>AI & Sustainability</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem",
                color: "#1a2e35", lineHeight: 1.1, marginBottom: 22, letterSpacing: "0.02em",
              }}>How AI Drives Sustainable Living</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                AI is at the core of EnerLuma's approach. By analyzing consumption patterns, algorithms identify inefficiencies and predict future usage trends, enabling proactive resource management.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 26 }}>
                From anomaly detection that catches water leaks to predictive models that optimize energy usage, AI transforms passive monitoring into active intelligence.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="resp-grid-2-inner">
                {[
                  { t: "Pattern Recognition", d: "Analyzing consumption trends" },
                  { t: "Anomaly Detection", d: "Flagging unusual spikes" },
                  { t: "Predictive Analytics", d: "Forecasting future demand" },
                  { t: "Smart Suggestions", d: "AI-driven efficiency tips" },
                ].map((f, i) => (
                  <div key={i} style={{
                    padding: "14px 16px", borderRadius: 12,
                    background: "#fff", border: "1px solid #eef5f5",
                  }}>
                    <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", fontWeight: 700, color: "#1a2e35", marginBottom: 3 }}>{f.t}</h4>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", color: "#9ab5b8" }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Future Vision ─── */}
      <section style={{ padding: "90px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
            className="resp-grid-2"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Future Vision</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem",
                color: "#1a2e35", lineHeight: 1.1, marginBottom: 22, letterSpacing: "0.02em",
              }}>Smart Homes · Smart Cities · Sustainable Future</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 18 }}>
                EnerLuma envisions a future where every household understands electricity consumption per appliance, water leaks are detected in real time, and AI suggests the most efficient ways to reduce bills and environmental impact.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#5a7a7e", marginBottom: 24 }}>
                As smart cities evolve, platforms like EnerLuma demonstrate how connected infrastructure, AI analytics, and transparent data can create communities that are genuinely sustainable.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Transparent resource consumption across buildings",
                  "AI-optimized energy grids reducing carbon footprint",
                  "Real-time water management preventing waste",
                  "Connected communities sharing sustainability insights",
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#32C7C5", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem", color: "#5a7a7e" }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src={IMG.smartCity} alt="Smart city" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} className="resp-img" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
