"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { courses, learningPaths } from "@/content/courses";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowRight,
  BookOpen,
  Zap,
  Brain,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  math: "Mathematics",
  cs: "Computer Science",
  "data-science": "Data Science",
  science: "Science",
};

const CATEGORY_COLORS: Record<string, string> = {
  math: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  cs: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "data-science":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  science:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function HomePage() {
  const { progress, isLoaded } = useProgress();

  const hasStarted =
    isLoaded && Object.keys(progress.lessonsCompleted).length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Learn by doing,{" "}
                <span className="text-indigo-200">not watching</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
                Master math, physics, computer science, and machine learning through
                interactive problem-solving. 100+ hands-on lessons — no
                passive videos, just deep understanding.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={hasStarted ? "/dashboard" : "/courses"}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
                >
                  {hasStarted ? "Continue Learning" : "Start Learning"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Interactive Problem-Solving
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Hands-on exercises with interactive graphs, code editors, and
                  visual explorations.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Track Your Progress
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Build streaks, earn XP, and watch your understanding deepen
                  across courses and learning paths.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Daily Challenges & Achievements
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Earn XP, unlock badges, maintain streaks, and tackle daily
                  challenges to sharpen your skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Learning Paths
              </h2>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
                Structured paths to guide your learning journey
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {learningPaths.map((path) => (
                <Link
                  key={path.id}
                  href="/courses"
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-700"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold text-white"
                      style={{ backgroundColor: path.color }}
                    >
                      {path.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {path.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {path.courseIds.length} course{path.courseIds.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {path.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    View path{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Course catalog */}
        <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Courses
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Dive deep into the subjects that matter
                </p>
              </div>
              <Link
                href="/courses"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                View all <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(courses).map((course) => {
                const totalLessons = course.chapters.reduce(
                  (sum, ch) => sum + ch.lessons.length,
                  0
                );
                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-700"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
                        style={{ backgroundColor: course.color }}
                      >
                        {course.icon}
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          CATEGORY_COLORS[course.category]
                        )}
                      >
                        {CATEGORY_LABELS[course.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5" /> ~{course.estimatedHours}h
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <GraduationCap className="mx-auto mb-6 h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Ready to start learning?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Pick a course and solve your first problem. No sign-up required.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
            >
              Browse Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
