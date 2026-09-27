import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </span>
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>
          <p className="max-w-md text-base text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div>
            <Link
              href="#library"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              BROWSE WORKOUTS
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <Image
            src="/banner.png"
            alt="Workout illustration"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}