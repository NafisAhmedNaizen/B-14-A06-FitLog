"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");
  const {
    plan,
    saved,
    doneIds,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    totalMinutes,
    totalCalories,
  } = usePlan();
  const { showToast } = useToast();

  const list = tab === "plan" ? plan : saved;

  const handleRemove = (id: number) => {
    if (tab === "plan") {
      removeFromPlan(id);
      showToast("Removed from plan");
    } else {
      removeFromSaved(id);
      showToast("Removed from saved");
    }
  };

  const handleDone = (id: number) => {
    markAsDone(id);
    showToast("Marked as done");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          MY PLAN
        </h1>
        <p className="mt-1 text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Exercises", value: plan.length },
          { label: "Minutes", value: totalMinutes },
          { label: "Calories", value: totalCalories },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-[#222] bg-[#111] px-4 py-5 text-center"
          >
            <div className="text-2xl font-bold text-[#ccff00]">{m.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border border-[#222] bg-[#111] p-1 w-fit">
        <button
          onClick={() => setTab("plan")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            tab === "plan"
              ? "bg-[#ccff00] text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            tab === "saved"
              ? "bg-[#ccff00] text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Saved
        </button>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[#333] py-16 text-center">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white">
            NOTHING HERE YET
          </h3>
          <p className="max-w-sm text-sm text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black hover:bg-[#b8e600]"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((w) => {
            const isDone = doneIds.includes(w.id);
            return (
              <div
                key={w.id}
                className={`flex flex-col gap-4 rounded-xl border border-[#222] bg-[#111] p-4 sm:flex-row sm:items-center ${
                  isDone && tab === "plan" ? "opacity-60" : ""
                }`}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a]">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold uppercase tracking-wide text-white">
                    {w.name}
                    {isDone && tab === "plan" && (
                      <span className="ml-2 text-xs font-normal text-[#ccff00]">
                        ✓ Done
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-gray-500">{w.equipment}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span>{w.duration} min</span>
                    <span>{w.caloriesBurned} kcal</span>
                    <span>★ {w.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="rounded-lg border border-[#333] px-3 py-1.5 text-xs font-medium text-white hover:border-[#555]"
                  >
                    View Details
                  </Link>
                  {tab === "plan" && !isDone && (
                    <button
                      onClick={() => handleDone(w.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#ccff00]/10 px-3 py-1.5 text-xs font-medium text-[#ccff00] hover:bg-[#ccff00]/20"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Done
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(w.id)}
                    className="rounded-lg border border-[#333] px-2.5 py-1.5 text-xs text-gray-400 hover:border-red-500/50 hover:text-red-400"
                    aria-label="Remove"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}