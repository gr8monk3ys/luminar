/**
 * Rate limiting.
 *
 * Thin app-specific layer over `@gr8monk3ys/next-kit/rate-limit`. This module
 * owns the things that are luminar's: the `rateLimit(identifier, options)`
 * signature the API routes call, the default limit/window, and the `reset`
 * value expressed as *milliseconds remaining* (routes turn it straight into a
 * `Retry-After` header). The window accounting and the store implementations
 * live in the kit.
 *
 * Uses Upstash Redis when configured, and falls back to an in-process store
 * when it is not — or when Redis is configured but unreachable.
 */

import {
  createRateLimiter,
  MemoryStore,
  RedisStore,
  type RateLimiter,
  type RateLimitStore,
} from "@gr8monk3ys/next-kit/rate-limit";
import { redis } from "@/lib/redis";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  /** Milliseconds until the current window resets. */
  reset: number;
}

interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

const DEFAULT_LIMIT = 60;
const DEFAULT_WINDOW_MS = 60_000; // 60 seconds

/**
 * In-process fallback. The kit's MemoryStore sweeps expired keys on access, so
 * unlike the timer this replaces it cannot hold the Node process open.
 */
const memoryStore = new MemoryStore();

/**
 * Module-level singleton Redis store.
 *
 * The Upstash REST client already satisfies the kit's `RedisLike` shape
 * (`incr` / `pexpire` / `pttl` / `del`), so no adapter is needed.
 *
 * The prefix is versioned. The previous implementation wrote
 * `rate-limit:<id>:<windowIndex>` — a counter per epoch-aligned window, with a
 * new key name every window — while the kit writes one key per identifier and
 * lets its TTL end the window. Both are plain strings under `INCR`, so there is
 * no WRONGTYPE hazard, but `:v2:` keeps the two schemes from sharing a bucket
 * while the old keys drain their TTLs.
 */
let redisStore: RateLimitStore | null | undefined;

function getRedisStore(): RateLimitStore | null {
  if (redisStore !== undefined) return redisStore;

  const client = redis();
  redisStore = client
    ? new RedisStore(client, {
        prefix: "rate-limit:v2:",
        // Surface the failure to rateLimit() so it can fall back to the
        // in-memory limiter, which still enforces the configured limit per
        // instance, rather than failing open entirely.
        onError: "closed",
      })
    : null;

  return redisStore;
}

/**
 * Limiter instances cached per (limit, window) so one is not built per request.
 *
 * No `prefix` is passed to `createRateLimiter`: keys stay the bare identifier,
 * so a caller's requests count against a single bucket across every route, as
 * they did before. Namespacing per route here would silently loosen the limits.
 */
const redisLimiters = new Map<string, RateLimiter>();
const memoryLimiters = new Map<string, RateLimiter>();

function getLimiter(
  cache: Map<string, RateLimiter>,
  store: RateLimitStore,
  limit: number,
  windowMs: number
): RateLimiter {
  const cacheKey = `${limit}:${windowMs}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const limiter = createRateLimiter({ store, limit, windowMs });
  cache.set(cacheKey, limiter);
  return limiter;
}

async function check(
  cache: Map<string, RateLimiter>,
  store: RateLimitStore,
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const result = await getLimiter(cache, store, limit, windowMs).check(
    identifier
  );

  return {
    success: result.ok,
    remaining: result.remaining,
    reset: Math.max(0, result.resetAt - Date.now()),
  };
}

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

  const store = getRedisStore();

  if (store) {
    try {
      return await check(redisLimiters, store, identifier, limit, windowMs);
    } catch {
      // Redis error — fall through to in-memory limiter so the API stays up
    }
  }

  return check(memoryLimiters, memoryStore, identifier, limit, windowMs);
}
