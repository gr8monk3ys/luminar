"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { UserProgress, LessonProgress, StreakData } from "@/types/content";

const STORAGE_KEY = "luminar_progress";
const STORAGE_EVENT = `storage:${STORAGE_KEY}`;

const XP_PER_LEVEL = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000,
];

function getLevel(xp: number): number {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_PER_LEVEL[i]) return i + 1;
  }
  return 1;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function isConsecutiveDay(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date(getToday());
  const diffMs = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

function isSameDay(dateStr: string): boolean {
  return dateStr === getToday();
}

const DEFAULT_PROGRESS: UserProgress = {
  lessonsCompleted: {},
  coursesEnrolled: [],
  xp: 0,
  level: 1,
  streak: {
    current: 0,
    longest: 0,
    lastActivityDate: "",
    streakFreezes: 1,
  },
  lastActivityDate: "",
};

function readProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserProgress;
    }
  } catch {
    // Use defaults
  }
  return DEFAULT_PROGRESS;
}

function writeProgress(updated: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // Storage full or unavailable
  }
}

function subscribeProgress(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return "";
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribeProgress, getSnapshot, getServerSnapshot);
  const isLoaded = typeof window !== "undefined";

  const progress: UserProgress = raw
    ? (JSON.parse(raw) as UserProgress)
    : DEFAULT_PROGRESS;

  const updateStreak = useCallback(
    (current: UserProgress): StreakData => {
      const today = getToday();
      const streak = { ...current.streak };

      if (isSameDay(streak.lastActivityDate)) {
        return streak;
      }

      if (isConsecutiveDay(streak.lastActivityDate)) {
        streak.current += 1;
      } else if (streak.lastActivityDate && !isSameDay(streak.lastActivityDate)) {
        const lastDate = new Date(streak.lastActivityDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 2 && streak.streakFreezes > 0) {
          streak.streakFreezes -= 1;
          streak.current += 1;
        } else {
          streak.current = 1;
        }
      } else {
        streak.current = 1;
      }

      streak.lastActivityDate = today;
      streak.longest = Math.max(streak.longest, streak.current);
      return streak;
    },
    []
  );

  const completeLesson = useCallback(
    (lessonId: string, score: number, xpReward: number) => {
      const current = readProgress();
      const lessonProgress: LessonProgress = {
        completed: true,
        completedAt: new Date().toISOString(),
        score,
        xpEarned: xpReward,
        answers: {},
      };

      const updated: UserProgress = {
        ...current,
        lessonsCompleted: {
          ...current.lessonsCompleted,
          [lessonId]: lessonProgress,
        },
        xp: current.xp + xpReward,
        level: getLevel(current.xp + xpReward),
        lastActivityDate: getToday(),
      };
      updated.streak = updateStreak(updated);
      writeProgress(updated);
    },
    [updateStreak]
  );

  const recordActivity = useCallback(() => {
    const current = readProgress();
    const updated: UserProgress = {
      ...current,
      lastActivityDate: getToday(),
    };
    updated.streak = updateStreak(updated);
    writeProgress(updated);
  }, [updateStreak]);

  const enrollCourse = useCallback((courseId: string) => {
    const current = readProgress();
    if (current.coursesEnrolled.includes(courseId)) return;
    writeProgress({
      ...current,
      coursesEnrolled: [...current.coursesEnrolled, courseId],
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      return !!progress.lessonsCompleted[lessonId]?.completed;
    },
    [progress]
  );

  const getLessonProgress = useCallback(
    (lessonId: string): LessonProgress | null => {
      return progress.lessonsCompleted[lessonId] || null;
    },
    [progress]
  );

  const getCourseProgress = useCallback(
    (lessonIds: string[]): { completed: number; total: number; percentage: number } => {
      const completed = lessonIds.filter(
        (id) => progress.lessonsCompleted[id]?.completed
      ).length;
      return {
        completed,
        total: lessonIds.length,
        percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0,
      };
    },
    [progress]
  );

  const getXpToNextLevel = useCallback((): {
    current: number;
    needed: number;
    percentage: number;
  } => {
    const currentLevelXp = XP_PER_LEVEL[progress.level - 1] || 0;
    const nextLevelXp = XP_PER_LEVEL[progress.level] || currentLevelXp + 1000;
    const xpInLevel = progress.xp - currentLevelXp;
    const xpNeeded = nextLevelXp - currentLevelXp;
    return {
      current: xpInLevel,
      needed: xpNeeded,
      percentage: Math.round((xpInLevel / xpNeeded) * 100),
    };
  }, [progress]);

  return {
    progress,
    isLoaded,
    completeLesson,
    recordActivity,
    enrollCourse,
    isLessonCompleted,
    getLessonProgress,
    getCourseProgress,
    getXpToNextLevel,
  };
}
