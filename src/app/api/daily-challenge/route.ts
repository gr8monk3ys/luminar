import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { dailyChallengeCompletions, users } from "@/lib/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { getTodayChallenge, getChallengeStreak } from "@/lib/daily-challenges";
import { eq, and, desc } from "drizzle-orm";

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

  const challenge = getTodayChallenge();
  const userId = await getAuthUserId();
  const today = new Date().toISOString().split("T")[0];

  let completedToday = false;
  let challengeStreak = 0;

  if (userId && isDbConfigured()) {
    const database = db()!;

    // Check if already completed today
    const [existing] = await database
      .select()
      .from(dailyChallengeCompletions)
      .where(
        and(
          eq(dailyChallengeCompletions.userId, userId),
          eq(dailyChallengeCompletions.completedDate, today)
        )
      );
    completedToday = !!existing;

    // Get recent completions for streak
    const recentCompletions = await database
      .select()
      .from(dailyChallengeCompletions)
      .where(eq(dailyChallengeCompletions.userId, userId))
      .orderBy(desc(dailyChallengeCompletions.completedDate))
      .limit(60);

    challengeStreak = getChallengeStreak(recentCompletions);
  }

  return NextResponse.json(
    {
      challenge,
      completedToday,
      challengeStreak,
    },
    {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    }
  );
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
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503, headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  }

  const body = await request.json();
  const { challengeId, correct } = body;
  const today = new Date().toISOString().split("T")[0];
  const challenge = getTodayChallenge();
  const xpEarned = correct ? challenge.xpReward : 0;

  const database = db()!;

  // Insert completion (unique per user per day)
  await database
    .insert(dailyChallengeCompletions)
    .values({
      userId,
      challengeId,
      completedDate: today,
      correct: !!correct,
      xpEarned,
    })
    .onConflictDoNothing();

  // Award XP if correct
  if (correct && xpEarned > 0) {
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (user) {
      const newXp = user.xp + xpEarned;
      const XP_PER_LEVEL = [0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000];
      let newLevel = 1;
      for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
        if (newXp >= XP_PER_LEVEL[i]) {
          newLevel = i + 1;
          break;
        }
      }
      await database
        .update(users)
        .set({ xp: newXp, level: newLevel, updatedAt: new Date() })
        .where(eq(users.id, userId));
    }
  }

  return NextResponse.json(
    {
      success: true,
      xpEarned,
      correct,
    },
    {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    }
  );
}
