"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RotateCcw, Check, X, Brain, ChevronRight, Sparkles } from "lucide-react";

interface ReviewCard {
  id: number;
  lessonId: string;
  courseId: string;
  question: string;
  answer: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
}

type ReviewPhase = "question" | "answer";

export default function ReviewPage() {
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<ReviewPhase>("question");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  useEffect(() => {
    fetch("/api/review")
      .then((res) => {
        if (res.status === 401) {
          setError("Sign in to use spaced repetition review.");
          return { cards: [] };
        }
        if (res.status === 503) {
          setError("Connect a database to enable spaced repetition.");
          return { cards: [] };
        }
        return res.json();
      })
      .then((data) => {
        setCards(data.cards || []);
        if (data.cards?.length === 0 && !error) {
          setSessionDone(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load review cards.");
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentCard = cards[currentIndex];

  const submitReview = useCallback(
    async (quality: number) => {
      if (!currentCard) return;

      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          cardId: currentCard.id,
          quality,
        }),
      });

      setReviewed((r) => r + 1);

      if (currentIndex + 1 < cards.length) {
        setCurrentIndex((i) => i + 1);
        setPhase("question");
      } else {
        setSessionDone(true);
      }
    },
    [currentCard, currentIndex, cards.length]
  );

  const qualityButtons = [
    { quality: 1, label: "Again", color: "bg-red-500 hover:bg-red-600", icon: X },
    { quality: 3, label: "Hard", color: "bg-orange-500 hover:bg-orange-600", icon: RotateCcw },
    { quality: 4, label: "Good", color: "bg-emerald-500 hover:bg-emerald-600", icon: Check },
    { quality: 5, label: "Easy", color: "bg-indigo-500 hover:bg-indigo-600", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-500" />
            Spaced Repetition Review
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Review concepts at optimal intervals for long-term retention
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Loading review cards...</p>
          </div>
        )}

        {error && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
            <Brain className="h-12 w-12 text-amber-400 mx-auto mb-3" />
            <p className="text-amber-800 dark:text-amber-200 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && sessionDone && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {reviewed > 0 ? "Session Complete!" : "All Caught Up!"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {reviewed > 0
                ? `You reviewed ${reviewed} card${reviewed === 1 ? "" : "s"}. Great work!`
                : "No cards are due for review right now. Complete more lessons to generate review cards."}
            </p>
          </div>
        )}

        {!loading && !error && !sessionDone && currentCard && (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-1">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <span>{reviewed} reviewed</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {/* Question */}
              <div className="p-8">
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                  Question
                </p>
                <p className="text-lg text-slate-900 dark:text-white leading-relaxed">
                  {currentCard.question}
                </p>
              </div>

              {phase === "question" && (
                <div className="border-t border-slate-200 dark:border-slate-800 p-6 text-center">
                  <button
                    onClick={() => setPhase("answer")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Show Answer
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {phase === "answer" && (
                <>
                  <div className="border-t border-slate-200 dark:border-slate-800 p-8 bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                      Answer
                    </p>
                    <p className="text-lg text-slate-900 dark:text-white leading-relaxed">
                      {currentCard.answer}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 p-6">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4">
                      How well did you recall this?
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {qualityButtons.map(({ quality, label, color, icon: Icon }) => (
                        <button
                          key={quality}
                          onClick={() => submitReview(quality)}
                          className={`${color} text-white rounded-lg py-3 px-2 font-medium text-sm transition-colors flex flex-col items-center gap-1`}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
