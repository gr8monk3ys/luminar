export interface LessonSection {
  heading: string;
  text: string;
}

export interface TutorChunk {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  courseTitle: string;
  chapterId: string;
  chapterTitle: string;
  heading: string;
  text: string;
}

export interface ScoredChunk {
  chunk: TutorChunk;
  score: number;
}
