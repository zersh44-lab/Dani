"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Award, ExternalLink, Sparkles, Check, Copy, Maximize2, Minimize2, FileText } from "lucide-react";
import { Project } from "@/data/projectsData";
import MagneticButton from "@/components/MagneticButton";

interface ModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
  onOpenDocumentViewer?: () => void;
}

export default function CaseStudyModal({
  project,
  allProjects,
  onClose,
  onNavigate,
  onOpenDocumentViewer,
}: ModalProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (!project) return;
      const idx = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === "ArrowLeft" && idx > 0) {
        onNavigate(allProjects[idx - 1]);
      } else if (e.key === "ArrowRight" && idx < allProjects.length - 1) {
        onNavigate(allProjects[idx + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, allProjects, onClose, onNavigate, isZoomed]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-3xl animate-in fade-in duration-300">
      {/* Backdrop click close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Glass Modal Window */}
      <div className="relative w-full max-w-5xl my-auto glass-panel rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/15 z-10 max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-black/50">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30">
              {project.category}
            </span>
            <span className="text-xs text-white/40 border-l border-white/10 pl-3">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom / Lightbox Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="glass-button p-2 rounded-full text-white/70 hover:text-white"
              title={isZoomed ? "Exit Full View" : "Full Screen Lightbox"}
              data-cursor="pointer"
            >
              {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Prev/Next Controls */}
            {prevProject && (
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => onNavigate(prevProject)}
                  className="glass-button p-2 rounded-full text-white/70 hover:text-white"
                  title={`Previous: ${prevProject.title}`}
                  data-cursor="pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </MagneticButton>
            )}

            {nextProject && (
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => onNavigate(nextProject)}
                  className="glass-button p-2 rounded-full text-white/70 hover:text-white"
                  title={`Next: ${nextProject.title}`}
                  data-cursor="pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </MagneticButton>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="glass-button p-2 rounded-full text-white/80 hover:text-white ml-2"
              aria-label="Close Case Study"
              data-cursor="pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Presentation Artwork with Lightbox toggle */}
          <div
            onClick={() => setIsZoomed(!isZoomed)}
            className={`relative w-full rounded-2xl overflow-hidden bg-black/80 shadow-2xl border border-white/10 transition-all duration-500 cursor-zoom-in ${
              isZoomed ? "aspect-auto min-h-[70vh] p-4 flex items-center justify-center" : "aspect-[16/10] sm:aspect-[16/9]"
            }`}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill={!isZoomed}
              width={isZoomed ? 1800 : undefined}
              height={isZoomed ? 1200 : undefined}
              priority
              className={`${isZoomed ? "max-h-[85vh] w-auto object-contain mx-auto" : "object-contain sm:object-cover"} transition-transform duration-500`}
            />
            {!isZoomed && (
              <div className="absolute bottom-3 right-3 glass-pill px-3 py-1 text-[11px] text-white/70 flex items-center gap-1.5 opacity-80 hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Click to Expand Lightbox</span>
              </div>
            )}
          </div>

          {/* Project Title & Client Header */}
          <div className="space-y-3">
            {project.award && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{project.award}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span className="text-white/90 font-medium">Client: {project.client}</span>
              <span>•</span>
              <span>Year: {project.year}</span>
              {project.metrics && (
                <>
                  <span>•</span>
                  <span className="text-amber-400 font-mono">⚡ {project.metrics}</span>
                </>
              )}
            </div>

            {/* Dedicated Document Viewer Trigger Banner */}
            {project.isDocument && onOpenDocumentViewer && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl glass-panel border-amber-400/30 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 inline-block">
                    Interactive 37-Page Spreads
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Explore Complete Corporate Media Kit & Rate Card
                  </h3>
                  <p className="text-xs text-white/60">
                    Browse all 37 high-resolution spreads with page scrubber, zoom, and full-screen controls.
                  </p>
                </div>
                <button
                  onClick={onOpenDocumentViewer}
                  className="glass-button px-5 py-2.5 rounded-full text-xs font-bold text-amber-300 hover:text-white flex items-center gap-2 shrink-0 border-amber-400/30 cursor-pointer"
                  data-cursor="pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Launch Document Reader</span>
                </button>
              </div>
            )}
          </div>

          {/* Project Narrative & Verified Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">
                Design Background & Strategy
              </h4>
              <p className="text-base text-white/80 leading-relaxed font-light">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill px-3 py-1 rounded-full text-xs text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Palette Extraction */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">
                Extracted Palette
              </h4>
              <div className="space-y-2">
                {project.dominantColors.map((hex, i) => (
                  <button
                    key={i}
                    onClick={() => copyColor(hex)}
                    className="w-full flex items-center justify-between p-2 rounded-xl glass-card hover:border-white/30 text-xs text-white/80 transition-all cursor-pointer"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-lg border border-white/20 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono text-white/90">{hex.toUpperCase()}</span>
                    </div>
                    {copiedHex === hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/40" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Case Study Slide Gallery (if available) */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Media Pack & Presentation Slides
                </h4>
                <span className="text-xs text-white/40">
                  Extracted from Original Media Kit
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden glass-card p-1.5"
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/60">
                      <Image
                        src={imgUrl}
                        alt={`${project.title} slide ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with quick navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 backdrop-blur-xl bg-black/40 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>Project {currentIndex + 1} of {allProjects.length}</span>
          </div>

          <div className="flex items-center gap-3">
            {prevProject && (
              <button
                onClick={() => onNavigate(prevProject)}
                className="hover:text-amber-400 transition-colors"
              >
                ← {prevProject.title.slice(0, 20)}...
              </button>
            )}
            {prevProject && nextProject && <span>•</span>}
            {nextProject && (
              <button
                onClick={() => onNavigate(nextProject)}
                className="hover:text-amber-400 transition-colors"
              >
                {nextProject.title.slice(0, 20)}... →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
