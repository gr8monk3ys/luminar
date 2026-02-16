"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { getLesson, getNextLesson, getPreviousLesson } from "@/content/courses";
import { LessonRenderer } from "@/content/lessons/LessonRenderer";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from "lucide-react";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const lessonInfo = getLesson(courseId, lessonId);
  const {
    completeLesson,
    isLessonCompleted,
  } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);

  if (!lessonInfo) {
    notFound();
  }

  const { lesson, chapter, course } = lessonInfo;
  const nextLesson = getNextLesson(courseId, lessonId);
  const prevLesson = getPreviousLesson(courseId, lessonId);
  const completed = isLessonCompleted(lessonId);

  const handleComplete = useCallback(() => {
    if (!completed) {
      completeLesson(lessonId, 100, lesson.xpReward);
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 3000);
    }
  }, [completed, completeLesson, lessonId, lesson.xpReward]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Lesson nav bar */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{course.title}</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="text-center">
            <p className="text-xs text-slate-400">{chapter.title}</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {lesson.title}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            {lesson.estimatedMinutes}m
            {completed && (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            )}
          </div>
        </div>
      </div>

      {/* Completion toast */}
      {showCompletion && (
        <div className="fixed top-24 left-1/2 z-50 -translate-x-1/2 animate-bounce">
          <div className="flex items-center gap-3 rounded-full bg-emerald-600 px-6 py-3 text-white shadow-lg">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">+{lesson.xpReward} XP earned!</span>
          </div>
        </div>
      )}

      {/* Lesson content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <LessonRenderer lessonId={lessonId} />
          </div>

          {/* Complete button */}
          <div className="mt-12 flex justify-center">
            {completed ? (
              <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-6 py-3 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Lesson Completed</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
              >
                <CheckCircle2 className="h-5 w-5" />
                Complete Lesson
                <span className="ml-1 rounded-full bg-indigo-500 px-2 py-0.5 text-xs">
                  +{lesson.xpReward} XP
                </span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-700">
            {prevLesson ? (
              <Link
                href={`/learn/${courseId}/${prevLesson.lessonId}`}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Lesson
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/learn/${courseId}/${nextLesson.lessonId}`}
                className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
              >
                Next Lesson
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/courses/${courseId}`}
                className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
              >
                Back to Course
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
