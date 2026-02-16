"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/content/courses";
import { Search, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "lesson" | "course";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  courseColor?: string;
}

function getAllSearchItems(): SearchResult[] {
  const items: SearchResult[] = [];

  for (const course of Object.values(courses)) {
    items.push({
      type: "course",
      id: course.id,
      title: course.title,
      subtitle: `${course.chapters.reduce((s, c) => s + c.lessons.length, 0)} lessons`,
      href: `/courses/${course.id}`,
      courseColor: course.color,
    });

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        items.push({
          type: "lesson",
          id: lesson.id,
          title: lesson.title,
          subtitle: `${course.title} / ${chapter.title}`,
          href: `/learn/${course.id}/${lesson.id}`,
          courseColor: course.color,
        });
      }
    }
  }

  return items;
}

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const allItems = useMemo(() => getAllSearchItems(), []);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, allItems]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [open]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Scroll selected into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.children[selectedIndex] as HTMLElement;
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].href);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600 dark:hover:text-slate-300 md:flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-2 rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-600">
          {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent)
            ? "⌘K"
            : "Ctrl+K"}
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons and courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent py-4 text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
          />
          <kbd
            className="shrink-0 rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-slate-600"
            onClick={() => setOpen(false)}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((result, i) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => navigate(result.href)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  i === selectedIndex
                    ? "bg-indigo-50 dark:bg-indigo-900/30"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: result.courseColor
                      ? `${result.courseColor}20`
                      : undefined,
                  }}
                >
                  {result.type === "course" ? (
                    <GraduationCap
                      className="h-4 w-4"
                      style={{ color: result.courseColor }}
                    />
                  ) : (
                    <BookOpen
                      className="h-4 w-4"
                      style={{ color: result.courseColor }}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {result.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {result.subtitle}
                  </p>
                </div>
                {i === selectedIndex && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-indigo-500" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-700">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-slate-300 px-1 py-0.5 dark:border-slate-600">
              ↑↓
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-slate-300 px-1 py-0.5 dark:border-slate-600">
              ↵
            </kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-slate-300 px-1 py-0.5 dark:border-slate-600">
              esc
            </kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
