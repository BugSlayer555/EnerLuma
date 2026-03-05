import { memo } from "react";

const TICKER_ITEMS = [
  "Smart Water Management",
  "AI Energy Optimization",
  "Real-time Monitoring",
  "Predictive Analytics",
  "IoT Sensor Network",
  "Carbon Tracking",
  "Automated Alerts",
  "ESG Reporting",
  "Sustainability AI",
  "Net Zero Intelligence",
];

const wrapperStyle = {
  background: "var(--el-accent-heavy)", // Darker teal background for ticker
  padding: "13px 0",
  overflow: "hidden",
};

const itemStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 20,
  fontFamily: "'Outfit',sans-serif",
  fontSize: "0.68rem",
  fontWeight: 600,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#fff", // White text on dark teal
  padding: "0 32px",
};

const dotStyle = {
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: "var(--el-bg-1)",
  flexShrink: 0,
};

const Ticker = memo(function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={wrapperStyle} aria-hidden="true">
      <div className="av-ticker">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} style={itemStyle}>
            <span style={dotStyle} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});

export default Ticker;