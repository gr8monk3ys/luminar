"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function DerivativeIntuition() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Big Idea: Instantaneous Rate of Change</h2>
      <p>
        You already know how to compute an average speed: divide the distance
        traveled by the time elapsed. But what if you want the speed at a
        single instant &mdash; the number on your speedometer right now? That
        idea of an <strong>instantaneous rate of change</strong> is exactly what
        a derivative captures.
      </p>
      <p>
        Geometrically, the derivative of a function at a point equals the
        <strong> slope of the tangent line</strong> to the curve at that point.
        A tangent line just barely &ldquo;touches&rdquo; the curve, giving the
        best straight-line approximation in a tiny neighborhood.
      </p>
      <MathBlock
        latex="f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}"
        display
      />
      <p>
        The fraction inside the limit is the slope of a <em>secant line</em>{" "}
        connecting two nearby points. As <em>h</em> shrinks to zero the secant
        line pivots and becomes the tangent line, and its slope becomes the
        derivative.
      </p>

      <h2>Tangent Line Playground</h2>
      <p>
        The graph below shows <em>f(x) = x²</em> together with its tangent
        line. Drag along the curve to move the tangent point and watch how the
        slope changes. At the vertex the slope is 0; to the right it is
        positive and growing; to the left it is negative.
      </p>
      <GraphPlayground
        equation="x^2"
        xRange={[-4, 4]}
        yRange={[-2, 16]}
        interactive
        showTangent
        showGrid
        color="#8b5cf6"
      />

      <h2>From Secant to Tangent</h2>
      <p>
        Use the slider below to shrink <em>h</em> and watch the secant line
        converge to the tangent line on <em>f(x) = x²</em> at <em>x = 1</em>.
        As <em>h</em> approaches 0, the secant slope approaches 2 &mdash; which
        is indeed <em>f&apos;(1) = 2(1) = 2</em>.
      </p>
      <SliderExploration
        title="Secant → Tangent"
        description="Adjust h to see the secant line approach the tangent line. Watch the slope value converge."
        parameters={[
          { name: "h", label: "h (step size)", min: 0.01, max: 3, step: 0.01, default: 2 },
        ]}
        equation="x^2"
        xRange={[-1, 4]}
        yRange={[-1, 12]}
      />

      <h2>Computing a Derivative from the Definition</h2>
      <StepByStep
        title="Find f'(x) for f(x) = x² using the limit definition"
        steps={[
          {
            title: "Write the difference quotient",
            content: "Plug f(x) = x² into the limit definition.",
            latex: "\\frac{(x+h)^2 - x^2}{h}",
          },
          {
            title: "Expand the numerator",
            content: "Expand (x+h)² = x² + 2xh + h².",
            latex: "\\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h}",
          },
          {
            title: "Simplify",
            content: "Factor h from the numerator and cancel.",
            latex: "2x + h",
          },
          {
            title: "Take the limit",
            content: "Let h → 0.",
            latex: "f'(x) = \\lim_{h \\to 0}(2x + h) = 2x",
          },
        ]}
      />
      <p>
        So the derivative of <em>x²</em> is <em>2x</em>. At any point, the
        slope of the tangent line is twice the <em>x</em>-coordinate. This
        matches what you saw in the playground above.
      </p>

      <h2>What the Derivative Tells Us</h2>
      <p>
        The sign of the derivative reveals whether the function is increasing or
        decreasing: <em>f&apos;(x) &gt; 0</em> means the function is rising,
        <em> f&apos;(x) &lt; 0</em> means it is falling, and
        <em> f&apos;(x) = 0</em> marks a potential peak, valley, or inflection
        point.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="deriv-q1"
        question="What does the derivative f'(a) represent geometrically?"
        options={[
          { text: "The area under the curve at x = a", feedback: "Area under the curve relates to integration, not differentiation." },
          { text: "The y-value of the function at x = a", feedback: "That would be f(a), not f'(a)." },
          { text: "The slope of the tangent line at x = a", feedback: "Correct! The derivative gives the instantaneous slope of the curve." },
          { text: "The x-intercept nearest to a", feedback: "Finding x-intercepts is a different problem entirely." },
        ]}
        correctIndex={2}
        hint="Think about what a tangent line does — it touches the curve at one point and matches its direction."
        explanation="The derivative at a point is the slope of the unique line that best approximates the function near that point."
      />

      <InteractiveQuestion
        id="deriv-q2"
        question="Using the limit definition, what is f'(x) for f(x) = 3x?"
        options={[
          { text: "3x", feedback: "That is f(x) itself, not its derivative. Try the limit definition." },
          { text: "3", feedback: "Correct! The difference quotient gives 3h/h = 3, and the limit is 3." },
          { text: "0", feedback: "A constant function has derivative 0, but 3x is not constant." },
          { text: "x", feedback: "Check your algebra in the difference quotient." },
        ]}
        correctIndex={1}
        hint="Compute [f(x+h) − f(x)]/h = [3(x+h) − 3x]/h."
        explanation="f(x+h) − f(x) = 3(x+h) − 3x = 3h. Dividing by h gives 3, and the limit as h→0 is still 3."
      />
    </div>
  );
}
