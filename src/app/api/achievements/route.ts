import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { userAchievements, users } from "@/lib/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { cached, invalidate } from "@/lib/redis";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { checkAchievements } from "@/lib/achievements";
import { eq } from "drizzle-orm";
import type { UserProgress } from "@/types/content";

export async function GET(request: NextRequest) {
  const { success, remaining, reset } = await rateLimit(getClientIp(request), {
    limit: 60,
  });
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(reset / 1000)),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  }

  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503, headers: { "X-RateLimit-Remaining": String(remaining) } });
  }

  const data = await cached(`achievements:${userId}`, async () => {
    const database = db()!;
    const earned = await database
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    return earned;
  });

  return NextResponse.json({ achievements: data }, {
    headers: { "X-RateLimit-Remaining": String(remaining) },
  });
}

export async function POST(request: NextRequest) {
  const { success, remaining, reset } = await rateLimit(getClientIp(request), {
    limit: 30,
  });
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(reset / 1000)),
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  }

  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503, headers: { "X-RateLimit-Remaining": String(remaining) } });
  }

  const body = await request.json();
  const { progress, totalCourses } = body as { progress: UserProgress; totalCourses: number };

  if (!progress) {
    return NextResponse.json({ error: "Missing progress data" }, { status: 400, headers: { "X-RateLimit-Remaining": String(remaining) } });
  }

  const database = db()!;

  // Get currently earned achievements from DB
  const existingAchievements = await database
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));
  const existingIds = new Set(existingAchievements.map((a) => a.achievementId));

  // Check which achievements the user qualifies for
  const qualifiedAchievements = checkAchievements(progress, totalCourses);

  // Find newly earned achievements
  const newAchievements = qualifiedAchievements.filter(
    (a) => !existingIds.has(a.id)
  );

  let totalXpAwarded = 0;

  // Insert new achievements
  for (const achievement of newAchievements) {
    await database
      .insert(userAchievements)
      .values({
        userId,
        achievementId: achievement.id,
        xpAwarded: achievement.xpBonus,
      })
      .onConflictDoNothing();
    totalXpAwarded += achievement.xpBonus;
  }

  // Award bonus XP to user
  if (totalXpAwarded > 0) {
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (user) {
      const newXp = user.xp + totalXpAwarded;
      // Recalculate level
      const XP_PER_LEVEL = [0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000];
      let newLevel = 1;
      for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
        if (newXp >= XP_PER_LEVEL[i]) { newLevel = i + 1; break; }
      }
      await database
        .update(users)
        .set({ xp: newXp, level: newLevel, updatedAt: new Date() })
        .where(eq(users.id, userId));
    }

    await invalidate(`progress:${userId}`);
    await invalidate("leaderboard:*");
  }

  await invalidate(`achievements:${userId}`);

  return NextResponse.json({
    newAchievements: newAchievements.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      icon: a.icon,
      xpBonus: a.xpBonus,
    })),
    totalXpAwarded,
  }, {
    headers: { "X-RateLimit-Remaining": String(remaining) },
  });
}
