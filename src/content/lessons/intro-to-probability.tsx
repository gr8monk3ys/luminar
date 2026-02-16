"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function IntroToProbability() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>What Is Probability?</h2>
      <p>
        Probability is the mathematical language of uncertainty. Whenever we flip
        a coin, roll a die, or predict the weather, we are reasoning about
        events whose outcomes are not guaranteed. Probability gives us a
        rigorous framework to quantify how likely different outcomes are.
      </p>
      <p>
        A <strong>random experiment</strong> is any process whose outcome is
        uncertain. The set of all possible outcomes is called the{" "}
        <strong>sample space</strong>, denoted <em>S</em>. An{" "}
        <strong>event</strong> is any subset of the sample space &mdash; a
        collection of outcomes we care about.
      </p>

      <h2>The Basic Probability Formula</h2>
      <p>
        When all outcomes in the sample space are equally likely, the
        probability of an event <em>A</em> is simply the ratio of favorable
        outcomes to total outcomes:
      </p>
      <MathBlock latex="P(A) = \frac{|A|}{|S|}" display />
      <p>
        For example, when rolling a fair six-sided die, the sample space is{" "}
        <em>S = &#123;1, 2, 3, 4, 5, 6&#125;</em> with |S| = 6. The
        probability of rolling an even number (event <em>A = &#123;2, 4, 6&#125;</em>)
        is:
      </p>
      <MathBlock latex="P(\text{even}) = \frac{|\{2, 4, 6\}|}{|\{1, 2, 3, 4, 5, 6\}|} = \frac{3}{6} = \frac{1}{2}" display />

      <h2>Key Properties</h2>
      <p>
        Every probability must satisfy three axioms:
      </p>
      <ul>
        <li>For any event <em>A</em>, 0 &le; P(A) &le; 1.</li>
        <li>The probability of the entire sample space is 1: P(S) = 1.</li>
        <li>For mutually exclusive events, P(A &cup; B) = P(A) + P(B).</li>
      </ul>
      <p>
        The <strong>complement rule</strong> is an immediate consequence: the
        probability that event <em>A</em> does <em>not</em> occur is:
      </p>
      <MathBlock latex="P(A^c) = 1 - P(A)" display />
      <p>
        This is extremely useful in practice. Often it is easier to compute the
        probability of the complement and subtract from 1.
      </p>

      <h2>Explore: Coin Flips</h2>
      <SliderExploration
        title="Probability of Getting At Least One Head"
        description="As you flip more fair coins, the probability of getting at least one head grows rapidly. The complement approach gives P(at least one head) = 1 − (1/2)^n. Drag the slider to see how quickly the probability approaches 1."
        parameters={[
          { name: "n", label: "Number of coins", min: 1, max: 20, step: 1, default: 1 },
        ]}
        equation="1 - (0.5)^x"
        xRange={[1, 20]}
        yRange={[0, 1.1]}
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Probability of rolling a sum of 7 with two dice"
        steps={[
          {
            title: "Determine the sample space",
            content:
              "Each die has 6 faces, so there are 6 × 6 = 36 equally likely outcomes when rolling two dice.",
            latex: "|S| = 6 \\times 6 = 36",
          },
          {
            title: "List favorable outcomes",
            content:
              "The pairs that sum to 7 are: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). That gives us 6 favorable outcomes.",
            latex: "|A| = 6",
          },
          {
            title: "Apply the formula",
            content: "Divide the number of favorable outcomes by the total.",
            latex: "P(\\text{sum} = 7) = \\frac{6}{36} = \\frac{1}{6} \\approx 0.167",
          },
        ]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="prob-intro-q1"
        question="A bag contains 3 red marbles and 7 blue marbles. If you draw one marble at random, what is the probability it is red?"
        options={[
          { text: "3/7", feedback: "Be careful — the denominator should be the total number of marbles, not just the blue ones." },
          { text: "3/10", feedback: "Correct! There are 3 favorable outcomes (red) out of 10 total marbles." },
          { text: "7/10", feedback: "That is the probability of drawing a blue marble, not red." },
          { text: "1/3", feedback: "The total number of marbles is 10, not 3." },
        ]}
        correctIndex={1}
        hint="Use P(A) = |A|/|S|. How many marbles are there in total?"
        explanation="P(red) = 3/10 = 0.3. There are 3 red marbles out of 10 total."
      />

      <InteractiveQuestion
        id="prob-intro-q2"
        question="What is the probability of NOT rolling a 6 on a fair die?"
        options={[
          { text: "1/6", feedback: "That is the probability of rolling a 6, not of NOT rolling one." },
          { text: "5/6", feedback: "Correct! Using the complement rule: P(not 6) = 1 − P(6) = 1 − 1/6 = 5/6." },
          { text: "1/2", feedback: "There is only one 6 out of six faces, so the complement is 5/6, not 1/2." },
          { text: "2/3", feedback: "Recount: 5 out of 6 outcomes are not a 6." },
        ]}
        correctIndex={1}
        hint="Use the complement rule: P(A^c) = 1 − P(A)."
        explanation="P(not 6) = 1 − 1/6 = 5/6. The complement rule turns a 'not' question into a simple subtraction."
      />

      <h3>Practice</h3>
      <p>
        Two cards are drawn from a standard 52-card deck without replacement.
        What is the probability that both are aces?
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="P(\text{both aces}) = \frac{4}{52} \times \frac{3}{51} = \frac{12}{2652} = \frac{1}{221} \approx 0.0045"
          display
        />
        <p>
          The first draw has 4 aces out of 52 cards. Given the first was an ace,
          3 aces remain out of 51 cards. Multiply these sequential probabilities.
        </p>
      </RevealAnswer>
    </div>
  );
}
