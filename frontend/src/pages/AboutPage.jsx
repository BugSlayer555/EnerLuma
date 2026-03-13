import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPage() {
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
            About EnerLuma
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
            Bringing intelligence and transparency to resource consumption through AI-driven analytics.
          </motion.p>
        </div>
      </section>

      {/* Grid Content Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px"
            }}
          >
            {/* Our Mission Card */}
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
                💡
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Our Mission
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma is designed to bring intelligence and transparency to how households consume essential resources like electricity and water. In a world where sustainability is becoming increasingly important, understanding consumption patterns is the first step toward meaningful change.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Our platform leverages simulated IoT data and AI-driven analytics to provide a realistic view of how modern smart monitoring systems work.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                The goal of EnerLuma is not just monitoring, but awareness.
              </p>
            </motion.div>

            {/* What EnerLuma Represents Card */}
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
                🔬
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                What EnerLuma Represents
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma represents the intersection of three important ideas: technology, sustainability, and intelligence.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Traditional monitoring systems often provide raw numbers that are difficult to interpret. EnerLuma transforms those numbers into clear insights using interactive visualizations and predictive analytics.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                The platform demonstrates how AI-powered systems can monitor consumption patterns and suggest improvements.
              </p>
            </motion.div>

            {/* Vision for the Future Card */}
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
                🌍
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Vision for the Future
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                The long-term vision of EnerLuma is to support a future where homes, buildings, and cities operate with full transparency in their resource consumption.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Imagine a world where every household understands how much electricity appliances consume, where water leaks are detected instantly, and where AI suggests the most efficient way to reduce energy bills.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                EnerLuma is a conceptual demonstration of how these systems can work together to create smarter, greener communities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
