import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MagBtn from "../ui/MagBtn";
import enerlLogo from "../../assets/enerluma-logo.png";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Direct DOM scroll handler — sets data-scrolled attribute
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const update = () => {
      const sy = window.scrollY || document.documentElement.scrollTop || 0;
      if (sy > 20) {
        nav.setAttribute("data-scrolled", "true");
      } else {
        nav.removeAttribute("data-scrolled");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        data-page={isHome ? "home" : "inner"}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="site-navbar"
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo-link">
            <img
              src={enerlLogo}
              alt="EnerLuma Logo"
              className="nav-logo-circle"
              style={{
                width: 36,
                height: 36,
                objectFit: "contain",
              }}
            />
            <div>
              <div className="nav-logo-text">EnerLuma</div>
              <div className="nav-logo-sub">Smart Consumption AI</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            {LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="nav-auth-desktop">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MagBtn
                style={{
                  background: "transparent",
                  border: "var(--nav-login-border)",
                  color: "var(--nav-login-color)",
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
                  background: "linear-gradient(135deg,#32C7C5 0%,#56E0E0 100%)",
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

          {/* Hamburger Button (mobile only) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="nav-mobile-panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {LINKS.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`nav-mobile-link ${isActive ? "nav-mobile-link-active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="nav-mobile-divider" />

              <div className="nav-mobile-auth">
                <Link to="/login" className="nav-mobile-auth-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="nav-mobile-register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}