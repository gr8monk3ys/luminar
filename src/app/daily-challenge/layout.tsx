import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Challenge",
  description:
    "Test your STEM skills with a new challenge every day and earn bonus XP.",
};

export default function DailyChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
