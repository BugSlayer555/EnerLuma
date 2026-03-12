import { memo, useRef, useEffect } from "react";

/**
 * Enhanced particle canvas for dark hero background.
 * Renders floating teal particles with glowing energy-line connections.
 */
const HeroParticles = memo(function HeroParticles() {
  const cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0,
      H = 0,
      rafId;
    let mx = -9999,
      my = -9999;

    const COUNT = 55;
    const CONN_DIST = 130;
    const CELL = CONN_DIST;
    let pts = [];

    const resize = () => {
      W = c.width = c.offsetWidth || window.innerWidth;
      H = c.height = c.offsetHeight || window.innerHeight;
      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.08,
        r: Math.random() * 1.6 + 0.5,
        life: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.012 + 0.004,
        isNode: Math.random() > 0.85,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    let lastMouseT = 0;
    const onMouse = (e) => {
      const now = performance.now();
      if (now - lastMouseT < 32) return;
      lastMouseT = now;
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const buildGrid = () => {
      const grid = new Map();
      pts.forEach((p, idx) => {
        const key = `${Math.floor(p.x / CELL)},${Math.floor(p.y / CELL)}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(idx);
      });
      return grid;
    };

    let lastTs = 0;
    const FRAME_MS = 16.67;

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);
      if (ts - lastTs < FRAME_MS) return;
      lastTs = ts;

      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        p.life += p.sp;
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = mx - p.x;
        const dy = my - p.y;
        const dsq = dx * dx + dy * dy;
        if (dsq < 15000) {
          const inv = (0.005 / Math.sqrt(dsq)) * 80;
          p.x -= dx * inv;
          p.y -= dy * inv;
        }

        // Wrap around edges
        if (p.x < -10) p.x = W + 10;
        else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        else if (p.y > H + 10) p.y = -10;

        const pulse = Math.sin(p.life) * 0.3 + 0.7;
        const a = (p.isNode ? 0.65 : 0.4) * pulse;
        const radius = p.isNode ? p.r * 2.2 : p.r;
        const color = p.isNode ? "50,199,197" : "86,224,224";

        // Outer glow for energy nodes
        if (p.isNode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3.5, 0, 6.2832);
          ctx.fillStyle = `rgba(${color},${a * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 6.2832);
        ctx.fillStyle = `rgba(${color},${a})`;
        ctx.fill();
      });

      // Energy-line connections
      const grid = buildGrid();
      const checked = new Set();

      pts.forEach((p, i) => {
        const cx = Math.floor(p.x / CELL);
        const cy = Math.floor(p.y / CELL);

        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            const neighbors = grid.get(`${nx},${ny}`);
            if (!neighbors) continue;

            neighbors.forEach((j) => {
              if (j <= i) return;
              const key = i * COUNT + j;
              if (checked.has(key)) return;
              checked.add(key);

              const ddx = pts[i].x - pts[j].x;
              const ddy = pts[i].y - pts[j].y;
              const d = Math.sqrt(ddx * ddx + ddy * ddy);

              if (d < CONN_DIST) {
                const lineAlpha = (1 - d / CONN_DIST) * 0.22;
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = `rgba(86,224,224,${lineAlpha})`;
                ctx.lineWidth =
                  pts[i].isNode || pts[j].isNode ? 1.0 : 0.5;
                ctx.stroke();
              }
            });
          }
        }
      });
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
});

export default HeroParticles;
