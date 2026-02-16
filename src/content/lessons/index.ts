import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const lessonComponents: Record<string, ComponentType> = {
  // Calculus Fundamentals
  "what-is-a-limit": dynamic(() => import("./what-is-a-limit")),
  "computing-limits": dynamic(() => import("./computing-limits")),
  "continuity": dynamic(() => import("./continuity")),
  "derivative-intuition": dynamic(() => import("./derivative-intuition")),
  "differentiation-rules": dynamic(() => import("./differentiation-rules")),
  "applications-of-derivatives": dynamic(() => import("./applications-of-derivatives")),
  "integral-intuition": dynamic(() => import("./integral-intuition")),
  "fundamental-theorem": dynamic(() => import("./fundamental-theorem")),

  // Linear Algebra for ML
  "what-are-vectors": dynamic(() => import("./what-are-vectors")),
  "dot-product": dynamic(() => import("./dot-product")),
  "linear-combinations": dynamic(() => import("./linear-combinations")),
  "matrix-as-transformation": dynamic(() => import("./matrix-as-transformation")),
  "matrix-multiplication": dynamic(() => import("./matrix-multiplication")),
  "eigen-intuition": dynamic(() => import("./eigen-intuition")),
  "pca-connection": dynamic(() => import("./pca-connection")),

  // Algorithms in Python
  "intro-to-sorting": dynamic(() => import("./intro-to-sorting")),
  "bubble-sort": dynamic(() => import("./bubble-sort")),
  "merge-sort": dynamic(() => import("./merge-sort")),
  "binary-search": dynamic(() => import("./binary-search")),
  "hash-tables": dynamic(() => import("./hash-tables")),
};

export function getLessonComponent(lessonId: string): ComponentType | null {
  return lessonComponents[lessonId] || null;
}
