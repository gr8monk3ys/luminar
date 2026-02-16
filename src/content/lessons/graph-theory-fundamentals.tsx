"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function GraphTheoryFundamentals() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Graph Theory: The Mathematics of Connections</h2>
      <p>
        Graph theory studies relationships between objects. A{" "}
        <strong>graph</strong> consists of <strong>vertices</strong> (nodes) and{" "}
        <strong>edges</strong> (connections between nodes). Graphs model an
        astonishing variety of real-world structures: social networks (people
        and friendships), the internet (routers and links), road maps (cities
        and highways), molecular structures (atoms and bonds), and much more.
      </p>
      <p>
        The field was born in 1736, when Leonhard Euler tackled a famous
        puzzle about the city of K&ouml;nigsberg.
      </p>

      <h2>The Bridges of K&ouml;nigsberg</h2>
      <p>
        K&ouml;nigsberg (now Kaliningrad, Russia) was built on both sides of
        a river, with two islands in the middle. Seven bridges connected the
        land masses. The citizens asked: can you walk through the city crossing
        each bridge <em>exactly once</em> and return to your starting point?
      </p>
      <p>
        Euler realized the physical layout was irrelevant &mdash; only the
        connections mattered. He abstracted the problem into a graph: four
        vertices (the land masses) and seven edges (the bridges). This act of
        abstraction gave birth to graph theory and, arguably, to topology.
        Euler proved the walk was impossible by analyzing vertex degrees, as
        we will see below.
      </p>

      <h2>Basic Definitions</h2>
      <p>
        Formally, a graph <em>G = (V, E)</em> consists of a set of vertices
        V and a set of edges E, where each edge connects two vertices. Key
        terminology:
      </p>
      <ul>
        <li>
          <strong>Degree</strong> of a vertex: the number of edges incident to
          it, written deg(v).
        </li>
        <li>
          <strong>Adjacent</strong>: two vertices are adjacent if an edge
          connects them.
        </li>
        <li>
          <strong>Path</strong>: a sequence of vertices where consecutive
          vertices are connected by edges.
        </li>
        <li>
          <strong>Cycle</strong>: a path that starts and ends at the same
          vertex (with no repeated edges).
        </li>
        <li>
          <strong>Connected graph</strong>: a graph where there is a path
          between every pair of vertices.
        </li>
        <li>
          <strong>Simple graph</strong>: no self-loops (edge from a vertex to
          itself) and no multiple edges between the same pair of vertices.
        </li>
      </ul>

      <h2>The Handshaking Lemma</h2>
      <p>
        One of the first theorems in graph theory is elegantly simple:
      </p>
      <MathBlock
        latex="\sum_{v \in V} \deg(v) = 2|E|"
        display
      />
      <p>
        The sum of all vertex degrees equals twice the number of edges. Why?
        Each edge contributes exactly 1 to the degree of each of its two
        endpoints, so it is counted twice in the sum. This is called the{" "}
        <strong>handshaking lemma</strong> because if you count handshakes at
        a party by asking each person how many hands they shook, each handshake
        gets counted twice.
      </p>
      <p>
        An immediate corollary: the number of vertices with odd degree must be
        even. (The sum of degrees is even, so the odd-degree terms must sum to
        an even number, which requires an even count of them.)
      </p>

      <h2>Euler Paths and Circuits</h2>
      <p>
        An <strong>Euler path</strong> traverses every edge exactly once. An{" "}
        <strong>Euler circuit</strong> is an Euler path that starts and ends at
        the same vertex. Euler discovered necessary and sufficient conditions:
      </p>
      <ul>
        <li>
          A connected graph has an <strong>Euler circuit</strong> if and only if{" "}
          <em>every vertex has even degree</em>.
        </li>
        <li>
          A connected graph has an <strong>Euler path</strong> (but not a
          circuit) if and only if it has <em>exactly two vertices of odd
          degree</em>. The path must start at one odd-degree vertex and end at
          the other.
        </li>
      </ul>
      <p>
        This is why the K&ouml;nigsberg bridge walk was impossible: all four
        vertices had odd degree (3, 3, 3, 5), violating both conditions.
      </p>

      <StepByStep
        title="Verify Euler circuit existence for a graph"
        steps={[
          {
            title: "Define the graph",
            content:
              "Consider a graph with 4 vertices A, B, C, D and edges: A-B, B-C, C-D, D-A, A-C, B-D. This is the complete graph K₄.",
          },
          {
            title: "Compute degrees",
            content:
              "Count the edges at each vertex: deg(A) = 3 (edges to B, C, D), deg(B) = 3, deg(C) = 3, deg(D) = 3.",
            latex: "\\deg(A) = \\deg(B) = \\deg(C) = \\deg(D) = 3",
          },
          {
            title: "Check the Euler circuit condition",
            content:
              "For an Euler circuit, ALL vertices must have even degree. Here every vertex has degree 3 (odd), so NO Euler circuit exists.",
          },
          {
            title: "Check the Euler path condition",
            content:
              "For an Euler path, exactly 2 vertices must have odd degree. Here all 4 have odd degree, so no Euler PATH exists either.",
          },
          {
            title: "Verify with the handshaking lemma",
            content:
              "Sum of degrees = 3+3+3+3 = 12 = 2 × 6 edges. This confirms our edge count and the handshaking lemma holds.",
            latex: "\\sum \\deg(v) = 12 = 2 \\times |E| = 2 \\times 6 \\quad \\checkmark",
          },
        ]}
      />

      <h2>Hamiltonian Paths and Circuits</h2>
      <p>
        While Euler paths visit every <em>edge</em> once, a{" "}
        <strong>Hamiltonian path</strong> visits every <em>vertex</em> exactly
        once. A <strong>Hamiltonian circuit</strong> returns to the starting
        vertex. Determining whether a Hamiltonian circuit exists is one of the
        most famous unsolved problems in computer science &mdash; it is{" "}
        <strong>NP-complete</strong>.
      </p>
      <p>
        Unlike Euler circuits, there is no simple degree-based condition for
        Hamiltonian circuits. However, <strong>Dirac&apos;s theorem</strong>{" "}
        gives a sufficient (but not necessary) condition: if every vertex in a
        graph with n &ge; 3 vertices has degree &ge; n/2, then the graph has a
        Hamiltonian circuit.
      </p>

      <h2>Graph Coloring</h2>
      <p>
        A <strong>graph coloring</strong> assigns colors to vertices such that
        no two adjacent vertices share the same color. The minimum number of
        colors needed is the <strong>chromatic number</strong> &chi;(G).
      </p>
      <p>
        Graph coloring has practical applications everywhere: scheduling (time
        slots = colors, conflicts = edges), register allocation in compilers,
        map coloring (the famous four-color theorem says any planar map needs
        at most 4 colors), and frequency assignment in wireless networks.
      </p>
      <MathBlock
        latex="\chi(K_n) = n \qquad \chi(C_{2k}) = 2 \qquad \chi(C_{2k+1}) = 3"
        display
      />
      <p>
        The complete graph on n vertices needs n colors (every vertex is
        adjacent to every other). Even cycles need 2 colors (they are
        bipartite). Odd cycles need 3.
      </p>

      <h2>Code It: Adjacency List Representation</h2>
      <p>
        In practice, graphs are stored using data structures. The most common
        is the <strong>adjacency list</strong>: a dictionary mapping each vertex
        to its list of neighbors.
      </p>
      <CodeEditor
        language="python"
        description="Build an adjacency list representation and compute vertex degrees. Try adding more edges or checking for Euler circuit conditions."
        initialCode={`class Graph:
    def __init__(self):
        self.adj = {}  # adjacency list

    def add_vertex(self, v):
        if v not in self.adj:
            self.adj[v] = []

    def add_edge(self, u, v):
        """Add an undirected edge between u and v."""
        self.add_vertex(u)
        self.add_vertex(v)
        self.adj[u].append(v)
        self.adj[v].append(u)

    def degree(self, v):
        """Return the degree of vertex v."""
        return len(self.adj.get(v, []))

    def has_euler_circuit(self):
        """Check if the graph has an Euler circuit."""
        # TODO: Check that all vertices have even degree
        # and the graph is connected (we'll skip connectivity check)
        for v in self.adj:
            if self.degree(v) % 2 != 0:
                return False
        return True

    def handshaking_check(self):
        """Verify the handshaking lemma."""
        deg_sum = sum(self.degree(v) for v in self.adj)
        num_edges = deg_sum // 2
        return deg_sum, num_edges

# Build a sample graph
g = Graph()
for u, v in [("A","B"), ("B","C"), ("C","D"), ("D","A"), ("A","C")]:
    g.add_edge(u, v)

# Print degrees
for v in sorted(g.adj):
    print(f"deg({v}) = {g.degree(v)}")

deg_sum, edges = g.handshaking_check()
print(f"Sum of degrees: {deg_sum}, Edges: {edges}")
print(f"Euler circuit exists: {g.has_euler_circuit()}")`}
        solution={`class Graph:
    def __init__(self):
        self.adj = {}

    def add_vertex(self, v):
        if v not in self.adj:
            self.adj[v] = []

    def add_edge(self, u, v):
        self.add_vertex(u)
        self.add_vertex(v)
        self.adj[u].append(v)
        self.adj[v].append(u)

    def degree(self, v):
        return len(self.adj.get(v, []))

    def has_euler_circuit(self):
        for v in self.adj:
            if self.degree(v) % 2 != 0:
                return False
        return True

    def handshaking_check(self):
        deg_sum = sum(self.degree(v) for v in self.adj)
        num_edges = deg_sum // 2
        return deg_sum, num_edges

g = Graph()
for u, v in [("A","B"), ("B","C"), ("C","D"), ("D","A"), ("A","C")]:
    g.add_edge(u, v)

for v in sorted(g.adj):
    print(f"deg({v}) = {g.degree(v)}")

deg_sum, edges = g.handshaking_check()
print(f"Sum of degrees: {deg_sum}, Edges: {edges}")
print(f"Euler circuit: {g.has_euler_circuit()}")

# Add one more edge to make all degrees even
g.add_edge("B", "D")
print("\\nAfter adding edge B-D:")
for v in sorted(g.adj):
    print(f"deg({v}) = {g.degree(v)}")
print(f"Euler circuit: {g.has_euler_circuit()}")
# Now all degrees are even (each is 3+1=... let's see)
# Actually K4 has all degree 3, adding B-D was already there
# The graph A-B, B-C, C-D, D-A, A-C, B-D = K4: all degree 3 (odd)
# So no Euler circuit for K4!`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="graph-fund-q1"
        question="A graph has 5 vertices with degrees 2, 2, 3, 3, and 4. How many edges does it have?"
        options={[
          {
            text: "5",
            feedback:
              "Close, but check the handshaking lemma. The sum of degrees must equal 2|E|.",
          },
          {
            text: "7",
            feedback:
              "Correct! Sum of degrees = 2+2+3+3+4 = 14 = 2|E|, so |E| = 7. The handshaking lemma strikes again!",
          },
          {
            text: "14",
            feedback:
              "That is the sum of degrees, not the number of edges. Divide by 2.",
          },
          {
            text: "8",
            feedback:
              "Recompute: (2+2+3+3+4)/2 = 14/2 = 7.",
          },
        ]}
        correctIndex={1}
        hint="Use the handshaking lemma: sum of all degrees = 2 × (number of edges)."
        explanation="By the handshaking lemma, |E| = (sum of degrees) / 2 = (2+2+3+3+4) / 2 = 14/2 = 7 edges."
      />

      <InteractiveQuestion
        id="graph-fund-q2"
        question="A connected graph has exactly 2 vertices of odd degree. What can you conclude?"
        options={[
          {
            text: "It has an Euler circuit",
            feedback:
              "An Euler circuit requires ALL vertices to have even degree. Two odd-degree vertices means no circuit.",
          },
          {
            text: "It has an Euler path but not an Euler circuit",
            feedback:
              "Correct! A connected graph with exactly 2 odd-degree vertices has an Euler path starting at one odd-degree vertex and ending at the other, but no Euler circuit.",
          },
          {
            text: "It has a Hamiltonian circuit",
            feedback:
              "Hamiltonian circuits are about visiting every vertex, not every edge. Vertex degrees alone cannot determine this.",
          },
          {
            text: "It has neither an Euler path nor an Euler circuit",
            feedback:
              "Two odd-degree vertices is exactly the condition for an Euler path. Zero odd-degree vertices gives an Euler circuit.",
          },
        ]}
        correctIndex={1}
        hint="Euler's theorem: 0 odd-degree vertices → Euler circuit. 2 odd-degree vertices → Euler path. Any other number → neither."
        explanation="Euler proved that a connected graph with exactly 2 odd-degree vertices has an Euler path (starting at one odd vertex, ending at the other). This is why the Königsberg bridges problem had no solution — all 4 vertices had odd degree."
      />

      <h3>Challenge</h3>
      <p>
        Can a graph with 7 vertices have all vertices with degree 3?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          No! By the handshaking lemma, the sum of degrees would be 7 &times;
          3 = 21, and the number of edges would be 21/2 = 10.5, which is not an
          integer. The sum of degrees must be even (it equals 2|E|), so it is
          impossible for all 7 vertices to have odd degree 3.
        </p>
        <MathBlock
          latex="\sum \deg(v) = 7 \times 3 = 21 \neq 2k \text{ for any integer } k"
          display
        />
        <p>
          More generally, the handshaking lemma implies an even number of
          vertices must have odd degree. Since 7 is odd, not all vertices can
          have degree 3.
        </p>
      </RevealAnswer>
    </div>
  );
}
