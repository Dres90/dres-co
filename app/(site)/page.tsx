import Link from "next/link";

import { MdxBody } from "@/components/mdx-body";
import { compileMdxFile, contentPath } from "@/lib/mdx";
import { LINKEDIN_URL } from "@/lib/site";

export default async function HomePage() {
  const { content } = await compileMdxFile<Record<string, unknown>>(
    contentPath("pages", "home.mdx"),
  );

  return (
    <div className="space-y-10">
      <header className="space-y-4 border-b border-border pb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          Full stack engineer / tech lead
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Building reliable systems and teams across research, ecommerce, and client
          platforms.
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            className="font-medium text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <a
            className="font-medium text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
            href="mailto:andres@dres.co"
          >
            andres@dres.co
          </a>
          <Link
            className="font-medium text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
            href="/andres-cardenas-cv-en.pdf"
          >
            Download CV (PDF)
          </Link>
        </div>
      </header>
      <MdxBody>{content}</MdxBody>
    </div>
  );
}
