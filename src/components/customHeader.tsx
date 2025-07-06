"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Flame, Plus } from "lucide-react";
import { motion } from "framer-motion";

const navItems = ["dashboard", "habits", "stats", "community"];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 py-3 sticky top-0 z-50 border-b border-transparent shadow-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7),rgba(255,255,255,0.2))] dark:bg-[linear-gradient(to_bottom,rgba(11,15,25,0.7),rgba(11,15,25,0.2))] backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6 col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight"
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <Flame className="text-pink-500 dark:text-pink-400 drop-shadow-sm" size={24} />
              </motion.span>
              HabitVerse
            </Link>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {navItems.map((path) => (
              <motion.div
                key={path}
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/${path}`}
                  className="capitalize transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
                >
                  {path}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </div>

        {/* Actions */}
        <motion.div
          className="flex items-center justify-end gap-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex"
          >
            <Link
              href="/dashboard/habit/new"
              className="group flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-white rounded-full text-sm font-medium shadow-sm hover:bg-pink-100/20 dark:hover:bg-pink-400/10 transition-colors"
            >
              <Plus size={16} />
              <span className="group-hover:translate-x-0.5 transition-transform">
                New
              </span>
            </Link>
          </motion.div>

          <SignedOut>
            <motion.div
              className="flex gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.7,
                  },
                },
              }}
            >
              <SignInButton />
              <SignUpButton>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 5 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-transparent text-neutral-900 dark:text-white rounded-full text-sm font-medium hover:bg-pink-100/20 dark:hover:bg-pink-400/10 transition-colors"
                >
                  Sign Up
                </motion.button>
              </SignUpButton>
            </motion.div>
          </SignedOut>

          <SignedIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "h-8 w-8 ring-1 ring-neutral-300 dark:ring-neutral-700 rounded-full",
                  },
                }}
              />
            </motion.div>
          </SignedIn>
        </motion.div>
      </div>
    </motion.header>
  );
}