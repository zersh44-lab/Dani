"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SitePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only run on fresh load/session
    const hasLoaded = sessionStorage.getItem("dani_preloader_shown");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("dani_preloader_shown", "true");
          }, 350);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070a] select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-sky-500/20 via-amber-500/20 to-transparent filter blur-3xl opacity-60 pointer-events-none" />

          {/* Paperplane Animation Card Frame */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] max-w-sm mx-4"
          >
            {/* The Animated Paperplane */}
            <div className="relative w-36 h-28 flex items-center justify-center">
              <Image
                src="/images/paperplane.webp"
                alt="Loading Dani Studio"
                width={150}
                height={112}
                priority
                unoptimized
                className="w-full h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(94,103,253,0.4)]"
              />
            </div>

            {/* Typography */}
            <div className="text-center mt-3 space-y-1">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-white uppercase font-mono">
                DANI STUDIO
              </h2>
              <p className="text-xs text-white/50 font-light tracking-wide">
                Preparing Creative Portfolio...
              </p>
            </div>

            {/* Liquid Glass Progress Bar */}
            <div className="w-44 sm:w-52 h-1.5 rounded-full bg-white/10 overflow-hidden mt-5 p-0.5 border border-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="text-[10px] font-mono text-white/40 mt-2">
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}