"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function HypothesisTesting() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Hypothesis Testing: Making Decisions with Data</h2>
      <p>
        Hypothesis testing is the formal framework statisticians use to decide
        whether observed data provides sufficient evidence against a claim. It
        is the backbone of scientific research: every time a study concludes
        that a drug is effective or that a new teaching method improves scores,
        a hypothesis test is at work.
      </p>
      <p>
        The process begins with two competing statements:
      </p>
      <ul>
        <li>
          <strong>Null hypothesis (H&#8320;)</strong>: The default assumption
          &mdash; typically &ldquo;no effect&rdquo; or &ldquo;no
          difference.&rdquo;
        </li>
        <li>
          <strong>Alternative hypothesis (H&#8321;)</strong>: What we hope to
          show &mdash; that there <em>is</em> an effect or difference.
        </li>
      </ul>
      <MathBlock
        latex="H_0: \mu = \mu_0 \quad \text{vs.} \quad H_1: \mu \neq \mu_0"
        display
      />
      <p>
        We assume H&#8320; is true and ask: how surprising is the observed data
        under this assumption? If it is very surprising, we reject H&#8320; in
        favor of H&#8321;.
      </p>

      <h2>The P-Value</h2>
      <p>
        The <strong>p-value</strong> quantifies &ldquo;how surprising&rdquo; the
        data is. It is the probability of observing a result at least as extreme
        as the one obtained, assuming the null hypothesis is true:
      </p>
      <MathBlock
        latex="p\text{-value} = P(\text{data this extreme or more} \mid H_0 \text{ is true})"
        display
      />
      <p>
        A small p-value means the observed data is unlikely under H&#8320;,
        providing evidence against it. A large p-value means the data is
        consistent with H&#8320;.
      </p>

      <h2>Significance Level</h2>
      <p>
        We compare the p-value to a pre-chosen <strong>significance level
        &alpha;</strong> (commonly 0.05):
      </p>
      <ul>
        <li>If p-value &le; &alpha;: reject H&#8320; (&ldquo;statistically significant&rdquo;)</li>
        <li>If p-value &gt; &alpha;: fail to reject H&#8320; (insufficient evidence)</li>
      </ul>
      <p>
        The significance level &alpha; represents the maximum false positive
        rate we are willing to tolerate.
      </p>

      <h2>Visualizing the P-Value</h2>
      <p>
        The graph below shows the standard normal distribution under H&#8320;.
        The p-value is the area in the tails beyond the observed test statistic.
        The further the test statistic is from 0, the smaller the p-value.
      </p>
      <GraphPlayground
        equation="(1/sqrt(2*3.14159)) * exp(-x*x/2)"
        xRange={[-4, 4]}
        yRange={[0, 0.5]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>Worked Example: Testing a Coin</h2>
      <StepByStep
        title="Is this coin fair? You flip it 100 times and get 62 heads."
        steps={[
          {
            title: "State the hypotheses",
            content: "H₀: p = 0.5 (fair coin). H₁: p ≠ 0.5 (biased coin).",
            latex: "H_0: p = 0.5 \\quad \\text{vs.} \\quad H_1: p \\neq 0.5",
          },
          {
            title: "Compute the test statistic",
            content:
              "Under H₀, the sample proportion has mean 0.5 and standard error √(0.5·0.5/100) = 0.05.",
            latex:
              "z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} = \\frac{0.62 - 0.50}{0.05} = 2.4",
          },
          {
            title: "Find the p-value",
            content:
              "For a two-sided test, the p-value is the probability of |Z| ≥ 2.4 under the standard normal.",
            latex:
              "p\\text{-value} = 2 \\times P(Z > 2.4) \\approx 2 \\times 0.0082 = 0.0164",
          },
          {
            title: "Make a decision",
            content:
              "Since p-value = 0.0164 < α = 0.05, we reject H₀. There is statistically significant evidence that the coin is biased.",
          },
        ]}
      />

      <h2>Type I and Type II Errors</h2>
      <p>
        Hypothesis testing can produce two kinds of mistakes:
      </p>
      <ul>
        <li>
          <strong>Type I error (false positive)</strong>: Rejecting H&#8320;
          when it is actually true. The probability of this is &alpha;.
        </li>
        <li>
          <strong>Type II error (false negative)</strong>: Failing to reject
          H&#8320; when H&#8321; is actually true. The probability is denoted
          &beta;.
        </li>
      </ul>
      <MathBlock
        latex="\text{Power} = 1 - \beta = P(\text{reject } H_0 \mid H_1 \text{ is true})"
        display
      />
      <p>
        There is a fundamental tradeoff: lowering &alpha; (being more
        conservative) reduces Type I errors but increases Type II errors.
        More data (larger sample size) reduces both.
      </p>

      <h2>Explore: Significance Level Tradeoff</h2>
      <SliderExploration
        title="How α Affects the Decision Boundary"
        description="Adjust the significance level α. A smaller α requires more extreme evidence to reject H₀, making the critical z-value larger. The curve shows the relationship between α and the critical z-value for a two-sided test."
        parameters={[
          { name: "alpha", label: "α (significance level)", min: 0.001, max: 0.2, step: 0.001, default: 0.05 },
        ]}
        equation="-log(x/2) * 0.7 + 0.3"
        xRange={[0.001, 0.2]}
        yRange={[0, 4]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="hyp-q1"
        question="A study finds a p-value of 0.03. Using α = 0.05, what is the correct conclusion?"
        options={[
          { text: "Accept H₀", feedback: "We never 'accept' H₀ — we either reject it or fail to reject it." },
          { text: "Reject H₀ — the result is statistically significant", feedback: "Correct! Since 0.03 < 0.05, we reject H₀ at the 5% significance level." },
          { text: "The null hypothesis is proven false", feedback: "Hypothesis tests never prove anything. We only say the evidence is strong enough to reject H₀." },
          { text: "Fail to reject H₀", feedback: "0.03 < 0.05, so we do reject H₀. We fail to reject only when the p-value exceeds α." },
        ]}
        correctIndex={1}
        hint="Compare the p-value to α. If p-value ≤ α, we reject."
        explanation="Since p = 0.03 < α = 0.05, we reject H₀. The result is statistically significant at the 5% level, meaning the observed data would be unlikely under the null hypothesis."
      />

      <InteractiveQuestion
        id="hyp-q2"
        question="A pharmaceutical company tests a new drug and fails to reject H₀. What does this mean?"
        options={[
          { text: "The drug definitely does not work", feedback: "Failing to reject H₀ does not prove it true. There may simply be insufficient evidence or sample size." },
          { text: "The study found no statistically significant evidence that the drug works", feedback: "Correct! This is the precise interpretation. It does not prove the drug is ineffective — only that this study did not find enough evidence." },
          { text: "The experiment was done incorrectly", feedback: "Failing to reject H₀ is a valid outcome, not an error in methodology." },
          { text: "The drug works but not well enough", feedback: "The result says nothing about effect size, only that the evidence was not strong enough to reject H₀." },
        ]}
        correctIndex={1}
        hint="Remember: 'fail to reject' is not the same as 'accept.'"
        explanation="Absence of evidence is not evidence of absence. The study may have been underpowered (too small a sample). A Type II error is always possible."
      />

      <h3>Practice</h3>
      <p>
        A manufacturer claims their batteries last 500 hours on average. You
        test 36 batteries and find a mean of 490 hours with a known population
        standard deviation of 30 hours. At &alpha; = 0.05, is there evidence
        the true mean is less than 500?
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="H_0: \mu = 500 \quad \text{vs.} \quad H_1: \mu < 500"
          display
        />
        <MathBlock
          latex="z = \frac{490 - 500}{30 / \sqrt{36}} = \frac{-10}{5} = -2.0"
          display
        />
        <p>
          For a one-sided test, P(Z &lt; &minus;2.0) &approx; 0.023. Since
          0.023 &lt; 0.05, we reject H&#8320;. There is significant evidence
          that the true mean battery life is less than 500 hours.
        </p>
      </RevealAnswer>
    </div>
  );
}
