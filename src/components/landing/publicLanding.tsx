"use client";

import { SignUpButton, SignInButton } from "@clerk/nextjs";
import AnimatedLogo from "../AnimatedLogo";

export default function PublicLanding() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0a0e1a] min-h-screen px-6 py-24 sm:py-32 lg:px-8 flex items-center justify-center">
      {/* Ambient radial glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50" />

      {/* Foreground content */}
      <div className="z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <AnimatedLogo />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          Master Your Habits
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300">
          Build consistency. Track progress. Join a focused community reshaping their lives—one habit at a time.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <SignUpButton>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition duration-300 shadow-md">
              Get Started
            </button>
          </SignUpButton>

          <SignInButton>
            <button className="px-6 py-3 border border-indigo-400 hover:border-indigo-500 text-indigo-300 hover:text-white font-semibold rounded-full transition duration-300 shadow-md">
              Already a member? Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}