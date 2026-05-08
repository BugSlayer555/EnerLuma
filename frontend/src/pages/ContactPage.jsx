import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const TOPICS = [
  { icon: "🚀", label: "Get Started / Onboarding" },
  { icon: "📊", label: "Dashboard & Analytics" },
  { icon: "🤖", label: "AI Insights & Recommendations" },
  { icon: "📄", label: "Bill Upload & Data Entry" },
  { icon: "🌿", label: "Sustainability & Carbon Tracking" },
  { icon: "🔧", label: "Technical / API Questions" },
  { icon: "🎓", label: "Academic Research Collaboration" },
  { icon: "💼", label: "Enterprise / Organisation Use" },
];

const FAQS = [
  {
    q: "Is EnerLuma free to use?",
    a: "Yes — EnerLuma is completely free during the beta phase. Create an account, start logging consumption data, and explore all dashboard features at no cost.",
  },
  {
    q: "Do I need smart meters or IoT devices?",
    a: "No physical hardware is required. EnerLuma uses a simulated API data pipeline that replicates smart meter feeds. You can also enter readings manually or upload your utility bills directly.",
  },
  {
    q: "How does the AI generate recommendations?",
    a: "EnerLuma's AI engine analyses your historical consumption patterns, identifies anomalies (spikes or drops > 2 standard deviations from your baseline), and generates personalized savings tips with estimated monthly cost impact in rupees.",
  },
  {
    q: "What utility bills can I upload?",
    a: "You can upload electricity and water bills as JPEG, PNG, WebP, or PDF files up to 10 MB. EnerLuma parses the provider name, billing period, units consumed, and amount due automatically.",
  },
  {
    q: "How is my carbon footprint calculated?",
    a: "CO₂ emissions are calculated using standard grid emission factors (kg CO₂/kWh for electricity, kg CO₂/m³ for water). Your score is updated automatically each time you log new consumption data.",
  },
  {
    q: "Can I use EnerLuma for a research project?",
    a: "Absolutely. EnerLuma is an excellent platform for academic research on AI-driven sustainability, smart grid optimisation, and IoT analytics. Contact us to discuss data access and collaboration options.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", topic: "", message: "" });
    }, 5000);
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
        paddingTop: 160, paddingBottom: 100,
        background: "linear-gradient(160deg, #f0fafa 0%, #e8f9f9 50%, #ffffff 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, left: "8%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(50,199,197,0.08)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 100,
              background: "rgba(50,199,197,0.08)", border: "1px solid rgba(50,199,197,0.2)",
              fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 600,
              color: "#2aada8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28,
            }}>Get in Touch</motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.7 }} style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.2rem)",
              color: "#1a2e35", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: 24, maxWidth: 700,
            }}>
              We're Here to Help You Monitor Smarter
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.7, delay: 0.05 }} style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem",
              color: "#5a7a7e", lineHeight: 1.8, maxWidth: 580,
            }}>
              Whether you have a technical question, a research collaboration idea, or simply want to know more about EnerLuma's AI-powered monitoring platform — we'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Form + Info ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 52, alignItems: "start" }}
            className="resp-grid-contact"
          >
            {/* Form */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block",
              }}>Send a Message</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem", color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em" }}>
                Let's Start a Conversation
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", color: "#9ab5b8", lineHeight: 1.7, marginBottom: 30 }}>
                Fill out the form and our team will respond within 24 hours. You can also reach us directly at the contacts listed below.
              </p>

              <div style={{ background: "#fff", borderRadius: 22, padding: "40px 38px", boxShadow: "0 2px 24px rgba(0,0,0,0.05)", border: "1px solid #eef5f5" }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: 44, borderRadius: 18, background: "linear-gradient(135deg,#e8fafa,#d2f5f4)" }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "rgba(50,199,197,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 20px", fontSize: "1.6rem", color: "#32C7C5",
                    }}>✓</div>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: "#1a2e35", marginBottom: 10, letterSpacing: "0.02em" }}>Message Sent!</h3>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.97rem", color: "#5a7a7e", lineHeight: 1.7 }}>
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="resp-grid-2-form">
                      <div>
                        <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" style={inputBase}
                          onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Topic</label>
                      <select name="topic" value={formData.topic} onChange={handleChange} required style={{ ...inputBase, cursor: "pointer" }}
                        onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                      >
                        <option value="">Select a topic...</option>
                        {TOPICS.map((t, i) => <option key={i} value={t.label}>{t.icon} {t.label}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: 26 }}>
                      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.84rem", fontWeight: 600, color: "#1a2e35", display: "block", marginBottom: 8 }}>Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows="5"
                        placeholder="Tell us about your question, idea, or project. The more detail you give, the better we can help..."
                        style={{ ...inputBase, resize: "vertical", minHeight: 140 }}
                        onFocus={(e) => { e.target.style.borderColor = "#32C7C5"; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(50,199,197,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e0eaea"; e.target.style.background = "#fafcfc"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>

                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      type="submit" style={{
                        width: "100%", padding: "16px", borderRadius: 14, border: "none",
                        background: "linear-gradient(135deg,#32C7C5,#1fa8a6)",
                        color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: "0.92rem",
                        fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                        cursor: "pointer", boxShadow: "0 6px 20px rgba(50,199,197,0.28)",
                        transition: "all 0.3s",
                      }}
                    >Send Message →</motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 12, display: "block" }}>Direct Contacts</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem", color: "#1a2e35", marginBottom: 28, letterSpacing: "0.02em" }}>Reach Us Directly</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {[
                  { icon: "📧", title: "Email", value: "contact@enerluma.ai", sub: "We respond within 24 hours" },
                  { icon: "📍", title: "Location", value: "Smart Technology Innovation Lab", sub: "India — Remote-First Team" },
                  { icon: "🕐", title: "Working Hours", value: "Monday – Saturday", sub: "10:00 AM – 7:00 PM IST" },
                  { icon: "🐙", title: "GitHub", value: "github.com/enerluma", sub: "Open-source modules & API docs" },
                ].map((info, i) => (
                  <motion.div key={i} whileHover={{ x: 4 }} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    padding: "20px 18px", borderRadius: 16,
                    background: "#fff", boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
                    border: "1px solid #eef5f5", transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.25rem", flexShrink: 0,
                    }}>{info.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 3 }}>{info.title}</h4>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.94rem", fontWeight: 600, color: "#1a2e35", marginBottom: 2 }}>{info.value}</p>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.79rem", color: "#9ab5b8" }}>{info.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick topics */}
              <div style={{ background: "#f7fbfb", borderRadius: 18, padding: "24px 22px", border: "1px solid #eef5f5" }}>
                <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#32C7C5", marginBottom: 16 }}>Common Topics</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TOPICS.slice(0, 6).map((t, i) => (
                    <span key={i} style={{
                      padding: "6px 14px", borderRadius: 100,
                      background: "#fff", border: "1px solid #e0eaea",
                      fontFamily: "'Outfit',sans-serif", fontSize: "0.79rem",
                      color: "#5a7a7e", fontWeight: 500,
                    }}>{t.icon} {t.label}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Collaboration ─── */}
      <section style={{ padding: "90px 32px", background: "#f7fbfb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 56 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>Partnerships</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10, marginBottom: 14 }}>Who We Work With</motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.02rem", color: "#7a9a9e", maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
              EnerLuma welcomes collaboration from researchers, developers, sustainability advocates, and organisations looking to build smarter resource monitoring solutions.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}
            className="resp-grid-3"
          >
            {[
              {
                icon: "🎓", title: "Academic Research",
                desc: "Use EnerLuma's platform and API for AI sustainability research, smart grid studies, or IoT analytics papers. We can provide sandboxed data environments and technical support.",
                cta: "Research Enquiry",
              },
              {
                icon: "💻", title: "Developer Collaboration",
                desc: "Contribute to EnerLuma's open-source modules, build integrations with real smart meter APIs, or extend the AI engine with new predictive models. Our codebase is fully documented.",
                cta: "Developer Access",
              },
              {
                icon: "🏢", title: "Enterprise Deployment",
                desc: "Explore how EnerLuma's monitoring stack can be adapted for commercial buildings, university campuses, housing societies, or urban infrastructure projects.",
                cta: "Enterprise Enquiry",
              },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                style={{
                  background: "#fff", borderRadius: 22, padding: "38px 30px",
                  boxShadow: "0 2px 18px rgba(0,0,0,0.05)", border: "1px solid #eef5f5",
                  textAlign: "center", transition: "all 0.35s",
                }}
              >
                <div style={{
                  width: 58, height: 58, borderRadius: 16,
                  background: "linear-gradient(135deg,#e8fafa,#d2f5f4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 22px", fontSize: "1.7rem",
                }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.75rem", color: "#1a2e35", marginBottom: 14, letterSpacing: "0.02em" }}>{c.title}</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.91rem", lineHeight: 1.78, color: "#5a7a7e", marginBottom: 22 }}>{c.desc}</p>
                <a href="#contact-form" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
                  display: "inline-block", padding: "9px 22px", borderRadius: 100,
                  border: "1.5px solid #c0e4e3", color: "#2aada8",
                  fontFamily: "'Outfit',sans-serif", fontSize: "0.8rem", fontWeight: 600,
                  letterSpacing: "0.04em", textDecoration: "none",
                }}>{c.cta} →</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: "90px 32px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.span variants={fadeUp} style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#32C7C5" }}>FAQs</motion.span>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: "#1a2e35", letterSpacing: "0.02em", marginTop: 10 }}>Frequently Asked Questions</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {FAQS.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ delay: i * 0.05 }}
                style={{ background: "#fff", borderRadius: 16, border: "1px solid #eef5f5", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", padding: "22px 26px",
                    border: "none", background: "transparent", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  }}
                >
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.97rem", fontWeight: 600, color: "#1a2e35" }}>{faq.q}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: openFaq === i ? "rgba(50,199,197,0.12)" : "#f7fbfb",
                    border: "1px solid #e0eaea",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#32C7C5", fontSize: "1rem", flexShrink: 0,
                    transition: "all 0.25s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    style={{ padding: "0 26px 22px" }}
                  >
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.93rem", lineHeight: 1.8, color: "#5a7a7e", borderTop: "1px solid #f0f5f5", paddingTop: 18 }}>{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
