"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function QuickSort() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Quicksort: The King of Practical Sorting</h2>
      <p>
        Quicksort is often the fastest general-purpose sorting algorithm in
        practice. Like merge sort, it uses <strong>divide and conquer</strong>,
        but with a twist: instead of splitting the array in half by position,
        quicksort splits it by <em>value</em> using a <strong>pivot</strong>.
        Elements smaller than the pivot go left; elements larger go right.
      </p>
      <p>
        Quicksort&apos;s average-case time is O(n log n) with excellent constant
        factors, and it sorts <strong>in-place</strong> using only O(log n) stack
        space. This makes it the default choice in many standard library
        implementations (C&apos;s qsort, Java&apos;s Arrays.sort for primitives).
      </p>

      <h2>The Algorithm</h2>
      <ol>
        <li><strong>Choose a pivot</strong> element from the array.</li>
        <li>
          <strong>Partition:</strong> Rearrange so all elements &#8804; pivot are
          on the left and all elements &gt; pivot are on the right. The pivot
          ends up in its final sorted position.
        </li>
        <li><strong>Recurse</strong> on the left and right subarrays.</li>
      </ol>

      <StepByStep
        title="Quicksort on [7, 2, 1, 6, 8, 5, 3, 4] with last element as pivot"
        steps={[
          {
            title: "Choose pivot = 4 (last element)",
            content:
              "We will partition the array so everything ≤ 4 goes left and everything > 4 goes right.",
          },
          {
            title: "Partition",
            content:
              "Walk through the array. Elements ≤ 4: {2, 1, 3, 4}. Elements > 4: {7, 6, 8, 5}. After partitioning: [2, 1, 3, 4, 8, 5, 7, 6]. Pivot 4 is at index 3 — its final position.",
          },
          {
            title: "Recurse on left [2, 1, 3]",
            content:
              "Pivot = 3. Partition: [2, 1, 3]. Recurse: [2, 1] with pivot 1 → [1, 2]. Result: [1, 2, 3].",
          },
          {
            title: "Recurse on right [8, 5, 7, 6]",
            content:
              "Pivot = 6. Partition: [5, 6, 8, 7]. Recurse: [5] is done, [8, 7] with pivot 7 → [7, 8]. Result: [5, 6, 7, 8].",
          },
          {
            title: "Combine",
            content:
              "Concatenate: [1, 2, 3] + [4] + [5, 6, 7, 8] = [1, 2, 3, 4, 5, 6, 7, 8].",
          },
        ]}
      />

      <h2>Complexity Analysis</h2>
      <p>
        The performance of quicksort depends critically on pivot selection:
      </p>
      <MathBlock
        latex="\text{Average case: } O(n \log n) \qquad \text{Worst case: } O(n^2)"
        display
      />
      <p>
        The worst case occurs when the pivot is always the smallest or largest
        element (e.g., already sorted input with first-element pivot). Each
        partition produces one empty side and one side of size n - 1, giving:
      </p>
      <MathBlock
        latex="T(n) = T(n-1) + O(n) \implies T(n) = O(n^2)"
        display
      />
      <p>
        The average case assumes random pivots. On average, the pivot lands near
        the middle, giving balanced partitions:
      </p>
      <MathBlock
        latex="T(n) = 2T(n/2) + O(n) \implies T(n) = O(n \log n)"
        display
      />

      <h2>Pivot Selection Strategies</h2>
      <ul>
        <li>
          <strong>Last element:</strong> Simple but vulnerable to sorted input.
        </li>
        <li>
          <strong>Random element:</strong> Makes worst case extremely unlikely
          (expected O(n log n) for any input).
        </li>
        <li>
          <strong>Median of three:</strong> Take the median of the first,
          middle, and last elements. Avoids worst case on sorted input and is
          used in many production implementations.
        </li>
      </ul>

      <h2>Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement the Lomuto partition scheme for quicksort. The pivot is the last element."
        initialCode={`def quicksort(arr, low=0, high=None):
    """Sort array in-place using quicksort."""
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quicksort(arr, low, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, high)

    return arr

def partition(arr, low, high):
    """Lomuto partition: pivot is arr[high]."""
    pivot = arr[high]
    i = low - 1  # boundary of elements <= pivot

    for j in range(low, high):
        # TODO: If arr[j] <= pivot, increment i
        # and swap arr[i] with arr[j]
        pass

    # TODO: Place pivot in its correct position
    # by swapping arr[i+1] with arr[high]

    return i + 1  # pivot's final index

# Test
data = [10, 7, 8, 9, 1, 5]
print(quicksort(data))
# Expected: [1, 5, 7, 8, 9, 10]`}
        solution={`def quicksort(arr, low=0, high=None):
    """Sort array in-place using quicksort."""
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quicksort(arr, low, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, high)

    return arr

def partition(arr, low, high):
    """Lomuto partition: pivot is arr[high]."""
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

data = [10, 7, 8, 9, 1, 5]
print(quicksort(data))
# Output: [1, 5, 7, 8, 9, 10]`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="quick-q1"
        question="What is quicksort's worst-case time complexity, and when does it occur?"
        options={[
          { text: "O(n log n) — always", feedback: "O(n log n) is the average case, not the worst case. Bad pivot choices can degrade performance." },
          { text: "O(n²) — when the pivot is always the smallest or largest element", feedback: "Correct! When every partition produces maximally unbalanced splits (one side empty), we get n + (n-1) + ... + 1 = O(n²) comparisons. This happens with sorted input and naive pivot selection." },
          { text: "O(n²) — when all elements are equal", feedback: "Equal elements cause problems with basic partitioning, but the specific worst case is maximally unbalanced partitions." },
          { text: "O(n) — quicksort is always linear", feedback: "No comparison-based sort can be O(n) in the worst case." },
        ]}
        correctIndex={1}
        hint="What happens if the pivot is always at one extreme end of the array?"
        explanation="With maximally unbalanced partitions, quicksort degenerates to O(n²). Randomized pivot selection makes this astronomically unlikely."
      />

      <InteractiveQuestion
        id="quick-q2"
        question="What is quicksort's space complexity?"
        options={[
          { text: "O(n) — it needs a temporary array like merge sort", feedback: "Quicksort partitions in-place without copying. It does not need an auxiliary array." },
          { text: "O(1) — completely in-place", feedback: "The partitioning is in-place, but the recursion uses O(log n) stack space on average." },
          { text: "O(log n) average — from the recursion stack", feedback: "Correct! Quicksort partitions in-place (no extra array), but each recursive call uses a stack frame. With balanced partitions, the recursion depth is O(log n). In the worst case it can be O(n)." },
          { text: "O(n log n)", feedback: "This is the time complexity, not the space complexity." },
        ]}
        correctIndex={2}
        hint="Quicksort is in-place, but it is recursive. How deep does the recursion go?"
        explanation="Quicksort uses O(log n) stack space on average for recursion. Tail-call optimization on the larger partition can guarantee O(log n) even in the worst case."
      />

      <h3>Challenge</h3>
      <p>
        Why is quicksort generally faster than merge sort in practice, despite
        both being O(n log n) on average?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Three factors: (1) <strong>Cache locality</strong> &mdash; quicksort
          accesses elements sequentially within subarrays, which is cache-friendly.
          Merge sort&apos;s merge step accesses two separate arrays. (2) <strong>No
          extra allocation</strong> &mdash; quicksort sorts in-place while merge
          sort allocates O(n) auxiliary space. (3) <strong>Smaller constant
          factors</strong> &mdash; quicksort&apos;s inner loop is very tight (a single
          comparison and conditional swap).
        </p>
      </RevealAnswer>
    </div>
  );
}
