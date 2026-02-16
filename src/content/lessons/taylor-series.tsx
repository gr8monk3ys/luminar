"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function TaylorSeries() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Approximating Functions with Polynomials</h2>
      <p>
        Polynomials are the friendliest functions in mathematics: easy to
        evaluate, differentiate, and integrate. <strong>Taylor series</strong>{" "}
        let us approximate <em>any</em> smooth function as an infinite
        polynomial. The idea is to match the function&apos;s value and all its
        derivatives at a single point.
      </p>
      <MathBlock
        latex="f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n"
        display
      />
      <p>
        When the center a = 0, this is called a <strong>Maclaurin
        series</strong>. The more terms you include, the better the
        approximation &mdash; at least near the center point.
      </p>

      <h2>Building the eˣ Series</h2>
      <p>
        The exponential function is its own derivative: f(x) = e&#739;, f&apos;(x) = e&#739;,
        f&apos;&apos;(x) = e&#739;, and so on. At x = 0, every derivative equals 1.
        This makes the Maclaurin series particularly clean:
      </p>
      <StepByStep
        title="Derive the Maclaurin series for eˣ"
        steps={[
          {
            title: "List the derivatives at x = 0",
            content:
              "f(0) = 1, f'(0) = 1, f''(0) = 1, ... Every derivative of eˣ evaluated at 0 is 1.",
          },
          {
            title: "Apply the formula",
            content: "Substitute f⁽ⁿ⁾(0) = 1 into the Maclaurin series formula.",
            latex:
              "e^x = \\sum_{n=0}^{\\infty} \\frac{1}{n!} x^n = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots",
          },
          {
            title: "Check convergence",
            content:
              "The ratio test shows this series converges for all real x. The radius of convergence is infinite.",
            latex:
              "\\lim_{n \\to \\infty} \\left|\\frac{x^{n+1}/(n+1)!}{x^n/n!}\\right| = \\lim_{n \\to \\infty} \\frac{|x|}{n+1} = 0 < 1",
          },
        ]}
      />

      <h2>Visualizing Polynomial Approximations</h2>
      <p>
        The graph below shows e&#739;. Imagine stacking Taylor polynomial terms:
        T&#8321;(x) = 1 + x is a tangent line, T&#8322;(x) = 1 + x + x&#178;/2 is a
        parabola that hugs the curve longer, and so on. Each additional term
        extends the region of good approximation.
      </p>
      <GraphPlayground
        equation="exp(x)"
        xRange={[-4, 4]}
        yRange={[-1, 10]}
        interactive
        showGrid
        color="#f59e0b"
      />

      <h2>The sin(x) Series</h2>
      <p>
        The derivatives of sin(x) cycle: sin, cos, -sin, -cos, sin, ...
        At x = 0: f(0) = 0, f&apos;(0) = 1, f&apos;&apos;(0) = 0, f&apos;&apos;&apos;(0) = -1, and the
        pattern repeats. Only odd powers survive:
      </p>
      <MathBlock
        latex="\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} x^{2n+1}"
        display
      />
      <p>
        Similarly, cos(x) keeps only the even powers:
      </p>
      <MathBlock
        latex="\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots"
        display
      />

      <h2>Explore: How Many Terms Are Enough?</h2>
      <p>
        Adjust the slider to control the degree of the Taylor polynomial
        approximating sin(x). Watch how higher-degree polynomials match sin(x)
        over a wider range.
      </p>
      <SliderExploration
        title="Taylor Polynomial for sin(x)"
        description="The parameter n controls the highest power in the polynomial. At n=1 you get the tangent line x; at n=3 you get x - x³/6; and so on."
        parameters={[
          { name: "n", label: "Degree", min: 1, max: 15, step: 2, default: 1 },
        ]}
        equation="sin(x)"
        xRange={[-8, 8]}
        yRange={[-2, 2]}
      />

      <h2>Convergence and Radius of Convergence</h2>
      <p>
        Not every Taylor series converges everywhere. The <strong>radius of
        convergence</strong> R tells you the interval around the center where
        the series faithfully represents the function. For e&#739; and sin(x),
        R = &#8734;. But for 1/(1 - x):
      </p>
      <MathBlock
        latex="\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots \quad \text{for } |x| < 1"
        display
      />
      <p>
        Outside |x| &lt; 1, the geometric series diverges. The radius of convergence
        is R = 1, matching the distance to the singularity at x = 1.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="taylor-q1"
        question="What is the Maclaurin series for eˣ up to the x³ term?"
        options={[
          { text: "1 + x + x² + x³", feedback: "Close, but you are missing the factorial denominators. Each term is xⁿ/n!, not just xⁿ." },
          { text: "1 + x + x²/2 + x³/6", feedback: "Correct! The Maclaurin series for eˣ is Σ xⁿ/n!. The first four terms are 1 + x + x²/2! + x³/3! = 1 + x + x²/2 + x³/6." },
          { text: "x + x²/2 + x³/3", feedback: "This looks like the series for -ln(1-x). The eˣ series starts with 1 and uses factorials." },
          { text: "1 - x + x²/2 - x³/6", feedback: "This is the series for e⁻ˣ, not eˣ. All signs should be positive." },
        ]}
        correctIndex={1}
        hint="Recall that each derivative of eˣ at x=0 is 1, and the nth term has n! in the denominator."
        explanation="eˣ = 1 + x + x²/2! + x³/3! + ... Since 2! = 2 and 3! = 6, the first four terms are 1 + x + x²/2 + x³/6."
      />

      <InteractiveQuestion
        id="taylor-q2"
        question="The Maclaurin series for sin(x) contains only:"
        options={[
          { text: "Even powers of x", feedback: "That would be cos(x). Since sin(0) = 0, there is no constant term." },
          { text: "Odd powers of x", feedback: "Correct! sin(x) = x - x³/3! + x⁵/5! - ... Since sin is an odd function (sin(-x) = -sin(x)), its series has only odd powers." },
          { text: "All powers of x", feedback: "Unlike eˣ, sin(x) has zero-valued derivatives at x=0 for even orders, so even powers vanish." },
          { text: "Only the first power of x", feedback: "The linearization sin(x) ≈ x is just the first term. The full series has infinitely many odd-power terms." },
        ]}
        correctIndex={1}
        hint="Is sin(x) an even function or an odd function?"
        explanation="sin(x) is an odd function: sin(-x) = -sin(x). Odd functions have Taylor series with only odd powers. Even derivatives of sin at 0 are all zero."
      />
    </div>
  );
}
