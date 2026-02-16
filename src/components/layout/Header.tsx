"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import {
  Flame,
  BookOpen,
  LayoutDashboard,
  Zap,
  GraduationCap,
} from "lucide-react";

export function Header() {
  const { progress, isLoaded, getXpToNextLevel } = useProgress();
  const xpInfo = getXpToNextLevel();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            Luminar
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
        </nav>

        {/* Stats */}
        {isLoaded && (
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                progress.streak.current > 0
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              )}
            >
              <Flame
                className={cn(
                  "h-4 w-4",
                  progress.streak.current > 0 && "text-orange-500"
                )}
              />
              <span className="text-sm font-bold">
                {progress.streak.current}
              </span>
            </div>

            {/* XP / Level */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Zap className="h-4 w-4" />
                <span>{progress.xp} XP</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-xs text-slate-400">
                  Lv.{progress.level}
                </span>
                <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${xpInfo.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
