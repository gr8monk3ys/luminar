"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function SqueezeTheorem() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Squeeze Theorem (Sandwich Theorem)</h2>
      <p>
        Some limits are difficult to evaluate directly because the function
        oscillates or behaves erratically near the point of interest. The
        <strong> Squeeze Theorem</strong> (also called the Sandwich Theorem)
        gives us a powerful workaround: if we can trap a tricky function between
        two simpler functions that share the same limit, the trapped function
        must also converge to that limit.
      </p>
      <MathBlock
        latex="\text{If } g(x) \le f(x) \le h(x) \text{ near } a, \text{ and } \lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L, \text{ then } \lim_{x \to a} f(x) = L."
        display
      />
      <p>
        Think of it like squeezing a watermelon seed between your fingers. No
        matter how the seed wiggles, if both fingers converge to the same point
        the seed has nowhere else to go.
      </p>

      <h2>The Classic Example: sin(x)/x</h2>
      <p>
        The most famous application of the Squeeze Theorem is proving that
        the limit of sin(x)/x as x approaches 0 equals 1. Direct substitution
        gives 0/0, so we need a different approach. Using geometry of the unit
        circle, one can show:
      </p>
      <MathBlock
        latex="\cos x \le \frac{\sin x}{x} \le 1 \quad \text{for } x \text{ near } 0"
        display
      />
      <p>
        The graph below shows sin(x)/x squeezed between cos(x) and the constant
        function 1. As x approaches 0, both bounds converge to 1, so
        sin(x)/x must also approach 1.
      </p>
      <GraphPlayground
        equation="sin(x)/x"
        xRange={[-8, 8]}
        yRange={[-0.5, 1.5]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>Geometric Proof Sketch</h2>
      <StepByStep
        title="Why cos(x) ≤ sin(x)/x ≤ 1 near zero"
        steps={[
          {
            title: "Set up the unit circle",
            content:
              "Consider a unit circle with angle x (in radians) where 0 < x < π/2. Construct the triangle and circular sector.",
          },
          {
            title: "Compare areas",
            content:
              "The area of the inscribed triangle is (1/2)sin(x), the sector area is x/2, and the circumscribed triangle area is (1/2)tan(x). By containment:",
            latex: "\\frac{1}{2}\\sin x \\le \\frac{x}{2} \\le \\frac{1}{2}\\tan x",
          },
          {
            title: "Divide through by (1/2)sin(x)",
            content:
              "Since sin(x) > 0 for 0 < x < π/2, we can divide all parts by (1/2)sin(x):",
            latex: "1 \\le \\frac{x}{\\sin x} \\le \\frac{1}{\\cos x}",
          },
          {
            title: "Take reciprocals (flip the inequalities)",
            content:
              "Reciprocating reverses the inequalities, giving us the squeeze bounds:",
            latex: "\\cos x \\le \\frac{\\sin x}{x} \\le 1",
          },
          {
            title: "Apply the Squeeze Theorem",
            content:
              "As x → 0, cos(x) → 1 and 1 → 1. By the Squeeze Theorem, sin(x)/x → 1.",
            latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
          },
        ]}
      />

      <h2>Another Example: x² sin(1/x)</h2>
      <p>
        Consider the function f(x) = x&#178; sin(1/x). As x approaches 0, the
        sin(1/x) term oscillates wildly between -1 and 1. But x&#178; shrinks to
        zero. Since -1 &#8804; sin(1/x) &#8804; 1, we have:
      </p>
      <MathBlock
        latex="-x^2 \le x^2 \sin\!\left(\frac{1}{x}\right) \le x^2"
        display
      />
      <p>
        Both -x&#178; and x&#178; approach 0 as x approaches 0, so by the Squeeze
        Theorem:
      </p>
      <MathBlock
        latex="\lim_{x \to 0} x^2 \sin\!\left(\frac{1}{x}\right) = 0"
        display
      />

      <h2>Explore the Squeeze</h2>
      <SliderExploration
        title="Watch the Bounds Tighten"
        description="Adjust x toward 0 and observe how x² sin(1/x) is trapped between -x² and x². As the bounds shrink to zero, the function is squeezed to 0."
        parameters={[
          { name: "x", label: "x value", min: 0.01, max: 2, step: 0.01, default: 1 },
        ]}
        equation="x^2 * sin(1/x)"
        xRange={[0, 2]}
        yRange={[-1, 1]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="squeeze-q1"
        question="To apply the Squeeze Theorem, what must be true about the upper and lower bounding functions at the point of interest?"
        options={[
          {
            text: "They must have the same limit",
            feedback:
              "Correct! The Squeeze Theorem requires that both bounding functions converge to the same value L. Only then is the middle function forced to the same limit.",
          },
          {
            text: "They must be continuous",
            feedback:
              "Continuity is not required. The bounds only need to share the same limit at the point in question.",
          },
          {
            text: "They must be differentiable",
            feedback:
              "Differentiability is not needed. The theorem is purely about limits, not derivatives.",
          },
          {
            text: "They must be equal everywhere",
            feedback:
              "The bounds do not need to be equal everywhere — only their limits at the point must agree.",
          },
        ]}
        correctIndex={0}
        hint="What happens if the upper and lower bounds converge to different values?"
        explanation="The Squeeze Theorem works because if g(x) and h(x) both approach L, then f(x) trapped between them has no choice but to approach L as well."
      />

      <InteractiveQuestion
        id="squeeze-q2"
        question="What is lim(x→0) of x⁴ cos(1/x)?"
        options={[
          { text: "0", feedback: "Correct! Since -1 ≤ cos(1/x) ≤ 1, we have -x⁴ ≤ x⁴cos(1/x) ≤ x⁴. Both bounds go to 0, so the limit is 0 by the Squeeze Theorem." },
          { text: "1", feedback: "The cos(1/x) oscillates, but x⁴ shrinks to 0 and dominates." },
          { text: "Does not exist", feedback: "Although cos(1/x) oscillates, the x⁴ factor forces the product to 0." },
          { text: "-1", feedback: "The x⁴ factor is always non-negative and goes to 0, so the limit cannot be -1." },
        ]}
        correctIndex={0}
        hint="Bound cos(1/x) between -1 and 1, then multiply through by x⁴."
        explanation="Apply the same strategy: |cos(1/x)| ≤ 1, so |x⁴ cos(1/x)| ≤ x⁴ → 0. The Squeeze Theorem gives limit 0."
      />
    </div>
  );
}
