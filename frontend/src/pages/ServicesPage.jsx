import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ServicesPage() {
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
            Our Services
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
            Transforming resource consumption through intelligent monitoring and AI-powered analytics.
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
            {/* Intelligent Resource Monitoring Card */}
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
                📊
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Intelligent Resource Monitoring
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma provides a simulated yet realistic environment where users can explore how modern resource monitoring systems operate. Through intelligent data processing and AI-driven insights, the platform visualizes how electricity and water usage can be tracked, analyzed, and optimized.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Our monitoring service demonstrates how real-world smart infrastructure platforms collect sensor data, process it through analytical models, and present actionable insights through modern dashboards.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                Users can observe consumption patterns over time, detect anomalies, and understand how everyday behaviors influence energy and water usage.
              </p>
            </motion.div>

            {/* AI-Based Consumption Analytics Card */}
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
                🤖
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                AI-Based Consumption Analytics
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma integrates artificial intelligence to simulate predictive analytics used in advanced monitoring systems.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                By processing historical consumption patterns, the platform identifies trends and generates insights that help users understand potential inefficiencies.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                The analytics engine highlights unusual spikes in usage, predicts future consumption trends, and provides recommendations designed to improve efficiency and sustainability.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                This approach demonstrates how AI technology can empower households and organizations to make smarter resource management decisions.
              </p>
            </motion.div>

            {/* Smart Dashboard Visualization Card */}
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
                📈
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Smart Dashboard Visualization
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                The EnerLuma dashboard transforms raw usage data into visually engaging analytics.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Interactive charts, usage graphs, and trend visualizations allow users to quickly understand their resource consumption patterns. Instead of dealing with complicated data logs, users can simply explore visual insights that communicate important information instantly.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                These dashboards simulate real smart monitoring systems used by energy management platforms and urban infrastructure systems.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
