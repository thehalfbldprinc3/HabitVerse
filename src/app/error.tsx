"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 sm:px-10 text-center bg-gradient-to-br from-red-100/40 to-pink-100/20 dark:from-red-900/30 dark:to-pink-900/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
        <AlertTriangle className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>
      <p className="text-neutral-600 dark:text-neutral-300 max-w-md">
        An unexpected error occurred. We’re working on it.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-sm font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-white rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
}