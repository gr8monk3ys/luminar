"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function BubbleSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Bubble Sort</h2>

      <p>
        Bubble sort is the simplest sorting algorithm. It repeatedly steps through the list,
        compares adjacent elements, and swaps them if they&apos;re in the wrong order. The
        largest elements &ldquo;bubble up&rdquo; to the end of the list with each pass.
      </p>

      <h3>How It Works</h3>
      <p>
        Each pass through the array guarantees the next largest element reaches its correct
        position. After k passes, the last k elements are sorted.
      </p>

      <StepByStep
        title="Tracing Bubble Sort on [5, 3, 8, 1]"
        steps={[
          { title: "Pass 1: Compare 5,3 → swap", content: "Array becomes [3, 5, 8, 1]. Then compare 5,8 → no swap. Then 8,1 → swap → [3, 5, 1, 8]. Now 8 is in place." },
          { title: "Pass 2: Compare 3,5 → no swap", content: "Then 5,1 → swap → [3, 1, 5, 8]. Now 5 and 8 are in place." },
          { title: "Pass 3: Compare 3,1 → swap", content: "Array becomes [1, 3, 5, 8]. Fully sorted!" },
        ]}
      />

      <h3>Complexity Analysis</h3>
      <MathBlock latex="\text{Worst/Average: } O(n^2) \qquad \text{Best (already sorted): } O(n)" />
      <p>
        The best case O(n) is achievable with an optimization: if no swaps occur during a
        pass, the array is already sorted and we can stop early.
      </p>

      <InteractiveQuestion
        id="bubble-q1"
        question="After ONE pass of bubble sort on [4, 2, 7, 1, 3], which element is guaranteed to be in its final position?"
        options={[
          { text: "7 (the maximum reaches the end)", feedback: "Correct! Each pass of bubble sort moves the largest unsorted element to its final position at the end." },
          { text: "1 (the minimum goes to the front)", feedback: "Bubble sort moves the maximum to the end, not the minimum to the front (unless you're doing it in reverse)." },
          { text: "4 (the first element)", feedback: "The first element might move during the pass but isn't guaranteed to reach its final position." },
        ]}
        correctIndex={0}
        explanation="Bubble sort's key invariant: after pass k, the k largest elements are in their final positions at the end of the array."
      />

      <h3>Implementation</h3>

      <CodeEditor
        language="python"
        description="Implement bubble sort with the early-exit optimization."
        initialCode={`def bubble_sort(arr):
    """Sort array in-place using bubble sort."""
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(0, n - i - 1):
            # TODO: Compare adjacent elements
            # and swap if needed
            pass

        # TODO: If no swaps, array is sorted
        # break early

    return arr

# Test
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# Expected: [11, 12, 22, 25, 34, 64, 90]`}
        solution={`def bubble_sort(arr):
    """Sort array in-place using bubble sort."""
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# Output: [11, 12, 22, 25, 34, 64, 90]`}
      />

      <InteractiveQuestion
        id="bubble-q2"
        question="When would you actually use bubble sort in practice?"
        options={[
          { text: "Almost never — it's mainly educational", feedback: "Correct! Bubble sort's O(n²) makes it impractical for real data. However, understanding it builds intuition for better algorithms." },
          { text: "When sorting millions of records", feedback: "For large datasets, O(n²) is far too slow. Use merge sort or quicksort." },
          { text: "When memory is extremely limited", feedback: "While bubble sort is in-place (O(1) extra memory), insertion sort is equally space-efficient and faster in practice." },
        ]}
        correctIndex={0}
        explanation="Bubble sort is primarily a teaching tool. In practice, Python's built-in sort() uses Timsort (O(n log n)), which is vastly superior for any non-trivial dataset."
      />
    </div>
  );
}
