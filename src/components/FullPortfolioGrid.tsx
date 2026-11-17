"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Filter, Eye, ArrowUpRight, Sparkles } from "lucide-react";
import { Project, CATEGORIES, Category } from "@/data/projectsData";

interface PortfolioGridProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onHoverProject?: (project: Project) => void;
}

export default function FullPortfolioGrid({
  projects,
  onOpenProject,
  onHoverProject,
}: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Complete Archive
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Full Portfolio
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
            Explore all verified original works, the Abbay TV Corporate Media Pack, and the ETFC Adwa Fight Night Sponsorship Deck spanning television branding, corporate
            identities, tactile packaging, event posters, and high-CTR video packages.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="glass-pill px-4 py-2 self-start md:self-auto text-xs font-mono text-white/70">
          Showing <span className="text-amber-400 font-bold">{filteredProjects.length}</span> Works
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "glass-pill text-white/70 hover:text-white hover:border-white/30"
              }`}
              data-cursor="pointer"
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Editorial Dynamic Asymmetrical Grid with Intelligent Aspect Framing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {filteredProjects.map((project) => {
          // Determine optimal container aspect ratio based on original artwork proportions
          const isPortrait = project.aspectRatio < 0.88;
          const isSquare = project.aspectRatio >= 0.88 && project.aspectRatio <= 1.15;
          const isWide = project.aspectRatio > 1.4;

          const frameAspect = isPortrait
            ? "aspect-[3/4]"
            : isSquare
            ? "aspect-square"
            : isWide
            ? "aspect-[16/10]"
            : "aspect-[4/3]";

          return (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              onMouseEnter={() => onHoverProject?.(project)}
              className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              data-cursor="view"
              data-cursor-color={project.ambientColor}
              data-cursor-label="VIEW"
            >
              {/* Image Frame with Dual Layer: Soft Blurred Background + Crisp Uncropped Foreground */}
              <div className={`relative w-full overflow-hidden bg-[#07090d] ${frameAspect}`}>
                {/* Background ambient fill (blurred) to eliminate harsh letterboxing */}
                <div className="absolute inset-0 scale-110 filter blur-xl opacity-35 transition-opacity duration-500 group-hover:opacity-55">
                  <Image
                    src={project.coverImage}
                    alt=""
                    fill
                    aria-hidden
                    className="object-cover"
                  />
                </div>

                {/* Main Foreground Crisp Image: uses contain for portrait/square so NO typography or detail is cropped */}
                <div className="relative w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isPortrait || isSquare ? "object-contain" : "object-cover"
                      }`}
                    />
                  </div>
                </div>

                {/* Subtle Radial Glow Mask on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none mix-blend-color-dodge"
                  style={{
                    background: `radial-gradient(circle at center, ${project.ambientColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Category Pill Tag (Placed high with clean translucent backdrop) */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="glass-pill px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-amber-300 drop-shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Year Pill */}
                <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                  <span className="glass-pill px-2 py-0.5 rounded-full text-[10px] font-mono text-white/70">
                    {project.year}
                  </span>
                </div>

                {/* Quick Action Circle on Hover */}
                <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                  <div className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white shadow-xl">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-grow gap-2">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                    <span className="font-medium text-white/70 line-clamp-1">{project.client}</span>
                    {project.award && (
                      <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        ★ Award
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mt-1">
                    {project.description}
                  </p>
                </div>

                {/* Color Palette Swatches & Tags */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {project.dominantColors.slice(0, 3).map((hex, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-white/40">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="hover:text-white/70">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 glass-card rounded-3xl p-8">
          <p className="text-white/60 text-sm">No projects found in this category.</p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 px-4 py-2 glass-button text-xs text-amber-400 rounded-full"
          >
            Show All Projects
          </button>
        </div>
      )}
    </section>
  );
}
