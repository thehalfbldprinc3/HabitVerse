"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function NewHabitPage() {
  const router = useRouter();
  const createHabit = trpc.habit.create.useMutation({
    onSuccess: () => router.push("/dashboard/habits"),
  });

  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("DAILY");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🔥");
  const [color, setColor] = useState("#4f46e5");
  const [reminderTime, setReminderTime] = useState("");

  const [errors, setErrors] = useState<{ title?: string; icon?: string; reminderTime?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};

    if (!title.trim()) errs.title = "Title cannot be empty.";
    if (icon && icon.length > 2) errs.icon = "Max 2 characters.";
    if (reminderTime) {
      const [hh, mm] = reminderTime.split(":").map(Number);
      if (
        isNaN(hh) || isNaN(mm) ||
        hh < 0 || hh > 23 || mm < 0 || mm > 59
      ) {
        errs.reminderTime = "Invalid time.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createHabit.mutate({
      title,
      frequency,
      startDate: new Date().toISOString(),
      description,
      icon,
      color,
      reminderTime: reminderTime || undefined,
      groupId: "your-group-id-here", // replace with actual groupId
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 bg-white dark:bg-[#0b0f19] border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 shadow-md transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-2xl font-bold text-neutral-800 dark:text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Create a New Habit
      </motion.h1>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Title
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-md bg-transparent text-neutral-900 dark:text-white ${errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500"
            } focus:outline-none focus:ring-2`}
          placeholder="e.g., Meditate"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-md bg-transparent text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your habit (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Frequency
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md bg-transparent text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Reminder Time
          </label>
          <input
            type="time"
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-neutral-900 dark:text-white ${errors.reminderTime
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          {errors.reminderTime && (
            <p className="text-sm text-red-500">{errors.reminderTime}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Icon
          </label>
          <input
            type="text"
            maxLength={2}
            className={`w-full px-4 py-2 border rounded-md bg-transparent text-neutral-900 dark:text-white ${errors.icon
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500"
              } focus:outline-none focus:ring-2`}
            placeholder="🔥"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Color
          </label>
          <input
            type="color"
            className="w-full h-10 border rounded-md p-0 bg-transparent border-neutral-300 dark:border-neutral-700 cursor-pointer"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={createHabit.isPending || Object.keys(errors).length > 0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md font-medium shadow-md hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {createHabit.isPending ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            Creating...
          </>
        ) : (
          "Create Habit"
        )}
      </motion.button>
    </motion.form>
  );
}