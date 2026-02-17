import type { Metadata } from "next";
import { getCourse } from "@/content/courses";
import CertificateClient from "./CertificateClient";

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourse(courseId);
  return {
    title: course ? `Certificate — ${course.title}` : "Certificate",
  };
}

export default function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  return <CertificateClient params={params} />;
}
