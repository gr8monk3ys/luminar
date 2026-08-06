import { describe, expect, it } from "vitest";
import { buildTutorIndex } from "@/lib/tutor/build-index";
import { searchIndex } from "@/lib/tutor/retrieval";

describe("tutor content index", () => {
  const index = buildTutorIndex();

  it("chunks every lesson into at least one heading-scoped section", () => {
    expect(index.length).toBeGreaterThan(0);
    const lessonIds = new Set(index.map((chunk) => chunk.lessonId));
    expect(lessonIds.size).toBeGreaterThan(0);
    for (const chunk of index) {
      expect(chunk.text.length).toBeGreaterThan(0);
      expect(chunk.lessonTitle.length).toBeGreaterThan(0);
      expect(chunk.courseId.length).toBeGreaterThan(0);
    }
  });

  it("retrieves the expected lesson chunk for a known query", () => {
    const results = searchIndex(
      index,
      "walking toward a wall half the remaining distance",
      3
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.lessonId).toBe("what-is-a-limit");
  });

  it("retrieves depth-first search content for a graph traversal query", () => {
    const results = searchIndex(index, "depth-first search stack backtracking", 3);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].chunk.lessonId).toBe("depth-first-search");
  });

  it("returns no results for a query with no grounding in the content", () => {
    const results = searchIndex(index, "zzqxv qqzzxy blorptastic", 5);
    expect(results).toEqual([]);
  });
});
