import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spaced Repetition Review",
  description:
    "Review concepts at optimal intervals using the SM-2 spaced repetition algorithm for long-term retention.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
