"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function IntroToSorting() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Why Sorting Matters</h2>
      <p>
        Sorting &mdash; rearranging items into a defined order &mdash; is one
        of the most fundamental operations in computer science. It might seem
        mundane, but sorting sits at the heart of countless algorithms and
        systems. Binary search requires sorted data. Database indexes are
        sorted. Rendering layers in a video game involves sorting by depth.
        Even detecting duplicates becomes trivial once data is sorted.
      </p>
      <p>
        Because sorting is so pervasive, an enormous amount of research has
        gone into finding efficient sorting algorithms. The quest for faster
        sorting has driven breakthroughs in algorithm design, complexity
        theory, and hardware optimization. Understanding sorting is the
        gateway to understanding algorithmic efficiency.
      </p>

      <h2>What Does &ldquo;Efficient&rdquo; Mean?</h2>
      <p>
        We measure algorithm efficiency using <strong>Big-O notation</strong>,
        which describes how the running time grows as the input size
        <em> n</em> increases. For sorting:
      </p>
      <ul>
        <li>
          <strong>O(n&#178;)</strong> &mdash; &ldquo;quadratic&rdquo; algorithms
          like Bubble Sort and Insertion Sort. Fine for small lists, painfully
          slow for large ones.
        </li>
        <li>
          <strong>O(n log n)</strong> &mdash; &ldquo;efficient&rdquo;
          comparison-based algorithms like Merge Sort and Quick Sort. This is
          provably the best you can do with comparisons alone.
        </li>
      </ul>
      <MathBlock
        latex="\text{For } n = 1{,}000{,}000: \quad n^2 = 10^{12} \text{ ops} \quad \text{vs.} \quad n\log n \approx 2 \times 10^7 \text{ ops}"
        display
      />
      <p>
        That is a 50,000x difference! The gap between O(n&#178;) and O(n log n)
        is the difference between a program that takes seconds and one that
        takes days.
      </p>

      <h2>The Comparison Lower Bound</h2>
      <p>
        A beautiful theoretical result: any comparison-based sorting algorithm
        must make at least O(n log n) comparisons in the worst case. This is
        because there are <em>n!</em> possible orderings, and each comparison
        eliminates at most half of them:
      </p>
      <MathBlock latex="\log_2(n!) = \Theta(n \log n)" display />
      <p>
        This means Merge Sort and Heap Sort are <em>asymptotically optimal</em>
        &mdash; you cannot do better with comparisons alone (though
        non-comparison sorts like Radix Sort can beat this bound under special
        conditions).
      </p>

      <h2>Sorting in Practice</h2>
      <StepByStep
        title="How Real Systems Sort"
        steps={[
          {
            title: "Python: Timsort",
            content:
              "Python's built-in sort() uses Timsort, a hybrid of Merge Sort and Insertion Sort. It exploits existing order in the data, achieving O(n) on nearly-sorted inputs and O(n log n) in the worst case.",
          },
          {
            title: "C++: Introsort",
            content:
              "C++ std::sort uses Introsort — Quick Sort that falls back to Heap Sort if recursion depth exceeds a threshold. This guarantees O(n log n) worst-case while enjoying Quick Sort's cache-friendliness.",
          },
          {
            title: "JavaScript: varies by engine",
            content:
              "V8 (Chrome/Node.js) uses Timsort for Array.sort(). SpiderMonkey (Firefox) also uses a variant of Merge Sort.",
          },
        ]}
      />

      <h2>Try It: Selection Sort</h2>
      <p>
        Before diving into specific algorithms, try implementing the simplest
        possible sort: go through the list, find the minimum, place it
        first, then find the next minimum, and so on. This is
        <strong> Selection Sort</strong>.
      </p>
      <CodeEditor
        language="python"
        initialCode={`def selection_sort(arr):
    """Sort the array in-place using selection sort."""
    n = len(arr)
    for i in range(n):
        # Find the index of the minimum element in arr[i:]
        min_idx = i
        for j in range(i + 1, n):
            pass  # TODO: update min_idx if arr[j] < arr[min_idx]
        # Swap the found minimum with arr[i]
        # TODO: perform the swap
    return arr

print(selection_sort([64, 25, 12, 22, 11]))
# Expected: [11, 12, 22, 25, 64]`}
        solution={`def selection_sort(arr):
    """Sort the array in-place using selection sort."""
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selection_sort([64, 25, 12, 22, 11]))
# Output: [11, 12, 22, 25, 64]`}
        description="Fill in the comparison and swap logic. For each position i, find the smallest element in the unsorted portion and swap it into position."
      />

      <h2>The Sorting Algorithm Landscape</h2>
      <p>Sorting algorithms fall into categories based on their approach:</p>
      <ul>
        <li><strong>Comparison-based:</strong> Bubble sort, merge sort, quicksort &mdash; compare pairs of elements</li>
        <li><strong>Non-comparison:</strong> Counting sort, radix sort &mdash; exploit integer structure</li>
        <li><strong>Adaptive:</strong> Timsort, insertion sort &mdash; take advantage of existing order</li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="sort-intro-q1"
        question="What is the best possible worst-case time for a comparison-based sort?"
        options={[
          { text: "O(n)", feedback: "O(n) is achievable for specific non-comparison sorts (like counting sort) but not for general comparison-based sorting." },
          { text: "O(n log n)", feedback: "Correct! The information-theoretic lower bound of log2(n!) = Theta(n log n) comparisons means no comparison sort can beat this." },
          { text: "O(n squared)", feedback: "Many algorithms achieve O(n squared), but efficient ones like Merge Sort do better." },
          { text: "O(log n)", feedback: "You cannot even look at all n elements in O(log n) time." },
        ]}
        correctIndex={1}
        hint="Think about how many possible orderings exist for n items."
        explanation="There are n! permutations. Each comparison eliminates at most half, so you need at least log2(n!) = Theta(n log n) comparisons."
      />

      <InteractiveQuestion
        id="sort-intro-q2"
        question="Which property is most important for a sorting algorithm used in a database?"
        options={[
          { text: "Stability — equal elements maintain their relative order", feedback: "Correct! In databases, sorting by multiple keys requires stability. If you sort by last name, then by first name, a stable sort preserves the last-name ordering for people with the same first name." },
          { text: "Using the least memory possible", feedback: "Memory matters, but stability is more critical for databases that sort by multiple columns." },
          { text: "Being the absolute fastest in the best case", feedback: "Worst-case and average-case performance matters more than best-case for reliability." },
          { text: "Having the simplest code", feedback: "Simplicity is nice, but correctness and consistency of results is more important." },
        ]}
        correctIndex={0}
        hint="Think about what happens when you sort by one column, then by another."
        explanation="Stability ensures that when you sort by one key, previously sorted order on another key is preserved — essential for multi-column sorting."
      />

      <h3>Food for Thought</h3>
      <p>
        Why do real-world sorting implementations use hybrid algorithms
        instead of pure Merge Sort or Quick Sort?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Pure asymptotic efficiency is not everything. Insertion Sort has
          small overhead and is very fast on short arrays (say, fewer than 16
          elements). By switching to Insertion Sort for small subarrays,
          hybrid algorithms combine the asymptotic efficiency of O(n log n)
          with the low constant factors of simpler algorithms. Additionally,
          cache locality and branch prediction behavior differ between
          algorithms, making real-world performance depend on more than just
          Big-O class.
        </p>
      </RevealAnswer>
    </div>
  );
}
