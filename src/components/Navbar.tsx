"use client";

import { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Selected", href: "#selected-work" },
    { label: "Full Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-8 flex justify-center ${
          scrolled ? "backdrop-blur-md bg-[#05070a]/40" : ""
        }`}
      >
        <nav className="w-full max-w-6xl flex items-center justify-between">
          {/* Studio Brand Mark */}
          <a
            href="#"
            className="group flex items-center gap-3 glass-pill px-4 py-2 hover:border-white/30 transition-all duration-300"
            data-cursor="pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] group-hover:scale-125 transition-transform" />
            <span className="font-bold tracking-widest text-sm text-white uppercase flex items-center gap-1.5">
              DANI
              <span className="text-[10px] font-normal text-white/50 tracking-normal border-l border-white/20 pl-2">
                STUDIO
              </span>
            </span>
          </a>

          {/* Desktop Floating Pill Navigation */}
          <div className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] border border-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                  }`}
                  data-cursor="pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Status & Inquiry Button */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 glass-pill px-3 py-1.5 text-[11px] text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open for Keynote & Brand Projects</span>
            </div>

            <MagneticButton strength={0.3}>
              <button
                onClick={() => scrollTo("#contact")}
                className="glass-button text-xs font-semibold px-4 py-2 rounded-full text-white flex items-center gap-1.5 group cursor-pointer"
                data-cursor="pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden glass-pill p-2 text-white/80 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#05070a]/90 backdrop-blur-2xl flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-center mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
              <span className="text-xl font-bold tracking-widest text-white uppercase">DANI CREATIVE</span>
            </div>

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="w-full text-left py-3 px-6 glass-card rounded-2xl text-base font-medium text-white/90 hover:text-white flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </button>
            ))}

            <button
              onClick={() => scrollTo("#contact")}
              className="mt-4 w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-500/40 text-amber-300 font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
