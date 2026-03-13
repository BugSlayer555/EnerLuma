import { memo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagBtn from "../ui/MagBtn";

const LINKS = ["About", "Services", "How It Works", "Contact"];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "#000000";

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: scrolled ? "14px 48px" : "22px 48px",
          transition: "all 0.35s ease",
          background: scrolled ? "#ffffff" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 16px rgba(0,0,0,0.08)"
            : "none",
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
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#32C7C5 0%,#56E0E0 100%)",
              }}
            />

            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                  background:
                    "linear-gradient(90deg,#14b8a6,#2dd4bf,#14b8a6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                EnerLuma
              </div>

              <div
                style={{
                  fontSize: "0.48rem",
                  letterSpacing: "0.27em",
                  color: "#14b8a6",
                  textTransform: "uppercase",
                }}
              >
                Smart Consumption AI
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              gap: 36,
              alignItems: "center",
            }}
          >
            {LINKS.map((l) => {
              const linkPath = l === "About" ? "/about" 
                : l === "Services" ? "/services"
                : l === "How It Works" ? "/how-it-works"
                : l === "Contact" ? "/contact" 
                : "/";
              
              return (
                <Link
                  key={l}
                  to={linkPath}
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.13em",
                    textDecoration: "none",
                    color: textColor,
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                  }}
                >
                  {l}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MagBtn
                style={{
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.3)",
                  color: "#000",
                  padding: "9px 26px",
                  borderRadius: 100,
                  fontSize: "0.73rem",
                  letterSpacing: "0.13em",
                }}
              >
                Login
              </MagBtn>
            </Link>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <MagBtn
                style={{
                  background:
                    "linear-gradient(135deg,#32C7C5 0%,#56E0E0 100%)",
                  border: "none",
                  color: "#fff",
                  padding: "9px 28px",
                  borderRadius: 100,
                  fontSize: "0.73rem",
                  letterSpacing: "0.13em",
                }}
              >
                Register
              </MagBtn>
            </Link>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && <div onClick={closeMobile}></div>}
      </AnimatePresence>
    </>
  );
});

export default Navbar;