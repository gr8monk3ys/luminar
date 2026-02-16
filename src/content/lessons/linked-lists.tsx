"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function LinkedLists() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Linked Lists: Pointers Instead of Positions</h2>
      <p>
        A <strong>linked list</strong> stores elements in individual{" "}
        <strong>nodes</strong>, each containing a value and a reference (pointer)
        to the next node. Unlike arrays, the nodes can be scattered anywhere in
        memory &mdash; the chain of pointers is what gives the list its
        structure.
      </p>
      <p>
        This design trades away O(1) random access for O(1) insertion and
        deletion at any position (given a reference to that position). When your
        workload is dominated by frequent insertions and deletions rather than
        lookups, a linked list can outperform an array.
      </p>

      <h2>The Node Class</h2>
      <p>
        Every linked list is built from the same simple building block: a node
        that holds data and a pointer to the next node. The last node points to{" "}
        <code>None</code>, signaling the end of the list.
      </p>
      <CodeEditor
        language="python"
        description="The Node class and a simple LinkedList with append and display."
        initialCode={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")

ll = LinkedList()
for val in [10, 20, 30, 40]:
    ll.append(val)
ll.display()  # Output: 10 -> 20 -> 30 -> 40 -> None`}
      />

      <h2>Insertion at the Head: O(1)</h2>
      <p>
        The killer advantage of linked lists: inserting at the front is O(1).
        Create a new node, point it to the current head, and update the head
        pointer. No elements need to shift.
      </p>
      <StepByStep
        title="Inserting 5 at the head of 10 -> 20 -> 30"
        steps={[
          {
            title: "Create the new node",
            content:
              "Allocate a new Node with data = 5. Its next pointer is initially None.",
          },
          {
            title: "Point new node to current head",
            content:
              "Set new_node.next = self.head (which points to the node containing 10).",
          },
          {
            title: "Update the head pointer",
            content:
              "Set self.head = new_node. The list is now 5 -> 10 -> 20 -> 30 -> None. Total work: O(1), regardless of list length.",
          },
        ]}
      />

      <h2>Deletion: Rewiring Pointers</h2>
      <p>
        To delete a node, we bypass it by pointing the previous node&apos;s{" "}
        <code>next</code> pointer to the node after the one being deleted. The
        deleted node is then garbage collected. Finding the node takes O(n), but
        the actual deletion (rewiring) is O(1).
      </p>
      <MathBlock
        latex="\text{Search}: O(n) \qquad \text{Delete (given reference)}: O(1)"
        display
      />

      <CodeEditor
        language="python"
        description="Implement insert_at_head and delete_by_value for the linked list."
        initialCode={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, data):
        """Insert a new node at the beginning. O(1)."""
        # TODO: Create node, point to head, update head
        pass

    def delete_by_value(self, target):
        """Delete the first node with the given value. O(n)."""
        # TODO: Handle empty list and head deletion
        # TODO: Traverse to find node, rewire pointers
        pass

    def display(self):
        parts = []
        curr = self.head
        while curr:
            parts.append(str(curr.data))
            curr = curr.next
        print(" -> ".join(parts) + " -> None")

ll = LinkedList()
for v in [30, 20, 10]:
    ll.insert_at_head(v)
ll.display()             # Expected: 10 -> 20 -> 30 -> None
ll.delete_by_value(20)
ll.display()             # Expected: 10 -> 30 -> None`}
        solution={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, data):
        """Insert a new node at the beginning. O(1)."""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete_by_value(self, target):
        """Delete the first node with the given value. O(n)."""
        if not self.head:
            return
        if self.head.data == target:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == target:
                current.next = current.next.next
                return
            current = current.next

    def display(self):
        parts = []
        curr = self.head
        while curr:
            parts.append(str(curr.data))
            curr = curr.next
        print(" -> ".join(parts) + " -> None")

ll = LinkedList()
for v in [30, 20, 10]:
    ll.insert_at_head(v)
ll.display()             # Output: 10 -> 20 -> 30 -> None
ll.delete_by_value(20)
ll.display()             # Output: 10 -> 30 -> None`}
      />

      <InteractiveQuestion
        id="linked-q1"
        question="What is the time complexity of accessing the k-th element in a singly linked list?"
        options={[
          { text: "O(k) — you must traverse k nodes from the head", feedback: "Correct! Unlike an array, there is no formula to jump directly to position k. You must follow k next pointers, one by one. In the worst case (last element), this is O(n)." },
          { text: "O(1) — nodes store their index", feedback: "Linked list nodes do not know their position. You must traverse from the head." },
          { text: "O(log k) — binary search on the list", feedback: "Binary search requires random access. You cannot jump to the middle of a linked list without traversing to it." },
          { text: "O(n squared) — each hop requires a search", feedback: "Each hop is O(1), and you make k hops, so the total is O(k)." },
        ]}
        correctIndex={0}
        hint="Starting from the head, how many next pointers must you follow?"
        explanation="Linked list access is O(k) for the k-th element because you must follow the chain of next pointers one at a time. This O(n) worst-case access is the main disadvantage compared to arrays."
      />

      <h2>Arrays vs Linked Lists: When to Choose Which</h2>
      <p>
        Use <strong>arrays</strong> when you need fast random access, your data
        size is predictable, and cache performance matters. Use{" "}
        <strong>linked lists</strong> when you need frequent insertions/deletions
        at arbitrary positions and do not need index-based access.
      </p>
      <p>
        In practice, arrays (and dynamic arrays) win most of the time due to
        superior cache locality. Modern CPUs are optimized for sequential memory
        access, and linked list nodes scattered across memory cause frequent
        cache misses. This is why Python&apos;s <code>list</code> (a dynamic
        array) is the default sequence type, not a linked list.
      </p>

      <InteractiveQuestion
        id="linked-q2"
        question="You are building a text editor undo feature. Which data structure is best for the undo stack?"
        options={[
          { text: "A dynamic array (Python list) used as a stack", feedback: "Correct! Undo is a LIFO operation: push on each edit, pop on undo. A dynamic array provides O(1) push and pop at the end, and you never need random access into the middle of the undo history." },
          { text: "A singly linked list", feedback: "A linked list works, but a dynamic array is simpler and has better cache performance for stack operations." },
          { text: "A sorted array", feedback: "Undo history is ordered by time, not sorted by value. No sorting needed." },
          { text: "A doubly linked list", feedback: "Doubly linked lists add overhead. A simple stack (array-based) is sufficient for undo." },
        ]}
        correctIndex={0}
        hint="Undo is always the most recent action. What access pattern does that suggest?"
        explanation="Undo is inherently a stack (LIFO). A Python list used as a stack with append/pop is the simplest and most efficient choice."
      />

      <h3>Challenge</h3>
      <p>
        Implement a method to reverse a singly linked list in place by rewiring
        the next pointers.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`def reverse(self):
    prev = None
    current = self.head
    while current:
        next_node = current.next   # save next
        current.next = prev        # reverse pointer
        prev = current             # advance prev
        current = next_node        # advance current
    self.head = prev

# The key insight: at each step, we flip one pointer.
# After traversing all n nodes, every pointer is reversed.
# Time: O(n), Space: O(1).`}
          description="Three pointers (prev, current, next_node) walk through the list, reversing each link."
        />
      </RevealAnswer>
    </div>
  );
}
