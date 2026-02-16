"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Trophy, Flame, Star, Medal } from "lucide-react";

interface LeaderboardEntry {
  displayName: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  streakCurrent: number;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => {
        if (res.status === 503) {
          setError("Connect a database to enable the leaderboard.");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load leaderboard.");
        setLoading(false);
      });
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-sm font-bold text-slate-500 w-6 text-center">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Top learners ranked by experience points
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
            <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-3" />
            <p className="text-amber-800 dark:text-amber-200 font-medium">{error}</p>
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">
              The leaderboard will be available once a database is connected.
            </p>
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <Star className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400">No entries yet. Start learning to climb the ranks!</p>
          </div>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i < 3 ? "bg-indigo-50/50 dark:bg-indigo-950/20" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(i + 1)}
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {entry.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {entry.displayName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Level {entry.level}
                    </p>
                  </div>
                  {entry.streakCurrent > 0 && (
                    <div className="flex items-center gap-1 text-sm text-orange-500">
                      <Flame className="h-4 w-4" />
                      {entry.streakCurrent}
                    </div>
                  )}
                  <div className="text-right">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">
                      {entry.xp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
