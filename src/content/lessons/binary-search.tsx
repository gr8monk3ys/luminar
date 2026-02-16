"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BinarySearch() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Binary Search: The Power of Halving</h2>
      <p>
        Binary search is the most important searching algorithm in computer
        science. Given a <strong>sorted</strong> array, it finds any element in
        O(log n) time by repeatedly halving the search space. For a billion
        elements, that is about 30 comparisons instead of a billion. Let that
        sink in: a factor of 33 million improvement.
      </p>
      <MathBlock latex="\log_2(1{,}000{,}000{,}000) \approx 30" display />
      <p>
        Binary search is not just an algorithm &mdash; it is a way of thinking.
        The idea of &ldquo;eliminate half the possibilities with each step&rdquo;
        appears in debugging (git bisect), optimization (bisection method for
        root finding), and even everyday life (guessing a number between 1 and
        100).
      </p>

      <h2>The Algorithm</h2>
      <p>
        Maintain two pointers, <code>low</code> and <code>high</code>, defining
        the current search range. Check the middle element. If it is the
        target, we are done. If the target is smaller, search the left half.
        If larger, search the right half. Repeat until found or the range is
        empty.
      </p>

      <StepByStep
        title="Searching for 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]"
        steps={[
          {
            title: "Step 1: low=0, high=9, mid=4",
            content:
              "arr[4] = 16. Target 23 > 16, so search right half: set low = 5.",
          },
          {
            title: "Step 2: low=5, high=9, mid=7",
            content:
              "arr[7] = 56. Target 23 < 56, so search left half: set high = 6.",
          },
          {
            title: "Step 3: low=5, high=6, mid=5",
            content:
              "arr[5] = 23. Found! Return index 5. Only 3 comparisons for 10 elements.",
          },
        ]}
      />

      <h2>Visualize the Search Space Shrinking</h2>
      <p>
        Each step halves the search space. The graph below shows the
        exponential decay of remaining candidates. After <em>k</em> steps,
        only n/2^k elements remain.
      </p>
      <SliderExploration
        title="Search Space Reduction"
        description="Adjust the number of steps k to see how quickly the search space shrinks for an array of size n = 1024."
        parameters={[
          { name: "k", label: "Steps taken", min: 0, max: 10, step: 1, default: 0 },
        ]}
        equation="1024 / (2^x)"
        xRange={[0, 10]}
        yRange={[0, 1100]}
      />

      <h2>The Sorted Prerequisite</h2>
      <InteractiveQuestion
        id="bsearch-q1"
        question="What happens if you use binary search on an unsorted array?"
        options={[
          { text: "It may return incorrect results — the sorted invariant is required", feedback: "Correct! Binary search assumes that when arr[mid] < target, all elements left of mid are also less than target. This assumption breaks for unsorted arrays." },
          { text: "It works but is slower", feedback: "It does not just slow down — it can give wrong answers entirely." },
          { text: "It automatically sorts the array first", feedback: "Binary search does not sort — it assumes pre-sorted input." },
          { text: "It throws an error", feedback: "Binary search has no way to detect unsorted input. It silently gives wrong results." },
        ]}
        correctIndex={0}
        hint="Think about the assumption that lets us discard half the array at each step."
        explanation="Binary search's correctness depends on the array being sorted. On an unsorted array, eliminating half the search space based on the middle element is not valid."
      />

      <h2>Implementation</h2>
      <p>
        Implement binary search iteratively. Pay attention to the boundary
        conditions: <code>low &lt;= high</code> (not strict less-than), and
        update <code>low = mid + 1</code> and <code>high = mid - 1</code> (not
        just <code>mid</code>).
      </p>
      <CodeEditor
        language="python"
        description="Implement binary search iteratively. Compare arr[mid] with target and adjust the search range."
        initialCode={`def binary_search(arr, target):
    """
    Find target in sorted array.
    Returns index if found, -1 otherwise.
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        # TODO: Compare arr[mid] with target
        # Return mid if found
        # Adjust low or high to narrow the search

        pass

    return -1

# Test
arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(arr, 23))   # Expected: 5
print(binary_search(arr, 42))   # Expected: -1`}
        solution={`def binary_search(arr, target):
    """
    Find target in sorted array.
    Returns index if found, -1 otherwise.
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(arr, 23))   # Output: 5
print(binary_search(arr, 42))   # Output: -1`}
      />

      <h2>Common Bug: Integer Overflow</h2>
      <p>
        The classic bug <code>mid = (low + high) / 2</code> can overflow in
        languages with fixed-size integers. If <code>low</code> and{" "}
        <code>high</code> are both near the maximum integer value, their sum
        overflows. The safe version is:
      </p>
      <MathBlock latex="\text{mid} = \text{low} + \lfloor(\text{high} - \text{low}) / 2\rfloor" display />
      <p>
        In Python this is not an issue (arbitrary precision integers), but it
        matters in Java, C++, and other languages. This bug famously went
        undetected in the Java standard library for nearly a decade.
      </p>

      <h2>Beyond Simple Search</h2>
      <p>
        Binary search is not just for finding exact matches. Variants include:
      </p>
      <ul>
        <li><strong>Lower bound:</strong> Find the first element &ge; target.</li>
        <li><strong>Upper bound:</strong> Find the first element &gt; target.</li>
        <li><strong>Bisection method:</strong> Find roots of continuous functions.</li>
        <li><strong>Search on answer:</strong> Binary search the solution space of optimization problems.</li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="bsearch-q2"
        question="Binary search runs in O(log n). If you double the array size, how many MORE comparisons are needed?"
        options={[
          { text: "About 1 more comparison", feedback: "Correct! log2(2n) = log2(n) + 1. Doubling the input only adds ONE more comparison. This is the power of logarithmic time." },
          { text: "Double the comparisons", feedback: "That would be O(n), linear time. Binary search is much better than that." },
          { text: "n more comparisons", feedback: "Binary search eliminates half the remaining elements each step, growing logarithmically, not linearly." },
          { text: "log(n) more comparisons", feedback: "The increase is exactly 1, since log(2n) = log(n) + log(2) = log(n) + 1." },
        ]}
        correctIndex={0}
        hint="Recall that log(2n) = log(n) + log(2)."
        explanation="Logarithmic growth is extremely slow. Going from 1 million to 1 billion elements only adds about 10 more comparisons (from roughly 20 to roughly 30)."
      />

      <InteractiveQuestion
        id="bsearch-q3"
        question="You have a sorted array of 1,000,000 elements. What is the maximum number of comparisons binary search needs?"
        options={[
          { text: "20", feedback: "Correct! log2(1,000,000) ≈ 19.9, so at most 20 comparisons. A million elements, just 20 checks." },
          { text: "1,000", feedback: "That would be O(sqrt(n)). Binary search is even faster." },
          { text: "500,000", feedback: "That is n/2 — linear search averages this, but binary search is exponentially faster." },
          { text: "100", feedback: "Even fewer are needed. log2(1,000,000) ≈ 20." },
        ]}
        correctIndex={0}
        hint="Calculate log2(1,000,000). Recall that 2^20 ≈ 1,000,000."
        explanation="2^20 = 1,048,576 ≈ 1 million. So binary search needs at most 20 comparisons for a million elements."
      />

      <h3>Challenge</h3>
      <p>
        Modify binary search to find the <em>leftmost</em> occurrence of a
        target in an array that may contain duplicates.
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Instead of returning immediately when <code>arr[mid] == target</code>,
          record the position and continue searching left by setting{" "}
          <code>high = mid - 1</code>. After the loop, return the last recorded
          position (or -1 if never found).
        </p>
      </RevealAnswer>
    </div>
  );
}
