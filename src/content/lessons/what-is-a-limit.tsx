"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function WhatIsALimit() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>What Is a Limit?</h2>
      <p>
        Imagine walking toward a wall. With each step you cover half the remaining
        distance. You never actually touch the wall, yet you get arbitrarily close.
        This everyday experience captures the essence of a <strong>limit</strong> in
        mathematics: a value that a function or sequence &ldquo;approaches&rdquo; as
        the input moves toward some target.
      </p>
      <p>
        Formally, we write the limit of <em>f(x)</em> as <em>x</em> approaches
        <em>a</em> like this:
      </p>
      <MathBlock latex="\lim_{x \to a} f(x) = L" display />
      <p>
        This notation means that as <em>x</em> gets closer and closer to <em>a</em>
        (from either side), the output <em>f(x)</em> gets closer and closer to the
        value <em>L</em>. Crucially, the function does not need to equal <em>L</em>{" "}
        at <em>x = a</em> &mdash; it only matters what happens <em>near</em> that
        point.
      </p>

      <h2>Visualizing a Limit</h2>
      <p>
        The graph below shows the function <em>f(x) = sin(x)/x</em>. Notice that the
        function is not defined at <em>x = 0</em> (division by zero), yet the curve
        clearly &ldquo;wants&rdquo; to reach a particular height as we zoom in toward
        the origin. That height is the limit.
      </p>
      <GraphPlayground
        equation="sin(x)/x"
        xRange={[-10, 10]}
        yRange={[-0.5, 1.5]}
        interactive
        showGrid
        color="#6366f1"
      />
      <p>
        Try clicking on the graph and dragging to zoom in near <em>x = 0</em>. You
        will see that the curve approaches a <em>y</em>-value of 1. Even though
        <em>f(0)</em> is undefined, the limit exists and equals 1.
      </p>
      <MathBlock latex="\lim_{x \to 0} \frac{\sin x}{x} = 1" display />

      <h2>Exploring Left-Hand and Right-Hand Limits</h2>
      <p>
        Sometimes a function approaches different values depending on which direction
        you come from. The <strong>left-hand limit</strong> examines values of <em>x</em>{" "}
        less than <em>a</em>, while the <strong>right-hand limit</strong> examines
        values greater than <em>a</em>. A two-sided limit exists only when both
        one-sided limits agree.
      </p>
      <SliderExploration
        title="Approach a Point"
        description="Use the slider to move x toward 2 and watch how f(x) = x² behaves. Notice the output value approaching 4 from both sides."
        parameters={[
          { name: "x", label: "x value", min: 0, max: 4, step: 0.01, default: 0.5 },
        ]}
        equation="x^2"
        xRange={[0, 4]}
        yRange={[0, 16]}
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Evaluate lim (x→3) of (x² − 9) / (x − 3)"
        steps={[
          {
            title: "Identify the indeterminate form",
            content:
              "Substituting x = 3 directly gives 0/0, which is indeterminate. We need algebraic simplification.",
            latex: "\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0}",
          },
          {
            title: "Factor the numerator",
            content:
              "The numerator is a difference of squares: x² − 9 = (x − 3)(x + 3).",
            latex: "\\frac{(x-3)(x+3)}{x-3}",
          },
          {
            title: "Cancel the common factor",
            content:
              "For x ≠ 3 we can cancel (x − 3), leaving a simpler expression.",
            latex: "x + 3",
          },
          {
            title: "Evaluate the simplified expression",
            content: "Now substitute x = 3 into the simplified expression.",
            latex: "3 + 3 = 6",
          },
        ]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="limit-q1"
        question="What does it mean for lim(x→a) f(x) = L?"
        options={[
          {
            text: "f(a) = L",
            feedback:
              "Not quite. The function does not need to be defined at a, or its value there could differ from L. The limit only describes the trend near a.",
          },
          {
            text: "f(x) gets arbitrarily close to L as x approaches a",
            feedback:
              "Correct! The limit describes what the output approaches, regardless of the actual value at x = a.",
          },
          {
            text: "f(x) equals L for all x near a",
            feedback:
              "Not exactly. The function values get close to L but do not need to equal it at every nearby point.",
          },
          {
            text: "x equals a at some point",
            feedback:
              "This confuses the input with the output. The limit is about the behavior of f(x), not about x reaching a.",
          },
        ]}
        correctIndex={1}
        hint="Think about the wall-walking analogy: you approach a destination without necessarily arriving."
        explanation="A limit describes the value that f(x) tends toward as x gets close to a. The function itself may or may not actually reach that value."
      />

      <InteractiveQuestion
        id="limit-q2"
        question="What is lim(x→0) sin(x)/x?"
        options={[
          { text: "0", feedback: "Plugging in gives 0/0, which is indeterminate — not the answer." },
          { text: "1", feedback: "Correct! This famous limit equals 1, as seen in the graph above." },
          { text: "Undefined", feedback: "The function value at 0 is undefined, but the limit still exists." },
          { text: "∞", feedback: "The function stays bounded near 0; it does not blow up." },
        ]}
        correctIndex={1}
        hint="Look at the graph near x = 0."
        explanation="Although sin(0)/0 is undefined, the surrounding values converge to 1, so the limit is 1."
      />
    </div>
  );
}
