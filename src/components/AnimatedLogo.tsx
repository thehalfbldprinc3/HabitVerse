"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none select-none overflow-hidden">
      <motion.h1
        className="text-[18vw] sm:text-[16vw] font-extrabold text-white/10 tracking-tight leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          textShadow: "0 8px 20px rgba(255,255,255,0.05)",
          transform: "translateY(5vh)",
        }}
      >
        HabitVerse
      </motion.h1>
    </div>
  );
}