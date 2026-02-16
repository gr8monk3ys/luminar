import { MetadataRoute } from "next";
import { courses } from "@/content/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminar.dev";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/dashboard`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/daily-challenge`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/achievements`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/leaderboard`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = Object.values(courses).map(
    (course) => ({
      url: `${siteUrl}/courses/${course.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const lessonPages: MetadataRoute.Sitemap = Object.values(courses).flatMap(
    (course) =>
      course.chapters.flatMap((chapter) =>
        chapter.lessons.map((lesson) => ({
          url: `${siteUrl}/learn/${course.id}/${lesson.id}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      )
  );

  return [...staticPages, ...coursePages, ...lessonPages];
}
