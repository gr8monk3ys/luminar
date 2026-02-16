"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { courses, getAllLessonIds } from "@/content/courses";
import { useProgress } from "@/hooks/useProgress";
import {
  Flame,
  Zap,
  BookOpen,
  ArrowRight,
  Play,
  CheckCircle2,
  Target,
  Trophy,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const {
    progress,
    isLoaded,
    getXpToNextLevel,
    getCourseProgress,
    isLessonCompleted,
  } = useProgress();
  const xpInfo = getXpToNextLevel();

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

  const enrolledCourses = progress.coursesEnrolled
    .map((id) => courses[id])
    .filter(Boolean);

  const totalLessonsCompleted = Object.keys(progress.lessonsCompleted).length;

  // Find next lesson to continue
  let continueInfo: { courseId: string; lessonId: string; courseTitle: string; lessonTitle: string } | null = null;
  for (const courseId of progress.coursesEnrolled) {
    const course = courses[courseId];
    if (!course) continue;
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!isLessonCompleted(lesson.id)) {
          continueInfo = {
            courseId,
            lessonId: lesson.id,
            courseTitle: course.title,
            lessonTitle: lesson.title,
          };
          break;
        }
      }
      if (continueInfo) break;
    }
    if (continueInfo) break;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>

          {/* Stats cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm text-slate-500">Current Streak</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {progress.streak.current}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Longest: {progress.streak.longest} days
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <Zap className="h-4 w-4 text-indigo-500" />
                </div>
                <span className="text-sm text-slate-500">Total XP</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {progress.xp}
              </p>
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                  <span>Level {progress.level}</span>
                  <span>{xpInfo.current}/{xpInfo.needed}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                    style={{ width: `${xpInfo.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <span className="text-sm text-slate-500">Lessons Done</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {totalLessonsCompleted}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-sm text-slate-500">Courses</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {enrolledCourses.length}
              </p>
              <p className="mt-1 text-xs text-slate-400">enrolled</p>
            </div>
          </div>

          {/* Continue learning */}
          {continueInfo && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                Continue Learning
              </h2>
              <Link
                href={`/learn/${continueInfo.courseId}/${continueInfo.lessonId}`}
                className="group flex items-center gap-4 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 transition-all hover:shadow-md dark:border-indigo-800 dark:from-indigo-900/20 dark:to-purple-900/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Play className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">
                    {continueInfo.courseTitle}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {continueInfo.lessonTitle}
                  </h3>
                </div>
                <ArrowRight className="h-5 w-5 text-indigo-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/daily-challenge"
              className="group flex items-center gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 transition-all hover:shadow-md dark:border-amber-800 dark:from-amber-900/20 dark:to-orange-900/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Star className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Daily Challenge
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Solve today&apos;s problem for bonus XP
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-amber-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/achievements"
              className="group flex items-center gap-4 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 transition-all hover:shadow-md dark:border-purple-800 dark:from-purple-900/20 dark:to-indigo-900/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500 text-white">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Achievements
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Track your badges and milestones
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-purple-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Enrolled courses */}
          {enrolledCourses.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                Your Courses
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course) => {
                  const allLessonIds = getAllLessonIds(course.id);
                  const prog = getCourseProgress(allLessonIds);
                  return (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
                          style={{ backgroundColor: course.color }}
                        >
                          {course.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {course.title}
                        </h3>
                      </div>
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                        <span>{prog.completed}/{prog.total} lessons</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {prog.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all"
                          style={{ width: `${prog.percentage}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
              <Target className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                No courses yet
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Start your learning journey by enrolling in a course.
              </p>
              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
              >
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
