import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-wide text-white">
        Page Not Found
      </h2>
      <p className="max-w-md text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
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