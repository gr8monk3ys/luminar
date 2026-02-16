"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronRight,
  RotateCcw,
  Type,
} from "lucide-react";

interface FillInTheBlankProps {
  id: string;
  question: string;
  correctAnswer: string;
  tolerance?: number;
  inputType?: "text" | "number";
  placeholder?: string;
  hint?: string;
  explanation?: string;
  caseSensitive?: boolean;
}

export function FillInTheBlank({
  id,
  question,
  correctAnswer,
  tolerance = 0.01,
  inputType = "text",
  placeholder = "Type your answer...",
  hint,
  explanation,
  caseSensitive = false,
}: FillInTheBlankProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkAnswer = useCallback(
    (answer: string): boolean => {
      if (inputType === "number") {
        const userNum = parseFloat(answer);
        const correctNum = parseFloat(correctAnswer);
        if (isNaN(userNum) || isNaN(correctNum)) return false;
        return Math.abs(userNum - correctNum) <= tolerance;
      }

      const userText = caseSensitive ? answer.trim() : answer.trim().toLowerCase();
      const correctText = caseSensitive
        ? correctAnswer.trim()
        : correctAnswer.trim().toLowerCase();
      return userText === correctText;
    },
    [correctAnswer, tolerance, inputType, caseSensitive]
  );

  const handleSubmit = useCallback(() => {
    if (!userAnswer.trim()) return;

    const correct = checkAnswer(userAnswer);
    setIsSubmitted(true);
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);
  }, [userAnswer, checkAnswer]);

  const handleTryAgain = useCallback(() => {
    setUserAnswer("");
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isSubmitted) {
        handleSubmit();
      }
    },
    [handleSubmit, isSubmitted]
  );

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        <Type className="h-4 w-4" />
        Fill in the Blank
      </div>

      <p className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
        {question}
      </p>

      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor={`fill-blank-${id}`} className="sr-only">
            Your answer
          </label>
          <input
            ref={inputRef}
            id={`fill-blank-${id}`}
            type={inputType}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isSubmitted && isCorrect}
            aria-describedby={
              isSubmitted ? `fill-blank-feedback-${id}` : undefined
            }
            className={cn(
              "w-full rounded-lg border-2 px-4 py-3 text-base transition-all outline-none",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              !isSubmitted &&
                "border-slate-200 bg-slate-50 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700/50 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/30",
              isSubmitted &&
                isCorrect &&
                "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-900/20 dark:text-emerald-100",
              isSubmitted &&
                !isCorrect &&
                "border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-900/20 dark:text-red-100"
            )}
          />
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-5 py-3 text-sm font-medium transition-colors",
              userAnswer.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            )}
          >
            Submit <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          !isCorrect && (
            <button
              onClick={handleTryAgain}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </button>
          )
        )}
      </div>

      {isSubmitted && (
        <div
          id={`fill-blank-feedback-${id}`}
          role="status"
          aria-live="polite"
          className="mt-4"
        >
          {isCorrect ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              Correct!
              {attempts > 1 && (
                <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">
                  Solved in {attempts} {attempts === 1 ? "attempt" : "attempts"}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
              <XCircle className="h-5 w-5" />
              Not quite. Try again!
            </div>
          )}
        </div>
      )}

      {isSubmitted && !isCorrect && hint && !showHint && (
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

      {isSubmitted && isCorrect && explanation && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Explanation
          </div>
          <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
