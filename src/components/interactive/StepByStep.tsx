"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import { MathBlock } from "./MathBlock";

interface Step {
  title: string;
  content: string;
  latex?: string;
}

interface StepByStepProps {
  steps: Step[];
  title?: string;
}

export function StepByStep({ steps, title = "Solution" }: StepByStepProps) {
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  const toggleStep = (index: number) => {
    setRevealedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const revealAll = () => {
    if (allRevealed) {
      setRevealedSteps(new Set());
      setAllRevealed(false);
    } else {
      setRevealedSteps(new Set(steps.map((_, i) => i)));
      setAllRevealed(true);
    }
  };

  const revealNext = () => {
    for (let i = 0; i < steps.length; i++) {
      if (!revealedSteps.has(i)) {
        setRevealedSteps((prev) => new Set(prev).add(i));
        if (i === steps.length - 1) setAllRevealed(true);
        return;
      }
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={revealNext}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              allRevealed
                ? "text-slate-400 dark:text-slate-500"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300"
            )}
            disabled={allRevealed}
          >
            Next step
          </button>
          <button
            onClick={revealAll}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {allRevealed ? "Hide all" : "Show all"}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isRevealed = revealedSteps.has(index);

            return (
              <div key={index} className="group">
                <button
                  onClick={() => toggleStep(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all",
                    isRevealed
                      ? "bg-indigo-50 dark:bg-indigo-900/20"
                      : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isRevealed
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-300 text-slate-600 dark:bg-slate-500 dark:text-slate-200"
                    )}
                  >
                    {isRevealed ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-medium",
                      isRevealed
                        ? "text-indigo-900 dark:text-indigo-100"
                        : "text-slate-700 dark:text-slate-200"
                    )}
                  >
                    {step.title}
                  </span>
                  {isRevealed ? (
                    <ChevronDown className="h-4 w-4 text-indigo-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {isRevealed && (
                  <div className="mt-2 pl-13 pr-4 pb-2">
                    <div className="pl-9">
                      <p className="text-slate-600 dark:text-slate-300">
                        {step.content}
                      </p>
                      {step.latex && (
                        <MathBlock latex={step.latex} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
