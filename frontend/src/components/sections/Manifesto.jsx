import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Manifesto = memo(function Manifesto() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--el-bg-gradient)",
        padding: "110px 0",
      }}
    >
      {/* Moving background rows */}
      <motion.div
        style={{
          x: x1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          marginBottom: 6,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,7vw,6rem)",
            letterSpacing: "0.09em",
            color: "var(--el-accent-light)",
            opacity: 0.45,
          }}
        >
          {"WATER · ENERGY · INTELLIGENCE · SUSTAINABILITY · AI · DATA · ".repeat(
            2
          )}
        </span>
      </motion.div>

      <motion.div
        style={{
          x: x2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,7vw,6rem)",
            letterSpacing: "0.09em",
            color: "var(--el-accent)",
            opacity: 0.3,
          }}
        >
          {"MONITOR · OPTIMIZE · REDUCE · CONSERVE · PROTECT · ANALYZE · ".repeat(
            2
          )}
        </span>
      </motion.div>

      {/* Center Quote */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform,opacity" }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,4rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              maxWidth: 820,
            }}
          >
            <span style={{ color: "var(--el-text-secondary)" }}>
              Resources are finite.{" "}
            </span>
            <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>
              Intelligence
            </span>
            <span style={{ color: "var(--el-text-secondary)" }}> is not.</span>
            <br />
            <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>
              We bridge both.
            </span>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9 }}
            style={{
              width: 64,
              height: 2,
              background: "var(--el-accent-heavy)",
              margin: "28px auto 0",
              transformOrigin: "center",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Manifesto;