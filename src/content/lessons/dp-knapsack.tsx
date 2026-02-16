"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DpKnapsack() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Knapsack Problem</h2>
      <p>
        You are a thief with a knapsack that can carry at most <em>W</em>{" "}
        kilograms. In front of you are <em>n</em> items, each with a weight
        and a value. Which items should you take to maximize total value
        without exceeding the weight limit?
      </p>
      <p>
        This is the <strong>0/1 Knapsack Problem</strong> &mdash;
        &ldquo;0/1&rdquo; because each item is either taken (1) or left
        behind (0). No partial items allowed. It is one of the most
        celebrated problems in computer science and combinatorial
        optimization, with applications ranging from resource allocation to
        portfolio selection to cargo loading.
      </p>

      <h2>Problem Formulation</h2>
      <p>
        Given n items with weights w<sub>1</sub>, w<sub>2</sub>, ...,
        w<sub>n</sub> and values v<sub>1</sub>, v<sub>2</sub>, ...,
        v<sub>n</sub>, and a knapsack capacity W:
      </p>
      <MathBlock
        latex="\text{maximize } \sum_{i=1}^{n} v_i \cdot x_i \quad \text{subject to } \sum_{i=1}^{n} w_i \cdot x_i \le W, \quad x_i \in \{0, 1\}"
        display
      />
      <p>
        A brute-force approach tries all 2<sup>n</sup> subsets &mdash;
        exponential and completely impractical for large n. Dynamic
        programming reduces this to O(nW) by exploiting the{" "}
        <strong>optimal substructure</strong> of the problem.
      </p>

      <h2>The Key Insight: Optimal Substructure</h2>
      <p>
        Consider the last item (item n). Either we include it or we do not:
      </p>
      <ul>
        <li>
          <strong>Exclude item n:</strong> The optimal solution for n items
          and capacity W is the same as for n-1 items and capacity W.
        </li>
        <li>
          <strong>Include item n:</strong> We gain value v<sub>n</sub> but
          lose w<sub>n</sub> capacity. The remaining problem is n-1 items
          with capacity W - w<sub>n</sub>.
        </li>
      </ul>
      <p>We take the better of the two choices:</p>
      <MathBlock
        latex="dp[i][w] = \begin{cases} 0 & \text{if } i = 0 \text{ or } w = 0 \\ dp[i-1][w] & \text{if } w_i > w \\ \max(dp[i-1][w],\; v_i + dp[i-1][w - w_i]) & \text{otherwise} \end{cases}"
        display
      />
      <p>
        Here dp[i][w] is the maximum value achievable using items 1..i with
        capacity w. Each cell depends only on cells in the previous row,
        which means we can fill the table row by row.
      </p>

      <h2>Building the DP Table</h2>
      <StepByStep
        title="Solve: items = [(2, 3), (3, 4), (4, 5), (5, 6)], capacity W = 8"
        steps={[
          {
            title: "Set up the problem",
            content:
              "We have 4 items: Item 1 (weight=2, value=3), Item 2 (weight=3, value=4), Item 3 (weight=4, value=5), Item 4 (weight=5, value=6). Knapsack capacity W = 8. Create a table dp[0..4][0..8], initialized to 0 for row 0 and column 0.",
          },
          {
            title: "Fill row 1 (Item 1: w=2, v=3)",
            content:
              "For each capacity w from 1 to 8: if w >= 2, we can include Item 1 for value 3. dp[1][0..1] = 0, dp[1][2..8] = 3. At every capacity >= 2, taking Item 1 (value 3) beats taking nothing (value 0).",
          },
          {
            title: "Fill row 2 (Item 2: w=3, v=4)",
            content:
              "For w=0..2: cannot fit Item 2, so dp[2][w] = dp[1][w]. For w=3: max(dp[1][3], 4 + dp[1][0]) = max(3, 4) = 4. For w=4: max(dp[1][4], 4 + dp[1][1]) = max(3, 4) = 4. For w=5: max(dp[1][5], 4 + dp[1][2]) = max(3, 4+3) = 7. Items 1+2 fit together (weight 5) for value 7. For w=6..8: dp[2][w] = 7.",
          },
          {
            title: "Fill row 3 (Item 3: w=4, v=5)",
            content:
              "Key values: dp[3][4] = max(dp[2][4], 5 + dp[2][0]) = max(4, 5) = 5. dp[3][6] = max(dp[2][6], 5 + dp[2][2]) = max(7, 5+3) = 8. dp[3][7] = max(dp[2][7], 5 + dp[2][3]) = max(7, 5+4) = 9. dp[3][8] = max(7, 5+4) = 9.",
          },
          {
            title: "Fill row 4 (Item 4: w=5, v=6)",
            content:
              "dp[4][5] = max(dp[3][5], 6 + dp[3][0]) = max(7, 6) = 7. dp[4][7] = max(dp[3][7], 6 + dp[3][2]) = max(9, 6+3) = 9. dp[4][8] = max(dp[3][8], 6 + dp[3][3]) = max(9, 6+4) = 10.",
          },
          {
            title: "Read the answer",
            content:
              "dp[4][8] = 10. The maximum value is 10. We achieved this by taking Items 2, 3, and... let us trace back to find out which items.",
            latex: "\\text{Maximum value} = dp[4][8] = 10",
          },
        ]}
      />

      <h2>Reconstructing the Solution</h2>
      <p>
        The DP table tells us the maximum value, but not <em>which</em>{" "}
        items to take. To find the actual items, we <strong>backtrack</strong>{" "}
        through the table:
      </p>
      <ol>
        <li>
          Start at dp[n][W]. If dp[n][W] &ne; dp[n-1][W], item n was
          included. Move to dp[n-1][W - w<sub>n</sub>].
        </li>
        <li>
          If dp[n][W] = dp[n-1][W], item n was not included. Move to
          dp[n-1][W].
        </li>
        <li>Repeat until you reach row 0.</li>
      </ol>
      <p>
        In our example: dp[4][8] = 10 &ne; dp[3][8] = 9, so Item 4
        (w=5, v=6) is included. Jump to dp[3][8-5] = dp[3][3] = 4.
        dp[3][3] = dp[2][3] = 4, so Item 3 is excluded. dp[2][3] = 4 &ne;
        dp[1][3] = 3, so Item 2 (w=3, v=4) is included. Jump to dp[1][0] =
        0. Done. Items taken: 2 and 4, with total weight 3+5 = 8 and value
        4+6 = 10.
      </p>

      <h2>Python Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement the 0/1 Knapsack with DP and backtracking to find which items are selected."
        initialCode={`def knapsack(weights, values, capacity):
    """
    Solve the 0/1 knapsack problem.
    Returns (max_value, list of selected item indices).
    """
    n = len(weights)
    # Create DP table: (n+1) rows x (capacity+1) columns
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Fill the table
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # TODO: If item i-1 fits (weights[i-1] <= w),
            # take the max of excluding or including it.
            # Otherwise, carry forward dp[i-1][w].
            pass

    # Backtrack to find selected items
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        # TODO: If dp[i][w] != dp[i-1][w], item i-1 was taken.
        # Add index i-1 to selected and reduce w.
        pass

    return dp[n][capacity], selected

# Test case
weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
capacity = 8
max_val, items = knapsack(weights, values, capacity)
print(f"Max value: {max_val}")
print(f"Items selected (0-indexed): {items}")
print(f"Total weight: {sum(weights[i] for i in items)}")`}
        solution={`def knapsack(weights, values, capacity):
    """
    Solve the 0/1 knapsack problem.
    Returns (max_value, list of selected item indices).
    """
    n = len(weights)
    # Create DP table: (n+1) rows x (capacity+1) columns
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Fill the table
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]
                )
            else:
                dp[i][w] = dp[i - 1][w]

    # Backtrack to find selected items
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected.append(i - 1)
            w -= weights[i - 1]

    selected.reverse()
    return dp[n][capacity], selected

# Test case
weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
capacity = 8
max_val, items = knapsack(weights, values, capacity)
print(f"Max value: {max_val}")
print(f"Items selected (0-indexed): {items}")
print(f"Total weight: {sum(weights[i] for i in items)}")
# Output:
# Max value: 10
# Items selected (0-indexed): [1, 3]
# Total weight: 8`}
      />

      <h2>Complexity Analysis</h2>
      <MathBlock
        latex="\text{Time: } O(nW) \qquad \text{Space: } O(nW)"
        display
      />
      <p>
        We fill an n &times; W table, and each cell takes O(1) work. This is
        called <strong>pseudo-polynomial</strong> time because it depends on
        the numeric value of W, not the number of bits to represent it. If W
        is astronomically large (say 10<sup>18</sup>), this approach is not
        practical. But for reasonable capacities, it is efficient.
      </p>
      <p>
        Space can be reduced to O(W) by observing that each row only depends
        on the previous row. We can use a single 1D array, filling it
        from right to left to avoid overwriting values we still need.
      </p>

      <h2>Variant: Unbounded Knapsack</h2>
      <RevealAnswer label="Show the unbounded knapsack variant">
        <p>
          In the <strong>unbounded knapsack</strong> (also called the
          complete knapsack), you can take unlimited copies of each item.
          The recurrence changes subtly: when including item i, you stay in
          row i (allowing item i again) instead of moving to row i-1:
        </p>
        <MathBlock
          latex="dp[i][w] = \max(dp[i-1][w],\; v_i + dp[\mathbf{i}][w - w_i])"
          display
        />
        <p>
          Notice the critical difference: <strong>dp[i]</strong> instead of
          dp[i-1] in the include case. This single change allows repeated
          selection. With a 1D array, you process capacities{" "}
          <em>left to right</em> (unlike the 0/1 version which goes right to
          left), because you want to use the already-updated values in the
          current row.
        </p>
        <CodeEditor
          language="python"
          description="Unbounded knapsack: process left-to-right with a 1D array."
          initialCode={`def unbounded_knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    return dp[capacity]

# Example: items with (weight, value) = (2,3), (3,4), (4,5), (5,6)
print(unbounded_knapsack([2, 3, 4, 5], [3, 4, 5, 6], 8))
# Output: 12 (take four copies of item 0: 4*3=12, weight 4*2=8)`}
        />
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="knapsack-q1"
        question="In the 0/1 knapsack DP, what does dp[i][w] represent?"
        options={[
          {
            text: "The weight of items 1..i selected with capacity w",
            feedback:
              "dp[i][w] tracks value, not weight. The weight constraint is enforced by the column index w.",
          },
          {
            text: "The maximum value achievable using items 1..i with capacity w",
            feedback:
              "Correct! dp[i][w] is the best total value you can get when you consider only the first i items and have w units of capacity available. Each cell encodes the solution to a subproblem.",
          },
          {
            text: "The number of ways to fill capacity w with items 1..i",
            feedback:
              "Counting combinations is a different DP problem (the coin change problem). Here we maximize value.",
          },
          {
            text: "Whether item i should be included when capacity is w",
            feedback:
              "dp[i][w] is a value, not a boolean. To find which items are included, you backtrack through the table.",
          },
        ]}
        correctIndex={1}
        hint="Each cell in the DP table answers the question: what is the best I can do with these items and this capacity?"
        explanation="dp[i][w] = maximum total value using a subset of items {1, 2, ..., i} such that the total weight does not exceed w. Building this table bottom-up from dp[0][*] = 0 gives us the final answer at dp[n][W]."
      />

      <InteractiveQuestion
        id="knapsack-q2"
        question="The 0/1 knapsack has time complexity O(nW). Why is this called pseudo-polynomial rather than truly polynomial?"
        options={[
          {
            text: "Because the algorithm uses recursion",
            feedback:
              "The bottom-up version is iterative. The term pseudo-polynomial refers to the input encoding, not the implementation style.",
          },
          {
            text: "Because W is a numeric value, and the input size to represent W is only log(W) bits",
            feedback:
              "Correct! The input size for W is log₂(W) bits. If we denote the input length as L = log₂(W), then O(nW) = O(n · 2^L), which is exponential in L. A truly polynomial algorithm would be polynomial in the input length, not the numeric value.",
          },
          {
            text: "Because it only works for integer weights",
            feedback:
              "Requiring integer weights is a limitation, but that is not what makes the complexity pseudo-polynomial. The key issue is how the complexity scales with the encoding of W.",
          },
          {
            text: "Because n and W might not be related",
            feedback:
              "Independence of n and W is not the issue. The problem is that W can be exponentially large relative to its binary representation.",
          },
        ]}
        correctIndex={1}
        hint="Consider: how many bits does it take to write down the number W? How does O(nW) relate to those bits?"
        explanation="W takes log₂(W) bits to represent. The runtime O(nW) is polynomial in the numeric value of W but exponential in the number of bits. This is why the knapsack problem is NP-hard despite having a 'polynomial-looking' DP solution — the DP is only efficient when W is not too large."
      />
    </div>
  );
}
