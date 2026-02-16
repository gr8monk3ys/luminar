"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BayesTheorem() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Bayes&apos; Theorem: Updating Beliefs with Evidence</h2>
      <p>
        Bayes&apos; theorem is one of the most powerful ideas in all of
        mathematics. It tells us how to update our beliefs when we receive new
        evidence. Before seeing data, we have a <strong>prior</strong>{" "}
        probability &mdash; our initial estimate. After observing evidence,
        Bayes&apos; theorem produces the <strong>posterior</strong> probability
        &mdash; our updated, refined estimate.
      </p>
      <MathBlock
        latex="P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}"
        display
      />
      <p>The terms have intuitive names:</p>
      <ul>
        <li><strong>P(A)</strong> &mdash; the <em>prior</em>: our belief about A before seeing B.</li>
        <li><strong>P(B|A)</strong> &mdash; the <em>likelihood</em>: how probable the evidence B is if A is true.</li>
        <li><strong>P(B)</strong> &mdash; the <em>marginal likelihood</em>: the total probability of observing B.</li>
        <li><strong>P(A|B)</strong> &mdash; the <em>posterior</em>: our updated belief about A after seeing B.</li>
      </ul>

      <h2>Deriving the Formula</h2>
      <p>
        Bayes&apos; theorem follows directly from the definition of conditional
        probability. We know that:
      </p>
      <MathBlock latex="P(A \mid B) = \frac{P(A \cap B)}{P(B)} \quad \text{and} \quad P(B \mid A) = \frac{P(A \cap B)}{P(A)}" display />
      <p>
        From the second equation, P(A &cap; B) = P(B|A) &middot; P(A).
        Substituting into the first gives Bayes&apos; theorem. The denominator
        P(B) can be expanded using the law of total probability:
      </p>
      <MathBlock latex="P(B) = P(B \mid A) \cdot P(A) + P(B \mid A^c) \cdot P(A^c)" display />

      <h2>The Classic Medical Test Example</h2>
      <p>
        Suppose a disease affects 1% of the population. A test for the disease
        has 99% sensitivity (true positive rate) and 95% specificity (true
        negative rate). If a person tests positive, what is the probability
        they actually have the disease?
      </p>
      <StepByStep
        title="Medical test: P(Disease | Positive)"
        steps={[
          {
            title: "Identify the prior",
            content: "The base rate of the disease in the population.",
            latex: "P(D) = 0.01, \\quad P(D^c) = 0.99",
          },
          {
            title: "Identify the likelihoods",
            content:
              "Sensitivity is P(+|D) = 0.99. The false positive rate is 1 − specificity = 0.05.",
            latex: "P(+ \\mid D) = 0.99, \\quad P(+ \\mid D^c) = 0.05",
          },
          {
            title: "Compute the marginal likelihood P(+)",
            content: "Use the law of total probability.",
            latex:
              "P(+) = 0.99 \\times 0.01 + 0.05 \\times 0.99 = 0.0099 + 0.0495 = 0.0594",
          },
          {
            title: "Apply Bayes' theorem",
            content:
              "The posterior probability of disease given a positive test.",
            latex:
              "P(D \\mid +) = \\frac{0.99 \\times 0.01}{0.0594} = \\frac{0.0099}{0.0594} \\approx 0.167",
          },
          {
            title: "Interpret the result",
            content:
              "Only about 16.7% of people who test positive actually have the disease! The low base rate (1%) means most positives are false positives. This is called the base rate fallacy.",
          },
        ]}
      />

      <h2>Explore: How the Prior Affects the Posterior</h2>
      <SliderExploration
        title="Prior vs. Posterior Probability"
        description="Adjust the disease prevalence (prior) and observe how the posterior P(Disease|Positive) changes. Even with an excellent test, a low prior keeps the posterior surprisingly low. Watch how the curve rises as the prior increases."
        parameters={[
          { name: "prior", label: "Disease prevalence P(D)", min: 0.001, max: 0.5, step: 0.001, default: 0.01 },
        ]}
        equation="(0.99 * x) / (0.99 * x + 0.05 * (1 - x))"
        xRange={[0, 0.5]}
        yRange={[0, 1]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="bayes-q1"
        question="In the medical test example above, why is P(Disease | Positive) only about 17% despite the test being 99% sensitive?"
        options={[
          { text: "The test is broken", feedback: "The test actually performs well — 99% sensitivity and 95% specificity are good numbers." },
          { text: "The low base rate (1%) means most positives come from the large healthy population", feedback: "Correct! With 99 healthy people for every 1 sick person, even a 5% false positive rate produces many false alarms relative to the few true positives." },
          { text: "Bayes' theorem does not work for medical tests", feedback: "Bayes' theorem applies universally. The surprising result is correct." },
          { text: "We need a larger sample size", feedback: "This is about probability, not sample size. The base rate drives the result." },
        ]}
        correctIndex={1}
        hint="Think about the absolute numbers: in 10,000 people, how many are sick and how many healthy people test positive?"
        explanation="In 10,000 people: 100 are sick (99 test positive), 9,900 are healthy (495 test positive by mistake). So 99 out of 594 total positives are true positives: 99/594 ≈ 16.7%."
      />

      <InteractiveQuestion
        id="bayes-q2"
        question="If the prior probability P(A) increases while the likelihood P(B|A) stays the same, what happens to the posterior P(A|B)?"
        options={[
          { text: "It decreases", feedback: "A higher prior means we start more confident in A, which increases the posterior." },
          { text: "It stays the same", feedback: "The prior directly affects the posterior through Bayes' theorem." },
          { text: "It increases", feedback: "Correct! A higher prior shifts the posterior upward. The prior and the likelihood both contribute to the posterior." },
          { text: "It could go either way", feedback: "Increasing the prior always increases the numerator of Bayes' formula, raising the posterior." },
        ]}
        correctIndex={2}
        hint="Look at the numerator of Bayes' formula: P(B|A) · P(A)."
        explanation="The posterior is proportional to prior × likelihood. Increasing the prior while holding the likelihood constant always raises the posterior."
      />

      <h3>Practice</h3>
      <p>
        A factory has two machines. Machine A produces 60% of items and has a
        2% defect rate. Machine B produces 40% of items and has a 5% defect
        rate. A randomly selected item is defective. What is the probability it
        came from Machine B?
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="P(B \mid \text{def}) = \frac{P(\text{def} \mid B) \cdot P(B)}{P(\text{def})} = \frac{0.05 \times 0.40}{0.02 \times 0.60 + 0.05 \times 0.40} = \frac{0.020}{0.032} = 0.625"
          display
        />
        <p>
          Despite Machine B producing fewer items overall, it is more likely the
          source of a defective item because its defect rate is higher.
          Bayes&apos; theorem combines both the base rates and the defect rates.
        </p>
      </RevealAnswer>
    </div>
  );
}
