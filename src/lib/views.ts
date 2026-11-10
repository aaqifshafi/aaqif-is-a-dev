import { createHash } from "node:crypto";

import { Redis } from "@upstash/redis";

/**
 * Site visit counter, stored in Upstash Redis (added through the Vercel
 * Marketplace). Server-only: the token never reaches the browser, so the
 * count can't be inflated by calling the database directly.
 */

const COUNT_KEY = "views:total";
/** Same visitor (hashed IP) inside this window counts once. */
const DEDUPE_SECONDS = 30 * 60;

/** The old public counter, read once to carry the existing total over. */
const LEGACY_COUNTER_URL = "https://countapi.mileshilliard.com/api/v1/get/aaqif-is-a-dev-views";
const LEGACY_FALLBACK = 160;

/**
 * The Vercel integration names its variables `KV_REST_API_*` (legacy Vercel KV
 * naming) or `UPSTASH_REDIS_REST_*`, depending on how it was connected.
 */
function createClient(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = createClient();

export function viewsConfigured(): boolean {
  return redis !== null;
}

/** First run only: start from the old counter's total instead of zero. */
async function ensureSeeded(client: Redis): Promise<void> {
  if ((await client.exists(COUNT_KEY)) === 1) return;
  let seed = LEGACY_FALLBACK;
  try {
    const res = await fetch(LEGACY_COUNTER_URL, { cache: "no-store", signal: AbortSignal.timeout(2000) });
    const data: { value?: unknown } = await res.json();
    if (typeof data.value === "number" && data.value > 0) seed = data.value;
  } catch {
    // The legacy host is unreliable; the fallback is the last known total.
  }
  // NX: if two first requests race, only one seed wins.
  await client.set(COUNT_KEY, seed, { nx: true });
}

/** Hash the IP so no raw address is ever stored. */
function visitorId(ip: string): string {
  return createHash("sha256").update(`aaqif-views:${ip}`).digest("hex").slice(0, 32);
}

export async function readViews(): Promise<number | null> {
  if (!redis) return null;
  await ensureSeeded(redis);
  const value = await redis.get<number>(COUNT_KEY);
  return typeof value === "number" ? value : null;
}

/**
 * Count a visit and return the total. A visitor seen in the last 30 minutes
 * isn't counted again, so refreshing or replaying the request can't pad it.
 */
export async function recordView(ip: string | null): Promise<number | null> {
  if (!redis) return null;
  await ensureSeeded(redis);
  if (ip) {
    const fresh = await redis.set(`views:seen:${visitorId(ip)}`, 1, { nx: true, ex: DEDUPE_SECONDS });
    if (fresh === null) return readViews();
  }
  return redis.incr(COUNT_KEY);
}
