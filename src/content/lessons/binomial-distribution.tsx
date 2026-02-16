"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BinomialDistribution() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Binomial Distribution</h2>
      <p>
        How many heads will you get in 10 coin flips? How many defective
        items in a batch of 100? How many patients will respond to a
        treatment in a clinical trial of 50? All of these questions involve
        counting successes in a fixed number of independent trials &mdash;
        and they are all modeled by the <strong>binomial distribution</strong>.
      </p>

      <h2>Bernoulli Trials</h2>
      <p>
        A <strong>Bernoulli trial</strong> is a single experiment with
        exactly two outcomes: success (probability p) and failure
        (probability 1 - p). A coin flip with P(heads) = 0.5 is the
        classic example, but Bernoulli trials model any binary outcome:
        pass/fail, yes/no, defective/good, click/no-click.
      </p>
      <MathBlock
        latex="X \sim \text{Bernoulli}(p): \quad P(X = 1) = p, \quad P(X = 0) = 1 - p"
        display
      />

      <h2>The Binomial Setting</h2>
      <p>
        The binomial distribution counts the number of successes in n
        independent Bernoulli trials, each with the same probability p. We
        write X ~ Binomial(n, p). The four requirements are:
      </p>
      <ol>
        <li>
          <strong>Fixed number of trials</strong> n (determined in advance).
        </li>
        <li>
          <strong>Two outcomes per trial</strong> (success or failure).
        </li>
        <li>
          <strong>Independence</strong> &mdash; the outcome of one trial
          does not affect others.
        </li>
        <li>
          <strong>Constant probability</strong> p of success on each trial.
        </li>
      </ol>

      <h2>The Probability Mass Function</h2>
      <p>
        What is the probability of getting exactly k successes in n trials?
        We need three ingredients:
      </p>
      <ul>
        <li>
          The probability of any specific sequence with k successes:
          p<sup>k</sup>(1-p)<sup>n-k</sup>.
        </li>
        <li>
          The number of ways to choose which k trials are successes:
          C(n, k).
        </li>
        <li>
          Since the sequences are mutually exclusive, we multiply:
        </li>
      </ul>
      <MathBlock
        latex="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, 2, \ldots, n"
        display
      />
      <p>
        where the binomial coefficient is:
      </p>
      <MathBlock
        latex="\binom{n}{k} = \frac{n!}{k!(n-k)!}"
        display
      />

      <h2>Worked Example: Coin Flips</h2>
      <StepByStep
        title="Calculate P(exactly 3 heads in 5 fair coin flips)"
        steps={[
          {
            title: "Identify the parameters",
            content:
              "n = 5 flips, p = 0.5 (fair coin), k = 3 heads. We want P(X = 3) where X ~ Binomial(5, 0.5).",
          },
          {
            title: "Compute the binomial coefficient",
            content: "How many ways can 3 of 5 flips be heads?",
            latex:
              "\\binom{5}{3} = \\frac{5!}{3! \\cdot 2!} = \\frac{120}{6 \\cdot 2} = 10",
          },
          {
            title: "Compute the probability of one specific sequence",
            content:
              "Any particular sequence with 3 heads and 2 tails (e.g., HHHTT) has probability:",
            latex:
              "p^3 (1-p)^2 = (0.5)^3 (0.5)^2 = (0.5)^5 = \\frac{1}{32}",
          },
          {
            title: "Multiply to get the final answer",
            content: "There are 10 such sequences, each with probability 1/32:",
            latex:
              "P(X = 3) = 10 \\cdot \\frac{1}{32} = \\frac{10}{32} = \\frac{5}{16} = 0.3125",
          },
          {
            title: "Interpret",
            content:
              "There is a 31.25% chance of getting exactly 3 heads in 5 fair coin flips. This is the most common outcome (along with 2 heads) when n = 5 and p = 0.5, reflecting the symmetry of the fair coin.",
          },
        ]}
      />

      <h2>Mean and Variance</h2>
      <p>
        The expected value and variance of a Binomial(n, p) random variable
        have elegant formulas. Since X is the sum of n independent
        Bernoulli(p) trials, each with mean p and variance p(1-p):
      </p>
      <MathBlock
        latex="E[X] = np \qquad \text{Var}(X) = np(1-p) \qquad \sigma = \sqrt{np(1-p)}"
        display
      />
      <p>
        For 100 fair coin flips: the expected number of heads is 100 &times;
        0.5 = 50, with a standard deviation of &radic;(100 &times; 0.5
        &times; 0.5) = 5. So you would typically get between 45 and 55 heads
        (within one standard deviation of the mean).
      </p>

      <h2>Explore: How n and p Shape the Distribution</h2>
      <p>
        Adjust the parameters below to see how the binomial distribution
        changes. With small p, the distribution is right-skewed; with p near
        0.5, it is symmetric; with large p, it is left-skewed. As n
        increases, the distribution becomes more bell-shaped, approaching a
        normal distribution.
      </p>
      <SliderExploration
        title="Binomial Distribution Shape"
        description="Adjust n (number of trials) and p (success probability) to see how the distribution shape changes. With p = 0.5 the distribution is symmetric. As n grows, the distribution approximates a normal curve centered at np."
        parameters={[
          {
            name: "n",
            label: "n (trials)",
            min: 1,
            max: 50,
            step: 1,
            default: 10,
          },
          {
            name: "p",
            label: "p (success prob)",
            min: 0.05,
            max: 0.95,
            step: 0.05,
            default: 0.5,
          },
        ]}
        equation="(1/(sqrt(2*3.14159*x*(1-x))))*exp(-((x-0.5)^2)/(2*x*(1-x)))"
        xRange={[0, 1]}
        yRange={[0, 5]}
      />

      <h2>The Normal Approximation</h2>
      <p>
        When n is large and p is not too close to 0 or 1, the binomial
        distribution is well approximated by a normal distribution. This
        is a consequence of the <strong>Central Limit Theorem</strong>:
      </p>
      <MathBlock
        latex="\text{If } np \ge 10 \text{ and } n(1-p) \ge 10, \text{ then } X \approx N(np, \; np(1-p))"
        display
      />
      <p>
        This is incredibly useful in practice. Instead of computing large
        binomial coefficients, you can use z-scores and the standard normal
        table. For example, for n = 100 and p = 0.5:
      </p>
      <MathBlock
        latex="P(X \le 55) \approx P\left(Z \le \frac{55 - 50}{5}\right) = P(Z \le 1) \approx 0.8413"
        display
      />

      <h2>Common Pitfalls</h2>
      <RevealAnswer label="Show common mistakes to avoid">
        <ul>
          <li>
            <strong>Forgetting the binomial coefficient:</strong> P(X=k) is
            NOT just p<sup>k</sup>(1-p)<sup>n-k</sup>. You must account for
            the C(n,k) different orderings.
          </li>
          <li>
            <strong>Using binomial when trials are not independent:</strong>{" "}
            Drawing cards without replacement is <em>not</em> binomial (use
            the hypergeometric distribution instead). However, if the
            population is very large relative to the sample, binomial is a
            reasonable approximation.
          </li>
          <li>
            <strong>Confusing &ldquo;at least k&rdquo; with &ldquo;exactly
            k&rdquo;:</strong> P(X &ge; 3) = 1 - P(X &le; 2) = 1 -
            [P(X=0) + P(X=1) + P(X=2)]. Do not forget the complement rule.
          </li>
        </ul>
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="binom-q1"
        question="A multiple-choice quiz has 8 questions, each with 4 choices. If you guess randomly on every question, what is the probability of getting exactly 2 correct?"
        options={[
          {
            text: "C(8,2) × (1/4)² × (3/4)⁶ ≈ 0.311",
            feedback:
              "Correct! With n=8 trials, p=1/4 success probability, and k=2: P(X=2) = C(8,2)(0.25)²(0.75)⁶ = 28 × 0.0625 × 0.1780 ≈ 0.311. About a 31% chance of getting exactly 2 right by pure guessing.",
          },
          {
            text: "(1/4)² = 0.0625",
            feedback:
              "This is the probability that the FIRST two questions are correct and ignores the other 6 questions. You need the binomial coefficient and the (3/4)⁶ factor.",
          },
          {
            text: "2/8 = 0.25",
            feedback:
              "2/8 is the fraction of questions you want correct, not the probability. You need the binomial PMF formula.",
          },
          {
            text: "C(8,2) × (1/4)² ≈ 1.75",
            feedback:
              "You forgot the (3/4)⁶ factor for the 6 incorrect answers. Also, a probability cannot exceed 1!",
          },
        ]}
        correctIndex={0}
        hint="Identify n, p, and k. Then apply the PMF: P(X=k) = C(n,k) p^k (1-p)^(n-k)."
        explanation="n=8, p=1/4, k=2. P(X=2) = C(8,2)(1/4)²(3/4)⁶ = 28 × (1/16) × (729/4096) = 28 × 0.0625 × 0.1780 ≈ 0.311."
      />

      <InteractiveQuestion
        id="binom-q2"
        question="A factory produces widgets with a 5% defect rate. In a batch of 200, what are the expected number of defects and the standard deviation?"
        options={[
          {
            text: "E[X] = 10, σ ≈ 3.08",
            feedback:
              "Correct! E[X] = np = 200(0.05) = 10. Var(X) = np(1-p) = 200(0.05)(0.95) = 9.5. σ = √9.5 ≈ 3.08. So you would typically see between about 7 and 13 defects.",
          },
          {
            text: "E[X] = 10, σ = 10",
            feedback:
              "The mean is correct, but σ ≠ mean. The standard deviation is √(np(1-p)) = √(200 × 0.05 × 0.95) ≈ 3.08.",
          },
          {
            text: "E[X] = 100, σ ≈ 3.08",
            feedback:
              "np = 200 × 0.05 = 10, not 100. You may have used p = 0.5 instead of 0.05.",
          },
          {
            text: "E[X] = 10, σ ≈ 9.5",
            feedback:
              "9.5 is the variance, not the standard deviation. Take the square root: σ = √9.5 ≈ 3.08.",
          },
        ]}
        correctIndex={0}
        hint="E[X] = np and σ = √(np(1-p)). Plug in n = 200 and p = 0.05."
        explanation="With n = 200 and p = 0.05: E[X] = 200(0.05) = 10 defects on average. Var(X) = 200(0.05)(0.95) = 9.5. σ = √9.5 ≈ 3.08. By the empirical rule, roughly 95% of batches will have between 10 ± 2(3.08) ≈ 4 to 16 defects."
      />
    </div>
  );
}
