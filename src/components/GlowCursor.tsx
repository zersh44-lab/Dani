"use client";

import { useEffect, useState, useRef } from "react";

export default function GlowCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "text">("default");
  const [activeColor, setActiveColor] = useState<string>("rgba(212, 175, 55, 0.45)"); // default warm gold
  const [labelText, setLabelText] = useState<string>("");

  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable if device supports fine pointer (mouse/trackpad) and prefers no reduced motion
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasPointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor reactions
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, textarea, select, [role='button'], [data-cursor='pointer']");
      const card = target.closest("[data-cursor='view'], .portfolio-card, [data-project-id]");
      const customColor = target.closest("[data-cursor-color]")?.getAttribute("data-cursor-color");
      const customLabel = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");

      if (customColor) {
        setActiveColor(customColor);
      } else {
        // Fallback default warm gold
        setActiveColor("rgba(212, 175, 55, 0.45)");
      }

      if (card) {
        setCursorType("view");
        setLabelText(customLabel || "VIEW");
      } else if (interactive) {
        setCursorType("pointer");
        setLabelText("");
      } else if (target.closest("h1, h2, h3, p")) {
        setCursorType("text");
        setLabelText("");
      } else {
        setCursorType("default");
        setLabelText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth animation loop using LERP
    const loop = () => {
      const ease = 0.18; // smooth trailing speed
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * ease;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  // Compute cursor sizes based on state
  let haloSize = 48;
  let haloOpacity = 0.6;
  if (cursorType === "pointer") {
    haloSize = 64;
    haloOpacity = 0.85;
  } else if (cursorType === "view") {
    haloSize = 130;
    haloOpacity = 0.95;
  } else if (cursorType === "text") {
    haloSize = 36;
    haloOpacity = 0.4;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Outer ambient trailing glow halo */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 rounded-full transition-[width,height,background] duration-300 ease-out flex items-center justify-center"
        style={{
          width: `${haloSize}px`,
          height: `${haloSize}px`,
          background: `radial-gradient(circle, ${activeColor} 0%, rgba(255,255,255,0.04) 50%, transparent 75%)`,
          boxShadow: cursorType === "view" ? `0 0 40px ${activeColor}` : undefined,
          backdropFilter: cursorType === "view" ? "blur(3px)" : undefined,
        }}
      >
        {cursorType === "view" && labelText && (
          <span className="text-[10px] font-semibold tracking-widest text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] px-2 py-0.5 rounded-full bg-black/40 border border-white/20 uppercase animate-in fade-in zoom-in-75 duration-200">
            {labelText}
          </span>
        )}
      </div>

      {/* Center point dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)] transition-[width,height,opacity] duration-150"
        style={{
          width: cursorType === "view" ? "4px" : cursorType === "pointer" ? "8px" : "5px",
          height: cursorType === "view" ? "4px" : cursorType === "pointer" ? "8px" : "5px",
          opacity: cursorType === "view" ? 0.3 : 1,
        }}
      />
    </div>
  );
}
