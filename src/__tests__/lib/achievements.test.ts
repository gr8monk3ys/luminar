import { describe, it, expect, vi } from 'vitest'
import type { UserProgress } from '@/types/content'

// Mock the content/courses module before importing achievements
vi.mock('@/content/courses', () => ({
  courses: {
    'course-a': {
      id: 'course-a',
      chapters: [
        { id: 'ch1', lessons: [{ id: 'lesson-a1' }, { id: 'lesson-a2' }] },
      ],
    },
    'course-b': {
      id: 'course-b',
      chapters: [
        { id: 'ch2', lessons: [{ id: 'lesson-b1' }] },
      ],
    },
    'course-c': {
      id: 'course-c',
      chapters: [
        { id: 'ch3', lessons: [{ id: 'lesson-c1' }] },
      ],
    },
  },
  getAllLessonIds: (courseId: string) => {
    const map: Record<string, string[]> = {
      'course-a': ['lesson-a1', 'lesson-a2'],
      'course-b': ['lesson-b1'],
      'course-c': ['lesson-c1'],
    }
    return map[courseId] ?? []
  },
}))

import { checkAchievements } from '@/lib/achievements'

function makeProgress(overrides: Partial<UserProgress> = {}): UserProgress {
  return {
    lessonsCompleted: {},
    coursesEnrolled: [],
    xp: 0,
    level: 1,
    streak: { current: 0, longest: 0, lastActivityDate: '', streakFreezes: 0 },
    lastActivityDate: '',
    ...overrides,
  }
}

function completedLesson(score = 80) {
  return { completed: true, score, xpEarned: 25, answers: {} }
}

describe('checkAchievements', () => {
  const totalCourses = 3 // matches our mock (course-a, course-b, course-c)

  // ── Empty progress returns no achievements ────────────────────────────

  it('returns no achievements for empty progress', () => {
    const result = checkAchievements(makeProgress(), totalCourses)
    expect(result).toEqual([])
  })

  // ── Completing 1 lesson earns "First Steps" ──────────────────────────

  it('completing 1 lesson earns "First Steps"', () => {
    const progress = makeProgress({
      lessonsCompleted: {
        'lesson-1': completedLesson(),
      },
    })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('first-steps')
  })

  // ── Completing 5 lessons earns "Getting Started" ─────────────────────

  it('completing 5 lessons earns "Getting Started"', () => {
    const lessons: Record<string, { completed: boolean; score: number; xpEarned: number; answers: Record<string, unknown> }> = {}
    for (let i = 0; i < 5; i++) {
      lessons[`lesson-${i}`] = completedLesson()
    }
    const progress = makeProgress({ lessonsCompleted: lessons })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('getting-started')
  })

  // ── Starting 1 course earns "Course Starter" ─────────────────────────

  it('starting 1 course earns "Course Starter"', () => {
    const progress = makeProgress({ coursesEnrolled: ['course-a'] })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('course-starter')
  })

  // ── 3-day streak earns "Streak Starter" ──────────────────────────────

  it('3-day streak earns "Streak Starter"', () => {
    const progress = makeProgress({
      streak: { current: 3, longest: 3, lastActivityDate: '2026-01-10', streakFreezes: 0 },
    })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('streak-starter')
  })

  // ── 500 XP earns "XP Collector" ──────────────────────────────────────

  it('500 XP earns "XP Collector"', () => {
    const progress = makeProgress({ xp: 500 })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('xp-collector')
  })

  // ── 10 perfect scores earns "Perfectionist" ──────────────────────────

  it('10 perfect scores earns "Perfectionist"', () => {
    const lessons: Record<string, { completed: boolean; score: number; xpEarned: number; answers: Record<string, unknown> }> = {}
    for (let i = 0; i < 10; i++) {
      lessons[`lesson-${i}`] = completedLesson(100)
    }
    const progress = makeProgress({ lessonsCompleted: lessons })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('perfectionist')
  })

  // ── Starting all courses earns "Renaissance Mind" ─────────────────────

  it('starting all courses earns "Renaissance Mind" (threshold -1 means all)', () => {
    const progress = makeProgress({
      coursesEnrolled: ['course-a', 'course-b', 'course-c'],
    })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('renaissance-mind')
  })

  // ── Multiple achievements can be earned simultaneously ────────────────

  it('multiple achievements can be earned simultaneously', () => {
    const lessons: Record<string, { completed: boolean; score: number; xpEarned: number; answers: Record<string, unknown> }> = {}
    for (let i = 0; i < 10; i++) {
      lessons[`lesson-${i}`] = completedLesson(100)
    }
    const progress = makeProgress({
      lessonsCompleted: lessons,
      coursesEnrolled: ['course-a', 'course-b', 'course-c'],
      xp: 2500,
      streak: { current: 30, longest: 30, lastActivityDate: '2026-01-10', streakFreezes: 0 },
    })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    // Should have at least these achievements
    expect(ids).toContain('first-steps')
    expect(ids).toContain('getting-started')
    expect(ids).toContain('course-starter')
    expect(ids).toContain('explorer')
    expect(ids).toContain('renaissance-mind')
    expect(ids).toContain('perfectionist')
    expect(ids).toContain('xp-collector')
    expect(ids).toContain('xp-master')
    expect(ids).toContain('streak-starter')
    expect(ids).toContain('week-warrior')
    expect(ids).toContain('monthly-master')
    expect(result.length).toBeGreaterThan(5)
  })

  // ── Uses longest streak if higher than current ────────────────────────

  it('uses longest streak if it is higher than current', () => {
    const progress = makeProgress({
      streak: { current: 1, longest: 7, lastActivityDate: '2026-01-10', streakFreezes: 0 },
    })
    const result = checkAchievements(progress, totalCourses)
    const ids = result.map((a) => a.id)
    expect(ids).toContain('streak-starter')
    expect(ids).toContain('week-warrior')
  })
})
