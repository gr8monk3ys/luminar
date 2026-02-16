export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  category: "math" | "cs" | "data-science" | "science";
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedHours: number;
  prerequisites: string[];
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: LessonMetadata[];
}

export interface LessonMetadata {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  concepts: string[];
  xpReward: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  courseIds: string[];
}

export interface UserProgress {
  lessonsCompleted: Record<string, LessonProgress>;
  coursesEnrolled: string[];
  xp: number;
  level: number;
  streak: StreakData;
  lastActivityDate: string;
}

export interface LessonProgress {
  completed: boolean;
  completedAt?: string;
  score: number;
  xpEarned: number;
  answers: Record<string, unknown>;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActivityDate: string;
  streakFreezes: number;
}
