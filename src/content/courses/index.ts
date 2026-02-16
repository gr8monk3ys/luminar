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
          {
            id: "convergence-tests",
            title: "Convergence Tests",
            description:
              "Master the ratio test, comparison test, integral test, and more to determine if a series converges.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["ratio-test", "comparison-test", "integral-test", "alternating-series"],
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
          {
            id: "dp-knapsack",
            title: "The Knapsack Problem",
            description:
              "The classic DP optimization problem — maximize value within a weight constraint.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["knapsack", "dp-table", "optimization"],
            xpReward: 40,
          },
          {
            id: "dp-longest-common-subsequence",
            title: "Longest Common Subsequence",
            description:
              "Find the longest shared subsequence between two strings using a 2D DP table.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["lcs", "2d-dp", "string-algorithms"],
            xpReward: 40,
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
          {
            id: "binomial-distribution",
            title: "The Binomial Distribution",
            description:
              "Bernoulli trials, the binomial PMF, and the connection to the normal distribution.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["binomial-distribution", "bernoulli-trials", "pmf"],
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
          {
            id: "balanced-trees",
            title: "Balanced Trees (AVL Trees)",
            description:
              "Why balance matters, the AVL property, and rotations to maintain O(log n) height.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["avl-trees", "rotations", "balance-factor"],
            xpReward: 40,
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
          {
            id: "shortest-path-algorithms",
            title: "Shortest Path Algorithms",
            description:
              "Dijkstra's algorithm and Bellman-Ford for finding shortest paths in weighted graphs.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["dijkstra", "bellman-ford", "shortest-path", "weighted-graphs"],
            xpReward: 40,
          },
        ],
      },
    ],
  },
  "classical-mechanics": {
    id: "classical-mechanics",
    title: "Physics: Classical Mechanics",
    description:
      "From motion to momentum — build physical intuition through Newton's laws, energy conservation, and interactive problem-solving.",
    category: "science",
    difficulty: 3,
    estimatedHours: 18,
    prerequisites: ["calculus-fundamentals"],
    icon: "F",
    color: "#ef4444",
    chapters: [
      {
        id: "kinematics",
        title: "Kinematics",
        description: "Describing motion mathematically",
        lessons: [
          {
            id: "motion-in-one-dimension",
            title: "Motion in One Dimension",
            description:
              "Position, velocity, acceleration, and the kinematic equations for constant acceleration.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["displacement", "velocity", "acceleration", "kinematics"],
            xpReward: 25,
          },
          {
            id: "projectile-motion",
            title: "Projectile Motion",
            description:
              "Analyze trajectories by decomposing motion into independent horizontal and vertical components.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["projectile-motion", "parabolic-trajectory", "range-equation"],
            xpReward: 35,
          },
          {
            id: "relative-motion",
            title: "Relative Motion & Reference Frames",
            description:
              "Understand how motion looks different from different reference frames using Galilean velocity addition.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "analyze",
            concepts: ["relative-motion", "reference-frames", "galilean-transformation"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "forces-newtons-laws",
        title: "Forces & Newton's Laws",
        description: "The cause of motion and its mathematical description",
        lessons: [
          {
            id: "newtons-laws",
            title: "Newton's Laws of Motion",
            description:
              "The three laws that govern all classical motion — from inertia to action-reaction pairs.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["newtons-laws", "inertia", "force", "f-equals-ma"],
            xpReward: 35,
          },
          {
            id: "friction-and-forces",
            title: "Friction and Normal Forces",
            description:
              "Static and kinetic friction, free body diagrams, and inclined plane analysis.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["friction", "normal-force", "free-body-diagram", "inclined-plane"],
            xpReward: 35,
          },
          {
            id: "circular-motion",
            title: "Circular Motion",
            description:
              "Centripetal acceleration, centripetal force, and applications to banked curves and orbits.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["circular-motion", "centripetal-acceleration", "centripetal-force"],
            xpReward: 40,
          },
        ],
      },
      {
        id: "energy-momentum",
        title: "Energy & Momentum",
        description: "Conservation laws that simplify complex problems",
        lessons: [
          {
            id: "work-and-energy",
            title: "Work, Energy, and Conservation",
            description:
              "Work, kinetic energy, potential energy, and the conservation of mechanical energy.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["work", "kinetic-energy", "potential-energy", "conservation-of-energy"],
            xpReward: 40,
          },
          {
            id: "momentum-and-collisions",
            title: "Momentum and Collisions",
            description:
              "Linear momentum, impulse, and conservation of momentum in elastic and inelastic collisions.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: ["momentum", "impulse", "collisions", "conservation-of-momentum"],
            xpReward: 40,
          },
        ],
      },
    ],
  },
  "discrete-mathematics": {
    id: "discrete-mathematics",
    title: "Discrete Mathematics",
    description:
      "Logic, proofs, counting, and graph theory — the mathematical backbone of computer science and formal reasoning.",
    category: "math",
    difficulty: 3,
    estimatedHours: 16,
    prerequisites: [],
    icon: "∀",
    color: "#0ea5e9",
    chapters: [
      {
        id: "logic-proofs",
        title: "Logic & Proofs",
        description: "The language of mathematical reasoning",
        lessons: [
          {
            id: "propositional-logic",
            title: "Propositional Logic",
            description:
              "Propositions, logical connectives, truth tables, and logical equivalences.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["propositions", "connectives", "truth-tables", "equivalences"],
            xpReward: 25,
          },
          {
            id: "proof-techniques",
            title: "Proof Techniques",
            description:
              "Direct proof, contrapositive, contradiction, and proof by cases.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["direct-proof", "contrapositive", "contradiction", "proof-by-cases"],
            xpReward: 35,
          },
          {
            id: "mathematical-induction",
            title: "Mathematical Induction",
            description:
              "The domino principle — prove infinitely many statements with a base case and inductive step.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["induction", "base-case", "inductive-step", "strong-induction"],
            xpReward: 40,
          },
        ],
      },
      {
        id: "combinatorics",
        title: "Combinatorics",
        description: "The art and science of counting",
        lessons: [
          {
            id: "counting-principles",
            title: "Counting Principles",
            description:
              "Addition rule, multiplication rule, inclusion-exclusion, and complementary counting.",
            estimatedMinutes: 12,
            difficulty: 2,
            bloomLevel: "apply",
            concepts: ["sum-rule", "product-rule", "inclusion-exclusion"],
            xpReward: 30,
          },
          {
            id: "permutations-combinations",
            title: "Permutations & Combinations",
            description:
              "When order matters and when it doesn't — P(n,r), C(n,r), and Pascal's triangle.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["permutations", "combinations", "binomial-coefficients"],
            xpReward: 35,
          },
          {
            id: "pigeonhole-principle",
            title: "The Pigeonhole Principle",
            description:
              "A deceptively simple idea that proves surprisingly powerful results.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "analyze",
            concepts: ["pigeonhole-principle", "existence-proofs"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "graph-theory",
        title: "Graph Theory",
        description: "Structures that model relationships and connections",
        lessons: [
          {
            id: "graph-theory-fundamentals",
            title: "Graph Theory Fundamentals",
            description:
              "Vertices, edges, degree, Euler paths, and graph coloring — from Königsberg to the modern world.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "understand",
            concepts: ["graph-theory", "euler-paths", "graph-coloring", "handshaking-lemma"],
            xpReward: 35,
          },
          {
            id: "trees-and-spanning",
            title: "Trees and Spanning Trees",
            description:
              "Tree properties, minimum spanning trees, and Kruskal's algorithm.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["trees", "spanning-trees", "kruskals-algorithm"],
            xpReward: 35,
          },
        ],
      },
    ],
  },
  "ml-foundations": {
    id: "ml-foundations",
    title: "Machine Learning Foundations",
    description:
      "From linear regression to neural networks — understand the math and intuition behind machine learning algorithms.",
    category: "data-science",
    difficulty: 4,
    estimatedHours: 20,
    prerequisites: ["linear-algebra-ml", "calculus-fundamentals"],
    icon: "AI",
    color: "#a855f7",
    chapters: [
      {
        id: "ml-basics",
        title: "Foundations",
        description: "The core ideas behind learning from data",
        lessons: [
          {
            id: "what-is-ml",
            title: "What Is Machine Learning?",
            description:
              "Supervised, unsupervised, and reinforcement learning — the ML landscape and pipeline.",
            estimatedMinutes: 10,
            difficulty: 2,
            bloomLevel: "understand",
            concepts: ["supervised-learning", "unsupervised-learning", "ml-pipeline"],
            xpReward: 25,
          },
          {
            id: "linear-regression",
            title: "Linear Regression",
            description:
              "Fit a line to data using the mean squared error cost function and normal equations.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["linear-regression", "cost-function", "mse", "normal-equations"],
            xpReward: 35,
          },
          {
            id: "gradient-descent",
            title: "Gradient Descent",
            description:
              "The workhorse optimization algorithm — follow the slope downhill to minimize any cost function.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "apply",
            concepts: ["gradient-descent", "learning-rate", "optimization"],
            xpReward: 40,
          },
        ],
      },
      {
        id: "classification",
        title: "Classification",
        description: "Predicting categories from features",
        lessons: [
          {
            id: "logistic-regression",
            title: "Logistic Regression",
            description:
              "The sigmoid function, decision boundaries, and cross-entropy loss for binary classification.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["logistic-regression", "sigmoid", "cross-entropy", "decision-boundary"],
            xpReward: 35,
          },
          {
            id: "decision-trees",
            title: "Decision Trees",
            description:
              "Split data using information gain and Gini impurity to build interpretable classifiers.",
            estimatedMinutes: 15,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["decision-trees", "entropy", "information-gain", "gini-impurity"],
            xpReward: 35,
          },
          {
            id: "knn-algorithm",
            title: "K-Nearest Neighbors",
            description:
              "Classify by proximity — distance metrics, choosing k, and the curse of dimensionality.",
            estimatedMinutes: 12,
            difficulty: 3,
            bloomLevel: "apply",
            concepts: ["knn", "distance-metrics", "curse-of-dimensionality"],
            xpReward: 30,
          },
        ],
      },
      {
        id: "beyond-basics",
        title: "Beyond Basics",
        description: "Deeper concepts in machine learning",
        lessons: [
          {
            id: "neural-networks-intuition",
            title: "Neural Networks Intuition",
            description:
              "Perceptrons, multi-layer networks, activation functions, and the universal approximation theorem.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "understand",
            concepts: ["neural-networks", "perceptron", "activation-functions", "forward-pass"],
            xpReward: 40,
          },
          {
            id: "bias-variance-tradeoff",
            title: "The Bias-Variance Tradeoff",
            description:
              "Why models fail — underfitting, overfitting, regularization, and cross-validation.",
            estimatedMinutes: 15,
            difficulty: 4,
            bloomLevel: "analyze",
            concepts: ["bias-variance", "overfitting", "regularization", "cross-validation"],
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
      "Build a strong mathematical foundation from calculus through linear algebra, probability, and discrete math — essential for any technical career.",
    icon: "π",
    color: "#6366f1",
    courseIds: ["calculus-fundamentals", "linear-algebra-ml", "probability-statistics", "discrete-mathematics"],
  },
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    description:
      "Master the core algorithms, data structures, and discrete math that every developer needs to know.",
    icon: "λ",
    color: "#10b981",
    courseIds: ["python-algorithms", "data-structures", "discrete-mathematics"],
  },
  {
    id: "data-science-path",
    title: "Data Science & ML Track",
    description:
      "From linear algebra to statistics to machine learning — everything you need for a career in data science.",
    icon: "Σ",
    color: "#f59e0b",
    courseIds: ["linear-algebra-ml", "probability-statistics", "ml-foundations"],
  },
  {
    id: "stem-complete",
    title: "STEM Complete",
    description:
      "The full journey — math, physics, CS, and machine learning for a comprehensive STEM education.",
    icon: "★",
    color: "#ef4444",
    courseIds: ["calculus-fundamentals", "linear-algebra-ml", "classical-mechanics", "python-algorithms", "ml-foundations"],
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
