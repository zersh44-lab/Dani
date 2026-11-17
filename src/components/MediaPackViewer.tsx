"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Grid,
  FileText,
} from "lucide-react";
import { MEDIA_PACK_PAGES, DocumentPage, Project } from "@/data/projectsData";

interface MediaPackViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
  project?: Project | null;
}

export default function MediaPackViewer({
  isOpen,
  onClose,
  initialPage = 1,
  project = null,
}: MediaPackViewerProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [direction, setDirection] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Extract document pages from project or fallback to default Media Pack
  const pages: DocumentPage[] =
    project && project.documentPages && project.documentPages.length > 0
      ? project.documentPages
      : MEDIA_PACK_PAGES;

  const totalPages = pages.length;
  const activePageData: DocumentPage = pages[currentPage - 1] || pages[0];

  const docTitle = project ? project.title : "Abbay TV & Abbay Digital Media Kit";
  const docBadge = project?.award || "Official Document Pack";
  const docYear = project?.year || "2025 / 2026";

  useEffect(() => {
    setCurrentPage(initialPage);
    setDirection(0);
    setZoomLevel(1);
  }, [initialPage, isOpen, project]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      setZoomLevel(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
      setZoomLevel(1);
    }
  };

  const handleThumbnailClick = (pageNum: number) => {
    if (pageNum === currentPage) return;
    setDirection(pageNum > currentPage ? 1 : -1);
    setCurrentPage(pageNum);
    setZoomLevel(1);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomLevel > 1) {
          setZoomLevel(1);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage, zoomLevel, totalPages]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const activeEl = thumbnailsRef.current.querySelector(
      `[data-thumb-page="${currentPage}"]`
    ) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentPage]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Page turn motion variants
  const spreadVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 90 : dir < 0 ? -90 : 0,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
        filter: { duration: 0.22 },
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#05070a]/95 backdrop-blur-3xl text-white select-none animate-in fade-in duration-300 overflow-hidden"
    >
      {/* Top Floating Glass Navigation Header */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        {/* Left: Document Branding */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl glass-panel flex items-center justify-center text-amber-400 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 truncate max-w-[200px] sm:max-w-none">
                {docBadge}
              </span>
              <span className="text-xs text-white/50 hidden sm:inline-block">{docYear}</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
              {docTitle}
            </h2>
          </div>
        </div>

        {/* Center: Page Title & Counter */}
        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-center gap-3 glass-pill px-4 py-1.5 shadow-lg">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="hover:text-amber-400 disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer"
              title="Previous Page (ArrowLeft)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-semibold text-white/90">
              Page <span className="text-amber-400">{String(currentPage).padStart(2, "0")}</span> / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="hover:text-amber-400 disabled:opacity-30 disabled:hover:text-white transition-colors cursor-pointer"
              title="Next Page (ArrowRight)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[11px] text-white/50 tracking-wide mt-1 truncate max-w-sm">
            {activePageData.title}
          </span>
        </div>

        {/* Right: Zoom & Window Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom In/Out Toolbar */}
          <div className="hidden sm:flex items-center gap-1 glass-pill px-2 py-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.7}
              className="p-1.5 text-white/70 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 text-[11px] font-mono text-white/60 hover:text-amber-400 cursor-pointer"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              className="p-1.5 text-white/70 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Thumbnails */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`glass-button p-2 rounded-full transition-all cursor-pointer ${
              showThumbnails ? "text-amber-400 border-amber-400/40" : "text-white/70 hover:text-white"
            }`}
            title="Toggle Page Thumbnails"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex glass-button p-2 rounded-full text-white/70 hover:text-white cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Viewer */}
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full text-white/80 hover:text-white ml-2 cursor-pointer"
            title="Close Viewer (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Document Presentation Stage */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-3 sm:p-6 bg-black/60">
        {/* Previous Page Floating Side Chevron */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="absolute left-4 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-panel text-white/80 hover:text-white hover:border-amber-400/40 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl cursor-pointer"
          title="Previous Page (ArrowLeft)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Document Spread Frame with Smooth Transition Animation */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: "transform 0.3s ease-out",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={spreadVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative max-w-full max-h-full shadow-[0_25px_80px_rgba(0,0,0,0.95)] rounded-2xl overflow-hidden border border-white/10"
            >
              <Image
                src={activePageData.image}
                alt={activePageData.title || `Document Page ${currentPage}`}
                width={2400}
                height={1697}
                priority
                className="w-auto h-auto max-h-[82vh] max-w-[94vw] object-contain rounded-2xl select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Page Floating Side Chevron */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="absolute right-4 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-panel text-white/80 hover:text-white hover:border-amber-400/40 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-2xl cursor-pointer"
          title="Next Page (ArrowRight)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Floating Interactive Thumbnail Filmstrip */}
      {showThumbnails && (
        <div className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-2xl py-3 px-4">
          <div
            ref={thumbnailsRef}
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar max-w-7xl mx-auto px-2"
          >
            {pages.map((page, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={page.pageNumber}
                  data-thumb-page={pageNum}
                  onClick={() => handleThumbnailClick(pageNum)}
                  className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-20 sm:w-28 aspect-[16/10] border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105"
                      : "w-16 sm:w-20 aspect-[16/10] opacity-50 hover:opacity-100 border border-white/20 hover:scale-102"
                  }`}
                >
                  <Image
                    src={page.thumbnail}
                    alt={`Thumbnail ${pageNum}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-black/80 rounded text-white">
                    {pageNum}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
