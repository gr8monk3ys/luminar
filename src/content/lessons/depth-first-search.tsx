"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DepthFirstSearch() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Depth-First Search: Go Deep Before Going Wide</h2>
      <p>
        <strong>Depth-First Search</strong> (DFS) is a fundamental graph
        traversal algorithm. Starting from a source vertex, DFS explores as far
        as possible along each branch before backtracking. Think of it like
        exploring a maze: at every fork, you always take the left turn, go until
        you hit a dead end, then backtrack to try the next path.
      </p>
      <p>
        DFS uses a <strong>stack</strong> (either the call stack via recursion
        or an explicit stack data structure) to remember which vertices to visit
        next. This last-in-first-out order is what drives the deep-before-wide
        behavior.
      </p>

      <h2>The Algorithm</h2>
      <ol>
        <li>Mark the current vertex as visited.</li>
        <li>For each unvisited neighbor, recursively apply DFS.</li>
        <li>When all neighbors are visited, backtrack.</li>
      </ol>
      <MathBlock
        latex="\text{Time: } O(V + E) \qquad \text{Space: } O(V)"
        display
      />
      <p>
        DFS visits every vertex once and examines every edge once, giving
        O(V + E) time. The space is O(V) for the visited set and the recursion
        stack (or explicit stack).
      </p>

      <h2>Tracing DFS</h2>
      <StepByStep
        title="DFS on a graph: 0→{1,2}, 1→{3}, 2→{3,4}, 3→{}, 4→{}"
        steps={[
          {
            title: "Start at vertex 0",
            content: "Mark 0 as visited. Neighbors: 1, 2. Visit 1 first (go deep).",
          },
          {
            title: "Visit vertex 1",
            content: "Mark 1 as visited. Neighbors: 3. Visit 3.",
          },
          {
            title: "Visit vertex 3",
            content: "Mark 3 as visited. No unvisited neighbors. Backtrack to 1, then to 0.",
          },
          {
            title: "Visit vertex 2",
            content: "Back at 0, visit neighbor 2. Mark 2 as visited. Neighbors: 3 (visited), 4. Visit 4.",
          },
          {
            title: "Visit vertex 4",
            content: "Mark 4 as visited. No unvisited neighbors. Backtrack. DFS complete. Visit order: 0 → 1 → 3 → 2 → 4.",
          },
        ]}
      />

      <h2>Edge Classification</h2>
      <p>
        During DFS on a directed graph, edges are classified into four types
        based on when the endpoints are discovered:
      </p>
      <ul>
        <li>
          <strong>Tree edges:</strong> Edges that lead to unvisited vertices
          (these form the DFS tree).
        </li>
        <li>
          <strong>Back edges:</strong> Edges to an ancestor in the DFS tree.
          <em> A back edge indicates a cycle.</em>
        </li>
        <li>
          <strong>Forward edges:</strong> Edges to a descendant already visited.
        </li>
        <li>
          <strong>Cross edges:</strong> Edges between unrelated subtrees.
        </li>
      </ul>
      <p>
        Cycle detection is one of the most important applications of DFS: a
        directed graph has a cycle if and only if DFS discovers a back edge.
      </p>

      <h2>Implementation: Recursive and Iterative</h2>
      <CodeEditor
        language="python"
        description="Implement DFS both recursively and iteratively using an explicit stack."
        initialCode={`def dfs_recursive(graph, start, visited=None):
    """DFS using recursion (implicit call stack)."""
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        # TODO: If neighbor not visited, recurse
        # and extend result
        pass

    return result

def dfs_iterative(graph, start):
    """DFS using an explicit stack."""
    visited = set()
    stack = [start]
    result = []

    while stack:
        # TODO: Pop from stack
        # If not visited, mark visited, add to result
        # Push unvisited neighbors onto stack
        pass

    return result

# Test graph: adjacency list
graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [],
    4: []
}
print("Recursive:", dfs_recursive(graph, 0))
print("Iterative:", dfs_iterative(graph, 0))`}
        solution={`def dfs_recursive(graph, start, visited=None):
    """DFS using recursion (implicit call stack)."""
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))

    return result

def dfs_iterative(graph, start):
    """DFS using an explicit stack."""
    visited = set()
    stack = [start]
    result = []

    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return result

graph = {
    0: [1, 2],
    1: [3],
    2: [3, 4],
    3: [],
    4: []
}
print("Recursive:", dfs_recursive(graph, 0))
# Output: Recursive: [0, 1, 3, 2, 4]
print("Iterative:", dfs_iterative(graph, 0))
# Output: Iterative: [0, 1, 3, 2, 4]`}
      />

      <h2>Topological Sort via DFS</h2>
      <p>
        For a <strong>directed acyclic graph</strong> (DAG), DFS can produce a
        <strong> topological ordering</strong>: a linear ordering of vertices
        such that for every edge u &#8594; v, u appears before v. The algorithm
        is simple: run DFS and record each vertex when it <em>finishes</em>
        (all descendants visited). Reverse the finish order to get the
        topological sort.
      </p>
      <p>
        Topological sort is used in dependency resolution (build systems,
        package managers), course prerequisite planning, and task scheduling.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="dfs-q1"
        question="What data structure does DFS use (explicitly or implicitly)?"
        options={[
          { text: "Queue (FIFO)", feedback: "A queue produces breadth-first search, not depth-first search." },
          { text: "Stack (LIFO)", feedback: "Correct! DFS uses a stack — either implicitly via the recursion call stack, or explicitly with a stack data structure. The LIFO order ensures we explore deep before wide." },
          { text: "Priority queue", feedback: "A priority queue is used by Dijkstra's algorithm and A* search, not DFS." },
          { text: "Hash table", feedback: "A hash table is used for the visited set, but the traversal order is controlled by a stack." },
        ]}
        correctIndex={1}
        hint="Think about the order in which vertices are explored: last discovered, first explored."
        explanation="DFS uses a stack (LIFO). The recursive version uses the call stack implicitly; the iterative version uses an explicit stack."
      />

      <InteractiveQuestion
        id="dfs-q2"
        question="During DFS on a directed graph, you encounter an edge to a vertex that is currently on the recursion stack (gray vertex). What type of edge is this?"
        options={[
          { text: "Tree edge", feedback: "Tree edges lead to completely unvisited (white) vertices." },
          { text: "Back edge — it indicates a cycle", feedback: "Correct! An edge to a vertex currently being processed (on the stack) is a back edge. It forms a cycle because there is a path from that vertex down the DFS tree to the current vertex, and now an edge going back." },
          { text: "Forward edge", feedback: "Forward edges go to fully processed (black) vertices that are descendants." },
          { text: "Cross edge", feedback: "Cross edges go to fully processed vertices in different subtrees." },
        ]}
        correctIndex={1}
        hint="A vertex on the recursion stack is an ancestor of the current vertex in the DFS tree."
        explanation="A back edge creates a cycle: the ancestor is still being processed, and we found a path back to it. This is the basis for DFS-based cycle detection."
      />

      <h3>Challenge</h3>
      <p>
        Can DFS find the shortest path in an unweighted graph?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          No. DFS does not guarantee shortest paths because it explores deeply
          rather than level by level. The first path DFS finds to a vertex may
          not be the shortest. For shortest paths in unweighted graphs, use
          <strong> BFS</strong>, which explores all vertices at distance k before
          any at distance k + 1.
        </p>
      </RevealAnswer>
    </div>
  );
}
