import { memo, useRef, useEffect } from "react";

const Cursor = memo(function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      // smooth lag effect
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      dot.style.transform = `translate3d(${mx - 3}px,${my - 3}px,0)`;
      ring.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="av-dot" ref={dotRef} />
      <div id="av-ring" ref={ringRef} />
    </>
  );
});

export default Cursor;