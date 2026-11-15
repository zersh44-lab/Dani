"use client";

import { Tv, Sparkles, Package, Image as ImageIcon, Flame, ArrowUpRight } from "lucide-react";
import { DESIGNER_INFO } from "@/data/projectsData";

export default function ServicesSection() {
  const serviceIcons = [
    <Tv key="0" className="w-6 h-6 text-amber-400" />,
    <Sparkles key="1" className="w-6 h-6 text-amber-400" />,
    <Package key="2" className="w-6 h-6 text-amber-400" />,
    <ImageIcon key="3" className="w-6 h-6 text-amber-400" />,
    <Flame key="4" className="w-6 h-6 text-amber-400" />,
  ];

  return (
    <section id="services" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Creative Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Services & Expertise
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
            Specialized creative solutions developed through years of directing national television
            visuals and commercial client releases.
          </p>
        </div>

        <a
          href="#contact"
          className="glass-button text-xs font-semibold px-5 py-2.5 rounded-full text-white flex items-center gap-2 self-start md:self-auto"
          data-cursor="pointer"
        >
          <span>Commission a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
        </a>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {DESIGNER_INFO.services.map((service, idx) => (
          <div
            key={service.title}
            className="group relative glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
            data-cursor="pointer"
          >
            {/* Top Row: Icon & Index */}
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl glass-panel group-hover:scale-110 transition-transform">
                {serviceIcons[idx % serviceIcons.length]}
              </div>
              <span className="font-mono text-xs text-white/30 font-semibold">
                0{idx + 1}
              </span>
            </div>

            {/* Service Content */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {service.description}
              </p>
            </div>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 group-hover:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Highlight Callout Box as 6th item */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-amber-400/20 bg-gradient-to-br from-amber-500/[0.04] to-transparent">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 inline-block">
              Collaborative Workflow
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Looking for End-to-End Creative Direction?
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              From exploratory brand sketches and 3D architectural mockups to final high-resolution
              pre-press and broadcast master delivery.
            </p>
          </div>

          <div className="pt-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            >
              <span>Schedule Creative Consultation →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
