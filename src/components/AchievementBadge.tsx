"use client";

import { cn } from "@/lib/utils";
import type { Achievement } from "@/lib/achievements";
import { Lock, Zap } from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
  earned: boolean;
}

const categoryColors: Record<Achievement["category"], { bg: string; border: string; text: string }> = {
  learning: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-600 dark:text-blue-400",
  },
  streak: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-600 dark:text-orange-400",
  },
  mastery: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-600 dark:text-purple-400",
  },
  exploration: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-600 dark:text-emerald-400",
  },
};

export function AchievementBadge({ achievement, earned }: AchievementBadgeProps) {
  const colors = categoryColors[achievement.category];

  return (
    <div
      className={cn(
        "relative rounded-xl border p-5 transition-all duration-200",
        earned
          ? cn(
              "bg-white dark:bg-slate-800",
              "border-slate-200 dark:border-slate-700",
              "hover:scale-[1.02] hover:shadow-md"
            )
          : cn(
              "bg-slate-50 dark:bg-slate-800/50",
              "border-slate-200/60 dark:border-slate-700/60",
              "opacity-60 grayscale"
            )
      )}
    >
      {/* Lock overlay for unearned */}
      {!earned && (
        <div className="absolute right-3 top-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
            <Lock className="h-3 w-3 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
          earned ? cn(colors.bg, "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800", colors.border.replace("border-", "ring-")) : "bg-slate-100 dark:bg-slate-700"
        )}
      >
        {achievement.icon}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "mb-1 font-semibold",
          earned
            ? "text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400"
        )}
      >
        {achievement.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "mb-3 text-sm",
          earned
            ? "text-slate-600 dark:text-slate-300"
            : "text-slate-400 dark:text-slate-500"
        )}
      >
        {achievement.description}
      </p>

      {/* XP Bonus */}
      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
          earned
            ? cn(colors.bg, colors.text)
            : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
        )}
      >
        <Zap className="h-3 w-3" />
        +{achievement.xpBonus} XP
      </div>
    </div>
  );
}
