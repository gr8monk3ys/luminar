"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function ImplicitDifferentiation() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>When You Cannot Solve for y</h2>
      <p>
        Most differentiation you have done so far starts with a function in
        explicit form: y = f(x). But many important equations define y
        <em> implicitly</em> as a function of x without ever isolating y. The
        equation of a circle is a classic example:
      </p>
      <MathBlock latex="x^2 + y^2 = r^2" display />
      <p>
        You cannot write this as a single function y = f(x) because for each x
        there are two possible y values (upper and lower semicircles).
        <strong> Implicit differentiation</strong> lets us find dy/dx directly
        from the equation, without ever solving for y.
      </p>

      <h2>The Key Idea</h2>
      <p>
        Differentiate both sides of the equation with respect to x. Whenever you
        differentiate a term containing y, apply the chain rule &mdash; treat y
        as a function of x, so every derivative of y picks up a factor of dy/dx.
        Then solve for dy/dx algebraically.
      </p>
      <MathBlock
        latex="\frac{d}{dx}[y^2] = 2y \cdot \frac{dy}{dx}"
        display
      />
      <p>
        That factor of dy/dx appearing from the chain rule is the entire engine
        of implicit differentiation.
      </p>

      <h2>Visualizing the Circle</h2>
      <p>
        The graph below shows the upper semicircle of x&#178; + y&#178; = 4,
        plotted as y = sqrt(4 - x&#178;). At any point on this curve, the
        tangent line slope equals dy/dx found via implicit differentiation.
      </p>
      <GraphPlayground
        equation="sqrt(4 - x^2)"
        xRange={[-3, 3]}
        yRange={[-0.5, 3]}
        interactive
        showGrid
        color="#ec4899"
      />

      <h2>Worked Example: The Circle</h2>
      <StepByStep
        title="Find dy/dx for x² + y² = 4"
        steps={[
          {
            title: "Differentiate both sides with respect to x",
            content:
              "Apply d/dx to each term. Remember y is a function of x, so use the chain rule on y².",
            latex:
              "\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y^2] = \\frac{d}{dx}[4]",
          },
          {
            title: "Apply the chain rule",
            content: "The derivative of x² is 2x. The derivative of y² is 2y(dy/dx). The right side is 0.",
            latex: "2x + 2y\\frac{dy}{dx} = 0",
          },
          {
            title: "Solve for dy/dx",
            content: "Isolate dy/dx by moving 2x to the other side and dividing by 2y.",
            latex: "\\frac{dy}{dx} = -\\frac{x}{y}",
          },
          {
            title: "Interpret the result",
            content:
              "At the point (1, √3) on the circle, the slope is -1/√3. Notice dy/dx depends on both x and y — this is typical of implicit differentiation.",
            latex:
              "\\frac{dy}{dx}\\bigg|_{(1,\\sqrt{3})} = -\\frac{1}{\\sqrt{3}}",
          },
        ]}
      />

      <h2>A More Complex Example</h2>
      <p>
        Find dy/dx for the equation:
      </p>
      <MathBlock latex="x^3 + y^3 = 6xy" display />
      <StepByStep
        title="Implicit differentiation of x³ + y³ = 6xy"
        steps={[
          {
            title: "Differentiate both sides",
            content:
              "On the right, 6xy is a product of two functions of x (since y depends on x), so use the product rule.",
            latex:
              "3x^2 + 3y^2\\frac{dy}{dx} = 6y + 6x\\frac{dy}{dx}",
          },
          {
            title: "Collect dy/dx terms on one side",
            content: "Move all terms involving dy/dx to the left, everything else to the right.",
            latex:
              "3y^2\\frac{dy}{dx} - 6x\\frac{dy}{dx} = 6y - 3x^2",
          },
          {
            title: "Factor and solve",
            content: "Factor out dy/dx and divide.",
            latex:
              "\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}",
          },
        ]}
      />

      <h2>Related Rates: A Quick Connection</h2>
      <p>
        Implicit differentiation is the foundation for <strong>related
        rates</strong> problems. When two quantities both change with time, you
        differentiate an equation relating them with respect to <em>t</em>{" "}
        instead of x. Every variable picks up a d/dt factor via the chain rule.
      </p>
      <MathBlock
        latex="\frac{d}{dt}[x^2 + y^2 = r^2] \implies 2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0"
        display
      />
      <p>
        For example, if a ladder slides down a wall, x and y (the foot distance
        and height) are related by x&#178; + y&#178; = L&#178;. Knowing dx/dt lets you
        find dy/dt.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="implicit-q1"
        question="When differentiating y³ with respect to x, the result is:"
        options={[
          { text: "3y²", feedback: "This would be correct if differentiating with respect to y. But we need the chain rule since y depends on x." },
          { text: "3y² (dy/dx)", feedback: "Correct! The chain rule gives us the derivative of the outer function (3y²) times the derivative of the inner function (dy/dx)." },
          { text: "3x²", feedback: "This confuses x and y. We are differentiating y³, not x³." },
          { text: "y³ (dy/dx)", feedback: "The power rule still applies to the outer function: d/dy[y³] = 3y²." },
        ]}
        correctIndex={1}
        hint="Apply the chain rule: d/dx[f(y)] = f'(y) · dy/dx."
        explanation="Implicit differentiation uses the chain rule. d/dx[y³] = 3y² · (dy/dx) because y is a function of x."
      />

      <InteractiveQuestion
        id="implicit-q2"
        question="For the circle x² + y² = 25, what is the slope of the tangent line at the point (3, 4)?"
        options={[
          { text: "-3/4", feedback: "Correct! dy/dx = -x/y = -3/4. The tangent line at (3, 4) slopes downward to the right, which makes geometric sense for the upper-right portion of the circle." },
          { text: "3/4", feedback: "Close, but the sign is wrong. On the upper right of the circle, the tangent slopes downward." },
          { text: "-4/3", feedback: "You have the fraction inverted. dy/dx = -x/y, not -y/x." },
          { text: "4/3", feedback: "Both the sign and the fraction are wrong. Recall dy/dx = -x/y." },
        ]}
        correctIndex={0}
        hint="Use the result dy/dx = -x/y from differentiating x² + y² = r²."
        explanation="From implicit differentiation of x² + y² = 25, we get dy/dx = -x/y. At (3, 4): dy/dx = -3/4."
      />

      <h3>Challenge</h3>
      <p>
        Find dy/dx for the equation sin(xy) = x using implicit differentiation.
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Differentiate both sides: cos(xy) &middot; (y + x &middot; dy/dx) = 1.
          Expand: y cos(xy) + x cos(xy) &middot; dy/dx = 1. Solve:
        </p>
        <MathBlock
          latex="\frac{dy}{dx} = \frac{1 - y\cos(xy)}{x\cos(xy)}"
          display
        />
      </RevealAnswer>
    </div>
  );
}
