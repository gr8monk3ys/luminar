"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function ExpectedValue() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Expected Value: The Long-Run Average</h2>
      <p>
        The <strong>expected value</strong> (or mean) of a random variable is
        the weighted average of all possible values, where each value is
        weighted by its probability. It answers the question: &ldquo;If we
        repeated this experiment infinitely many times, what would the average
        outcome be?&rdquo;
      </p>
      <p>For a discrete random variable X:</p>
      <MathBlock latex="E[X] = \sum_{x} x \cdot P(X = x)" display />
      <p>For a continuous random variable with PDF f(x):</p>
      <MathBlock latex="E[X] = \int_{-\infty}^{\infty} x \cdot f(x)\, dx" display />
      <p>
        The expected value is not necessarily a value that X can actually take.
        The expected value of a fair die roll is 3.5, even though you can never
        roll a 3.5.
      </p>

      <h2>Linearity of Expectation</h2>
      <p>
        One of the most powerful properties in probability is the{" "}
        <strong>linearity of expectation</strong>. For any random variables X
        and Y and constants a, b:
      </p>
      <MathBlock latex="E[aX + bY] = aE[X] + bE[Y]" display />
      <p>
        Remarkably, this holds even when X and Y are dependent. This makes it
        an incredibly versatile tool. For example, the expected number of heads
        in 100 coin flips is simply 100 &times; E[one flip] = 100 &times; 0.5 = 50,
        regardless of any correlation between flips.
      </p>

      <h2>Variance and Standard Deviation</h2>
      <p>
        The expected value tells us the center, but not how spread out the
        distribution is. The <strong>variance</strong> measures the average
        squared deviation from the mean:
      </p>
      <MathBlock latex="\text{Var}(X) = E\left[(X - \mu)^2\right] = E[X^2] - (E[X])^2" display />
      <p>
        The <strong>standard deviation</strong> is the square root of the
        variance, bringing us back to the original units:
      </p>
      <MathBlock latex="\sigma = \sqrt{\text{Var}(X)}" display />
      <p>
        A small standard deviation means values cluster tightly around the
        mean; a large one means they are spread out.
      </p>

      <h2>Casino Game Example</h2>
      <StepByStep
        title="Is this casino game fair?"
        steps={[
          {
            title: "Define the game",
            content:
              "You pay $5 to play. You roll a die: if you roll a 6 you win $20 (net gain $15). Otherwise you lose your $5 (net gain −$5).",
          },
          {
            title: "Set up the expected value",
            content:
              "The random variable X is your net gain. List the outcomes and their probabilities.",
            latex: "E[X] = 15 \\cdot \\frac{1}{6} + (-5) \\cdot \\frac{5}{6}",
          },
          {
            title: "Compute",
            content: "Multiply and add.",
            latex:
              "E[X] = \\frac{15}{6} + \\frac{-25}{6} = \\frac{-10}{6} \\approx -\\$1.67",
          },
          {
            title: "Interpret",
            content:
              "On average, you lose about $1.67 per game. This is not a fair game — the house has an edge. Over 100 games, you expect to lose about $167.",
            latex: "E[\\text{100 games}] = 100 \\times (-1.67) = -\\$167",
          },
        ]}
      />

      <h2>Explore: How Payout Affects Expected Value</h2>
      <SliderExploration
        title="Casino Game Expected Value"
        description="Adjust the payout for rolling a 6 (you still pay $5 to play). Watch how the expected value changes. At what payout does the game become fair (E[X] = 0)?"
        parameters={[
          { name: "payout", label: "Win amount ($)", min: 0, max: 60, step: 1, default: 20 },
        ]}
        equation="((x - 5) * (1/6)) + ((-5) * (5/6))"
        xRange={[0, 60]}
        yRange={[-6, 6]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="ev-q1"
        question="A lottery ticket costs $1. With probability 1/1000 you win $500. What is the expected net gain?"
        options={[
          { text: "$0.50", feedback: "Remember to subtract the cost of the ticket from the winnings." },
          { text: "−$0.50", feedback: "Correct! E[X] = (500−1)(1/1000) + (−1)(999/1000) = 499/1000 − 999/1000 = −500/1000 = −$0.50." },
          { text: "$499", feedback: "That is the net prize, not the expected value. You need to weight by probability." },
          { text: "−$1.00", feedback: "You are ignoring the chance of winning. The expected loss is less than the ticket price." },
        ]}
        correctIndex={1}
        hint="Compute E[net gain] = (win amount − cost) × P(win) + (−cost) × P(lose)."
        explanation="E[X] = (499)(0.001) + (−1)(0.999) = 0.499 − 0.999 = −$0.50. On average you lose 50 cents per ticket."
      />

      <InteractiveQuestion
        id="ev-q2"
        question="If E[X] = 10 and E[Y] = 7, what is E[3X + 2Y]?"
        options={[
          { text: "44", feedback: "Correct! By linearity: E[3X + 2Y] = 3·E[X] + 2·E[Y] = 3(10) + 2(7) = 30 + 14 = 44." },
          { text: "51", feedback: "Check your arithmetic: 3(10) + 2(7) = 30 + 14 = 44." },
          { text: "17", feedback: "You need to apply the coefficients: 3 × 10 + 2 × 7, not just 10 + 7." },
          { text: "Cannot determine without more information", feedback: "Linearity of expectation works regardless of the relationship between X and Y!" },
        ]}
        correctIndex={0}
        hint="Use linearity: E[aX + bY] = aE[X] + bE[Y]. This works even if X and Y are dependent."
        explanation="E[3X + 2Y] = 3(10) + 2(7) = 44. Linearity of expectation is one of the most useful properties in probability."
      />

      <h3>Practice</h3>
      <p>
        A discrete random variable X has the following distribution: P(X=1) = 0.3,
        P(X=2) = 0.4, P(X=5) = 0.3. Compute the variance of X.
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="E[X] = 1(0.3) + 2(0.4) + 5(0.3) = 0.3 + 0.8 + 1.5 = 2.6"
          display
        />
        <MathBlock
          latex="E[X^2] = 1^2(0.3) + 2^2(0.4) + 5^2(0.3) = 0.3 + 1.6 + 7.5 = 9.4"
          display
        />
        <MathBlock
          latex="\text{Var}(X) = E[X^2] - (E[X])^2 = 9.4 - 2.6^2 = 9.4 - 6.76 = 2.64"
          display
        />
        <p>
          The standard deviation is &sigma; = &radic;2.64 &approx; 1.625. This
          tells us that values typically deviate from the mean of 2.6 by about
          1.6 units.
        </p>
      </RevealAnswer>
    </div>
  );
}
