"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function TreesAndSpanning() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Trees: The Lean, Connected Graphs</h2>
      <p>
        A <strong>tree</strong> is one of the most fundamental structures in
        both mathematics and computer science. Intuitively, a tree is a graph
        that is connected but contains no cycles &mdash; it is the{" "}
        <em>most economical</em> way to connect a set of vertices. Remove any
        edge and the graph disconnects. Add any edge and you create a cycle.
        Trees are perfectly balanced between connectivity and minimality.
      </p>
      <p>
        You have already encountered trees in many contexts: family trees,
        organizational charts, file system directories, HTML DOM, decision
        trees in machine learning, and binary search trees in data structures.
        In this lesson, we study their mathematical properties and their role
        in graph theory through <strong>spanning trees</strong>.
      </p>

      <h2>Equivalent Definitions of a Tree</h2>
      <p>
        Remarkably, the following conditions are all equivalent for a graph
        G with n vertices:
      </p>
      <ul>
        <li>G is connected and has no cycles (the standard definition).</li>
        <li>G is connected and has exactly n &minus; 1 edges.</li>
        <li>G has no cycles and has exactly n &minus; 1 edges.</li>
        <li>
          There is exactly one path between every pair of vertices in G.
        </li>
        <li>
          G is connected, but removing any single edge disconnects it (G is{" "}
          <em>minimally connected</em>).
        </li>
        <li>
          G has no cycles, but adding any single edge creates exactly one
          cycle (G is <em>maximally acyclic</em>).
        </li>
      </ul>
      <p>
        The key number to remember is <strong>n &minus; 1</strong>: a tree
        on n vertices always has exactly n &minus; 1 edges. No more, no less.
      </p>
      <MathBlock
        latex="\text{Tree with } n \text{ vertices} \implies |E| = n - 1"
        display
      />

      <h2>Rooted vs. Unrooted Trees</h2>
      <p>
        An <strong>unrooted tree</strong> is simply a tree as defined above
        &mdash; there is no distinguished vertex. All vertices are on equal
        footing.
      </p>
      <p>
        A <strong>rooted tree</strong> designates one vertex as the{" "}
        <strong>root</strong>. This creates a natural hierarchy: the root is
        at the &ldquo;top,&rdquo; and every other vertex has a unique{" "}
        <strong>parent</strong> (the next vertex on the path toward the root)
        and zero or more <strong>children</strong> (adjacent vertices farther
        from the root).
      </p>
      <ul>
        <li>
          <strong>Leaf</strong>: a vertex with no children (degree 1 in the
          unrooted tree, except for a root with one child).
        </li>
        <li>
          <strong>Internal vertex</strong>: a vertex with at least one child.
        </li>
        <li>
          <strong>Depth</strong> of a vertex: the length of the path from the
          root to that vertex.
        </li>
        <li>
          <strong>Height</strong> of the tree: the maximum depth among all
          vertices.
        </li>
      </ul>

      <h2>Spanning Trees</h2>
      <p>
        Given a connected graph G, a <strong>spanning tree</strong> is a
        subgraph that is a tree and includes <em>every vertex</em> of G. In
        other words, it is a subset of the edges that keeps the graph connected
        while eliminating all cycles. Every connected graph has at least one
        spanning tree (and usually many).
      </p>
      <MathBlock
        latex="\text{If } G \text{ has } n \text{ vertices and is connected, any spanning tree of } G \text{ has exactly } n - 1 \text{ edges.}"
        display
      />
      <p>
        Spanning trees are crucial in networking: to broadcast a message to all
        nodes in a network, you want to use a spanning tree to avoid
        redundant transmissions along cycles.
      </p>

      <h2>Minimum Spanning Trees</h2>
      <p>
        If each edge in a graph has a <strong>weight</strong> (cost), the{" "}
        <strong>minimum spanning tree (MST)</strong> is the spanning tree with
        the smallest total edge weight. MSTs solve the problem: &ldquo;connect
        all nodes at minimum cost.&rdquo;
      </p>
      <p>
        Real-world applications include designing road networks, laying cable
        or pipe, circuit design, and clustering in data science. Two classic
        algorithms find MSTs efficiently:
      </p>
      <ul>
        <li>
          <strong>Kruskal&apos;s algorithm</strong>: Sort all edges by weight.
          Add edges one by one (smallest first), skipping any edge that would
          create a cycle. Stop when you have n &minus; 1 edges.
        </li>
        <li>
          <strong>Prim&apos;s algorithm</strong>: Start from any vertex. At
          each step, add the lightest edge connecting a vertex in the tree to
          a vertex outside the tree. Repeat until all vertices are included.
        </li>
      </ul>
      <p>
        Both algorithms are <strong>greedy</strong> &mdash; they make the
        locally optimal choice at each step &mdash; and both produce an
        optimal MST. This is one of the beautiful cases where greed works!
      </p>

      <h2>Worked Example: Kruskal&apos;s Algorithm</h2>
      <StepByStep
        title="Find the MST using Kruskal's algorithm"
        steps={[
          {
            title: "Define the weighted graph",
            content:
              "Consider 5 vertices {A, B, C, D, E} with weighted edges: A-B(4), A-C(2), B-C(5), B-D(10), C-D(3), C-E(8), D-E(7).",
          },
          {
            title: "Sort edges by weight",
            content:
              "Sorted: A-C(2), C-D(3), A-B(4), B-C(5), D-E(7), C-E(8), B-D(10).",
          },
          {
            title: "Process edge A-C (weight 2)",
            content:
              "A and C are in different components. Add A-C. MST edges so far: {A-C}. Total weight: 2.",
          },
          {
            title: "Process edge C-D (weight 3)",
            content:
              "C and D are in different components. Add C-D. MST edges: {A-C, C-D}. Total weight: 5.",
          },
          {
            title: "Process edge A-B (weight 4)",
            content:
              "A and B are in different components. Add A-B. MST edges: {A-C, C-D, A-B}. Total weight: 9.",
          },
          {
            title: "Process edge B-C (weight 5)",
            content:
              "B and C are already connected (via A). Adding B-C would create a cycle A-B-C-A. SKIP this edge.",
          },
          {
            title: "Process edge D-E (weight 7)",
            content:
              "D and E are in different components. Add D-E. MST edges: {A-C, C-D, A-B, D-E}. Total weight: 16.",
          },
          {
            title: "Done!",
            content:
              "We have 4 edges connecting 5 vertices (n-1 = 4). The MST has total weight 16. Edges: A-C(2), C-D(3), A-B(4), D-E(7).",
            latex: "\\text{MST weight} = 2 + 3 + 4 + 7 = 16",
          },
        ]}
      />

      <h2>Implementation: Kruskal&apos;s with Union-Find</h2>
      <p>
        Kruskal&apos;s algorithm needs to efficiently detect cycles. The{" "}
        <strong>Union-Find</strong> (disjoint set) data structure handles this
        in nearly O(1) per operation. Here is a complete implementation:
      </p>
      <CodeEditor
        language="python"
        description="Kruskal's algorithm using Union-Find for cycle detection. Try changing the edges and weights."
        initialCode={`class UnionFind:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False  # already connected (would create cycle)
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

def kruskal(vertices, edges):
    """Find MST using Kruskal's algorithm.
    edges: list of (weight, u, v)
    """
    edges.sort()  # sort by weight
    uf = UnionFind(vertices)
    mst = []

    for weight, u, v in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            if len(mst) == len(vertices) - 1:
                break

    return mst

# Example graph
vertices = ["A", "B", "C", "D", "E"]
edges = [
    (4, "A", "B"), (2, "A", "C"), (5, "B", "C"),
    (10, "B", "D"), (3, "C", "D"), (8, "C", "E"), (7, "D", "E"),
]

mst = kruskal(vertices, edges)
total = sum(w for _, _, w in mst)
print("MST edges:")
for u, v, w in mst:
    print(f"  {u}-{v} (weight {w})")
print(f"Total MST weight: {total}")`}
        solution={`class UnionFind:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

def kruskal(vertices, edges):
    edges.sort()
    uf = UnionFind(vertices)
    mst = []
    for weight, u, v in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            if len(mst) == len(vertices) - 1:
                break
    return mst

vertices = ["A", "B", "C", "D", "E"]
edges = [
    (4, "A", "B"), (2, "A", "C"), (5, "B", "C"),
    (10, "B", "D"), (3, "C", "D"), (8, "C", "E"), (7, "D", "E"),
]

mst = kruskal(vertices, edges)
total = sum(w for _, _, w in mst)
print("MST edges:")
for u, v, w in mst:
    print(f"  {u}-{v} (weight {w})")
print(f"Total MST weight: {total}")
# Output:
#   A-C (weight 2)
#   C-D (weight 3)
#   A-B (weight 4)
#   D-E (weight 7)
# Total MST weight: 16`}
      />

      <h2>Why Trees Have n &minus; 1 Edges</h2>
      <p>
        This is one of the most fundamental properties of trees. We can prove
        it by induction on the number of vertices.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="trees-spanning-q1"
        question="A tree with 10 vertices has how many edges?"
        options={[
          {
            text: "10",
            feedback:
              "A graph with n vertices and n edges has exactly one cycle — it is not a tree.",
          },
          {
            text: "9",
            feedback:
              "Correct! A tree with n vertices always has exactly n - 1 edges. This is one of the fundamental properties of trees.",
          },
          {
            text: "11",
            feedback:
              "A connected graph with more than n-1 edges must contain at least one cycle, so it cannot be a tree.",
          },
          {
            text: "It depends on the structure of the tree",
            feedback:
              "Actually, every tree with n vertices has exactly n - 1 edges, regardless of its shape. This is a theorem, not a coincidence.",
          },
        ]}
        correctIndex={1}
        hint="One of the equivalent definitions of a tree: connected with exactly n - 1 edges."
        explanation="A tree with n vertices always has n - 1 edges. This holds whether the tree is a path (1-2-3-...-10), a star (one center connected to all others), or any other tree shape."
      />

      <InteractiveQuestion
        id="trees-spanning-q2"
        question="In Kruskal's algorithm, why do we skip an edge that would create a cycle?"
        options={[
          {
            text: "Because cycles make the graph disconnected",
            feedback:
              "Cycles do not disconnect a graph — they add redundant connections. The issue is that trees must be acyclic.",
          },
          {
            text: "Because a spanning tree must be acyclic, and adding a cycle edge would give more than n-1 edges",
            feedback:
              "Correct! A spanning tree has exactly n-1 edges and no cycles. Any additional edge would create a cycle, meaning it is not a tree.",
          },
          {
            text: "Because the edge must have the wrong weight",
            feedback:
              "The weight does not determine whether an edge creates a cycle. The graph structure does.",
          },
          {
            text: "Because the algorithm only works on directed graphs",
            feedback:
              "Kruskal's algorithm works on undirected graphs. The cycle-checking is about maintaining the tree property.",
          },
        ]}
        correctIndex={1}
        hint="What property distinguishes a tree from a general connected graph?"
        explanation="A spanning tree must be a tree — connected and acyclic with exactly n-1 edges. If we add an edge that connects two already-connected vertices, it creates a cycle, violating the tree property. Kruskal's skips such edges."
      />

      <h3>Challenge: Prove Trees Have n &minus; 1 Edges</h3>
      <RevealAnswer label="Show proof">
        <p>
          <strong>Proof by induction on n (number of vertices):</strong>
        </p>
        <p>
          <strong>Base case (n = 1):</strong> A single vertex with no edges
          is a tree. It has 1 &minus; 1 = 0 edges. &check;
        </p>
        <p>
          <strong>Inductive step:</strong> Assume every tree with k vertices
          has k &minus; 1 edges. Let T be a tree with k + 1 vertices.
        </p>
        <p>
          Since T is a finite tree with at least 2 vertices, it has at least
          one leaf &ell; (a vertex of degree 1). Remove &ell; and its
          single edge. The resulting graph T&prime; has k vertices and is still
          connected (removing a leaf does not disconnect a tree) and still
          acyclic (removing an edge cannot create a cycle). So T&prime; is a
          tree with k vertices.
        </p>
        <p>
          By the inductive hypothesis, T&prime; has k &minus; 1 edges. Since
          we removed exactly one edge to get T&prime; from T, the original
          tree T has (k &minus; 1) + 1 = k edges = (k + 1) &minus; 1 edges.
        </p>
        <MathBlock
          latex="|E(T)| = |E(T')| + 1 = (k-1) + 1 = k = (k+1) - 1 \quad \blacksquare"
          display
        />
      </RevealAnswer>
    </div>
  );
}
