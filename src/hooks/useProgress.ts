"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserProgress, LessonProgress, StreakData } from "@/types/content";

const STORAGE_KEY = "luminar_progress";

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

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        setProgress(parsed);
      }
    } catch {
      // Use defaults
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = useCallback((updated: UserProgress) => {
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage full or unavailable
    }
  }, []);

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
        // Missed a day - check for streak freeze
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
      const updated = { ...progress };
      const lessonProgress: LessonProgress = {
        completed: true,
        completedAt: new Date().toISOString(),
        score,
        xpEarned: xpReward,
        answers: {},
      };

      updated.lessonsCompleted = {
        ...updated.lessonsCompleted,
        [lessonId]: lessonProgress,
      };
      updated.xp += xpReward;
      updated.level = getLevel(updated.xp);
      updated.streak = updateStreak(updated);
      updated.lastActivityDate = getToday();

      saveProgress(updated);
    },
    [progress, saveProgress, updateStreak]
  );

  const recordActivity = useCallback(() => {
    const updated = { ...progress };
    updated.streak = updateStreak(updated);
    updated.lastActivityDate = getToday();
    saveProgress(updated);
  }, [progress, saveProgress, updateStreak]);

  const enrollCourse = useCallback(
    (courseId: string) => {
      if (progress.coursesEnrolled.includes(courseId)) return;
      const updated = {
        ...progress,
        coursesEnrolled: [...progress.coursesEnrolled, courseId],
      };
      saveProgress(updated);
    },
    [progress, saveProgress]
  );

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
