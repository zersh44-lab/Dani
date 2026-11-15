"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import { Project } from "@/data/projectsData";
import MagneticButton from "@/components/MagneticButton";

interface CoverflowProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenProject: (project: Project) => void;
}

export default function SelectedWorksCoverflow({
  projects,
  onSelectProject,
  onOpenProject,
}: CoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Sync ambient color on change
  useEffect(() => {
    if (projects[activeIndex]) {
      onSelectProject(projects[activeIndex]);
    }
  }, [activeIndex, projects, onSelectProject]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  const activeProject = projects[activeIndex];

  return (
    <section id="selected-work" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Curated Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Selected Works
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
            Interactive 3D Coverflow presentation of flagship brand identities, broadcast systems,
            and high-impact campaigns. Drag or use controls to browse.
          </p>
        </div>

        {/* Carousel Navigation Controls with Magnetic Physics */}
        <div className="flex items-center gap-3">
          <MagneticButton strength={0.4}>
            <button
              onClick={handlePrev}
              className="glass-button p-3 rounded-full text-white/80 hover:text-white group cursor-pointer"
              data-cursor="pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </MagneticButton>

          <span className="text-xs font-mono text-white/60 px-3.5 py-1.5 glass-pill">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>

          <MagneticButton strength={0.4}>
            <button
              onClick={handleNext}
              className="glass-button p-3 rounded-full text-white/80 hover:text-white group cursor-pointer"
              data-cursor="pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* 3D Coverflow Stage */}
      <div
        className="relative perspective-container w-full h-[450px] sm:h-[540px] md:h-[620px] flex items-center justify-center overflow-hidden py-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);

            // Hide cards that are far away from current view
            if (absOffset > 2) return null;

            const rotateY = offset * -32; // degrees
            const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 160 : 240); // responsive spacing
            const translateZ = -absOffset * 180; // px depth
            const scale = 1 - absOffset * 0.15;
            const opacity = 1 - absOffset * 0.35;
            const zIndex = 20 - absOffset;
            const isCenter = offset === 0;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isCenter) {
                    onOpenProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[280px] sm:w-[420px] md:w-[540px] rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCenter ? "glass-panel coverflow-reflect shadow-[0_30px_70px_rgba(0,0,0,0.8)]" : "opacity-60"
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                data-cursor="view"
                data-cursor-color={project.ambientColor}
                data-cursor-label={isCenter ? "EXPLORE" : "SELECT"}
              >
                {/* Image Container with high aspect ratio preservation */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/70 p-2">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={isCenter}
                    />
                  </div>

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                  {/* Card Info Overlay */}
                  <div className="absolute inset-x-4 sm:inset-x-5 bottom-4 sm:bottom-5 flex flex-col gap-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30">
                        {project.category}
                      </span>
                      <span className="text-[11px] text-white/50">{project.year}</span>
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-white/70 line-clamp-1">{project.client}</p>

                    {isCenter && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-1.5">
                          {project.dominantColors.slice(0, 3).map((col, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: col }}
                              title={col}
                            />
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                          <span>View Case Study</span>
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Thumbnail Jump Strip */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 overflow-x-auto pb-2">
        {projects.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-16 h-10 sm:w-20 sm:h-12 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
                  : "w-12 h-8 sm:w-16 sm:h-10 border border-white/15 opacity-50 hover:opacity-100"
              }`}
              title={proj.title}
              data-cursor="pointer"
            >
              <Image
                src={proj.coverImage}
                alt={proj.title}
                fill
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Active Project Details Callout below Coverflow */}
      {activeProject && (
        <div className="mt-6 max-w-2xl mx-auto text-center glass-card rounded-2xl p-5 animate-in fade-in duration-500">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
            Active Selection: {activeProject.category}
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{activeProject.description}</p>
          {activeProject.metrics && (
            <div className="mt-3 inline-block text-xs font-mono text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              ⚡ {activeProject.metrics}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
