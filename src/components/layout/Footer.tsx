import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Luminar
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Interactive STEM learning. Built for deep understanding.
          </p>
          <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/courses" className="hover:text-slate-700 dark:hover:text-slate-200">
              Courses
            </Link>
            <Link href="/dashboard" className="hover:text-slate-700 dark:hover:text-slate-200">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
