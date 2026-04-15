import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";

export async function compileMdxFile<T extends Record<string, unknown>>(
  absolutePath: string,
): Promise<{ frontmatter: T; content: ReactElement }> {
  const raw = await fs.readFile(absolutePath, "utf8");
  const { data, content } = matter(raw);
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  });
  return { frontmatter: data as T, content: mdxContent };
}

export function contentPath(...segments: string[]): string {
  return path.join(process.cwd(), "content", ...segments);
}
