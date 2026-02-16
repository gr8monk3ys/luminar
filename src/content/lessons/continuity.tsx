"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function Continuity() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>What Does &ldquo;Continuous&rdquo; Mean?</h2>
      <p>
        Informally, a function is <strong>continuous</strong> if you can draw
        its graph without lifting your pen. There are no jumps, holes, or
        vertical asymptotes. More precisely, a function <em>f</em> is
        continuous at a point <em>a</em> when three conditions hold
        simultaneously:
      </p>
      <MathBlock
        latex="1.\; f(a) \text{ is defined} \qquad 2.\; \lim_{x \to a} f(x) \text{ exists} \qquad 3.\; \lim_{x \to a} f(x) = f(a)"
        display
      />
      <p>
        If any one of these conditions fails, the function has a
        <strong> discontinuity</strong> at that point. Understanding the type of
        failure tells us what kind of discontinuity we are dealing with.
      </p>

      <h2>Types of Discontinuities</h2>
      <p>
        There are three common types of discontinuity you will encounter in
        calculus, each with a distinct graphical signature:
      </p>
      <ul>
        <li>
          <strong>Removable (hole):</strong> The limit exists but either the
          function is undefined at the point or its value disagrees with the
          limit. Example: <em>f(x) = (x² − 1)/(x − 1)</em> at <em>x = 1</em>.
        </li>
        <li>
          <strong>Jump:</strong> The left-hand and right-hand limits both exist
          but are not equal. Example: the floor function ⌊x⌋ at every integer.
        </li>
        <li>
          <strong>Infinite (vertical asymptote):</strong> At least one
          one-sided limit is ±∞. Example: <em>f(x) = 1/x</em> at <em>x = 0</em>.
        </li>
      </ul>

      <h3>Removable Discontinuity</h3>
      <p>
        The graph below shows <em>f(x) = (x² − 1)/(x − 1)</em>. At
        <em> x = 1</em> the function is undefined, creating a &ldquo;hole.&rdquo;
        The limit from both sides equals 2, so if we defined <em>f(1) = 2</em>
        the discontinuity would vanish &mdash; hence &ldquo;removable.&rdquo;
      </p>
      <GraphPlayground
        equation="(x^2 - 1)/(x - 1)"
        xRange={[-3, 5]}
        yRange={[-2, 6]}
        interactive
        showGrid
        color="#f59e0b"
      />

      <h3>Infinite Discontinuity</h3>
      <p>
        Now consider <em>f(x) = 1/x</em>. As <em>x</em> approaches 0 from the
        right the function shoots to +∞, and from the left it plunges to −∞.
        No finite limit exists, so the discontinuity cannot be removed.
      </p>
      <GraphPlayground
        equation="1/x"
        xRange={[-5, 5]}
        yRange={[-10, 10]}
        interactive
        showGrid
        color="#ef4444"
      />

      <h2>Checking Continuity: A Worked Example</h2>
      <StepByStep
        title="Is f(x) = (x² − 4)/(x − 2) continuous at x = 2?"
        steps={[
          {
            title: "Check if f(2) is defined",
            content: "Substituting x = 2 gives 0/0, so f(2) is undefined. Condition 1 fails immediately.",
          },
          {
            title: "Does the limit exist?",
            content: "Factor: (x²−4)/(x−2) = (x−2)(x+2)/(x−2) = x+2 for x ≠ 2. The limit as x→2 is 4.",
            latex: "\\lim_{x \\to 2} \\frac{x^2-4}{x-2} = 4",
          },
          {
            title: "Conclusion",
            content:
              "Because f(2) is not defined, the function is NOT continuous at x = 2. However, the discontinuity is removable: define f(2) = 4 and it becomes continuous.",
          },
        ]}
      />

      <h2>The Intermediate Value Theorem</h2>
      <p>
        One of the most powerful consequences of continuity is the
        <strong> Intermediate Value Theorem (IVT)</strong>. It states that if
        <em>f</em> is continuous on a closed interval [a, b] and <em>N</em> is
        any value between <em>f(a)</em> and <em>f(b)</em>, then there exists at
        least one <em>c</em> in (a, b) such that <em>f(c) = N</em>.
      </p>
      <MathBlock
        latex="f \text{ continuous on } [a,b],\; f(a) < N < f(b) \implies \exists\, c \in (a,b) : f(c) = N"
        display
      />
      <p>
        In plain language: a continuous function cannot skip over values. If the
        function is negative somewhere and positive somewhere else, it must
        cross zero at least once in between. This simple idea is the
        theoretical foundation for root-finding algorithms like the bisection
        method.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="cont-q1"
        question="Which condition is NOT required for f to be continuous at x = a?"
        options={[
          { text: "f(a) is defined", feedback: "This IS required. Without a defined value, continuity cannot hold." },
          { text: "lim(x→a) f(x) exists", feedback: "This IS required. The limit must exist for continuity." },
          { text: "lim(x→a) f(x) = f(a)", feedback: "This IS required. The limit must equal the function value." },
          { text: "f'(a) exists", feedback: "Correct! Differentiability is a stronger condition than continuity. A function can be continuous without being differentiable (e.g., |x| at 0)." },
        ]}
        correctIndex={3}
        hint="One of these options is about derivatives, not continuity."
        explanation="Continuity requires the function to be defined, the limit to exist, and the two to agree. Differentiability is a separate (stronger) condition."
      />

      <InteractiveQuestion
        id="cont-q2"
        question="f(x) = 1/(x − 3). What type of discontinuity occurs at x = 3?"
        options={[
          { text: "Removable", feedback: "Removable discontinuities have a finite limit. Here the limit is ±∞." },
          { text: "Jump", feedback: "A jump requires two finite but unequal one-sided limits." },
          { text: "Infinite (vertical asymptote)", feedback: "Correct! The function blows up to ±∞ near x = 3." },
          { text: "There is no discontinuity", feedback: "The function is undefined at x = 3, so it cannot be continuous there." },
        ]}
        correctIndex={2}
        hint="What happens to 1/(x−3) as x gets very close to 3?"
        explanation="As x → 3⁺ the function goes to +∞ and as x → 3⁻ it goes to −∞, creating a vertical asymptote."
      />

      <h3>Practice</h3>
      <p>
        Determine whether <em>f(x) = |x|</em> is continuous at <em>x = 0</em>.
      </p>
      <RevealAnswer label="Show solution">
        <p>
          <strong>1.</strong> f(0) = |0| = 0 — defined. <br />
          <strong>2.</strong> lim(x→0) |x| = 0 — the limit exists. <br />
          <strong>3.</strong> The limit equals f(0). <br />
          Therefore <em>f(x) = |x|</em> is continuous at x = 0 (even though it
          is not differentiable there).
        </p>
      </RevealAnswer>
    </div>
  );
}
