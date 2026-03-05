import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../assets/images";

const SVCS = [
  { id: "01", title: "Smart Monitoring", img: IMG.pipeline },
  { id: "02", title: "AI Insights", img: IMG.analytics },
  { id: "03", title: "Automated Alerts", img: IMG.grid },
  { id: "04", title: "Sustainability Analytics", img: IMG.solar },
];

const cardStyle = {
  borderRadius: 22,
  overflow: "hidden",
  position: "relative",
  height: 320,
  background: "var(--el-bg-4)",
  border: "1px solid var(--el-border)",
  boxShadow: "var(--el-shadow)",
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
      whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(17, 56, 64, 0.2)" }}
      style={cardStyle}
    >
      {/* Background Image */}
      <img
        src={s.img}
        alt={s.title}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.92) opacity(0.4) saturate(1.15)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, var(--el-bg-4), rgba(247, 252, 255, 0.25))",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
        }}
      >
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "var(--el-text-dim)",
            marginBottom: 8,
          }}
        >
          {s.id}
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.6rem",
            fontStyle: "italic",
            color: "var(--el-text-primary)",
            margin: 0,
          }}
        >
          {s.title}
        </h3>
      </div>
    </motion.article>
  );
});

const Services = memo(function Services() {
  return (
    <section
      id="services"
      style={{
        background: "var(--el-bg-3)",
        padding: "130px 0",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: 18,
          }}
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