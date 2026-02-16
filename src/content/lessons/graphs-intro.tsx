"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function GraphsIntro() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Introduction to Graphs</h2>
      <p>
        A <strong>graph</strong> is the most general-purpose data structure in
        computer science. It consists of <strong>vertices</strong> (also called
        nodes) connected by <strong>edges</strong>. Graphs model relationships:
        social networks (people connected by friendships), road maps (cities
        connected by roads), the web (pages connected by links), and dependency
        systems (tasks connected by prerequisites).
      </p>
      <p>
        Formally, a graph G = (V, E) is a set of vertices V and a set of edges
        E, where each edge connects two vertices. The two fundamental choices
        that define a graph type are:
      </p>
      <ul>
        <li><strong>Directed vs undirected:</strong> Are edges one-way or two-way?</li>
        <li><strong>Weighted vs unweighted:</strong> Do edges have costs/distances?</li>
      </ul>
      <MathBlock
        latex="G = (V, E) \quad \text{where } E \subseteq V \times V"
        display
      />

      <h2>Key Terminology</h2>
      <StepByStep
        title="Essential graph vocabulary"
        steps={[
          {
            title: "Degree",
            content:
              "The degree of a vertex is the number of edges connected to it. In a directed graph, we distinguish in-degree (incoming edges) and out-degree (outgoing edges). The sum of all degrees equals 2|E| (each edge contributes to two vertices).",
          },
          {
            title: "Path",
            content:
              "A sequence of vertices where each consecutive pair is connected by an edge. A simple path visits no vertex twice. The length of a path is its number of edges.",
          },
          {
            title: "Cycle",
            content:
              "A path that starts and ends at the same vertex. A graph with no cycles is called acyclic. A directed acyclic graph (DAG) is especially important — it models dependencies and task ordering.",
          },
          {
            title: "Connected component",
            content:
              "A maximal set of vertices where every pair is connected by some path. An undirected graph may have multiple disconnected components.",
          },
        ]}
      />

      <h2>Adjacency List vs Adjacency Matrix</h2>
      <p>
        The two standard ways to store a graph in memory have very different
        trade-offs:
      </p>
      <MathBlock
        latex="\text{Adjacency list space: } O(|V| + |E|) \qquad \text{Adjacency matrix space: } O(|V|^2)"
        display
      />
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Adjacency List</th>
            <th>Adjacency Matrix</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Space</td><td>O(V + E)</td><td>O(V squared)</td></tr>
          <tr><td>Check if edge exists</td><td>O(degree)</td><td>O(1)</td></tr>
          <tr><td>List neighbors</td><td>O(degree)</td><td>O(V)</td></tr>
          <tr><td>Add edge</td><td>O(1)</td><td>O(1)</td></tr>
        </tbody>
      </table>
      <p>
        <strong>Rule of thumb:</strong> Use an adjacency list for sparse graphs
        (most real-world graphs) and an adjacency matrix for dense graphs or
        when you need O(1) edge lookup.
      </p>

      <h2>Python Graph Representations</h2>
      <CodeEditor
        language="python"
        description="Building graphs using adjacency lists (dict of lists) and adjacency matrices."
        initialCode={`# --- Adjacency List (most common) ---
# Dictionary maps each vertex to its list of neighbors
graph_list = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("Neighbors of B:", graph_list['B'])  # ['A', 'D', 'E']
print("Degree of B:", len(graph_list['B']))  # 3

# --- Weighted graph (dict of dicts) ---
weighted = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'D': 5},
    'C': {'A': 2, 'D': 8},
    'D': {'B': 5, 'C': 8}
}
print("\\nWeight A->B:", weighted['A']['B'])  # 4

# --- Adjacency Matrix ---
# Vertices: A=0, B=1, C=2, D=3, E=4, F=5
matrix = [
    [0, 1, 1, 0, 0, 0],  # A
    [1, 0, 0, 1, 1, 0],  # B
    [1, 0, 0, 0, 0, 1],  # C
    [0, 1, 0, 0, 0, 0],  # D
    [0, 0, 0, 0, 0, 1],  # E
    [0, 0, 1, 0, 1, 0],  # F
]
print("\\nEdge B-D exists:", bool(matrix[1][3]))  # True
print("Edge A-E exists:", bool(matrix[0][4]))     # False`}
      />

      <InteractiveQuestion
        id="graph-q1"
        question="A social network has 1 billion users but each person has on average 200 friends. Which representation is better?"
        options={[
          { text: "Adjacency list — the graph is extremely sparse", feedback: "Correct! With 1 billion vertices, an adjacency matrix would need 10^18 entries (an exabyte of memory). The adjacency list needs only about 200 billion entries (200 per user), which is manageable. Most real-world graphs are sparse." },
          { text: "Adjacency matrix — O(1) edge lookup is important", feedback: "The matrix would need 10^18 entries. Even with 1 bit per entry, that is over 100 petabytes. Completely impractical." },
          { text: "Either works equally well", feedback: "The space difference is enormous: O(V + E) = O(200 billion) vs O(V^2) = O(10^18)." },
          { text: "Neither — a special graph database is needed", feedback: "While graph databases exist, the fundamental representation is still an adjacency list. The key insight is about space complexity." },
        ]}
        correctIndex={0}
        hint="Compare the space: O(V + E) vs O(V squared) where V = 1 billion and E = 100 billion."
        explanation="With V = 10^9 and E = 10^11, the adjacency list uses O(10^11) space while the matrix uses O(10^18). The graph has only 200 edges per vertex out of a possible 10^9, making it extremely sparse."
      />

      <InteractiveQuestion
        id="graph-q2"
        question="In an undirected graph, the sum of all vertex degrees equals what?"
        options={[
          { text: "2|E| — each edge contributes 2 to the total degree", feedback: "Correct! Every edge connects two vertices, adding 1 to each vertex's degree. This is the Handshaking Lemma. A corollary: the number of odd-degree vertices is always even." },
          { text: "|E| — one per edge", feedback: "Each edge is counted twice: once for each endpoint." },
          { text: "|V| — one per vertex", feedback: "The degree sum depends on edges, not just the number of vertices." },
          { text: "|V| times |E|", feedback: "This would be far too large. The relationship is linear in E." },
        ]}
        correctIndex={0}
        hint="Each edge has two endpoints. How does that affect the total degree count?"
        explanation="The Handshaking Lemma: the sum of all degrees in an undirected graph equals 2|E|. This fundamental identity is used throughout graph theory."
      />

      <h3>Challenge</h3>
      <p>
        Write a function that builds an adjacency list from a list of edges and
        computes the degree of each vertex.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`def build_graph(edges):
    """Build adjacency list from edge list. Return graph and degrees."""
    graph = {}
    for u, v in edges:
        graph.setdefault(u, []).append(v)
        graph.setdefault(v, []).append(u)
    degrees = {v: len(neighbors) for v, neighbors in graph.items()}
    return graph, degrees

edges = [('A','B'), ('A','C'), ('B','D'), ('B','E'), ('C','E')]
graph, degrees = build_graph(edges)
print("Graph:", graph)
print("Degrees:", degrees)
# Verify handshaking lemma
print("Sum of degrees:", sum(degrees.values()))
print("2 * |E|:", 2 * len(edges))`}
          description="Build an undirected graph from edges and verify the Handshaking Lemma."
        />
      </RevealAnswer>
    </div>
  );
}
