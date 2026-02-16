"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BubbleSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Bubble Sort: The Simplest Sorting Algorithm</h2>
      <p>
        Bubble sort is the most intuitive sorting algorithm. It repeatedly
        steps through the list, compares adjacent elements, and swaps them if
        they are in the wrong order. After each complete pass, the largest
        unsorted element &ldquo;bubbles up&rdquo; to its correct position at
        the end of the array.
      </p>
      <p>
        While bubble sort is rarely used in production (its O(n&#178;) time makes
        it impractical for large datasets), it is an excellent pedagogical tool.
        Understanding bubble sort builds intuition about invariants, optimization
        strategies, and why more sophisticated algorithms exist.
      </p>

      <h2>How It Works</h2>
      <p>
        Each pass through the array guarantees the next largest element reaches
        its correct position. After <em>k</em> passes, the last <em>k</em>{" "}
        elements are sorted. The algorithm continues until a complete pass
        occurs with no swaps, indicating the entire array is sorted.
      </p>

      <StepByStep
        title="Tracing Bubble Sort on [5, 3, 8, 1]"
        steps={[
          {
            title: "Pass 1",
            content:
              "Compare 5 and 3 → swap → [3, 5, 8, 1]. Compare 5 and 8 → no swap. Compare 8 and 1 → swap → [3, 5, 1, 8]. The largest element 8 is now in its final position.",
          },
          {
            title: "Pass 2",
            content:
              "Compare 3 and 5 → no swap. Compare 5 and 1 → swap → [3, 1, 5, 8]. The second-largest element 5 is now in place.",
          },
          {
            title: "Pass 3",
            content:
              "Compare 3 and 1 → swap → [1, 3, 5, 8]. No more passes needed — the array is fully sorted.",
          },
        ]}
      />

      <h2>Complexity Analysis</h2>
      <p>
        In the worst case (reverse-sorted input), every pair must be swapped
        on every pass. The number of comparisons is:
      </p>
      <MathBlock
        latex="(n-1) + (n-2) + \cdots + 1 = \frac{n(n-1)}{2} = O(n^2)"
        display
      />
      <p>
        The best case occurs when the input is already sorted. With the
        early-exit optimization (stop if no swaps happen during a pass), only
        one pass of n-1 comparisons is needed, giving O(n) best-case time.
      </p>
      <MathBlock
        latex="\text{Worst/Average: } O(n^2) \qquad \text{Best (already sorted): } O(n)"
        display
      />

      <h2>The Key Invariant</h2>
      <p>
        After pass <em>i</em>, the <em>i</em> largest elements occupy their
        final positions at the end of the array. This invariant is what allows
        us to reduce the range of each subsequent pass &mdash; we do not need
        to compare elements that are already in place.
      </p>

      <InteractiveQuestion
        id="bubble-q1"
        question="After ONE complete pass of bubble sort on [4, 2, 7, 1, 3], which element is guaranteed to be in its final position?"
        options={[
          { text: "7 (the maximum is bubbled to the end)", feedback: "Correct! Each pass of bubble sort moves the largest unsorted element to its final position at the end of the unsorted portion." },
          { text: "1 (the minimum goes to the front)", feedback: "Bubble sort moves the maximum to the end, not the minimum to the front. The minimum might move only one position left per pass." },
          { text: "4 (the first element settles first)", feedback: "The first element might move during the pass but is not guaranteed to reach its final position." },
          { text: "3 (the last element stays put)", feedback: "The last element 3 will be compared with 7 during the pass and may move." },
        ]}
        correctIndex={0}
        hint="Think about what 'bubbling up' means — which element floats to the top?"
        explanation="Bubble sort's key invariant: after pass k, the k largest elements are in their final positions at the end of the array."
      />

      <h2>Implementation</h2>
      <p>
        Implement bubble sort with the early-exit optimization. If no swaps
        occur during a pass, the array is already sorted and we can break early.
      </p>
      <CodeEditor
        language="python"
        description="Implement bubble sort with the early-exit optimization. Compare adjacent elements and swap if needed."
        initialCode={`def bubble_sort(arr):
    """Sort array in-place using bubble sort."""
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(0, n - i - 1):
            # TODO: Compare adjacent elements
            # and swap if needed, set swapped = True
            pass

        # TODO: If no swaps, array is sorted — break early

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

      <h2>Bubble Sort vs. Insertion Sort</h2>
      <p>
        Both algorithms are O(n&#178;), but insertion sort is almost always
        faster in practice. Insertion sort does fewer swaps because it shifts
        elements rather than repeatedly swapping adjacent pairs. It also has
        better cache behavior because it accesses memory more sequentially.
        For nearly-sorted data, insertion sort is particularly efficient.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="bubble-q2"
        question="When would you actually use bubble sort in practice?"
        options={[
          { text: "Almost never — it is mainly educational", feedback: "Correct! Bubble sort's O(n squared) makes it impractical for real data. However, understanding it builds intuition for better algorithms." },
          { text: "When sorting millions of records", feedback: "For large datasets, O(n squared) is far too slow. Use merge sort or quicksort instead." },
          { text: "When memory is extremely limited", feedback: "While bubble sort is in-place (O(1) extra memory), insertion sort is equally space-efficient and faster in practice." },
          { text: "When data is completely random", feedback: "Random data is the average case where bubble sort still requires O(n squared) comparisons." },
        ]}
        correctIndex={0}
        hint="Consider the time complexity and how it compares to algorithms like merge sort."
        explanation="Bubble sort is primarily a teaching tool. In practice, Python's built-in sort() uses Timsort (O(n log n)), which is vastly superior for any non-trivial dataset."
      />

      <InteractiveQuestion
        id="bubble-q3"
        question="How many passes does bubble sort need for an already-sorted array of 100 elements (with early exit)?"
        options={[
          { text: "1 pass", feedback: "Correct! On the first pass, no swaps occur, so the early-exit condition triggers immediately. This is bubble sort's best case: O(n)." },
          { text: "100 passes", feedback: "Without the early-exit optimization you would need up to 99 passes, but with it, one clean pass suffices." },
          { text: "50 passes", feedback: "With the early-exit optimization, one pass with zero swaps is enough to confirm the array is sorted." },
          { text: "99 passes", feedback: "This is the worst case (reverse sorted). An already-sorted array triggers early exit on the first pass." },
        ]}
        correctIndex={0}
        hint="If no swaps occur during a pass, what does that tell us about the array?"
        explanation="One pass through a sorted array produces zero swaps, so the algorithm exits after a single pass of n-1 comparisons."
      />

      <h3>Challenge</h3>
      <p>
        Can you modify bubble sort to sort in <em>descending</em> order instead?
        What is the minimum change needed?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Change the comparison from <code>arr[j] &gt; arr[j+1]</code> to
          <code> arr[j] &lt; arr[j+1]</code>. That single change makes the
          <em> smallest</em> element bubble to the end each pass, producing
          descending order.
        </p>
      </RevealAnswer>
    </div>
  );
}
