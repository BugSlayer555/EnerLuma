import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../../assets/images";
import WordReveal from "../../ui/WordReveal";
import WaveCanvas from "../../ui/WaveCanvas";

const ABOUT_STATS = [
  { label: "Data Points Tracked", value: "100+", icon: "📊" },
  { label: "Avg. Energy Savings", value: "30%", icon: "⚡" },
  { label: "Water Waste Reduced", value: "25%", icon: "💧" },
];

const About = memo(function About() {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);

  const v1 = useInView(r1, { once: true, margin: "-80px" });
  const v2 = useInView(r2, { once: true, margin: "-80px" });
  const v3 = useInView(r3, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      style={{
        background: "var(--el-bg-2)",
        padding: "130px 0 0",
        overflow: "hidden",
      }}
      className="resp-section-pad"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }} className="resp-container">
        {/* Heading */}
        <div ref={r1} style={{ marginBottom: 68 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={v1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.63rem",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--el-accent-heavy)",
              marginBottom: 18,
            }}
          >
            01 — What We Built
          </motion.div>

          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.6rem,5vw,5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <WordReveal text="AI that turns" style={{ color: "var(--el-text-primary)" }} />
            <WordReveal text="meter readings" style={{ color: "var(--el-accent-heavy)" }} />
            <WordReveal
              text="into savings."
              style={{ color: "var(--el-text-secondary)" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={v1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(0.95rem,1.3vw,1.1rem)",
              color: "var(--el-text-secondary)",
              lineHeight: 1.8,
              maxWidth: 580,
              marginTop: 24,
            }}
          >
            EnerLuma is a full-stack smart monitoring platform that transforms raw electricity
            and water consumption data into real-time AI insights — helping households and
            organisations reduce waste, cut utility bills, and track their sustainability progress.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          ref={r2}
          initial={{ opacity: 0, y: 30 }}
          animate={v2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 24,
            marginBottom: 80,
          }}
        >
          {ABOUT_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={v2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              style={{
                padding: "18px 0",
                borderBottom: "1px solid var(--el-border)",
              }}
            >
              <div style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                {s.icon}
              </div>

              <div
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--el-text-dim)",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>

              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.05em",
                  color: "var(--el-accent-heavy)",
                }}
              >
                {s.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dashboard Preview Banner */}
      <motion.div
        ref={r3}
        initial={{ opacity: 0, y: 40 }}
        animate={v3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        style={{
          marginTop: 60,
          padding: "0 48px",
          position: "relative",
          overflow: "visible",
        }}
      >
        <img
          src={IMG.dashboardOverview}
          alt="EnerLuma live dashboard — 24.9 kWh energy today, ₹176 daily cost, 1.6 kW current draw"
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "700px",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            borderRadius: "12px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        />

        {/* Removed the dimming gradients */}



        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.25,
          }}
        >
          <WaveCanvas height={50} />
        </div>
      </motion.div>
    </section>
  );
});

export default About;