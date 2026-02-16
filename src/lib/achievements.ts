import type { UserProgress } from "@/types/content";
import { courses, getAllLessonIds } from "@/content/courses";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "learning" | "streak" | "mastery" | "exploration";
  condition: {
    type:
      | "lessons_completed"
      | "courses_completed"
      | "streak_days"
      | "xp_earned"
      | "perfect_scores"
      | "courses_started";
    threshold: number;
  };
  xpBonus: number;
}

export const achievements: Achievement[] = [
  // Learning achievements
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "\u{1F476}",
    category: "learning",
    condition: { type: "lessons_completed", threshold: 1 },
    xpBonus: 10,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Complete 5 lessons",
    icon: "\u{1F4DA}",
    category: "learning",
    condition: { type: "lessons_completed", threshold: 5 },
    xpBonus: 25,
  },
  {
    id: "dedicated-learner",
    title: "Dedicated Learner",
    description: "Complete 25 lessons",
    icon: "\u{1F4D6}",
    category: "learning",
    condition: { type: "lessons_completed", threshold: 25 },
    xpBonus: 100,
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 50 lessons",
    icon: "\u{1F9E0}",
    category: "learning",
    condition: { type: "lessons_completed", threshold: 50 },
    xpBonus: 250,
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Complete 100 lessons",
    icon: "\u{1F393}",
    category: "learning",
    condition: { type: "lessons_completed", threshold: 100 },
    xpBonus: 500,
  },

  // Exploration achievements
  {
    id: "course-starter",
    title: "Course Starter",
    description: "Start your first course",
    icon: "\u{1F680}",
    category: "exploration",
    condition: { type: "courses_started", threshold: 1 },
    xpBonus: 10,
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Start 3 different courses",
    icon: "\u{1F30D}",
    category: "exploration",
    condition: { type: "courses_started", threshold: 3 },
    xpBonus: 50,
  },
  {
    id: "renaissance-mind",
    title: "Renaissance Mind",
    description: "Start all available courses",
    icon: "\u{1F3A8}",
    category: "exploration",
    condition: { type: "courses_started", threshold: -1 },
    xpBonus: 200,
  },

  // Mastery achievements
  {
    id: "course-champion",
    title: "Course Champion",
    description: "Complete all lessons in a course",
    icon: "\u{1F3C6}",
    category: "mastery",
    condition: { type: "courses_completed", threshold: 1 },
    xpBonus: 150,
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Get perfect scores on 10 lessons",
    icon: "\u{1F4AF}",
    category: "mastery",
    condition: { type: "perfect_scores", threshold: 10 },
    xpBonus: 100,
  },
  {
    id: "xp-collector",
    title: "XP Collector",
    description: "Earn 500 total XP",
    icon: "\u{2B50}",
    category: "mastery",
    condition: { type: "xp_earned", threshold: 500 },
    xpBonus: 50,
  },
  {
    id: "xp-master",
    title: "XP Master",
    description: "Earn 2000 total XP",
    icon: "\u{1F31F}",
    category: "mastery",
    condition: { type: "xp_earned", threshold: 2000 },
    xpBonus: 150,
  },

  // Streak achievements
  {
    id: "streak-starter",
    title: "Streak Starter",
    description: "Maintain a 3-day streak",
    icon: "\u{1F525}",
    category: "streak",
    condition: { type: "streak_days", threshold: 3 },
    xpBonus: 25,
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "\u{26A1}",
    category: "streak",
    condition: { type: "streak_days", threshold: 7 },
    xpBonus: 75,
  },
  {
    id: "monthly-master",
    title: "Monthly Master",
    description: "Maintain a 30-day streak",
    icon: "\u{1F451}",
    category: "streak",
    condition: { type: "streak_days", threshold: 30 },
    xpBonus: 300,
  },
];

function getCompletedCoursesCount(progress: UserProgress): number {
  let count = 0;
  const courseIds = Object.keys(courses);

  for (const courseId of courseIds) {
    const lessonIds = getAllLessonIds(courseId);
    if (lessonIds.length === 0) continue;

    const allCompleted = lessonIds.every(
      (id) => progress.lessonsCompleted[id]?.completed
    );
    if (allCompleted) count++;
  }

  return count;
}

function getPerfectScoresCount(progress: UserProgress): number {
  return Object.values(progress.lessonsCompleted).filter(
    (lp) => lp.completed && lp.score === 100
  ).length;
}

export function checkAchievements(
  progress: UserProgress,
  totalCourses: number
): Achievement[] {
  const lessonsCount = Object.keys(progress.lessonsCompleted).filter(
    (id) => progress.lessonsCompleted[id]?.completed
  ).length;
  const coursesStarted = progress.coursesEnrolled.length;
  const coursesCompleted = getCompletedCoursesCount(progress);
  const longestStreak = progress.streak.longest;
  const currentStreak = progress.streak.current;
  const bestStreak = Math.max(longestStreak, currentStreak);
  const totalXp = progress.xp;
  const perfectScores = getPerfectScoresCount(progress);

  return achievements.filter((achievement) => {
    const { type, threshold } = achievement.condition;

    switch (type) {
      case "lessons_completed":
        return lessonsCount >= threshold;
      case "courses_completed":
        return coursesCompleted >= threshold;
      case "streak_days":
        return bestStreak >= threshold;
      case "xp_earned":
        return totalXp >= threshold;
      case "perfect_scores":
        return perfectScores >= threshold;
      case "courses_started":
        // Special case: -1 means "all courses"
        if (threshold === -1) return coursesStarted >= totalCourses;
        return coursesStarted >= threshold;
      default:
        return false;
    }
  });
}
