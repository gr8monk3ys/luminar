import { describe, it, expect } from 'vitest'
import { sm2 } from '@/lib/spaced-repetition'
import type { SM2Result } from '@/lib/spaced-repetition'

describe('sm2 – SM-2 Spaced Repetition Algorithm', () => {
  const defaultEF = 2.5

  // ── Quality < 3 should reset ──────────────────────────────────────────

  it('quality < 3 resets repetitions to 0 and interval to 1', () => {
    for (const q of [0, 1, 2]) {
      const result: SM2Result = sm2(q, defaultEF, 10, 5)
      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(1)
    }
  })

  // ── Quality >= 3 should increment repetitions ─────────────────────────

  it('quality >= 3 increments repetitions', () => {
    for (const q of [3, 4, 5]) {
      const result = sm2(q, defaultEF, 1, 3)
      expect(result.repetitions).toBe(4)
    }
  })

  // ── First successful repetition gets interval 1 ───────────────────────

  it('first successful repetition (rep 0 -> 1) gets interval 1', () => {
    const result = sm2(4, defaultEF, 0, 0)
    expect(result.repetitions).toBe(1)
    expect(result.interval).toBe(1)
  })

  // ── Second successful repetition gets interval 6 ──────────────────────

  it('second successful repetition (rep 1 -> 2) gets interval 6', () => {
    const result = sm2(4, defaultEF, 1, 1)
    expect(result.repetitions).toBe(2)
    expect(result.interval).toBe(6)
  })

  // ── Third+ repetition uses prevInterval * easeFactor ──────────────────

  it('third+ repetition uses Math.round(prevInterval * easeFactor)', () => {
    const prevInterval = 6
    const prevEF = 2.5
    const result = sm2(4, prevEF, prevInterval, 2)
    expect(result.repetitions).toBe(3)
    // interval = Math.round(6 * 2.5) = 15
    expect(result.interval).toBe(Math.round(prevInterval * prevEF))
  })

  // ── Ease factor never goes below 1.3 ─────────────────────────────────

  it('ease factor never goes below 1.3', () => {
    // quality 0 with already low EF
    const result = sm2(0, 1.3, 1, 0)
    expect(result.easeFactor).toBeGreaterThanOrEqual(1.3)
  })

  it('ease factor is clamped to 1.3 even with repeated low quality', () => {
    let ef = 2.5
    for (let i = 0; i < 20; i++) {
      const result = sm2(0, ef, 1, 0)
      ef = result.easeFactor
    }
    expect(ef).toBe(1.3)
  })

  // ── Perfect quality (5) increases ease factor ─────────────────────────

  it('perfect quality (5) increases ease factor', () => {
    const result = sm2(5, defaultEF, 1, 0)
    expect(result.easeFactor).toBeGreaterThan(defaultEF)
  })

  // ── Low quality (0) decreases ease factor ─────────────────────────────

  it('low quality (0) decreases ease factor (but not below 1.3)', () => {
    const result = sm2(0, 2.5, 1, 0)
    // The new ease factor calculation: 2.5 + (0.1 - 5*(0.08 + 5*0.02)) = 2.5 + (0.1 - 0.9) = 1.7
    expect(result.easeFactor).toBeLessThan(defaultEF)
  })

  // ── nextReviewAt is in the future ─────────────────────────────────────

  it('nextReviewAt is a Date in the future', () => {
    const before = new Date()
    const result = sm2(4, defaultEF, 1, 0)
    expect(result.nextReviewAt).toBeInstanceOf(Date)
    expect(result.nextReviewAt.getTime()).toBeGreaterThan(before.getTime())
  })

  // ── Quality is clamped to 0-5 ─────────────────────────────────────────

  it('quality values above 5 are clamped to 5', () => {
    const resultClamped = sm2(10, defaultEF, 6, 2)
    const resultFive = sm2(5, defaultEF, 6, 2)
    expect(resultClamped.easeFactor).toBe(resultFive.easeFactor)
    expect(resultClamped.interval).toBe(resultFive.interval)
    expect(resultClamped.repetitions).toBe(resultFive.repetitions)
  })

  it('quality values below 0 are clamped to 0', () => {
    const resultClamped = sm2(-3, defaultEF, 6, 2)
    const resultZero = sm2(0, defaultEF, 6, 2)
    expect(resultClamped.easeFactor).toBe(resultZero.easeFactor)
    expect(resultClamped.interval).toBe(resultZero.interval)
    expect(resultClamped.repetitions).toBe(resultZero.repetitions)
  })
})
