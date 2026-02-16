import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse interactive courses in calculus, linear algebra, physics, algorithms, data structures, probability, discrete math, and machine learning.",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
