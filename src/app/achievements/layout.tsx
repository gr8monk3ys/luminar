import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Track your badges and milestones across learning, streaks, mastery, and exploration.",
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
