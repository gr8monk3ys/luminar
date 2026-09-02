"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourse, getAllLessonIds } from "@/content/courses";
import { useProgress } from "@/hooks/useProgress";
import { Award, Printer, Share2, ArrowLeft, BookOpen, Clock, BarChart3 } from "lucide-react";

const CERTIFICATE_NAME_KEY = "certificate-name";

const difficultyLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export default function CertificateClient({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  const { getCourseProgress, getLessonProgress } = useProgress();

  const [recipientName, setRecipientName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CERTIFICATE_NAME_KEY);
      // Deliberately after mount, not in a lazy useState initializer: the
      // server has no localStorage, so seeding the initial state from it would
      // render a different tree on the server than on the client.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setRecipientName(saved);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleNameChange = useCallback((value: string) => {
    setRecipientName(value);
    try {
      localStorage.setItem(CERTIFICATE_NAME_KEY, value);
    } catch {
      // localStorage unavailable
    }
  }, []);

  if (!course) {
    redirect("/courses");
  }

  const allLessonIds = getAllLessonIds(courseId);
  const progress = getCourseProgress(allLessonIds);
  const isComplete = progress.percentage === 100;

  // Find completion date from the last completed lesson
  let completionDate: string | null = null;
  if (isComplete) {
    let latestDate = "";
    for (const lessonId of allLessonIds) {
      const lp = getLessonProgress(lessonId);
      if (lp?.completedAt && lp.completedAt > latestDate) {
        latestDate = lp.completedAt;
      }
    }
    completionDate = latestDate
      ? new Date(latestDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const name = recipientName || "A learner";
    const message = `${name} has successfully completed "${course.title}" on Luminar! ${allLessonIds.length} lessons mastered across ${course.estimatedHours} hours of content.`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  // Incomplete state
  if (!isComplete) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 dark:bg-slate-900">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Award className="h-10 w-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Certificate Not Yet Available
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Complete all lessons in <strong>{course.title}</strong> to earn your certificate of completion.
          </p>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>{progress.completed} of {progress.total} lessons completed</span>
              <span className="font-semibold">{progress.percentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress.percentage}%`,
                  backgroundColor: course.color,
                }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
              {progress.total - progress.completed} lesson{progress.total - progress.completed !== 1 ? "s" : ""} remaining
            </p>
          </div>
          <Link
            href={`/courses/${courseId}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            style={{ backgroundColor: course.color }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Complete state - render certificate
  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #certificate,
          #certificate * {
            visibility: visible !important;
          }
          #certificate {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 40px !important;
            box-shadow: none !important;
          }
          #certificate-actions {
            display: none !important;
          }
          @page {
            size: landscape;
            margin: 0.5in;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 px-4 py-12 dark:bg-slate-900 print:bg-white print:p-0">
        {/* Back link & actions - hidden on print */}
        <div id="certificate-actions" className="mx-auto mb-8 flex max-w-4xl items-center justify-between">
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Copied!" : "Share"}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              style={{ backgroundColor: course.color }}
            >
              <Printer className="h-4 w-4" />
              Print Certificate
            </button>
          </div>
        </div>

        {/* The Certificate */}
        <div
          id="certificate"
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          style={{
            border: `3px solid ${course.color}`,
            outline: `3px solid ${course.color}33`,
            outlineOffset: "4px",
          }}
        >
          {/* Gradient header strip */}
          <div
            className="h-3"
            style={{
              background: `linear-gradient(90deg, ${course.color}, ${course.color}99, ${course.color})`,
            }}
          />

          <div className="px-12 py-14 text-center sm:px-16 sm:py-16">
            {/* Decorative icon */}
            <div className="mb-2 flex justify-center">
              <Award
                className="h-16 w-16"
                style={{ color: course.color }}
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h1
              className="text-4xl tracking-wide sm:text-5xl"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#1e293b",
              }}
            >
              Certificate of Completion
            </h1>

            <div
              className="mx-auto my-6 h-px w-48"
              style={{ backgroundColor: `${course.color}66` }}
            />

            {/* Subtitle */}
            <p className="text-lg text-slate-500" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              This certifies that
            </p>

            {/* Name input */}
            <div className="mx-auto mt-4 max-w-md">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-b-2 border-slate-300 bg-transparent py-2 text-center text-3xl font-semibold text-slate-800 placeholder-slate-300 outline-none transition-colors focus:border-current print:border-slate-400"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  ...(recipientName ? { borderColor: course.color } : {}),
                }}
              />
            </div>

            {/* Has completed */}
            <p className="mt-8 text-lg text-slate-500" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              has successfully completed
            </p>

            {/* Course title */}
            <h2
              className="mt-3 text-2xl font-bold sm:text-3xl"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: course.color,
              }}
            >
              {course.title}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
              {course.description}
            </p>

            {/* Course stats */}
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex flex-col items-center gap-1.5">
                <BookOpen className="h-5 w-5" style={{ color: course.color }} />
                <span className="font-semibold text-slate-700">{allLessonIds.length}</span>
                <span>Lessons</span>
              </div>
              <div
                className="h-10 w-px"
                style={{ backgroundColor: `${course.color}33` }}
              />
              <div className="flex flex-col items-center gap-1.5">
                <Clock className="h-5 w-5" style={{ color: course.color }} />
                <span className="font-semibold text-slate-700">{course.estimatedHours}</span>
                <span>Hours</span>
              </div>
              <div
                className="h-10 w-px"
                style={{ backgroundColor: `${course.color}33` }}
              />
              <div className="flex flex-col items-center gap-1.5">
                <BarChart3 className="h-5 w-5" style={{ color: course.color }} />
                <span className="font-semibold text-slate-700">{difficultyLabels[course.difficulty] || "Intermediate"}</span>
                <span>Difficulty</span>
              </div>
            </div>

            {/* Completion date */}
            <div className="mt-10">
              <div
                className="mx-auto h-px w-32"
                style={{ backgroundColor: `${course.color}44` }}
              />
              <p className="mt-4 text-sm text-slate-500">
                Completed on <span className="font-semibold text-slate-700">{completionDate}</span>
              </p>
            </div>

            {/* Branding */}
            <div className="mt-10 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: course.color }}
                >
                  L
                </div>
                <span className="text-lg font-bold text-slate-800">Luminar</span>
              </div>
              <p className="text-xs text-slate-400">Interactive STEM Learning Platform</p>
            </div>
          </div>

          {/* Gradient footer strip */}
          <div
            className="h-3"
            style={{
              background: `linear-gradient(90deg, ${course.color}, ${course.color}99, ${course.color})`,
            }}
          />
        </div>
      </div>
    </>
  );
}
