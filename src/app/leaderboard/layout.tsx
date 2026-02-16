import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "See the top learners ranked by experience points and streaks.",
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
