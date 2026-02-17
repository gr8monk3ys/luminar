import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { reviewCards } from "@/lib/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { sm2 } from "@/lib/spaced-repetition";
import { lessonReviewCards } from "@/lib/spaced-repetition";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/get-client-ip";
import { eq, and, lte } from "drizzle-orm";

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

  const database = db()!;

  // Get cards due for review
  const dueCards = await database
    .select()
    .from(reviewCards)
    .where(
      and(
        eq(reviewCards.userId, userId),
        lte(reviewCards.nextReviewAt, new Date())
      )
    )
    .limit(20);

  return NextResponse.json({ cards: dueCards }, {
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
  const { action } = body;
  const database = db()!;

  if (action === "generate") {
    // Generate review cards for a completed lesson
    const { lessonId, courseId } = body;
    const cards = lessonReviewCards[lessonId];

    if (!cards || cards.length === 0) {
      return NextResponse.json({ generated: 0 }, {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      });
    }

    let generated = 0;
    for (const card of cards) {
      try {
        await database
          .insert(reviewCards)
          .values({
            userId,
            lessonId,
            courseId,
            question: card.question,
            answer: card.answer,
          })
          .onConflictDoNothing();
        generated++;
      } catch {
        // Card already exists
      }
    }

    return NextResponse.json({ generated }, {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  }

  if (action === "review") {
    // Process a review response using SM-2
    const { cardId, quality } = body;

    const [card] = await database
      .select()
      .from(reviewCards)
      .where(
        and(eq(reviewCards.id, cardId), eq(reviewCards.userId, userId))
      );

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404, headers: { "X-RateLimit-Remaining": String(remaining) } });
    }

    const result = sm2(
      quality,
      card.easeFactor,
      card.interval,
      card.repetitions
    );

    await database
      .update(reviewCards)
      .set({
        easeFactor: result.easeFactor,
        interval: result.interval,
        repetitions: result.repetitions,
        nextReviewAt: result.nextReviewAt,
        lastReviewedAt: new Date(),
      })
      .where(eq(reviewCards.id, cardId));

    return NextResponse.json({ success: true, nextReview: result.nextReviewAt }, {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400, headers: { "X-RateLimit-Remaining": String(remaining) } });
}
