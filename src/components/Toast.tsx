"use client";

import { useToast } from "@/context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white shadow-lg animate-slide-in"
          onClick={() => removeToast(t.id)}
        >
          <span className="text-[#ccff00]">✓</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}