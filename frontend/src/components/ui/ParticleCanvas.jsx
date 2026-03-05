import { memo, useRef, useEffect } from "react";

const ParticleCanvas = memo(function ParticleCanvas() {
  const cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;

    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0,
      H = 0,
      rafId;

    let mx = 0,
      my = 0;

    const COUNT = 30;
    const CONN_DIST = 60;
    const CELL = CONN_DIST;

    let pts = [];

    const resize = () => {
      W = c.width = c.offsetWidth || window.innerWidth;
      H = c.height = c.offsetHeight || window.innerHeight;

      pts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.2 + 0.4,
        life: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.014 + 0.005,
        water: Math.random() > 0.45,
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

    // Use light theme colors for particles
    const colorA = "86,224,224"; // --el-accent
    const colorB = "50,199,197"; // --el-accent-heavy

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);

      if (ts - lastTs < FRAME_MS) return;
      lastTs = ts;

      ctx.clearRect(0, 0, W, H);

      pts.forEach((p) => {
        p.life += p.sp;
        p.x += p.vx;
        p.y += p.vy;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dsq = dx * dx + dy * dy;

        if (dsq < 10000) {
          const inv = (0.004 / Math.sqrt(dsq)) * 100;
          p.x -= dx * inv;
          p.y -= dy * inv;
        }

        if (p.x < 0) p.x = W;
        else if (p.x > W) p.x = 0;

        if (p.y < 0) p.y = H;
        else if (p.y > H) p.y = 0;

        const a = (Math.sin(p.life) * 0.38 + 0.55) * 0.58;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = p.water
          ? `rgba(${colorA},${a})`
          : `rgba(${colorB},${a})`;
        ctx.fill();
      });

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

              const dx = pts[i].x - pts[j].x;
              const dy = pts[i].y - pts[j].y;
              const d = Math.sqrt(dx * dx + dy * dy);

              if (d < CONN_DIST) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.strokeStyle = `rgba(${colorA},${(1 - d / CONN_DIST) * 0.15
                  })`;
                ctx.lineWidth = 0.5;
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
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
});

export default ParticleCanvas;