"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useTheme } from "@/components/ThemeProvider";
import { SearchPalette } from "@/components/SearchPalette";
import { cn } from "@/lib/utils";
import {
  Flame,
  BookOpen,
  LayoutDashboard,
  Zap,
  GraduationCap,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Trophy,
  Brain,
  LogIn,
} from "lucide-react";

export function Header() {
  const { progress, isLoaded, getXpToNextLevel } = useProgress();
  const { theme, setTheme } = useTheme();
  const xpInfo = getXpToNextLevel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  };

  const themeIcon =
    theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    );

  const themeLabel =
    theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  return (
    <>
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

          {/* Desktop Navigation */}
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
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
            <Link
              href="/review"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Brain className="h-4 w-4" />
              Review
            </Link>
            <Link
              href="/daily-challenge"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Zap className="h-4 w-4" />
              Daily
            </Link>
            <SearchPalette />
          </nav>

          {/* Right side: Stats + Theme + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Stats */}
            {isLoaded && (
              <div className="flex items-center gap-3">
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
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    <Zap className="h-4 w-4" />
                    <span>{progress.xp} XP</span>
                  </div>
                  <div className="hidden items-center gap-2 lg:flex">
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

            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title={`Theme: ${themeLabel}`}
              aria-label={`Switch theme (currently ${themeLabel})`}
            >
              {themeIcon}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="relative border-b border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="space-y-1 px-4 py-4">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <BookOpen className="h-5 w-5" />
                Courses
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Trophy className="h-5 w-5" />
                Leaderboard
              </Link>
              <Link
                href="/review"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Brain className="h-5 w-5" />
                Review
              </Link>
              <Link
                href="/daily-challenge"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Zap className="h-5 w-5" />
                Daily Challenge
              </Link>
              <Link
                href="/achievements"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Trophy className="h-5 w-5" />
                Achievements
              </Link>
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </Link>
              <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
                <button
                  onClick={cycleTheme}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {themeIcon}
                  Theme: {themeLabel}
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
