import { memo, useRef, useEffect, useState } from "react";

const WaveCanvas = memo(function WaveCanvas({ height = 70 }) {
  const cvs = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const c = cvs.current;
    if (!c) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(c);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const c = cvs.current;
    if (!c || !isVisible) return;

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let t = 0;
    let rafId;

    const resize = () => {
      W = c.width = c.offsetWidth || window.innerWidth;
      c.height = height;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const LAYERS = [
      { amp: 14, freq: 0.008, phase: 0, fill: "rgba(86,224,224,.15)", sp: 0.01 },
      { amp: 9, freq: 0.013, phase: 2.1, fill: "rgba(138,242,240,.12)", sp: 0.008 },
      { amp: 5, freq: 0.019, phase: 4.5, fill: "rgba(50,199,197,.08)", sp: 0.006 },
    ];

    let lastTs = 0;
    const FRAME_MS = 33; // ~30fps

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);

      if (ts - lastTs < FRAME_MS) return;
      lastTs = ts;

      t++;

      ctx.clearRect(0, 0, W, height);

      const mid = height / 2;

      LAYERS.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(0, mid);

        for (let x = 0; x <= W; x += 4) {
          ctx.lineTo(
            x,
            mid +
            Math.sin(x * l.freq + t * l.sp + l.phase) * l.amp +
            Math.sin(x * l.freq * 0.6 + t * l.sp * 0.7) *
            l.amp *
            0.38
          );
        }

        ctx.lineTo(W, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = l.fill;
        ctx.fill();
      });
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [height, isVisible]);

  return (
    <canvas
      ref={cvs}
      aria-hidden="true"
      style={{
        width: "100%",
        height,
        display: "block",
      }}
    />
  );
});

export default WaveCanvas;