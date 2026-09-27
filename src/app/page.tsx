"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types/workout";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkouts(data);
      } catch (e) {
        setError("Could not load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Hero />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="py-20 text-center text-red-400">{error}</div>
      ) : (
        <Library workouts={workouts} />
      )}
    </div>
  );
}