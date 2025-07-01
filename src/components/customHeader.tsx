"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Bell, Flame, Moon, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-center">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
          <Flame size={28} className="text-orange-500" />
          HabitVerse
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/habits">Habits</Link>
          <Link href="/stats">Stats</Link>
          <Link href="/community">Community</Link>
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Streak Indicator */}
        <div className="flex items-center gap-1 text-sm text-orange-600 font-medium">
          <Flame size={18} />
          21-day streak
        </div>
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={18} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Add Habit */}
        <Link
          href="/dashboard/habit/new"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus size={16} />
          New Habit
        </Link>

        {/* Clerk Auth */}
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-md text-sm">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}