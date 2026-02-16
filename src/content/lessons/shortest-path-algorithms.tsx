"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function ShortestPathAlgorithms() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Shortest Path Algorithms</h2>
      <p>
        Finding the shortest path between two points is one of the most
        fundamental problems in computer science. Every time you use a GPS
        navigator, route a network packet, or plan logistics, a shortest
        path algorithm is working behind the scenes. In this lesson, we
        study two classic algorithms:{" "}
        <strong>Dijkstra&apos;s algorithm</strong> for graphs with
        non-negative weights and{" "}
        <strong>Bellman-Ford</strong> for graphs that may have negative
        edge weights.
      </p>

      <h2>The Problem</h2>
      <p>
        Given a weighted directed graph G = (V, E) with a source vertex s,
        find the shortest path from s to every other vertex. The
        &ldquo;shortest&rdquo; path minimizes the sum of edge weights along
        the path:
      </p>
      <MathBlock
        latex="\text{dist}(s, v) = \min_{\text{path } P: s \to v} \sum_{(u,w) \in P} \text{weight}(u, w)"
        display
      />

      <h2>Dijkstra&apos;s Algorithm</h2>
      <p>
        Edsger Dijkstra proposed this algorithm in 1959, and it remains the
        gold standard for shortest paths in graphs with{" "}
        <strong>non-negative edge weights</strong>. The key idea is{" "}
        <strong>greedy</strong>: always process the unvisited vertex with
        the smallest known distance.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>
          Initialize dist[s] = 0 and dist[v] = &infin; for all other
          vertices. Use a priority queue (min-heap) to efficiently find the
          next closest vertex.
        </li>
        <li>
          Extract the vertex u with the smallest dist[u] from the priority
          queue.
        </li>
        <li>
          For each neighbor v of u: if dist[u] + weight(u, v) &lt; dist[v],
          update dist[v] (&ldquo;relax&rdquo; the edge) and add v to the
          priority queue.
        </li>
        <li>
          Repeat until the priority queue is empty. Every extracted vertex
          has its final shortest distance.
        </li>
      </ol>
      <MathBlock
        latex="\text{Relaxation: if } d[u] + w(u,v) < d[v], \text{ set } d[v] = d[u] + w(u,v)"
        display
      />

      <h3>Complexity</h3>
      <MathBlock
        latex="\text{With binary heap: } O((V + E) \log V) \qquad \text{With Fibonacci heap: } O(V \log V + E)"
        display
      />

      <h2>Dijkstra Step by Step</h2>
      <StepByStep
        title="Dijkstra on a 5-vertex weighted graph"
        steps={[
          {
            title: "Set up the graph",
            content:
              "Vertices: A, B, C, D, E. Edges: A→B(4), A→C(2), B→D(3), B→C(1), C→B(1), C→D(5), C→E(7), D→E(2). Source: A. Initialize dist = {A:0, B:∞, C:∞, D:∞, E:∞}.",
          },
          {
            title: "Process A (dist = 0)",
            content:
              "Relax A→B: dist[B] = min(∞, 0+4) = 4. Relax A→C: dist[C] = min(∞, 0+2) = 2. Priority queue: {C:2, B:4}.",
          },
          {
            title: "Process C (dist = 2)",
            content:
              "C is the unvisited vertex with smallest distance. Relax C→B: dist[B] = min(4, 2+1) = 3 (improved!). Relax C→D: dist[D] = min(∞, 2+5) = 7. Relax C→E: dist[E] = min(∞, 2+7) = 9. Priority queue: {B:3, D:7, E:9}.",
          },
          {
            title: "Process B (dist = 3)",
            content:
              "Relax B→D: dist[D] = min(7, 3+3) = 6 (improved!). Relax B→C: C already processed, skip. Priority queue: {D:6, E:9}.",
          },
          {
            title: "Process D (dist = 6)",
            content:
              "Relax D→E: dist[E] = min(9, 6+2) = 8 (improved!). Priority queue: {E:8}.",
          },
          {
            title: "Process E (dist = 8)",
            content:
              "E has no outgoing edges (or only to already-processed vertices). Done! Final distances: A:0, B:3, C:2, D:6, E:8. Shortest path A→E: A→C→B→D→E with total weight 8.",
            latex:
              "\\text{A} \\xrightarrow{2} \\text{C} \\xrightarrow{1} \\text{B} \\xrightarrow{3} \\text{D} \\xrightarrow{2} \\text{E} \\quad \\text{Total: } 8",
          },
        ]}
      />

      <h2>Python Dijkstra Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement Dijkstra's algorithm using a priority queue (heapq)."
        initialCode={`import heapq

def dijkstra(graph, source):
    """
    Find shortest distances from source to all vertices.
    graph: dict of {vertex: [(neighbor, weight), ...]}
    Returns: dict of {vertex: shortest_distance}
    """
    dist = {v: float('inf') for v in graph}
    dist[source] = 0
    prev = {v: None for v in graph}  # for path reconstruction
    pq = [(0, source)]  # (distance, vertex)

    while pq:
        d, u = heapq.heappop(pq)

        # TODO: Skip if we already found a shorter path to u
        # (this handles duplicate entries in the heap)

        # TODO: For each neighbor v of u, relax the edge
        # If dist[u] + weight < dist[v], update and push to pq
        pass

    return dist, prev

def reconstruct_path(prev, target):
    """Trace back from target to source using prev pointers."""
    path = []
    node = target
    while node is not None:
        path.append(node)
        node = prev[node]
    path.reverse()
    return path

# Test graph
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('D', 3), ('C', 1)],
    'C': [('B', 1), ('D', 5), ('E', 7)],
    'D': [('E', 2)],
    'E': [],
}

dist, prev = dijkstra(graph, 'A')
print("Distances:", dist)
print("Path to E:", reconstruct_path(prev, 'E'))`}
        solution={`import heapq

def dijkstra(graph, source):
    """
    Find shortest distances from source to all vertices.
    graph: dict of {vertex: [(neighbor, weight), ...]}
    Returns: dict of {vertex: shortest_distance}
    """
    dist = {v: float('inf') for v in graph}
    dist[source] = 0
    prev = {v: None for v in graph}
    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue  # stale entry, skip

        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                prev[v] = u
                heapq.heappush(pq, (new_dist, v))

    return dist, prev

def reconstruct_path(prev, target):
    """Trace back from target to source using prev pointers."""
    path = []
    node = target
    while node is not None:
        path.append(node)
        node = prev[node]
    path.reverse()
    return path

# Test graph
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('D', 3), ('C', 1)],
    'C': [('B', 1), ('D', 5), ('E', 7)],
    'D': [('E', 2)],
    'E': [],
}

dist, prev = dijkstra(graph, 'A')
print("Distances:", dist)
print("Path to E:", reconstruct_path(prev, 'E'))
# Output:
# Distances: {'A': 0, 'B': 3, 'C': 2, 'D': 6, 'E': 8}
# Path to E: ['A', 'C', 'B', 'D', 'E']`}
      />

      <h2>Bellman-Ford Algorithm</h2>
      <p>
        What if some edge weights are negative? Dijkstra&apos;s greedy
        approach breaks down because a vertex with a larger distance might
        later be reached via a negative-weight shortcut. The{" "}
        <strong>Bellman-Ford algorithm</strong> handles this correctly by
        relaxing <em>all</em> edges repeatedly:
      </p>
      <ol>
        <li>Initialize dist[s] = 0, dist[v] = &infin; for all others.</li>
        <li>
          Repeat V - 1 times: for every edge (u, v) with weight w, relax:
          if dist[u] + w &lt; dist[v], update dist[v].
        </li>
        <li>
          After V - 1 iterations, check for <strong>negative
          cycles</strong>: do one more pass over all edges. If any distance
          can still be improved, a negative cycle exists (and shortest
          paths are undefined).
        </li>
      </ol>
      <MathBlock
        latex="\text{Time: } O(VE) \qquad \text{Space: } O(V)"
        display
      />
      <p>
        Bellman-Ford is slower than Dijkstra but more versatile. It is
        essential in network routing protocols like RIP (Routing Information
        Protocol) and in detecting arbitrage opportunities in currency
        exchange.
      </p>

      <h2>When to Use Which?</h2>
      <ul>
        <li>
          <strong>All weights non-negative:</strong> Use{" "}
          <strong>Dijkstra</strong>. Faster and simpler.
        </li>
        <li>
          <strong>Some negative weights (no negative cycles):</strong> Use{" "}
          <strong>Bellman-Ford</strong>. It correctly handles negative edges.
        </li>
        <li>
          <strong>Need to detect negative cycles:</strong> Use{" "}
          <strong>Bellman-Ford</strong>. Run V iterations; if the Vth
          iteration still improves distances, a negative cycle exists.
        </li>
        <li>
          <strong>All-pairs shortest paths:</strong> Use{" "}
          <strong>Floyd-Warshall</strong> (O(V&sup3;)) or run Dijkstra from
          every vertex.
        </li>
      </ul>

      <h2>Why Dijkstra Fails with Negative Edges</h2>
      <RevealAnswer label="Show why Dijkstra fails with negative edges">
        <p>
          Dijkstra&apos;s algorithm assumes that once a vertex is extracted
          from the priority queue, its distance is final. This is only true
          when all edge weights are non-negative. Here is a counterexample:
        </p>
        <p>
          Consider vertices A, B, C with edges: A&rarr;B (weight 1),
          A&rarr;C (weight 5), B&rarr;C (weight -10).
        </p>
        <p>
          Dijkstra processes A (dist=0), then B (dist=1), then C (dist=5).
          When B is processed, it relaxes B&rarr;C to dist=1+(-10)=-9.
          But Dijkstra may have already finalized C at dist=5 before
          discovering the B&rarr;C shortcut! In the standard implementation,
          the stale check (<code>if d &gt; dist[u]: continue</code>) catches
          this, but the fundamental issue remains: Dijkstra relies on the
          greedy property that shorter partial paths lead to shorter full
          paths. Negative edges violate this property.
        </p>
        <MathBlock
          latex="\text{Greedy property: } d(s, u) \le d(s, v) \implies u \text{ is finalized before } v"
          display
        />
        <p>
          Bellman-Ford avoids this by relaxing all edges V-1 times,
          guaranteeing that even circuitous negative-weight paths are
          discovered.
        </p>
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="shortest-path-q1"
        question="In Dijkstra's algorithm, what data structure provides efficient extraction of the vertex with the smallest tentative distance?"
        options={[
          {
            text: "A stack (LIFO)",
            feedback:
              "A stack processes vertices in last-in-first-out order, which is used in DFS, not shortest paths.",
          },
          {
            text: "A regular queue (FIFO)",
            feedback:
              "A FIFO queue gives BFS, which finds shortest paths in unweighted graphs but not weighted ones.",
          },
          {
            text: "A priority queue (min-heap)",
            feedback:
              "Correct! A min-heap lets us efficiently extract the vertex with the smallest dist[] value in O(log V) time. This is the key to Dijkstra's O((V+E) log V) performance. Without it, finding the minimum takes O(V) per extraction, giving O(V² + E) total.",
          },
          {
            text: "A hash table",
            feedback:
              "Hash tables provide O(1) lookup by key but not efficient minimum extraction. You need a priority queue for that.",
          },
        ]}
        correctIndex={2}
        hint="Dijkstra repeatedly selects the unvisited vertex with the smallest distance. Which data structure efficiently supports this operation?"
        explanation="A min-heap (priority queue) supports insert and extract-min in O(log V), giving Dijkstra O((V+E) log V) time. Python's heapq module provides this. A Fibonacci heap improves this to O(V log V + E) by supporting decrease-key in amortized O(1)."
      />

      <InteractiveQuestion
        id="shortest-path-q2"
        question="Bellman-Ford relaxes all edges V-1 times. Why exactly V-1?"
        options={[
          {
            text: "Because the longest possible shortest path has at most V-1 edges",
            feedback:
              "Correct! A shortest path (without negative cycles) visits each vertex at most once, so it uses at most V-1 edges. In iteration k, the algorithm correctly computes all shortest paths that use at most k edges. After V-1 iterations, all shortest paths are found.",
          },
          {
            text: "Because there are V-1 vertices other than the source",
            feedback:
              "While numerically the same, the reason is about path length: the longest simple path has V-1 edges. Each iteration extends the correct shortest paths by one more edge.",
          },
          {
            text: "Because it needs to check for negative cycles",
            feedback:
              "Negative cycle detection uses an additional Vth iteration. The V-1 iterations are for computing shortest paths.",
          },
          {
            text: "It is an arbitrary choice; more iterations would also work",
            feedback:
              "V-1 is the minimum needed to guarantee correctness. Fewer iterations might miss longer paths; more iterations are unnecessary (unless detecting negative cycles).",
          },
        ]}
        correctIndex={0}
        hint="A path in a graph with V vertices visits at most V nodes. How many edges does such a path have?"
        explanation="Any simple path visits at most V vertices and thus has at most V-1 edges. After k iterations of Bellman-Ford, all shortest paths with at most k edges are correct. After V-1 iterations, all possible shortest paths are accounted for. If the Vth iteration still finds improvements, a negative cycle exists."
      />
    </div>
  );
}
