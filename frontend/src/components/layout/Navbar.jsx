import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MagBtn from "../ui/MagBtn";

const LINKS = ["About", "Services", "How It Works", "Contact"];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId = null;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 55);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        padding: scrolled ? "13px 48px" : "26px 48px",
        transition:
          "padding .4s ease, background .4s ease, border-color .4s ease",
        background: scrolled ? "var(--el-surface-light)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--el-border)"
          : "1px solid transparent",
        willChange: "transform",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ position: "relative", width: 38, height: 38 }}>
            <div className="av-ripple" style={{ borderColor: "var(--el-accent)" }} />
            <div
              style={{
                position: "absolute",
                inset: 5,
                borderRadius: "50%",
                background: "var(--el-bg-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--el-glow-soft)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 2C8 2 4 6.5 4 9.5C4 11.4 5.8 13 8 13C10.2 13 12 11.4 12 9.5C12 6.5 8 2 8 2Z"
                  fill="var(--el-accent-heavy)"
                  opacity=".9"
                />
                <path
                  d="M6 9.5C6 10.3 6.9 11 8 11"
                  stroke="var(--el-bg-1)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div>
            <div
              className="av-shimmer"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "1.4rem",
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
            <div
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.27em",
                color: "var(--el-text-secondary)",
                textTransform: "uppercase",
                marginTop: 1,
              }}
            >
              Smart Consumption AI
            </div>
          </div>
        </a>

        {/* Links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {LINKS.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.07 }}
              whileHover={{ color: "var(--el-accent-heavy)" }}
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.13em",
                textDecoration: "none",
                color: "var(--el-text-secondary)",
                textTransform: "uppercase",
                position: "relative",
              }}
            >
              {l}

              <motion.div
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "var(--el-accent)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MagBtn
              style={{
                background: "transparent",
                border: "1px solid var(--el-border)",
                color: "var(--el-text-primary)",
                padding: "9px 26px",
                borderRadius: 100,
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.73rem",
                fontWeight: 500,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
              }}
            >
              Login
            </MagBtn>
          </Link>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <MagBtn
              style={{
                background: "var(--el-accent-heavy)",
                border: "none",
                color: "#fff",
                padding: "9px 28px",
                borderRadius: 100,
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.73rem",
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                boxShadow: "var(--el-shadow)",
              }}
            >
              Register
            </MagBtn>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
});

export default Navbar;