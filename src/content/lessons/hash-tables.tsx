"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function HashTables() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Hash Tables</h2>

      <p>
        Hash tables are arguably the most important data structure in practical programming.
        They achieve <strong>O(1) average-case</strong> lookup, insertion, and deletion —
        constant time regardless of the number of elements. Python&apos;s <code>dict</code>,
        JavaScript&apos;s <code>Object</code>, and Java&apos;s <code>HashMap</code> are all
        hash tables under the hood.
      </p>

      <h3>How It Works</h3>
      <p>
        A hash table uses a <strong>hash function</strong> to convert keys into array
        indices. Given a key (like a string), the hash function computes an integer, and
        we use modulo to map it to an array position:
      </p>
      <MathBlock latex="\text{index} = \text{hash}(\text{key}) \mod \text{table\_size}" />

      <StepByStep
        title="Inserting into a Hash Table"
        steps={[
          { title: "Hash the key", content: "For key 'apple', compute hash('apple') = 1234567." },
          { title: "Compute index", content: "With table size 10: 1234567 mod 10 = 7. Store at index 7." },
          { title: "Handle collisions", content: "If index 7 is occupied, we need a collision resolution strategy: chaining (linked list at each slot) or open addressing (probe next slots)." },
        ]}
      />

      <InteractiveQuestion
        id="hash-q1"
        question="Two different keys hash to the same index. What is this called?"
        options={[
          { text: "A collision", feedback: "Correct! Collisions are inevitable by the pigeonhole principle — if you have more possible keys than array slots, some keys must share slots." },
          { text: "An overflow", feedback: "Overflow refers to exceeding memory limits, not shared indices." },
          { text: "A hash error", feedback: "Collisions are normal and expected, not errors." },
          { text: "A deadlock", feedback: "Deadlocks are a concurrency concept, unrelated to hashing." },
        ]}
        correctIndex={0}
        explanation="By the pigeonhole principle, if you hash more unique keys than table slots, collisions are guaranteed. Good hash tables handle collisions gracefully."
      />

      <h3>Collision Resolution: Chaining</h3>
      <p>
        The simplest strategy: each slot holds a linked list (or array). Colliding keys
        are added to the list at that slot. Lookup searches the list at the hashed index.
      </p>
      <p>
        With a good hash function and a load factor (n/table_size) below 0.75, the average
        list length stays near 1, keeping operations O(1) on average.
      </p>

      <h3>Implementation</h3>

      <CodeEditor
        language="python"
        description="Implement a hash table with chaining."
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
        # TODO: Check if key exists, update if so
        # Otherwise append new pair
        pass

    def get(self, key):
        """Get value by key. Raise KeyError if not found."""
        idx = self._hash(key)
        # TODO: Search bucket for key
        pass

    def delete(self, key):
        """Remove a key-value pair."""
        idx = self._hash(key)
        # TODO: Find and remove from bucket
        pass

# Test
ht = HashTable()
ht.put("name", "Alice")
ht.put("age", 30)
print(ht.get("name"))  # Alice
print(ht.get("age"))   # 30`}
        solution={`class HashTable:
    def __init__(self, size=16):
        self.size = size
        self.buckets = [[] for _ in range(size)]
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))
        self.count += 1

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        raise KeyError(key)

    def delete(self, key):
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
print(ht.get("name"))  # Alice
print(ht.get("age"))   # 30`}
      />

      <InteractiveQuestion
        id="hash-q2"
        question="Hash table lookup is O(1) average but O(n) worst case. When does the worst case happen?"
        options={[
          { text: "When all keys hash to the same index (everything in one bucket)", feedback: "Correct! If the hash function is poor or adversarial inputs are chosen, all n elements can end up in the same bucket, degenerating to a linked list search." },
          { text: "When the table is empty", feedback: "An empty table lookup is O(1) — you immediately find nothing." },
          { text: "When searching for a key that doesn't exist", feedback: "Missing keys are typically O(1) average — you check one bucket." },
        ]}
        correctIndex={0}
        hint="Think about what happens when the hash function produces the same output for many inputs."
        explanation="The worst case is all keys colliding into a single bucket, making lookup O(n). This is why a good hash function with uniform distribution is critical. Python uses a sophisticated hash function resistant to these attacks."
      />
    </div>
  );
}
