"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function NormalDistribution() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Normal Distribution: The Bell Curve</h2>
      <p>
        The <strong>normal distribution</strong> (or Gaussian distribution) is
        the most important probability distribution in statistics. It describes
        an astonishing range of natural phenomena: heights, test scores,
        measurement errors, and much more. The Central Limit Theorem explains
        why: whenever you average many independent random effects, the result
        tends toward a normal distribution regardless of the underlying
        distributions.
      </p>
      <p>
        The normal distribution is completely described by two parameters: the
        mean <em>&mu;</em> (center) and the standard deviation <em>&sigma;</em>{" "}
        (spread). Its PDF is:
      </p>
      <MathBlock
        latex="f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x-\mu)^2}{2\sigma^2}}"
        display
      />
      <p>We write X ~ N(&mu;, &sigma;&sup2;) to indicate that X follows a
        normal distribution with mean &mu; and variance &sigma;&sup2;.
      </p>

      <h2>The Shape of the Bell Curve</h2>
      <p>
        The graph below shows the standard normal distribution N(0, 1). Notice
        the symmetric bell shape, centered at 0. The curve extends infinitely
        in both directions but drops off rapidly &mdash; values beyond 3
        standard deviations are extremely rare.
      </p>
      <GraphPlayground
        equation="(1/sqrt(2*3.14159)) * exp(-x*x/2)"
        xRange={[-4, 4]}
        yRange={[0, 0.5]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>The 68-95-99.7 Rule (Empirical Rule)</h2>
      <p>
        One of the most practical facts about the normal distribution is the{" "}
        <strong>empirical rule</strong>:
      </p>
      <ul>
        <li><strong>68%</strong> of data falls within 1 standard deviation of the mean: &mu; &plusmn; &sigma;</li>
        <li><strong>95%</strong> of data falls within 2 standard deviations: &mu; &plusmn; 2&sigma;</li>
        <li><strong>99.7%</strong> of data falls within 3 standard deviations: &mu; &plusmn; 3&sigma;</li>
      </ul>
      <MathBlock
        latex="P(\mu - k\sigma \le X \le \mu + k\sigma) \approx \begin{cases} 0.68 & k=1 \\ 0.95 & k=2 \\ 0.997 & k=3 \end{cases}"
        display
      />

      <h2>Z-Scores: Standardization</h2>
      <p>
        A <strong>z-score</strong> tells you how many standard deviations a
        value is from the mean. It converts any normal distribution to the
        standard normal N(0, 1):
      </p>
      <MathBlock latex="z = \frac{x - \mu}{\sigma}" display />
      <p>
        A z-score of 2 means the value is 2 standard deviations above the
        mean. A z-score of &minus;1.5 means 1.5 standard deviations below.
        Standardization lets us use a single table (or function) for all normal
        distributions.
      </p>

      <h2>Explore: How &mu; and &sigma; Shape the Curve</h2>
      <SliderExploration
        title="Normal Distribution Parameters"
        description="Adjust σ (standard deviation) to see how it affects the spread of the bell curve. A larger σ makes the curve wider and shorter; a smaller σ makes it taller and narrower. The total area always remains 1."
        parameters={[
          { name: "sigma", label: "σ (std dev)", min: 0.5, max: 3, step: 0.1, default: 1 },
        ]}
        equation="(1/(x*sqrt(2*3.14159))) * exp(-1/(2))"
        xRange={[0.5, 3]}
        yRange={[0, 1]}
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Exam scores are normally distributed with μ = 72 and σ = 8. What proportion score above 88?"
        steps={[
          {
            title: "Compute the z-score",
            content: "Convert the raw score to a z-score.",
            latex: "z = \\frac{88 - 72}{8} = \\frac{16}{8} = 2",
          },
          {
            title: "Interpret the z-score",
            content:
              "A score of 88 is exactly 2 standard deviations above the mean.",
          },
          {
            title: "Find the probability using the empirical rule",
            content:
              "By the 68-95-99.7 rule, 95% of scores fall within 2σ of the mean. That leaves 5% in both tails combined, so 2.5% are above z = 2.",
            latex: "P(X > 88) = P(Z > 2) \\approx 0.025 = 2.5\\%",
          },
          {
            title: "Interpret",
            content:
              "About 2.5% of students score above 88. This is a relatively rare, high score.",
          },
        ]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="normal-q1"
        question="IQ scores follow N(100, 15²). Using the empirical rule, approximately what percentage of people have an IQ between 70 and 130?"
        options={[
          { text: "68%", feedback: "70 and 130 are each 2 standard deviations from 100, not 1." },
          { text: "95%", feedback: "Correct! 70 = 100 − 2(15) and 130 = 100 + 2(15), so this range covers μ ± 2σ, which contains about 95% of the population." },
          { text: "99.7%", feedback: "That would be μ ± 3σ, which is 55 to 145." },
          { text: "50%", feedback: "The range μ ± 2σ covers much more than half the distribution." },
        ]}
        correctIndex={1}
        hint="Compute how many standard deviations 70 and 130 are from the mean of 100."
        explanation="70 = 100 − 30 = 100 − 2(15) and 130 = 100 + 30 = 100 + 2(15). By the empirical rule, μ ± 2σ captures about 95% of a normal distribution."
      />

      <InteractiveQuestion
        id="normal-q2"
        question="A z-score of −1.5 means the value is:"
        options={[
          { text: "1.5 standard deviations above the mean", feedback: "A negative z-score indicates the value is below the mean, not above." },
          { text: "1.5 standard deviations below the mean", feedback: "Correct! The negative sign indicates the value is below the mean, and the magnitude tells us by how many standard deviations." },
          { text: "1.5 times the mean", feedback: "The z-score measures distance in standard deviations, not multiples of the mean." },
          { text: "In the bottom 1.5% of the distribution", feedback: "The z-score tells us position in standard deviations, not a direct percentile." },
        ]}
        correctIndex={1}
        hint="The sign of z tells you the direction (above or below mean), and the magnitude tells you the distance in units of σ."
        explanation="z = (x − μ)/σ = −1.5 means x = μ − 1.5σ. The value is 1.5 standard deviations below the mean."
      />

      <h3>Practice</h3>
      <p>
        Adult male heights follow N(70, 3&sup2;) in inches. What is the z-score
        for someone who is 6 feet 4 inches (76 inches) tall, and approximately
        what percentage of men are taller?
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="z = \frac{76 - 70}{3} = 2.0"
          display
        />
        <p>
          A z-score of 2.0 means this height is 2 standard deviations above the
          mean. By the empirical rule, about 2.5% of men are taller than 76
          inches (6&prime;4&Prime;). This confirms the intuition that this is an
          unusually tall height.
        </p>
      </RevealAnswer>
    </div>
  );
}
