import type { Metadata } from "next";
import { getCourse, getAllLessonIds } from "@/content/courses";
import CourseDetailClient from "./CourseDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    return { title: "Course Not Found" };
  }

  const totalLessons = getAllLessonIds(courseId).length;

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | Luminar`,
      description: `${course.description} ${totalLessons} interactive lessons, ~${course.estimatedHours} hours.`,
    },
  };
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  return <CourseDetailClient params={params} />;
}
