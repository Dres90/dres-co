import type { ReactElement } from "react";

export function MdxBody({ children }: { children: ReactElement }) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-zinc-100 prose-pre:text-foreground dark:prose-pre:bg-zinc-900">
      {children}
    </div>
  );
}
