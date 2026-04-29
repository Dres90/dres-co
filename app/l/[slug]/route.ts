import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

import { isAllowedRedirectUrl, isValidShortSlug } from "@/lib/short-links";
import { createAdminClient } from "@/utils/supabase/admin";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isValidShortSlug(slug)) {
    notFound();
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return new NextResponse("Service unavailable", { status: 503 });
  }

  const { data: link, error: fetchError } = await supabase
    .from("short_links")
    .select("id, url")
    .eq("slug", slug)
    .maybeSingle();

  if (fetchError) {
    console.error("[short-links] fetch", fetchError.message);
    return new NextResponse("Service unavailable", { status: 503 });
  }

  if (!link) {
    notFound();
  }

  if (!isAllowedRedirectUrl(link.url)) {
    console.error("[short-links] invalid url for slug", slug);
    notFound();
  }

  const h = await headers();
  const referrer = h.get("referer") ?? h.get("referrer");
  const userAgent = h.get("user-agent");

  const { error: hitError } = await supabase.from("short_link_hits").insert({
    short_link_id: link.id,
    referrer: referrer ?? null,
    user_agent: userAgent ?? null,
  });

  if (hitError) {
    console.error("[short-links] hit insert", hitError.message);
  }

  return NextResponse.redirect(link.url, 302);
}
