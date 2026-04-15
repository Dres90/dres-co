import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-5 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        The page you requested does not exist or has moved.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-accent underline decoration-border underline-offset-4"
      >
        Back home
      </Link>
    </div>
  );
}
