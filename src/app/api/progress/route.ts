import { NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { users, lessonProgress, courseEnrollments } from "@/lib/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { cached, invalidate } from "@/lib/redis";
import { eq } from "drizzle-orm";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const data = await cached(`progress:${userId}`, async () => {
    const database = db()!;
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.id, userId));
    const lessons = await database
      .select()
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, userId));
    const enrollments = await database
      .select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.userId, userId));

    return {
      user: user || null,
      lessons,
      enrollments: enrollments.map((e) => e.courseId),
    };
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { action } = body;
  const database = db()!;

  if (action === "sync") {
    // Sync localStorage progress to DB (initial migration)
    const { progress } = body;
    if (!progress) {
      return NextResponse.json({ error: "Missing progress data" }, { status: 400 });
    }

    // Upsert user
    await database
      .insert(users)
      .values({
        id: userId,
        email: body.email || "",
        displayName: body.displayName || "Learner",
        xp: progress.xp || 0,
        level: progress.level || 1,
        streakCurrent: progress.streak?.current || 0,
        streakLongest: progress.streak?.longest || 0,
        streakFreezes: progress.streak?.streakFreezes ?? 1,
        lastActivityDate: progress.lastActivityDate || null,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          xp: progress.xp || 0,
          level: progress.level || 1,
          streakCurrent: progress.streak?.current || 0,
          streakLongest: progress.streak?.longest || 0,
          lastActivityDate: progress.lastActivityDate || null,
          updatedAt: new Date(),
        },
      });

    // Sync lesson progress
    const lessonsCompleted = progress.lessonsCompleted || {};
    for (const [lessonId, lp] of Object.entries(lessonsCompleted)) {
      const lesson = lp as { completed: boolean; completedAt?: string; score: number; xpEarned: number; answers: Record<string, unknown> };
      await database
        .insert(lessonProgress)
        .values({
          userId,
          lessonId,
          courseId: body.courseMapping?.[lessonId] || "",
          completed: lesson.completed,
          completedAt: lesson.completedAt ? new Date(lesson.completedAt) : null,
          score: lesson.score,
          xpEarned: lesson.xpEarned,
          answers: lesson.answers,
        })
        .onConflictDoUpdate({
          target: [lessonProgress.userId, lessonProgress.lessonId],
          set: {
            completed: lesson.completed,
            completedAt: lesson.completedAt ? new Date(lesson.completedAt) : null,
            score: lesson.score,
            xpEarned: lesson.xpEarned,
            answers: lesson.answers,
            updatedAt: new Date(),
          },
        });
    }

    // Sync enrollments
    const enrolled = progress.coursesEnrolled || [];
    for (const courseId of enrolled) {
      await database
        .insert(courseEnrollments)
        .values({ userId, courseId })
        .onConflictDoNothing();
    }

    await invalidate(`progress:${userId}`);
    return NextResponse.json({ success: true });
  }

  if (action === "complete-lesson") {
    const { lessonId, courseId, score, xpReward } = body;

    // Update lesson progress
    await database
      .insert(lessonProgress)
      .values({
        userId,
        lessonId,
        courseId,
        completed: true,
        completedAt: new Date(),
        score,
        xpEarned: xpReward,
      })
      .onConflictDoUpdate({
        target: [lessonProgress.userId, lessonProgress.lessonId],
        set: {
          completed: true,
          completedAt: new Date(),
          score,
          xpEarned: xpReward,
          updatedAt: new Date(),
        },
      });

    // Update user XP
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (user) {
      const newXp = user.xp + xpReward;
      const newLevel = getLevel(newXp);
      const today = new Date().toISOString().split("T")[0];

      await database
        .update(users)
        .set({
          xp: newXp,
          level: newLevel,
          lastActivityDate: today,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }

    await invalidate(`progress:${userId}`);
    await invalidate("leaderboard:*");
    return NextResponse.json({ success: true });
  }

  if (action === "enroll") {
    const { courseId } = body;
    await database
      .insert(courseEnrollments)
      .values({ userId, courseId })
      .onConflictDoNothing();

    await invalidate(`progress:${userId}`);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

const XP_PER_LEVEL = [0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000];

function getLevel(xp: number): number {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_PER_LEVEL[i]) return i + 1;
  }
  return 1;
}
