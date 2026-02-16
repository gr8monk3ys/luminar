"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function HashTables() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Hash Tables: O(1) Lookup</h2>
      <p>
        Hash tables are arguably the most important data structure in practical
        programming. They achieve <strong>O(1) average-case</strong> lookup,
        insertion, and deletion &mdash; constant time regardless of the number
        of elements. Python&apos;s <code>dict</code>, JavaScript&apos;s{" "}
        <code>Map</code>, and Java&apos;s <code>HashMap</code> are all hash
        tables under the hood.
      </p>
      <p>
        The idea is brilliantly simple: instead of searching through a list to
        find an element, use a mathematical function to <em>compute</em> exactly
        where the element should be stored. This transforms searching from a
        sequential scan into a single array lookup.
      </p>

      <h2>How It Works</h2>
      <p>
        A hash table uses a <strong>hash function</strong> to convert keys into
        array indices. Given a key (like a string), the hash function computes
        an integer, and we use modulo to map it to an array position:
      </p>
      <MathBlock latex="\text{index} = \text{hash}(\text{key}) \mod \text{table\_size}" display />
      <p>
        A good hash function distributes keys uniformly across the table,
        minimizing the chance that two different keys land in the same slot. It
        should also be fast to compute and deterministic (the same key always
        produces the same hash).
      </p>

      <StepByStep
        title="Inserting into a Hash Table"
        steps={[
          {
            title: "Hash the key",
            content:
              "For key 'apple', compute hash('apple') = 1234567. The exact number depends on the hash function implementation.",
          },
          {
            title: "Compute the index",
            content:
              "With table size 10: 1234567 mod 10 = 7. The key-value pair is stored at index 7 of the internal array.",
          },
          {
            title: "Handle collisions (if needed)",
            content:
              "If index 7 is already occupied by a different key, we need a collision resolution strategy. The two main approaches are chaining (linked list at each slot) and open addressing (probe the next available slot).",
          },
        ]}
      />

      <h2>Collisions Are Inevitable</h2>
      <p>
        By the <strong>pigeonhole principle</strong>, if you have more possible
        keys than array slots, some keys must share slots. This is called a
        <strong> collision</strong>. The question is not <em>if</em> collisions
        happen, but <em>how</em> we handle them.
      </p>

      <InteractiveQuestion
        id="hash-q1"
        question="Two different keys hash to the same index. What is this called?"
        options={[
          { text: "A collision", feedback: "Correct! Collisions are inevitable by the pigeonhole principle — if you have more possible keys than array slots, some keys must share slots. Good hash tables handle collisions gracefully." },
          { text: "An overflow", feedback: "Overflow refers to exceeding memory or numeric limits, not shared indices." },
          { text: "A hash error", feedback: "Collisions are normal and expected, not errors. Every hash table implementation must deal with them." },
          { text: "A deadlock", feedback: "Deadlocks are a concurrency concept, unrelated to hashing." },
        ]}
        correctIndex={0}
        hint="When two pigeons try to occupy the same hole..."
        explanation="By the pigeonhole principle, if you hash more unique keys than table slots, collisions are guaranteed. Good hash tables handle them with chaining or open addressing."
      />

      <h2>Collision Resolution: Chaining</h2>
      <p>
        The simplest collision strategy: each slot holds a linked list (or
        dynamic array). Colliding keys are added to the list at that slot.
        To look up a key, hash it, go to that slot, then search the list.
      </p>
      <p>
        With a good hash function and a <strong>load factor</strong>{" "}
        (n / table_size) below 0.75, the average list length stays near 1,
        keeping operations O(1) on average. When the load factor gets too high,
        the table <strong>resizes</strong> (typically doubles) and rehashes all
        entries. This occasional O(n) resize averages out to O(1) per
        operation &mdash; a concept called <strong>amortized</strong> constant
        time.
      </p>
      <MathBlock
        latex="\text{Load factor} = \alpha = \frac{n}{\text{table\_size}}"
        display
      />

      <h2>Collision Resolution: Open Addressing</h2>
      <p>
        An alternative to chaining: if the target slot is occupied, probe other
        slots according to a fixed pattern until an empty one is found. Common
        probing strategies include:
      </p>
      <ul>
        <li><strong>Linear probing:</strong> Try the next slot, then the next, etc.</li>
        <li><strong>Quadratic probing:</strong> Try slots at 1, 4, 9, 16... positions away.</li>
        <li><strong>Double hashing:</strong> Use a second hash function to determine the step size.</li>
      </ul>
      <p>
        Open addressing avoids the overhead of linked lists and can be more
        cache-friendly, but performance degrades badly at high load factors
        because long probe sequences develop.
      </p>

      <h2>Implementation: Hash Table with Chaining</h2>
      <CodeEditor
        language="python"
        description="Implement put() and get() for a hash table using chaining. Each bucket is a list of (key, value) tuples."
        initialCode={`class HashTable:
    def __init__(self, size=16):
        self.size = size
        self.buckets = [[] for _ in range(size)]
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        """Insert or update a key-value pair."""
        idx = self._hash(key)
        # TODO: Check if key exists in bucket, update if so
        # Otherwise append new (key, value) pair
        pass

    def get(self, key):
        """Get value by key. Raise KeyError if not found."""
        idx = self._hash(key)
        # TODO: Search bucket for key, return value
        pass

    def delete(self, key):
        """Remove a key-value pair."""
        idx = self._hash(key)
        # TODO: Find and remove (key, value) from bucket
        pass

# Test
ht = HashTable()
ht.put("name", "Alice")
ht.put("age", 30)
ht.put("name", "Bob")  # Update existing key
print(ht.get("name"))  # Expected: Bob
print(ht.get("age"))   # Expected: 30`}
        solution={`class HashTable:
    def __init__(self, size=16):
        self.size = size
        self.buckets = [[] for _ in range(size)]
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        """Insert or update a key-value pair."""
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))
        self.count += 1

    def get(self, key):
        """Get value by key. Raise KeyError if not found."""
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        raise KeyError(key)

    def delete(self, key):
        """Remove a key-value pair."""
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx].pop(i)
                self.count -= 1
                return
        raise KeyError(key)

ht = HashTable()
ht.put("name", "Alice")
ht.put("age", 30)
ht.put("name", "Bob")  # Update existing key
print(ht.get("name"))  # Output: Bob
print(ht.get("age"))   # Output: 30`}
      />

      <h2>When O(1) Becomes O(n)</h2>
      <p>
        Hash table lookup is O(1) <em>on average</em>, but O(n) in the worst
        case. The worst case happens when all keys hash to the same index,
        degenerating the hash table into a single linked list. This can happen
        with a poor hash function or adversarial input. Python mitigates this
        by using a sophisticated hash function with randomized salt, making
        collision attacks impractical.
      </p>

      <InteractiveQuestion
        id="hash-q2"
        question="Hash table lookup is O(1) average but O(n) worst case. When does the worst case happen?"
        options={[
          { text: "When all keys hash to the same index (everything in one bucket)", feedback: "Correct! If the hash function is poor or adversarial inputs are chosen, all n elements can end up in the same bucket, degenerating to a linked list search." },
          { text: "When the table is empty", feedback: "An empty table lookup is O(1) — you immediately find nothing at the target index." },
          { text: "When searching for a key that does not exist", feedback: "Missing keys are typically O(1) average — you check one short bucket." },
          { text: "When the table has exactly one element", feedback: "One element means one bucket entry — lookup is O(1)." },
        ]}
        correctIndex={0}
        hint="Think about what happens when the hash function produces the same output for many different inputs."
        explanation="The worst case is all keys colliding into a single bucket, making lookup O(n). This is why a good hash function with uniform distribution is critical."
      />

      <InteractiveQuestion
        id="hash-q3"
        question="Why do hash tables typically resize when the load factor exceeds 0.75?"
        options={[
          { text: "To keep the average bucket length short and maintain O(1) lookup", feedback: "Correct! As the load factor grows, buckets get longer and lookup slows down. Resizing keeps the average chain length near 1, preserving constant-time performance." },
          { text: "Because the hash function stops working above 0.75", feedback: "The hash function works at any load factor; it is the collision rate that becomes problematic." },
          { text: "To save memory", feedback: "Resizing (usually doubling) actually uses more memory, not less. The goal is performance." },
          { text: "Because 0.75 is an arbitrary convention with no real benefit", feedback: "The 0.75 threshold is well-chosen: it balances space efficiency with collision probability. Much higher leads to too many collisions; much lower wastes space." },
        ]}
        correctIndex={0}
        hint="What happens to the average number of elements per bucket as load factor increases?"
        explanation="At load factor 0.75, on average 75% of slots are occupied. Beyond this, collision chains grow quickly. Resizing doubles the table and rehashes, restoring short chains."
      />

      <h3>Real-World Applications</h3>
      <p>Hash tables power some of the most common operations in software:</p>
      <ul>
        <li>Database indexing and caching (Redis, Memcached)</li>
        <li>Detecting duplicate values in O(n) time</li>
        <li>Counting word frequencies in text</li>
        <li>Implementing sets (unique collections)</li>
        <li>Symbol tables in compilers and interpreters</li>
        <li>Router lookup tables in networking</li>
      </ul>

      <h3>Challenge</h3>
      <p>
        Using a hash table, write a function that finds the first duplicate
        in an array in O(n) time.
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Iterate through the array. For each element, check if it is already
          in a set (hash table). If yes, return it. If no, add it to the set.
          If you reach the end, there are no duplicates.
        </p>
        <CodeEditor
          language="python"
          initialCode={`def first_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return x
        seen.add(x)
    return None

print(first_duplicate([2, 1, 3, 5, 3, 2]))  # Output: 3`}
          description="The set uses a hash table internally, giving O(1) lookup per element and O(n) total."
        />
      </RevealAnswer>
    </div>
  );
}
