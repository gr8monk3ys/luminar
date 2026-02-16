"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function GraphTraversal() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Graph Traversal: BFS and DFS</h2>
      <p>
        Traversing a graph means visiting every vertex exactly once. The two
        fundamental strategies are <strong>Breadth-First Search (BFS)</strong>,
        which explores level by level, and <strong>Depth-First Search
        (DFS)</strong>, which explores as deep as possible before backtracking.
        Every graph algorithm builds on one of these two patterns.
      </p>
      <MathBlock
        latex="\text{BFS and DFS both run in } O(|V| + |E|)"
        display
      />

      <h2>BFS: Level by Level</h2>
      <p>
        BFS uses a <strong>queue</strong> to explore all vertices at distance 1
        from the start, then distance 2, then distance 3, and so on. This
        layered exploration guarantees that BFS finds the{" "}
        <strong>shortest path</strong> (fewest edges) in an unweighted graph.
      </p>
      <StepByStep
        title="BFS from vertex A in graph: A-B, A-C, B-D, B-E, C-F, E-F"
        steps={[
          {
            title: "Initialize: queue = [A], visited = {A}",
            content:
              "Start at A. Mark it visited and add to queue.",
          },
          {
            title: "Process A: neighbors B, C",
            content:
              "Dequeue A. Add unvisited neighbors B and C to queue. Queue: [B, C]. Visited: {A, B, C}.",
          },
          {
            title: "Process B: neighbors D, E",
            content:
              "Dequeue B. Add unvisited neighbors D and E. Queue: [C, D, E]. Visited: {A, B, C, D, E}.",
          },
          {
            title: "Process C: neighbor F",
            content:
              "Dequeue C. Add unvisited neighbor F. Queue: [D, E, F]. Visited: {A, B, C, D, E, F}.",
          },
          {
            title: "Process D, E, F: no new neighbors",
            content:
              "All neighbors already visited. Queue empties. BFS complete. Order: A, B, C, D, E, F.",
          },
        ]}
      />

      <CodeEditor
        language="python"
        description="BFS implementation using a queue (collections.deque). Tracks visited vertices and shortest distances."
        initialCode={`from collections import deque

def bfs(graph, start):
    """BFS traversal. Returns visit order and distances from start."""
    visited = {start}
    queue = deque([start])
    order = []
    distance = {start: 0}

    while queue:
        vertex = queue.popleft()
        order.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                distance[neighbor] = distance[vertex] + 1

    return order, distance

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

order, dist = bfs(graph, 'A')
print("BFS order:", order)
print("Distances:", dist)`}
      />

      <h2>DFS: Go Deep, Then Backtrack</h2>
      <p>
        DFS uses a <strong>stack</strong> (or recursion, which uses the call
        stack) to explore as far as possible along each branch before
        backtracking. DFS is the natural choice for problems involving paths,
        cycles, connected components, and topological ordering.
      </p>

      <CodeEditor
        language="python"
        description="DFS implementation: both recursive and iterative (stack-based) versions."
        initialCode={`def dfs_recursive(graph, start, visited=None):
    """DFS using recursion (implicit call stack)."""
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited

def dfs_iterative(graph, start):
    """DFS using an explicit stack."""
    visited = set()
    stack = [start]
    order = []

    while stack:
        vertex = stack.pop()
        if vertex in visited:
            continue
        visited.add(vertex)
        order.append(vertex)

        # Add neighbors in reverse order for consistent ordering
        for neighbor in reversed(graph[vertex]):
            if neighbor not in visited:
                stack.append(neighbor)

    return order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print("DFS recursive:")
dfs_recursive(graph, 'A')
print("\\nDFS iterative:", dfs_iterative(graph, 'A'))`}
      />

      <InteractiveQuestion
        id="traversal-q1"
        question="You want to find the shortest path (fewest edges) between two vertices in an unweighted graph. Which algorithm do you use?"
        options={[
          { text: "BFS — it explores vertices in order of distance", feedback: "Correct! BFS visits all vertices at distance 1 before distance 2, distance 2 before distance 3, and so on. The first time BFS reaches the target, it has found the shortest path. DFS might find a longer path first." },
          { text: "DFS — it finds paths faster", feedback: "DFS finds a path quickly, but it is not guaranteed to be the shortest. DFS might take a long detour before reaching the target." },
          { text: "Either BFS or DFS — both find shortest paths", feedback: "Only BFS guarantees shortest paths in unweighted graphs. DFS explores depth-first, which may find longer paths." },
          { text: "Neither — you need Dijkstra's algorithm", feedback: "Dijkstra is needed for weighted graphs. For unweighted graphs, BFS is simpler and sufficient." },
        ]}
        correctIndex={0}
        hint="Which algorithm explores vertices in order of increasing distance from the source?"
        explanation="BFS naturally discovers vertices level by level (distance 0, 1, 2, ...). This level-order exploration guarantees that the first time any vertex is reached, it is via a shortest path."
      />

      <h2>BFS vs DFS: When to Use Which</h2>
      <table>
        <thead>
          <tr>
            <th>Use Case</th>
            <th>Best Choice</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Shortest path (unweighted)</td><td>BFS</td><td>Level-order guarantees shortest</td></tr>
          <tr><td>Cycle detection</td><td>DFS</td><td>Back edges indicate cycles</td></tr>
          <tr><td>Topological sort</td><td>DFS</td><td>Post-order gives reverse topological order</td></tr>
          <tr><td>Connected components</td><td>Either</td><td>Both explore entire components</td></tr>
          <tr><td>Maze solving</td><td>DFS</td><td>Explores one path fully before trying another</td></tr>
          <tr><td>Finding nearby nodes</td><td>BFS</td><td>Explores closest nodes first</td></tr>
        </tbody>
      </table>

      <InteractiveQuestion
        id="traversal-q2"
        question="What data structure does BFS use internally, and what does DFS use?"
        options={[
          { text: "BFS uses a queue (FIFO); DFS uses a stack (LIFO)", feedback: "Correct! The queue ensures BFS processes vertices in discovery order (level by level). The stack ensures DFS processes the most recently discovered vertex first (going deeper). Swapping the data structure literally switches between BFS and DFS." },
          { text: "BFS uses a stack; DFS uses a queue", feedback: "This is reversed. A queue provides the FIFO ordering BFS needs; a stack provides the LIFO ordering DFS needs." },
          { text: "Both use a queue", feedback: "DFS needs LIFO ordering (last discovered, first processed), which requires a stack." },
          { text: "Both use a priority queue", feedback: "Priority queues are used in Dijkstra and A* search, not in basic BFS/DFS." },
        ]}
        correctIndex={0}
        hint="BFS processes the oldest discovered vertex next; DFS processes the newest."
        explanation="The only structural difference between BFS and DFS is the frontier data structure. Queue (FIFO) gives BFS; stack (LIFO) gives DFS. This is a profound insight: the same algorithm template, different ordering."
      />

      <h3>Challenge</h3>
      <p>
        Write a function that uses BFS to find the shortest path between two
        vertices and returns the actual path (not just the distance).
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`from collections import deque

def shortest_path(graph, start, end):
    """Find shortest path from start to end using BFS."""
    if start == end:
        return [start]

    visited = {start}
    queue = deque([(start, [start])])  # (vertex, path_so_far)

    while queue:
        vertex, path = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                new_path = path + [neighbor]
                if neighbor == end:
                    return new_path
                visited.add(neighbor)
                queue.append((neighbor, new_path))

    return None  # No path exists

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(shortest_path(graph, 'A', 'F'))  # Output: ['A', 'C', 'F']
print(shortest_path(graph, 'D', 'F'))  # Output: ['D', 'B', 'E', 'F']`}
          description="BFS tracks the full path to each vertex. The first path to reach the target is guaranteed shortest."
        />
      </RevealAnswer>
    </div>
  );
}
