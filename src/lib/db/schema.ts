import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streakCurrent: integer("streak_current").notNull().default(0),
  streakLongest: integer("streak_longest").notNull().default(0),
  streakFreezes: integer("streak_freezes").notNull().default(1),
  lastActivityDate: text("last_activity_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const courseEnrollments = pgTable(
  "course_enrollments",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    enrolledAt: timestamp("enrolled_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("enrollment_unique").on(table.userId, table.courseId),
  ]
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    courseId: text("course_id").notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at"),
    score: real("score").notNull().default(0),
    xpEarned: integer("xp_earned").notNull().default(0),
    answers: jsonb("answers").$type<Record<string, unknown>>().default({}),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("lesson_progress_unique").on(table.userId, table.lessonId),
  ]
);

export const reviewCards = pgTable(
  "review_cards",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    courseId: text("course_id").notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    // SM-2 algorithm fields
    easeFactor: real("ease_factor").notNull().default(2.5),
    interval: integer("interval").notNull().default(1), // days
    repetitions: integer("repetitions").notNull().default(0),
    nextReviewAt: timestamp("next_review_at").notNull().defaultNow(),
    lastReviewedAt: timestamp("last_reviewed_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("review_card_unique").on(
      table.userId,
      table.lessonId,
      table.question
    ),
  ]
);

// Types inferred from schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type LessonProgressRow = typeof lessonProgress.$inferSelect;
export type ReviewCard = typeof reviewCards.$inferSelect;
export type NewReviewCard = typeof reviewCards.$inferInsert;
