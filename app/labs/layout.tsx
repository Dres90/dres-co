import Link from "next/link";

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-sm font-medium text-muted hover:text-accent">
            ← Site
          </Link>
          <span className="text-xs uppercase tracking-widest text-muted">Labs</span>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-5 py-12">{children}</main>
    </div>
  );
}
