export interface DailyChallenge {
  id: string;
  title: string;
  category: "math" | "cs" | "logic";
  difficulty: 1 | 2 | 3;
  question: string;
  options: { text: string; feedback: string }[];
  correctIndex: number;
  hint: string;
  explanation: string;
  xpReward: number;
}

const challengePool: DailyChallenge[] = [
  // ── Math: Calculus ──────────────────────────────────────────
  {
    id: "dc-derivative-sin",
    title: "Derivative of sin(x^2)",
    category: "math",
    difficulty: 2,
    question: "What is the derivative of f(x) = sin(x\u00B2)?",
    options: [
      { text: "cos(x\u00B2)", feedback: "You forgot to apply the chain rule to the inner function x\u00B2." },
      { text: "2x cos(x\u00B2)", feedback: "Correct! Chain rule gives cos(x\u00B2) \u00B7 2x." },
      { text: "2x sin(x\u00B2)", feedback: "The outer function sin should become cos after differentiation." },
      { text: "x\u00B2 cos(x\u00B2)", feedback: "The derivative of x\u00B2 is 2x, not x\u00B2." },
    ],
    correctIndex: 1,
    hint: "Apply the chain rule: d/dx[sin(u)] = cos(u) \u00B7 du/dx where u = x\u00B2.",
    explanation:
      "Using the chain rule, d/dx[sin(x\u00B2)] = cos(x\u00B2) \u00B7 d/dx[x\u00B2] = cos(x\u00B2) \u00B7 2x = 2x cos(x\u00B2).",
    xpReward: 20,
  },
  {
    id: "dc-integral-2x",
    title: "Basic Integration",
    category: "math",
    difficulty: 1,
    question: "What is \u222B 2x dx?",
    options: [
      { text: "x\u00B2 + C", feedback: "Correct! The power rule for integration gives x\u00B2 + C." },
      { text: "2x\u00B2 + C", feedback: "Don't forget to divide by the new exponent." },
      { text: "x\u00B2", feedback: "Close, but don't forget the constant of integration." },
      { text: "2 + C", feedback: "You need to apply the power rule, not just drop x." },
    ],
    correctIndex: 0,
    hint: "Use the power rule: \u222B x^n dx = x^(n+1)/(n+1) + C.",
    explanation:
      "\u222B 2x dx = 2 \u00B7 x\u00B2/2 + C = x\u00B2 + C. The 2 coefficient cancels with the 1/2 from integration.",
    xpReward: 15,
  },
  {
    id: "dc-limit-infinity",
    title: "Limit at Infinity",
    category: "math",
    difficulty: 2,
    question: "What is lim(x\u2192\u221E) (3x\u00B2 + 2x) / (x\u00B2 + 1)?",
    options: [
      { text: "0", feedback: "This would be the case if the numerator had a lower degree than the denominator." },
      { text: "1", feedback: "Check the leading coefficients of the highest-degree terms." },
      { text: "3", feedback: "Correct! Both are degree 2, so the limit equals 3/1 = 3." },
      { text: "\u221E", feedback: "Since both have the same degree, the limit is finite." },
    ],
    correctIndex: 2,
    hint: "When degrees are equal, the limit is the ratio of leading coefficients.",
    explanation:
      "Dividing numerator and denominator by x\u00B2: (3 + 2/x) / (1 + 1/x\u00B2). As x\u2192\u221E, this approaches 3/1 = 3.",
    xpReward: 20,
  },
  {
    id: "dc-ftc",
    title: "Fundamental Theorem of Calculus",
    category: "math",
    difficulty: 2,
    question: "If F(x) = \u222B\u2080\u02E3 t\u00B2 dt, what is F'(x)?",
    options: [
      { text: "x\u00B3/3", feedback: "That's F(x) itself, not its derivative." },
      { text: "x\u00B2", feedback: "Correct! By FTC Part 1, F'(x) = x\u00B2." },
      { text: "2x", feedback: "You differentiated x\u00B2 one more time than needed." },
      { text: "t\u00B2", feedback: "The result should be in terms of x, not t." },
    ],
    correctIndex: 1,
    hint: "The Fundamental Theorem of Calculus Part 1 says d/dx[\u222B\u2090\u02E3 f(t) dt] = f(x).",
    explanation:
      "By the Fundamental Theorem of Calculus Part 1, if F(x) = \u222B\u2080\u02E3 t\u00B2 dt, then F'(x) = x\u00B2. We simply substitute x for t in the integrand.",
    xpReward: 20,
  },
  {
    id: "dc-optimization",
    title: "Optimization Problem",
    category: "math",
    difficulty: 3,
    question:
      "A rectangular box with an open top has a volume of 32 cm\u00B3. The base is square. What base side length minimizes the surface area?",
    options: [
      { text: "2 cm", feedback: "Plugging in s=2: V = 2\u00B2 \u00B7 h = 32 gives h=8, SA = 4+64 = 68." },
      { text: "4 cm", feedback: "Correct! With s=4, h=2, SA = 16 + 32 = 48, which is the minimum." },
      { text: "8 cm", feedback: "That gives h=0.5, SA = 64 + 16 = 80, which is larger." },
      { text: "2\u221A2 cm", feedback: "Check the critical point calculation again." },
    ],
    correctIndex: 1,
    hint: "Write SA = s\u00B2 + 4sh with V = s\u00B2h = 32 to eliminate h, then take the derivative.",
    explanation:
      "V = s\u00B2h = 32, so h = 32/s\u00B2. SA = s\u00B2 + 4s(32/s\u00B2) = s\u00B2 + 128/s. dSA/ds = 2s - 128/s\u00B2 = 0 gives s\u00B3 = 64, so s = 4.",
    xpReward: 25,
  },

  // ── Math: Algebra & Linear Algebra ──────────────────────────
  {
    id: "dc-eigenvalue",
    title: "Finding Eigenvalues",
    category: "math",
    difficulty: 3,
    question:
      "What are the eigenvalues of the matrix [[3, 1], [0, 2]]?",
    options: [
      { text: "\u03BB = 3 and \u03BB = 2", feedback: "Correct! This upper triangular matrix has eigenvalues equal to its diagonal entries." },
      { text: "\u03BB = 1 and \u03BB = 6", feedback: "Check the characteristic equation det(A - \u03BBI) = 0." },
      { text: "\u03BB = 5 and \u03BB = 0", feedback: "The eigenvalues are the diagonal entries for triangular matrices." },
      { text: "\u03BB = 3 and \u03BB = 1", feedback: "The lower-right entry is 2, not 1." },
    ],
    correctIndex: 0,
    hint: "For a triangular matrix, the eigenvalues are the diagonal entries.",
    explanation:
      "det(A - \u03BBI) = (3-\u03BB)(2-\u03BB) - 0\u00B71 = (3-\u03BB)(2-\u03BB) = 0, giving \u03BB = 3 and \u03BB = 2. For any triangular matrix, eigenvalues are simply the diagonal entries.",
    xpReward: 25,
  },
  {
    id: "dc-determinant",
    title: "Matrix Determinant",
    category: "math",
    difficulty: 2,
    question: "What is the determinant of [[4, 3], [2, 1]]?",
    options: [
      { text: "10", feedback: "Check the formula: ad - bc." },
      { text: "-2", feedback: "Correct! det = 4\u00B71 - 3\u00B72 = 4 - 6 = -2." },
      { text: "2", feedback: "Watch the sign: ad - bc, not bc - ad." },
      { text: "-10", feedback: "The formula is ad - bc for a 2\u00D72 matrix." },
    ],
    correctIndex: 1,
    hint: "For a 2\u00D72 matrix [[a,b],[c,d]], det = ad - bc.",
    explanation:
      "det([[4,3],[2,1]]) = (4)(1) - (3)(2) = 4 - 6 = -2.",
    xpReward: 20,
  },
  {
    id: "dc-dot-product",
    title: "Dot Product",
    category: "math",
    difficulty: 1,
    question: "What is the dot product of vectors [1, 3, -2] and [4, -1, 5]?",
    options: [
      { text: "11", feedback: "Double-check each term: 1\u00B74 + 3\u00B7(-1) + (-2)\u00B75." },
      { text: "-9", feedback: "Correct! 4 + (-3) + (-10) = -9." },
      { text: "1", feedback: "Make sure to sum all three component products." },
      { text: "-11", feedback: "Recheck the arithmetic for each term." },
    ],
    correctIndex: 1,
    hint: "Multiply corresponding components and sum: a\u2081b\u2081 + a\u2082b\u2082 + a\u2083b\u2083.",
    explanation:
      "[1,3,-2] \u00B7 [4,-1,5] = (1)(4) + (3)(-1) + (-2)(5) = 4 - 3 - 10 = -9.",
    xpReward: 15,
  },
  {
    id: "dc-matrix-inverse",
    title: "Matrix Invertibility",
    category: "math",
    difficulty: 2,
    question: "Which of these matrices is NOT invertible?",
    options: [
      { text: "[[1, 2], [3, 4]]", feedback: "det = 4-6 = -2 \u2260 0, so this is invertible." },
      { text: "[[2, 4], [1, 2]]", feedback: "Correct! det = 4-4 = 0, so this matrix is singular." },
      { text: "[[1, 0], [0, 1]]", feedback: "This is the identity matrix; det = 1." },
      { text: "[[3, 1], [0, 2]]", feedback: "det = 6-0 = 6 \u2260 0, so this is invertible." },
    ],
    correctIndex: 1,
    hint: "A matrix is not invertible when its determinant is zero.",
    explanation:
      "det([[2,4],[1,2]]) = 2\u00B72 - 4\u00B71 = 0. A matrix with determinant 0 is singular (not invertible). Notice that row 1 is exactly 2\u00D7 row 2.",
    xpReward: 20,
  },
  {
    id: "dc-quadratic-roots",
    title: "Quadratic Equation",
    category: "math",
    difficulty: 1,
    question: "How many real roots does x\u00B2 + 4x + 5 = 0 have?",
    options: [
      { text: "Two distinct real roots", feedback: "Check the discriminant: b\u00B2 - 4ac." },
      { text: "One repeated real root", feedback: "That would require discriminant = 0." },
      { text: "No real roots", feedback: "Correct! Discriminant = 16 - 20 = -4 < 0." },
      { text: "Cannot be determined", feedback: "The discriminant always tells us the number of real roots." },
    ],
    correctIndex: 2,
    hint: "Calculate the discriminant: \u0394 = b\u00B2 - 4ac. If \u0394 < 0, there are no real roots.",
    explanation:
      "For x\u00B2 + 4x + 5: a=1, b=4, c=5. Discriminant = 16 - 20 = -4 < 0, so there are no real roots (two complex roots).",
    xpReward: 15,
  },

  // ── CS: Algorithms ──────────────────────────────────────────
  {
    id: "dc-binary-search-complexity",
    title: "Binary Search Complexity",
    category: "cs",
    difficulty: 1,
    question:
      "What is the worst-case time complexity of binary search on a sorted array of n elements?",
    options: [
      { text: "O(n)", feedback: "That's linear search. Binary search is faster." },
      { text: "O(log n)", feedback: "Correct! Each step halves the search space." },
      { text: "O(n log n)", feedback: "That's the complexity of efficient sorting, not searching." },
      { text: "O(1)", feedback: "Binary search doesn't always find the element immediately." },
    ],
    correctIndex: 1,
    hint: "How many times can you halve n before reaching 1?",
    explanation:
      "Binary search eliminates half the remaining elements each step. Starting with n elements, after k steps we have n/2^k elements. We stop when n/2^k = 1, so k = log\u2082(n). Hence O(log n).",
    xpReward: 15,
  },
  {
    id: "dc-merge-sort-space",
    title: "Merge Sort Space Complexity",
    category: "cs",
    difficulty: 2,
    question: "What is the space complexity of merge sort?",
    options: [
      { text: "O(1)", feedback: "Merge sort requires auxiliary space for merging." },
      { text: "O(log n)", feedback: "That's only the recursion stack depth; the merge step needs more." },
      { text: "O(n)", feedback: "Correct! Merge sort needs O(n) auxiliary space for the merge step." },
      { text: "O(n log n)", feedback: "The space for merging is reused at each level, so it's O(n) total." },
    ],
    correctIndex: 2,
    hint: "Consider the temporary array needed during the merge step.",
    explanation:
      "Merge sort needs O(n) auxiliary space for the temporary array used during merging. Although the recursion stack adds O(log n) space, the dominant term is O(n).",
    xpReward: 20,
  },
  {
    id: "dc-quicksort-worst",
    title: "QuickSort Worst Case",
    category: "cs",
    difficulty: 2,
    question: "When does quicksort have O(n\u00B2) worst-case performance?",
    options: [
      { text: "When the array is randomly shuffled", feedback: "Random data usually gives average-case O(n log n)." },
      { text: "When the pivot always divides the array in half", feedback: "That's the best case, giving O(n log n)." },
      { text: "When the pivot is always the smallest or largest element", feedback: "Correct! This creates maximally unbalanced partitions." },
      { text: "When all elements are unique", feedback: "Uniqueness doesn't determine the complexity." },
    ],
    correctIndex: 2,
    hint: "Think about what happens to the partition sizes when the pivot selection is poor.",
    explanation:
      "When the pivot is always the min or max, one partition has n-1 elements and the other has 0. This gives T(n) = T(n-1) + O(n), which solves to O(n\u00B2). This commonly happens with already-sorted arrays using first-element pivot.",
    xpReward: 20,
  },
  {
    id: "dc-hash-table-avg",
    title: "Hash Table Lookup",
    category: "cs",
    difficulty: 1,
    question: "What is the average-case time complexity for a hash table lookup?",
    options: [
      { text: "O(1)", feedback: "Correct! With a good hash function and low load factor, lookups are constant time." },
      { text: "O(log n)", feedback: "That's binary search tree lookup, not hash table." },
      { text: "O(n)", feedback: "That's the worst case with all collisions, not the average case." },
      { text: "O(n log n)", feedback: "Hash table lookup never takes this long." },
    ],
    correctIndex: 0,
    hint: "Hash functions map keys directly to array indices.",
    explanation:
      "A hash table computes an index from the key in O(1) time. With a good hash function and reasonable load factor, the expected number of collisions per bucket is constant, giving O(1) average lookup.",
    xpReward: 15,
  },
  {
    id: "dc-bfs-vs-dfs",
    title: "Shortest Path in Unweighted Graph",
    category: "cs",
    difficulty: 2,
    question: "Which algorithm finds the shortest path in an unweighted graph?",
    options: [
      { text: "Depth-First Search (DFS)", feedback: "DFS doesn't guarantee shortest paths; it explores one branch fully first." },
      { text: "Breadth-First Search (BFS)", feedback: "Correct! BFS explores all nodes at distance k before distance k+1." },
      { text: "Quicksort", feedback: "Quicksort is a sorting algorithm, not a graph algorithm." },
      { text: "Binary Search", feedback: "Binary search works on sorted arrays, not graphs." },
    ],
    correctIndex: 1,
    hint: "Which traversal visits nodes level by level?",
    explanation:
      "BFS explores all vertices at distance d from the source before exploring vertices at distance d+1. This guarantees that when a vertex is first discovered, it's via the shortest path.",
    xpReward: 20,
  },
  {
    id: "dc-stack-applications",
    title: "Stack Data Structure",
    category: "cs",
    difficulty: 1,
    question: "Which of the following is NOT a typical application of a stack?",
    options: [
      { text: "Function call management (call stack)", feedback: "The call stack is a classic stack application." },
      { text: "Undo/redo operations", feedback: "Undo uses a stack to reverse operations." },
      { text: "Scheduling tasks by priority", feedback: "Correct! Priority scheduling uses a priority queue (heap), not a stack." },
      { text: "Balanced parentheses checking", feedback: "Matching brackets is a textbook stack problem." },
    ],
    correctIndex: 2,
    hint: "Think about which application requires ordering by priority rather than LIFO order.",
    explanation:
      "A stack follows LIFO (Last In, First Out) order. Priority-based scheduling requires a priority queue or heap, where elements are dequeued by priority, not insertion order.",
    xpReward: 15,
  },
  {
    id: "dc-dp-knapsack",
    title: "Dynamic Programming Approach",
    category: "cs",
    difficulty: 3,
    question:
      "The 0/1 knapsack problem with n items and capacity W has what DP time complexity?",
    options: [
      { text: "O(n!)", feedback: "That's the brute-force approach trying all permutations." },
      { text: "O(2^n)", feedback: "That's the brute-force approach trying all subsets." },
      { text: "O(nW)", feedback: "Correct! The DP table has n rows and W columns." },
      { text: "O(n log n)", feedback: "There's no efficient greedy/sorting solution for 0/1 knapsack." },
    ],
    correctIndex: 2,
    hint: "The DP table is indexed by item count and remaining capacity.",
    explanation:
      "The DP solution builds a table of size n \u00D7 W, where each cell takes O(1) to compute. This gives O(nW) time. Note this is pseudo-polynomial since W is a value, not input size.",
    xpReward: 25,
  },
  {
    id: "dc-bst-operations",
    title: "BST Operations",
    category: "cs",
    difficulty: 2,
    question: "What is the average time complexity for search, insert, and delete in a balanced BST?",
    options: [
      { text: "O(1)", feedback: "BSTs require traversing from root to a leaf in the worst case." },
      { text: "O(log n)", feedback: "Correct! A balanced BST has height O(log n)." },
      { text: "O(n)", feedback: "That's the worst case for an unbalanced (degenerate) BST." },
      { text: "O(n log n)", feedback: "Individual operations don't take this long." },
    ],
    correctIndex: 1,
    hint: "The height of a balanced binary tree with n nodes is O(log n).",
    explanation:
      "In a balanced BST (like AVL or Red-Black tree), the height is O(log n). Search, insert, and delete all traverse at most one root-to-leaf path, so each takes O(log n).",
    xpReward: 20,
  },
  {
    id: "dc-graph-representation",
    title: "Graph Representation",
    category: "cs",
    difficulty: 2,
    question: "For a sparse graph (few edges), which representation is more space-efficient?",
    options: [
      { text: "Adjacency matrix", feedback: "An adjacency matrix uses O(V\u00B2) space regardless of edge count." },
      { text: "Adjacency list", feedback: "Correct! An adjacency list uses O(V + E) space, which is much less for sparse graphs." },
      { text: "They use the same space", feedback: "The matrix always uses V\u00B2 entries, the list only stores existing edges." },
      { text: "Edge list", feedback: "While space-efficient, edge lists have O(E) lookup time and aren't typically preferred." },
    ],
    correctIndex: 1,
    hint: "Compare O(V\u00B2) for the matrix vs O(V + E) for the list when E << V\u00B2.",
    explanation:
      "An adjacency list uses O(V + E) space. For a sparse graph where E is much less than V\u00B2, this is far more efficient than the O(V\u00B2) space of an adjacency matrix.",
    xpReward: 20,
  },
  {
    id: "dc-heap-extract",
    title: "Heap Operations",
    category: "cs",
    difficulty: 2,
    question: "After extracting the minimum from a min-heap, how is the heap property restored?",
    options: [
      { text: "Sort the entire array", feedback: "Sorting would take O(n log n), which defeats the purpose of a heap." },
      { text: "Replace root with last element and sift down", feedback: "Correct! Move last element to root and bubble it down by swapping with the smaller child." },
      { text: "Remove root and shift all elements left", feedback: "This would break the heap's tree structure." },
      { text: "Rebuild the entire heap from scratch", feedback: "That's O(n), but extract-min only needs O(log n)." },
    ],
    correctIndex: 1,
    hint: "The last element in the array takes the root's place, then it needs to find its correct position.",
    explanation:
      "After extracting the min, the last element replaces the root. Then we 'sift down' (heapify down): compare with children and swap with the smaller child, repeating until the heap property is restored. This takes O(log n).",
    xpReward: 20,
  },

  // ── Logic & Discrete Math ──────────────────────────────────
  {
    id: "dc-truth-table",
    title: "Logical Implication",
    category: "logic",
    difficulty: 1,
    question: 'When is the statement "P \u2192 Q" (if P then Q) FALSE?',
    options: [
      { text: "When P is true and Q is true", feedback: "True implies true is true." },
      { text: "When P is true and Q is false", feedback: "Correct! The only case where an implication is false." },
      { text: "When P is false and Q is true", feedback: "False implies anything is vacuously true." },
      { text: "When P is false and Q is false", feedback: "A false hypothesis makes the implication vacuously true." },
    ],
    correctIndex: 1,
    hint: "An implication is only false when the hypothesis is true but the conclusion fails.",
    explanation:
      "P \u2192 Q is false only when P is true and Q is false. In all other cases (including when P is false), the implication is true. This is because we can't break a promise we never made (vacuous truth).",
    xpReward: 15,
  },
  {
    id: "dc-set-operations",
    title: "Set Operations",
    category: "logic",
    difficulty: 1,
    question:
      "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is A \u2229 B (intersection)?",
    options: [
      { text: "{1, 2, 3, 4, 5, 6}", feedback: "That's the union A \u222A B." },
      { text: "{3, 4}", feedback: "Correct! The intersection contains elements in both sets." },
      { text: "{1, 2}", feedback: "That's the set difference A - B." },
      { text: "{5, 6}", feedback: "That's the set difference B - A." },
    ],
    correctIndex: 1,
    hint: "Intersection means elements that appear in BOTH sets.",
    explanation:
      "A \u2229 B contains all elements that are in both A and B. Checking each: 3 \u2208 A and 3 \u2208 B, 4 \u2208 A and 4 \u2208 B. So A \u2229 B = {3, 4}.",
    xpReward: 15,
  },
  {
    id: "dc-pigeonhole",
    title: "Pigeonhole Principle",
    category: "logic",
    difficulty: 2,
    question:
      "In a group of 13 people, at least how many must share the same birth month?",
    options: [
      { text: "1", feedback: "With 13 people and 12 months, at least one month has more than 1 person." },
      { text: "2", feedback: "Correct! By the pigeonhole principle: \u2308 13/12 \u2309 = 2." },
      { text: "3", feedback: "You'd need at least 25 people to guarantee 3 share a month." },
      { text: "13", feedback: "That would require all people to share the same month." },
    ],
    correctIndex: 1,
    hint: "If 13 pigeons go into 12 holes, at least one hole has at least \u230813/12\u2309 pigeons.",
    explanation:
      "By the pigeonhole principle, distributing 13 people among 12 months means at least one month must contain at least \u230813/12\u2309 = 2 people. If each month had at most 1, we'd have at most 12 people.",
    xpReward: 20,
  },
  {
    id: "dc-modular-arithmetic",
    title: "Modular Arithmetic",
    category: "logic",
    difficulty: 2,
    question: "What is 7^4 mod 10?",
    options: [
      { text: "1", feedback: "Correct! 7\u00B2 = 49 \u2261 9 (mod 10), 7\u2074 = 49\u00B2 = 2401 \u2261 1 (mod 10)." },
      { text: "7", feedback: "Check: 7\u00B2 = 49 \u2261 9, 7\u00B3 = 343 \u2261 3, 7\u2074 = 2401 \u2261 1." },
      { text: "3", feedback: "That's 7\u00B3 mod 10, not 7\u2074." },
      { text: "9", feedback: "That's 7\u00B2 mod 10, not 7\u2074." },
    ],
    correctIndex: 0,
    hint: "Compute step by step: 7\u00B2 mod 10, then square that result mod 10.",
    explanation:
      "7\u00B2 = 49, so 49 mod 10 = 9. Then 7\u2074 = (7\u00B2)\u00B2 = 9\u00B2 = 81, and 81 mod 10 = 1. So 7\u2074 mod 10 = 1.",
    xpReward: 20,
  },
  {
    id: "dc-graph-coloring",
    title: "Graph Coloring",
    category: "logic",
    difficulty: 3,
    question:
      "What is the minimum number of colors needed to color the vertices of a complete graph K\u2084 so that no two adjacent vertices share a color?",
    options: [
      { text: "2", feedback: "K\u2084 is not bipartite (it has odd cycles), so 2 colors aren't enough." },
      { text: "3", feedback: "In K\u2084, every vertex is adjacent to every other, so 3 won't work." },
      { text: "4", feedback: "Correct! In K\u2084, all vertices are pairwise adjacent, requiring 4 colors." },
      { text: "5", feedback: "4 colors suffice since there are only 4 vertices." },
    ],
    correctIndex: 2,
    hint: "In a complete graph, every vertex is connected to every other vertex.",
    explanation:
      "K\u2084 has 4 vertices, each connected to all 3 others. Since every pair is adjacent, no two vertices can share a color. Therefore we need exactly 4 colors (the chromatic number equals the number of vertices).",
    xpReward: 25,
  },
  {
    id: "dc-demorgan",
    title: "De Morgan's Law",
    category: "logic",
    difficulty: 1,
    question: "Which is equivalent to \u00AC(P \u2227 Q)?",
    options: [
      { text: "\u00ACP \u2227 \u00ACQ", feedback: "That's the negation of a disjunction, not a conjunction." },
      { text: "\u00ACP \u2228 \u00ACQ", feedback: "Correct! De Morgan's Law: \u00AC(P \u2227 Q) \u2261 \u00ACP \u2228 \u00ACQ." },
      { text: "P \u2228 Q", feedback: "Negation flips both the operator and the operands." },
      { text: "\u00ACP \u2192 \u00ACQ", feedback: "Implication has different truth values than disjunction." },
    ],
    correctIndex: 1,
    hint: "De Morgan's Laws: \u00AC(P \u2227 Q) = \u00ACP \u2228 \u00ACQ and \u00AC(P \u2228 Q) = \u00ACP \u2227 \u00ACQ.",
    explanation:
      "De Morgan's Law states that the negation of a conjunction is the disjunction of the negations: \u00AC(P \u2227 Q) \u2261 \u00ACP \u2228 \u00ACQ. This can be verified with a truth table.",
    xpReward: 15,
  },
  {
    id: "dc-counting",
    title: "Combinatorics",
    category: "logic",
    difficulty: 2,
    question: "How many ways can you choose 3 items from a set of 7 (order doesn't matter)?",
    options: [
      { text: "21", feedback: "That's C(7,2), not C(7,3)." },
      { text: "35", feedback: "Correct! C(7,3) = 7!/(3!\u00B74!) = 35." },
      { text: "210", feedback: "That's P(7,3) = 7!/4! — you counted order, which we shouldn't." },
      { text: "343", feedback: "That's 7\u00B3, which counts with replacement and order." },
    ],
    correctIndex: 1,
    hint: "Use the binomial coefficient: C(n,k) = n! / (k!(n-k)!).",
    explanation:
      "C(7,3) = 7! / (3! \u00B7 4!) = (7 \u00B7 6 \u00B7 5) / (3 \u00B7 2 \u00B7 1) = 210/6 = 35.",
    xpReward: 20,
  },
  {
    id: "dc-induction-base",
    title: "Mathematical Induction",
    category: "logic",
    difficulty: 2,
    question:
      "In a proof by mathematical induction, what are the two required steps?",
    options: [
      { text: "Assume true, then show it's true for all n", feedback: "You can't just assume it's true; you need a concrete base case." },
      { text: "Base case and inductive step", feedback: "Correct! Prove P(1) and prove P(k) \u2192 P(k+1)." },
      { text: "Show P(1) and P(2), then generalize", feedback: "You need the general inductive step, not just two cases." },
      { text: "Direct proof and proof by contradiction", feedback: "These are separate proof techniques, not steps of induction." },
    ],
    correctIndex: 1,
    hint: "One step establishes the starting point, the other shows the 'domino effect'.",
    explanation:
      "Mathematical induction requires: (1) Base case: prove P(1) is true, and (2) Inductive step: prove that if P(k) is true for some arbitrary k, then P(k+1) must also be true. Together, these prove P(n) for all n \u2265 1.",
    xpReward: 20,
  },
  {
    id: "dc-big-o-comparison",
    title: "Asymptotic Analysis",
    category: "cs",
    difficulty: 2,
    question: "Which of the following grows fastest as n \u2192 \u221E?",
    options: [
      { text: "n\u00B2", feedback: "Polynomial growth is slower than exponential." },
      { text: "2^n", feedback: "Correct! Exponential growth dominates polynomial and logarithmic." },
      { text: "n log n", feedback: "This grows slower than n\u00B2." },
      { text: "n\u00B3", feedback: "Polynomial growth is always eventually dominated by exponential." },
    ],
    correctIndex: 1,
    hint: "Compare polynomial vs exponential growth rates.",
    explanation:
      "The growth hierarchy is: O(n log n) < O(n\u00B2) < O(n\u00B3) < O(2^n). Exponential functions like 2^n eventually grow faster than ANY polynomial n^k, no matter how large k is.",
    xpReward: 20,
  },
  {
    id: "dc-recurrence-relation",
    title: "Recurrence Relations",
    category: "cs",
    difficulty: 3,
    question: "What is the solution to T(n) = 2T(n/2) + n with T(1) = 1?",
    options: [
      { text: "O(n)", feedback: "The merge step adds O(n) at each level, and there are log n levels." },
      { text: "O(n log n)", feedback: "Correct! This is the merge sort recurrence." },
      { text: "O(n\u00B2)", feedback: "That would be T(n) = 2T(n/2) + n\u00B2 (by Master Theorem case 3)." },
      { text: "O(log n)", feedback: "The T(n/2) terms alone contribute more than O(log n)." },
    ],
    correctIndex: 1,
    hint: "Use the Master Theorem: T(n) = aT(n/b) + f(n) with a=2, b=2, f(n)=n.",
    explanation:
      "By the Master Theorem with a=2, b=2, f(n)=n: log_b(a) = log_2(2) = 1, and f(n) = \u0398(n^1). Since f(n) = \u0398(n^{log_b a}), we're in Case 2, giving T(n) = \u0398(n log n). This is the merge sort recurrence.",
    xpReward: 25,
  },
  {
    id: "dc-probability-dice",
    title: "Probability with Dice",
    category: "math",
    difficulty: 1,
    question: "What is the probability of rolling a sum of 7 with two fair six-sided dice?",
    options: [
      { text: "1/6", feedback: "Correct! There are 6 favorable outcomes out of 36 total: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)." },
      { text: "1/12", feedback: "Count the ways: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 ways out of 36." },
      { text: "7/36", feedback: "There are exactly 6 combinations, not 7." },
      { text: "1/36", feedback: "That's the probability of a specific combination like (1,1)." },
    ],
    correctIndex: 0,
    hint: "List all pairs (a,b) where a+b=7, then divide by 36 total outcomes.",
    explanation:
      "Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 outcomes. Total outcomes: 6\u00D76 = 36. Probability = 6/36 = 1/6. The sum of 7 is the most likely sum with two dice.",
    xpReward: 15,
  },
  {
    id: "dc-bayes-theorem",
    title: "Bayes' Theorem",
    category: "math",
    difficulty: 3,
    question:
      "A test for a disease is 99% accurate. The disease affects 1% of the population. If you test positive, what is the approximate probability you have the disease?",
    options: [
      { text: "99%", feedback: "This confuses P(positive|disease) with P(disease|positive)." },
      { text: "50%", feedback: "Correct! P(D|+) = (0.99 \u00B7 0.01) / (0.99 \u00B7 0.01 + 0.01 \u00B7 0.99) \u2248 50%." },
      { text: "1%", feedback: "The positive test result does update the probability significantly." },
      { text: "90%", feedback: "Apply Bayes' theorem with the base rate of 1%." },
    ],
    correctIndex: 1,
    hint: "Use Bayes' Theorem: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|\u00ACD)P(\u00ACD)].",
    explanation:
      "P(D|+) = (0.99)(0.01) / [(0.99)(0.01) + (0.01)(0.99)] = 0.0099 / 0.0198 = 50%. The low base rate (1%) means false positives are as numerous as true positives. This is the base rate fallacy.",
    xpReward: 25,
  },
  {
    id: "dc-linked-list-reversal",
    title: "Linked List Reversal",
    category: "cs",
    difficulty: 2,
    question: "What is the time and space complexity of reversing a singly linked list iteratively?",
    options: [
      { text: "Time O(n), Space O(n)", feedback: "Iterative reversal only needs a few pointers, not O(n) extra space." },
      { text: "Time O(n), Space O(1)", feedback: "Correct! We traverse once and use only constant extra pointers." },
      { text: "Time O(n\u00B2), Space O(1)", feedback: "Only one pass through the list is needed." },
      { text: "Time O(1), Space O(1)", feedback: "We must visit every node, so time is at least O(n)." },
    ],
    correctIndex: 1,
    hint: "How many times do you need to visit each node? How many extra variables do you need?",
    explanation:
      "Iterative reversal uses three pointers (prev, current, next), traversing the list once. This gives O(n) time and O(1) space. At each step, we reverse the current node's pointer and advance.",
    xpReward: 20,
  },
  {
    id: "dc-boolean-satisfiability",
    title: "Boolean Satisfiability",
    category: "logic",
    difficulty: 3,
    question: "Which assignment satisfies (P \u2228 \u00ACQ) \u2227 (\u00ACP \u2228 Q) \u2227 (P \u2228 Q)?",
    options: [
      { text: "P = true, Q = true", feedback: "Correct! (T \u2228 F) \u2227 (F \u2228 T) \u2227 (T \u2228 T) = T \u2227 T \u2227 T = T." },
      { text: "P = false, Q = false", feedback: "(F \u2228 T) \u2227 (T \u2228 F) \u2227 (F \u2228 F) = T \u2227 T \u2227 F = F." },
      { text: "P = true, Q = false", feedback: "(T \u2228 T) \u2227 (F \u2228 F) \u2227 (T \u2228 F) = T \u2227 F \u2227 T = F." },
      { text: "No assignment satisfies it", feedback: "Try P = true, Q = true and check each clause." },
    ],
    correctIndex: 0,
    hint: "Evaluate each clause for all four combinations of P and Q.",
    explanation:
      "With P=true, Q=true: (T \u2228 F)=T, (\u00ACT \u2228 T)=(F \u2228 T)=T, (T \u2228 T)=T. All three clauses are true, so the formula is satisfied.",
    xpReward: 25,
  },
];

// Simple seeded random for deterministic shuffling
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const random = seededRandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deterministically selects a challenge for a given date.
 * Uses a seeded shuffle based on year + cycle number so the order
 * differs each time the pool is exhausted, avoiding repetitive sequences.
 */
export function getChallengeForDate(date: Date): DailyChallenge {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Determine which cycle we're in and shuffle the pool for that cycle
  const cycleNumber = Math.floor(dayOfYear / challengePool.length);
  const dayInCycle = dayOfYear % challengePool.length;

  // Use year + cycle number as seed for shuffling
  const seed = year * 1000 + cycleNumber;
  const shuffled = shuffleWithSeed(challengePool, seed);

  return shuffled[dayInCycle];
}

/**
 * Returns today's challenge using the seeded-shuffle algorithm.
 */
export function getTodayChallenge(): DailyChallenge {
  return getChallengeForDate(new Date());
}

/**
 * Calculates a streak of consecutive days with correct completions,
 * counting backwards from today.
 */
export function getChallengeStreak(completions: { completedDate: string; correct: boolean }[]): number {
  if (completions.length === 0) return 0;

  const sorted = [...completions]
    .filter(c => c.correct)
    .sort((a, b) => b.completedDate.localeCompare(a.completedDate));

  if (sorted.length === 0) return 0;

  let streak = 0;
  const today = new Date().toISOString().split("T")[0];
  let expectedDate = today;

  for (const completion of sorted) {
    if (completion.completedDate === expectedDate) {
      streak++;
      // Go to previous day
      const d = new Date(expectedDate);
      d.setDate(d.getDate() - 1);
      expectedDate = d.toISOString().split("T")[0];
    } else if (completion.completedDate < expectedDate) {
      break;
    }
  }

  return streak;
}

/**
 * Returns the full pool of challenges (useful for testing or previews).
 */
export function getAllChallenges(): DailyChallenge[] {
  return [...challengePool];
}
