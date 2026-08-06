import type { ScoredChunk, TutorChunk } from "./types";

const BM25_K1 = 1.5;
const BM25_B = 0.75;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
}

function termFrequencies(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }
  return freq;
}

interface ScoredIndex {
  docFrequency: Map<string, Map<string, number>>;
  docLength: Map<string, number>;
  averageDocLength: number;
  termDocFrequency: Map<string, number>;
  documentCount: number;
}

function buildScoredIndex(chunks: TutorChunk[]): ScoredIndex {
  const docFrequency = new Map<string, Map<string, number>>();
  const docLength = new Map<string, number>();
  const termDocFrequency = new Map<string, number>();
  let totalLength = 0;

  for (const chunk of chunks) {
    const tokens = tokenize(chunk.text);
    const freq = termFrequencies(tokens);
    docFrequency.set(chunk.id, freq);
    docLength.set(chunk.id, tokens.length);
    totalLength += tokens.length;
    for (const term of freq.keys()) {
      termDocFrequency.set(term, (termDocFrequency.get(term) ?? 0) + 1);
    }
  }

  return {
    docFrequency,
    docLength,
    averageDocLength: chunks.length > 0 ? totalLength / chunks.length : 0,
    termDocFrequency,
    documentCount: chunks.length,
  };
}

/**
 * Deterministic lexical (BM25) search over the tutor content index. No
 * embeddings, no network calls, no model key — safe to run in CI and to use
 * as the grounding step before any generation call.
 */
export function searchIndex(
  chunks: TutorChunk[],
  query: string,
  k = 5
): ScoredChunk[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0 || chunks.length === 0) return [];

  const index = buildScoredIndex(chunks);
  const scored: ScoredChunk[] = [];

  for (const chunk of chunks) {
    const freq = index.docFrequency.get(chunk.id);
    if (!freq) continue;
    const length = index.docLength.get(chunk.id) ?? 0;
    let score = 0;

    for (const term of queryTerms) {
      const tf = freq.get(term);
      if (!tf) continue;
      const df = index.termDocFrequency.get(term) ?? 0;
      const idf = Math.log(
        1 + (index.documentCount - df + 0.5) / (df + 0.5)
      );
      const denominator =
        tf +
        BM25_K1 *
          (1 - BM25_B + (BM25_B * length) / (index.averageDocLength || 1));
      score += idf * ((tf * (BM25_K1 + 1)) / denominator);
    }

    if (score > 0) scored.push({ chunk, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, k);
}
