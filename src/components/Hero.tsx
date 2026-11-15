"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Award, Sparkles, FileText } from "lucide-react";
import { DESIGNER_INFO, Project } from "@/data/projectsData";
import MagneticButton from "@/components/MagneticButton";

interface HeroProps {
  featuredProject?: Project;
  onOpenProject?: (project: Project) => void;
  onOpenMediaPack?: () => void;
}

export default function Hero({ featuredProject, onOpenProject, onOpenMediaPack }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-36 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* 2-Column Responsive Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
        {/* Left Column: Typographic & Brand Identity Introduction */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Top Studio Identity Pill */}
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 mb-5 max-w-full overflow-hidden text-ellipsis shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-in fade-in slide-in-from-top-3 duration-700">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-white/90 tracking-wide truncate">
              Lead Brand Identity & Visual Designer
            </span>
            <span className="hidden sm:inline-block text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 shrink-0">
              Dani Studio
            </span>
          </div>

          {/* Oversized Cinematic Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/40 uppercase leading-[0.92] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            {DESIGNER_INFO.name.split(" ")[0]}
          </h1>

          {/* Role & Specialization Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 my-3 sm:my-4 text-xs sm:text-sm md:text-base font-light tracking-wide text-white/80">
            <span className="text-amber-400 font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Lead Visual & Broadcast Identity Designer
            </span>
            <span className="text-white/20">✦</span>
            <span>Creative Director</span>
            <span className="text-white/20">✦</span>
            <span className="text-white/50">Addis Ababa, Ethiopia</span>
          </div>

          {/* Refined Studio Bio */}
          <p className="text-sm sm:text-base lg:text-lg text-white/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            {DESIGNER_INFO.bio}
          </p>

          {/* Credential Indicators */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mt-5">
            <div className="glass-pill px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Art Direction</span>
            </div>
            <div className="glass-pill px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-white/80">
              <span className="text-amber-400 font-bold">10+</span>
              <span>Years Directing Visuals</span>
            </div>
            {onOpenMediaPack ? (
              <button
                onClick={onOpenMediaPack}
                className="glass-pill hover:border-amber-400/40 px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-amber-300 hover:text-white transition-colors cursor-pointer"
                title="Launch 37-Page Official Media Kit"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">37P</span>
                <span>Media Kit Official</span>
              </button>
            ) : (
              <a
                href="#portfolio"
                className="glass-pill hover:border-amber-400/40 px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">37P</span>
                <span>Media Kit</span>
              </a>
            )}
          </div>

          {/* Action CTA Buttons with Magnetic Physics */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mt-7">
            <MagneticButton strength={0.4}>
              <a
                href="#selected-work"
                className="glass-button px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2 group cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                data-cursor="pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowDown className="w-4 h-4 text-amber-400 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.4}>
              <a
                href="#contact"
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white/85 hover:text-white glass-card hover:border-amber-400/40 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
                data-cursor="pointer"
              >
                <span>Start Dialogue</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Dani's Authentic Creative Director Portrait Centerpiece */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] group"
          >
            {/* Gentle Floating Motion Wrapper */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
              className="relative"
            >
              {/* Dual Ambient Glow Behind Portrait (Cyan & Amber) */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] opacity-60 filter blur-3xl transition-opacity duration-700 pointer-events-none group-hover:opacity-85"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(14, 165, 233, 0.45) 0%, rgba(212, 175, 55, 0.35) 50%, transparent 75%)",
                }}
              />

              {/* Main Liquid Glass Frame */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden glass-panel border border-white/20 p-2 sm:p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl bg-black/40 transition-all duration-500 group-hover:border-white/35">
                {/* Top Specular Line Shine */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent z-20 pointer-events-none" />

                {/* Crisp Uncropped Portrait Container */}
                <div className="relative aspect-[764/1024] w-full rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-[#020e1a]">
                  <Image
                    src="/images/dani-portrait.webp"
                    alt="Portrait of Dani (Daniel), Lead Brand Identity and Broadcast Visual Designer, holding creative design tools and artwork"
                    width={764}
                    height={1024}
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 440px"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Subtle Vignette at bottom for badge contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                  {/* Ambient Rim Lighting Gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr from-sky-400 via-transparent to-amber-300 pointer-events-none mix-blend-screen" />

                  {/* Floating Glass Metadata Badge on Portrait */}
                  <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3.5 sm:bottom-3.5 p-2.5 sm:p-3 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl bg-black/60 shadow-2xl flex items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300">
                          Daniel (Dani)
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-semibold text-white truncate">
                        Lead Visual & Broadcast Designer
                      </p>
                    </div>
                    <div className="shrink-0 p-1.5 sm:p-2 rounded-xl glass-pill text-amber-400">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Real Statistics Ribbon */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
        {DESIGNER_INFO.stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-3.5 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-white/60 uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}