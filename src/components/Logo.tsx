"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function AnimatedLogo() {
  return (
    <motion.div
      className="group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xl font-bold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Glare effect */}
      <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-white/20 to-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-10" />

      {/* Bottom Glow */}
      <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[150%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-70" />

      {/* Flame Icon with pulse */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        className="text-pink-500 drop-shadow-[0_0_6px_rgba(255,105,180,0.5)]"
      >
        <Flame size={22} />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
      >
        HabitVerse
      </motion.span>

      <Link href="/" className="absolute inset-0" />
    </motion.div>
  );
}