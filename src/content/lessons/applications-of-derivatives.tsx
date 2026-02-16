"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function ApplicationsOfDerivatives() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Why Derivatives Matter in the Real World</h2>
      <p>
        Derivatives are not just an abstract calculus exercise. They answer
        practical questions: What dimensions maximize the volume of a box?
        At what price does profit peak? When does a thrown ball reach its
        highest point? All of these are <strong>optimization</strong> problems,
        and derivatives give us the tools to solve them systematically.
      </p>
      <p>
        The key insight is simple: at a maximum or minimum of a smooth
        function, the tangent line is horizontal &mdash; so the derivative is
        zero. Points where <em>f&apos;(x) = 0</em> are called
        <strong> critical points</strong>, and they are the starting point for
        every optimization problem.
      </p>

      <h2>Finding Critical Points</h2>
      <MathBlock
        latex="f'(x) = 0 \quad \text{or} \quad f'(x) \text{ does not exist}"
        display
      />
      <p>
        A critical point occurs wherever the derivative is zero or undefined.
        Not every critical point is a max or min &mdash; some are inflection
        points (like <em>x = 0</em> for <em>f(x) = x³</em>). To classify them
        we use either the <strong>First Derivative Test</strong> or the
        <strong> Second Derivative Test</strong>.
      </p>

      <h2>The Second Derivative Test</h2>
      <p>
        If <em>f&apos;(c) = 0</em> then:
      </p>
      <ul>
        <li><em>f&apos;&apos;(c) &gt; 0</em> &rArr; local <strong>minimum</strong> (concave up, like a bowl)</li>
        <li><em>f&apos;&apos;(c) &lt; 0</em> &rArr; local <strong>maximum</strong> (concave down, like a hill)</li>
        <li><em>f&apos;&apos;(c) = 0</em> &rArr; test is inconclusive; use the First Derivative Test instead</li>
      </ul>

      <h2>Worked Example: Optimize a Polynomial</h2>
      <StepByStep
        title="Find the extrema of f(x) = x³ − 6x² + 9x + 1"
        steps={[
          {
            title: "Find f'(x)",
            content: "Differentiate term by term.",
            latex: "f'(x) = 3x^2 - 12x + 9",
          },
          {
            title: "Set f'(x) = 0",
            content: "Factor to find critical points.",
            latex: "3(x^2 - 4x + 3) = 3(x-1)(x-3) = 0 \\implies x = 1,\\; x = 3",
          },
          {
            title: "Apply the Second Derivative Test",
            content: "Find f''(x) = 6x − 12. Evaluate at each critical point.",
            latex: "f''(1) = -6 < 0 \\;(\\text{local max}), \\quad f''(3) = 6 > 0 \\;(\\text{local min})",
          },
          {
            title: "Find the function values",
            content: "Substitute back to get coordinates.",
            latex: "f(1) = 5 \\;(\\text{local max}), \\quad f(3) = 1 \\;(\\text{local min})",
          },
        ]}
      />
      <GraphPlayground
        equation="x^3 - 6*x^2 + 9*x + 1"
        xRange={[-1, 5]}
        yRange={[-2, 8]}
        interactive
        showTangent
        showGrid
        color="#6366f1"
      />
      <p>
        In the graph, notice the tangent line is horizontal at both <em>x = 1</em>{" "}
        and <em>x = 3</em> &mdash; exactly the critical points we found.
      </p>

      <h2>Optimization in Context</h2>
      <p>
        Real optimization problems usually come with constraints. A classic:
        &ldquo;You have 60 m of fencing. What is the maximum rectangular area
        you can enclose?&rdquo; Here the constraint is the perimeter, and the
        objective is the area.
      </p>
      <StepByStep
        title="Maximize area with fixed perimeter"
        steps={[
          {
            title: "Set up variables",
            content: "Let the rectangle have width w and height h. Perimeter: 2w + 2h = 60, so h = 30 − w.",
          },
          {
            title: "Write the objective function",
            content: "Area A = w · h = w(30 − w) = 30w − w².",
            latex: "A(w) = 30w - w^2",
          },
          {
            title: "Find the critical point",
            content: "A'(w) = 30 − 2w = 0  →  w = 15.",
            latex: "A'(w) = 30 - 2w = 0 \\implies w = 15",
          },
          {
            title: "Confirm maximum and compute area",
            content: "A''(w) = −2 < 0, so w = 15 is a maximum. h = 15 as well, giving a square.",
            latex: "A(15) = 15 \\times 15 = 225 \\text{ m}^2",
          },
        ]}
      />

      <h2>Explore: How Coefficients Shift Critical Points</h2>
      <SliderExploration
        title="Quadratic Peak"
        description="Adjust the coefficients to see how the maximum of a downward parabola moves. The vertex is always at x = −b/(2a)."
        parameters={[
          { name: "a", label: "a (leading coeff, negative)", min: -5, max: -0.5, step: 0.1, default: -1 },
          { name: "b", label: "b", min: -10, max: 10, step: 0.5, default: 4 },
        ]}
        equation="a*x^2 + b*x"
        xRange={[-10, 10]}
        yRange={[-20, 20]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="app-deriv-q1"
        question="If f'(c) = 0 and f''(c) > 0, what can we conclude?"
        options={[
          { text: "f has a local maximum at c", feedback: "Positive second derivative means concave up — that's a minimum, not a maximum." },
          { text: "f has a local minimum at c", feedback: "Correct! f'' > 0 means the curve is concave up (bowl-shaped), so the critical point is a local minimum." },
          { text: "f has an inflection point at c", feedback: "An inflection point is where f'' changes sign, not where f'' is positive." },
          { text: "We need more information", feedback: "The second derivative test is conclusive when f'' ≠ 0." },
        ]}
        correctIndex={1}
        hint="Think about the shape of a curve that is concave up."
        explanation="When f''(c) > 0, the curve opens upward at c, so the critical point is a local minimum."
      />

      <InteractiveQuestion
        id="app-deriv-q2"
        question="A farmer has 100 m of fence to enclose a rectangular pen against a barn wall (only 3 sides need fence). What width maximizes the area?"
        options={[
          { text: "25 m", feedback: "Correct! With constraint w + 2h = 100, A = w(50 − w/2). A'=0 gives w = 50... Wait, let's recheck: if h is the side perpendicular, w + 2h = 100 → w = 100 − 2h, A = h(100−2h), A' = 100−4h = 0 → h = 25." },
          { text: "50 m", feedback: "This would use all the fence for one side, leaving nothing for the other two." },
          { text: "33.3 m", feedback: "That answer applies to a 3-equal-sides division, not this problem." },
          { text: "100 m", feedback: "You cannot use all the fencing for a single side." },
        ]}
        correctIndex={0}
        hint="Let h be the depth (two sides). Then w = 100 − 2h. Maximize A = h · w."
        explanation="A(h) = h(100 − 2h) = 100h − 2h². Setting A'(h) = 100 − 4h = 0 gives h = 25 m, w = 50 m, area = 1250 m²."
      />
    </div>
  );
}
