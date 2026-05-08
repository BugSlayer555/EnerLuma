import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../../assets/images";

const SVCS = [
  {
    id: "01",
    title: "Dashboard Overview",
    desc: "Real-time KPI cards showing energy today (24.9 kWh), estimated daily cost (₹176), current draw, and AI vs actual consumption chart.",
    img: IMG.dashboardOverview,
  },
  {
    id: "02",
    title: "AI Intelligence Hub",
    desc: "Predictive Consumption Watch — HVAC, Water Heater & Lighting runtime optimisation with ₹/month savings and CO₂ impact.",
    img: IMG.aiInsights,
  },
  {
    id: "03",
    title: "Monitoring Alerts",
    desc: "Set custom energy & water thresholds. Get instant alerts for High Energy Spikes, Water Leaks, and Device Offline events.",
    img: IMG.analyticsCharts,
  },
  {
    id: "04",
    title: "Sustainability Tracker",
    desc: "Track Eco-Score (64/100), 142 kg CO₂ this month, 2.4 trees equivalent, and carbon footprint trend vs community average.",
    img: IMG.sustainabilityDashboard,
  },
];

const cardStyle = {
  borderRadius: 24,
  overflow: "hidden",
  position: "relative",
  background: "#ffffff",
  border: "1px solid #eef5f5",
  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
};

const ServiceCard = memo(function ServiceCard({ s, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(17, 56, 64, 0.18)" }}
      style={cardStyle}
    >
      {/* Image at top */}
      <div style={{ height: 200, background: "#f0fdfd", padding: 20 }}>
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Content at bottom */}
      <div
        style={{
          padding: "30px 28px",
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--el-accent-heavy)",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          {s.id}
        </div>

        <h3
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "1.7rem",
            letterSpacing: "0.04em",
            color: "var(--el-text-primary)",
            margin: "0 0 10px",
            lineHeight: 1.1,
          }}
        >
          {s.title}
        </h3>

        <p
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "0.9rem",
            color: "var(--el-text-secondary)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {s.desc}
        </p>
      </div>
    </motion.article>
  );
});

const Services = memo(function Services() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      style={{
        background: "var(--el-bg-3)",
        padding: "130px 0",
      }}
      className="resp-section-pad"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }} className="resp-container">

        {/* Section heading */}
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
              marginBottom: 16,
            }}
          >
            02 — Platform Modules
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.4rem,4.5vw,4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--el-text-primary)",
              margin: "0 0 14px",
            }}
          >
            Four modules.{" "}
            <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>
              One platform.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.98rem",
              color: "var(--el-text-secondary)",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            Each card below shows the actual EnerLuma dashboard — energy monitoring,
            AI insights, consumption analytics, and sustainability tracking.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: 20,
          }}
          className="resp-grid-2"
        >
          {SVCS.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;