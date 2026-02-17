"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AchievementBadge } from "@/components/AchievementBadge";
import { useProgress } from "@/hooks/useProgress";
import { useAchievements } from "@/hooks/useAchievements";
import { courses } from "@/content/courses";
import {
  achievements,
  checkAchievements,
  type Achievement,
} from "@/lib/achievements";
import { Trophy, Award, Sparkles } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";

const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const categoryMeta: Record<
  Achievement["category"],
  { label: string; description: string }
> = {
  learning: {
    label: "Learning",
    description: "Earn badges by completing lessons",
  },
  streak: {
    label: "Streak",
    description: "Stay consistent with daily learning",
  },
  mastery: {
    label: "Mastery",
    description: "Demonstrate deep knowledge and skill",
  },
  exploration: {
    label: "Exploration",
    description: "Discover new courses and subjects",
  },
};

const categoryOrder: Achievement["category"][] = [
  "learning",
  "exploration",
  "mastery",
  "streak",
];

export default function AchievementsPage() {
  const { progress, isLoaded } = useProgress();
  const totalCourses = Object.keys(courses).length;
  const {
    earnedIds: dbEarnedIds,
    newlyEarned,
    syncAchievements,
    clearNewlyEarned,
    isLoading: isAchievementsLoading,
  } = useAchievements(isClerkConfigured);

  // Sync achievements when progress loads
  useEffect(() => {
    if (isLoaded && progress) {
      syncAchievements(progress, totalCourses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Auto-clear newly earned toast after 5 seconds
  useEffect(() => {
    if (newlyEarned.length > 0) {
      const timer = setTimeout(() => clearNewlyEarned(), 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyEarned, clearNewlyEarned]);

  // Merge DB-persisted achievements with client-side check for offline/unauthenticated users
  const clientEarned = checkAchievements(progress, totalCourses);
  const clientEarnedIds = new Set(clientEarned.map((a) => a.id));
  const earnedIds = isClerkConfigured && dbEarnedIds.size > 0
    ? new Set([...dbEarnedIds, ...clientEarnedIds])
    : clientEarnedIds;

  const earnedCount = earnedIds.size;
  const totalCount = achievements.length;
  const percentage = Math.round((earnedCount / totalCount) * 100);

  const groupedAchievements = categoryOrder.map((category) => ({
    category,
    ...categoryMeta[category],
    items: achievements.filter((a) => a.category === category),
  }));

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Newly earned achievements toast */}
      {newlyEarned.length > 0 && (
        <div className="fixed top-24 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full bg-amber-600 px-6 py-3 text-white shadow-lg animate-bounce">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">
              {newlyEarned.length === 1
                ? `Achievement unlocked: ${newlyEarned[0].title}!`
                : `${newlyEarned.length} new achievements unlocked!`}
            </span>
          </div>
        </div>
      )}

      <main className="flex-1 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Achievements
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isAchievementsLoading ? "Loading..." : `${earnedCount} of ${totalCount} earned`}
              </p>
            </div>
            {earnedCount > 0 && (
              <ShareButton
                title="My Luminar Achievements"
                text={`I've unlocked ${earnedCount} achievement${earnedCount !== 1 ? "s" : ""} on Luminar!`}
                url="/achievements"
              />
            )}
          </div>

          {/* Progress summary */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                  <Award className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {earnedCount === 0
                      ? "Start your journey"
                      : earnedCount === totalCount
                        ? "All achievements unlocked!"
                        : `${earnedCount} achievement${earnedCount !== 1 ? "s" : ""} earned`}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {earnedCount === 0
                      ? "Complete lessons and stay consistent to earn badges"
                      : `You've earned ${percentage}% of all achievements`}
                  </p>
                </div>
              </div>
              <div className="sm:w-48">
                <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {percentage}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Achievement categories */}
          <div className="space-y-10">
            {groupedAchievements.map((group) => (
              <section key={group.category}>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {group.label}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {group.description}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {group.items.map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      earned={earnedIds.has(achievement.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
