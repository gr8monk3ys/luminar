import fs from "node:fs";
import path from "node:path";
import { courses } from "../../content/courses";
import { extractLessonSections } from "./extract-lesson-text";
import type { TutorChunk } from "./types";

const LESSONS_DIR = path.join(process.cwd(), "src", "content", "lessons");
const EXCLUDED_FILES = new Set(["index.ts", "LessonRenderer.tsx"]);

interface LessonLocation {
  courseId: string;
  courseTitle: string;
  chapterId: string;
  chapterTitle: string;
  lessonTitle: string;
}

function buildLessonLocationMap(): Map<string, LessonLocation> {
  const map = new Map<string, LessonLocation>();
  for (const course of Object.values(courses)) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        map.set(lesson.id, {
          courseId: course.id,
          courseTitle: course.title,
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          lessonTitle: lesson.title,
        });
      }
    }
  }
  return map;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}

/**
 * Chunks every lesson under src/content/lessons into retrievable,
 * heading-scoped sections, joined with the lesson's course/chapter metadata
 * from src/content/courses. Pure text in, pure data out — no network, no
 * model key, safe to run in CI.
 */
export function buildTutorIndex(): TutorChunk[] {
  const locations = buildLessonLocationMap();
  const files = fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith(".tsx") && !EXCLUDED_FILES.has(file));

  const chunks: TutorChunk[] = [];

  for (const file of files) {
    const lessonId = file.replace(/\.tsx$/, "");
    const location = locations.get(lessonId);
    if (!location) {
      // Lesson file exists but isn't wired into any course chapter yet;
      // the indexer adapts to content, so skip rather than guess metadata.
      continue;
    }

    const source = fs.readFileSync(path.join(LESSONS_DIR, file), "utf8");
    const sections = extractLessonSections(source);
    const seenSlugs = new Map<string, number>();

    for (const section of sections) {
      let slug = slugify(section.heading);
      const count = seenSlugs.get(slug) ?? 0;
      seenSlugs.set(slug, count + 1);
      if (count > 0) slug = `${slug}-${count}`;

      chunks.push({
        id: `${lessonId}#${slug}`,
        lessonId,
        lessonTitle: location.lessonTitle,
        courseId: location.courseId,
        courseTitle: location.courseTitle,
        chapterId: location.chapterId,
        chapterTitle: location.chapterTitle,
        heading: section.heading,
        text: section.text,
      });
    }
  }

  return chunks;
}
