"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function ConditionalProbability() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Conditional Probability</h2>
      <p>
        In the real world, we often have partial information about a situation.
        Knowing that it is cloudy changes your estimate of the probability of
        rain. Knowing that a student studied changes your estimate of the
        probability they pass an exam. <strong>Conditional probability</strong>{" "}
        formalizes this idea: it measures the probability of an event given
        that another event has already occurred.
      </p>
      <p>
        The conditional probability of <em>A</em> given <em>B</em> is written
        P(A|B) and defined as:
      </p>
      <MathBlock latex="P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0" display />
      <p>
        Intuitively, once we know <em>B</em> has occurred, the sample space
        shrinks from <em>S</em> to <em>B</em>. We then ask what fraction of
        <em> B</em> also belongs to <em>A</em>.
      </p>

      <h2>The Multiplication Rule</h2>
      <p>
        Rearranging the definition gives us the <strong>multiplication rule</strong>,
        which is essential for computing joint probabilities:
      </p>
      <MathBlock latex="P(A \cap B) = P(B) \cdot P(A \mid B)" display />
      <p>
        This extends to chains of events. For three events:
      </p>
      <MathBlock latex="P(A \cap B \cap C) = P(A) \cdot P(B \mid A) \cdot P(C \mid A \cap B)" display />

      <h2>Independent vs. Dependent Events</h2>
      <p>
        Two events are <strong>independent</strong> if knowing one gives no
        information about the other. Formally, <em>A</em> and <em>B</em> are
        independent if and only if:
      </p>
      <MathBlock latex="P(A \mid B) = P(A) \quad \Longleftrightarrow \quad P(A \cap B) = P(A) \cdot P(B)" display />
      <p>
        Coin flips are independent: the result of the first flip does not
        affect the second. Drawing cards without replacement is{" "}
        <strong>dependent</strong>: removing a card changes the composition
        of the deck.
      </p>

      <h2>Tree Diagrams</h2>
      <p>
        A <strong>tree diagram</strong> is a visual tool for mapping out
        sequential random events. Each branch represents an outcome, labeled
        with its probability. To find the probability of a path, multiply the
        probabilities along the branches. To find the total probability of an
        event, add the probabilities of all paths leading to it.
      </p>
      <p>
        Consider a bag with 3 red and 2 blue balls. You draw two balls
        without replacement. The tree structure captures how the second draw
        depends on the first.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Drawing two balls without replacement from {3 red, 2 blue}"
        steps={[
          {
            title: "First draw probabilities",
            content:
              "There are 5 balls total. P(R₁) = 3/5 and P(B₁) = 2/5.",
            latex: "P(R_1) = \\frac{3}{5}, \\quad P(B_1) = \\frac{2}{5}",
          },
          {
            title: "Second draw given first was red",
            content:
              "After drawing a red ball, 2 red and 2 blue remain (4 total).",
            latex: "P(R_2 \\mid R_1) = \\frac{2}{4} = \\frac{1}{2}, \\quad P(B_2 \\mid R_1) = \\frac{2}{4} = \\frac{1}{2}",
          },
          {
            title: "Probability both are red",
            content: "Multiply along the branch: P(R₁) × P(R₂|R₁).",
            latex: "P(R_1 \\cap R_2) = \\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}",
          },
          {
            title: "Probability second is blue (total probability)",
            content:
              "Sum over all paths leading to B₂: through R₁ and through B₁.",
            latex:
              "P(B_2) = P(R_1)P(B_2|R_1) + P(B_1)P(B_2|B_1) = \\frac{3}{5} \\cdot \\frac{1}{2} + \\frac{2}{5} \\cdot \\frac{1}{4} = \\frac{3}{10} + \\frac{1}{10} = \\frac{2}{5}",
          },
        ]}
      />

      <h2>Explore: How Dependence Affects Joint Probability</h2>
      <SliderExploration
        title="Independent vs. Dependent Joint Probability"
        description="Compare the joint probability P(A∩B) under independence (P(A)·P(B)) versus a specified conditional probability P(A|B). Adjust P(A) with the slider and observe the difference."
        parameters={[
          { name: "pA", label: "P(A)", min: 0, max: 1, step: 0.01, default: 0.5 },
        ]}
        equation="x * 0.6"
        xRange={[0, 1]}
        yRange={[0, 1]}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="cond-prob-q1"
        question="A fair die is rolled. Given that the result is even, what is the probability it is a 6?"
        options={[
          { text: "1/6", feedback: "That is the unconditional probability. We already know the result is even, so the sample space shrinks." },
          { text: "1/3", feedback: "Correct! Given even, the sample space is {2, 4, 6}. One out of three is a 6." },
          { text: "1/2", feedback: "There are three even outcomes, not two. Only one of them is 6." },
          { text: "2/3", feedback: "Two out of three even numbers are not 6. Check which event we are computing." },
        ]}
        correctIndex={1}
        hint="The condition 'even' reduces the sample space to {2, 4, 6}."
        explanation="P(6 | even) = P(6 ∩ even)/P(even) = (1/6)/(3/6) = 1/3. Equivalently, among the three even outcomes, exactly one is 6."
      />

      <InteractiveQuestion
        id="cond-prob-q2"
        question="If P(A) = 0.4 and P(B) = 0.5, and A and B are independent, what is P(A ∩ B)?"
        options={[
          { text: "0.9", feedback: "That is P(A) + P(B), which would apply to mutually exclusive events for the union." },
          { text: "0.1", feedback: "Check the multiplication: 0.4 × 0.5 = 0.2, not 0.1." },
          { text: "0.2", feedback: "Correct! For independent events, P(A ∩ B) = P(A) × P(B) = 0.4 × 0.5 = 0.2." },
          { text: "0.45", feedback: "That is the average of the two probabilities, which is not a valid operation here." },
        ]}
        correctIndex={2}
        hint="For independent events, the joint probability is the product of the marginals."
        explanation="Independence means P(A ∩ B) = P(A) · P(B) = 0.4 · 0.5 = 0.2."
      />

      <h3>Practice</h3>
      <p>
        A box has 4 defective and 16 good items. Two items are drawn without
        replacement. What is the probability that both are defective?
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="P(\text{both defective}) = \frac{4}{20} \times \frac{3}{19} = \frac{12}{380} = \frac{3}{95} \approx 0.0316"
          display
        />
        <p>
          The first draw has 4 defective out of 20. Given the first was
          defective, 3 defective remain out of 19 items. This is a dependent
          event since we draw without replacement.
        </p>
      </RevealAnswer>
    </div>
  );
}
