"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BreadthFirstSearch() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Breadth-First Search: Explore Level by Level</h2>
      <p>
        <strong>Breadth-First Search</strong> (BFS) is the counterpart to DFS.
        Instead of going deep, BFS explores all vertices at distance 1 from the
        source first, then all at distance 2, and so on. This level-by-level
        expansion is what makes BFS the ideal algorithm for finding{" "}
        <strong>shortest paths in unweighted graphs</strong>.
      </p>
      <p>
        BFS uses a <strong>queue</strong> (first-in-first-out) to manage the
        frontier of vertices to explore. Vertices are processed in the order
        they are discovered, ensuring closer vertices are handled before
        farther ones.
      </p>

      <h2>The Algorithm</h2>
      <ol>
        <li>Enqueue the source vertex and mark it as visited.</li>
        <li>Dequeue a vertex, process it, and enqueue all unvisited neighbors.</li>
        <li>Repeat until the queue is empty.</li>
      </ol>
      <MathBlock
        latex="\text{Time: } O(V + E) \qquad \text{Space: } O(V)"
        display
      />
      <p>
        Like DFS, BFS visits each vertex and edge once. The space is O(V) for
        the queue and visited set. In the worst case (a star graph), the queue
        can hold V - 1 vertices.
      </p>

      <h2>Tracing BFS</h2>
      <StepByStep
        title="BFS from vertex 0: graph 0→{1,2}, 1→{3}, 2→{3,4}, 3→{5}, 4→{5}, 5→{}"
        steps={[
          {
            title: "Level 0: Process vertex 0",
            content: "Dequeue 0. Enqueue neighbors 1, 2. Queue: [1, 2].",
          },
          {
            title: "Level 1: Process vertex 1",
            content: "Dequeue 1. Enqueue neighbor 3. Queue: [2, 3].",
          },
          {
            title: "Level 1: Process vertex 2",
            content: "Dequeue 2. Neighbor 3 already visited. Enqueue 4. Queue: [3, 4].",
          },
          {
            title: "Level 2: Process vertex 3",
            content: "Dequeue 3. Enqueue neighbor 5. Queue: [4, 5].",
          },
          {
            title: "Level 2: Process vertex 4",
            content: "Dequeue 4. Neighbor 5 already visited. Queue: [5].",
          },
          {
            title: "Level 3: Process vertex 5",
            content: "Dequeue 5. No unvisited neighbors. Queue empty. BFS complete. Visit order: 0 → 1 → 2 → 3 → 4 → 5.",
          },
        ]}
      />

      <h2>Shortest Path in Unweighted Graphs</h2>
      <p>
        BFS naturally computes the shortest path (fewest edges) from the source
        to every reachable vertex. This works because BFS discovers vertices in
        order of their distance: all vertices at distance <em>d</em> are
        processed before any at distance <em>d + 1</em>.
      </p>
      <p>
        To reconstruct the actual path, maintain a <strong>predecessor
        map</strong>: for each vertex, record which vertex discovered it. Then
        trace back from the destination to the source.
      </p>
      <MathBlock
        latex="\text{dist}(v) = \text{dist}(\text{predecessor}(v)) + 1"
        display
      />

      <h2>Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement BFS with distance tracking. Return the distance from the source to every reachable vertex."
        initialCode={`from collections import deque

def bfs(graph, start):
    """BFS returning distances from start to all reachable vertices."""
    visited = {start}
    queue = deque([start])
    distance = {start: 0}

    while queue:
        # TODO: Dequeue vertex
        # For each unvisited neighbor:
        #   - Mark visited
        #   - Record distance
        #   - Enqueue
        pass

    return distance

# Test
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3, 4],
    3: [1, 2, 5],
    4: [2, 5],
    5: [3, 4]
}
print(bfs(graph, 0))
# Expected: {0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 3}`}
        solution={`from collections import deque

def bfs(graph, start):
    """BFS returning distances from start to all reachable vertices."""
    visited = {start}
    queue = deque([start])
    distance = {start: 0}

    while queue:
        vertex = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                distance[neighbor] = distance[vertex] + 1
                queue.append(neighbor)

    return distance

graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3, 4],
    3: [1, 2, 5],
    4: [2, 5],
    5: [3, 4]
}
print(bfs(graph, 0))
# Output: {0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 3}`}
      />

      <h2>BFS vs. DFS</h2>
      <ul>
        <li>
          <strong>Shortest path:</strong> BFS finds shortest paths in unweighted
          graphs; DFS does not.
        </li>
        <li>
          <strong>Memory:</strong> BFS stores the entire frontier (can be wide);
          DFS stores only the current path (stack depth).
        </li>
        <li>
          <strong>Cycle detection:</strong> Both can detect cycles, but DFS edge
          classification is richer.
        </li>
        <li>
          <strong>Topological sort:</strong> DFS is preferred for topological
          ordering; BFS can do it via Kahn&apos;s algorithm (indegree-based).
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="bfs-q1"
        question="Why does BFS guarantee shortest paths in unweighted graphs?"
        options={[
          { text: "It uses a priority queue to select the closest vertex", feedback: "BFS uses a regular queue, not a priority queue. Dijkstra's algorithm uses a priority queue for weighted graphs." },
          { text: "It explores vertices in order of increasing distance from the source", feedback: "Correct! The FIFO queue ensures all vertices at distance d are processed before any at distance d+1. So the first time BFS reaches a vertex, it is via the shortest path." },
          { text: "It visits fewer vertices than DFS", feedback: "Both BFS and DFS visit the same set of reachable vertices. The difference is the order." },
          { text: "It always explores the entire graph", feedback: "BFS explores all reachable vertices, but so does DFS. Completeness alone does not explain shortest paths." },
        ]}
        correctIndex={1}
        hint="Think about the order vertices exit the queue."
        explanation="BFS processes vertices in FIFO order. Since each edge has weight 1, vertices are dequeued in non-decreasing order of distance. The first visit to any vertex is via the shortest path."
      />

      <InteractiveQuestion
        id="bfs-q2"
        question="In BFS, when is a vertex marked as visited?"
        options={[
          { text: "When it is dequeued", feedback: "If you wait until dequeuing, the same vertex might be enqueued multiple times, wasting time and space." },
          { text: "When it is first discovered (enqueued)", feedback: "Correct! Marking visited at discovery time prevents the same vertex from being added to the queue more than once. This is essential for O(V + E) performance." },
          { text: "After all its neighbors are processed", feedback: "That would allow the vertex to be re-enqueued by other paths before being marked." },
          { text: "It does not matter when", feedback: "The timing matters significantly for correctness and efficiency." },
        ]}
        correctIndex={1}
        hint="What happens if a vertex is added to the queue twice?"
        explanation="Mark visited when enqueuing (not when dequeuing) to prevent duplicate entries. This ensures each vertex is processed exactly once."
      />

      <h3>Challenge</h3>
      <p>
        BFS finds shortest paths in unweighted graphs. What algorithm should you
        use for shortest paths in a weighted graph with non-negative edge
        weights?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Use <strong>Dijkstra&apos;s algorithm</strong>, which generalizes BFS by
          using a <strong>priority queue</strong> (min-heap) instead of a regular
          queue. It always processes the vertex with the smallest known distance
          next, ensuring correctness for non-negative weights. Time complexity:
          O((V + E) log V) with a binary heap.
        </p>
      </RevealAnswer>
    </div>
  );
}
