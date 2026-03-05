import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMG } from "../../assets/images";
import MagBtn from "../ui/MagBtn";

const Contact = memo(function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim() && email.trim();

  return (
    <section
      id="contact"
      style={{
        padding: "130px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <img
        src={IMG.dam}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(.92) opacity(0.5) saturate(1.15)",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, var(--el-bg-1) 0%, rgba(234, 244, 248, 0.5) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 700,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Section Heading */}
        <div style={{ marginBottom: 40 }}>
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
            05 — Connect
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.2rem,4vw,3.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--el-text-primary)",
              margin: 0,
            }}
          >
            Get <span style={{ color: "var(--el-accent-heavy)", fontStyle: "italic" }}>Early Access</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                <input
                  aria-label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    flex: "1 1 220px",
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: "1px solid var(--el-border)",
                    background: "var(--el-surface-light)",
                    color: "var(--el-text-primary)",
                    outline: "none",
                    fontFamily: "'Outfit',sans-serif",
                    boxShadow: "var(--el-shadow)",
                  }}
                />

                <input
                  type="email"
                  aria-label="Work email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: "1 1 220px",
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: "1px solid var(--el-border)",
                    background: "var(--el-surface-light)",
                    color: "var(--el-text-primary)",
                    outline: "none",
                    fontFamily: "'Outfit',sans-serif",
                    boxShadow: "var(--el-shadow)",
                  }}
                />
              </div>

              <MagBtn
                onClick={() => canSubmit && setSent(true)}
                style={{
                  background: "var(--el-accent-heavy)",
                  color: "#fff",
                  border: "none",
                  padding: "14px 40px",
                  borderRadius: 100,
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: canSubmit ? 1 : 0.5,
                  pointerEvents: canSubmit ? "auto" : "none",
                  boxShadow: "var(--el-shadow)",
                }}
              >
                Request Early Access
              </MagBtn>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                padding: "40px 30px",
                borderRadius: 18,
                background: "var(--el-surface-light)",
                border: "1px solid var(--el-border)",
                boxShadow: "var(--el-shadow)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  letterSpacing: "0.07em",
                  color: "var(--el-accent-heavy)",
                }}
              >
                YOU'RE IN.
              </div>

              <p
                style={{
                  marginTop: 8,
                  color: "var(--el-text-secondary)",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                Welcome to the future of resource intelligence,{" "}
                {name || "friend"}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

export default Contact;