"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function DifferentiationRules() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Why We Need Rules</h2>
      <p>
        Computing every derivative from the limit definition is tedious. Fortunately,
        once we prove a handful of general <strong>differentiation rules</strong>,
        we can differentiate virtually any function quickly. This lesson covers the
        three most important rules: the Power Rule, the Product Rule, and the
        Chain Rule.
      </p>

      <h2>The Power Rule</h2>
      <p>
        The Power Rule is the workhorse of differentiation. For any real number
        <em> n</em>:
      </p>
      <MathBlock latex="\frac{d}{dx} x^n = n\,x^{n-1}" display />
      <p>
        This applies to positive integers, negative integers, fractions &mdash;
        any exponent. For example, the derivative of <em>x³</em> is <em>3x²</em>,
        and the derivative of <em>x^(1/2)</em> (i.e., √x) is
        <em> (1/2)x^(−1/2)</em>.
      </p>
      <StepByStep
        title="Example: Differentiate f(x) = 4x⁵ − 2x³ + 7x − 9"
        steps={[
          {
            title: "Apply the Power Rule term by term",
            content: "Bring down each exponent and reduce it by one. Constants differentiate to zero.",
            latex: "f'(x) = 4 \\cdot 5x^4 - 2 \\cdot 3x^2 + 7 \\cdot 1 - 0",
          },
          {
            title: "Simplify",
            content: "Multiply the coefficients.",
            latex: "f'(x) = 20x^4 - 6x^2 + 7",
          },
        ]}
      />

      <h2>The Product Rule</h2>
      <p>
        When two functions are multiplied together, their derivative is
        <strong> not </strong> simply the product of the individual derivatives.
        Instead we use the Product Rule:
      </p>
      <MathBlock latex="\frac{d}{dx}[f(x)\,g(x)] = f'(x)\,g(x) + f(x)\,g'(x)" display />
      <p>
        A helpful mnemonic: &ldquo;derivative of the first times the second,
        plus the first times the derivative of the second.&rdquo;
      </p>
      <StepByStep
        title="Example: Differentiate h(x) = x² · sin(x)"
        steps={[
          {
            title: "Identify f and g",
            content: "Let f(x) = x² and g(x) = sin(x).",
          },
          {
            title: "Find individual derivatives",
            content: "f'(x) = 2x and g'(x) = cos(x).",
          },
          {
            title: "Apply the Product Rule",
            content: "Plug into the formula.",
            latex: "h'(x) = 2x\\sin(x) + x^2\\cos(x)",
          },
        ]}
      />

      <h2>The Chain Rule</h2>
      <p>
        The Chain Rule handles <strong>compositions</strong> of functions &mdash;
        functions nested inside other functions. If <em>y = f(g(x))</em>, then:
      </p>
      <MathBlock latex="\frac{dy}{dx} = f'(g(x)) \cdot g'(x)" display />
      <p>
        Think of it as peeling layers: differentiate the outer function (leaving
        the inner function untouched), then multiply by the derivative of the
        inner function.
      </p>
      <StepByStep
        title="Example: Differentiate y = (3x + 1)⁴"
        steps={[
          {
            title: "Identify outer and inner functions",
            content: "Outer: u⁴, Inner: u = 3x + 1.",
          },
          {
            title: "Differentiate the outer function",
            content: "d/du (u⁴) = 4u³. Keep the inner function in place.",
            latex: "4(3x+1)^3",
          },
          {
            title: "Multiply by the inner derivative",
            content: "d/dx (3x+1) = 3.",
            latex: "y' = 4(3x+1)^3 \\cdot 3 = 12(3x+1)^3",
          },
        ]}
      />

      <h2>Seeing the Derivative Graphically</h2>
      <p>
        Below is the graph of <em>f(x) = sin(x)</em>. Toggle the tangent line
        to see how its slope changes &mdash; the slope at each point traces out
        <em> cos(x)</em>, confirming that the derivative of sin is cos.
      </p>
      <GraphPlayground
        equation="sin(x)"
        xRange={[-6.28, 6.28]}
        yRange={[-2, 2]}
        interactive
        showTangent
        showGrid
        color="#ec4899"
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="diff-rules-q1"
        question="What is the derivative of f(x) = x⁷?"
        options={[
          { text: "x⁶", feedback: "You forgot to bring down the exponent as a coefficient." },
          { text: "7x⁶", feedback: "Correct! Power Rule: bring down 7 and reduce the exponent by 1." },
          { text: "7x⁷", feedback: "Close, but the exponent should decrease by 1." },
          { text: "6x⁷", feedback: "The coefficient should be the original exponent, 7." },
        ]}
        correctIndex={1}
        hint="The Power Rule says d/dx (xⁿ) = n·xⁿ⁻¹."
        explanation="Applying the Power Rule: d/dx(x⁷) = 7x⁶."
      />

      <InteractiveQuestion
        id="diff-rules-q2"
        question="Using the Chain Rule, what is d/dx [sin(5x)]?"
        options={[
          { text: "cos(5x)", feedback: "You differentiated the outer function but forgot the inner derivative." },
          { text: "5cos(x)", feedback: "The argument of cos should stay as 5x." },
          { text: "5cos(5x)", feedback: "Correct! Outer derivative cos(5x) times inner derivative 5." },
          { text: "5sin(5x)", feedback: "The derivative of sin is cos, not sin." },
        ]}
        correctIndex={2}
        hint="Outer function: sin(u). Inner function: u = 5x. Multiply their derivatives."
        explanation="d/dx sin(5x) = cos(5x) · 5 = 5cos(5x)."
      />

      <h3>Practice</h3>
      <p>Differentiate <em>f(x) = x² · eˣ</em>.</p>
      <RevealAnswer label="Show solution">
        <p>Use the Product Rule with f = x² and g = eˣ:</p>
        <MathBlock latex="f'(x) = 2x \cdot e^x + x^2 \cdot e^x = e^x(2x + x^2)" display />
      </RevealAnswer>
    </div>
  );
}
