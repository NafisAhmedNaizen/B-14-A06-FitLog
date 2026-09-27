"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import Loading from "@/components/Loading";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToPlan, addToSaved, isInPlan, isSaved, planCount } = usePlan();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setWorkout(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Loading message="Loading workout…" />
      </div>
    );
  }

  if (notFound || !workout) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-32 text-center">
        <h1 className="text-4xl font-bold text-[#ccff00]">404</h1>
        <h2 className="text-xl font-bold uppercase tracking-wide text-white">
          Workout Not Found
        </h2>
        <p className="max-w-md text-gray-400">
          This workout doesn&apos;t exist or couldn&apos;t be loaded.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black hover:bg-[#b8e600]"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const handleAddPlan = () => {
    if (planCount >= 5) {
      showToast("Plan is full (max 5 lifts)", "error");
      return;
    }
    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    const ok = addToPlan(workout);
    if (ok) showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }
    addToSaved(workout);
    showToast("Saved for later");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left - Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#111] lg:aspect-auto lg:min-h-125">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-gray-400">{workout.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((mg) => (
              <span
                key={mg}
                className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ccff00]"
              >
                {mg}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="rounded-xl border border-[#222] bg-[#111] p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Key Specs
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {[
                ["EQUIPMENT", workout.equipment],
                ["DIFFICULTY", workout.difficulty],
                ["SETS", String(workout.sets)],
                ["REPS", workout.reps],
                ["DURATION", `${workout.duration} min`],
                ["CALORIES", `${workout.caloriesBurned} kcal`],
                ["RATING", String(workout.rating)],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {label}
                  </div>
                  <div className="mt-0.5 font-medium text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Instructions
            </h3>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddPlan}
              disabled={planCount >= 5 && !isInPlan(workout.id)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to today&apos;s plan
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#333] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#555] hover:bg-[#1a1a1a]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}