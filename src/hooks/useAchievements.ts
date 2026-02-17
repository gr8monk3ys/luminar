"use client";

import { useState, useEffect, useCallback } from "react";
import { checkAchievements, achievements } from "@/lib/achievements";
import type { Achievement } from "@/lib/achievements";
import type { UserProgress } from "@/types/content";

interface UseAchievementsReturn {
  earnedIds: Set<string>;
  newlyEarned: Achievement[];
  syncAchievements: (progress: UserProgress, totalCourses: number) => Promise<void>;
  clearNewlyEarned: () => void;
  isLoading: boolean;
}

export function useAchievements(isAuthenticated: boolean): UseAchievementsReturn {
  const [earnedIds, setEarnedIds] = useState<Set<string>>(new Set());
  const [newlyEarned, setNewlyEarned] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch earned achievements from API on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAchievements = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/achievements");
        if (res.ok) {
          const data = await res.json();
          const ids = new Set<string>(
            data.achievements.map((a: { achievementId: string }) => a.achievementId)
          );
          setEarnedIds(ids);
        }
      } catch {
        // Fall back to empty - will use client-side checking
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [isAuthenticated]);

  const syncAchievements = useCallback(
    async (progress: UserProgress, totalCourses: number) => {
      if (isAuthenticated) {
        try {
          const res = await fetch("/api/achievements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ progress, totalCourses }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.newAchievements && data.newAchievements.length > 0) {
              const newIds = data.newAchievements.map((a: { id: string }) => a.id);
              setEarnedIds((prev) => {
                const next = new Set(prev);
                newIds.forEach((id: string) => next.add(id));
                return next;
              });
              // Map back to full achievement objects
              const newFull = achievements.filter((a) => newIds.includes(a.id));
              setNewlyEarned(newFull);
            }
          }
        } catch {
          // Fall back to client-side
          const earned = checkAchievements(progress, totalCourses);
          setEarnedIds(new Set(earned.map((a) => a.id)));
        }
      } else {
        // Client-side only
        const earned = checkAchievements(progress, totalCourses);
        const earnedIdSet = new Set(earned.map((a) => a.id));

        // Find newly earned (compare with previous)
        const newOnes = earned.filter((a) => !earnedIds.has(a.id));
        if (newOnes.length > 0) {
          setNewlyEarned(newOnes);
        }
        setEarnedIds(earnedIdSet);
      }
    },
    [isAuthenticated, earnedIds]
  );

  const clearNewlyEarned = useCallback(() => {
    setNewlyEarned([]);
  }, []);

  return {
    earnedIds,
    newlyEarned,
    syncAchievements,
    clearNewlyEarned,
    isLoading,
  };
}
