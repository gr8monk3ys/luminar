"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Check,
  X,
  HelpCircle,
} from "lucide-react";

interface TrueFalseProps {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  hint?: string;
}

export function TrueFalse({
  id,
  statement,
  isTrue,
  explanation,
  hint,
}: TrueFalseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === isTrue;

  const handleAnswer = useCallback(
    (answer: boolean) => {
      if (isAnswered && isCorrect) return;
      setSelectedAnswer(answer);
    },
    [isAnswered, isCorrect]
  );

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        <HelpCircle className="h-4 w-4" />
        True or False?
      </div>

      <p className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
        {statement}
      </p>

      <div
        className="flex gap-4"
        role="group"
        aria-label="True or false selection"
      >
        {/* True button */}
        <button
          onClick={() => handleAnswer(true)}
          disabled={isAnswered && isCorrect}
          aria-pressed={selectedAnswer === true}
          aria-label={`True${
            isAnswered && selectedAnswer === true
              ? isCorrect
                ? " (correct)"
                : " (incorrect)"
              : ""
          }${isAnswered && isTrue && selectedAnswer !== true ? " (this was the correct answer)" : ""}`}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-6 py-4 text-base font-semibold transition-all",
            // Default state
            !isAnswered &&
              "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/40",
            // Selected and correct
            isAnswered &&
              selectedAnswer === true &&
              isCorrect &&
              "border-emerald-500 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-800",
            // Selected and incorrect
            isAnswered &&
              selectedAnswer === true &&
              !isCorrect &&
              "border-red-500 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900/30 dark:text-red-200",
            // Not selected but was the correct answer (show after wrong answer)
            isAnswered &&
              selectedAnswer !== true &&
              isTrue &&
              "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800",
            // Not selected and not correct answer
            isAnswered &&
              selectedAnswer !== true &&
              !isTrue &&
              "opacity-50",
            isAnswered && isCorrect && "cursor-default"
          )}
        >
          <Check className="h-5 w-5" />
          True
        </button>

        {/* False button */}
        <button
          onClick={() => handleAnswer(false)}
          disabled={isAnswered && isCorrect}
          aria-pressed={selectedAnswer === false}
          aria-label={`False${
            isAnswered && selectedAnswer === false
              ? isCorrect
                ? " (correct)"
                : " (incorrect)"
              : ""
          }${isAnswered && !isTrue && selectedAnswer !== false ? " (this was the correct answer)" : ""}`}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-6 py-4 text-base font-semibold transition-all",
            // Default state
            !isAnswered &&
              "border-red-200 bg-red-50 text-red-700 hover:border-red-400 hover:bg-red-100 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300 dark:hover:border-red-500 dark:hover:bg-red-900/40",
            // Selected and correct
            isAnswered &&
              selectedAnswer === false &&
              isCorrect &&
              "border-emerald-500 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200 dark:ring-emerald-800",
            // Selected and incorrect
            isAnswered &&
              selectedAnswer === false &&
              !isCorrect &&
              "border-red-500 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900/30 dark:text-red-200",
            // Not selected but was the correct answer (show after wrong answer)
            isAnswered &&
              selectedAnswer !== false &&
              !isTrue &&
              "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800",
            // Not selected and not correct answer
            isAnswered &&
              selectedAnswer !== false &&
              isTrue &&
              "opacity-50",
            isAnswered && isCorrect && "cursor-default"
          )}
        >
          <X className="h-5 w-5" />
          False
        </button>
      </div>

      {isAnswered && (
        <div role="status" aria-live="polite" className="mt-4">
          {isCorrect ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              Correct! The statement is {isTrue ? "true" : "false"}.
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
              <XCircle className="h-5 w-5" />
              Incorrect. The statement is actually {isTrue ? "true" : "false"}.
            </div>
          )}
        </div>
      )}

      {isAnswered && !isCorrect && hint && !showHint && (
        <div className="mt-3">
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
          >
            <Lightbulb className="h-4 w-4" /> Show hint
          </button>
        </div>
      )}

      {showHint && hint && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
            <Lightbulb className="h-4 w-4" /> Hint
          </div>
          <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
            {hint}
          </p>
        </div>
      )}

      {isAnswered && explanation && (
        <div
          className={cn(
            "mt-4 rounded-lg border p-4",
            isCorrect
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
              : "border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              isCorrect
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-slate-700 dark:text-slate-300"
            )}
          >
            <CheckCircle2 className="h-4 w-4" /> Explanation
          </div>
          <p
            className={cn(
              "mt-1 text-sm",
              isCorrect
                ? "text-emerald-800 dark:text-emerald-200"
                : "text-slate-600 dark:text-slate-300"
            )}
          >
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
