/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Quality ratings:
 *   0 - Complete blackout
 *   1 - Incorrect, but remembered upon seeing answer
 *   2 - Incorrect, but answer seemed easy to recall
 *   3 - Correct with serious difficulty
 *   4 - Correct with some hesitation
 *   5 - Perfect recall
 */

export interface SM2Result {
  easeFactor: number;
  interval: number; // days
  repetitions: number;
  nextReviewAt: Date;
}

export function sm2(
  quality: number,
  prevEaseFactor: number,
  prevInterval: number,
  prevRepetitions: number
): SM2Result {
  // Clamp quality to 0-5
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let easeFactor = prevEaseFactor;
  let interval: number;
  let repetitions: number;

  if (q < 3) {
    // Failed recall — reset
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall
    repetitions = prevRepetitions + 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(prevInterval * easeFactor);
    }
  }

  // Update ease factor
  easeFactor =
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

  // Minimum ease factor is 1.3
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);

  return { easeFactor, interval, repetitions, nextReviewAt };
}

/** Generate review cards from lesson concepts */
export interface LessonReviewCard {
  question: string;
  answer: string;
}

// Pre-defined review cards per lesson topic
export const lessonReviewCards: Record<string, LessonReviewCard[]> = {
  "what-is-a-limit": [
    { question: "What is the intuitive definition of a limit?", answer: "A limit describes the value a function approaches as its input approaches a particular point, even if the function is not defined at that point." },
    { question: "What does lim(x→a) f(x) = L mean?", answer: "As x gets arbitrarily close to a (but not equal to a), f(x) gets arbitrarily close to L." },
    { question: "Can a limit exist at a point where the function is undefined?", answer: "Yes. For example, lim(x→0) sin(x)/x = 1, even though sin(0)/0 is undefined." },
  ],
  "computing-limits": [
    { question: "What is the direct substitution property?", answer: "If f is continuous at a, then lim(x→a) f(x) = f(a)." },
    { question: "Name three techniques for evaluating limits.", answer: "Direct substitution, factoring and canceling, and L'Hopital's rule." },
    { question: "When do you use L'Hopital's rule?", answer: "When direct substitution gives an indeterminate form like 0/0 or infinity/infinity." },
  ],
  "continuity": [
    { question: "What are the three conditions for continuity at a point?", answer: "1) f(a) is defined, 2) lim(x→a) f(x) exists, 3) lim(x→a) f(x) = f(a)." },
    { question: "What is a removable discontinuity?", answer: "A point where the limit exists but either f(a) is undefined or f(a) doesn't equal the limit. It can be 'fixed' by redefining f(a)." },
    { question: "What does the Intermediate Value Theorem state?", answer: "If f is continuous on [a,b] and N is between f(a) and f(b), then there exists c in (a,b) such that f(c) = N." },
  ],
  "derivative-intuition": [
    { question: "What is the geometric interpretation of a derivative?", answer: "The derivative at a point is the slope of the tangent line to the curve at that point." },
    { question: "What is the limit definition of the derivative?", answer: "f'(x) = lim(h→0) [f(x+h) - f(x)] / h" },
    { question: "What does it mean if f'(a) = 0?", answer: "The tangent line at x = a is horizontal, indicating a potential local maximum, minimum, or inflection point." },
  ],
  "differentiation-rules": [
    { question: "What is the power rule?", answer: "d/dx[x^n] = n·x^(n-1)" },
    { question: "State the product rule.", answer: "d/dx[f·g] = f'·g + f·g'" },
    { question: "State the chain rule.", answer: "d/dx[f(g(x))] = f'(g(x))·g'(x)" },
  ],
  "applications-of-derivatives": [
    { question: "How do you find critical points?", answer: "Set f'(x) = 0 or find where f'(x) is undefined. Solutions are critical points." },
    { question: "What is the second derivative test?", answer: "If f'(c) = 0 and f''(c) > 0, then c is a local minimum. If f''(c) < 0, then c is a local maximum." },
    { question: "What does the first derivative tell you about a function?", answer: "Where f' > 0 the function is increasing; where f' < 0 it is decreasing." },
  ],
  "integral-intuition": [
    { question: "What is a Riemann sum?", answer: "An approximation of the area under a curve using the sum of areas of rectangles." },
    { question: "What does the definite integral ∫[a,b] f(x)dx represent geometrically?", answer: "The signed area between the curve f(x) and the x-axis from x = a to x = b." },
    { question: "How does increasing the number of rectangles affect a Riemann sum?", answer: "The approximation becomes more accurate, approaching the true area as n → infinity." },
  ],
  "fundamental-theorem": [
    { question: "State the Fundamental Theorem of Calculus (Part 1).", answer: "If F(x) = ∫[a,x] f(t)dt, then F'(x) = f(x). Differentiation undoes integration." },
    { question: "State the Fundamental Theorem of Calculus (Part 2).", answer: "∫[a,b] f(x)dx = F(b) - F(a), where F is any antiderivative of f." },
    { question: "What is an antiderivative?", answer: "A function F such that F'(x) = f(x). It reverses differentiation." },
  ],
  "what-are-vectors": [
    { question: "What is a vector?", answer: "A quantity with both magnitude and direction, represented as an ordered list of numbers." },
    { question: "How do you add two vectors?", answer: "Add corresponding components: [a,b] + [c,d] = [a+c, b+d]." },
    { question: "What is scalar multiplication of a vector?", answer: "Multiplying each component by the scalar: k·[a,b] = [ka, kb]." },
  ],
  "dot-product": [
    { question: "How do you compute the dot product?", answer: "a · b = a₁b₁ + a₂b₂ + ... + aₙbₙ (sum of component-wise products)." },
    { question: "What does a dot product of zero mean?", answer: "The two vectors are orthogonal (perpendicular) to each other." },
    { question: "What is the geometric formula for the dot product?", answer: "a · b = |a| |b| cos(θ), where θ is the angle between the vectors." },
  ],
  "linear-combinations": [
    { question: "What is a linear combination?", answer: "A sum of scalar multiples of vectors: c₁v₁ + c₂v₂ + ... + cₙvₙ." },
    { question: "What is the span of a set of vectors?", answer: "The set of all possible linear combinations of those vectors." },
    { question: "What is a basis?", answer: "A linearly independent set of vectors that spans the entire vector space." },
  ],
  "matrix-as-transformation": [
    { question: "How does a 2x2 matrix transform the plane?", answer: "It maps each point (x,y) to a new point by matrix-vector multiplication, potentially rotating, scaling, shearing, or reflecting." },
    { question: "What do the columns of a transformation matrix represent?", answer: "Where the standard basis vectors (e₁, e₂) end up after the transformation." },
    { question: "What matrix represents a 90° counterclockwise rotation?", answer: "[[0, -1], [1, 0]]" },
  ],
  "matrix-multiplication": [
    { question: "What does matrix multiplication represent geometrically?", answer: "Composition of linear transformations — applying one transformation after another." },
    { question: "Is matrix multiplication commutative?", answer: "No. In general, AB ≠ BA." },
    { question: "What are the dimensions of the product of an m×n and n×p matrix?", answer: "The result is an m×p matrix." },
  ],
  "eigen-intuition": [
    { question: "What is an eigenvector?", answer: "A non-zero vector v such that Av = λv — it only gets scaled (not rotated) by the transformation A." },
    { question: "What is an eigenvalue?", answer: "The scalar λ by which an eigenvector is scaled: Av = λv." },
    { question: "How do you find eigenvalues?", answer: "Solve det(A - λI) = 0, the characteristic equation." },
  ],
  "pca-connection": [
    { question: "What does PCA do?", answer: "Finds the directions (principal components) of maximum variance in the data and projects data onto them for dimensionality reduction." },
    { question: "How are eigenvectors used in PCA?", answer: "The eigenvectors of the covariance matrix are the principal components." },
    { question: "Why do we use the covariance matrix in PCA?", answer: "It captures how features vary together, and its eigenvectors point in directions of maximum data spread." },
  ],
  "intro-to-sorting": [
    { question: "Why is sorting important in computer science?", answer: "Sorting enables efficient searching (binary search), simplifies many algorithms, and is fundamental to data organization." },
    { question: "What is the best possible time complexity for comparison-based sorting?", answer: "O(n log n) — proven by information-theoretic lower bounds." },
    { question: "What does it mean for a sorting algorithm to be 'stable'?", answer: "Equal elements maintain their relative order from the original array." },
  ],
  "bubble-sort": [
    { question: "What is the time complexity of bubble sort?", answer: "O(n²) in the average and worst case, O(n) in the best case (already sorted)." },
    { question: "How does bubble sort work?", answer: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order." },
    { question: "Is bubble sort stable?", answer: "Yes, equal elements are never swapped, so their relative order is preserved." },
  ],
  "merge-sort": [
    { question: "What is the time complexity of merge sort?", answer: "O(n log n) in all cases (best, average, worst)." },
    { question: "What paradigm does merge sort use?", answer: "Divide and conquer: split the array in half, recursively sort each half, then merge." },
    { question: "What is the space complexity of merge sort?", answer: "O(n) — it requires additional space for the temporary merged arrays." },
  ],
  "binary-search": [
    { question: "What is the time complexity of binary search?", answer: "O(log n) — it halves the search space with each comparison." },
    { question: "What is the prerequisite for binary search?", answer: "The array must be sorted." },
    { question: "How does binary search work?", answer: "Compare the target with the middle element. If smaller, search left half; if larger, search right half. Repeat." },
  ],
  "hash-tables": [
    { question: "What is the average time complexity of hash table operations?", answer: "O(1) for insert, lookup, and delete." },
    { question: "What is a hash collision?", answer: "When two different keys map to the same index in the hash table." },
    { question: "Name two collision resolution strategies.", answer: "Chaining (linked lists at each bucket) and open addressing (probing for the next empty slot)." },
  ],

  // Probability & Statistics
  "intro-to-probability": [
    { question: "What is the formula for the probability of an event?", answer: "P(A) = |A| / |S|, where |A| is the number of favorable outcomes and |S| is the total number of outcomes in the sample space." },
    { question: "What is the complement rule?", answer: "P(A') = 1 - P(A). The probability of an event not occurring equals 1 minus the probability it occurs." },
  ],
  "conditional-probability": [
    { question: "What is the formula for conditional probability?", answer: "P(A|B) = P(A ∩ B) / P(B)." },
    { question: "When are two events independent?", answer: "When P(A|B) = P(A), or equivalently P(A ∩ B) = P(A) · P(B)." },
  ],
  "bayes-theorem": [
    { question: "State Bayes' theorem.", answer: "P(A|B) = P(B|A) · P(A) / P(B)." },
    { question: "What is a posterior probability?", answer: "The updated probability P(A|B) after observing evidence B." },
  ],
  "random-variables": [
    { question: "What is the difference between discrete and continuous random variables?", answer: "Discrete RVs take countable values; continuous RVs can take any value in an interval." },
    { question: "What is a CDF?", answer: "F(x) = P(X ≤ x), the probability that the random variable is at most x." },
  ],
  "expected-value": [
    { question: "What is the expected value of a discrete random variable?", answer: "E[X] = Σ x · P(X = x)." },
    { question: "What is linearity of expectation?", answer: "E[aX + bY] = aE[X] + bE[Y], regardless of independence." },
  ],
  "normal-distribution": [
    { question: "What is the 68-95-99.7 rule?", answer: "About 68% of data falls within 1σ of μ, 95% within 2σ, and 99.7% within 3σ." },
    { question: "What is a z-score?", answer: "z = (x - μ) / σ, measuring how many standard deviations a value is from the mean." },
  ],
  "hypothesis-testing": [
    { question: "What is a p-value?", answer: "The probability of observing results as extreme as the data, assuming H₀ is true." },
    { question: "What is a Type I error?", answer: "Rejecting H₀ when it is actually true (false positive)." },
  ],
  "confidence-intervals": [
    { question: "What is a confidence interval?", answer: "A range [L, U] likely to contain the true population parameter with a given confidence level." },
    { question: "How does sample size affect CI width?", answer: "Larger samples produce narrower intervals since the margin of error decreases with √n." },
  ],

  // Data Structures
  "arrays-and-lists": [
    { question: "What is array index access complexity?", answer: "O(1) — constant time via direct offset calculation." },
    { question: "What is amortized analysis for dynamic arrays?", answer: "Although resizing costs O(n), the average cost per insertion is O(1) amortized." },
  ],
  "stacks-and-queues": [
    { question: "What is LIFO?", answer: "Last In, First Out — the most recently added element is removed first (stack behavior)." },
    { question: "What is FIFO?", answer: "First In, First Out — the earliest added element is removed first (queue behavior)." },
  ],
  "linked-lists": [
    { question: "What is the advantage of linked lists over arrays?", answer: "O(1) insertion/deletion at a known position vs O(n) for arrays." },
    { question: "What is the disadvantage?", answer: "O(n) access time — must traverse from head, unlike O(1) array indexing." },
  ],
  "trees-and-bst": [
    { question: "What is the BST property?", answer: "For every node, left subtree values < node value < right subtree values." },
    { question: "What does in-order traversal of a BST produce?", answer: "Elements in sorted ascending order." },
  ],
  "heaps": [
    { question: "What is the min-heap property?", answer: "Every parent's value ≤ its children's values. The root is the minimum." },
    { question: "What is extract-min complexity?", answer: "O(log n) — remove root, replace with last, sift down." },
  ],
  "graphs-intro": [
    { question: "What are two graph representations?", answer: "Adjacency list (dictionary of neighbors) and adjacency matrix (2D array)." },
    { question: "What is vertex degree?", answer: "The number of edges connected to it." },
  ],
  "graph-traversal": [
    { question: "What data structure does BFS use?", answer: "A queue (FIFO) — processes nodes level by level." },
    { question: "Which traversal finds shortest paths in unweighted graphs?", answer: "BFS." },
  ],
  "dynamic-programming-intro": [
    { question: "What two properties does DP require?", answer: "Optimal substructure and overlapping subproblems." },
    { question: "What is memoization?", answer: "Top-down DP: solve recursively but cache results." },
  ],

  // Expanded Calculus
  "squeeze-theorem": [
    { question: "State the Squeeze Theorem.", answer: "If g(x) ≤ f(x) ≤ h(x) near a, and both limits equal L, then lim f(x) = L." },
  ],
  "implicit-differentiation": [
    { question: "When do you use implicit differentiation?", answer: "When y is defined implicitly by an equation, not explicitly as y = f(x)." },
  ],
  "integration-techniques": [
    { question: "What is u-substitution?", answer: "Substitute u = g(x), du = g'(x)dx to simplify the integral." },
    { question: "State integration by parts.", answer: "∫u dv = uv - ∫v du." },
  ],
  "taylor-series": [
    { question: "What is the Maclaurin series for e^x?", answer: "e^x = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + ..." },
  ],

  // Expanded Linear Algebra
  "determinants": [
    { question: "What does det(A) = 0 mean?", answer: "The matrix is singular (non-invertible), the transformation collapses dimensions." },
  ],
  "systems-of-equations": [
    { question: "What does Gaussian elimination do?", answer: "Row operations to reach echelon form, then back-substitution." },
  ],
  "svd-intuition": [
    { question: "What does SVD decompose a matrix into?", answer: "A = UΣVᵀ, where U and V are orthogonal and Σ is diagonal." },
  ],

  // Expanded Algorithms
  "selection-sort": [
    { question: "How does selection sort work?", answer: "Find minimum in unsorted portion, swap to front, repeat." },
    { question: "Time complexity?", answer: "O(n²) in all cases." },
  ],
  "quick-sort": [
    { question: "Average time complexity of quicksort?", answer: "O(n log n) with good pivot selection." },
    { question: "What causes worst case?", answer: "Always picking min/max as pivot → O(n²)." },
  ],
  "depth-first-search": [
    { question: "DFS time complexity?", answer: "O(V + E)." },
    { question: "Name a DFS application.", answer: "Topological sorting, cycle detection, connected components." },
  ],
  "breadth-first-search": [
    { question: "Why does BFS find shortest paths?", answer: "It processes all vertices at distance d before distance d+1." },
  ],
  "dp-fibonacci": [
    { question: "Why is naive recursive Fibonacci O(2ⁿ)?", answer: "Each call branches into two, creating exponential redundant computations." },
    { question: "How does memoization help?", answer: "Caches results so each subproblem is computed only once → O(n)." },
  ],
};
