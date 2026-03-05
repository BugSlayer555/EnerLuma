import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMG } from "../../assets/images";
import WordReveal from "../ui/WordReveal";
import WaveCanvas from "../ui/WaveCanvas";

const ABOUT_STATS = [
  { label: "Countries Served", value: "40+", icon: "🌍" },
  { label: "Sensors Deployed", value: "2.4M", icon: "📡" },
  { label: "Water Preserved", value: "12B L", icon: "💧" },
];

const About = memo(function About() {
  const r1 = useRef(null);
  const r2 = useRef(null);

  const v1 = useInView(r1, { once: true, margin: "-80px" });
  const v2 = useInView(r2, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      style={{
        background: "var(--el-bg-2)",
        padding: "130px 0 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
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
            01 — Our Story
          </motion.div>

          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.6rem,5vw,5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <WordReveal text="We believe" style={{ color: "var(--el-text-primary)" }} />
            <WordReveal text="every resource" style={{ color: "var(--el-accent-heavy)" }} />
            <WordReveal
              text="deserves intelligence."
              style={{ color: "var(--el-text-secondary)" }}
            />
          </div>
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

      {/* Ocean Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          marginTop: 40,
          position: "relative",
          height: 320,
          overflow: "hidden",
        }}
      >
        <img
          src={IMG.ocean}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.92) opacity(0.45) saturate(1.15)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--el-bg-2), transparent 25%, transparent 75%, var(--el-bg-2))",
          }}
        />

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