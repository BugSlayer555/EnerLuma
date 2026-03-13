import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
        paddingTop: "140px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"40\" height=\"40\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/></svg>')",
          backgroundSize: "40px 40px"
        }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <Link 
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              marginBottom: "40px",
              transition: "all 0.3s",
              padding: "10px 20px",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)"
            }}
          >
            ← Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "5rem",
              color: "#ffffff",
              marginBottom: "20px",
              letterSpacing: "0.05em",
              textShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.3rem",
              color: "rgba(255, 255, 255, 0.95)",
              maxWidth: "700px",
              lineHeight: "1.6"
            }}
          >
            Let's connect and explore the future of sustainable technology together.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info Grid Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Get in Touch Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ marginBottom: "60px" }}
          >
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3.5rem",
              color: "#32C7C5",
              marginBottom: "40px",
              letterSpacing: "0.05em",
              textAlign: "center"
            }}>
              Get in Touch
            </h2>
            
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "50px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)",
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                    borderRadius: "15px",
                    color: "#ffffff"
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✓</div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem",
                    marginBottom: "10px",
                    letterSpacing: "0.05em"
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem" }}>
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "25px" }}>
                    <label style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#333",
                      display: "block",
                      marginBottom: "10px"
                    }}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        borderRadius: "12px",
                        border: "2px solid #e0e0e0",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.3s",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#32C7C5"}
                      onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                    />
                  </div>

                  <div style={{ marginBottom: "25px" }}>
                    <label style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#333",
                      display: "block",
                      marginBottom: "10px"
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        borderRadius: "12px",
                        border: "2px solid #e0e0e0",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.3s",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#32C7C5"}
                      onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                    />
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <label style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#333",
                      display: "block",
                      marginBottom: "10px"
                    }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        borderRadius: "12px",
                        border: "2px solid #e0e0e0",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.3s",
                        resize: "vertical",
                        boxSizing: "border-box"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#32C7C5"}
                      onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "18px",
                      borderRadius: "12px",
                      border: "none",
                      background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                      color: "#ffffff",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.3rem",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(50, 199, 197, 0.3)",
                      transition: "all 0.3s"
                    }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* Grid Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
              marginBottom: "60px"
            }}
          >
            {/* Collaboration Opportunities Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)"
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px",
                fontSize: "2rem"
              }}>
                🤝
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Collaboration Opportunities
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma represents a conceptual demonstration of how AI-powered monitoring systems can support sustainable living. We encourage collaboration with individuals and organizations that share a passion for innovation and environmental responsibility.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                Whether you are exploring academic research, building new digital platforms, or simply interested in the future of smart cities, EnerLuma can serve as a foundation for discussion and experimentation.
              </p>
            </motion.div>

            {/* Contact Information Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)"
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px",
                fontSize: "2rem"
              }}>
                📍
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "30px",
                letterSpacing: "0.05em"
              }}>
                Contact Information
              </h2>
              
              <div style={{ marginBottom: "25px" }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#333",
                  marginBottom: "8px"
                }}>
                  Email
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "#32C7C5",
                  textDecoration: "none"
                }}>
                  contact@enerluma.ai
                </p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#333",
                  marginBottom: "8px"
                }}>
                  Location
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "#555"
                }}>
                  Innovation & Sustainability Lab
                </p>
              </div>

              <div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#333",
                  marginBottom: "8px"
                }}>
                  Working Hours
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "#555",
                  marginBottom: "5px"
                }}>
                  Monday – Friday
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "#555"
                }}>
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)",
                textAlign: "center"
              }}
            >
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 25px",
                fontSize: "2rem"
              }}>
                💬
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                We're Always Open
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                maxWidth: "800px",
                margin: "0 auto"
              }}>
                We are always open to conversations about technology, sustainability, and innovative digital solutions. If you are interested in learning more about EnerLuma, collaborating on sustainability-focused projects, or exploring how smart monitoring technologies can transform resource management, we would love to hear from you. Our team welcomes inquiries from students, researchers, developers, and organizations interested in the future of intelligent infrastructure.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
