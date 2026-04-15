"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { showLabsNav } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/portfolio", label: "Portfolio" },
] as const;

function navClass(active: boolean) {
  return [
    "text-sm transition-colors",
    active ? "text-foreground font-medium" : "text-muted hover:text-foreground",
  ].join(" ");
}

export function SiteNav() {
  const pathname = usePathname();
  const labs = showLabsNav();

  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Main">
      {links.map(({ href, label }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} className={navClass(active)}>
            {label}
          </Link>
        );
      })}
      {labs ? (
        <Link
          href="/labs"
          className={navClass(pathname === "/labs" || pathname.startsWith("/labs/"))}
        >
          Labs
        </Link>
      ) : null}
    </nav>
  );
}
