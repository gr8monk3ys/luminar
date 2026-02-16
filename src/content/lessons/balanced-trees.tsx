"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BalancedTrees() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Why Balance Matters</h2>
      <p>
        A binary search tree promises O(log n) operations &mdash; but only
        if the tree is <em>balanced</em>. Insert the keys 1, 2, 3, 4, 5 into
        a plain BST and you get a degenerate chain leaning entirely to the
        right. Every operation walks the full chain: O(n), no better than a
        linked list.
      </p>
      <MathBlock
        latex="\text{Balanced BST: } h = O(\log n) \qquad \text{Degenerate BST: } h = O(n)"
        display
      />
      <p>
        This is not just a theoretical curiosity. In practice, real-world
        data is often sorted or nearly sorted (timestamps, sequential IDs,
        alphabetically ordered names), which is exactly the input that
        produces degenerate BSTs. We need trees that{" "}
        <strong>automatically rebalance</strong> after every insertion and
        deletion.
      </p>

      <h2>The AVL Tree</h2>
      <p>
        Named after its inventors Adelson-Velsky and Landis (1962), the{" "}
        <strong>AVL tree</strong> was the first self-balancing BST. It
        enforces a simple invariant: at every node, the heights of the left
        and right subtrees differ by at most 1.
      </p>

      <h3>Balance Factor</h3>
      <p>
        For each node, the <strong>balance factor</strong> is defined as:
      </p>
      <MathBlock
        latex="\text{BF}(node) = \text{height}(\text{left subtree}) - \text{height}(\text{right subtree})"
        display
      />
      <p>
        The AVL property requires:
      </p>
      <MathBlock
        latex="\text{BF}(node) \in \{-1, \; 0, \; +1\} \quad \text{for every node in the tree.}"
        display
      />
      <p>
        A balance factor of 0 means perfect balance. +1 means the left
        subtree is one level taller. -1 means the right subtree is one
        level taller. Any value outside {"{-1, 0, +1}"} triggers a{" "}
        <strong>rotation</strong> to restore balance.
      </p>

      <h2>Height Guarantee</h2>
      <p>
        The AVL invariant guarantees that the height of a tree with n nodes
        satisfies:
      </p>
      <MathBlock
        latex="h < 1.4405 \cdot \log_2(n + 2) - 0.3277 \approx 1.44 \log_2 n"
        display
      />
      <p>
        This means AVL trees are at most 44% taller than a perfectly
        balanced tree. All operations (search, insert, delete) remain
        O(log n) in the <em>worst</em> case &mdash; no pathological inputs
        can degrade performance.
      </p>

      <h2>The Four Rotations</h2>
      <p>
        When an insertion or deletion causes a balance factor of +2 or -2 at
        some node, we fix it with one or two rotations. There are four cases:
      </p>

      <h3>Case 1: Left-Left (LL) &mdash; Right Rotation</h3>
      <p>
        The imbalance is in the left child&apos;s left subtree (BF = +2, left
        child BF = +1 or 0). Fix with a single right rotation at the
        imbalanced node.
      </p>
      <MathBlock
        latex="\text{Right rotation at } z: \quad z.\text{left} = y, \; y.\text{left} = x \implies y \text{ becomes new root, } z \text{ becomes } y.\text{right}"
        display
      />

      <h3>Case 2: Right-Right (RR) &mdash; Left Rotation</h3>
      <p>
        Mirror of LL. The imbalance is in the right child&apos;s right subtree
        (BF = -2, right child BF = -1 or 0). Fix with a single left
        rotation.
      </p>

      <h3>Case 3: Left-Right (LR) &mdash; Double Rotation</h3>
      <p>
        The imbalance is in the left child&apos;s <em>right</em> subtree (BF
        = +2, left child BF = -1). A single rotation will not fix this.
        Instead: first left-rotate the left child, then right-rotate the
        node. Two rotations restore balance.
      </p>

      <h3>Case 4: Right-Left (RL) &mdash; Double Rotation</h3>
      <p>
        Mirror of LR. The imbalance is in the right child&apos;s{" "}
        <em>left</em> subtree. First right-rotate the right child, then
        left-rotate the node.
      </p>

      <h2>Step-by-Step AVL Insertion</h2>
      <StepByStep
        title="Insert 3, 2, 1, 4, 5, 6 into an AVL tree"
        steps={[
          {
            title: "Insert 3",
            content:
              "Tree: [3]. Single node, BF(3) = 0. No rotation needed.",
          },
          {
            title: "Insert 2",
            content:
              "Tree: 3 with left child 2. BF(3) = +1 (left is taller by 1). Still valid.",
          },
          {
            title: "Insert 1 → triggers LL rotation",
            content:
              "Before rotation: 3-2-1 (left chain). BF(3) = +2 (violation!). This is an LL case: the imbalance is at 3, caused by the left child's left subtree. Right-rotate at 3: node 2 becomes the new root, 1 is its left child, 3 is its right child. After rotation: [2, 1, 3]. All BFs are 0.",
          },
          {
            title: "Insert 4",
            content:
              "4 > 3, so it goes right of 3. Tree: [2, 1, 3, -, -, -, 4]. BF(3) = -1, BF(2) = -1. All valid.",
          },
          {
            title: "Insert 5 → triggers RR rotation at 3",
            content:
              "5 > 4, goes right of 4. Now BF(3) = -2 (violation!). This is an RR case at node 3. Left-rotate at 3: node 4 becomes the new subtree root with 3 as left child and 5 as right child. Tree becomes [2, 1, 4, -, -, 3, 5]. All BFs valid.",
          },
          {
            title: "Insert 6 → triggers RR rotation at 2",
            content:
              "6 > 5, goes right of 5. Now BF(2) = -2 (violation at the root!). RR case: left-rotate at 2. Node 4 becomes the new root, with 2 as left child and 5 as right child. 2 has children 1 and 3. 5 has right child 6. Final tree: [4, 2, 5, 1, 3, -, 6]. All BFs in {-1, 0, +1}. Height = 2 for 6 nodes (perfectly balanced!).",
          },
        ]}
      />

      <h2>Python AVL Rotation</h2>
      <CodeEditor
        language="python"
        description="Implement AVL tree node with left and right rotation methods."
        initialCode={`class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1  # height of subtree rooted here

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def update_height(node):
    node.height = 1 + max(get_height(node.left), get_height(node.right))

def right_rotate(z):
    """Perform right rotation at node z. Returns new root."""
    # TODO: y = z.left becomes new root
    # T3 = y.right goes to z.left
    # z becomes y.right
    # Update heights, return y
    pass

def left_rotate(z):
    """Perform left rotation at node z. Returns new root."""
    # TODO: y = z.right becomes new root
    # T2 = y.left goes to z.right
    # z becomes y.left
    # Update heights, return y
    pass

def insert(node, key):
    """Insert key into AVL tree, return new root."""
    # Standard BST insert
    if not node:
        return AVLNode(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    else:
        return node  # no duplicates

    update_height(node)
    balance = get_balance(node)

    # TODO: Check 4 rotation cases
    # LL: balance > 1 and key < node.left.key
    # RR: balance < -1 and key > node.right.key
    # LR: balance > 1 and key > node.left.key
    # RL: balance < -1 and key < node.right.key
    pass

    return node

# Test: insert sorted data (worst case for plain BST)
root = None
for key in [1, 2, 3, 4, 5, 6, 7]:
    root = insert(root, key)
print(f"Root: {root.key}, Height: {root.height}")
# Should print Root: 4, Height: 3 (balanced!)`}
        solution={`class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def update_height(node):
    node.height = 1 + max(get_height(node.left), get_height(node.right))

def right_rotate(z):
    """Perform right rotation at node z. Returns new root."""
    y = z.left
    T3 = y.right
    y.right = z
    z.left = T3
    update_height(z)
    update_height(y)
    return y

def left_rotate(z):
    """Perform left rotation at node z. Returns new root."""
    y = z.right
    T2 = y.left
    y.left = z
    z.right = T2
    update_height(z)
    update_height(y)
    return y

def insert(node, key):
    """Insert key into AVL tree, return new root."""
    if not node:
        return AVLNode(key)
    if key < node.key:
        node.left = insert(node.left, key)
    elif key > node.key:
        node.right = insert(node.right, key)
    else:
        return node

    update_height(node)
    balance = get_balance(node)

    # LL case
    if balance > 1 and key < node.left.key:
        return right_rotate(node)
    # RR case
    if balance < -1 and key > node.right.key:
        return left_rotate(node)
    # LR case
    if balance > 1 and key > node.left.key:
        node.left = left_rotate(node.left)
        return right_rotate(node)
    # RL case
    if balance < -1 and key < node.right.key:
        node.right = right_rotate(node.right)
        return left_rotate(node)

    return node

root = None
for key in [1, 2, 3, 4, 5, 6, 7]:
    root = insert(root, key)
print(f"Root: {root.key}, Height: {root.height}")
# Output: Root: 4, Height: 3 (balanced!)`}
      />

      <h2>AVL vs. Red-Black Trees</h2>
      <p>
        AVL trees and Red-Black trees are the two most widely used
        self-balancing BSTs. How do they compare?
      </p>
      <ul>
        <li>
          <strong>AVL trees</strong> are more strictly balanced (height
          &le; 1.44 log n), so <em>lookups</em> are faster. They are ideal
          for read-heavy workloads.
        </li>
        <li>
          <strong>Red-Black trees</strong> are more relaxed (height &le; 2
          log n), so they require fewer rotations during{" "}
          <em>insertions and deletions</em>. They are preferred for
          write-heavy workloads.
        </li>
        <li>
          Most standard libraries use Red-Black trees (C++ std::map, Java
          TreeMap) because insertion/deletion speed often matters more than
          the slightly faster lookups of AVL.
        </li>
      </ul>
      <RevealAnswer label="Show complexity comparison">
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>AVL Tree</th>
              <th>Red-Black Tree</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Search</td>
              <td>O(log n) — slightly faster in practice</td>
              <td>O(log n)</td>
            </tr>
            <tr>
              <td>Insert</td>
              <td>O(log n) — up to 2 rotations</td>
              <td>O(log n) — up to 2 rotations</td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>O(log n) — up to O(log n) rotations</td>
              <td>O(log n) — up to 3 rotations</td>
            </tr>
            <tr>
              <td>Height bound</td>
              <td>&le; 1.44 log₂(n)</td>
              <td>&le; 2 log₂(n+1)</td>
            </tr>
          </tbody>
        </table>
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="avl-q1"
        question="You insert keys [10, 20, 30] into an empty AVL tree. Which rotation is triggered and what is the resulting root?"
        options={[
          {
            text: "Right rotation at 30; root becomes 20",
            feedback:
              "The imbalance is at node 10 (BF = -2), not at 30. And this is an RR case, not LL.",
          },
          {
            text: "Left rotation at 10; root becomes 20",
            feedback:
              "Correct! After inserting 10, 20, 30: the tree is a right-leaning chain 10→20→30. BF(10) = -2 (RR case). Left-rotate at 10: node 20 becomes the root, 10 is its left child, 30 is its right child. All BFs become 0.",
          },
          {
            text: "Left-Right double rotation; root becomes 20",
            feedback:
              "A double rotation would be needed if the pattern were 10→30→20 (RL case). Since 10, 20, 30 is a straight chain, a single left rotation suffices.",
          },
          {
            text: "No rotation needed; root stays 10",
            feedback:
              "After inserting 30, BF(10) = 0 - 2 = -2, which violates the AVL property. A rotation is mandatory.",
          },
        ]}
        correctIndex={1}
        hint="Draw the tree after each insertion. After inserting 30, check the balance factor at each ancestor."
        explanation="Inserting 10, 20, 30 in order creates a right chain. BF(10) = height(left) - height(right) = 0 - 2 = -2. The right child (20) has BF = -1. This is the RR case: left-rotate at 10 to make 20 the root."
      />

      <InteractiveQuestion
        id="avl-q2"
        question="What is the maximum height of an AVL tree with 15 nodes?"
        options={[
          {
            text: "3",
            feedback:
              "A perfectly balanced tree with 15 nodes has height 3, but AVL trees can be slightly taller than perfect balance.",
          },
          {
            text: "4",
            feedback:
              "Correct! The minimum number of nodes in an AVL tree of height h follows Fibonacci-like recurrence: N(h) = N(h-1) + N(h-2) + 1. N(0)=1, N(1)=2, N(2)=4, N(3)=7, N(4)=12, N(5)=20. Since N(4)=12 ≤ 15 < 20=N(5), the maximum height is 4.",
          },
          {
            text: "5",
            feedback:
              "An AVL tree of height 5 needs at least N(5) = 20 nodes. With only 15 nodes, the maximum height is less.",
          },
          {
            text: "14",
            feedback:
              "That would be a degenerate (linked-list) tree. The AVL property prevents this — height is always O(log n).",
          },
        ]}
        correctIndex={1}
        hint="The sparsest (tallest) AVL tree of height h has N(h) = N(h-1) + N(h-2) + 1 nodes, similar to Fibonacci numbers."
        explanation="The minimum nodes for height h: N(0)=1, N(1)=2, N(2)=4, N(3)=7, N(4)=12, N(5)=20. Since 12 ≤ 15 < 20, an AVL tree with 15 nodes can have at most height 4. This is achieved when the tree is as 'sparse' as the AVL property allows."
      />
    </div>
  );
}
