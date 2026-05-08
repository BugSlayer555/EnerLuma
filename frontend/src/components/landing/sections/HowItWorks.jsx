import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../../assets/images";

const STEPS = [
  {
    n: "01",
    title: "Log Your Data",
    desc: "Enter electricity or water readings manually, or link your Indian utility provider (e.g. BESCOM) for automatic 24-hour sync. EnerLuma connects to your utility account and pulls daily consumption without manual entry.",
    img: IMG.energySync,
  },
  {
    n: "02",
    title: "AI Analyses Patterns",
    desc: "The AI Intelligence Hub processes your data — detecting anomalies, forecasting the next 30 days, and generating smart recommendations like tuning HVAC, Water Heater, and Lighting runtime to save ₹163–₹183/month.",
    img: IMG.aiInsights,
  },
  {
    n: "03",
    title: "Monitor Live Alerts",
    desc: "Real-time Monitoring Alerts fire instantly when thresholds are crossed — High Energy Spikes, Water Leak Detected (continuous flow for 20 min), or Device Offline. Set your own monthly kWh and litre limits.",
    img: IMG.analyticsCharts,
  },
  {
    n: "04",
    title: "Track Sustainability",
    desc: "The Sustainability module calculates your carbon footprint (142 kg CO₂ this month), compares you against community averages, and shows your improving carbon footprint trend over the last 6 months.",
    img: IMG.sustainabilityDashboard,
  },
];

const StepRow = memo(function StepRow({ step, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 380,
        borderTop: "1px solid var(--el-border)",
      }}
      className="resp-grid-2"
    >
      {/* Dashboard Screenshot */}
      <motion.div
        initial={{ x: isEven ? -40 : 40, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          order: isEven ? 0 : 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={step.img}
          alt={`EnerLuma ${step.title} dashboard`}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 400,
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            background: "#f0fdfd",
          }}
        />
        {/* Step badge overlay */}
        <div style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "6px 16px",
          borderRadius: 100,
          background: "rgba(50,199,197,0.95)",
          backdropFilter: "blur(10px)",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "0.95rem",
          letterSpacing: "0.15em",
          color: "#ffffff",
        }}>
          STEP {step.n}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ x: isEven ? 40 : -40, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.9,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          order: isEven ? 1 : 0,
          display: "flex",
          alignItems: "center",
          padding: "48px 56px",
          background: "#ffffff",
        }}
        className="resp-step-content"
      >
        <div>
          <div
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--el-accent-heavy)",
              marginBottom: 10,
            }}
          >
            Step {step.n}
          </div>

          <h3
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,2.6vw,2.6rem)",
              fontStyle: "italic",
              color: "var(--el-text-primary)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {step.title}
          </h3>

          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.9rem",
              color: "var(--el-text-secondary)",
              marginTop: 16,
              lineHeight: 1.78,
              maxWidth: 400,
            }}
          >
            {step.desc}
          </p>

          <a
            href="/how-it-works"
            style={{
              display: "inline-block",
              marginTop: 24,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--el-accent-heavy)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              borderBottom: "1px solid currentColor",
              paddingBottom: 2,
            }}
          >
            Learn more →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});

const HowItWorks = memo(function HowItWorks() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="how-it-works"
      style={{
        background: "var(--el-bg-1)",
        padding: "130px 0",
      }}
      className="resp-section-pad"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }} className="resp-container">
        {/* Section Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 60 }}
        >
          <div
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
            03 — How It Works
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.4rem,4.5vw,4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--el-text-primary)",
              margin: "0 0 16px",
            }}
          >
            From meter reading to{" "}
            <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>
              AI insight
            </span>{" "}
            in 4 steps.
          </h2>
          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.98rem",
              color: "var(--el-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Log usage or upload a bill → AI processes & detects anomalies → Analytics
            dashboard visualises everything → Sustainability score tracks your progress.
          </p>
        </motion.div>

        {STEPS.map((s, i) => (
          <StepRow key={s.n} step={s} i={i} />
        ))}
      </div>
    </section>
  );
});

export default HowItWorks;