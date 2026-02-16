"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function DpFibonacci() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Dynamic Programming: From Exponential to Linear</h2>
      <p>
        <strong>Dynamic programming</strong> (DP) is one of the most powerful
        algorithmic techniques. The core idea is deceptively simple: if a
        problem has <strong>overlapping subproblems</strong> (the same
        subproblem is solved many times), store each result the first time and
        reuse it instead of recomputing. The Fibonacci sequence is the perfect
        introduction to this concept.
      </p>
      <MathBlock
        latex="F(n) = F(n-1) + F(n-2), \quad F(0) = 0, \quad F(1) = 1"
        display
      />
      <p>
        The sequence begins: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
      </p>

      <h2>The Naive Recursive Approach</h2>
      <p>
        The most natural implementation directly follows the recurrence.
        However, it is catastrophically inefficient:
      </p>
      <MathBlock latex="T(n) = T(n-1) + T(n-2) + O(1) \implies T(n) = O(2^n)" display />
      <p>
        The call tree branches exponentially because the same values are
        computed over and over. For example, computing F(5) computes F(3) twice,
        F(2) three times, and F(1) five times. By F(50), there are over a
        trillion redundant calls.
      </p>

      <StepByStep
        title="Visualizing the redundancy in fib(5)"
        steps={[
          {
            title: "Call tree root",
            content: "fib(5) calls fib(4) and fib(3).",
          },
          {
            title: "fib(4) branch",
            content: "fib(4) calls fib(3) and fib(2). Notice: fib(3) is already being computed in the other branch!",
          },
          {
            title: "Further duplication",
            content:
              "fib(3) calls fib(2) and fib(1). fib(2) calls fib(1) and fib(0). Each of these is computed multiple times across the tree.",
          },
          {
            title: "Count the calls",
            content:
              "Total calls for fib(5): fib(5)×1, fib(4)×1, fib(3)×2, fib(2)×3, fib(1)×5, fib(0)×3 = 15 total calls. For fib(50), this explodes to over 40 billion.",
          },
        ]}
      />

      <h2>Strategy 1: Memoization (Top-Down DP)</h2>
      <p>
        <strong>Memoization</strong> keeps the recursive structure but adds a
        cache. Before computing F(n), check if it is already in the cache. If
        so, return the cached value. Each subproblem is solved at most once:
      </p>
      <MathBlock latex="\text{Time: } O(n) \qquad \text{Space: } O(n)" display />

      <h2>Strategy 2: Tabulation (Bottom-Up DP)</h2>
      <p>
        <strong>Tabulation</strong> fills in a table from the base cases upward,
        iteratively. No recursion is needed &mdash; just a simple loop. This
        avoids the overhead of function calls and the risk of stack overflow:
      </p>
      <MathBlock latex="\text{Time: } O(n) \qquad \text{Space: } O(n)" display />

      <h2>Strategy 3: Space Optimization</h2>
      <p>
        Since F(n) only depends on F(n-1) and F(n-2), we only need two
        variables instead of an entire array:
      </p>
      <MathBlock latex="\text{Time: } O(n) \qquad \text{Space: } O(1)" display />

      <h2>Implementation: All Three Approaches</h2>
      <CodeEditor
        language="python"
        description="Implement Fibonacci using memoization, tabulation, and space-optimized approaches."
        initialCode={`# Approach 1: Memoization (top-down)
def fib_memo(n, cache=None):
    if cache is None:
        cache = {}
    if n <= 1:
        return n
    if n in cache:
        return cache[n]
    # TODO: Compute fib(n), store in cache, return it
    pass

# Approach 2: Tabulation (bottom-up)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    # TODO: Fill the table from 2 to n
    pass
    return dp[n]

# Approach 3: Space-optimized
def fib_opt(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    # TODO: Iterate from 2 to n, updating prev2 and prev1
    pass
    return prev1

# Test all three
for fn in [fib_memo, fib_tab, fib_opt]:
    print(fn(10), fn(30), fn(50))`}
        solution={`# Approach 1: Memoization (top-down)
def fib_memo(n, cache=None):
    if cache is None:
        cache = {}
    if n <= 1:
        return n
    if n in cache:
        return cache[n]
    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    return cache[n]

# Approach 2: Tabulation (bottom-up)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Approach 3: Space-optimized
def fib_opt(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

for fn in [fib_memo, fib_tab, fib_opt]:
    print(fn(10), fn(30), fn(50))
# Output: 55 832040 12586269025 (three times)`}
      />

      <h2>Explore: Exponential vs. Linear Growth</h2>
      <p>
        The slider shows how the number of operations grows with n. The naive
        recursive approach grows as 2&#8319; (the curve shoots up dramatically),
        while the DP approaches grow linearly. Even for modest n, the difference
        is astronomical.
      </p>
      <SliderExploration
        title="Naive Recursion Calls vs. DP Operations"
        description="Adjust n to compare the number of function calls in naive recursion (≈ 1.618ⁿ) versus DP (= n). By n = 40, naive recursion makes over a billion calls while DP uses just 40 steps."
        parameters={[
          { name: "n", label: "n", min: 1, max: 45, step: 1, default: 10 },
        ]}
        equation="1.618^n"
        xRange={[1, 45]}
        yRange={[0, 1000]}
      />

      <h2>The DP Recipe</h2>
      <p>
        The Fibonacci example illustrates the general DP approach:
      </p>
      <ol>
        <li><strong>Define subproblems:</strong> What is F(n) in terms of smaller inputs?</li>
        <li><strong>Write the recurrence:</strong> F(n) = F(n-1) + F(n-2).</li>
        <li><strong>Identify base cases:</strong> F(0) = 0, F(1) = 1.</li>
        <li><strong>Choose top-down or bottom-up:</strong> Memoization or tabulation.</li>
        <li><strong>Optimize space</strong> if only recent subproblems are needed.</li>
      </ol>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="dp-q1"
        question="Why is naive recursive Fibonacci O(2ⁿ)?"
        options={[
          { text: "Each call does O(n) work", feedback: "Each call does O(1) work (just an addition). The problem is the number of calls." },
          { text: "The same subproblems are computed exponentially many times", feedback: "Correct! Without caching, fib(n) spawns two recursive calls, each spawning two more, creating an exponentially branching tree. F(k) is computed roughly 1.618ⁿ⁻ᵏ times." },
          { text: "Fibonacci numbers themselves grow exponentially", feedback: "Fibonacci numbers do grow exponentially (≈ φⁿ), but that affects the size of the output, not the number of operations." },
          { text: "Recursion is always exponential", feedback: "Recursion with memoization is O(n). The problem is not recursion itself but redundant recomputation." },
        ]}
        correctIndex={1}
        hint="Draw the call tree for fib(6) and count how many times fib(3) appears."
        explanation="Without memoization, the call tree branches at every node. The total number of calls follows the same recurrence as Fibonacci itself, giving O(φⁿ) ≈ O(1.618ⁿ) calls."
      />

      <InteractiveQuestion
        id="dp-q2"
        question="The space-optimized Fibonacci uses O(1) space. Why can't we always reduce DP space to O(1)?"
        options={[
          { text: "We always can — just keep two variables", feedback: "Fibonacci only looks back 2 steps, but many DP problems depend on all previous subproblems (e.g., longest common subsequence needs an entire row)." },
          { text: "It only works when each state depends on a fixed number of previous states", feedback: "Correct! Fibonacci's F(n) depends only on F(n-1) and F(n-2), so we need just 2 variables. If a DP state depends on all previous states (or states in a 2D table), we cannot reduce to O(1)." },
          { text: "O(1) space is always slower", feedback: "The space-optimized version has the same O(n) time complexity. Reducing space does not increase time here." },
          { text: "Python does not support O(1) space", feedback: "This is a language-independent algorithmic property, not a Python limitation." },
        ]}
        correctIndex={1}
        hint="How many previous values does F(n) depend on? What if a DP problem needed ALL previous values?"
        explanation="Space optimization works when the recurrence has bounded lookback. F(n) = F(n-1) + F(n-2) looks back 2 steps → O(1) space. A problem looking back n steps needs O(n) space."
      />
    </div>
  );
}
