import { memo } from "react";

const COLS = [
  {
    title: "Platform",
    items: ["Features", "Pricing", "Security", "API Docs"],
  },
  {
    title: "Company",
    items: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Resources",
    items: ["Docs", "Case Studies", "Support", "Status"],
  },
];

const linkStyle = {
  fontFamily: "'Outfit',sans-serif",
  fontSize: "0.78rem",
  fontWeight: 400,
  color: "var(--el-footer-text)",
  opacity: 0.7,
  marginBottom: 10,
  textDecoration: "none",
  display: "block",
  transition: "opacity .18s, color .18s",
};

const Footer = memo(function Footer() {
  return (
    <footer
      style={{
        background: "var(--el-footer-bg-1)",
        padding: "58px 48px 26px",
        borderTop: "1px solid var(--el-footer-border)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
          {/* Brand */}
          <div style={{ flex: "1 1 240px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                marginBottom: 13,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--el-bg-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2C8 2 4 6.5 4 9.5C4 11.4 5.8 13 8 13C10.2 13 12 11.4 12 9.5C12 6.5 8 2 8 2Z"
                    fill="var(--el-accent-heavy)"
                    opacity=".9"
                  />
                </svg>
              </div>

              <span
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.25rem",
                  letterSpacing: "0.1em",
                  color: "var(--el-footer-text)",
                }}
              >
                ENERLUMA
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.77rem",
                fontWeight: 300,
                color: "var(--el-footer-text)",
                opacity: 0.6,
                lineHeight: 1.8,
                maxWidth: 240,
              }}
            >
              AI-powered water & energy intelligence.
              <br />
              Protecting Earth's most vital resources.
            </p>
          </div>

          {/* Columns */}
          {COLS.map((col) => (
            <div key={col.title} style={{ flex: "0 0 130px" }}>
              <div
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "0.57rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--el-footer-accent)",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>

              {col.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--el-footer-accent)";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--el-footer-text)";
                    e.currentTarget.style.opacity = "0.7";
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: 44,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.61rem",
              letterSpacing: "0.12em",
              color: "var(--el-footer-text)",
              opacity: 0.4,
            }}
          >
            © 2025 EnerLuma Technologies Inc.
          </div>

          <div
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.61rem",
              letterSpacing: "0.12em",
              color: "var(--el-footer-accent)",
              opacity: 0.6,
            }}
          >
            ✦ Competing for Awwwards Site of the Day
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;