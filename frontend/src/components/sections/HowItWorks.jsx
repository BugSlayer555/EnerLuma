import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../assets/images";

const STEPS = [
  { n: "01", title: "Connect Devices", desc: "Link your IoT sensors and smart meters to EnerLuma's cloud platform in minutes.", img: IMG.pipeline },
  { n: "02", title: "Monitor Usage", desc: "Track water and energy consumption in real-time with intuitive dashboards.", img: IMG.drops },
  { n: "03", title: "AI Analysis", desc: "Our AI engine identifies patterns, anomalies, and optimization opportunities.", img: IMG.analytics },
  { n: "04", title: "Optimize & Save", desc: "Receive actionable insights that reduce waste and lower your utility costs.", img: IMG.turbine },
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
        minHeight: 360,
        borderTop: "1px solid var(--el-border)",
      }}
    >
      {/* Image */}
      <motion.div
        initial={{ x: isEven ? -40 : 40, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          order: isEven ? 0 : 1,
          overflow: "hidden",
        }}
      >
        <img
          src={step.img}
          alt={step.title}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(.88) opacity(0.7) saturate(1.15)",
          }}
        />
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
          background: "var(--el-bg-1)",
        }}
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
              fontSize: "0.88rem",
              color: "var(--el-text-secondary)",
              marginTop: 14,
              lineHeight: 1.7,
              maxWidth: 380,
            }}
          >
            {step.desc}
          </p>
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
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
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
            03 — Process
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.4rem,4.5vw,4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--el-text-primary)",
              margin: 0,
            }}
          >
            How It <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>Works</span>
          </h2>
        </motion.div>

        {STEPS.map((s, i) => (
          <StepRow key={s.n} step={s} i={i} />
        ))}
      </div>
    </section>
  );
});

export default HowItWorks;