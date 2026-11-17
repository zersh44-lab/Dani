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
  Copy,
  MessageCircle,
  Share2,
  Video,
  Sparkles,
  Printer,
  Ticket,
  Briefcase,
  Package,
  Layout,
  Wand2,
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
    id: "social-media-design",
    label: "Social Media Design",
    subtitle: "High-engagement social campaigns, Instagram carousels & promotional digital banners",
    icon: Share2,
  },
  {
    id: "youtube-video-graphics",
    label: "YouTube & Video Graphics",
    subtitle: "High-CTR video thumbnails, channel banners, title sequences & end screens",
    icon: Video,
  },
  {
    id: "branding-identity-design",
    label: "Branding & Identity Design",
    subtitle: "Comprehensive visual identity systems, logo architecture & brand guidelines",
    icon: Sparkles,
  },
  {
    id: "print-publication-design",
    label: "Print & Publication Design",
    subtitle: "Brochures, editorial magazines, marketing collateral & luxury print production",
    icon: Printer,
  },
  {
    id: "event-entertainment-design",
    label: "Event & Entertainment Design",
    subtitle: "Cinematic event posters, key art campaigns, concert branding & festival visuals",
    icon: Ticket,
  },
  {
    id: "business-corporate-design",
    label: "Business & Corporate Design",
    subtitle: "Corporate profiles, annual reports, pitch decks, media kits & stationery suites",
    icon: Briefcase,
  },
  {
    id: "packaging-product-design",
    label: "Packaging & Product Design",
    subtitle: "Tactile retail packaging, FMCG labels, pouch designs & product box suites",
    icon: Package,
  },
  {
    id: "digital-ui-graphics",
    label: "Digital & UI Graphics",
    subtitle: "App icons, website UI assets, promotional landing visuals & web banners",
    icon: Layout,
  },
  {
    id: "photo-editing-creative-design",
    label: "Photo Editing & Creative Design",
    subtitle: "High-end commercial photo retouching, visual manipulation & creative composites",
    icon: Wand2,
  },
];

export default function ContactSection() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [preferredChannel, setPreferredChannel] = useState<"telegram" | "email" | "whatsapp">("telegram");
  const [copied, setCopied] = useState(false);
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

  // Helper to build transmission URLs
  const scopeText = formData.message.trim() || "No specific scope provided.";
  const briefText = `🔥 PROJECT COMMISSION INQUIRY FOR DANI\n\n• Client Name: ${formData.name || "Client"}\n• Work Email: ${formData.email || "Email"}\n• Creative Domain: ${formData.projectType}\n• Preferred Channel: ${preferredChannel.toUpperCase()}\n\n• Project Scope & Objectives:\n${scopeText}\n\nSent from Dani's Creative Portfolio (dani-sigma-flax.vercel.app)`;

  const mailtoSubject = `Project Commission Inquiry: [${formData.projectType}] - ${formData.name || "Client"}`;
  const mailtoBody = `Hi Dani,\n\nI would like to inquire about commissioning a project in ${formData.projectType}.\n\nClient Name: ${formData.name}\nWork Email: ${formData.email}\nCreative Domain: ${formData.projectType}\n\nProject Scope & Objectives:\n${scopeText}\n\nLooking forward to your response!`;

  const primaryEmail = DESIGNER_INFO.contact.email;

  const mailtoLink = `mailto:${primaryEmail}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(primaryEmail)}&su=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
  const telegramLink = `https://t.me/${DESIGNER_INFO.contact.telegram.replace("@", "")}?text=${encodeURIComponent(briefText)}`;
  const whatsappLink = `https://wa.me/251967125822?text=${encodeURIComponent(briefText)}`;

  const handleCopyBrief = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(briefText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsDispatching(true);

    // 1. Send via local Next.js API route
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: scopeText,
          preferredMethod: preferredChannel,
        }),
      });
    } catch (err) {
      console.warn("API dispatch warning:", err);
    }

    // 2. Also forward directly to FormSubmit for instant Gmail notification to Zerihun & Dani
    try {
      await fetch(`https://formsubmit.co/ajax/${primaryEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": typeof window !== "undefined" ? window.location.origin : "https://dani-sigma-flax.vercel.app",
          "Referer": typeof window !== "undefined" ? window.location.href : "https://dani-sigma-flax.vercel.app/",
        },
        body: JSON.stringify({
          _subject: mailtoSubject,
          _replyto: formData.email,
          _captcha: "false",
          _template: "table",
          "Client Name": formData.name,
          "Client Email": formData.email,
          "Creative Domain": formData.projectType,
          "Preferred Channel": preferredChannel.toUpperCase(),
          "Project Scope": scopeText,
        }),
      });
    } catch (err) {
      console.warn("FormSubmit direct forward warning:", err);
    }

    // 3. Open chosen direct channel automatically
    if (typeof window !== "undefined") {
      if (preferredChannel === "telegram") {
        window.open(telegramLink, "_blank");
      } else if (preferredChannel === "whatsapp") {
        window.open(whatsappLink, "_blank");
      } else if (preferredChannel === "email") {
        window.open(gmailWebLink, "_blank");
      }
    }

    // 4. Conclude dispatch animation and render celebratory confirmation screen
    setTimeout(() => {
      setIsDispatching(false);
      setFormSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: ["#ffd200", "#d4af37", "#ffffff", "#0284c7"],
        });
      } catch (err) {
        // ignore
      }
    }, 1200);
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
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  Direct Phone &amp; Call Desk
                </h4>
                <a
                  href={`tel:${DESIGNER_INFO.contact.phone}`}
                  className="text-lg font-bold text-white hover:text-amber-400 transition-colors font-mono tracking-tight"
                >
                  {DESIGNER_INFO.contact.phoneDisplay}
                </a>
                <p className="text-xs text-white/40 mt-0.5">Direct line · Available 9:00 AM - 7:00 PM EAT</p>
              </div>
            </div>

            {/* Official Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl glass-pill text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                  Official Email Address
                </h4>
                <a
                  href={`mailto:${DESIGNER_INFO.contact.email}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition-colors font-mono tracking-tight break-all"
                >
                  {DESIGNER_INFO.contact.email}
                </a>
                <p className="text-xs text-white/40 mt-0.5">Commercial proposals &amp; client briefs</p>
              </div>
            </div>

            {/* Direct Instant Channels: Telegram & Instagram */}
            <div className="border-t border-white/5 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                Instant Chat &amp; Portfolios
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Telegram Direct Channel */}
                <a
                  href={DESIGNER_INFO.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:border-sky-400/50 hover:bg-sky-500/10 transition-all duration-300 group cursor-pointer"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(56,189,248,0.2)] overflow-hidden">
                      <Image
                        src="/images/paperplane.webp"
                        alt="Telegram"
                        width={28}
                        height={28}
                        unoptimized
                        className="w-7 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                        Telegram Desk
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors font-mono">
                        {DESIGNER_INFO.contact.telegram}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Instagram Showcase */}
                <a
                  href={DESIGNER_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:border-pink-400/50 hover:bg-pink-500/10 transition-all duration-300 group cursor-pointer"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(244,114,182,0.2)]">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                    Transmitting Inquiry to Dani&apos;s Desk...
                  </h3>
                  <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                    Encrypting project brief and establishing direct transmission via {preferredChannel.toUpperCase()}.
                  </p>
                </div>
                <div className="w-44 h-1.5 rounded-full bg-white/10 mx-auto overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-300 animate-[pulse_0.8s_ease-in-out_infinite] shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                </div>
              </div>
            ) : formSubmitted ? (
              <div className="py-8 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Inquiry Prepared &amp; Dispatched!
                  </h3>
                  <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-amber-400 font-semibold">{formData.name}</span>.
                    Your brief for <span className="text-white font-medium">{formData.projectType}</span> has been processed.
                  </p>
                </div>

                {/* Structured Brief Summary Card */}
                <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 bg-black/40">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="font-mono text-white/50 uppercase">Submission Details</span>
                    <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Transmission
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/40 block">Client:</span>
                      <span className="text-white font-medium">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Work Email:</span>
                      <span className="text-white font-mono">{formData.email}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-white/40 block">Creative Domain:</span>
                      <span className="text-amber-300 font-semibold">{formData.projectType}</span>
                    </div>
                    {formData.message && (
                      <div className="sm:col-span-2">
                        <span className="text-white/40 block">Scope Brief:</span>
                        <p className="text-white/80 italic mt-0.5 line-clamp-3 bg-white/5 p-2 rounded-lg text-[11px]">
                          &ldquo;{formData.message}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* One-Time FormSubmit Activation Alert Banner */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2 text-left">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Action Required: Activate FormSubmit to Receive Inquiries</span>
                  </div>
                  <p className="text-white/80 text-[11px] leading-relaxed">
                    FormSubmit requires a <strong>one-time activation</strong> before forwarding automated form submissions. Please check your inbox or Spam/Junk folder at <strong className="text-white font-mono">{primaryEmail}</strong> for an email from <em>FormSubmit</em> and click <strong className="text-amber-300">&ldquo;Activate Form&rdquo;</strong>.
                  </p>
                  <p className="text-white/60 text-[10px]">
                    Once activated, all future inquiries will automatically arrive in your inbox. In the meantime, use the 1-click channels below:
                  </p>
                </div>

                {/* Instant 1-Click Direct Delivery Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Confirm Transmission via Direct Channel
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Gmail Web (1-Click) */}
                    <a
                      href={gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-white flex items-center justify-between transition-all group shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-xs text-amber-300 flex items-center gap-1">
                            <span>Open in Gmail (Web)</span>
                            <ArrowUpRight className="w-3 h-3 text-amber-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[10px] text-white/60 font-mono">{primaryEmail}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                        1-Click
                      </span>
                    </a>

                    {/* Telegram Desk */}
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-white flex items-center justify-between transition-all group shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-400/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                          <Send className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-xs text-sky-300 flex items-center gap-1">
                            <span>Telegram Desk</span>
                            <ArrowUpRight className="w-3 h-3 text-sky-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[10px] text-white/60 font-mono">{DESIGNER_INFO.contact.telegram}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/30 font-bold">
                        Instant
                      </span>
                    </a>

                    {/* WhatsApp Desk */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-white flex items-center justify-between transition-all group shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-xs text-emerald-300 flex items-center gap-1">
                            <span>WhatsApp Desk</span>
                            <ArrowUpRight className="w-3 h-3 text-emerald-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[10px] text-white/60 font-mono">{DESIGNER_INFO.contact.phoneDisplay}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                        Direct
                      </span>
                    </a>

                    {/* Default Mail App */}
                    <a
                      href={mailtoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 text-white/80 flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-xs text-white/90 flex items-center gap-1">
                            <span>Default Mail App</span>
                            <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <span className="text-[10px] text-white/50 font-mono">mailto: client</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", projectType: CREATIVE_DOMAINS[0].label, message: "" });
                    }}
                    className="px-6 py-2.5 rounded-full glass-button text-xs text-white/70 hover:text-white cursor-pointer"
                  >
                    ← Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    Project Commission Inquiry
                  </h3>
                  <p className="text-xs text-white/50">
                    Provide your project specifications below for a confidential estimate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
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

                  <div className="space-y-1.5">
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

                {/* Creative Domain Dropdown */}
                <div className="space-y-1.5 relative" ref={dropdownRef}>
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
                    className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white flex items-center justify-between focus:outline-none focus:border-amber-400/50 hover:border-white/30 transition-all cursor-pointer group bg-[#080c16]/80 backdrop-blur-xl"
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

                {/* Scope Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Project Scope &amp; Objectives
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell me about your brand, timeline, and deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-card text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                  />
                </div>

                {/* Direct Channel Selection Pills */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
                    <span>Direct Delivery Channel</span>
                    <span className="text-[10px] text-amber-400/80 font-normal">Connects Directly to Dani</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "telegram", label: "Telegram", sub: "@dazii8", icon: Send },
                      { id: "whatsapp", label: "WhatsApp", sub: "+251 967...", icon: MessageCircle },
                      { id: "email", label: "Email", sub: "Direct Mail", icon: Mail },
                    ].map((ch) => {
                      const isChSelected = preferredChannel === ch.id;
                      const ChIcon = ch.icon;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setPreferredChannel(ch.id as any)}
                          className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                            isChSelected
                              ? "bg-amber-400/15 border-amber-400/50 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                              : "glass-card border-white/10 text-white/60 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-bold">{ch.label}</span>
                            <ChIcon className={`w-3 h-3 ${isChSelected ? "text-amber-400" : "text-white/40"}`} />
                          </div>
                          <span className="text-[10px] text-white/45 font-mono truncate">{ch.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isDispatching}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500/90 via-amber-400 to-amber-500/90 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(245,158,11,0.35)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
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
