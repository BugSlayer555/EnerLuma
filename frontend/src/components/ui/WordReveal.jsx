import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const WordReveal = memo(function WordReveal({
  text,
  delay = 0,
  style = {},
  wordStyle,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <span
      ref={ref}
      style={{
        display: "block",
        overflow: "hidden",
        ...style,
      }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.065,
          }}
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            willChange: "transform,opacity",
            ...(wordStyle ? wordStyle(i) : {}),
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
});

export default WordReveal;