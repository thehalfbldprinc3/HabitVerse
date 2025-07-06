// app/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-zinc-100 dark:from-[#0b0f19] dark:to-[#161b26]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
        className="h-14 w-14 rounded-full border-4 border-gray-300 border-t-transparent dark:border-gray-700 dark:border-t-white"
      />
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 0.2,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="h-2 w-2 rounded-full bg-gray-700 dark:bg-white"
          />
        ))}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-sm font-medium text-gray-700 dark:text-gray-300 tracking-tight"
      >
        Assembling HabitVerse UI
      </motion.h1>
    </div>
  );
}