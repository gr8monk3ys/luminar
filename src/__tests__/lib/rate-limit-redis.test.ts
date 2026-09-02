import { describe, it, expect, vi, beforeEach } from 'vitest'

// A stand-in for the Upstash REST client. Only the four methods the kit's
// RedisStore calls are implemented; `failing` flips it into an outage.
const store = new Map<string, { count: number; expiresAt: number }>()
const state = { failing: false }

function guard() {
  if (state.failing) throw new Error('redis unavailable')
}

const fakeRedis = {
  incr: vi.fn(async (key: string) => {
    guard()
    const now = Date.now()
    const entry = store.get(key)
    if (!entry || now >= entry.expiresAt) {
      store.set(key, { count: 1, expiresAt: Number.POSITIVE_INFINITY })
      return 1
    }
    entry.count += 1
    return entry.count
  }),
  pexpire: vi.fn(async (key: string, ms: number) => {
    guard()
    const entry = store.get(key)
    if (!entry) return 0
    entry.expiresAt = Date.now() + ms
    return 1
  }),
  pttl: vi.fn(async (key: string) => {
    guard()
    const entry = store.get(key)
    if (!entry) return -2
    if (entry.expiresAt === Number.POSITIVE_INFINITY) return -1
    return Math.max(0, entry.expiresAt - Date.now())
  }),
  del: vi.fn(async (key: string) => {
    guard()
    return store.delete(key) ? 1 : 0
  }),
}

vi.mock('@/lib/redis', () => ({
  redis: () => fakeRedis,
}))

import { rateLimit } from '@/lib/rate-limit'

describe('rateLimit (Redis path)', () => {
  let keyCounter = 0
  function uniqueKey() {
    return `redis-key-${Date.now()}-${keyCounter++}`
  }

  beforeEach(() => {
    state.failing = false
  })

  it('counts against a versioned key so it cannot collide with the old scheme', async () => {
    const key = uniqueKey()
    fakeRedis.incr.mockClear()

    await rateLimit(key, { limit: 5, windowMs: 60000 })

    expect(fakeRedis.incr).toHaveBeenCalledWith(`rate-limit:v2:${key}`)
    // The previous implementation appended an epoch-aligned window index; the
    // kit's key is bare, so the two schemes never share a bucket.
    expect(fakeRedis.incr.mock.calls[0][0]).not.toMatch(/:\d{5,}$/)
  })

  it('sets the window TTL on the first request only', async () => {
    const key = uniqueKey()
    fakeRedis.pexpire.mockClear()

    await rateLimit(key, { limit: 5, windowMs: 60000 })
    expect(fakeRedis.pexpire).toHaveBeenCalledWith(`rate-limit:v2:${key}`, 60000)

    await rateLimit(key, { limit: 5, windowMs: 60000 })
    expect(fakeRedis.pexpire).toHaveBeenCalledTimes(1)
  })

  it('blocks once the limit is exceeded and reports ms until reset', async () => {
    const key = uniqueKey()

    const r1 = await rateLimit(key, { limit: 2, windowMs: 60000 })
    const r2 = await rateLimit(key, { limit: 2, windowMs: 60000 })
    const r3 = await rateLimit(key, { limit: 2, windowMs: 60000 })

    expect([r1.success, r2.success, r3.success]).toEqual([true, true, false])
    expect(r1.remaining).toBe(1)
    expect(r3.remaining).toBe(0)
    expect(r3.reset).toBeGreaterThan(0)
    expect(r3.reset).toBeLessThanOrEqual(60000)
  })

  it('falls back to the in-memory limiter when Redis throws', async () => {
    const key = uniqueKey()
    state.failing = true

    // Still enforces the limit rather than failing open or returning a 500.
    const r1 = await rateLimit(key, { limit: 1, windowMs: 60000 })
    const r2 = await rateLimit(key, { limit: 1, windowMs: 60000 })

    expect(r1.success).toBe(true)
    expect(r2.success).toBe(false)
  })
})
