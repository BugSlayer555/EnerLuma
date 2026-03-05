import { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../../assets/images";

import ParticleCanvas from "../ui/ParticleCanvas";
import WaveCanvas from "../ui/WaveCanvas";
import MagBtn from "../ui/MagBtn";
import HeroCanvas from "../ui/HeroCanvas"; // NEW Import

const Hero = memo(function Hero() {
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 700], [1.05, 1.12]);

  return (
    <section
      aria-label="Hero section"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--el-bg-1)",
      }}
    >
      {/* BACKGROUND IMAGES (Lightened) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          scale: imageScale,
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <div style={{ position: "absolute", inset: 0, width: "50%" }}>
          <img
            src={IMG.heroWater}
            alt=""
            aria-hidden="true"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.92) opacity(0.55) saturate(1.15)",
            }}
          />
        </div>

        <div style={{ position: "absolute", inset: 0, left: "50%", width: "50%" }}>
          <img
            src={IMG.heroEnergy}
            alt=""
            aria-hidden="true"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.92) opacity(0.55) saturate(1.15)",
            }}
          />
        </div>
      </motion.div>

      {/* PARTICLES */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.35 }}>
        <ParticleCanvas />
      </div>

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "radial-gradient(ellipse 85% 75% at 50% 88%, rgba(234,244,248,0.85), transparent)",
        }}
      />

      {/* CONTENT SPLIT: LEFT TEXT, RIGHT 3D MODEL */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        maxWidth: 1440,
        margin: "0 auto",
        width: "100%"
      }}>

        {/* LEFT TEXT */}
        <motion.div
          style={{
            flex: "1",
            padding: "0 60px",
            y: textY,
            opacity: heroOpacity,
            pointerEvents: "auto",
            willChange: "transform,opacity",
            zIndex: 21,
          }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(4rem,10vw,8rem)",
              letterSpacing: "0.08em",
              color: "var(--el-text-primary)",
              marginBottom: 16,
              lineHeight: 0.9,
              textShadow: "var(--el-glow-soft)",
            }}
          >
            EnerLuma
          </h1>

          <p
            style={{
              fontFamily: "'Crimson Pro',serif",
              fontSize: "clamp(1rem,2vw,1.3rem)",
              fontStyle: "italic",
              color: "var(--el-text-secondary)",
              maxWidth: 520,
              marginBottom: 36,
              lineHeight: 1.7,
            }}
          >
            AI-powered sustainability intelligence for the infrastructure of tomorrow.
          </p>

          <MagBtn
            style={{
              background: "var(--el-accent-heavy)",
              border: "1px solid var(--el-border)",
              color: "#fff",
              padding: "14px 38px",
              borderRadius: 100,
              fontFamily: "'Outfit',sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              boxShadow: "var(--el-shadow)",
            }}
          >
            Explore Platform
          </MagBtn>
        </motion.div>

        {/* RIGHT 3D MODEL */}
        <div style={{
          flex: "1",
          height: "100%",
          position: "relative",
          zIndex: 20,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ width: "100%", height: "80%", transform: "scale(1.2)" }}>
            <HeroCanvas />
          </div>
        </div>

      </div>

      {/* WAVE */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          opacity: 0.2,
        }}
      >
        <WaveCanvas height={66} />
      </div>
    </section>
  );
});

export default Hero;