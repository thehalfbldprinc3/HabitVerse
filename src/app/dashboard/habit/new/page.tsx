"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function NewHabitPage() {
  const router = useRouter();
  const createHabit = trpc.habit.create.useMutation({
    onSuccess: () => router.push("/dashboard/habits"),
  });

  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("DAILY");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createHabit.mutate({
      userId: "hardcoded-user-id",
      tenantId: "hardcoded-tenant-id",
      title,
      frequency,
      startDate: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Create New Habit</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Habit title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="w-full p-2 border rounded"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
      </select>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded"
        disabled={createHabit.isPending}
      >
        {createHabit.isPending ? "Creating..." : "Create Habit"}
      </button>
    </form>
  );
}