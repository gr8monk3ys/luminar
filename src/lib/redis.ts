import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

let _redis: ReturnType<typeof getRedis> | undefined;

export function redis() {
  if (_redis === undefined) {
    _redis = getRedis();
  }
  return _redis;
}

export function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

// Cache helpers
const DEFAULT_TTL = 300; // 5 minutes

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = DEFAULT_TTL
): Promise<T> {
  const r = redis();
  if (!r) return fetcher();

  const hit = await r.get<T>(key);
  if (hit !== null) return hit;

  const data = await fetcher();
  await r.set(key, data, { ex: ttl });
  return data;
}

export async function invalidate(pattern: string): Promise<void> {
  const r = redis();
  if (!r) return;

  const keys = await r.keys(pattern);
  if (keys.length > 0) {
    await r.del(...keys);
  }
}
