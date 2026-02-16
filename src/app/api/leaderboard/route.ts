import { NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { cached } from "@/lib/redis";
import { desc } from "drizzle-orm";

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const leaderboard = await cached(
    "leaderboard:top50",
    async () => {
      const database = db()!;
      const topUsers = await database
        .select({
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
          xp: users.xp,
          level: users.level,
          streakCurrent: users.streakCurrent,
        })
        .from(users)
        .orderBy(desc(users.xp))
        .limit(50);

      return topUsers;
    },
    600 // 10 minute cache
  );

  return NextResponse.json(leaderboard);
}
