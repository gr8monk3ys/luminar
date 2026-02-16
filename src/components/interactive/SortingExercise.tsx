"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ListOrdered,
} from "lucide-react";

interface SortingExerciseProps {
  id: string;
  instruction: string;
  items: string[];
  explanation?: string;
}

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

export function SortingExercise({
  id,
  instruction,
  items,
  explanation,
}: SortingExerciseProps) {
  const initialOrder = useMemo(
    () =>
      seededShuffle(
        items.map((_, i) => i),
        id
      ),
    [items, id]
  );

  const [currentOrder, setCurrentOrder] = useState<number[]>(initialOrder);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const handleItemClick = useCallback(
    (positionIndex: number) => {
      if (isChecked) return;

      if (selectedIndex === null) {
        setSelectedIndex(positionIndex);
      } else if (selectedIndex === positionIndex) {
        setSelectedIndex(null);
      } else {
        setCurrentOrder((prev) => {
          const next = [...prev];
          [next[selectedIndex], next[positionIndex]] = [
            next[positionIndex],
            next[selectedIndex],
          ];
          return next;
        });
        setSelectedIndex(null);
      }
    },
    [isChecked, selectedIndex]
  );

  const handleMoveUp = useCallback(
    (positionIndex: number) => {
      if (isChecked || positionIndex === 0) return;
      setCurrentOrder((prev) => {
        const next = [...prev];
        [next[positionIndex - 1], next[positionIndex]] = [
          next[positionIndex],
          next[positionIndex - 1],
        ];
        return next;
      });
      setSelectedIndex(null);
    },
    [isChecked]
  );

  const handleMoveDown = useCallback(
    (positionIndex: number) => {
      if (isChecked || positionIndex === currentOrder.length - 1) return;
      setCurrentOrder((prev) => {
        const next = [...prev];
        [next[positionIndex], next[positionIndex + 1]] = [
          next[positionIndex + 1],
          next[positionIndex],
        ];
        return next;
      });
      setSelectedIndex(null);
    },
    [isChecked, currentOrder.length]
  );

  const handleCheck = useCallback(() => {
    const newResults = currentOrder.map(
      (originalIndex, position) => originalIndex === position
    );
    setResults(newResults);
    setIsChecked(true);
    setSelectedIndex(null);
  }, [currentOrder]);

  const handleReset = useCallback(() => {
    setCurrentOrder(
      seededShuffle(
        items.map((_, i) => i),
        id
      )
    );
    setSelectedIndex(null);
    setIsChecked(false);
    setResults([]);
  }, [items, id]);

  const allCorrect = isChecked && results.every(Boolean);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        <ListOrdered className="h-4 w-4" />
        Put in Order
      </div>

      <p className="mb-6 text-lg font-medium text-slate-900 dark:text-slate-100">
        {instruction}
      </p>

      <div className="space-y-2" role="list" aria-label="Sortable items">
        {currentOrder.map((originalIndex, position) => {
          const isSelected = selectedIndex === position;
          const result = isChecked ? results[position] : undefined;

          return (
            <div
              key={`${id}-item-${originalIndex}`}
              role="listitem"
              className={cn(
                "flex items-center gap-2 rounded-lg border-2 transition-all",
                !isChecked &&
                  !isSelected &&
                  "border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50",
                !isChecked &&
                  isSelected &&
                  "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 dark:border-indigo-400 dark:bg-indigo-900/30 dark:ring-indigo-800",
                isChecked &&
                  result === true &&
                  "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20",
                isChecked &&
                  result === false &&
                  "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20"
              )}
            >
              <button
                onClick={() => handleItemClick(position)}
                disabled={isChecked}
                className={cn(
                  "flex flex-1 items-center gap-3 px-4 py-3 text-left",
                  !isChecked && "cursor-pointer"
                )}
                aria-label={`${items[originalIndex]}. Position ${position + 1} of ${items.length}${
                  isSelected ? ". Selected, click another item to swap" : ""
                }${
                  result !== undefined
                    ? result
                      ? ". Correct position"
                      : ". Incorrect position"
                    : ""
                }`}
              >
                <GripVertical
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isChecked
                      ? "text-slate-300 dark:text-slate-600"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                />
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    !isChecked &&
                      "bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300",
                    isChecked &&
                      result === true &&
                      "bg-emerald-500 text-white",
                    isChecked && result === false && "bg-red-500 text-white"
                  )}
                >
                  {isChecked && result === true ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : isChecked && result === false ? (
                    <XCircle className="h-3.5 w-3.5" />
                  ) : (
                    position + 1
                  )}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {items[originalIndex]}
                </span>
              </button>

              {!isChecked && (
                <div className="flex shrink-0 flex-col gap-0.5 pr-2">
                  <button
                    onClick={() => handleMoveUp(position)}
                    disabled={position === 0}
                    aria-label={`Move ${items[originalIndex]} up`}
                    className={cn(
                      "rounded p-1 transition-colors",
                      position === 0
                        ? "cursor-not-allowed text-slate-300 dark:text-slate-600"
                        : "text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-200"
                    )}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(position)}
                    disabled={position === currentOrder.length - 1}
                    aria-label={`Move ${items[originalIndex]} down`}
                    className={cn(
                      "rounded p-1 transition-colors",
                      position === currentOrder.length - 1
                        ? "cursor-not-allowed text-slate-300 dark:text-slate-600"
                        : "text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-200"
                    )}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {!isChecked ? (
          <button
            onClick={handleCheck}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Check Order
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        )}
      </div>

      {isChecked && (
        <div role="status" aria-live="polite" className="mt-4">
          {allCorrect ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              Perfect order! All items are in the correct position.
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
              <XCircle className="h-5 w-5" />
              Some items are out of order. Try rearranging and check again!
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
