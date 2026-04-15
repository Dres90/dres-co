import Link from "next/link";

import { EMAIL_ALT, EMAIL_PRIMARY, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-5 py-10 text-sm text-muted">
        <p>{SITE_NAME} · Barcelona · Spanish & English</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <Link
            className="underline decoration-border underline-offset-4 hover:text-foreground"
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <a
            className="underline decoration-border underline-offset-4 hover:text-foreground"
            href={`mailto:${EMAIL_PRIMARY}`}
          >
            {EMAIL_PRIMARY}
          </a>
          <a
            className="underline decoration-border underline-offset-4 hover:text-foreground"
            href={`mailto:${EMAIL_ALT}`}
          >
            {EMAIL_ALT}
          </a>
          <Link
            className="underline decoration-border underline-offset-4 hover:text-foreground"
            href="/cv"
          >
            CV
          </Link>
        </p>
      </div>
    </footer>
  );
}
