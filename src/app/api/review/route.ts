import { NextResponse } from "next/server";
import { db, isDbConfigured } from "@/lib/db";
import { reviewCards } from "@/lib/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { sm2 } from "@/lib/spaced-repetition";
import { lessonReviewCards } from "@/lib/spaced-repetition";
import { eq, and, lte } from "drizzle-orm";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
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

  return NextResponse.json({ cards: dueCards });
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

  if (action === "generate") {
    // Generate review cards for a completed lesson
    const { lessonId, courseId } = body;
    const cards = lessonReviewCards[lessonId];

    if (!cards || cards.length === 0) {
      return NextResponse.json({ generated: 0 });
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

    return NextResponse.json({ generated });
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
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
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

    return NextResponse.json({ success: true, nextReview: result.nextReviewAt });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
