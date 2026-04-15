import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxBody } from "@/components/mdx-body";
import { compileMdxFile, contentPath } from "@/lib/mdx";
import { getPortfolioMetaForSlug, getPortfolioSlugs } from "@/lib/portfolio";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPortfolioMetaForSlug(slug);
  if (!meta) return { title: "Not found" };
  return {
    title: meta.frontmatter.title,
    description: meta.frontmatter.summary,
    openGraph: {
      title: `${meta.frontmatter.title} · ${SITE_NAME}`,
      description: meta.frontmatter.summary,
    },
  };
}

export default async function PortfolioEntryPage({ params }: Props) {
  const { slug } = await params;
  const meta = await getPortfolioMetaForSlug(slug);
  if (!meta) notFound();

  const filePath = contentPath("portfolio", `${slug}.mdx`);
  const { content } = await compileMdxFile<Record<string, unknown>>(filePath);

  return (
    <article className="space-y-8">
      <div className="space-y-2 border-b border-border pb-8">
        <Link
          href="/portfolio"
          className="text-sm font-medium text-muted hover:text-accent"
        >
          ← Portfolio
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          {meta.frontmatter.title}
        </h1>
        {(meta.frontmatter.role || meta.frontmatter.dates) && (
          <p className="text-sm text-muted">
            {[meta.frontmatter.role, meta.frontmatter.dates]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
        {meta.frontmatter.draft ? (
          <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
            Draft
          </p>
        ) : null}
      </div>
      <MdxBody>{content}</MdxBody>
    </article>
  );
}
