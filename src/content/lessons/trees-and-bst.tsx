"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function TreesAndBST() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Trees and Binary Search Trees</h2>
      <p>
        A <strong>tree</strong> is a hierarchical data structure made of nodes
        connected by edges. Each tree has a single <strong>root</strong> node,
        and every other node has exactly one parent. Nodes with no children are
        called <strong>leaves</strong>. Trees model hierarchical relationships:
        file systems, HTML documents, organizational charts, and decision
        processes.
      </p>
      <p>
        A <strong>binary tree</strong> is a tree where each node has at most two
        children: a left child and a right child. A <strong>binary search tree
        (BST)</strong> adds one crucial constraint: for every node, all values
        in its left subtree are smaller, and all values in its right subtree are
        larger.
      </p>
      <MathBlock
        latex="\forall \text{ node } n: \text{left}(n) < n.\text{key} < \text{right}(n)"
        display
      />

      <h2>Why the BST Property Matters</h2>
      <p>
        The BST property enables <strong>binary search on a tree</strong>.
        At each node, you compare the target with the node&apos;s key and
        eliminate an entire subtree. On a balanced BST, this gives O(log n)
        search, insert, and delete &mdash; the same performance as binary search
        on a sorted array, but with efficient insertion.
      </p>
      <MathBlock
        latex="\text{Balanced BST: Search, Insert, Delete} = O(\log n)"
        display
      />

      <StepByStep
        title="Searching for 15 in a BST"
        steps={[
          {
            title: "Start at root: 20",
            content:
              "15 < 20, so go to the left child. We eliminate the entire right subtree.",
          },
          {
            title: "Visit node: 10",
            content:
              "15 > 10, so go to the right child. We eliminate the left subtree of 10.",
          },
          {
            title: "Visit node: 15",
            content:
              "15 == 15, found! We visited only 3 nodes out of potentially many. Each comparison eliminated half the remaining candidates.",
          },
        ]}
      />

      <h2>BST Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement a BST with insert and search. Each node has a key, left child, and right child."
        initialCode={`class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        """Insert a key into the BST."""
        if not self.root:
            self.root = BSTNode(key)
        else:
            self._insert(self.root, key)

    def _insert(self, node, key):
        # TODO: If key < node.key, go left; else go right
        # Create new node when you reach None
        pass

    def search(self, key):
        """Return True if key exists in BST."""
        return self._search(self.root, key)

    def _search(self, node, key):
        # TODO: Base cases and recursive search
        pass

    def inorder(self):
        """Return keys in sorted order (in-order traversal)."""
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.key)
            self._inorder(node.right, result)

bst = BST()
for key in [20, 10, 30, 5, 15, 25, 35]:
    bst.insert(key)
print(bst.inorder())       # Expected: [5, 10, 15, 20, 25, 30, 35]
print(bst.search(15))      # Expected: True
print(bst.search(42))      # Expected: False`}
        solution={`class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        """Insert a key into the BST."""
        if not self.root:
            self.root = BSTNode(key)
        else:
            self._insert(self.root, key)

    def _insert(self, node, key):
        if key < node.key:
            if node.left is None:
                node.left = BSTNode(key)
            else:
                self._insert(node.left, key)
        else:
            if node.right is None:
                node.right = BSTNode(key)
            else:
                self._insert(node.right, key)

    def search(self, key):
        """Return True if key exists in BST."""
        return self._search(self.root, key)

    def _search(self, node, key):
        if node is None:
            return False
        if key == node.key:
            return True
        elif key < node.key:
            return self._search(node.left, key)
        else:
            return self._search(node.right, key)

    def inorder(self):
        """Return keys in sorted order (in-order traversal)."""
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.key)
            self._inorder(node.right, result)

bst = BST()
for key in [20, 10, 30, 5, 15, 25, 35]:
    bst.insert(key)
print(bst.inorder())       # Output: [5, 10, 15, 20, 25, 30, 35]
print(bst.search(15))      # Output: True
print(bst.search(42))      # Output: False`}
      />

      <h2>In-Order Traversal Produces Sorted Output</h2>
      <p>
        A beautiful property of BSTs: if you visit nodes in{" "}
        <strong>in-order</strong> (left subtree, then current node, then right
        subtree), the keys come out in sorted order. This is because every left
        subtree contains only smaller values and every right subtree contains
        only larger values.
      </p>

      <InteractiveQuestion
        id="bst-q1"
        question="You insert keys [1, 2, 3, 4, 5] into an empty BST in that order. What shape does the tree form?"
        options={[
          { text: "A degenerate tree (essentially a linked list leaning right)", feedback: "Correct! When keys are inserted in sorted order, each new key is larger than all previous keys, so it always goes to the right child. The tree becomes a chain: 1 -> 2 -> 3 -> 4 -> 5. This is the worst case for a BST, with O(n) operations instead of O(log n)." },
          { text: "A perfectly balanced tree", feedback: "Balanced trees require careful insertion order or self-balancing algorithms. Sorted input produces the worst-case shape." },
          { text: "A complete binary tree", feedback: "A complete tree fills each level before starting the next. Sorted insertion creates a single chain." },
          { text: "It depends on the BST implementation", feedback: "For a standard (non-self-balancing) BST, sorted input always produces a degenerate tree." },
        ]}
        correctIndex={0}
        hint="For each insertion, ask: does the new key go left or right of the previous one?"
        explanation="Sorted input is the worst case for BSTs. Each key goes right, creating a linear chain with O(n) depth. This is why self-balancing BSTs (AVL, Red-Black) were invented — they guarantee O(log n) height."
      />

      <h2>Tree Height and Balance</h2>
      <p>
        The <strong>height</strong> of a tree is the number of edges on the
        longest path from root to leaf. A balanced BST has height O(log n),
        while a degenerate BST has height O(n). The height directly determines
        the performance of all operations.
      </p>
      <MathBlock
        latex="\text{Balanced: } h = O(\log n) \qquad \text{Degenerate: } h = O(n)"
        display
      />

      <InteractiveQuestion
        id="bst-q2"
        question="What traversal order visits nodes in this order: left subtree, right subtree, then root?"
        options={[
          { text: "Post-order traversal", feedback: "Correct! Post-order visits left, then right, then the current node. It is used for deleting trees (delete children before parent) and evaluating expression trees (evaluate operands before the operator)." },
          { text: "Pre-order traversal", feedback: "Pre-order visits the root first, then left, then right." },
          { text: "In-order traversal", feedback: "In-order visits left, then root, then right. It produces sorted output for BSTs." },
          { text: "Level-order traversal", feedback: "Level-order visits nodes level by level (BFS), not by subtree." },
        ]}
        correctIndex={0}
        hint="The root is visited last — after (post) both subtrees."
        explanation="The three depth-first traversals: pre-order (root, left, right), in-order (left, root, right), post-order (left, right, root). Each has different applications."
      />

      <h3>Challenge</h3>
      <p>
        Write a function to compute the height of a binary tree.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`def height(node):
    """Return the height of the tree rooted at node."""
    if node is None:
        return -1  # empty tree has height -1
    left_h = height(node.left)
    right_h = height(node.right)
    return 1 + max(left_h, right_h)

# For a balanced BST with 7 nodes, height = 2
# For a degenerate BST with 7 nodes, height = 6`}
          description="Recursive height: base case is -1 for None, then 1 + max of children's heights."
        />
      </RevealAnswer>
    </div>
  );
}
