"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Link2,
  MousePointerClick,
} from "lucide-react";

interface MatchingPair {
  left: string;
  right: string;
}

interface MatchingExerciseProps {
  id: string;
  instruction: string;
  pairs: MatchingPair[];
  explanation?: string;
}

const PAIR_COLORS = [
  {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    border: "border-indigo-400 dark:border-indigo-500",
    text: "text-indigo-700 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-400 dark:border-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-400 dark:border-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    border: "border-rose-400 dark:border-rose-500",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "border-cyan-400 dark:border-cyan-500",
    text: "text-cyan-700 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
  {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-400 dark:border-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500",
  },
  {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-400 dark:border-orange-500",
    text: "text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
  },
  {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    border: "border-teal-400 dark:border-teal-500",
    text: "text-teal-700 dark:text-teal-300",
    dot: "bg-teal-500",
  },
];

function seededShuffle<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    const j = hash % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatchingExercise({
  id,
  instruction,
  pairs,
  explanation,
}: MatchingExerciseProps) {
  const shuffledRightIndices = useMemo(
    () =>
      seededShuffle(
        pairs.map((_, i) => i),
        id
      ),
    [pairs, id]
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState<Map<number, boolean>>(new Map());

  const nextColorIndex = matches.size;

  const getColorForMatch = useCallback(
    (leftIndex: number): (typeof PAIR_COLORS)[0] | null => {
      if (!matches.has(leftIndex)) return null;
      const matchEntries = Array.from(matches.entries());
      const matchIndex = matchEntries.findIndex(([l]) => l === leftIndex);
      return PAIR_COLORS[matchIndex % PAIR_COLORS.length];
    },
    [matches]
  );

  const getRightMatchColor = useCallback(
    (rightOriginalIndex: number): (typeof PAIR_COLORS)[0] | null => {
      const matchEntries = Array.from(matches.entries());
      const matchIndex = matchEntries.findIndex(
        ([, r]) => r === rightOriginalIndex
      );
      if (matchIndex === -1) return null;
      return PAIR_COLORS[matchIndex % PAIR_COLORS.length];
    },
    [matches]
  );

  const isRightMatched = useCallback(
    (rightOriginalIndex: number): boolean => {
      return Array.from(matches.values()).includes(rightOriginalIndex);
    },
    [matches]
  );

  const handleLeftClick = useCallback(
    (leftIndex: number) => {
      if (isChecked) return;

      if (matches.has(leftIndex)) {
        const newMatches = new Map(matches);
        newMatches.delete(leftIndex);
        setMatches(newMatches);
        setSelectedLeft(null);
        setSelectedRight(null);
        return;
      }

      setSelectedLeft(leftIndex);

      if (selectedRight !== null) {
        const newMatches = new Map(matches);
        newMatches.set(leftIndex, selectedRight);
        setMatches(newMatches);
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    },
    [isChecked, matches, selectedRight]
  );

  const handleRightClick = useCallback(
    (rightOriginalIndex: number) => {
      if (isChecked) return;

      if (isRightMatched(rightOriginalIndex)) {
        const newMatches = new Map(matches);
        for (const [l, r] of newMatches.entries()) {
          if (r === rightOriginalIndex) {
            newMatches.delete(l);
            break;
          }
        }
        setMatches(newMatches);
        setSelectedLeft(null);
        setSelectedRight(null);
        return;
      }

      setSelectedRight(rightOriginalIndex);

      if (selectedLeft !== null) {
        const newMatches = new Map(matches);
        newMatches.set(selectedLeft, rightOriginalIndex);
        setMatches(newMatches);
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    },
    [isChecked, isRightMatched, matches, selectedLeft]
  );

  const handleCheck = useCallback(() => {
    const newResults = new Map<number, boolean>();
    matches.forEach((rightIndex, leftIndex) => {
      newResults.set(leftIndex, rightIndex === leftIndex);
    });
    setResults(newResults);
    setIsChecked(true);
  }, [matches]);

  const handleReset = useCallback(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches(new Map());
    setIsChecked(false);
    setResults(new Map());
  }, []);

  const allMatched = matches.size === pairs.length;
  const allCorrect =
    isChecked &&
    results.size === pairs.length &&
    Array.from(results.values()).every(Boolean);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        <Link2 className="h-4 w-4" />
        Matching Exercise
      </div>

      <p className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
        {instruction}
      </p>

      {!isChecked && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MousePointerClick className="h-4 w-4" />
          Click an item on the left, then click its match on the right.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4" role="group" aria-label="Matching exercise">
        {/* Left column */}
        <div className="space-y-2" role="list" aria-label="Items to match">
          {pairs.map((pair, index) => {
            const isSelected = selectedLeft === index;
            const isMatched = matches.has(index);
            const color = getColorForMatch(index);
            const result = results.get(index);

            return (
              <button
                key={`${id}-left-${index}`}
                role="listitem"
                onClick={() => handleLeftClick(index)}
                disabled={isChecked}
                aria-label={`${pair.left}${isMatched ? " (matched)" : ""}${
                  result !== undefined
                    ? result
                      ? " (correct)"
                      : " (incorrect)"
                    : ""
                }`}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                  !isMatched &&
                    !isSelected &&
                    "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20",
                  isSelected &&
                    !isMatched &&
                    "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 dark:border-indigo-400 dark:bg-indigo-900/30 dark:ring-indigo-800",
                  isMatched &&
                    !isChecked &&
                    color &&
                    `${color.border} ${color.bg}`,
                  isChecked &&
                    result === true &&
                    "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20",
                  isChecked &&
                    result === false &&
                    "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20",
                  isChecked && "cursor-default"
                )}
              >
                {isMatched && !isChecked && color && (
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      color.dot
                    )}
                  />
                )}
                {isChecked && result === true && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                )}
                {isChecked && result === false && (
                  <XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                )}
                <span className="text-slate-700 dark:text-slate-200">
                  {pair.left}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right column (shuffled) */}
        <div className="space-y-2" role="list" aria-label="Matching options">
          {shuffledRightIndices.map((originalIndex) => {
            const pair = pairs[originalIndex];
            const isSelected = selectedRight === originalIndex;
            const matched = isRightMatched(originalIndex);
            const color = getRightMatchColor(originalIndex);

            const matchedLeftIndex = matched
              ? Array.from(matches.entries()).find(
                  ([, r]) => r === originalIndex
                )?.[0]
              : undefined;
            const result =
              matchedLeftIndex !== undefined
                ? results.get(matchedLeftIndex)
                : undefined;

            return (
              <button
                key={`${id}-right-${originalIndex}`}
                role="listitem"
                onClick={() => handleRightClick(originalIndex)}
                disabled={isChecked}
                aria-label={`${pair.right}${matched ? " (matched)" : ""}${
                  result !== undefined
                    ? result
                      ? " (correct)"
                      : " (incorrect)"
                    : ""
                }`}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                  !matched &&
                    !isSelected &&
                    "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20",
                  isSelected &&
                    !matched &&
                    "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 dark:border-indigo-400 dark:bg-indigo-900/30 dark:ring-indigo-800",
                  matched &&
                    !isChecked &&
                    color &&
                    `${color.border} ${color.bg}`,
                  isChecked &&
                    result === true &&
                    "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20",
                  isChecked &&
                    result === false &&
                    "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20",
                  isChecked && "cursor-default"
                )}
              >
                {matched && !isChecked && color && (
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      color.dot
                    )}
                  />
                )}
                {isChecked && result === true && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                )}
                {isChecked && result === false && (
                  <XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                )}
                <span className="text-slate-700 dark:text-slate-200">
                  {pair.right}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        {!isChecked ? (
          <button
            onClick={handleCheck}
            disabled={!allMatched}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-5 py-2 text-sm font-medium transition-colors",
              allMatched
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            )}
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        )}

        {!isChecked && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {matches.size} of {pairs.length} matched
          </span>
        )}
      </div>

      {isChecked && (
        <div role="status" aria-live="polite" className="mt-4">
          {allCorrect ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              All matches are correct!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
              <XCircle className="h-5 w-5" />
              Some matches are incorrect. Try again!
            </div>
          )}
        </div>
      )}

      {isChecked && allCorrect && explanation && (
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
