import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description: "Small front-end experiments and UI sketches.",
};

export default function LabsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Labs</h1>
        <p className="text-muted">
          A sandbox for motion, layout, and interaction ideas that do not need to ship
          on the main marketing pages.
        </p>
      </header>
      <section className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted">
        <p>
          Add routes under{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
            app/labs/
          </code>{" "}
          as you build demos.
        </p>
      </section>
    </div>
  );
}
