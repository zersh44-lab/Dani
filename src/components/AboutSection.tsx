"use client";

import { Award, Layers, Sparkles, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { DESIGNER_INFO } from "@/data/projectsData";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Editorial Profile
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-200">
              The Designer
            </span>
          </h2>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{DESIGNER_INFO.location}</span>
          </div>

          <p className="text-base text-white/70 leading-relaxed font-light">
            {DESIGNER_INFO.bio}
          </p>

          <p className="text-sm text-white/60 leading-relaxed font-light">
            From sculpting the broadcast packages of national television hits (*Maraki Weg, Mesenqo,
            Man Yikenes*) to directing comprehensive corporate identities and high-conversion packaging,
            every composition is built on authentic cultural resonance, mathematical typography, and
            uncompromising visual discipline.
          </p>

          {/* Software Stack Pills */}
          <div className="pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
              Software & Production Toolkit
            </h4>
            <div className="flex flex-wrap gap-2">
              {DESIGNER_INFO.softwareExpertise.map((tool) => (
                <span
                  key={tool}
                  className="glass-pill px-3 py-1.5 rounded-full text-xs font-medium text-white/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Milestones & Studio Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Verified Award Showcase Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Verified Industry Recognitions
                  </h3>
                  <p className="text-xs text-white/50">National Broadcast & Music Design</p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Official
              </span>
            </div>

            <div className="space-y-4">
              {DESIGNER_INFO.awards.map((award, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {award.title}
                    </span>
                    <span className="text-xs text-amber-300 font-medium">{award.subtitle}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">{award.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">100% Real Shipped Work</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Zero AI placeholders or fictional brands. Every piece in this portfolio was commissioned,
                shipped, and broadcast to millions.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Multidisciplinary Reach</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Mastery spanning 37-page corporate media decks, tactile FMCG packaging, 3D broadcast keys,
                and high-CTR viral video packaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
