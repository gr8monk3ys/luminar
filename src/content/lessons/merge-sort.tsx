"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function MergeSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Merge Sort</h2>

      <p>
        Merge sort is the first &ldquo;serious&rdquo; sorting algorithm you&apos;ll learn. It
        uses <strong>divide and conquer</strong>: split the array in half, recursively sort
        each half, then merge the two sorted halves. It guarantees O(n log n) time in all
        cases — no worst-case surprises.
      </p>

      <h3>The Divide-and-Conquer Strategy</h3>
      <ol>
        <li><strong>Divide</strong>: Split the array into two halves</li>
        <li><strong>Conquer</strong>: Recursively sort each half</li>
        <li><strong>Combine</strong>: Merge the two sorted halves into one sorted array</li>
      </ol>

      <p>The key insight: merging two sorted arrays is easy — just compare the front elements and take the smaller one.</p>

      <MathBlock latex="T(n) = 2T(n/2) + O(n) \implies T(n) = O(n \log n)" />

      <StepByStep
        title="Tracing Merge Sort on [38, 27, 43, 3]"
        steps={[
          { title: "Divide", content: "Split into [38, 27] and [43, 3]" },
          { title: "Recursively sort left", content: "Split [38, 27] → [38] and [27]. Both are single elements (base case). Merge: compare 38 vs 27 → [27, 38]." },
          { title: "Recursively sort right", content: "Split [43, 3] → [43] and [3]. Merge: compare 43 vs 3 → [3, 43]." },
          { title: "Merge sorted halves", content: "Merge [27, 38] and [3, 43]: take 3, then 27, then 38, then 43 → [3, 27, 38, 43]. Done!" },
        ]}
      />

      <InteractiveQuestion
        id="merge-q1"
        question="What is the space complexity of merge sort?"
        options={[
          { text: "O(n) — it needs a temporary array for merging", feedback: "Correct! The merge step requires creating a temporary array to hold the merged result. This is merge sort's main trade-off: guaranteed O(n log n) time at the cost of O(n) extra space." },
          { text: "O(1) — it sorts in-place", feedback: "Standard merge sort is NOT in-place. The merge step needs auxiliary space." },
          { text: "O(n²)", feedback: "Merge sort only needs O(n) extra space — one temporary array the size of the input." },
          { text: "O(log n) — from recursion depth", feedback: "The recursion depth is O(log n) stack frames, but the merge step also needs O(n) space for the temporary array." },
        ]}
        correctIndex={0}
        explanation="Merge sort's space-time trade-off: O(n log n) guaranteed time, but O(n) extra space. This is why quicksort (in-place, but O(n²) worst case) is sometimes preferred."
      />

      <h3>Implementation</h3>

      <CodeEditor
        language="python"
        description="Implement merge sort recursively."
        initialCode={`def merge_sort(arr):
    """Sort array using merge sort."""
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays into one sorted array."""
    result = []
    i = j = 0

    # TODO: Compare elements from left and right
    # Append the smaller one to result
    # Don't forget remaining elements!

    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# Expected: [3, 9, 10, 27, 38, 43, 82]`}
        solution={`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# Output: [3, 9, 10, 27, 38, 43, 82]`}
      />

      <InteractiveQuestion
        id="merge-q2"
        question="Why is merge sort preferred over quicksort for sorting linked lists?"
        options={[
          { text: "Merge sort doesn't need random access — it processes elements sequentially", feedback: "Correct! Merge sort only needs sequential access (iterate through elements), while quicksort needs random access (jump to pivot positions). Linked lists support sequential access efficiently but random access is O(n)." },
          { text: "Merge sort is always faster", feedback: "On arrays, quicksort is often faster due to cache locality. The advantage is specific to linked lists." },
          { text: "Merge sort uses less memory for linked lists", feedback: "For linked lists, merge sort can be done in-place by relinking nodes — so the O(n) space disadvantage disappears!" },
        ]}
        correctIndex={0}
        explanation="Linked lists change the trade-offs: merge sort's sequential access pattern is a perfect fit, and the merge can be done by relinking nodes (no extra array needed)."
      />
    </div>
  );
}
