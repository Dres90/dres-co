import { NextResponse } from "next/server";

import { createAdminClient } from "@/utils/supabase/admin";

/**
 * Siri / Shortcuts example: POST with header
 *   Authorization: Bearer <WEIGHT_WEBHOOK_SECRET>
 * JSON body: { "kg": 72.4, "note": "morning" }
 *
 * Requires SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, WEIGHT_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.WEIGHT_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured: WEIGHT_WEBHOOK_SECRET missing" },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Expected JSON object" }, { status: 400 });
  }

  const kg = (body as { kg?: unknown }).kg;
  const note = (body as { note?: unknown }).note;

  if (typeof kg !== "number" || Number.isNaN(kg) || kg < 30 || kg > 400) {
    return NextResponse.json(
      { error: "kg must be a number between 30 and 400" },
      { status: 400 },
    );
  }

  if (note !== undefined && typeof note !== "string") {
    return NextResponse.json({ error: "note must be a string" }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Server misconfigured: Supabase env missing" },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("weight_entries").insert({
    kg,
    note: note ?? null,
    source: "api",
    raw_payload: body as Record<string, unknown>,
  });

  if (error) {
    console.error("[weight] insert error", error.message);
    return NextResponse.json({ error: "Storage failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
