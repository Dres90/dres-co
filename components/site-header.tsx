import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground hover:text-accent"
        >
          {SITE_NAME}
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
