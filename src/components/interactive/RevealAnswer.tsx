"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RevealAnswerProps {
  children: React.ReactNode;
  label?: string;
}

export function RevealAnswer({
  children,
  label = "Reveal answer",
}: RevealAnswerProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-6">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-6 py-3 text-sm font-medium text-slate-600 transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-indigo-500"
        >
          <Eye className="h-4 w-4" />
          {label}
        </button>
      ) : (
        <div>
          <button
            onClick={() => setRevealed(false)}
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400"
          >
            <EyeOff className="h-3 w-3" /> Hide
          </button>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
