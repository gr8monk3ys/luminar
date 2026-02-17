import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the redis module to return null (force in-memory rate limiter)
vi.mock('@/lib/redis', () => ({
  redis: () => null,
}))

import { rateLimit } from '@/lib/rate-limit'

describe('rateLimit (in-memory fallback)', () => {
  // Use unique keys per test to avoid cross-test interference
  let keyCounter = 0
  function uniqueKey() {
    return `test-key-${Date.now()}-${keyCounter++}`
  }

  // ── First request succeeds ────────────────────────────────────────────

  it('first request succeeds', async () => {
    const key = uniqueKey()
    const result = await rateLimit(key, { limit: 5, windowMs: 60000 })
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
  })

  // ── Requests within limit succeed ─────────────────────────────────────

  it('requests within limit succeed', async () => {
    const key = uniqueKey()
    const opts = { limit: 3, windowMs: 60000 }

    const r1 = await rateLimit(key, opts)
    const r2 = await rateLimit(key, opts)
    const r3 = await rateLimit(key, opts)

    expect(r1.success).toBe(true)
    expect(r2.success).toBe(true)
    expect(r3.success).toBe(true)
  })

  // ── Requests exceeding limit fail ─────────────────────────────────────

  it('requests exceeding limit fail', async () => {
    const key = uniqueKey()
    const opts = { limit: 2, windowMs: 60000 }

    await rateLimit(key, opts)
    await rateLimit(key, opts)
    const r3 = await rateLimit(key, opts)

    expect(r3.success).toBe(false)
    expect(r3.remaining).toBe(0)
  })

  // ── Different keys have separate limits ───────────────────────────────

  it('different keys have separate limits', async () => {
    const keyA = uniqueKey()
    const keyB = uniqueKey()
    const opts = { limit: 1, windowMs: 60000 }

    const rA = await rateLimit(keyA, opts)
    const rB = await rateLimit(keyB, opts)

    expect(rA.success).toBe(true)
    expect(rB.success).toBe(true)

    // Both should now be exhausted independently
    const rA2 = await rateLimit(keyA, opts)
    const rB2 = await rateLimit(keyB, opts)
    expect(rA2.success).toBe(false)
    expect(rB2.success).toBe(false)
  })

  // ── Returns correct remaining count ───────────────────────────────────

  it('returns correct remaining count', async () => {
    const key = uniqueKey()
    const opts = { limit: 5, windowMs: 60000 }

    const r1 = await rateLimit(key, opts)
    expect(r1.remaining).toBe(4)

    const r2 = await rateLimit(key, opts)
    expect(r2.remaining).toBe(3)

    const r3 = await rateLimit(key, opts)
    expect(r3.remaining).toBe(2)

    const r4 = await rateLimit(key, opts)
    expect(r4.remaining).toBe(1)

    const r5 = await rateLimit(key, opts)
    expect(r5.remaining).toBe(0)

    // Next one should fail
    const r6 = await rateLimit(key, opts)
    expect(r6.success).toBe(false)
    expect(r6.remaining).toBe(0)
  })

  // ── Reset value is a positive number ──────────────────────────────────

  it('reset value is a positive number', async () => {
    const key = uniqueKey()
    const result = await rateLimit(key, { limit: 5, windowMs: 60000 })
    expect(result.reset).toBeGreaterThan(0)
  })
})
