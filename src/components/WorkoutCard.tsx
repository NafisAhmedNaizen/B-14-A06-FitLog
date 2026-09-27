"use client";

import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#111] transition-all hover:border-[#333] hover:shadow-lg hover:shadow-[#ccff00]/5"
    >
      <div className="relative aspect-ratio: 4/3; overflow-hidden bg-[#1a1a1a]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((mg) => (
            <span
              key={mg}
              className="rounded-full bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ccff00]"
            >
              {mg}
            </span>
          ))}
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-white line-clamp-1">
          {workout.name}
        </h3>
        <p className="text-xs text-gray-500">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}