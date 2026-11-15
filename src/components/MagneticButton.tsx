"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  dataCursor?: string;
  dataCursorColor?: string;
  dataCursorLabel?: string;
  as?: "button" | "a" | "div";
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
  dataCursor = "pointer",
  dataCursorColor,
  dataCursorLabel,
  as = "button",
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    setIsPointerDevice(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isPointerDevice) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === "a" ? "a" : as === "button" ? "button" : "div";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        onClick={onClick}
        href={href}
        className={className}
        data-cursor={dataCursor}
        data-cursor-color={dataCursorColor}
        data-cursor-label={dataCursorLabel}
      >
        {children}
      </Component>
    </motion.div>
  );
}
