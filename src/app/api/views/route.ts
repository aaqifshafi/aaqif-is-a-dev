import { NextResponse, type NextRequest } from "next/server";

import { readViews, recordView, viewsConfigured } from "@/lib/views";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

function unavailable() {
  // No database configured (e.g. local dev without env vars): the footer hides the count.
  return NextResponse.json({ error: "views unavailable" }, { status: 503, headers });
}

function clientIp(request: NextRequest): string | null {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
}

/** Read the total without counting. */
export async function GET() {
  if (!viewsConfigured()) return unavailable();
  try {
    return NextResponse.json({ value: await readViews() }, { headers });
  } catch {
    return unavailable();
  }
}

/** Count this visit (deduped per visitor) and return the total. */
export async function POST(request: NextRequest) {
  if (!viewsConfigured()) return unavailable();
  try {
    return NextResponse.json({ value: await recordView(clientIp(request)) }, { headers });
  } catch {
    return unavailable();
  }
}
