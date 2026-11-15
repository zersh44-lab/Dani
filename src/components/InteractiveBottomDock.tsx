"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Layers,
  Sparkles,
  ArrowUp,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import { Project } from "@/data/projectsData";

interface BottomDockProps {
  activeProject: Project;
  onPrevProject: () => void;
  onNextProject: () => void;
  onOpenProject: (project: Project) => void;
  onOpenMediaPack: () => void;
  activeSection: string;
}

export default function InteractiveBottomDock({
  activeProject,
  onPrevProject,
  onNextProject,
  onOpenProject,
  onOpenMediaPack,
  activeSection,
}: BottomDockProps) {
  const [mode, setMode] = useState<"controller" | "navigation">("controller");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolled(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
        isScrolled ? "opacity-75 scale-95 translate-y-1" : "opacity-100 scale-100"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/15 backdrop-blur-2xl bg-black/60 max-w-[calc(100vw-24px)]"
        style={{
          boxShadow: `0 20px 50px rgba(0,0,0,0.9), 0 0 35px -10px ${activeProject.ambientColor}`,
        }}
      >
        {/* Mode Toggle Capsule */}
        <button
          onClick={() => setMode(mode === "controller" ? "navigation" : "controller")}
          className="relative p-2 rounded-full text-white/60 hover:text-white glass-pill hover:border-white/30 transition-all"
          title={`Switch to ${mode === "controller" ? "Navigation" : "Controller"} Mode`}
          data-cursor="pointer"
        >
          {mode === "controller" ? (
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Compass className="w-3.5 h-3.5 text-amber-400" />
          )}
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-0.5" />

        <AnimatePresence mode="wait">
          {mode === "controller" ? (
            /* CONTROLLER MODE (Inspired by UI Animation and Microinteractions) */
            <motion.div
              key="controller"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 sm:gap-2"
            >
              {/* PREV BUTTON */}
              <button
                onClick={onPrevProject}
                onMouseEnter={() => setHoveredTab("prev")}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                data-cursor="pointer"
              >
                {hoveredTab === "prev" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PREV</span>
              </button>

              {/* CENTER ACTIVE ACTION: EXPLORE COLLECTION */}
              <button
                onClick={() => onOpenProject(activeProject)}
                onMouseEnter={() => setHoveredTab("explore")}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-400/40 border border-amber-400/40 text-amber-300 hover:text-white transition-all text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] group cursor-pointer"
                data-cursor="view"
                data-cursor-color={activeProject.ambientColor}
                data-cursor-label="EXPLORE"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[120px] sm:max-w-[180px]">
                  {activeProject.title.split(" ")[0]}
                </span>
                <span className="hidden md:inline-block text-[10px] text-white/40 border-l border-white/15 pl-1.5 font-mono">
                  EXPLORE
                </span>
              </button>

              {/* MEDIA PACK QUICK JUMP BUTTON */}
              <button
                onClick={onOpenMediaPack}
                onMouseEnter={() => setHoveredTab("mediapack")}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                data-cursor="pointer"
                title="Open 37-Page Interactive Media Pack"
              >
                {hoveredTab === "mediapack" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">MEDIA PACK</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  37P
                </span>
              </button>

              {/* NEXT BUTTON */}
              <button
                onClick={onNextProject}
                onMouseEnter={() => setHoveredTab("next")}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white/80 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                data-cursor="pointer"
              >
                {hoveredTab === "next" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            /* NAVIGATION / STUDIO MODE (Tabs from the video) */
            <motion.div
              key="navigation"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 sm:gap-2"
            >
              <button
                onClick={() => scrollTo("selected-work")}
                onMouseEnter={() => setHoveredTab("selected")}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                  activeSection === "selected-work" ? "text-amber-300" : "text-white/70 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {hoveredTab === "selected" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>SELECTED</span>
              </button>

              <button
                onClick={() => scrollTo("portfolio")}
                onMouseEnter={() => setHoveredTab("portfolio")}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                  activeSection === "portfolio" ? "text-amber-300" : "text-white/70 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {hoveredTab === "portfolio" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>COLLECTIONS</span>
              </button>

              <button
                onClick={onOpenMediaPack}
                onMouseEnter={() => setHoveredTab("media")}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-amber-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5"
                data-cursor="pointer"
              >
                {hoveredTab === "media" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <FileText className="w-3.5 h-3.5" />
                <span>MEDIA PACK</span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                onMouseEnter={() => setHoveredTab("contact")}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
                  activeSection === "contact" ? "text-amber-300" : "text-white/70 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {hoveredTab === "contact" && (
                  <motion.div
                    layoutId="dockHover"
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>INQUIRE</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-0.5" />

        {/* Scroll To Top Action */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Scroll To Top"
          data-cursor="pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
