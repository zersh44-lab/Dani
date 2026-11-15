"use client";

import { useEffect, useState } from "react";

interface AmbientProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export default function AmbientBackground({
  primaryColor = "rgba(212, 175, 55, 0.35)", // Gold default
  secondaryColor = "rgba(26, 71, 73, 0.28)", // Deep teal default
}: AmbientProps) {
  const [ambientPrimary, setAmbientPrimary] = useState(primaryColor);
  const [ambientSecondary, setAmbientSecondary] = useState(secondaryColor);

  useEffect(() => {
    if (primaryColor) setAmbientPrimary(primaryColor);
    if (secondaryColor) setAmbientSecondary(secondaryColor);
  }, [primaryColor, secondaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Deep Obsidian Layer */}
      <div className="absolute inset-0 bg-[#05070a]" />

      {/* Floating Liquid Wave Video Texture from Element resources */}
      <div className="absolute inset-0 opacity-[0.14] mix-blend-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 filter blur-[1px]"
        >
          <source src="/wave.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Primary Dynamic Glowing Orb 1 (Top Left / Center) */}
      <div
        className="absolute -top-[15%] left-[10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full filter blur-[140px] opacity-70 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${ambientPrimary} 0%, rgba(212,175,55,0.05) 50%, transparent 75%)`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Secondary Dynamic Glowing Orb 2 (Right / Center) */}
      <div
        className="absolute top-[35%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full filter blur-[160px] opacity-60 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${ambientSecondary} 0%, rgba(14,165,233,0.04) 50%, transparent 75%)`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Tertiary Dynamic Orb 3 (Bottom Left) */}
      <div
        className="absolute -bottom-[10%] left-[25%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full filter blur-[150px] opacity-50 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${ambientPrimary} 0%, transparent 70%)`,
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Studio Film Grain & Specular Mesh Overlay */}
      <div className="absolute inset-0 liquid-noise pointer-events-none" />

      {/* Soft Vignette Mask to preserve razor-sharp readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05070a]/40 to-[#05070a]/90 pointer-events-none" />
    </div>
  );
}
