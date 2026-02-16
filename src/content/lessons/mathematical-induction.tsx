"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function MathematicalInduction() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Mathematical Induction: The Domino Principle</h2>
      <p>
        Imagine an infinite line of dominoes. You know two things: (1) the first
        domino falls, and (2) whenever any domino falls, it knocks over the next
        one. Can you conclude that <em>every</em> domino falls? Of course!
        That intuition is exactly what <strong>mathematical induction</strong>{" "}
        formalizes.
      </p>
      <p>
        Induction is the primary tool for proving statements about all natural
        numbers. It lets you prove infinitely many facts with a finite argument.
        Whenever you see a claim like &ldquo;for all n &ge; 1, ...&rdquo;,
        induction should be the first technique you consider.
      </p>

      <h2>The Structure of an Induction Proof</h2>
      <p>
        To prove a statement P(n) holds for all n &ge; n&#8320; (some starting
        value), you complete two steps:
      </p>
      <ul>
        <li>
          <strong>Base case:</strong> Prove P(n&#8320;) is true. (Push the first
          domino.)
        </li>
        <li>
          <strong>Inductive step:</strong> Prove that for any k &ge; n&#8320;, if
          P(k) is true (the <em>inductive hypothesis</em>), then P(k+1) is
          also true. (Show each domino knocks over the next.)
        </li>
      </ul>
      <MathBlock
        latex="\underbrace{P(n_0)}_{\text{base case}} \quad \text{and} \quad \underbrace{\forall k \geq n_0: P(k) \Rightarrow P(k+1)}_{\text{inductive step}} \quad \implies \quad \forall n \geq n_0: P(n)"
        display
      />
      <p>
        The inductive hypothesis is the key: you get to <em>assume</em> the
        statement is true for k, and your only job is to show it extends to
        k+1. Students often feel like this is circular reasoning, but it is
        not. You are not assuming the conclusion; you are building a chain of
        implications: P(n&#8320;) &rArr; P(n&#8320;+1) &rArr; P(n&#8320;+2)
        &rArr; ..., each link justified by the inductive step.
      </p>

      <h2>Classic Example: Sum of First n Integers</h2>
      <StepByStep
        title="Prove: 1 + 2 + ... + n = n(n+1)/2 for all n ≥ 1"
        steps={[
          {
            title: "Base case: n = 1",
            content:
              "The left side is just 1. The right side is 1(1+1)/2 = 2/2 = 1. They match, so P(1) is true.",
            latex: "\\text{LHS} = 1, \\quad \\text{RHS} = \\frac{1 \\cdot 2}{2} = 1 \\quad \\checkmark",
          },
          {
            title: "Inductive hypothesis",
            content:
              "Assume that for some integer k ≥ 1, the formula holds:",
            latex: "1 + 2 + \\cdots + k = \\frac{k(k+1)}{2} \\quad \\text{(assume true)}",
          },
          {
            title: "Inductive step: show P(k+1)",
            content:
              "We must show that 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2. Start with the left side and use the inductive hypothesis to replace the first k terms:",
            latex: "1 + 2 + \\cdots + k + (k+1) = \\frac{k(k+1)}{2} + (k+1)",
          },
          {
            title: "Simplify",
            content: "Factor out (k+1) and combine the fractions.",
            latex: "= (k+1)\\left(\\frac{k}{2} + 1\\right) = (k+1) \\cdot \\frac{k+2}{2} = \\frac{(k+1)(k+2)}{2}",
          },
          {
            title: "Conclusion",
            content:
              "This is exactly the formula with n = k+1. By the principle of mathematical induction, the formula holds for all n ≥ 1. QED.",
            latex: "\\frac{(k+1)((k+1)+1)}{2} = \\frac{(k+1)(k+2)}{2} \\quad \\blacksquare",
          },
        ]}
      />

      <h2>Visualize the Domino Chain</h2>
      <p>
        Use the slider below to see how the sum formula works for increasing
        values of n. The equation plots n(n+1)/2 &mdash; watch how the sum
        grows quadratically. The base case anchors the chain at n = 1, and the
        inductive step ensures every subsequent value follows the pattern.
      </p>
      <SliderExploration
        title="Sum of First n Integers"
        description="Drag the slider to see how 1 + 2 + ... + n = n(n+1)/2 grows. The sum increases quadratically — this is why the induction proof works: each new term (k+1) pushes the formula to the next value."
        parameters={[
          {
            name: "n",
            label: "Value of n",
            min: 1,
            max: 50,
            step: 1,
            default: 1,
          },
        ]}
        equation="x * (x + 1) / 2"
        xRange={[1, 50]}
        yRange={[0, 1300]}
      />

      <h2>Strong Induction</h2>
      <p>
        In <strong>strong induction</strong> (also called{" "}
        <em>complete induction</em>), the inductive hypothesis is more powerful:
        instead of assuming P(k) alone, you assume P(n&#8320;), P(n&#8320;+1),
        ..., P(k) are <em>all</em> true, and use any or all of them to prove
        P(k+1).
      </p>
      <MathBlock
        latex="\text{Strong Induction: } \left[\forall j \in \{n_0, \ldots, k\}: P(j)\right] \Rightarrow P(k+1)"
        display
      />
      <p>
        Strong induction is equivalent in power to regular induction &mdash;
        anything you can prove with one, you can prove with the other. But
        strong induction is sometimes more natural, especially when P(k+1)
        depends on multiple earlier cases rather than just P(k).
      </p>

      <StepByStep
        title="Strong induction: Every integer ≥ 2 has a prime factor"
        steps={[
          {
            title: "Base case: n = 2",
            content:
              "The number 2 is itself prime, so it has a prime factor (namely 2). P(2) is true.",
          },
          {
            title: "Strong inductive hypothesis",
            content:
              "Assume that for some k ≥ 2, every integer j with 2 ≤ j ≤ k has a prime factor.",
          },
          {
            title: "Show P(k+1): consider two cases",
            content:
              "Case 1: If k+1 is prime, then k+1 is its own prime factor. Done. Case 2: If k+1 is composite, then k+1 = a × b where 2 ≤ a, b < k+1.",
          },
          {
            title: "Apply the inductive hypothesis",
            content:
              "Since 2 ≤ a ≤ k, our strong inductive hypothesis tells us a has a prime factor p. Since p divides a and a divides k+1, we know p divides k+1.",
            latex: "p \\mid a \\text{ and } a \\mid (k+1) \\implies p \\mid (k+1)",
          },
          {
            title: "Conclusion",
            content:
              "In both cases, k+1 has a prime factor. By strong induction, every integer ≥ 2 has a prime factor. QED.",
          },
        ]}
      />
      <p>
        Notice why we needed strong induction here: when k+1 is composite, it
        factors as a &times; b, and a could be much smaller than k. We needed
        to know that <em>all</em> integers from 2 to k have prime factors,
        not just k itself.
      </p>

      <h2>The Well-Ordering Principle</h2>
      <p>
        Induction is closely related to the <strong>well-ordering
        principle</strong>: every non-empty subset of the natural numbers has a
        smallest element. These two principles are logically equivalent &mdash;
        either can be derived from the other. The well-ordering principle
        sometimes offers an alternative path for proofs: assume the set of
        counterexamples is non-empty, find its smallest element, and derive a
        contradiction.
      </p>

      <h2>Common Mistakes in Induction Proofs</h2>
      <ul>
        <li>
          <strong>Forgetting the base case:</strong> Without it, the domino
          chain has no starting point. You might &ldquo;prove&rdquo; something
          false!
        </li>
        <li>
          <strong>Confusing what you assume vs. what you show:</strong> You
          assume P(k) and must <em>derive</em> P(k+1). Do not assume P(k+1).
        </li>
        <li>
          <strong>Wrong base case:</strong> If the claim starts at n = 0,
          verify n = 0, not n = 1.
        </li>
        <li>
          <strong>Inductive step does not use the hypothesis:</strong> If your
          inductive step never references P(k), you have probably made an error
          or the proof does not actually require induction.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="induction-q1"
        question="In a standard induction proof, the inductive step requires you to:"
        options={[
          {
            text: "Prove P(1) is true",
            feedback:
              "That is the base case, not the inductive step.",
          },
          {
            text: "Assume P(k) and prove P(k+1)",
            feedback:
              "Correct! The inductive step assumes the statement holds for an arbitrary k and derives it for k+1. This is the 'domino knocking over the next' part.",
          },
          {
            text: "Prove P(n) for all n simultaneously",
            feedback:
              "That would be what induction achieves overall, but the inductive step only handles the k → k+1 transition.",
          },
          {
            text: "Assume P(k+1) and prove P(k)",
            feedback:
              "This is backwards. You assume the earlier case and prove the later case, not the other way around.",
          },
        ]}
        correctIndex={1}
        hint="The inductive step is the link in the chain — it connects consecutive cases."
        explanation="The inductive step assumes P(k) is true (the inductive hypothesis) and uses it to prove P(k+1). Combined with the base case, this creates an infinite chain of implications."
      />

      <InteractiveQuestion
        id="induction-q2"
        question="Why does strong induction assume P(n₀), P(n₀+1), ..., P(k) rather than just P(k)?"
        options={[
          {
            text: "It makes the proof longer and more rigorous",
            feedback:
              "Length does not equal rigor. Strong induction is used because some problems genuinely need earlier cases.",
          },
          {
            text: "Because P(k+1) may depend on cases earlier than P(k)",
            feedback:
              "Correct! When k+1 decomposes into parts that could be any size (like in the prime factorization proof), you need the hypothesis for ALL previous cases, not just k.",
          },
          {
            text: "Because regular induction is incorrect",
            feedback:
              "Regular induction is perfectly valid. Strong induction is just more convenient for certain problems.",
          },
          {
            text: "It is required whenever n₀ ≠ 1",
            feedback:
              "The starting value does not determine whether you need strong induction. It depends on the structure of the problem.",
          },
        ]}
        correctIndex={1}
        hint="Think about the prime factorization proof — when k+1 = a × b, how big is a?"
        explanation="In the prime factor proof, k+1 = a × b where a could be anywhere from 2 to k. We need P(a) to conclude a has a prime factor, and a might be much less than k. Strong induction provides exactly this broader hypothesis."
      />

      <h3>Practice</h3>
      <p>
        Use induction to prove that 2<sup>n</sup> &gt; n for all n &ge; 1.
      </p>
      <RevealAnswer label="Show proof">
        <p>
          <strong>Base case (n = 1):</strong> 2&sup1; = 2 &gt; 1. True.
        </p>
        <p>
          <strong>Inductive step:</strong> Assume 2<sup>k</sup> &gt; k for some
          k &ge; 1. Then:
        </p>
        <MathBlock
          latex="2^{k+1} = 2 \cdot 2^k > 2 \cdot k = k + k \geq k + 1"
          display
        />
        <p>
          The last inequality holds because k &ge; 1. Therefore 2<sup>k+1</sup>{" "}
          &gt; k + 1, completing the inductive step. By induction, 2<sup>n</sup>{" "}
          &gt; n for all n &ge; 1. &blacksquare;
        </p>
      </RevealAnswer>
    </div>
  );
}
