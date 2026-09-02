import { NextRequest } from "next/server";

/**
 * Extract the client IP address from a NextRequest, for use as a rate-limit
 * bucket key.
 *
 * The whole point is that a caller must not be able to choose its own bucket.
 * `x-real-ip` is set by the platform and overwritten on every request, so it is
 * checked first. `x-forwarded-for` is a list that proxies APPEND to: its
 * left-most entry is whatever the caller invented and its right-most entry is
 * the hop our own edge added. Reading `[0]` — the obvious thing, and what this
 * function used to do — lets anyone mint a fresh bucket per request just by
 * rotating a header.
 *
 * Deliberately NOT `@gr8monk3ys/next-kit`'s `getClientId`: as of v0.1.1 that
 * helper trusts `cf-connecting-ip` first, which is fully client-controlled on
 * Vercel, where this app runs and where nothing strips it. Revisit once the
 * kit ships v0.1.2 with an explicit trusted-header list.
 */
export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    const nearest = hops[hops.length - 1];
    if (nearest) return nearest;
  }

  return "anonymous";
}
