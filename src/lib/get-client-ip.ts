import { NextRequest } from "next/server";

/**
 * Extract the client IP address from a NextRequest.
 * Checks x-forwarded-for first (takes the first IP in the chain),
 * then x-real-ip, and falls back to "anonymous".
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "anonymous";
}
