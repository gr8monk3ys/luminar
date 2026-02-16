import type { CourseMetadata, LearningPath } from "@/types/content";

export const courses: Record<string, CourseMetadata> = {
  "calculus-fundamentals": {
    id: "calculus-fundamentals",
    title: "Calculus Fundamentals",
    description:
      "Build intuition for derivatives, integrals, and the fundamental theorem of calculus through interactive visualizations and problem-solving.",
    category: "math",
    difficulty: 3,
    estimatedHours: 16,
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
            id: "squeeze-theorem",
            title: "The Squeeze Theorem",
            description:
              "Use bounding functions to prove tricky limits like sin(x)/x.",
            estimatedMinutes: 10,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["squeeze-theorem", "bounds", "limits"],
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
            id: "implicit-differentiation",
            title: "Implicit Differentiation",
            description:
              "Differentiate equations where y is defined implicitly, and solve related rates problems.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["implicit-differentiation", "related-rates"],
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
          {
            id: "integration-techniques",
            title: "Integration Techniques",
            description:
              "Master u-substitution and integration by parts to solve harder integrals.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["u-substitution", "integration-by-parts"],
            xpReward: 40,
          },
        ],
      },
      {
        id: "series",
        title: "Infinite Series",
        description: "Approximating functions with polynomials",
        lessons: [
          {
            id: "taylor-series",
            title: "Taylor & Maclaurin Series",
            description:
              "Approximate any function with an infinite polynomial and explore convergence.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: ["taylor-series", "maclaurin-series", "convergence"],
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
    estimatedHours: 18,
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
          {
            id: "determinants",
            title: "Determinants",
            description:
              "Learn what determinants measure geometrically and how to compute them.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["determinants", "area-scaling", "invertibility"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "systems",
        title: "Systems of Equations",
        description: "Solving linear systems with matrices",
        lessons: [
          {
            id: "systems-of-equations",
            title: "Solving Linear Systems",
            description:
              "Use Gaussian elimination and row reduction to solve Ax = b.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["gaussian-elimination", "row-reduction", "echelon-form"],
            xpReward: 35,
          },
        ],
      },
      {
        id: "eigenvalues",
        title: "Eigenvalues & Decompositions",
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
          {
            id: "svd-intuition",
            title: "Singular Value Decomposition",
            description:
              "Understand SVD as the ultimate matrix decomposition and its applications in data compression.",
            estimatedMinutes: 15,
            difficulty: 5,
            bloomLevel: "analyze",
            concepts: ["svd", "singular-values", "low-rank-approximation"],
            xpReward: 45,
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
    estimatedHours: 20,
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
            id: "selection-sort",
            title: "Selection Sort",
            description:
              "Find the minimum, swap it to the front, and analyze this intuitive O(n²) algorithm.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["selection-sort", "in-place-sorting"],
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
          {
            id: "quick-sort",
            title: "Quick Sort",
            description:
              "Master quicksort — the practical king of sorting with O(n log n) average performance.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["quick-sort", "partitioning", "pivot-selection"],
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
      {
        id: "graph-algorithms",
        title: "Graph Algorithms",
        description: "Traversing and searching graphs",
        lessons: [
          {
            id: "depth-first-search",
            title: "Depth-First Search",
            description:
              "Explore graphs by going deep — recursive and iterative DFS with applications.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["dfs", "recursion", "graph-traversal"],
            xpReward: 35,
          },
          {
            id: "breadth-first-search",
            title: "Breadth-First Search",
            description:
              "Find shortest paths in unweighted graphs with level-by-level exploration.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["bfs", "shortest-path", "queue"],
            xpReward: 35,
          },
        ],
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        description: "Solving problems by breaking them down",
        lessons: [
          {
            id: "dp-fibonacci",
            title: "DP: From Fibonacci to Optimization",
            description:
              "Learn the core idea of dynamic programming through the Fibonacci sequence and beyond.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["dynamic-programming", "memoization", "tabulation"],
            xpReward: 35,
          },
        ],
      },
    ],
  },
  "probability-statistics": {
    id: "probability-statistics",
    title: "Probability & Statistics",
    description:
      "From coin flips to hypothesis testing — build a solid foundation in probability theory and statistical inference.",
    category: "math",
    difficulty: 3,
    estimatedHours: 14,
    prerequisites: [],
    icon: "P",
    color: "#f59e0b",
    chapters: [
      {
        id: "foundations",
        title: "Probability Foundations",
        description: "The mathematics of uncertainty",
        lessons: [
          {
            id: "intro-to-probability",
            title: "What Is Probability?",
            description:
              "Sample spaces, events, and the fundamental counting formula.",
            estimatedMinutes: 10,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["probability", "sample-space", "events"],
            xpReward: 25,
          },
          {
            id: "conditional-probability",
            title: "Conditional Probability",
            description:
              "How knowing one event changes the probability of another.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["conditional-probability", "independence", "multiplication-rule"],
            xpReward: 30,
          },
          {
            id: "bayes-theorem",
            title: "Bayes' Theorem",
            description:
              "The most important formula for updating beliefs with evidence.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["bayes-theorem", "prior", "posterior", "likelihood"],
            xpReward: 35,
          },
        ],
      },
      {
        id: "distributions",
        title: "Random Variables & Distributions",
        description: "Modeling uncertainty mathematically",
        lessons: [
          {
            id: "random-variables",
            title: "Random Variables",
            description:
              "Discrete vs continuous random variables, PMF, PDF, and CDF.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["random-variables", "pmf", "pdf", "cdf"],
            xpReward: 30,
          },
          {
            id: "expected-value",
            title: "Expected Value & Variance",
            description:
              "The average outcome and how spread out values are.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["expected-value", "variance", "standard-deviation"],
            xpReward: 30,
          },
          {
            id: "normal-distribution",
            title: "The Normal Distribution",
            description:
              "The bell curve, z-scores, and the 68-95-99.7 rule.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["normal-distribution", "z-score", "standardization"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "inference",
        title: "Statistical Inference",
        description: "Drawing conclusions from data",
        lessons: [
          {
            id: "hypothesis-testing",
            title: "Hypothesis Testing",
            description:
              "Null hypotheses, p-values, significance levels, and Type I/II errors.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: ["hypothesis-testing", "p-value", "significance"],
            xpReward: 40,
          },
          {
            id: "confidence-intervals",
            title: "Confidence Intervals",
            description:
              "Estimating population parameters with precision and confidence.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["confidence-intervals", "margin-of-error", "sample-size"],
            xpReward: 40,
          },
        ],
      },
    ],
  },
  "data-structures": {
    id: "data-structures",
    title: "Data Structures",
    description:
      "Master the essential data structures — arrays, linked lists, trees, heaps, and graphs — with Python implementations.",
    category: "cs",
    difficulty: 3,
    estimatedHours: 16,
    prerequisites: [],
    icon: "DS",
    color: "#06b6d4",
    chapters: [
      {
        id: "linear-structures",
        title: "Linear Data Structures",
        description: "Sequential data organization",
        lessons: [
          {
            id: "arrays-and-lists",
            title: "Arrays & Dynamic Lists",
            description:
              "Contiguous memory, O(1) indexing, and how dynamic arrays grow.",
            estimatedMinutes: 10,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["arrays", "dynamic-arrays", "amortized-analysis"],
            xpReward: 25,
          },
          {
            id: "stacks-and-queues",
            title: "Stacks & Queues",
            description:
              "LIFO and FIFO structures — the workhorses of algorithms.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["stacks", "queues", "lifo", "fifo"],
            xpReward: 25,
          },
          {
            id: "linked-lists",
            title: "Linked Lists",
            description:
              "Pointer-based data structures with O(1) insertion at known positions.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["linked-lists", "nodes", "pointers"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "tree-structures",
        title: "Tree Structures",
        description: "Hierarchical data organization",
        lessons: [
          {
            id: "trees-and-bst",
            title: "Trees & Binary Search Trees",
            description:
              "Hierarchical data, the BST property, and O(log n) search.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["binary-trees", "bst", "tree-traversal"],
            xpReward: 35,
          },
          {
            id: "heaps",
            title: "Heaps & Priority Queues",
            description:
              "The heap property, heapify, and priority-based processing.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["heaps", "priority-queues", "heapify"],
            xpReward: 35,
          },
        ],
      },
      {
        id: "graph-structures",
        title: "Graph Structures",
        description: "Modeling connections and relationships",
        lessons: [
          {
            id: "graphs-intro",
            title: "Introduction to Graphs",
            description:
              "Vertices, edges, representations, and graph terminology.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["graphs", "adjacency-list", "adjacency-matrix"],
            xpReward: 25,
          },
          {
            id: "graph-traversal",
            title: "Graph Traversal: BFS & DFS",
            description:
              "Systematic exploration of graphs with queues and stacks.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["bfs", "dfs", "visited-set"],
            xpReward: 35,
          },
          {
            id: "dynamic-programming-intro",
            title: "Introduction to Dynamic Programming",
            description:
              "Solve complex problems by breaking them into overlapping subproblems.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["dynamic-programming", "memoization", "tabulation"],
            xpReward: 40,
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
      "Build a strong mathematical foundation from calculus through linear algebra and probability — essential for any technical career.",
    icon: "π",
    color: "#6366f1",
    courseIds: ["calculus-fundamentals", "linear-algebra-ml", "probability-statistics"],
  },
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    description:
      "Master the core algorithms and data structures that every developer needs to know.",
    icon: "λ",
    color: "#10b981",
    courseIds: ["python-algorithms", "data-structures"],
  },
  {
    id: "data-science-path",
    title: "Data Science Track",
    description:
      "From linear algebra to statistics — everything you need for a career in data science and machine learning.",
    icon: "Σ",
    color: "#f59e0b",
    courseIds: ["linear-algebra-ml", "probability-statistics"],
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
