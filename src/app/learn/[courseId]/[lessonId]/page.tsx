import type { Metadata } from "next";
import { getLesson } from "@/content/courses";
import LessonClient from "./LessonClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const lessonInfo = getLesson(courseId, lessonId);

  if (!lessonInfo) {
    return { title: "Lesson Not Found" };
  }

  const { lesson, course } = lessonInfo;

  return {
    title: `${lesson.title} — ${course.title}`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | ${course.title} | Luminar`,
      description: lesson.description,
    },
  };
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  return <LessonClient params={params} />;
}
