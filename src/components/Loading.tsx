export default function Loading({ message = "Loading workouts…" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#333] border-t-[#ccff00]" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}