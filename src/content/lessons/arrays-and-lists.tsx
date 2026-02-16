"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function ArraysAndLists() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Arrays and Lists: The Foundation of Data Structures</h2>
      <p>
        Every data structure builds on top of two fundamental storage strategies:
        <strong> contiguous</strong> memory (arrays) and <strong>linked</strong>{" "}
        memory (linked lists). Understanding their trade-offs is the first step
        to choosing the right tool for each problem.
      </p>
      <p>
        An <strong>array</strong> stores elements in a single, contiguous block
        of memory. Because elements sit side by side, accessing any element by
        index is an O(1) operation &mdash; the CPU simply computes the memory
        address with a single multiplication and addition:
      </p>
      <MathBlock
        latex="\text{address} = \text{base} + \text{index} \times \text{element\_size}"
        display
      />

      <h2>Why Index Access Is O(1)</h2>
      <StepByStep
        title="Accessing arr[5] in a contiguous array"
        steps={[
          {
            title: "Know the base address",
            content:
              "The array starts at some memory address, say 0x1000. Each integer takes 8 bytes.",
          },
          {
            title: "Compute the target address",
            content:
              "address = 0x1000 + 5 * 8 = 0x1028. This is a single arithmetic operation, independent of array size.",
          },
          {
            title: "Read the value",
            content:
              "The CPU fetches the value at 0x1028 directly. No searching, no traversal. This is why array indexing is O(1).",
          },
        ]}
      />

      <h2>Dynamic Arrays: Growing on Demand</h2>
      <p>
        Static arrays have a fixed size, but most real programs need arrays that
        grow. A <strong>dynamic array</strong> (Python&apos;s <code>list</code>,
        Java&apos;s <code>ArrayList</code>) starts with some capacity and doubles
        when full. Appending is usually O(1), but occasionally triggers an O(n)
        resize. Averaged over n appends, the cost per operation is still O(1)
        &mdash; this is called <strong>amortized</strong> O(1).
      </p>
      <MathBlock
        latex="\text{Total cost of } n \text{ appends} = n + \sum_{k=0}^{\lfloor \log_2 n \rfloor} 2^k \leq 3n = O(n)"
        display
      />
      <p>
        So the amortized cost per append is O(n)/n = O(1). The occasional
        expensive resize is &ldquo;paid for&rdquo; by all the cheap appends
        that preceded it.
      </p>

      <h2>Visualize Growth: Dynamic Array Capacity</h2>
      <p>
        The graph below shows how the number of elements stored (x) compares to
        actual allocated capacity, which doubles each time it is exceeded. The
        equation 2^(ceil(log(x)/log(2))) gives the next power of two at or
        above x.
      </p>
      <GraphPlayground
        equation="2^(Math.ceil(Math.log(x)/Math.log(2)))"
        xRange={[1, 64]}
        yRange={[0, 80]}
        interactive
        showGrid
      />

      <h2>Python List Operations</h2>
      <CodeEditor
        language="python"
        description="Explore time complexities of common Python list operations."
        initialCode={`import time

def time_operation(name, func, n=100000):
    start = time.time()
    func()
    elapsed = (time.time() - start) * 1000
    print(f"{name}: {elapsed:.2f} ms")

arr = list(range(n))

# O(1) - index access
time_operation("Index access (middle)", lambda: arr[n // 2])

# O(1) amortized - append
time_operation("Append", lambda: arr.append(999))

# O(n) - insert at beginning (shifts all elements)
time_operation("Insert at index 0", lambda: arr.insert(0, 999))

# O(n) - search (linear scan)
time_operation("Search for last element", lambda: arr.index(n - 1))

# O(1) - pop from end
time_operation("Pop from end", lambda: arr.pop())

# O(n) - pop from beginning
time_operation("Pop from index 0", lambda: arr.pop(0))`}
      />

      <InteractiveQuestion
        id="arrays-q1"
        question="Inserting at the beginning of a dynamic array is O(n). Why?"
        options={[
          { text: "Every existing element must be shifted one position to the right", feedback: "Correct! To make room at index 0, all n elements must move. This is the key weakness of arrays compared to linked lists, which can insert at the head in O(1)." },
          { text: "The array must be resorted", feedback: "Arrays do not need to be sorted. The issue is physical movement of elements in memory." },
          { text: "A new hash must be computed for each element", feedback: "Arrays do not use hashing. The cost comes from shifting elements in contiguous memory." },
          { text: "The entire array is copied to a new memory block", feedback: "Copying happens during resize, not every insertion. The O(n) here comes from shifting elements within the same block." },
        ]}
        correctIndex={0}
        hint="Think about what must happen to the elements already in the array to make room at position 0."
        explanation="Inserting at the front requires shifting all n elements one position right. This is inherent to contiguous memory: there is no gap to fill without moving data."
      />

      <h2>Arrays vs Linked Lists: The Trade-offs</h2>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Array</th>
            <th>Linked List</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Access by index</td><td>O(1)</td><td>O(n)</td></tr>
          <tr><td>Insert at front</td><td>O(n)</td><td>O(1)</td></tr>
          <tr><td>Insert at end</td><td>O(1) amortized</td><td>O(1) with tail pointer</td></tr>
          <tr><td>Search</td><td>O(n)</td><td>O(n)</td></tr>
          <tr><td>Memory overhead</td><td>Low (contiguous)</td><td>High (pointers per node)</td></tr>
          <tr><td>Cache performance</td><td>Excellent</td><td>Poor</td></tr>
        </tbody>
      </table>

      <InteractiveQuestion
        id="arrays-q2"
        question="A Python list has 1,000,000 elements. You need to repeatedly insert elements at random positions. What is the average time complexity per insertion?"
        options={[
          { text: "O(n) — on average, half the elements must shift", feedback: "Correct! Inserting at a random position requires shifting all elements after that position. On average, that is about n/2 elements, which is still O(n)." },
          { text: "O(1) — Python lists are optimized for this", feedback: "No amount of optimization can avoid shifting elements in contiguous memory." },
          { text: "O(log n) — binary search finds the position", feedback: "Finding the position might be fast, but physically inserting still requires shifting elements." },
          { text: "O(n squared) — each shift triggers a resize", feedback: "Each insertion is O(n) for shifting, not O(n squared). Resizes are separate and amortized." },
        ]}
        correctIndex={0}
        hint="After finding the insertion point, what physical work must be done in contiguous memory?"
        explanation="Random insertion in an array is O(n) because elements after the insertion point must all shift right. If you need frequent insertions at arbitrary positions, consider a different data structure."
      />

      <h3>Challenge</h3>
      <p>
        Implement a simple dynamic array class that doubles capacity when full
        and supports append and index access.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`class DynamicArray:
    def __init__(self):
        self._capacity = 4
        self._size = 0
        self._data = [None] * self._capacity

    def append(self, value):
        if self._size == self._capacity:
            self._resize(2 * self._capacity)
        self._data[self._size] = value
        self._size += 1

    def __getitem__(self, index):
        if index < 0 or index >= self._size:
            raise IndexError("index out of range")
        return self._data[index]

    def _resize(self, new_capacity):
        new_data = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity

    def __len__(self):
        return self._size

arr = DynamicArray()
for i in range(10):
    arr.append(i * 10)
    print(f"size={len(arr)}, capacity={arr._capacity}")
print(arr[7])  # Output: 70`}
          description="A minimal dynamic array showing the doubling strategy."
        />
      </RevealAnswer>
    </div>
  );
}
