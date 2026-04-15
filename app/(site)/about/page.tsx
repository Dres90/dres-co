import type { Metadata } from "next";

import { MdxBody } from "@/components/mdx-body";
import { compileMdxFile, contentPath } from "@/lib/mdx";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: SITE_DESCRIPTION,
};

export default async function AboutPage() {
  const { content } = await compileMdxFile<Record<string, unknown>>(
    contentPath("pages", "about.mdx"),
  );

  return (
    <article className="space-y-8">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted">{SITE_NAME}</p>
      </header>
      <MdxBody>{content}</MdxBody>
    </article>
  );
}
