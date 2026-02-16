"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function MergeSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Merge Sort: Divide and Conquer</h2>
      <p>
        Merge sort is the first &ldquo;serious&rdquo; sorting algorithm most
        students learn. It uses the <strong>divide and conquer</strong>{" "}
        paradigm: split the array in half, recursively sort each half, then
        merge the two sorted halves back together. Unlike bubble sort, merge
        sort guarantees O(n log n) time in <em>all</em> cases &mdash; no
        worst-case surprises.
      </p>
      <p>
        The genius of merge sort is that merging two already-sorted arrays is
        trivially efficient: just compare the front elements and take the
        smaller one. By recursively breaking the problem down to single-element
        arrays (which are trivially sorted), we build up the full sorted result
        from the bottom.
      </p>

      <h2>The Three Steps</h2>
      <ol>
        <li><strong>Divide:</strong> Split the array into two halves.</li>
        <li><strong>Conquer:</strong> Recursively sort each half.</li>
        <li><strong>Combine:</strong> Merge the two sorted halves into one sorted array.</li>
      </ol>
      <p>
        The key insight: merging two sorted arrays of total length <em>n</em>{" "}
        takes O(n) time. We split log(n) times, and each level of the
        recursion does O(n) work total, giving:
      </p>
      <MathBlock latex="T(n) = 2T(n/2) + O(n) \implies T(n) = O(n \log n)" display />

      <h2>Trace Through an Example</h2>
      <StepByStep
        title="Merge Sort on [38, 27, 43, 3, 9, 82, 10]"
        steps={[
          {
            title: "Divide",
            content: "Split into [38, 27, 43] and [3, 9, 82, 10].",
          },
          {
            title: "Recursively sort left half",
            content:
              "[38, 27, 43] → split into [38] and [27, 43]. Sort [27, 43] → split into [27] and [43], merge → [27, 43]. Merge [38] and [27, 43] → [27, 38, 43].",
          },
          {
            title: "Recursively sort right half",
            content:
              "[3, 9, 82, 10] → split into [3, 9] and [82, 10]. Sort [3, 9] → [3, 9]. Sort [82, 10] → [10, 82]. Merge → [3, 9, 10, 82].",
          },
          {
            title: "Final merge",
            content:
              "Merge [27, 38, 43] and [3, 9, 10, 82]: compare front elements repeatedly → [3, 9, 10, 27, 38, 43, 82]. Done!",
          },
        ]}
      />

      <h2>The Merge Operation in Detail</h2>
      <p>
        The merge step is where all the real work happens. Given two sorted
        arrays, we maintain a pointer into each. At every step we compare the
        elements at both pointers, take the smaller one, and advance that
        pointer. When one array is exhausted, we append the remainder of the
        other.
      </p>
      <p>
        This produces a sorted result in a single pass &mdash; O(n) time for
        merging two arrays of total length n. However, it requires O(n)
        additional space for the temporary merged array.
      </p>

      <h2>Space Complexity Trade-off</h2>
      <MathBlock
        latex="\text{Time: } O(n \log n) \qquad \text{Space: } O(n)"
        display
      />
      <p>
        Merge sort&apos;s main drawback is its O(n) space requirement. Quick sort
        can sort in-place with O(log n) stack space, which is why quick sort is
        often preferred for arrays. However, for linked lists, merge sort can
        be implemented in O(1) extra space by relinking nodes, making it the
        algorithm of choice for list-based data.
      </p>

      <InteractiveQuestion
        id="merge-q1"
        question="What is the space complexity of merge sort?"
        options={[
          { text: "O(n) — it needs a temporary array for merging", feedback: "Correct! The merge step requires creating a temporary array to hold the merged result. This is merge sort's main trade-off: guaranteed O(n log n) time at the cost of O(n) extra space." },
          { text: "O(1) — it sorts in-place", feedback: "Standard merge sort is NOT in-place. The merge step needs auxiliary space." },
          { text: "O(n squared)", feedback: "Merge sort only needs O(n) extra space — one temporary array the size of the input." },
          { text: "O(log n) — from recursion depth", feedback: "The recursion depth is O(log n) stack frames, but the merge step also needs O(n) space for the temporary array. The dominant term is O(n)." },
        ]}
        correctIndex={0}
        hint="Think about what happens during the merge step — where does the merged result go?"
        explanation="Merge sort's space-time trade-off: O(n log n) guaranteed time, but O(n) extra space for the temporary merge buffer."
      />

      <h2>Implementation</h2>
      <p>
        Implement merge sort recursively. The recursive structure is elegant:
        the base case is a single element (already sorted), and the recursive
        case splits, sorts, and merges.
      </p>
      <CodeEditor
        language="python"
        description="Implement the merge function that combines two sorted arrays into one sorted array."
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

      <h2>Why Merge Sort Is Stable</h2>
      <p>
        Merge sort is a <strong>stable</strong> sorting algorithm, meaning equal
        elements maintain their original relative order. This is guaranteed by
        the merge step: when two elements are equal, we always take the one
        from the <em>left</em> array first. Stability matters when sorting by
        multiple keys (e.g., sort employees by department, then by name within
        each department).
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="merge-q2"
        question="Why is merge sort preferred over quicksort for sorting linked lists?"
        options={[
          { text: "Merge sort only needs sequential access — it processes elements in order", feedback: "Correct! Merge sort only needs sequential access (iterate through elements), while quicksort needs random access (jump to pivot positions). Linked lists support sequential access efficiently but random access is O(n)." },
          { text: "Merge sort is always faster than quicksort", feedback: "On arrays, quicksort is often faster due to cache locality. The advantage is specific to linked lists." },
          { text: "Merge sort uses less memory for linked lists", feedback: "True as a bonus — for linked lists, merge can be done by relinking nodes with no extra array. But the main reason is the access pattern." },
          { text: "Quicksort cannot sort linked lists at all", feedback: "Quicksort can sort linked lists, but it is much less efficient due to the need for random access to select pivots." },
        ]}
        correctIndex={0}
        hint="Think about how linked lists differ from arrays in terms of element access."
        explanation="Linked lists change the trade-offs: merge sort's sequential access pattern is a perfect fit, and the merge can be done by relinking nodes without extra space."
      />

      <InteractiveQuestion
        id="merge-q3"
        question="Merge sort always takes O(n log n) time, even on already-sorted input. Is this a strength or weakness compared to insertion sort?"
        options={[
          { text: "Weakness — insertion sort handles sorted input in O(n)", feedback: "Correct! Merge sort does not adapt to existing order. Insertion sort detects already-sorted input and finishes in O(n). This is why Timsort (Python's sort) combines both: merge sort for the overall structure and insertion sort for small or nearly-sorted runs." },
          { text: "Strength — consistent performance is always better", feedback: "Consistency is good, but paying O(n log n) when O(n) is possible is wasteful. Adaptive algorithms get the best of both worlds." },
          { text: "Neither — they perform the same on sorted input", feedback: "Insertion sort is O(n) on sorted input while merge sort is still O(n log n)." },
        ]}
        correctIndex={0}
        hint="What happens when insertion sort encounters an already-sorted array?"
        explanation="Merge sort is non-adaptive: it does the same work regardless of input order. Hybrid algorithms like Timsort combine merge sort with insertion sort to be adaptive."
      />

      <h3>Challenge</h3>
      <p>
        What is the maximum number of comparisons needed to merge two sorted
        arrays of lengths 3 and 4?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          The maximum is 6 comparisons. In the worst case, elements alternate
          between the two arrays (e.g., left = [1,3,5], right = [2,4,6,7]).
          The general formula: merging arrays of lengths <em>m</em> and <em>n</em>{" "}
          requires at most <em>m + n - 1</em> comparisons. Here: 3 + 4 - 1 = 6.
        </p>
      </RevealAnswer>
    </div>
  );
}
