"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail, CheckCircle2, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { DESIGNER_INFO } from "@/data/projectsData";

export default function ContactSection() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Brand Identity",
    message: "",
  });

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
                    setFormData({ name: "", email: "", projectType: "Brand Identity", message: "" });
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

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Creative Domain
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white bg-[#0a0d14] focus:outline-none focus:border-amber-400/50 transition-colors cursor-pointer"
                  >
                    <option value="Broadcasting & Television Packaging">
                      Broadcasting & Television Packaging
                    </option>
                    <option value="Full Brand Identity & Systems">
                      Full Brand Identity & Systems
                    </option>
                    <option value="Product & FMCG Packaging">Product & FMCG Packaging</option>
                    <option value="Key Art & Event Poster Campaigns">
                      Key Art & Event Poster Campaigns
                    </option>
                    <option value="High-CTR YouTube / Digital Packaging">
                      High-CTR YouTube / Digital Packaging
                    </option>
                    <option value="Corporate Media Kit & Editorial Deck">
                      Corporate Media Kit & Editorial Deck
                    </option>
                  </select>
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