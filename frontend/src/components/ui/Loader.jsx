import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Loader = memo(function Loader({ onDone, videoReady }) {
  const [pct, setPct] = useState(0);
  const videoReadyRef = useRef(videoReady);

  useEffect(() => {
    videoReadyRef.current = videoReady;
  }, [videoReady]);

  useEffect(() => {
    let v = 0;
    let timeoutId;

    const id = setInterval(() => {
      if (v < 85) {
        // Fast phase: race to 85%
        v += Math.random() * 18 + 6;
        v = Math.min(v, 85);
      } else if (!videoReadyRef.current) {
        // Slow crawl while waiting for video to buffer
        v += Math.random() * 0.4;
        v = Math.min(v, 95);
      } else {
        // Video ready — finish up
        v = 100;
        clearInterval(id);
        timeoutId = setTimeout(() => onDone?.(), 420);
      }

      setPct(Math.round(v));
    }, 70);

    return () => {
      clearInterval(id);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "var(--el-bg-gradient)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="av-shimmer"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,9vw,7rem)",
            letterSpacing: "0.1em",
            lineHeight: 1,
            background: "linear-gradient(90deg, var(--el-text-primary) 0%, var(--el-accent-heavy) 40%, var(--el-text-primary) 80%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EnerLuma
        </div>
      </motion.div>

      {/* Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          width: 200,
          height: 2,
          marginTop: 24,
          transformOrigin: "left",
          background:
            "linear-gradient(90deg, transparent, var(--el-accent-heavy), transparent)",
        }}
      />

      {/* Percent */}
      <div
        style={{
          marginTop: 16,
          fontFamily: "'Outfit',sans-serif",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--el-text-secondary)",
        }}
      >
        {pct}% — Initializing AI Systems
      </div>

      {/* Water drops */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [80, -8], opacity: [0, 0.7, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8 + i * 0.32,
              delay: i * 0.24,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              left: `${14 + i * 16}%`,
              width: 1.5,
              height: 38,
              background: "linear-gradient(to top,transparent,var(--el-accent-heavy))",
              borderRadius: 2,
              willChange: "transform,opacity",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

export default Loader;