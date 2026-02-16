import type { CourseMetadata, LearningPath } from "@/types/content";

export const courses: Record<string, CourseMetadata> = {
  "calculus-fundamentals": {
    id: "calculus-fundamentals",
    title: "Calculus Fundamentals",
    description:
      "Build intuition for derivatives, integrals, and the fundamental theorem of calculus through interactive visualizations and problem-solving.",
    category: "math",
    difficulty: 3,
    estimatedHours: 12,
    prerequisites: ["algebra"],
    icon: "∫",
    color: "#6366f1",
    chapters: [
      {
        id: "limits-continuity",
        title: "Limits & Continuity",
        description: "Understanding the foundation of calculus",
        lessons: [
          {
            id: "what-is-a-limit",
            title: "What Is a Limit?",
            description:
              "Develop intuition for limits through visual exploration of function behavior.",
            estimatedMinutes: 10,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["limits", "function-behavior"],
            xpReward: 25,
          },
          {
            id: "computing-limits",
            title: "Computing Limits",
            description:
              "Learn algebraic techniques for evaluating limits.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["limits", "algebraic-manipulation"],
            xpReward: 30,
          },
          {
            id: "continuity",
            title: "Continuity",
            description:
              "Understand what makes a function continuous and identify discontinuities.",
            estimatedMinutes: 10,
            difficulty: 3,
            bloomLevel: "analyze",
            concepts: ["continuity", "discontinuities"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "derivatives",
        title: "Derivatives",
        description: "The rate of change and its applications",
        lessons: [
          {
            id: "derivative-intuition",
            title: "The Derivative: A Visual Introduction",
            description:
              "See how the derivative captures the rate of change through tangent lines and slopes.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["derivatives", "tangent-lines", "rate-of-change"],
            xpReward: 30,
          },
          {
            id: "differentiation-rules",
            title: "Differentiation Rules",
            description:
              "Master the power rule, product rule, quotient rule, and chain rule.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: [
              "power-rule",
              "product-rule",
              "quotient-rule",
              "chain-rule",
            ],
            xpReward: 35,
          },
          {
            id: "applications-of-derivatives",
            title: "Applications of Derivatives",
            description:
              "Use derivatives to find maxima, minima, and analyze function behavior.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["optimization", "critical-points", "curve-sketching"],
            xpReward: 40,
          },
        ],
      },
      {
        id: "integrals",
        title: "Integrals",
        description: "Accumulation and the area under curves",
        lessons: [
          {
            id: "integral-intuition",
            title: "The Integral: Area Under the Curve",
            description:
              "Develop intuition for integration through Riemann sums and area approximation.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["integrals", "riemann-sums", "area"],
            xpReward: 30,
          },
          {
            id: "fundamental-theorem",
            title: "The Fundamental Theorem of Calculus",
            description:
              "Discover the deep connection between derivatives and integrals.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: [
              "fundamental-theorem",
              "antiderivatives",
              "definite-integrals",
            ],
            xpReward: 40,
          },
        ],
      },
    ],
  },
  "linear-algebra-ml": {
    id: "linear-algebra-ml",
    title: "Linear Algebra for ML",
    description:
      "Master the linear algebra concepts that power machine learning — vectors, matrices, transformations, and eigenvalues — with code examples.",
    category: "math",
    difficulty: 3,
    estimatedHours: 15,
    prerequisites: [],
    icon: "M",
    color: "#8b5cf6",
    chapters: [
      {
        id: "vectors-spaces",
        title: "Vectors & Vector Spaces",
        description: "The building blocks of linear algebra",
        lessons: [
          {
            id: "what-are-vectors",
            title: "What Are Vectors?",
            description:
              "Understand vectors as both geometric arrows and ordered lists of numbers.",
            estimatedMinutes: 10,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["vectors", "vector-operations"],
            xpReward: 25,
          },
          {
            id: "dot-product",
            title: "The Dot Product",
            description:
              "Explore the dot product geometrically and algebraically, and see why it matters for ML.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["dot-product", "angle-between-vectors", "projection"],
            xpReward: 30,
          },
          {
            id: "linear-combinations",
            title: "Linear Combinations & Span",
            description:
              "Understand how vectors combine to form spaces.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["linear-combinations", "span", "basis"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "matrices-transformations",
        title: "Matrices & Transformations",
        description: "How matrices encode linear transformations",
        lessons: [
          {
            id: "matrix-as-transformation",
            title: "Matrices as Transformations",
            description:
              "See how matrices rotate, scale, and shear space — the geometric view that makes everything click.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: [
              "matrices",
              "linear-transformations",
              "rotation",
              "scaling",
            ],
            xpReward: 30,
          },
          {
            id: "matrix-multiplication",
            title: "Matrix Multiplication",
            description:
              "Understand matrix multiplication as composition of transformations.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: [
              "matrix-multiplication",
              "composition",
              "associativity",
            ],
            xpReward: 35,
          },
        ],
      },
      {
        id: "eigenvalues",
        title: "Eigenvalues & Eigenvectors",
        description: "The spectral heart of linear algebra",
        lessons: [
          {
            id: "eigen-intuition",
            title: "Eigenvalues & Eigenvectors: Intuition",
            description:
              "Discover eigenvectors — the directions that don't change under a transformation.",
            estimatedMinutes: 12,
            difficulty: 4,
            bloomLevel: "understand",
            concepts: ["eigenvalues", "eigenvectors", "characteristic-equation"],
            xpReward: 35,
          },
          {
            id: "pca-connection",
            title: "From Eigen to PCA",
            description:
              "See how eigendecomposition powers Principal Component Analysis in data science.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: ["pca", "dimensionality-reduction", "covariance-matrix"],
            xpReward: 40,
          },
        ],
      },
    ],
  },
  "python-algorithms": {
    id: "python-algorithms",
    title: "Algorithms in Python",
    description:
      "Learn fundamental algorithms through interactive coding exercises — sorting, searching, graphs, and dynamic programming.",
    category: "cs",
    difficulty: 3,
    estimatedHours: 14,
    prerequisites: [],
    icon: "{ }",
    color: "#10b981",
    chapters: [
      {
        id: "sorting",
        title: "Sorting Algorithms",
        description: "Understanding how and why we sort",
        lessons: [
          {
            id: "intro-to-sorting",
            title: "Why Sorting Matters",
            description:
              "Explore why sorting is fundamental to computer science and everyday computing.",
            estimatedMinutes: 8,
            difficulty: 1,
            bloomLevel: "understand",
            concepts: ["sorting", "algorithm-analysis"],
            xpReward: 20,
          },
          {
            id: "bubble-sort",
            title: "Bubble Sort",
            description:
              "Implement and analyze the simplest sorting algorithm.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["bubble-sort", "time-complexity", "comparisons"],
            xpReward: 25,
          },
          {
            id: "merge-sort",
            title: "Merge Sort",
            description:
              "Discover divide-and-conquer through merge sort — an efficient O(n log n) algorithm.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: [
              "merge-sort",
              "divide-and-conquer",
              "recursion",
            ],
            xpReward: 35,
          },
        ],
      },
      {
        id: "searching",
        title: "Searching Algorithms",
        description: "Finding needles in haystacks, efficiently",
        lessons: [
          {
            id: "binary-search",
            title: "Binary Search",
            description:
              "Master the most important searching algorithm in computer science.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["binary-search", "logarithmic-time"],
            xpReward: 30,
          },
          {
            id: "hash-tables",
            title: "Hash Tables",
            description:
              "Understand how hash tables achieve O(1) lookup and implement one from scratch.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["hash-tables", "hashing", "collision-resolution"],
            xpReward: 35,
          },
        ],
      },
    ],
  },
};

export const learningPaths: LearningPath[] = [
  {
    id: "math-foundations",
    title: "Math Foundations",
    description:
      "Build a strong mathematical foundation from calculus through linear algebra — essential for any technical career.",
    icon: "π",
    color: "#6366f1",
    courseIds: ["calculus-fundamentals", "linear-algebra-ml"],
  },
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    description:
      "Master the core algorithms and data structures that every developer needs to know.",
    icon: "λ",
    color: "#10b981",
    courseIds: ["python-algorithms"],
  },
];

export function getCourse(courseId: string): CourseMetadata | undefined {
  return courses[courseId];
}

export function getLesson(courseId: string, lessonId: string) {
  const course = courses[courseId];
  if (!course) return undefined;

  for (const chapter of course.chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { lesson, chapter, course };
    }
  }
  return undefined;
}

export function getNextLesson(
  courseId: string,
  currentLessonId: string
): { lessonId: string; chapterId: string } | null {
  const course = courses[courseId];
  if (!course) return null;

  const allLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ lessonId: l.id, chapterId: ch.id }))
  );

  const currentIndex = allLessons.findIndex(
    (l) => l.lessonId === currentLessonId
  );

  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return null;
  }

  return allLessons[currentIndex + 1];
}

export function getPreviousLesson(
  courseId: string,
  currentLessonId: string
): { lessonId: string; chapterId: string } | null {
  const course = courses[courseId];
  if (!course) return null;

  const allLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ lessonId: l.id, chapterId: ch.id }))
  );

  const currentIndex = allLessons.findIndex(
    (l) => l.lessonId === currentLessonId
  );

  if (currentIndex <= 0) return null;

  return allLessons[currentIndex - 1];
}

export function getAllLessonIds(courseId: string): string[] {
  const course = courses[courseId];
  if (!course) return [];
  return course.chapters.flatMap((ch) => ch.lessons.map((l) => l.id));
}
