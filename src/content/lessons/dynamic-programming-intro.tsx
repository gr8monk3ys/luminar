"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DynamicProgrammingIntro() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Dynamic Programming: Trading Memory for Speed</h2>
      <p>
        <strong>Dynamic programming (DP)</strong> is a technique for solving
        problems that can be broken into overlapping subproblems. The key
        insight: if you solve the same subproblem multiple times, store the
        result the first time and reuse it. This transforms exponential-time
        algorithms into polynomial-time ones.
      </p>
      <p>
        A problem is a good candidate for DP if it has two properties:
      </p>
      <ul>
        <li><strong>Overlapping subproblems:</strong> The same smaller problem is solved repeatedly.</li>
        <li><strong>Optimal substructure:</strong> The optimal solution contains optimal solutions to subproblems.</li>
      </ul>

      <h2>The Fibonacci Disaster</h2>
      <p>
        The Fibonacci sequence is the classic motivating example. A naive
        recursive implementation recomputes the same values exponentially
        many times:
      </p>
      <MathBlock
        latex="F(n) = F(n-1) + F(n-2) \qquad F(0) = 0, \; F(1) = 1"
        display
      />
      <p>
        Without memoization, computing F(n) takes O(2^n) time. The recursive
        call tree branches into two at every step, and the same values are
        computed over and over. F(40) requires over a billion operations.
      </p>
      <MathBlock
        latex="T(n) = T(n-1) + T(n-2) + O(1) \implies T(n) = O(2^n)"
        display
      />

      <h2>Exponential vs Linear Growth</h2>
      <p>
        The slider below shows how rapidly 2^n (naive recursion) grows compared
        to n (DP solution). Even at n = 30, the difference is staggering: about
        1 billion vs 30.
      </p>
      <SliderExploration
        title="Naive Fibonacci vs DP: Call Count"
        description="Adjust n to see how the naive recursive call count (approximately 2^n) compares to the DP solution (n steps)."
        parameters={[
          { name: "n", label: "Value of n", min: 1, max: 30, step: 1, default: 10 },
        ]}
        equation="2^(x)"
        xRange={[1, 30]}
        yRange={[0, 1200]}
      />

      <h2>Memoization (Top-Down DP)</h2>
      <p>
        <strong>Memoization</strong> is the top-down approach: write the
        recursive solution, then add a cache. Before computing a subproblem,
        check if the result is already cached. This converts the exponential
        Fibonacci into O(n) time and O(n) space.
      </p>
      <CodeEditor
        language="python"
        description="Compare naive recursion with memoization for Fibonacci."
        initialCode={`import time

# --- Naive recursive (exponential) ---
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# --- Memoized (top-down DP) ---
def fib_memo(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
    return cache[n]

# --- Tabulation (bottom-up DP) ---
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Time comparison
start = time.time()
print("fib_naive(30):", fib_naive(30))
print(f"  Time: {(time.time() - start) * 1000:.1f} ms")

start = time.time()
print("fib_memo(30):", fib_memo(30))
print(f"  Time: {(time.time() - start) * 1000:.4f} ms")

start = time.time()
print("fib_tab(30):", fib_tab(30))
print(f"  Time: {(time.time() - start) * 1000:.4f} ms")`}
      />

      <h2>Tabulation (Bottom-Up DP)</h2>
      <p>
        <strong>Tabulation</strong> is the bottom-up approach: solve the
        smallest subproblems first and build up to the answer. Instead of
        recursion, use a loop and a table (array). This avoids recursion
        overhead and stack overflow for large inputs.
      </p>
      <StepByStep
        title="Tabulation for F(6)"
        steps={[
          {
            title: "Initialize base cases",
            content: "dp[0] = 0, dp[1] = 1. These are given.",
          },
          {
            title: "Fill the table bottom-up",
            content:
              "dp[2] = dp[1] + dp[0] = 1. dp[3] = dp[2] + dp[1] = 2. dp[4] = dp[3] + dp[2] = 3. dp[5] = dp[4] + dp[3] = 5. dp[6] = dp[5] + dp[4] = 8.",
          },
          {
            title: "Return dp[6] = 8",
            content:
              "Each entry was computed exactly once, using previously computed values. Total: 5 additions, O(n) time.",
          },
        ]}
      />

      <InteractiveQuestion
        id="dp-q1"
        question="What is the key difference between memoization and tabulation?"
        options={[
          { text: "Memoization is top-down (recursive with cache); tabulation is bottom-up (iterative with table)", feedback: "Correct! Memoization starts from the big problem and caches subproblem results as needed. Tabulation starts from the smallest subproblems and builds up systematically. Both achieve the same time complexity, but tabulation avoids recursion overhead." },
          { text: "Memoization is faster than tabulation", feedback: "They have the same time complexity. Tabulation is often slightly faster in practice due to no recursion overhead." },
          { text: "Tabulation uses more memory", feedback: "Both use O(n) space for Fibonacci. Tabulation can sometimes be optimized to O(1) space (keeping only the last two values)." },
          { text: "Memoization only works for Fibonacci", feedback: "Memoization works for any problem with overlapping subproblems. It is a general technique." },
        ]}
        correctIndex={0}
        hint="One uses recursion, the other uses a loop. Both store previously computed results."
        explanation="Memoization (top-down) = recursion + cache. Tabulation (bottom-up) = iteration + table. They solve the same subproblems but in different order."
      />

      <h2>Classic DP: Climbing Stairs</h2>
      <p>
        You are climbing a staircase with n steps. Each time you can climb 1 or
        2 steps. How many distinct ways can you reach the top? This is secretly
        the Fibonacci sequence in disguise.
      </p>
      <MathBlock
        latex="\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2)"
        display
      />
      <p>
        To reach step n, you either came from step n-1 (one step) or step n-2
        (two steps). The number of ways to reach step n is the sum of ways to
        reach those two positions.
      </p>

      <CodeEditor
        language="python"
        description="Implement the climbing stairs problem using tabulation with O(1) space optimization."
        initialCode={`def climb_stairs(n):
    """Count distinct ways to climb n stairs (1 or 2 steps at a time)."""
    if n <= 2:
        return n

    # TODO: Use two variables (prev2, prev1) instead of a full array
    # Start with ways(1)=1, ways(2)=2
    # Build up to ways(n)
    pass

# Tests
for n in range(1, 11):
    print(f"stairs({n}) = {climb_stairs(n)}")
# Expected: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89`}
        solution={`def climb_stairs(n):
    """Count distinct ways to climb n stairs (1 or 2 steps at a time)."""
    if n <= 2:
        return n

    prev2 = 1  # ways(1)
    prev1 = 2  # ways(2)

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

# Tests
for n in range(1, 11):
    print(f"stairs({n}) = {climb_stairs(n)}")
# Output: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89`}
      />

      <InteractiveQuestion
        id="dp-q2"
        question="The climbing stairs solution uses O(1) space by keeping only the last two values. Why does this work?"
        options={[
          { text: "Each step only depends on the two previous values, so older values are no longer needed", feedback: "Correct! The recurrence ways(n) = ways(n-1) + ways(n-2) only looks back two steps. Once we have computed ways(k), we no longer need ways(k-2). This space optimization applies to any DP where the recurrence has bounded lookback." },
          { text: "We are using dynamic programming, which always uses O(1) space", feedback: "Many DP problems require the full table (e.g., 2D DP for knapsack). The O(1) optimization is specific to problems with bounded lookback." },
          { text: "Python automatically optimizes the memory", feedback: "This is an explicit algorithmic optimization, not a language feature." },
          { text: "The values are small enough to fit in two variables", feedback: "The values can be arbitrarily large. The key is the structure of the recurrence, not the size of values." },
        ]}
        correctIndex={0}
        hint="Look at the recurrence relation. How far back does it look?"
        explanation="When a recurrence depends on only the last k values, you can reduce space from O(n) to O(k) by maintaining a sliding window of k values. For Fibonacci-like recurrences, k = 2."
      />

      <h3>Challenge</h3>
      <p>
        Solve the coin change problem: given coins of denominations [1, 5, 10, 25],
        find the minimum number of coins needed to make a given amount.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`def min_coins(coins, amount):
    """Minimum coins to make amount. Return -1 if impossible."""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # base case: 0 coins for amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1

    return dp[amount] if dp[amount] != float('inf') else -1

coins = [1, 5, 10, 25]
print(min_coins(coins, 30))   # Output: 2  (25 + 5)
print(min_coins(coins, 63))   # Output: 6  (25 + 25 + 10 + 1 + 1 + 1)
print(min_coins(coins, 11))   # Output: 2  (10 + 1)`}
          description="Classic bottom-up DP: dp[i] = min coins to make amount i. For each amount, try every coin."
        />
      </RevealAnswer>
    </div>
  );
}
