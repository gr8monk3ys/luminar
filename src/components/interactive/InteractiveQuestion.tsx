"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Lightbulb, ChevronRight } from "lucide-react";

interface QuestionOption {
  text: string;
  feedback?: string;
}

interface InteractiveQuestionProps {
  id: string;
  question: string;
  options: QuestionOption[];
  correctIndex: number;
  hint?: string;
  explanation?: string;
  onAnswer?: (correct: boolean) => void;
}

export function InteractiveQuestion({
  id,
  question,
  options,
  correctIndex,
  hint,
  explanation,
  onAnswer,
}: InteractiveQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === correctIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (isAnswered && isCorrect) return;

      setSelectedIndex(index);
      setAttempts((prev) => prev + 1);

      if (index === correctIndex) {
        setShowExplanation(true);
        onAnswer?.(true);
      } else {
        onAnswer?.(false);
      }
    },
    [isAnswered, isCorrect, correctIndex, onAnswer]
  );

  const handleTryAgain = useCallback(() => {
    setSelectedIndex(null);
    setShowExplanation(false);
  }, []);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        Question
      </div>
      <p className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
        {question}
      </p>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === correctIndex;
          const showResult = isAnswered && isSelected;

          return (
            <button
              key={`${id}-option-${index}`}
              onClick={() => handleSelect(index)}
              disabled={isAnswered && isCorrect}
              className={cn(
                "w-full rounded-lg border-2 px-4 py-3 text-left transition-all",
                "hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20",
                !isAnswered &&
                  "border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50",
                showResult &&
                  isCorrectOption &&
                  "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20",
                showResult &&
                  !isCorrectOption &&
                  "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20",
                isAnswered &&
                  isCorrect &&
                  !isSelected &&
                  "opacity-60",
                isAnswered && isCorrect && "cursor-default"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                    !isAnswered &&
                      "border-slate-300 text-slate-500 dark:border-slate-500 dark:text-slate-400",
                    showResult &&
                      isCorrectOption &&
                      "border-emerald-500 bg-emerald-500 text-white",
                    showResult &&
                      !isCorrectOption &&
                      "border-red-500 bg-red-500 text-white"
                  )}
                >
                  {showResult && isCorrectOption ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : showResult && !isCorrectOption ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="text-slate-700 dark:text-slate-200">
                  {option.text}
                </span>
              </div>

              {showResult && option.feedback && (
                <p
                  className={cn(
                    "mt-2 pl-10 text-sm",
                    isCorrectOption
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-red-700 dark:text-red-300"
                  )}
                >
                  {option.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && !isCorrect && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleTryAgain}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Try Again <ChevronRight className="h-4 w-4" />
          </button>
          {hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
            >
              <Lightbulb className="h-4 w-4" /> Show hint
            </button>
          )}
        </div>
      )}

      {showHint && hint && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
            <Lightbulb className="h-4 w-4" /> Hint
          </div>
          <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">{hint}</p>
        </div>
      )}

      {showExplanation && explanation && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Explanation
          </div>
          <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
            {explanation}
          </p>
        </div>
      )}

      {isAnswered && isCorrect && attempts > 1 && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Solved in {attempts} {attempts === 1 ? "attempt" : "attempts"}
        </p>
      )}
    </div>
  );
}
