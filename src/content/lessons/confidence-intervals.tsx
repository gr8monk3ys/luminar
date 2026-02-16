"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function ConfidenceIntervals() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Confidence Intervals: Quantifying Uncertainty</h2>
      <p>
        A <strong>point estimate</strong> gives us a single best guess for a
        population parameter &mdash; for example, the sample mean as an
        estimate of the population mean. But a single number tells us nothing
        about how precise our estimate is. A{" "}
        <strong>confidence interval</strong> provides a range of plausible
        values, capturing the uncertainty inherent in sampling.
      </p>
      <p>
        The general form of a confidence interval for the mean is:
      </p>
      <MathBlock
        latex="\bar{x} \pm z^* \cdot \frac{\sigma}{\sqrt{n}}"
        display
      />
      <p>
        where <em>x&#772;</em> is the sample mean, <em>z*</em> is the critical
        value for the desired confidence level, <em>&sigma;</em> is the
        standard deviation, and <em>n</em> is the sample size.
      </p>

      <h2>What Does &ldquo;95% Confident&rdquo; Mean?</h2>
      <p>
        A <strong>95% confidence interval</strong> does <em>not</em> mean there
        is a 95% probability the true parameter lies in the interval. The true
        parameter is fixed &mdash; it either is or is not in the interval.
        Instead, it means: if we repeated this sampling procedure many times,
        about 95% of the resulting intervals would contain the true parameter.
      </p>
      <p>
        Common confidence levels and their critical values:
      </p>
      <ul>
        <li>90% confidence: z* = 1.645</li>
        <li>95% confidence: z* = 1.960</li>
        <li>99% confidence: z* = 2.576</li>
      </ul>
      <MathBlock
        latex="z^* = \begin{cases} 1.645 & 90\% \\ 1.960 & 95\% \\ 2.576 & 99\% \end{cases}"
        display
      />

      <h2>Margin of Error</h2>
      <p>
        The <strong>margin of error</strong> is the &ldquo;plus or minus&rdquo;
        part of the confidence interval:
      </p>
      <MathBlock latex="E = z^* \cdot \frac{\sigma}{\sqrt{n}}" display />
      <p>
        Notice that the margin of error depends on three factors: the
        confidence level (through z*), the population variability (&sigma;), and
        the sample size (n). We can control the margin of error by adjusting
        the sample size.
      </p>

      <h2>Visualizing the Sampling Distribution</h2>
      <p>
        The confidence interval is built around the sampling distribution of
        the mean. By the Central Limit Theorem, the sample mean follows
        approximately a normal distribution centered at the true population
        mean. The graph below shows this sampling distribution for n = 25
        with &sigma; = 10.
      </p>
      <GraphPlayground
        equation="(1/(2*sqrt(2*3.14159))) * exp(-x*x/(2*4))"
        xRange={[-8, 8]}
        yRange={[0, 0.25]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Construct a 95% confidence interval for the mean height of students"
        steps={[
          {
            title: "Given information",
            content:
              "Sample of n = 64 students, sample mean x̄ = 67.5 inches, population standard deviation σ = 4 inches.",
          },
          {
            title: "Find the critical value",
            content: "For 95% confidence, z* = 1.960.",
            latex: "z^* = 1.960",
          },
          {
            title: "Compute the standard error",
            content: "The standard error is σ/√n.",
            latex: "SE = \\frac{\\sigma}{\\sqrt{n}} = \\frac{4}{\\sqrt{64}} = \\frac{4}{8} = 0.5",
          },
          {
            title: "Compute the margin of error",
            content: "Multiply the critical value by the standard error.",
            latex: "E = 1.960 \\times 0.5 = 0.98",
          },
          {
            title: "Build the interval",
            content: "Add and subtract the margin of error from the sample mean.",
            latex:
              "67.5 \\pm 0.98 = (66.52,\\; 68.48)",
          },
          {
            title: "Interpret",
            content:
              "We are 95% confident that the true mean height of all students is between 66.52 and 68.48 inches.",
          },
        ]}
      />

      <h2>Explore: How Sample Size Affects the Interval</h2>
      <SliderExploration
        title="Sample Size and Margin of Error"
        description="Adjust the sample size n and observe how the margin of error shrinks. The margin of error decreases proportionally to 1/√n, so quadrupling the sample size cuts the margin of error in half. (Using z* = 1.96 and σ = 10.)"
        parameters={[
          { name: "n", label: "Sample size (n)", min: 4, max: 500, step: 1, default: 25 },
        ]}
        equation="1.96 * 10 / sqrt(x)"
        xRange={[4, 500]}
        yRange={[0, 12]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="ci-q1"
        question="A 95% confidence interval for the mean is (42, 58). What is the point estimate and margin of error?"
        options={[
          { text: "Point estimate = 50, margin of error = 8", feedback: "Correct! The point estimate is the midpoint: (42+58)/2 = 50. The margin of error is the half-width: (58−42)/2 = 8." },
          { text: "Point estimate = 42, margin of error = 16", feedback: "The point estimate is the center of the interval, not the lower bound. And 16 is the full width, not the margin of error." },
          { text: "Point estimate = 50, margin of error = 16", feedback: "The point estimate is correct, but the margin of error is half the width: (58−42)/2 = 8." },
          { text: "Point estimate = 48, margin of error = 10", feedback: "The midpoint of (42, 58) is 50, not 48." },
        ]}
        correctIndex={0}
        hint="The point estimate is the midpoint of the interval. The margin of error is the half-width."
        explanation="Point estimate = (42+58)/2 = 50. Margin of error = (58−42)/2 = 8. The interval is 50 ± 8."
      />

      <InteractiveQuestion
        id="ci-q2"
        question="You want to cut the margin of error in half. By what factor must you increase the sample size?"
        options={[
          { text: "Double it (2×)", feedback: "Since E ∝ 1/√n, doubling n only reduces E by factor √2 ≈ 1.41, not 2." },
          { text: "Quadruple it (4×)", feedback: "Correct! Since E ∝ 1/√n, to halve E we need √(n_new) = 2√(n_old), so n_new = 4 × n_old." },
          { text: "Halve it", feedback: "Reducing the sample size would increase the margin of error, not decrease it." },
          { text: "It depends on σ", feedback: "The multiplicative factor needed is always 4× regardless of σ, because E ∝ 1/√n." },
        ]}
        correctIndex={1}
        hint="The margin of error is proportional to 1/√n. Solve for the factor that makes 1/√(kn) = (1/2)(1/√n)."
        explanation="Since E = z*σ/√n, halving E requires quadrupling n. This is the 'square root law' — precision improves slowly with sample size, making large studies expensive."
      />

      <h3>Practice</h3>
      <p>
        A poll surveys 400 voters and finds 55% support a policy. Construct a
        99% confidence interval for the true proportion. (Hint: for proportions,
        SE = &radic;(p&#770;(1&minus;p&#770;)/n).)
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="SE = \sqrt{\frac{0.55 \times 0.45}{400}} = \sqrt{\frac{0.2475}{400}} = \sqrt{0.000619} \approx 0.0249"
          display
        />
        <MathBlock
          latex="0.55 \pm 2.576 \times 0.0249 = 0.55 \pm 0.064 = (0.486,\; 0.614)"
          display
        />
        <p>
          We are 99% confident that the true proportion of voters who support
          the policy is between 48.6% and 61.4%. The wide interval reflects
          both the high confidence level and the inherent uncertainty from
          polling only 400 people.
        </p>
      </RevealAnswer>
    </div>
  );
}
