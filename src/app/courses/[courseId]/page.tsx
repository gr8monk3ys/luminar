"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCourse, getAllLessonIds } from "@/content/courses";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Zap,
  Play,
} from "lucide-react";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  const { isLessonCompleted, getCourseProgress, enrollCourse } = useProgress();

  if (!course) {
    notFound();
  }

  const allLessonIds = getAllLessonIds(courseId);
  const progress = getCourseProgress(allLessonIds);

  let nextLessonId: string | null = null;
  for (const chapter of course.chapters) {
    for (const lesson of chapter.lessons) {
      if (!isLessonCompleted(lesson.id)) {
        nextLessonId = lesson.id;
        break;
      }
    }
    if (nextLessonId) break;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div
          className="relative overflow-hidden py-16"
          style={{
            background: `linear-gradient(135deg, ${course.color}dd, ${course.color}88)`,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/courses" className="mb-6 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All Courses
            </Link>
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-4xl font-bold text-white backdrop-blur-sm">
                {course.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white sm:text-4xl">{course.title}</h1>
                <p className="mt-3 max-w-2xl text-lg text-white/90">{course.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/80">
                  <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {allLessonIds.length} lessons</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~{course.estimatedHours} hours</span>
                </div>
                {progress.percentage > 0 && (
                  <div className="mt-4 max-w-md">
                    <div className="mb-1 flex items-center justify-between text-sm text-white/80">
                      <span>{progress.completed}/{progress.total} lessons completed</span>
                      <span className="font-semibold text-white">{progress.percentage}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress.percentage}%` }} />
                    </div>
                  </div>
                )}
                {nextLessonId && (
                  <Link
                    href={`/learn/${courseId}/${nextLessonId}`}
                    onClick={() => enrollCourse(courseId)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:shadow-xl"
                  >
                    <Play className="h-4 w-4" />
                    {progress.completed > 0 ? "Continue Learning" : "Start Course"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Course Content</h2>
          <div className="space-y-8">
            {course.chapters.map((chapter, chapterIndex) => {
              const chapterLessonIds = chapter.lessons.map((l) => l.id);
              const chapterProgress = getCourseProgress(chapterLessonIds);
              return (
                <div key={chapter.id}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Chapter {chapterIndex + 1}: {chapter.title}
                      </h3>
                      <p className="text-sm text-slate-500">{chapter.description}</p>
                    </div>
                    {chapterProgress.percentage > 0 && (
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{chapterProgress.percentage}%</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      const completed = isLessonCompleted(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${courseId}/${lesson.id}`}
                          onClick={() => enrollCourse(courseId)}
                          className={cn(
                            "flex items-center gap-4 rounded-xl border p-4 transition-all",
                            completed
                              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
                              : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-700"
                          )}
                        >
                          <div className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            completed ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 dark:bg-slate-700"
                          )}>
                            {completed ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">{chapterIndex + 1}.{lessonIndex + 1}</span>}
                          </div>
                          <div className="flex-1">
                            <h4 className={cn("font-medium", completed ? "text-emerald-800 dark:text-emerald-200" : "text-slate-900 dark:text-white")}>
                              {lesson.title}
                            </h4>
                            <p className="mt-0.5 text-sm text-slate-500">{lesson.description}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {lesson.estimatedMinutes}m</span>
                            <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> {lesson.xpReward} XP</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
