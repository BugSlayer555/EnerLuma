import { memo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagBtn from "../ui/MagBtn";

const LINKS = ["About", "Services", "How It Works", "Contact"];

/* ── Hamburger icon (3-line → X morph) ──────────────────── */
function HamburgerIcon({ open, scrolled }) {
  const bar = {
    width: 22,
    height: 2,
    borderRadius: 2,
    background: scrolled ? "var(--el-text-primary)" : "#fff",
    transition: "all 0.35s cubic-bezier(.77,0,.18,1)",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: open ? 0 : 5,
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        position: "relative",
      }}
    >
      <span
        style={{
          ...bar,
          transform: open ? "translateY(1px) rotate(45deg)" : "none",
          position: open ? "absolute" : "relative",
        }}
      />
      <span
        style={{
          ...bar,
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      <span
        style={{
          ...bar,
          transform: open ? "translateY(-1px) rotate(-45deg)" : "none",
          position: open ? "absolute" : "relative",
        }}
      />
    </div>
  );
}

/* ── Mobile menu overlay ────────────────────────────────── */
const mobileMenuVariants = {
  closed: { opacity: 0, y: -20, transition: { duration: 0.25 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

function MobileMenu({ onClose }) {
  return (
    <motion.div
      variants={mobileMenuVariants}
      initial="closed"
      animate="open"
      exit="closed"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 899,
        background: "linear-gradient(180deg, rgba(10,26,26,0.97) 0%, rgba(6,47,47,0.97) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        paddingTop: 80,
      }}
    >
      {LINKS.map((l, i) => (
        <motion.a
          key={l}
          href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textDecoration: "none",
            color: "rgba(255,255,255,0.85)",
            textTransform: "uppercase",
            padding: "18px 0",
            width: "100%",
            textAlign: "center",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#56E0E0")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
        >
          {l}
        </motion.a>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginTop: 36,
          width: "70%",
          maxWidth: 280,
        }}
      >
        <Link to="/login" onClick={onClose} style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "13px 0",
              borderRadius: 100,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Login
          </button>
        </Link>
        <Link to="/signup" onClick={onClose} style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
              border: "none",
              color: "#fff",
              padding: "13px 0",
              borderRadius: 100,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(86,224,224,0.35)",
            }}
          >
            Register
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Navbar ────────────────────────────────────────── */
const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const textColor = scrolled ? "#1a1a1a" : "#fff";
  const subTextColor = scrolled ? "#1a1a1a" : "rgba(255,255,255,0.85)";

  return (
    <>
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
          padding: scrolled ? "12px 48px" : "22px 48px",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.07)"
            : "none",
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
          {/* ─── Logo ─── */}
          <a
            href="#"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            {/* Animated water-drop icon */}
            <div style={{ position: "relative", width: 38, height: 38 }}>
              <div
                className="av-ripple"
                style={{ borderColor: scrolled ? "var(--el-accent)" : "rgba(86,224,224,0.5)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 4,
                  borderRadius: "50%",
                  background: scrolled
                    ? "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)"
                    : "linear-gradient(135deg, rgba(50,199,197,0.9), rgba(86,224,224,0.9))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(86,224,224,0.4)",
                  transition: "background 0.4s",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2C8 2 4 6.5 4 9.5C4 11.4 5.8 13 8 13C10.2 13 12 11.4 12 9.5C12 6.5 8 2 8 2Z"
                    fill="#fff"
                    opacity=".95"
                  />
                  <path
                    d="M6 9.5C6 10.3 6.9 11 8 11"
                    stroke="rgba(50,199,197,0.6)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                  background: scrolled
                    ? "linear-gradient(90deg, #1D2A2E 0%, #32C7C5 50%, #1D2A2E 100%)"
                    : "linear-gradient(90deg, #fff 0%, #56E0E0 50%, #fff 100%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 4s linear infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: "background 0.4s",
                }}
              >
                EnerLuma
              </div>
              <div
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.27em",
                  color: subTextColor,
                  textTransform: "uppercase",
                  marginTop: 1,
                  transition: "color 0.4s",
                }}
              >
                Smart Consumption AI
              </div>
            </div>
          </a>

          {/* ─── Desktop Links ─── */}
          <div
            className="nav-desktop-links"
            style={{
              display: "flex",
              gap: 36,
              alignItems: "center",
            }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.13em",
                  textDecoration: "none",
                  color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)",
                  textTransform: "uppercase",
                  position: "relative",
                  transition: "color 0.35s",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--el-accent-heavy)";
                  const bar = e.currentTarget.querySelector(".nav-underline");
                  if (bar) bar.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "#1a1a1a"
                    : "rgba(255,255,255,0.9)";
                  const bar = e.currentTarget.querySelector(".nav-underline");
                  if (bar) bar.style.transform = "scaleX(0)";
                }}
              >
                {l}
                <span
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, #32C7C5, #56E0E0)",
                    borderRadius: 1,
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                    transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* ─── Desktop Auth Buttons ─── */}
          <div
            className="nav-desktop-auth"
            style={{ display: "flex", gap: 10, flexShrink: 0 }}
          >
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MagBtn
                style={{
                  background: "transparent",
                  border: scrolled
                    ? "1px solid rgba(86,224,224,0.35)"
                    : "1px solid rgba(255,255,255,0.35)",
                  color: textColor,
                  padding: "9px 26px",
                  borderRadius: 100,
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.73rem",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  transition: "all 0.35s",
                }}
              >
                Login
              </MagBtn>
            </Link>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <MagBtn
                style={{
                  background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                  border: "none",
                  color: "#fff",
                  padding: "9px 28px",
                  borderRadius: 100,
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.73rem",
                  fontWeight: 600,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(86,224,224,0.3)",
                  transition: "all 0.35s",
                }}
              >
                Register
              </MagBtn>
            </Link>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 901,
            }}
          >
            <HamburgerIcon open={mobileOpen} scrolled={scrolled} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu key="mobile-menu" onClose={closeMobile} />}
      </AnimatePresence>

      {/* ─── Responsive Styles ─── */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-auth  { display: none !important; }
          .nav-mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </>
  );
});

export default Navbar;