"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Check,
  Tv,
  Sparkles,
  Package,
  FileText,
  Image as ImageIcon,
  Flame,
  Printer,
  Film,
  Box,
  Layers,
  Briefcase,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DESIGNER_INFO } from "@/data/projectsData";

export interface CreativeDomainOption {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export const CREATIVE_DOMAINS: CreativeDomainOption[] = [
  {
    id: "broadcast-branding",
    label: "Broadcasting & Television Identity",
    subtitle: "Complete TV network identity suites, program packages, news graphics & title sequences",
    icon: Tv,
    tag: "SIGNATURE",
  },
  {
    id: "media-pack-editorial",
    label: "Corporate Media Packs & Decks",
    subtitle: "30+ spread corporate profiles, broadcast sponsorship architectures & publication decks",
    icon: FileText,
    tag: "37-PAGE",
  },
  {
    id: "brand-identity",
    label: "Full Brand Identity & Design Systems",
    subtitle: "Comprehensive visual identity design, logo variations, typography & brand guidelines",
    icon: Sparkles,
  },
  {
    id: "product-packaging",
    label: "Product Packaging & Retail FMCG",
    subtitle: "Tactile retail packaging for coffee, food hospitality, beverage & grooming products",
    icon: Package,
  },
  {
    id: "key-art-posters",
    label: "Key Art & Cinematic Event Posters",
    subtitle: "Combat sports championships, concert key art, television posters & festival campaigns",
    icon: ImageIcon,
  },
  {
    id: "digital-youtube",
    label: "High-CTR Digital & YouTube Packaging",
    subtitle: "Conversion-optimized YouTube thumbnails, digital key visuals & multi-million reach visuals",
    icon: Flame,
    tag: "HIGH-CTR",
  },
  {
    id: "motion-graphics",
    label: "Motion Design & On-Air Sequences",
    subtitle: "Dynamic lower thirds, channel stings, logo animations & broadcast bumpers",
    icon: Film,
  },
  {
    id: "print-prepress",
    label: "Luxury Print Production & Editorial",
    subtitle: "Fine-art restaurant menus, VIP tickets, event passes & corporate publication collateral",
    icon: Printer,
  },
  {
    id: "3d-cgi",
    label: "3D Visualization & Brand Mockups",
    subtitle: "Photorealistic product mockups, 3D typography & spatial visual assets",
    icon: Box,
  },
  {
    id: "art-direction",
    label: "Comprehensive Creative & Art Direction",
    subtitle: "End-to-end creative leadership for national television & corporate campaigns",
    icon: Layers,
  },
  {
    id: "custom-scope",
    label: "Bespoke / Custom Creative Commission",
    subtitle: "Custom project scope tailored specifically to your unique vision, timeline and goals",
    icon: Briefcase,
  },
];

export default function ContactSection() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: CREATIVE_DOMAINS[0].label,
    message: "",
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDomain =
    CREATIVE_DOMAINS.find((d) => d.label === formData.projectType) || CREATIVE_DOMAINS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsDispatching(true);

    setTimeout(() => {
      setIsDispatching(false);
      setFormSubmitted(true);
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ffd200", "#d4af37", "#ffffff", "#0284c7"],
        });
      } catch (err) {
        // ignore
      }
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Official Contact Information */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-amber-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                Initiate Dialogue
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
              Let&apos;s Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
                Visual Impact
              </span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Ready to elevate your television network, commercial brand, or product line? Reach out
              directly for commissions, art direction, and comprehensive identity systems.
            </p>
          </div>

          {/* Official Contact Details Box */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Direct Phone Line */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl glass-pill text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Direct Phone Line
                  </h4>
                  <span className="text-[10px] font-mono font-semibold text-amber-400/80 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                    VOICE / CALL
                  </span>
                </div>
                <a
                  href={`tel:${DESIGNER_INFO.contact.phone}`}
                  className="text-base sm:text-lg font-bold font-mono text-white hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  data-cursor="pointer"
                  title="Call Direct Line"
                >
                  <span>{DESIGNER_INFO.contact.phoneDisplay}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Electronic Correspondence */}
            <div className="flex items-start gap-4 border-t border-white/5 pt-5">
              <div className="p-3 rounded-2xl glass-pill text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Electronic Correspondence
                  </h4>
                  <span className="text-[10px] font-mono font-semibold text-amber-400/80 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                    DIRECT EMAIL
                  </span>
                </div>
                <a
                  href={`mailto:${DESIGNER_INFO.contact.email}`}
                  className="text-sm sm:text-base font-semibold font-mono text-white hover:text-amber-400 transition-colors break-all inline-flex items-center gap-2 group"
                  data-cursor="pointer"
                  title="Send Direct Email"
                >
                  <span>{DESIGNER_INFO.contact.email}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </div>
            </div>

            {/* Social & Instant Dialogue (Telegram & Instagram) */}
            <div className="border-t border-white/5 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
                Instant Dialogue & Visual Feeds
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Telegram Card */}
                <a
                  href={DESIGNER_INFO.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-card hover:border-sky-400/40 hover:bg-sky-500/10 transition-all duration-300 flex items-center justify-between group"
                  data-cursor="pointer"
                  title="Open Telegram Chat"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(56,189,248,0.2)] overflow-hidden">
                      <Image
                        src="/images/paperplane.webp"
                        alt="Telegram"
                        width={60}
                        height={45}
                        unoptimized
                        className="w-7 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                        Telegram
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors font-mono">
                        {DESIGNER_INFO.contact.telegram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Instagram Card */}
                <a
                  href={DESIGNER_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-card hover:border-pink-400/40 hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-between group"
                  data-cursor="pointer"
                  title="Visit Instagram Profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(244,114,182,0.2)]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                        Instagram
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors font-mono">
                        {DESIGNER_INFO.contact.instagram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Studio Location */}
            <div className="flex items-start gap-4 border-t border-white/5 pt-5">
              <div className="p-3 rounded-2xl glass-pill text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  Studio Location
                </h4>
                <p className="text-sm font-medium text-white/90">
                  {DESIGNER_INFO.contact.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {isDispatching ? (
              <div className="text-center py-16 space-y-5 animate-in fade-in zoom-in-95 duration-500">
                <div className="relative w-36 h-28 mx-auto flex items-center justify-center">
                  <Image
                    src="/images/paperplane.webp"
                    alt="Dispatching Inquiry"
                    width={150}
                    height={112}
                    unoptimized
                    className="w-full h-auto object-contain filter drop-shadow-[0_12px_30px_rgba(94,103,253,0.5)]"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Dispatching Inquiry to Dani Studio...
                  </h3>
                  <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                    Encrypting project brief and transmitting directly to Dani&apos;s creative desk.
                  </p>
                </div>
                <div className="w-44 h-1.5 rounded-full bg-white/10 mx-auto overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-300 animate-[pulse_0.8s_ease-in-out_infinite] shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                </div>
              </div>
            ) : formSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-400 font-medium">{formData.name}</span>.
                  Your project scope has been received. Dani will review your specifications and
                  respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", projectType: CREATIVE_DOMAINS[0].label, message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full glass-button text-xs text-white/80 hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    Project Commission Inquiry
                  </h3>
                  <p className="text-xs text-white/50">
                    Provide your project specifications below for a confidential estimate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Yohannes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="samuel@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative" ref={dropdownRef}>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Creative Domain
                    </label>
                    <span className="text-[10px] font-mono text-amber-400 font-semibold">
                      {CREATIVE_DOMAINS.length} Disciplines Available
                    </span>
                  </div>

                  {/* Custom Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3.5 rounded-2xl glass-card text-sm text-white flex items-center justify-between focus:outline-none focus:border-amber-400/50 hover:border-white/30 transition-all cursor-pointer group bg-[#080c16]/80 backdrop-blur-xl"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex items-center gap-3 overflow-hidden text-left">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <selectedDomain.icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-semibold text-white block truncate">
                          {selectedDomain.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {selectedDomain.tag && (
                        <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300">
                          {selectedDomain.tag}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180 text-amber-400" : "group-hover:text-white"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Animated Liquid Glass Popover Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl glass-panel bg-[#070b14]/98 border border-white/20 p-2 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl max-h-80 overflow-y-auto space-y-1"
                        style={{
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(245,158,11,0.3) rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="px-3 py-1.5 border-b border-white/5 mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                            Select Creative Discipline
                          </span>
                          <span className="text-[10px] font-mono text-amber-400/80">
                            {CREATIVE_DOMAINS.length} Options
                          </span>
                        </div>

                        {CREATIVE_DOMAINS.map((domain) => {
                          const isSelected = domain.label === formData.projectType;
                          const IconComponent = domain.icon;
                          return (
                            <button
                              key={domain.id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, projectType: domain.label });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                                isSelected
                                  ? "bg-amber-400/15 border border-amber-400/40 text-white"
                                  : "hover:bg-white/5 border border-transparent text-white/80 hover:text-white"
                              }`}
                            >
                              <div className="flex items-start gap-3 min-w-0 pr-2">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                    isSelected
                                      ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                                      : "bg-white/5 border border-white/10 text-white/70 group-hover:text-amber-400 group-hover:border-amber-400/30"
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs sm:text-sm font-semibold truncate ${
                                        isSelected ? "text-amber-300 font-bold" : "group-hover:text-amber-300"
                                      }`}
                                    >
                                      {domain.label}
                                    </span>
                                    {domain.tag && (
                                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/60 shrink-0">
                                        {domain.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-white/45 leading-snug line-clamp-1 group-hover:text-white/65 transition-colors">
                                    {domain.subtitle}
                                  </p>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0 ml-2">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Project Scope & Objectives
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your brand, timeline, and deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500/80 via-amber-400/90 to-amber-500/80 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(245,158,11,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  data-cursor="pointer"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}