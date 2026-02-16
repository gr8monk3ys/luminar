"use client";

import { lessonComponents } from "./index";

export function LessonRenderer({ lessonId }: { lessonId: string }) {
  const Component = lessonComponents[lessonId];
  if (!Component) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-slate-500">
          Lesson content is being prepared. Check back soon!
        </p>
      </div>
    );
  }
  return <Component />;
}
