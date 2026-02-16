"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function BinarySearch() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Binary Search</h2>

      <p>
        Binary search is the most important searching algorithm in computer science. Given
        a <strong>sorted</strong> array, it finds any element in O(log n) time by repeatedly
        halving the search space. For a billion elements, that&apos;s about 30 comparisons
        instead of a billion.
      </p>

      <MathBlock latex="\log_2(1{,}000{,}000{,}000) \approx 30" />

      <h3>The Algorithm</h3>
      <p>
        Maintain two pointers, <code>low</code> and <code>high</code>, defining the current
        search range. Check the middle element. If it&apos;s the target, we&apos;re done.
        If target is smaller, search the left half. If larger, search the right half.
      </p>

      <StepByStep
        title="Searching for 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]"
        steps={[
          { title: "Initial: low=0, high=9, mid=4", content: "arr[4] = 16. Target 23 > 16, so search right half: low=5, high=9." },
          { title: "low=5, high=9, mid=7", content: "arr[7] = 56. Target 23 < 56, so search left half: low=5, high=6." },
          { title: "low=5, high=6, mid=5", content: "arr[5] = 23. Found! Return index 5. Only 3 comparisons for 10 elements." },
        ]}
      />

      <InteractiveQuestion
        id="bsearch-q1"
        question="What happens if you use binary search on an unsorted array?"
        options={[
          { text: "It may return incorrect results — the sorted invariant is required", feedback: "Correct! Binary search assumes that when arr[mid] < target, all elements left of mid are also less than target. This assumption breaks for unsorted arrays." },
          { text: "It works but is slower", feedback: "It doesn't just slow down — it can give wrong answers entirely." },
          { text: "It automatically sorts the array first", feedback: "Binary search doesn't sort — it assumes pre-sorted input." },
        ]}
        correctIndex={0}
        explanation="Binary search's correctness depends on the array being sorted. On an unsorted array, eliminating half the search space based on the middle element is not valid."
      />

      <h3>Implementation</h3>

      <CodeEditor
        language="python"
        description="Implement binary search iteratively."
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
        # Adjust low or high accordingly

        pass

    return -1

# Test
arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(arr, 23))   # Expected: 5
print(binary_search(arr, 42))   # Expected: -1`}
        solution={`def binary_search(arr, target):
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

      <h3>Common Bug: Integer Overflow</h3>
      <p>
        The classic bug <code>mid = (low + high) / 2</code> can overflow in languages with
        fixed-size integers. The safe version is:
      </p>
      <MathBlock latex="\text{mid} = \text{low} + \lfloor(\text{high} - \text{low}) / 2\rfloor" />
      <p>
        In Python this isn&apos;t an issue (arbitrary precision integers), but it matters in
        Java, C++, and other languages.
      </p>

      <InteractiveQuestion
        id="bsearch-q2"
        question="Binary search runs in O(log n). If you double the array size, how many MORE comparisons are needed?"
        options={[
          { text: "About 1 more comparison", feedback: "Correct! log₂(2n) = log₂(n) + 1. Doubling the input only adds ONE more comparison. This is the power of logarithmic time." },
          { text: "Double the comparisons", feedback: "That would be O(n), linear time. Binary search is much better." },
          { text: "n more comparisons", feedback: "Binary search eliminates half the remaining elements each step, growing logarithmically." },
        ]}
        correctIndex={0}
        explanation="Logarithmic growth is extremely slow. Going from 1 million to 1 billion elements only adds about 10 more comparisons (from ~20 to ~30)."
      />
    </div>
  );
}
