"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function SelectionSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Selection Sort: Find the Minimum, Swap It In</h2>
      <p>
        Selection sort is one of the most intuitive sorting algorithms. The
        idea is simple: scan the unsorted portion of the array, find the
        smallest element, and swap it into the next position. Repeat until
        the entire array is sorted.
      </p>
      <p>
        Unlike bubble sort (which moves elements one position at a time via
        adjacent swaps), selection sort makes at most <em>n - 1</em> swaps
        total &mdash; one per pass. However, it always performs O(n&#178;)
        comparisons regardless of the input, making it less adaptive than
        bubble sort or insertion sort.
      </p>

      <h2>How It Works</h2>
      <p>
        On each pass <em>i</em>, selection sort finds the minimum element in
        the subarray from index <em>i</em> to the end, then swaps it with the
        element at index <em>i</em>. After pass <em>i</em>, the first
        <em> i + 1</em> elements are in their final sorted positions.
      </p>

      <StepByStep
        title="Tracing Selection Sort on [29, 10, 14, 37, 13]"
        steps={[
          {
            title: "Pass 0: Find minimum in [29, 10, 14, 37, 13]",
            content:
              "The minimum is 10 at index 1. Swap with index 0. Result: [10, 29, 14, 37, 13].",
          },
          {
            title: "Pass 1: Find minimum in [29, 14, 37, 13]",
            content:
              "The minimum is 13 at index 4. Swap with index 1. Result: [10, 13, 14, 37, 29].",
          },
          {
            title: "Pass 2: Find minimum in [14, 37, 29]",
            content:
              "The minimum is 14, already at index 2. No swap needed. Result: [10, 13, 14, 37, 29].",
          },
          {
            title: "Pass 3: Find minimum in [37, 29]",
            content:
              "The minimum is 29 at index 4. Swap with index 3. Result: [10, 13, 14, 29, 37]. Done!",
          },
        ]}
      />

      <h2>Complexity Analysis</h2>
      <p>
        On every pass, we scan the remaining unsorted portion to find the
        minimum. The number of comparisons is:
      </p>
      <MathBlock
        latex="(n-1) + (n-2) + \cdots + 1 = \frac{n(n-1)}{2} = O(n^2)"
        display
      />
      <p>
        This is the same for best, worst, and average cases &mdash; selection
        sort does not adapt to the input. However, the number of swaps is only
        O(n), which can be advantageous when writes are expensive (e.g., flash
        memory).
      </p>
      <MathBlock
        latex="\text{Comparisons: } O(n^2) \qquad \text{Swaps: } O(n)"
        display
      />

      <h2>Selection Sort vs. Bubble Sort</h2>
      <p>
        Both are O(n&#178;), but they differ in important ways:
      </p>
      <ul>
        <li>
          <strong>Swaps:</strong> Selection sort does at most n - 1 swaps;
          bubble sort can do O(n&#178;) swaps.
        </li>
        <li>
          <strong>Adaptivity:</strong> Bubble sort (with early exit) runs in
          O(n) on sorted input; selection sort always takes O(n&#178;).
        </li>
        <li>
          <strong>Stability:</strong> Bubble sort is stable; selection sort is
          <em> not</em> stable (it can rearrange equal elements due to
          long-range swaps).
        </li>
      </ul>

      <h2>Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement selection sort. For each position i, find the minimum in the remaining array and swap it into position i."
        initialCode={`def selection_sort(arr):
    """Sort array in-place using selection sort."""
    n = len(arr)

    for i in range(n - 1):
        # TODO: Find the index of the minimum element
        # in arr[i:]
        min_idx = i

        # TODO: Scan from i+1 to end, updating min_idx

        # TODO: Swap arr[i] and arr[min_idx]
        pass

    return arr

# Test
print(selection_sort([64, 25, 12, 22, 11]))
# Expected: [11, 12, 22, 25, 64]`}
        solution={`def selection_sort(arr):
    """Sort array in-place using selection sort."""
    n = len(arr)

    for i in range(n - 1):
        min_idx = i

        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr

print(selection_sort([64, 25, 12, 22, 11]))
# Output: [11, 12, 22, 25, 64]`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="sel-q1"
        question="After 3 complete passes of selection sort on an array of 8 elements, how many elements are guaranteed to be in their final position?"
        options={[
          { text: "1", feedback: "Each pass places one element in its final position. After 3 passes, 3 elements are settled." },
          { text: "3", feedback: "Correct! Each pass of selection sort places exactly one element — the minimum of the unsorted portion — into its final position. After 3 passes, the first 3 positions contain the 3 smallest elements in order." },
          { text: "5", feedback: "Only one element is placed per pass. After 3 passes, exactly 3 are in place." },
          { text: "8", feedback: "Sorting 8 elements requires 7 passes (n - 1), not 3." },
        ]}
        correctIndex={1}
        hint="Selection sort's invariant: after pass i, the first i+1 elements are sorted and final."
        explanation="Selection sort places exactly one element per pass. After k passes, the first k elements are in their correct sorted positions."
      />

      <InteractiveQuestion
        id="sel-q2"
        question="Why is selection sort NOT stable?"
        options={[
          { text: "It makes too many comparisons", feedback: "Stability is about preserving the relative order of equal elements, not about comparison count." },
          { text: "Long-range swaps can move equal elements past each other", feedback: "Correct! When selection sort swaps the minimum into position, it can jump over equal elements that were earlier in the array, changing their relative order." },
          { text: "It sorts in descending order", feedback: "Selection sort can sort ascending or descending; stability is a separate concern." },
          { text: "It uses O(n²) comparisons", feedback: "The number of comparisons does not determine stability." },
        ]}
        correctIndex={1}
        hint="Consider what happens when you swap a distant element past other elements with the same value."
        explanation="Example: sorting [3a, 3b, 1] — selection sort swaps 1 with 3a, giving [1, 3b, 3a]. The two 3s have swapped relative order, violating stability."
      />

      <h3>Challenge</h3>
      <p>
        Can you modify selection sort to find the <em>maximum</em> instead and
        build the sorted array from right to left?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Instead of finding the minimum and placing it at position i (counting
          from the left), find the maximum and place it at position n - 1 - i
          (counting from the right). The loop runs from the end of the array
          inward, and you search for the max in the unsorted portion.
        </p>
      </RevealAnswer>
    </div>
  );
}
