"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { useProgress } from "@/hooks/useProgress";
import { getTodayChallenge } from "@/lib/daily-challenges";
import {
  CalendarDays,
  Clock,
  Flame,
  Zap,
  CheckCircle2,
  Star,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/ShareButton";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getStorageKey(date: string): string {
  return `daily-challenge-${date}`;
}

function getDailyChallengeStreak(): number {
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = getStorageKey(d.toISOString().split("T")[0]);
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.completed) {
          streak++;
        } else {
          break;
        }
      } else {
        // If it's today and not completed yet, don't break - just skip
        if (i === 0) continue;
        break;
      }
    } catch {
      break;
    }
  }
  return streak;
}

function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const difficultyLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Easy", color: "text-emerald-600 dark:text-emerald-400" },
  2: { label: "Medium", color: "text-amber-600 dark:text-amber-400" },
  3: { label: "Hard", color: "text-red-600 dark:text-red-400" },
};

const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
  math: {
    label: "Mathematics",
    color: "text-indigo-700 dark:text-indigo-300",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  cs: {
    label: "Computer Science",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  logic: {
    label: "Logic & Discrete Math",
    color: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

export default function DailyChallengePage() {
  const { completeLesson, isLoaded } = useProgress();
  const [completedToday, setCompletedToday] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [mounted, setMounted] = useState(false);

  const challenge = getTodayChallenge();
  const today = getToday();
  const storageKey = getStorageKey(today);

  // Check if already completed today
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.completed) {
          setCompletedToday(true);
          setEarnedXp(data.xpEarned || challenge.xpReward);
        }
      }
    } catch {
      // Ignore storage errors
    }
    setStreak(getDailyChallengeStreak());
  }, [storageKey, challenge.xpReward]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!correct || completedToday) return;

      const xp = challenge.xpReward;

      // Mark in localStorage
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ completed: true, xpEarned: xp, date: today })
        );
      } catch {
        // Ignore storage errors
      }

      // Award XP through progress system
      completeLesson(`daily-challenge-${today}`, 100, xp);

      setCompletedToday(true);
      setEarnedXp(xp);
      setStreak(getDailyChallengeStreak());
    },
    [completedToday, challenge.xpReward, storageKey, today, completeLesson]
  );

  const diffInfo = difficultyLabels[challenge.difficulty];
  const catInfo = categoryLabels[challenge.category];

  if (!isLoaded || !mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-lg dark:border-slate-700 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                  <CalendarDays className="h-4 w-4" />
                  {formattedDate}
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl">
                  Daily Challenge
                </h1>
                <p className="mt-2 text-lg text-white/80">
                  Test your skills with today&apos;s challenge
                </p>
              </div>

              <div className="flex gap-4">
                {/* Streak badge */}
                <div className="flex flex-col items-center rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm">
                  <Flame className="mb-1 h-6 w-6 text-orange-300" />
                  <span className="text-2xl font-bold">{streak}</span>
                  <span className="text-xs text-white/70">day streak</span>
                </div>

                {/* XP reward */}
                <div className="flex flex-col items-center rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm">
                  <Zap className="mb-1 h-6 w-6 text-yellow-300" />
                  <span className="text-2xl font-bold">{challenge.xpReward}</span>
                  <span className="text-xs text-white/70">XP reward</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main challenge area */}
            <div className="lg:col-span-2">
              {/* Challenge metadata */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    catInfo.bg,
                    catInfo.color
                  )}
                >
                  {catInfo.label}
                </span>
                <span className={cn("text-sm font-medium", diffInfo.color)}>
                  {diffInfo.label}
                </span>
                <span className="text-sm text-slate-400">
                  {challenge.title}
                </span>
              </div>

              {/* Completed overlay or question */}
              {completedToday ? (
                <div className="rounded-xl border border-emerald-200 bg-white p-8 text-center shadow-sm dark:border-emerald-800 dark:bg-slate-800">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Challenge Complete!
                  </h2>
                  <p className="mb-4 text-slate-600 dark:text-slate-300">
                    You earned{" "}
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      +{earnedXp} XP
                    </span>{" "}
                    for today&apos;s challenge
                  </p>
                  {streak > 0 && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                      <Flame className="h-4 w-4" />
                      {streak}-day challenge streak!
                    </div>
                  )}

                  <div className="mt-4">
                    <ShareButton
                      title="Luminar Daily Challenge"
                      text={`I solved today's Daily Challenge on Luminar! \u{1F9E0} ${streak}-day streak!`}
                      url="/daily-challenge"
                    />
                  </div>

                  {/* Still show the question for review */}
                  <div className="mt-8 text-left">
                    <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Your completed challenge:
                    </p>
                    <InteractiveQuestion
                      id={challenge.id}
                      question={challenge.question}
                      options={challenge.options}
                      correctIndex={challenge.correctIndex}
                      hint={challenge.hint}
                      explanation={challenge.explanation}
                    />
                  </div>
                </div>
              ) : (
                <InteractiveQuestion
                  id={challenge.id}
                  question={challenge.question}
                  options={challenge.options}
                  correctIndex={challenge.correctIndex}
                  hint={challenge.hint}
                  explanation={challenge.explanation}
                  onAnswer={handleAnswer}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Next challenge countdown */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  Next challenge in
                </div>
                <div className="flex justify-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {String(countdown.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-slate-400">hours</div>
                  </div>
                  <div className="text-2xl font-bold text-slate-300 dark:text-slate-600">
                    :
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {String(countdown.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-slate-400">min</div>
                  </div>
                  <div className="text-2xl font-bold text-slate-300 dark:text-slate-600">
                    :
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {String(countdown.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-slate-400">sec</div>
                  </div>
                </div>
              </div>

              {/* Streak info */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Flame className="h-4 w-4" />
                  Challenge Streak
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl",
                      streak > 0
                        ? "bg-gradient-to-br from-orange-400 to-red-500 text-white"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-700"
                    )}
                  >
                    <span className="text-xl font-bold">{streak}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {streak === 0
                        ? "Start a streak"
                        : streak === 1
                          ? "1 day"
                          : `${streak} days`}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {streak === 0
                        ? "Complete today's challenge"
                        : "Keep it going!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenge info */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Star className="h-4 w-4" />
                  How it works
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    A new challenge appears every day at midnight
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    Earn {challenge.xpReward} XP for solving correctly
                  </li>
                  <li className="flex items-start gap-2">
                    <Flame className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    Build a streak by completing daily challenges
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
