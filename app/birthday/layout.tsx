import Link from "next/link";
import type { ReactNode } from "react";

export default function BirthdayLandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-dvh w-full flex-col bg-gradient-to-b from-amber-50/95 via-rose-50/90 to-sky-50/85 text-stone-800">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-rose-200/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <header className="flex shrink-0 items-center justify-end px-4 py-4 sm:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-stone-500 underline decoration-amber-300/80 underline-offset-4 transition-colors hover:text-rose-600 hover:decoration-rose-400"
        >
          ← Home
        </Link>
      </header>

      <div className="flex flex-1 flex-col px-4 pb-16 pt-2 sm:px-8">{children}</div>
    </div>
  );
}
