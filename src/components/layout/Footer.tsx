import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Luminar
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive STEM learning platform. Master math, physics, CS, and ML through hands-on problem-solving.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Learn
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/courses" className="hover:text-slate-700 dark:hover:text-slate-200">All Courses</Link></li>
              <li><Link href="/daily-challenge" className="hover:text-slate-700 dark:hover:text-slate-200">Daily Challenge</Link></li>
              <li><Link href="/review" className="hover:text-slate-700 dark:hover:text-slate-200">Spaced Repetition</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Progress
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/dashboard" className="hover:text-slate-700 dark:hover:text-slate-200">Dashboard</Link></li>
              <li><Link href="/achievements" className="hover:text-slate-700 dark:hover:text-slate-200">Achievements</Link></li>
              <li><Link href="/leaderboard" className="hover:text-slate-700 dark:hover:text-slate-200">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Subjects
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/courses/calculus-fundamentals" className="hover:text-slate-700 dark:hover:text-slate-200">Calculus</Link></li>
              <li><Link href="/courses/linear-algebra-ml" className="hover:text-slate-700 dark:hover:text-slate-200">Linear Algebra</Link></li>
              <li><Link href="/courses/python-algorithms" className="hover:text-slate-700 dark:hover:text-slate-200">Algorithms</Link></li>
              <li><Link href="/courses/ml-foundations" className="hover:text-slate-700 dark:hover:text-slate-200">Machine Learning</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-500">
          Built for deep understanding. No passive videos, just interactive learning.
        </div>
      </div>
    </footer>
  );
}
