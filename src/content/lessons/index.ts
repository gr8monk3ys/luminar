import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const lessonComponents: Record<string, ComponentType> = {
  // Calculus Fundamentals
  "what-is-a-limit": dynamic(() => import("./what-is-a-limit")),
  "computing-limits": dynamic(() => import("./computing-limits")),
  "squeeze-theorem": dynamic(() => import("./squeeze-theorem")),
  "continuity": dynamic(() => import("./continuity")),
  "derivative-intuition": dynamic(() => import("./derivative-intuition")),
  "differentiation-rules": dynamic(() => import("./differentiation-rules")),
  "implicit-differentiation": dynamic(() => import("./implicit-differentiation")),
  "applications-of-derivatives": dynamic(() => import("./applications-of-derivatives")),
  "integral-intuition": dynamic(() => import("./integral-intuition")),
  "fundamental-theorem": dynamic(() => import("./fundamental-theorem")),
  "integration-techniques": dynamic(() => import("./integration-techniques")),
  "taylor-series": dynamic(() => import("./taylor-series")),

  // Linear Algebra for ML
  "what-are-vectors": dynamic(() => import("./what-are-vectors")),
  "dot-product": dynamic(() => import("./dot-product")),
  "linear-combinations": dynamic(() => import("./linear-combinations")),
  "matrix-as-transformation": dynamic(() => import("./matrix-as-transformation")),
  "matrix-multiplication": dynamic(() => import("./matrix-multiplication")),
  "determinants": dynamic(() => import("./determinants")),
  "systems-of-equations": dynamic(() => import("./systems-of-equations")),
  "eigen-intuition": dynamic(() => import("./eigen-intuition")),
  "pca-connection": dynamic(() => import("./pca-connection")),
  "svd-intuition": dynamic(() => import("./svd-intuition")),

  // Algorithms in Python
  "intro-to-sorting": dynamic(() => import("./intro-to-sorting")),
  "bubble-sort": dynamic(() => import("./bubble-sort")),
  "selection-sort": dynamic(() => import("./selection-sort")),
  "merge-sort": dynamic(() => import("./merge-sort")),
  "quick-sort": dynamic(() => import("./quick-sort")),
  "binary-search": dynamic(() => import("./binary-search")),
  "hash-tables": dynamic(() => import("./hash-tables")),
  "depth-first-search": dynamic(() => import("./depth-first-search")),
  "breadth-first-search": dynamic(() => import("./breadth-first-search")),
  "dp-fibonacci": dynamic(() => import("./dp-fibonacci")),

  // Probability & Statistics
  "intro-to-probability": dynamic(() => import("./intro-to-probability")),
  "conditional-probability": dynamic(() => import("./conditional-probability")),
  "bayes-theorem": dynamic(() => import("./bayes-theorem")),
  "random-variables": dynamic(() => import("./random-variables")),
  "expected-value": dynamic(() => import("./expected-value")),
  "normal-distribution": dynamic(() => import("./normal-distribution")),
  "hypothesis-testing": dynamic(() => import("./hypothesis-testing")),
  "confidence-intervals": dynamic(() => import("./confidence-intervals")),

  // Data Structures
  "arrays-and-lists": dynamic(() => import("./arrays-and-lists")),
  "stacks-and-queues": dynamic(() => import("./stacks-and-queues")),
  "linked-lists": dynamic(() => import("./linked-lists")),
  "trees-and-bst": dynamic(() => import("./trees-and-bst")),
  "heaps": dynamic(() => import("./heaps")),
  "graphs-intro": dynamic(() => import("./graphs-intro")),
  "graph-traversal": dynamic(() => import("./graph-traversal")),
  "dynamic-programming-intro": dynamic(() => import("./dynamic-programming-intro")),
};

export function getLessonComponent(lessonId: string): ComponentType | null {
  return lessonComponents[lessonId] || null;
}
