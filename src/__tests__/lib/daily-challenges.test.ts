import { describe, it, expect } from 'vitest'
import { getTodayChallenge, getAllChallenges } from '@/lib/daily-challenges'
import type { DailyChallenge } from '@/lib/daily-challenges'

describe('daily challenges', () => {
  // ── getTodayChallenge returns a valid challenge object ────────────────

  it('getTodayChallenge returns a valid challenge object', () => {
    const challenge = getTodayChallenge()
    expect(challenge).toBeDefined()
    expect(typeof challenge).toBe('object')
  })

  // ── Challenge has all required fields ─────────────────────────────────

  it('challenge has all required fields', () => {
    const challenge = getTodayChallenge()
    expect(challenge).toHaveProperty('id')
    expect(challenge).toHaveProperty('title')
    expect(challenge).toHaveProperty('category')
    expect(challenge).toHaveProperty('difficulty')
    expect(challenge).toHaveProperty('question')
    expect(challenge).toHaveProperty('options')
    expect(challenge).toHaveProperty('correctIndex')
    expect(challenge).toHaveProperty('hint')
    expect(challenge).toHaveProperty('explanation')
    expect(challenge).toHaveProperty('xpReward')
  })

  // ── correctIndex is within bounds of options array ────────────────────

  it('correctIndex is within bounds of options array', () => {
    const challenges = getAllChallenges()
    for (const challenge of challenges) {
      expect(challenge.correctIndex).toBeGreaterThanOrEqual(0)
      expect(challenge.correctIndex).toBeLessThan(challenge.options.length)
    }
  })

  // ── difficulty is 1, 2, or 3 ──────────────────────────────────────────

  it('difficulty is 1, 2, or 3', () => {
    const challenges = getAllChallenges()
    for (const challenge of challenges) {
      expect([1, 2, 3]).toContain(challenge.difficulty)
    }
  })

  // ── category is one of "math", "cs", "logic" ─────────────────────────

  it('category is one of "math", "cs", "logic"', () => {
    const challenges = getAllChallenges()
    for (const challenge of challenges) {
      expect(['math', 'cs', 'logic']).toContain(challenge.category)
    }
  })

  // ── getAllChallenges returns all challenges ────────────────────────────

  it('getAllChallenges returns all challenges', () => {
    const challenges = getAllChallenges()
    expect(Array.isArray(challenges)).toBe(true)
    expect(challenges.length).toBeGreaterThan(0)
  })

  // ── Same day returns same challenge (deterministic) ───────────────────

  it('same day returns the same challenge (deterministic)', () => {
    const challenge1 = getTodayChallenge()
    const challenge2 = getTodayChallenge()
    expect(challenge1.id).toBe(challenge2.id)
    expect(challenge1).toEqual(challenge2)
  })

  // ── xpReward is a positive number ────────────────────────────────────

  it('xpReward is a positive number', () => {
    const challenges = getAllChallenges()
    for (const challenge of challenges) {
      expect(challenge.xpReward).toBeGreaterThan(0)
    }
  })

  // ── getAllChallenges returns a copy (not the original array) ───────────

  it('getAllChallenges returns a copy of the array', () => {
    const a = getAllChallenges()
    const b = getAllChallenges()
    expect(a).not.toBe(b) // different reference
    expect(a).toEqual(b)  // same contents
  })

  // ── Each challenge has options with text and feedback ──────────────────

  it('each challenge option has text and feedback', () => {
    const challenges = getAllChallenges()
    for (const challenge of challenges) {
      expect(challenge.options.length).toBeGreaterThanOrEqual(2)
      for (const option of challenge.options) {
        expect(typeof option.text).toBe('string')
        expect(typeof option.feedback).toBe('string')
      }
    }
  })
})
