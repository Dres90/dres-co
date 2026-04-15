import type { Metadata } from "next";
import Link from "next/link";

import { listPortfolioAll } from "@/lib/portfolio";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Selected projects and case studies by ${SITE_NAME}.`,
};

export default async function PortfolioIndexPage() {
  const items = await listPortfolioAll();

  return (
    <div className="space-y-10">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
        <p className="max-w-2xl text-muted">
          Notes on systems, delivery, and technical leadership. More visuals and links
          can be layered in as each piece is ready to publish.
        </p>
      </header>
      <ul className="space-y-6">
        {items.map(({ slug, frontmatter }) => (
          <li
            key={slug}
            className="rounded-lg border border-border p-5 transition-colors hover:border-accent/40"
          >
            <Link href={`/portfolio/${slug}`} className="block space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground hover:text-accent">
                  {frontmatter.title}
                </h2>
                {frontmatter.draft ? (
                  <span className="rounded border border-amber-700/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:border-amber-400/40 dark:text-amber-300">
                    Draft
                  </span>
                ) : null}
              </div>
              {(frontmatter.role || frontmatter.dates) && (
                <p className="text-xs uppercase tracking-wide text-muted">
                  {[frontmatter.role, frontmatter.dates].filter(Boolean).join(" · ")}
                </p>
              )}
              <p className="text-sm text-muted">{frontmatter.summary}</p>
              {frontmatter.stack ? (
                <p className="text-xs text-muted">{frontmatter.stack}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      {items.length === 0 ? (
        <p className="text-sm text-muted">No published portfolio entries yet.</p>
      ) : null}
    </div>
  );
}
