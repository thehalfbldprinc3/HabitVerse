"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";


export default function SignedInLanding() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn || !user) return null;
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0a0e1a] min-h-screen px-6 py-24 sm:py-32 lg:px-8 flex items-center justify-center">
      {/* Background blur layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-indigo-500/10 to-transparent blur-3xl opacity-50" />

      {/* Sign Out Button */}
      <div className="absolute top-6 right-6 z-10">
        <SignOutButton>
          <button className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20 hover:shadow-md transition-all duration-300">
            Sign Out
          </button>
        </SignOutButton>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 text-center max-w-2xl"
      >
        <div className="mb-10  flex justify-center">
          <Logo />
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          Welcome back, {user.firstName ?? user.username ?? "User"}
        </h1>

        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-24 h-24 rounded-full mx-auto mt-6 shadow-lg border-4 border-white/20"
          />
        )}

        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </motion.div>
    </div>
  );
}