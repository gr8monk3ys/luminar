"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function ComputingLimits() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Algebraic Techniques for Computing Limits</h2>
      <p>
        In the previous lesson we built intuition for what a limit means. Now
        it is time to develop a toolkit for actually <em>computing</em> limits.
        The simplest strategy is <strong>direct substitution</strong>: if the
        function is continuous at the point of interest, just plug in.
      </p>
      <MathBlock latex="\lim_{x \to a} f(x) = f(a) \quad \text{(when } f \text{ is continuous at } a\text{)}" display />
      <p>
        Unfortunately, many interesting limits yield the indeterminate form
        <em> 0/0 </em> upon substitution. When that happens we need algebraic
        manipulation &mdash; factoring, rationalizing, or simplifying &mdash; to
        rewrite the expression before substituting again.
      </p>

      <h2>Technique 1: Factoring</h2>
      <p>
        When both the numerator and denominator vanish at the target value, look
        for a common factor that you can cancel. The classic example is a
        difference of squares or a factorable polynomial.
      </p>
      <StepByStep
        title="Example: Factor and Cancel"
        steps={[
          {
            title: "Write the limit",
            content: "We want to evaluate the following limit.",
            latex: "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}",
          },
          {
            title: "Factor the numerator",
            content: "Recognize x² − 4 as a difference of squares.",
            latex: "x^2 - 4 = (x-2)(x+2)",
          },
          {
            title: "Cancel and substitute",
            content: "Cancel (x − 2), then substitute x = 2.",
            latex: "\\lim_{x \\to 2}(x+2) = 4",
          },
        ]}
      />
      <GraphPlayground
        equation="(x^2 - 4)/(x - 2)"
        xRange={[-2, 6]}
        yRange={[-1, 8]}
        interactive
        showGrid
        color="#10b981"
      />
      <p>
        The graph shows a straight line with a hole at <em>x = 2</em>. The
        limit &ldquo;fills in&rdquo; the hole: the function approaches 4 even
        though it is undefined there.
      </p>

      <h2>Technique 2: Rationalizing</h2>
      <p>
        When the expression contains a square root, multiply the numerator and
        denominator by the <strong>conjugate</strong> to eliminate the radical.
      </p>
      <StepByStep
        title="Example: Rationalize"
        steps={[
          {
            title: "Write the limit",
            content: "Direct substitution gives 0/0.",
            latex: "\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}",
          },
          {
            title: "Multiply by the conjugate",
            content: "Multiply top and bottom by √(x+4) + 2.",
            latex:
              "\\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)} = \\frac{x+4-4}{x(\\sqrt{x+4}+2)}",
          },
          {
            title: "Simplify and substitute",
            content: "Cancel x, then let x → 0.",
            latex:
              "\\frac{1}{\\sqrt{x+4}+2} \\xrightarrow{x \\to 0} \\frac{1}{2+2} = \\frac{1}{4}",
          },
        ]}
      />

      <h2>Technique 3: L&apos;H&ocirc;pital&apos;s Rule (Preview)</h2>
      <p>
        When both numerator and denominator approach 0 (or both approach ±∞),
        you can take their derivatives and re-evaluate the limit. This powerful
        shortcut is formalized as L&apos;H&ocirc;pital&apos;s Rule:
      </p>
      <MathBlock
        latex="\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}"
        display
      />
      <p>
        We will prove this rigorously after covering derivatives. For now, think
        of it as a &ldquo;last resort&rdquo; tool when factoring and
        rationalizing fail.
      </p>

      <h2>Practice Problems</h2>
      <InteractiveQuestion
        id="comp-lim-q1"
        question="What is lim(x→5) (x² − 25) / (x − 5)?"
        options={[
          { text: "0", feedback: "Remember, 0/0 is indeterminate — factor first." },
          { text: "5", feedback: "Check your factoring: x² − 25 = (x−5)(x+5)." },
          { text: "10", feedback: "Correct! Factor, cancel, and substitute x = 5 into x + 5." },
          { text: "25", feedback: "You may have squared instead of adding. Try again." },
        ]}
        correctIndex={2}
        hint="Factor x² − 25 as a difference of squares."
        explanation="x² − 25 = (x−5)(x+5). Cancel (x−5) to get x+5, then substitute x = 5 to get 10."
      />

      <InteractiveQuestion
        id="comp-lim-q2"
        question="Which technique should you try first for lim(x→0) (√(1+x) − 1) / x?"
        options={[
          { text: "Direct substitution", feedback: "Direct substitution gives 0/0, so we need more work." },
          { text: "Factoring", feedback: "There is no polynomial factor to cancel with the square root." },
          { text: "Rationalizing (multiply by conjugate)", feedback: "Correct! Multiplying by √(1+x)+1 eliminates the radical." },
          { text: "L'Hôpital's Rule", feedback: "That would work, but rationalizing is simpler here and does not require derivatives." },
        ]}
        correctIndex={2}
        hint="The presence of a square root suggests a particular algebraic trick."
        explanation="Multiply numerator and denominator by √(1+x)+1. The numerator becomes (1+x)−1 = x, which cancels with the denominator. The limit is 1/2."
      />

      <h3>Try It Yourself</h3>
      <p>
        Evaluate the following limit using any technique you like:
      </p>
      <MathBlock latex="\lim_{x \to 1} \frac{x^3 - 1}{x - 1}" display />
      <RevealAnswer label="Show the answer">
        <p>
          Factor the numerator as a difference of cubes:
        </p>
        <MathBlock latex="x^3 - 1 = (x-1)(x^2 + x + 1)" display />
        <p>
          Cancel (x − 1) and substitute x = 1:
        </p>
        <MathBlock latex="1 + 1 + 1 = 3" display />
      </RevealAnswer>
    </div>
  );
}
