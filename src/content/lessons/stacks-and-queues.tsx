"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function StacksAndQueues() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Stacks and Queues: Controlled Access</h2>
      <p>
        Stacks and queues are the two most fundamental <strong>abstract data
        types</strong> that restrict how you add and remove elements. Unlike
        arrays where you can access any position, stacks and queues enforce a
        specific order &mdash; and this constraint is exactly what makes them
        powerful.
      </p>

      <h2>Stack: Last In, First Out (LIFO)</h2>
      <p>
        A <strong>stack</strong> works like a stack of plates: you can only add
        to the top (<code>push</code>) and remove from the top (
        <code>pop</code>). The last element added is the first one removed.
        Both operations are O(1).
      </p>
      <MathBlock
        latex="\text{push}(x): O(1) \qquad \text{pop}(): O(1) \qquad \text{peek}(): O(1)"
        display
      />
      <p>
        Stacks appear everywhere: function call stacks in every programming
        language, undo history in editors, back buttons in browsers, and
        expression evaluation in compilers.
      </p>

      <h2>Queue: First In, First Out (FIFO)</h2>
      <p>
        A <strong>queue</strong> works like a line at a store: elements join at
        the back (<code>enqueue</code>) and leave from the front (
        <code>dequeue</code>). The first element added is the first one
        removed.
      </p>
      <MathBlock
        latex="\text{enqueue}(x): O(1) \qquad \text{dequeue}(): O(1)"
        display
      />
      <p>
        Queues power task scheduling (CPU job queues, print queues), breadth-first
        search, message passing between processes, and buffering (keyboard input,
        network packets).
      </p>

      <InteractiveQuestion
        id="stack-q1"
        question="You push the elements 1, 2, 3, 4 onto a stack (in that order), then pop twice. What value is returned by the second pop?"
        options={[
          { text: "3", feedback: "Correct! The stack after four pushes is [1, 2, 3, 4] with 4 on top. First pop returns 4, second pop returns 3. LIFO means the most recently pushed item comes out first." },
          { text: "2", feedback: "Remember, a stack is LIFO. The top element is 4, then 3. The second pop returns 3, not 2." },
          { text: "4", feedback: "That is the first pop. The second pop returns the next element below: 3." },
          { text: "1", feedback: "That would be the case for a queue (FIFO). In a stack, 1 is at the bottom." },
        ]}
        correctIndex={0}
        hint="LIFO means the last element pushed is the first one popped."
        explanation="Stack: push 1, 2, 3, 4. Pop returns 4 (top). Pop again returns 3. The stack now contains [1, 2]."
      />

      <h2>Python Implementation</h2>
      <p>
        Python&apos;s <code>list</code> works as an efficient stack: <code>append()</code>{" "}
        is push, <code>pop()</code> is pop, both O(1) amortized. For queues, use
        <code> collections.deque</code> which provides O(1) operations on both ends.
        Never use <code>list.pop(0)</code> for a queue &mdash; it is O(n) because
        it shifts all elements.
      </p>
      <CodeEditor
        language="python"
        description="Stack using a Python list, and queue using collections.deque."
        initialCode={`from collections import deque

# --- Stack (use list) ---
stack = []
stack.append(10)   # push 10
stack.append(20)   # push 20
stack.append(30)   # push 30
print("Stack:", stack)
print("Pop:", stack.pop())   # 30 (LIFO)
print("Pop:", stack.pop())   # 20
print("Top:", stack[-1])     # 10 (peek without removing)

# --- Queue (use deque) ---
queue = deque()
queue.append("A")    # enqueue A
queue.append("B")    # enqueue B
queue.append("C")    # enqueue C
print("\\nQueue:", list(queue))
print("Dequeue:", queue.popleft())  # A (FIFO)
print("Dequeue:", queue.popleft())  # B
print("Front:", queue[0])           # C (peek)`}
      />

      <h2>Classic Application: Balanced Parentheses</h2>
      <p>
        One of the most famous stack problems: given a string of brackets, determine
        if every opening bracket has a matching closing bracket in the correct order.
        The stack naturally tracks which brackets are still &ldquo;open&rdquo; and
        need to be closed.
      </p>
      <StepByStep
        title='Checking "{[()]}" for balanced brackets'
        steps={[
          {
            title: 'Read "{" — opening bracket',
            content: 'Push "{" onto stack. Stack: ["{"]',
          },
          {
            title: 'Read "[" — opening bracket',
            content: 'Push "[" onto stack. Stack: ["{", "["]',
          },
          {
            title: 'Read "(" — opening bracket',
            content: 'Push "(" onto stack. Stack: ["{", "[", "("]',
          },
          {
            title: 'Read ")" — closing bracket',
            content: 'Pop from stack: "(". Match! "(" pairs with ")". Stack: ["{", "["]',
          },
          {
            title: 'Read "]" — closing bracket',
            content: 'Pop from stack: "[". Match! "[" pairs with "]". Stack: ["{"]',
          },
          {
            title: 'Read "}" — closing bracket',
            content: 'Pop from stack: "{". Match! "{" pairs with "}". Stack: []. String is balanced!',
          },
        ]}
      />

      <CodeEditor
        language="python"
        description="Implement the balanced parentheses checker using a stack."
        initialCode={`def is_balanced(s):
    """Check if brackets in string s are balanced."""
    stack = []
    matching = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '([{':
            # TODO: push opening bracket onto stack
            pass
        elif char in ')]}':
            # TODO: check if stack is empty (unmatched closer)
            # TODO: pop and check if it matches
            pass

    # TODO: return True if stack is empty (all matched)
    return False

# Tests
print(is_balanced("{[()]}"))    # Expected: True
print(is_balanced("{[(])}"))    # Expected: False
print(is_balanced("((())"))     # Expected: False
print(is_balanced(""))          # Expected: True`}
        solution={`def is_balanced(s):
    """Check if brackets in string s are balanced."""
    stack = []
    matching = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack:
                return False
            if stack.pop() != matching[char]:
                return False

    return len(stack) == 0

# Tests
print(is_balanced("{[()]}"))    # Output: True
print(is_balanced("{[(])}"))    # Output: False
print(is_balanced("((())"))     # Output: False
print(is_balanced(""))          # Output: True`}
      />

      <InteractiveQuestion
        id="stack-q2"
        question="Why is collections.deque preferred over list for implementing a queue in Python?"
        options={[
          { text: "deque.popleft() is O(1), while list.pop(0) is O(n)", feedback: "Correct! A deque (double-ended queue) is implemented as a doubly linked list of fixed-size blocks, so removing from the front is O(1). A list must shift all remaining elements left, making pop(0) O(n)." },
          { text: "deque uses less memory than list", feedback: "Both use similar memory. The advantage is time complexity for front operations." },
          { text: "list does not support pop(0)", feedback: "list.pop(0) does work, but it is O(n) because it shifts all elements." },
          { text: "deque is thread-safe while list is not", feedback: "While deque does have some thread-safety properties, the primary reason to prefer it for queues is the O(1) popleft performance." },
        ]}
        correctIndex={0}
        hint="What happens to the remaining elements when you remove from index 0 of a list?"
        explanation="list.pop(0) shifts all n-1 elements left, making it O(n). deque.popleft() operates in O(1) by design. For a queue that processes millions of items, this difference is critical."
      />

      <h3>Challenge</h3>
      <p>
        Use a stack to evaluate a postfix (Reverse Polish Notation) expression
        like <code>&quot;3 4 + 2 *&quot;</code> which equals (3 + 4) * 2 = 14.
      </p>
      <RevealAnswer label="Show solution">
        <CodeEditor
          language="python"
          initialCode={`def eval_postfix(expression):
    stack = []
    for token in expression.split():
        if token.lstrip('-').isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': stack.append(int(a / b))
    return stack[0]

print(eval_postfix("3 4 + 2 *"))      # Output: 14
print(eval_postfix("5 1 2 + 4 * + 3 -"))  # Output: 14`}
          description="Each number is pushed; each operator pops two operands and pushes the result."
        />
      </RevealAnswer>
    </div>
  );
}
