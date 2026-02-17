import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { cached } from "@/lib/redis";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { desc } from "drizzle-orm";

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

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503, headers: { "X-RateLimit-Remaining": String(remaining) } });
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

  return NextResponse.json(leaderboard, {
    headers: { "X-RateLimit-Remaining": String(remaining) },
  });
}
