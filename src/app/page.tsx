"use client";

import { useState, useCallback, useEffect } from "react";
import GlowCursor from "@/components/GlowCursor";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWorksCoverflow from "@/components/SelectedWorksCoverflow";
import FullPortfolioGrid from "@/components/FullPortfolioGrid";
import CaseStudyModal from "@/components/CaseStudyModal";
import MediaPackViewer from "@/components/MediaPackViewer";
import InteractiveBottomDock from "@/components/InteractiveBottomDock";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SitePreloader from "@/components/SitePreloader";
import { PROJECTS, Project } from "@/data/projectsData";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [mediaPackOpen, setMediaPackOpen] = useState<boolean>(false);
  const [activeDocumentProject, setActiveDocumentProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  // Dynamic ambient background color responder
  const handleSelectProject = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  const handleOpenProject = useCallback((project: Project) => {
    if (project.isDocument || project.id === "abbay-media-pack-complete" || project.id === "etfc-adwa-media-pack") {
      setActiveDocumentProject(project);
      setMediaPackOpen(true);
    } else {
      setModalProject(project);
    }
  }, []);

  const handleOpenDefaultMediaPack = useCallback(() => {
    const defaultDoc = PROJECTS.find((p) => p.id === "abbay-media-pack-complete") || PROJECTS[0];
    setActiveDocumentProject(defaultDoc);
    setMediaPackOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalProject(null);
  }, []);

  const handlePrevProject = useCallback(() => {
    setActiveProject((prev) => {
      const idx = featuredProjects.findIndex((p) => p.id === prev.id);
      const nextIdx = idx <= 0 ? featuredProjects.length - 1 : idx - 1;
      return featuredProjects[nextIdx];
    });
  }, [featuredProjects]);

  const handleNextProject = useCallback(() => {
    setActiveProject((prev) => {
      const idx = featuredProjects.findIndex((p) => p.id === prev.id);
      const nextIdx = (idx + 1) % featuredProjects.length;
      return featuredProjects[nextIdx];
    });
  }, [featuredProjects]);

  // Section Observer to smoothly update Navbar active indicator
  useEffect(() => {
    const sectionIds = ["selected-work", "portfolio", "about", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white selection:bg-amber-400/30 selection:text-white">
      {/* Site Entrance Preloader with Paperplane Animation */}
      <SitePreloader />
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Signature Interactive Glow Cursor */}
      <GlowCursor />

      {/* Dynamic Ambient Liquid Glass Background responding to active artwork */}
      <AmbientBackground
        primaryColor={activeProject?.ambientColor || "rgba(212, 175, 55, 0.35)"}
        secondaryColor={activeProject?.dominantColors?.[1] ? `${activeProject.dominantColors[1]}40` : "rgba(26, 71, 73, 0.28)"}
      />

      {/* Floating Translucent Liquid Glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <Hero
        featuredProject={PROJECTS[0]}
        onOpenProject={handleOpenProject}
        onOpenMediaPack={handleOpenDefaultMediaPack}
      />

      {/* Selected Works 3D Coverflow Showcase */}
      <SelectedWorksCoverflow
        projects={featuredProjects}
        onSelectProject={handleSelectProject}
        onOpenProject={handleOpenProject}
      />

      {/* Full Filterable Editorial Portfolio Grid */}
      <FullPortfolioGrid
        projects={PROJECTS}
        onOpenProject={handleOpenProject}
        onHoverProject={handleSelectProject}
      />

      {/* Editorial Profile & About */}
      <AboutSection />

      {/* Services & Capabilities */}
      <ServicesSection />

      {/* Final Conversion & Contact Section */}
      <ContactSection />

      {/* Studio Footer */}
      <Footer />

      {/* Floating Interactive Liquid Glass Bottom Dock (Inspired by UI Animation and Microinteractions) */}
      <InteractiveBottomDock
        activeProject={activeProject}
        onPrevProject={handlePrevProject}
        onNextProject={handleNextProject}
        onOpenProject={handleOpenProject}
        onOpenMediaPack={handleOpenDefaultMediaPack}
        activeSection={activeSection}
      />

      {/* Full-Screen Liquid Glass Case Study Viewer */}
      <CaseStudyModal
        project={modalProject}
        allProjects={PROJECTS}
        onClose={handleCloseModal}
        onNavigate={handleOpenProject}
        onOpenDocumentViewer={() => {
          if (modalProject?.isDocument || modalProject?.documentPages) {
            setActiveDocumentProject(modalProject);
          } else {
            setActiveDocumentProject(PROJECTS[0]);
          }
          setMediaPackOpen(true);
        }}
      />

      {/* Dedicated Interactive Liquid Glass Media Pack Reader */}
      <MediaPackViewer
        isOpen={mediaPackOpen}
        onClose={() => {
          setMediaPackOpen(false);
          setActiveDocumentProject(null);
        }}
        project={activeDocumentProject}
      />
    </main>
  );
}
