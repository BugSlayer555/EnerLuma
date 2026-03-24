import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 4000);
  };

  const inputBase = {
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: "1.5px solid #e0eaea", fontFamily: "'Outfit',sans-serif",
    fontSize: "0.95rem", outline: "none", transition: "all 0.25s",
    boxSizing: "border-box", background: "#fafcfc", color: "#1a2e35",
  };

  return (
    <div style={{ background: "#ffffff" }}>
      {/* ─── Hero ─── */}
      <section style={{
        paddingTop: 160, paddingBottom: 90,
        background: "linear-gradient(180deg, #f0fafa 0%, #e4f7f7 40%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }} className="resp-hero">
        <div style={{
          position: "absolute", top: -80, left: "10%",
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(50,199,197,0.08)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }} className="resp-container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.15)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24,
            }}>Get in Touch</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.08, marginBottom: 20, maxWidth: 650,
            }}>
              Let's Build a Sustainable Future Together
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.12rem",
              color: "#5a7a7e", lineHeight: 1.75, maxWidth: 560,
            }}>
              Have a question, idea, or collaboration proposal? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Form + Info ─── */}
      <section style={{ padding: "90px 32px" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 50, alignItems: "start" }}
            className="resp-grid-contact"
          >
            {/* Form */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Send a Message</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em",
              }}>Get in Touch</h2>
              <p style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", color: "#9ab5b8",
                lineHeight: 1.7, marginBottom: 30,
              }}>Fill out the form and our team will get back to you promptly.</p>

              <div style={{
                background: "#fff", borderRadius: 20, padding: "40px 36px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: "1px solid #eef5f5",
              }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    style={{
                      textAlign: "center", padding: 44, borderRadius: 16,
                      background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "rgba(50,199,197,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 18px", fontSize: "1.5rem", color: "#32C7C5",
                    }}>✓</div>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#1a2e35", marginBottom: 8, letterSpacing: "0.02em" }}>Message Sent!</h3>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", color: "#5a7a7e" }}>Thank you for reaching out. We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="resp-grid-2-form">
                      <div>
                        <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What is this regarding?" style={inputBase}
                        onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Tell us about your inquiry..." style={{ ...inputBase, resize: "vertical", minHeight: 130 }}
                        onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      type="submit" style={{
                        width: "100%", padding: "15px", borderRadius: 12, border: "none",
                        background: "linear-gradient(135deg,#32C7C5,#56E0E0)",
                        color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem",
                        fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                        cursor: "pointer", boxShadow: "0 4px 16px rgba(50,199,197,0.22)",
                        transition: "all 0.3s",
                      }}
                    >Send Message →</motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Contact Info</span>
              <h2 style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem",
                color: "#1a2e35", marginBottom: 30, letterSpacing: "0.02em",
              }}>Reach Us Directly</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📧", title: "Email", value: "contact@enerluma.ai", sub: "We respond within 24 hours" },
                  { icon: "📍", title: "Location", value: "Innovation & Sustainability Lab", sub: "Smart Technology Hub" },
                  { icon: "🕐", title: "Working Hours", value: "Monday – Friday", sub: "9:00 AM – 6:00 PM" },
                  { icon: "🌐", title: "Social", value: "Follow EnerLuma", sub: "Stay updated on innovations" },
                ].map((info, i) => (
                  <motion.div key={i} whileHover={{ x: 3 }} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    padding: "20px 18px", borderRadius: 16,
                    background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                    border: "1px solid #eef5f5", transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.2rem", flexShrink: 0,
                    }}>{info.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 3 }}>{info.title}</h4>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a2e35", marginBottom: 2 }}>{info.value}</p>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", color: "#9ab5b8" }}>{info.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Collaboration ─── */}
      <section style={{ padding: "80px 32px", background: "#f7fbfb" }} className="resp-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.span variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5",
            }}>Collaborate With Us</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 12,
            }}>Join the Sustainability Movement</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e",
              maxWidth: 620, margin: "0 auto", lineHeight: 1.7,
            }}>We welcome partnerships with researchers, developers, students, and organizations who share our passion for sustainability.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
            className="resp-grid-3"
          >
            {[
              { icon: "🎓", title: "Academic Research", desc: "Explore EnerLuma as a research platform for AI-driven sustainability, smart grid optimization, and IoT analytics." },
              { icon: "💻", title: "Developer Partnerships", desc: "Build on EnerLuma's technology stack and collaborate on next-generation sustainability monitoring tools." },
              { icon: "🏢", title: "Enterprise Solutions", desc: "Discover how smart monitoring can be adapted for commercial buildings, campuses, and urban infrastructure." },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                style={{
                  background: "#fff", borderRadius: 20, padding: "36px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)", border: "1px solid #eef5f5",
                  textAlign: "center", transition: "all 0.35s",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", fontSize: "1.6rem",
                }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", color: "#1a2e35", marginBottom: 12, letterSpacing: "0.02em" }}>{c.title}</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem", lineHeight: 1.75, color: "#5a7a7e" }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "70px 32px", textAlign: "center" }} className="resp-section">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem",
              color: "#1a2e35", letterSpacing: "0.02em", marginBottom: 16,
            }}>We're Always Open to Conversation</motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem",
              color: "#7a9a9e", lineHeight: 1.7,
            }}>Whether you're exploring sustainability tech, building smart solutions, or simply curious about AI-powered monitoring — let's connect.</motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
