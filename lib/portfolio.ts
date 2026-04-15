import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

export type PortfolioFrontmatter = {
  title: string;
  summary: string;
  role?: string;
  dates?: string;
  stack?: string;
  draft?: boolean;
};

const PORTFOLIO_DIR = path.join(process.cwd(), "content", "portfolio");

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PORTFOLIO_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getPortfolioMetaForSlug(
  slug: string,
): Promise<{ slug: string; frontmatter: PortfolioFrontmatter } | null> {
  const filePath = path.join(PORTFOLIO_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      frontmatter: data as PortfolioFrontmatter,
    };
  } catch {
    return null;
  }
}

export async function listPortfolioAll(): Promise<
  { slug: string; frontmatter: PortfolioFrontmatter }[]
> {
  const slugs = await getPortfolioSlugs();
  const items = await Promise.all(slugs.map((slug) => getPortfolioMetaForSlug(slug)));
  return items
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}
