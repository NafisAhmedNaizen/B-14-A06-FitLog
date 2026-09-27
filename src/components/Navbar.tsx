"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#222] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight text-white">FITLOG</span>
        </Link>

        {/* Center links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/") && pathname === "/"
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-medium transition-colors ${
              isActive("/my-plan")
                ? "text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
          >
            Plan
            <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-[#444] px-3 py-1 text-xs font-medium text-gray-300 hover:border-[#666]"
          >
            Saved
            <span className="rounded-full bg-[#222] px-1.5 py-0.5 text-[10px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile links */}
      <div className="flex sm:hidden items-center justify-center gap-6 border-t border-[#1a1a1a] py-2">
        <Link
          href="/"
          className={`text-sm font-medium ${
            isActive("/") && pathname === "/" ? "text-[#ccff00]" : "text-gray-400"
          }`}
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={`text-sm font-medium ${
            isActive("/my-plan") ? "text-[#ccff00]" : "text-gray-400"
          }`}
        >
          My Plan
        </Link>
      </div>
    </nav>
  );
}