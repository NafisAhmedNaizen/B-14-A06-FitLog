"use client";

import { useState, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface Props {
  workouts: Workout[];
}

export default function Library({ workouts }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sorted = useMemo(() => {
    const list = [...workouts];
    if (sortBy === "duration") list.sort((a, b) => a.duration - b.duration);
    else if (sortBy === "calories") list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            THE LIBRARY
          </h2>
          <p className="mt-1 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <div className="relative">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-[#333] bg-[#111] px-4 py-2 pr-10 text-sm text-white focus:border-[#ccff00] focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </section>
  );
}