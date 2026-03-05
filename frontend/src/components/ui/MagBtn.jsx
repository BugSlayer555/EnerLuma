import { memo, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MagBtn = memo(function MagBtn({
  children,
  style = {},
  onClick,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 260,
    damping: 20,
    mass: 0.6,
  });

  const sy = useSpring(y, {
    stiffness: 260,
    damping: 20,
    mass: 0.6,
  });

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();

      x.set((e.clientX - r.left - r.width / 2) * 0.28);
      y.set((e.clientY - r.top - r.height / 2) * 0.28);
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        ...style,
        x: sx,
        y: sy,
        willChange: "transform",
        cursor: "none",
      }}
    >
      {children}
    </motion.button>
  );
});

export default MagBtn;