"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  planCount: number;
  savedCount: number;
  totalMinutes: number;
  totalCalories: number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PLAN_KEY);
      const s = localStorage.getItem(SAVED_KEY);
      const d = localStorage.getItem(DONE_KEY);
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
      if (d) setDoneIds(JSON.parse(d));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    if (plan.length >= 5) return false;
    if (plan.some((w) => w.id === workout.id)) return false;
    setPlan((prev) => [...prev, workout]);
    return true;
  }, [plan]);

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((d) => d !== id));
  }, []);

  const addToSaved = useCallback((workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) return;
    setSaved((prev) => [...prev, workout]);
  }, [saved]);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const markAsDone = useCallback((id: number) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const isInPlan = useCallback((id: number) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id: number) => saved.some((w) => w.id === id), [saved]);

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        planCount: plan.length,
        savedCount: saved.length,
        totalMinutes,
        totalCalories,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}