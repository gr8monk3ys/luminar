"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function RandomVariables() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Random Variables: From Outcomes to Numbers</h2>
      <p>
        A <strong>random variable</strong> is a function that assigns a
        numerical value to each outcome of a random experiment. Instead of
        talking about abstract outcomes like &ldquo;heads&rdquo; or
        &ldquo;tails,&rdquo; we map them to numbers (e.g., 1 and 0) so we can
        do arithmetic, compute averages, and build mathematical models.
      </p>
      <p>
        We denote random variables with capital letters like <em>X</em>,{" "}
        <em>Y</em>, <em>Z</em>, while their specific values are written in
        lowercase: <em>x</em>, <em>y</em>, <em>z</em>.
      </p>

      <h2>Discrete Random Variables</h2>
      <p>
        A <strong>discrete</strong> random variable takes on a countable number
        of values (often integers). Examples include the number showing on a
        die, the number of heads in 10 coin flips, or the number of customers
        arriving in an hour.
      </p>
      <p>
        The distribution of a discrete random variable is described by its{" "}
        <strong>probability mass function (PMF)</strong>, which gives the
        probability of each possible value:
      </p>
      <MathBlock latex="p(x) = P(X = x), \quad \text{where } \sum_{\text{all } x} p(x) = 1" display />
      <p>
        For a fair six-sided die, the PMF is particularly simple: each value
        from 1 to 6 has probability 1/6.
      </p>
      <MathBlock latex="p(x) = \frac{1}{6} \quad \text{for } x \in \{1, 2, 3, 4, 5, 6\}" display />

      <h2>Continuous Random Variables</h2>
      <p>
        A <strong>continuous</strong> random variable can take any value in an
        interval (or the entire real line). Examples include height, temperature,
        and waiting time. For continuous variables, the probability at any
        single point is zero: P(X = x) = 0. Instead, we work with the{" "}
        <strong>probability density function (PDF)</strong>:
      </p>
      <MathBlock latex="P(a \le X \le b) = \int_a^b f(x)\, dx" display />
      <p>
        The PDF <em>f(x)</em> is not a probability itself &mdash; it can exceed
        1 &mdash; but the area under the curve between any two points gives
        the probability that <em>X</em> falls in that range. The total area
        under the entire curve equals 1.
      </p>

      <h2>Visualizing a PDF</h2>
      <p>
        The graph below shows the PDF of a continuous uniform distribution on
        [0, 1]. The function equals 1 everywhere in the interval (a flat line),
        and the total area is 1 &times; 1 = 1. The probability that X falls
        between 0.2 and 0.5 is the area of that rectangle: 0.3.
      </p>
      <GraphPlayground
        equation="(x >= 0 && x <= 1) ? 1 : 0"
        xRange={[-0.5, 1.5]}
        yRange={[-0.2, 1.5]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>The Cumulative Distribution Function (CDF)</h2>
      <p>
        The <strong>CDF</strong> gives the probability that the random variable
        is less than or equal to a value:
      </p>
      <MathBlock latex="F(x) = P(X \le x)" display />
      <p>
        The CDF is non-decreasing, starts at 0 (as x &rarr; &minus;&infin;),
        and approaches 1 (as x &rarr; +&infin;). For discrete variables the CDF
        is a step function; for continuous variables it is a smooth curve. The
        CDF is the integral of the PDF.
      </p>

      <h2>Worked Example: Dice PMF</h2>
      <StepByStep
        title="Construct the CDF for a fair six-sided die"
        steps={[
          {
            title: "List the PMF values",
            content:
              "Each outcome has probability 1/6.",
            latex: "p(1) = p(2) = \\cdots = p(6) = \\frac{1}{6}",
          },
          {
            title: "Build the CDF by accumulation",
            content:
              "F(x) = sum of all p(k) for k ≤ x.",
            latex:
              "F(1) = \\tfrac{1}{6},\\; F(2) = \\tfrac{2}{6},\\; F(3) = \\tfrac{3}{6},\\; F(4) = \\tfrac{4}{6},\\; F(5) = \\tfrac{5}{6},\\; F(6) = 1",
          },
          {
            title: "Use the CDF to find probabilities",
            content:
              "P(X ≤ 4) = F(4) = 4/6 = 2/3. For a range: P(3 ≤ X ≤ 5) = F(5) − F(2) = 5/6 − 2/6 = 1/2.",
            latex: "P(3 \\le X \\le 5) = F(5) - F(2) = \\frac{5}{6} - \\frac{2}{6} = \\frac{1}{2}",
          },
        ]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="rv-q1"
        question="For a continuous random variable, what is P(X = 3.5)?"
        options={[
          { text: "Depends on the distribution", feedback: "For any continuous distribution, the probability of any single exact point is the same." },
          { text: "0", feedback: "Correct! For continuous random variables, the probability of any exact value is zero. We can only compute probabilities over intervals." },
          { text: "Very small but positive", feedback: "It is exactly zero, not just very small. This is a fundamental property of continuous distributions." },
          { text: "1/n for some n", feedback: "That applies to discrete uniform distributions, not continuous ones." },
        ]}
        correctIndex={1}
        hint="Think about the area under the PDF curve at a single point — what is the width?"
        explanation="A single point has zero width, so the integral over it is zero. For continuous variables, only intervals have nonzero probability."
      />

      <InteractiveQuestion
        id="rv-q2"
        question="A random variable X has PMF: P(X=1) = 0.2, P(X=2) = 0.5, P(X=3) = 0.3. What is P(X ≤ 2)?"
        options={[
          { text: "0.2", feedback: "That is only P(X=1). You also need to include P(X=2)." },
          { text: "0.5", feedback: "That is only P(X=2). The CDF accumulates all values up to and including 2." },
          { text: "0.7", feedback: "Correct! P(X ≤ 2) = P(X=1) + P(X=2) = 0.2 + 0.5 = 0.7." },
          { text: "1.0", feedback: "That would be P(X ≤ 3). We only go up to 2." },
        ]}
        correctIndex={2}
        hint="The CDF at 2 is the sum of all PMF values for X ≤ 2."
        explanation="F(2) = P(X=1) + P(X=2) = 0.2 + 0.5 = 0.7."
      />

      <h3>Practice</h3>
      <p>
        A continuous random variable has PDF f(x) = 2x for 0 &le; x &le; 1 and
        f(x) = 0 elsewhere. Find P(0.5 &le; X &le; 1).
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="P(0.5 \le X \le 1) = \int_{0.5}^{1} 2x\, dx = \left[ x^2 \right]_{0.5}^{1} = 1 - 0.25 = 0.75"
          display
        />
        <p>
          This distribution is skewed toward higher values since the PDF
          increases linearly. Three-quarters of the probability mass lies in
          the upper half of the interval.
        </p>
      </RevealAnswer>
    </div>
  );
}
