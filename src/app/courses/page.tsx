"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { courses, learningPaths } from "@/content/courses";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { BookOpen, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  math: "Mathematics",
  cs: "Computer Science",
  "data-science": "Data Science",
  science: "Science",
};

const CATEGORY_COLORS: Record<string, string> = {
  math: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  cs: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "data-science": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  science: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function CoursesPage() {
  const { getCourseProgress } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(Object.values(courses).map((c) => c.category))];
  const filteredCourses = selectedCategory
    ? Object.values(courses).filter((c) => c.category === selectedCategory)
    : Object.values(courses);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Courses</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Interactive lessons designed for deep understanding
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selectedCategory === null
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  )}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!selectedCategory && (
          <section className="border-b border-slate-200 py-12 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Learning Paths</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {learningPaths.map((path) => (
                  <div key={path.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white" style={{ backgroundColor: path.color }}>
                        {path.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{path.title}</h3>
                    </div>
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{path.description}</p>
                    <div className="space-y-2">
                      {path.courseIds.map((courseId) => {
                        const course = courses[courseId];
                        if (!course) return null;
                        const allLessonIds = course.chapters.flatMap((ch) => ch.lessons.map((l) => l.id));
                        const prog = getCourseProgress(allLessonIds);
                        return (
                          <Link key={courseId} href={`/courses/${courseId}`} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <div className="flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white" style={{ backgroundColor: course.color }}>
                              {course.icon}
                            </div>
                            <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{course.title}</span>
                            {prog.percentage > 0 && <span className="text-xs text-indigo-600 dark:text-indigo-400">{prog.percentage}%</span>}
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              {selectedCategory ? CATEGORY_LABELS[selectedCategory] : "All Courses"}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => {
                const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
                const allLessonIds = course.chapters.flatMap((ch) => ch.lessons.map((l) => l.id));
                const prog = getCourseProgress(allLessonIds);
                return (
                  <Link key={course.id} href={`/courses/${course.id}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-700">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white" style={{ backgroundColor: course.color }}>
                        {course.icon}
                      </div>
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", CATEGORY_COLORS[course.category])}>
                        {CATEGORY_LABELS[course.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{course.description}</p>
                    {prog.percentage > 0 && (
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-slate-500">{prog.completed}/{prog.total} lessons</span>
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">{prog.percentage}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${prog.percentage}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {totalLessons} lessons</span>
                      <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> ~{course.estimatedHours}h</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
