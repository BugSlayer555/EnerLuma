import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HowItWorksPage() {
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
            How It Works
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
            Discover the technology behind EnerLuma's intelligent monitoring system.
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
            {/* Data Simulation Layer Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)",
                position: "relative"
              }}
            >
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.5rem",
                color: "#ffffff",
                fontWeight: "bold"
              }}>
                1
              </div>
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
                ⚡
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Data Simulation Layer
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                EnerLuma operates using a simulated API that generates realistic electricity and water consumption data. This approach allows the platform to demonstrate how real IoT devices and sensors would continuously stream usage data into a monitoring system.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                The simulation layer mimics the behavior of smart meters and sensors, producing data points that represent household resource consumption patterns.
              </p>
            </motion.div>

            {/* Data Processing and Analytics Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)",
                position: "relative"
              }}
            >
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.5rem",
                color: "#ffffff",
                fontWeight: "bold"
              }}>
                2
              </div>
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
                ⚙️
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2.5rem",
                color: "#32C7C5",
                marginBottom: "20px",
                letterSpacing: "0.05em"
              }}>
                Data Processing and Analytics
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Once the simulated data is generated, it is processed through a structured analytics pipeline.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                This system analyzes usage patterns, identifies anomalies, and converts raw data into meaningful insights. Advanced algorithms evaluate consumption trends and generate predictions about future usage.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                By replicating this architecture, EnerLuma demonstrates how modern smart infrastructure platforms process and interpret large volumes of data.
              </p>
            </motion.div>

            {/* Visualization and Insights Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(50, 199, 197, 0.1)",
                position: "relative"
              }}
            >
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #32C7C5 0%, #56E0E0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.5rem",
                color: "#ffffff",
                fontWeight: "bold"
              }}>
                3
              </div>
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
                Visualization and Insights
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                The final stage of the system focuses on presenting the processed information through intuitive dashboards.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555",
                marginBottom: "15px"
              }}>
                Users can explore charts, graphs, and analytics panels that illustrate their consumption patterns over time. These visualizations make it easy to understand complex data without requiring technical expertise.
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.7",
                color: "#555"
              }}>
                The goal is to transform raw information into actionable knowledge that encourages smarter resource consumption.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
