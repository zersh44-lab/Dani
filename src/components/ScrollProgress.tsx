"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/[0.04] backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-200 shadow-[0_0_12px_rgba(245,158,11,0.9)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
