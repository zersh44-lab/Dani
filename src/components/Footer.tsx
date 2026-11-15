"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Clock } from "lucide-react";
import { DESIGNER_INFO } from "@/data/projectsData";

export default function Footer() {
  const [addisTime, setAddisTime] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<string>("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Addis_Ababa",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setAddisTime(timeStr);
      } catch (e) {
        setAddisTime("EAT (UTC+3)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-12 pb-28 sm:pb-32 px-4 sm:px-8 border-t border-white/10 z-10 bg-[#05070a]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/50">
        {/* Left: Designer Mark & Location */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span className="font-bold tracking-wider text-white uppercase">{DESIGNER_INFO.name}</span>
          <span>·</span>
          <span>Addis Ababa, Ethiopia</span>
        </div>

        {/* Center: Live Local Time in Addis Ababa */}
        <div className="flex items-center gap-2 glass-pill px-3 py-1.5 font-mono text-[11px] text-white/70">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Addis Ababa:</span>
          <span className="text-white font-semibold">{addisTime || "Loading..."}</span>
        </div>

        {/* Right: Back to Top Button */}
        <div className="flex items-center gap-4">
          <span>© {currentYear} Dani. All Rights Reserved.</span>
          <button
            onClick={scrollToTop}
            className="glass-button p-2 rounded-full text-white/80 hover:text-white"
            aria-label="Back to Top"
            data-cursor="pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
