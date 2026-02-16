"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function IntegralIntuition() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Area Under a Curve</h2>
      <p>
        We know how to find the area of rectangles, triangles, and circles. But
        what about the area of a region bounded by a <em>curve</em>? For
        instance, how much area sits beneath the parabola <em>y = x²</em>{" "}
        between <em>x = 0</em> and <em>x = 1</em>? This question motivated the
        invention of the <strong>integral</strong>.
      </p>
      <p>
        The strategy is beautifully simple: slice the region into thin vertical
        strips (rectangles), add up their areas, and then take the limit as the
        strips become infinitely thin. This limiting sum is called a
        <strong> definite integral</strong>.
      </p>
      <MathBlock
        latex="\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x"
        display
      />

      <h2>Visualize Riemann Sums</h2>
      <p>
        The graph below shows <em>f(x) = x²</em>. Imagine stacking thin
        rectangles under the curve from 0 to 2. As you increase the number of
        rectangles, their total area converges to the exact integral.
      </p>
      <GraphPlayground
        equation="x^2"
        xRange={[-1, 3]}
        yRange={[-0.5, 5]}
        interactive
        showGrid
        color="#10b981"
      />

      <h2>Explore: Number of Rectangles</h2>
      <p>
        Use the slider to increase the number of rectangles used to approximate
        the area under <em>f(x) = x²</em> on [0, 2]. With just a few
        rectangles the approximation is rough; with many, it becomes quite
        accurate. The exact answer is 8/3 ≈ 2.667.
      </p>
      <SliderExploration
        title="Riemann Sum Approximation"
        description="Increase n to see the rectangles approximate the area more closely."
        parameters={[
          { name: "n", label: "Number of rectangles", min: 1, max: 50, step: 1, default: 4 },
        ]}
        equation="x^2"
        xRange={[0, 2]}
        yRange={[0, 5]}
      />

      <h2>Definite vs. Indefinite Integrals</h2>
      <p>
        A <strong>definite integral</strong> has limits of integration and
        produces a number (the net signed area). An <strong>indefinite
        integral</strong> (antiderivative) produces a <em>family of
        functions</em>:
      </p>
      <MathBlock latex="\int x^2\,dx = \frac{x^3}{3} + C" display />
      <p>
        The constant <em>C</em> accounts for the fact that many functions share
        the same derivative. We call this the <strong>constant of
        integration</strong>.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Evaluate the definite integral of x² from 0 to 3"
        steps={[
          {
            title: "Find the antiderivative",
            content: "Using the reverse Power Rule, the antiderivative of x² is x³/3.",
            latex: "\\int x^2\\,dx = \\frac{x^3}{3} + C",
          },
          {
            title: "Apply the Fundamental Theorem",
            content: "Evaluate the antiderivative at the upper and lower bounds and subtract.",
            latex: "\\left[\\frac{x^3}{3}\\right]_0^3 = \\frac{27}{3} - \\frac{0}{3}",
          },
          {
            title: "Compute the result",
            content: "Simplify the arithmetic.",
            latex: "9 - 0 = 9",
          },
        ]}
      />

      <h2>Signed Area</h2>
      <p>
        An important subtlety: the integral computes <em>signed</em> area.
        Regions below the x-axis contribute <em>negative</em> area. For
        example, the integral of sin(x) from 0 to 2π is exactly zero because
        the positive hump (0 to π) and the negative hump (π to 2π) cancel out.
      </p>
      <GraphPlayground
        equation="sin(x)"
        xRange={[-1, 7]}
        yRange={[-1.5, 1.5]}
        interactive
        showGrid
        color="#f59e0b"
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="integ-q1"
        question="What does the definite integral ∫₀² x dx represent geometrically?"
        options={[
          { text: "The slope of the line y = x at x = 2", feedback: "Slope relates to derivatives, not integrals." },
          { text: "The area of the triangle under y = x from 0 to 2", feedback: "Correct! The region is a right triangle with base 2 and height 2, so area = ½·2·2 = 2." },
          { text: "The length of the curve y = x from 0 to 2", feedback: "Arc length uses a different formula involving √(1 + (dy/dx)²)." },
          { text: "The average value of x on [0, 2]", feedback: "The average value involves dividing by the interval length. The integral alone gives area." },
        ]}
        correctIndex={1}
        hint="Draw the graph of y = x from 0 to 2. What shape is the region below it?"
        explanation="The integral gives the area under y = x from 0 to 2: a triangle with area ½ · base · height = ½ · 2 · 2 = 2."
      />

      <InteractiveQuestion
        id="integ-q2"
        question="What is ∫₀¹ x² dx?"
        options={[
          { text: "1/2", feedback: "That would be ∫₀¹ x dx. The antiderivative of x² is x³/3." },
          { text: "1/3", feedback: "Correct! Antiderivative is x³/3. Evaluate: (1)³/3 − (0)³/3 = 1/3." },
          { text: "1", feedback: "Check the antiderivative of x² using the reverse Power Rule." },
          { text: "2/3", feedback: "Close, but recheck: x³/3 evaluated at x=1 gives 1/3, not 2/3." },
        ]}
        correctIndex={1}
        hint="The antiderivative of xⁿ is xⁿ⁺¹/(n+1)."
        explanation="∫₀¹ x² dx = [x³/3]₀¹ = 1/3 − 0 = 1/3."
      />
    </div>
  );
}
