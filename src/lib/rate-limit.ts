import { redis } from "@/lib/redis";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

const DEFAULT_LIMIT = 60;
const DEFAULT_WINDOW_MS = 60_000; // 60 seconds

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

interface MemoryEntry {
  timestamps: number[];
}

const memoryStore = new Map<string, MemoryEntry>();

// Periodically clean up expired entries to prevent memory leaks.
// Runs every 60 seconds.
const CLEANUP_INTERVAL_MS = 60_000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore) {
      // Remove timestamps older than the largest possible window (we use the
      // default window for cleanup; entries whose window has passed will
      // naturally have all timestamps pruned on next access).
      entry.timestamps = entry.timestamps.filter(
        (t) => now - t < DEFAULT_WINDOW_MS * 2
      );
      if (entry.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    }
    // If the store is empty, stop the timer so it doesn't keep the process alive.
    if (memoryStore.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the Node.js process to exit even if the timer is still running.
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

async function rateLimitMemory(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  ensureCleanupTimer();

  const now = Date.now();
  const windowStart = now - windowMs;

  let entry = memoryStore.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    memoryStore.set(identifier, entry);
  }

  // Sliding window: keep only timestamps within the current window
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= limit) {
    // Rate limited — find when the oldest timestamp in the window expires
    const oldestInWindow = entry.timestamps[0];
    const resetMs = oldestInWindow + windowMs - now;
    return {
      success: false,
      remaining: 0,
      reset: resetMs,
    };
  }

  entry.timestamps.push(now);

  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    reset: windowMs,
  };
}

// ---------------------------------------------------------------------------
// Redis-based sliding window using INCR + EXPIRE
// ---------------------------------------------------------------------------

async function rateLimitRedis(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const r = redis()!;
  const windowSec = Math.ceil(windowMs / 1000);

  // Use a key that rotates with each window. The window index is derived from
  // the current time divided by the window size, giving us fixed windows that
  // approximate a sliding window (simpler and very effective at scale).
  const windowIndex = Math.floor(Date.now() / windowMs);
  const key = `rate-limit:${identifier}:${windowIndex}`;

  const count = await r.incr(key);

  // Set expiry on the first request in this window
  if (count === 1) {
    await r.expire(key, windowSec);
  }

  const remaining = Math.max(0, limit - count);
  // Time until the current window resets
  const resetMs = windowMs - (Date.now() % windowMs);

  if (count > limit) {
    return {
      success: false,
      remaining: 0,
      reset: resetMs,
    };
  }

  return {
    success: true,
    remaining,
    reset: resetMs,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Rate-limit a request identified by `identifier`.
 *
 * Uses Redis when available; otherwise falls back to an in-memory store.
 *
 * @param identifier - Unique string for the requester (e.g. IP address or user ID).
 * @param options.limit - Maximum number of requests allowed per window (default 60).
 * @param options.windowMs - Window duration in milliseconds (default 60 000).
 * @returns An object with `success`, `remaining` count, and `reset` time in ms.
 */
export async function rateLimit(
  identifier: string,
  options?: RateLimitOptions
): Promise<RateLimitResult> {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;

  const r = redis();

  if (r) {
    try {
      return await rateLimitRedis(identifier, limit, windowMs);
    } catch {
      // Redis error — fall through to in-memory limiter so the API stays up
    }
  }

  return rateLimitMemory(identifier, limit, windowMs);
}
