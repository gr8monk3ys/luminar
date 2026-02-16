"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function Heaps() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Heaps and Priority Queues</h2>
      <p>
        A <strong>heap</strong> is a specialized tree-based data structure that
        satisfies the <strong>heap property</strong>: in a min-heap, every
        parent is smaller than or equal to its children; in a max-heap, every
        parent is larger than or equal to its children. The root always holds
        the extreme value (minimum or maximum).
      </p>
      <p>
        Heaps are the backbone of <strong>priority queues</strong> &mdash; data
        structures where the highest-priority element is always accessible in
        O(1), and insertion and extraction happen in O(log n). They power
        Dijkstra&apos;s shortest path, task schedulers, event-driven
        simulations, and the heapsort algorithm.
      </p>
      <MathBlock
        latex="\text{Min-heap property: } \text{parent}(i) \leq \text{children}(i)"
        display
      />

      <h2>Array Representation</h2>
      <p>
        The elegant trick: a complete binary tree maps perfectly to a flat
        array. No pointers needed. For a node at index <em>i</em> (0-indexed):
      </p>
      <MathBlock
        latex="\text{left child} = 2i + 1 \qquad \text{right child} = 2i + 2 \qquad \text{parent} = \lfloor(i-1)/2\rfloor"
        display
      />
      <p>
        This is why heaps are so memory-efficient: they use a simple array with
        no wasted space and no pointer overhead. The array{" "}
        <code>[1, 3, 5, 7, 9, 8, 6]</code> represents a min-heap where 1 is
        the root, 3 and 5 are its children, and so on.
      </p>

      <h2>Heapify: Restoring the Heap Property</h2>
      <StepByStep
        title="Sift-down after extracting the minimum from [1, 3, 5, 7, 9, 8, 6]"
        steps={[
          {
            title: "Extract root (1), move last element (6) to root",
            content:
              "Array becomes [6, 3, 5, 7, 9, 8]. The heap property is violated at the root: 6 > 3 and 6 > 5.",
          },
          {
            title: "Sift down: swap 6 with smaller child (3)",
            content:
              "Array becomes [3, 6, 5, 7, 9, 8]. Check index 1: 6 > 7? No. 6 < 7 and 6 < 9. Heap property restored!",
          },
          {
            title: "Result",
            content:
              "Final min-heap: [3, 6, 5, 7, 9, 8]. The new minimum (3) is at the root. Total work: O(log n) swaps down the tree height.",
          },
        ]}
      />

      <h2>Python heapq Module</h2>
      <p>
        Python provides the <code>heapq</code> module for min-heap operations
        on regular lists. It is the standard tool for priority queues in Python.
      </p>
      <CodeEditor
        language="python"
        description="Using Python's heapq module for priority queue operations."
        initialCode={`import heapq

# Create a min-heap from a list
data = [5, 3, 8, 1, 9, 2, 7]
heapq.heapify(data)  # In-place, O(n)
print("Heap:", data)  # [1, 3, 2, 5, 9, 8, 7]

# Push a new element - O(log n)
heapq.heappush(data, 0)
print("After push 0:", data)

# Pop the minimum - O(log n)
smallest = heapq.heappop(data)
print("Popped:", smallest)
print("Heap now:", data)

# Get k smallest elements - O(n + k log n)
nums = [42, 17, 93, 5, 28, 61, 3, 84]
print("3 smallest:", heapq.nsmallest(3, nums))
print("3 largest:", heapq.nlargest(3, nums))

# Priority queue pattern: (priority, item)
tasks = []
heapq.heappush(tasks, (2, "low priority task"))
heapq.heappush(tasks, (0, "urgent task"))
heapq.heappush(tasks, (1, "medium task"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Processing: {task} (priority {priority})")`}
      />

      <InteractiveQuestion
        id="heap-q1"
        question="In a min-heap with n elements, what is the time complexity of finding the maximum element?"
        options={[
          { text: "O(n) — the maximum could be any leaf, and there are roughly n/2 leaves", feedback: "Correct! In a min-heap, the maximum has no fixed position — it is guaranteed to be a leaf, but there are about n/2 leaves and they could be anywhere in the bottom half of the array. You must check all of them." },
          { text: "O(1) — it is at the last index", feedback: "The last index holds the last element added, not necessarily the maximum. Leaves are not sorted." },
          { text: "O(log n) — search down the tree", feedback: "The heap property only guarantees the minimum is at the root. You cannot efficiently navigate toward the maximum." },
          { text: "O(1) — it is at the root", feedback: "The root of a min-heap holds the minimum, not the maximum." },
        ]}
        correctIndex={0}
        hint="The heap property tells you about parent-child relationships. What does it NOT tell you about siblings or leaves?"
        explanation="A min-heap only guarantees the minimum is at the root. Finding the maximum requires scanning all leaves: O(n). If you need both min and max efficiently, use a min-max heap or two separate heaps."
      />

      <h2>Building a Heap: O(n), Not O(n log n)</h2>
      <p>
        A common misconception: building a heap by inserting n elements one by
        one takes O(n log n). But the <code>heapify</code> algorithm, which
        sifts down from the bottom up, runs in O(n). The key insight is that
        most nodes are near the bottom and need very few swaps.
      </p>
      <MathBlock
        latex="\sum_{h=0}^{\lfloor \log n \rfloor} \frac{n}{2^{h+1}} \cdot h = O(n)"
        display
      />

      <InteractiveQuestion
        id="heap-q2"
        question="You need to repeatedly find and remove the smallest element from a dynamic collection. Which data structure is best?"
        options={[
          { text: "Min-heap (priority queue)", feedback: "Correct! A min-heap gives O(1) access to the smallest element and O(log n) removal. This is exactly what priority queues are designed for." },
          { text: "Sorted array", feedback: "Finding the minimum is O(1), but inserting new elements requires O(n) to maintain sorted order." },
          { text: "Unsorted array", feedback: "Finding the minimum requires scanning the entire array: O(n) per extraction." },
          { text: "Hash table", feedback: "Hash tables provide O(1) lookup by key, but finding the minimum requires O(n) scanning." },
        ]}
        correctIndex={0}
        hint="Which structure keeps the minimum readily accessible while supporting efficient insertions?"
        explanation="A min-heap provides the ideal trade-off: O(1) min access, O(log n) extraction, and O(log n) insertion. Sorted arrays are too expensive to insert into; unsorted arrays are too expensive to extract from."
      />

      <h3>Challenge</h3>
      <p>
        Implement a function that finds the k-th largest element in an unsorted
        array using a min-heap of size k.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`import heapq

def kth_largest(nums, k):
    """Find the k-th largest element using a min-heap of size k."""
    # Maintain a min-heap of the k largest elements seen
    heap = nums[:k]
    heapq.heapify(heap)

    for num in nums[k:]:
        if num > heap[0]:  # larger than smallest of top-k
            heapq.heapreplace(heap, num)  # pop + push in one step

    return heap[0]  # root is the k-th largest

print(kth_largest([3, 1, 4, 1, 5, 9, 2, 6, 5], 3))  # Output: 5
print(kth_largest([7, 10, 4, 3, 20, 15], 4))          # Output: 4`}
          description="A heap of size k keeps only the k largest values. The root (minimum of the heap) is the k-th largest overall. Time: O(n log k)."
        />
      </RevealAnswer>
    </div>
  );
}
