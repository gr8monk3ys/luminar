"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function ProofTechniques() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Proof Techniques: The Toolbox of Mathematics</h2>
      <p>
        A <strong>proof</strong> is a rigorous logical argument that establishes
        the truth of a mathematical statement beyond any doubt. Unlike
        empirical science, where theories can be overturned by new evidence,
        a correct mathematical proof is eternal. But how do you actually
        construct a proof? That is the question this lesson answers.
      </p>
      <p>
        Think of proof techniques as tools in a toolbox. Different problems call
        for different tools. A carpenter does not use a hammer for every job;
        similarly, a mathematician selects the right proof strategy based on the
        structure of the statement being proved. We will cover four fundamental
        techniques: <strong>direct proof</strong>,{" "}
        <strong>proof by contrapositive</strong>,{" "}
        <strong>proof by contradiction</strong>, and{" "}
        <strong>proof by cases</strong>.
      </p>

      <h2>Direct Proof</h2>
      <p>
        A direct proof is the most straightforward approach. To prove &ldquo;if
        P then Q,&rdquo; you assume P is true and use logical deductions,
        definitions, and previously established results to arrive at Q. It is a
        straight line from hypothesis to conclusion.
      </p>
      <MathBlock
        latex="\text{Goal: } P \Rightarrow Q \qquad \text{Method: Assume } P, \text{ deduce } Q."
        display
      />
      <p>
        Direct proofs work best when there is a clear chain of reasoning from
        the hypothesis to the conclusion. They are the default strategy &mdash;
        always try a direct proof first before reaching for more specialized
        tools.
      </p>

      <StepByStep
        title="Direct proof: The sum of two even numbers is even"
        steps={[
          {
            title: "State the claim precisely",
            content:
              "Claim: If a and b are even integers, then a + b is even.",
          },
          {
            title: "Assume the hypothesis",
            content:
              "Let a and b be even integers. By definition of 'even,' there exist integers k and m such that a = 2k and b = 2m.",
            latex: "a = 2k, \\quad b = 2m \\quad (k, m \\in \\mathbb{Z})",
          },
          {
            title: "Compute the sum",
            content:
              "Add the two expressions together and factor.",
            latex: "a + b = 2k + 2m = 2(k + m)",
          },
          {
            title: "Conclude",
            content:
              "Since k + m is an integer (integers are closed under addition), a + b = 2(k + m) is even by definition. QED.",
            latex: "a + b = 2\\ell \\text{ where } \\ell = k + m \\in \\mathbb{Z} \\quad \\blacksquare",
          },
        ]}
      />

      <h2>Proof by Contrapositive</h2>
      <p>
        Recall from propositional logic that an implication and its
        contrapositive are logically equivalent:
      </p>
      <MathBlock
        latex="(P \to Q) \equiv (\neg Q \to \neg P)"
        display
      />
      <p>
        So to prove &ldquo;if P then Q,&rdquo; you can instead prove &ldquo;if
        not Q then not P.&rdquo; This is especially useful when the negation of
        Q gives you something concrete to work with. For example, it is often
        easier to reason about odd numbers (not even) than directly about even
        numbers.
      </p>
      <p>
        <strong>When to use it:</strong> When the conclusion Q is hard to reach
        directly, but assuming &not;Q gives you a useful starting point. Classic
        example: proving statements about even/odd numbers, where working with
        &ldquo;n is odd&rdquo; is cleaner than working with &ldquo;n is
        even.&rdquo;
      </p>

      <h2>Proof by Contradiction</h2>
      <p>
        In a proof by contradiction (also called <em>reductio ad absurdum</em>),
        you assume the statement you want to prove is <em>false</em>, and then
        show this assumption leads to a logical impossibility &mdash; a
        contradiction. Since a contradiction cannot exist, the original
        assumption must have been wrong, and the statement must be true.
      </p>
      <MathBlock
        latex="\text{Assume } \neg P. \quad \text{Derive a contradiction.} \quad \text{Therefore } P."
        display
      />
      <p>
        Proof by contradiction is the nuclear option of proof techniques. It is
        incredibly versatile &mdash; in principle, you can prove anything by
        contradiction &mdash; but the resulting proofs can be less illuminating
        than direct proofs. Use it when a direct approach seems blocked.
      </p>

      <StepByStep
        title="Proof by contradiction: √2 is irrational"
        steps={[
          {
            title: "Assume the opposite",
            content:
              "Suppose, for the sake of contradiction, that √2 is rational. Then we can write √2 = a/b where a and b are integers with no common factors (the fraction is in lowest terms) and b ≠ 0.",
            latex: "\\sqrt{2} = \\frac{a}{b}, \\quad \\gcd(a, b) = 1",
          },
          {
            title: "Square both sides",
            content:
              "Squaring the equation gives 2 = a²/b², which rearranges to a² = 2b².",
            latex: "2 = \\frac{a^2}{b^2} \\implies a^2 = 2b^2",
          },
          {
            title: "Deduce a is even",
            content:
              "Since a² = 2b², we know a² is even. But the square of an odd number is odd (we can prove this separately), so a must be even. Write a = 2c for some integer c.",
            latex: "a^2 \\text{ is even} \\implies a \\text{ is even} \\implies a = 2c",
          },
          {
            title: "Substitute and simplify",
            content:
              "Substitute a = 2c into a² = 2b²: we get (2c)² = 2b², so 4c² = 2b², which gives b² = 2c².",
            latex: "4c^2 = 2b^2 \\implies b^2 = 2c^2",
          },
          {
            title: "Deduce b is also even",
            content:
              "By the same reasoning, b² = 2c² means b² is even, so b is even.",
            latex: "b^2 \\text{ is even} \\implies b \\text{ is even}",
          },
          {
            title: "Reach the contradiction",
            content:
              "We have shown both a and b are even, meaning they share the factor 2. But we assumed gcd(a,b) = 1 — a contradiction! Therefore our initial assumption was wrong, and √2 is irrational. QED.",
            latex: "a \\text{ even and } b \\text{ even} \\implies \\gcd(a,b) \\geq 2 \\quad \\text{Contradiction! } \\blacksquare",
          },
        ]}
      />

      <h2>Proof by Cases</h2>
      <p>
        Sometimes the simplest approach is to break the problem into separate
        cases that together cover all possibilities, and prove the claim in each
        case. This is called <strong>proof by exhaustion</strong> or{" "}
        <strong>proof by cases</strong>.
      </p>
      <MathBlock
        latex="\text{If } P_1 \lor P_2 \lor \cdots \lor P_k \text{ covers all possibilities, prove } Q \text{ under each } P_i."
        display
      />
      <p>
        For example, to prove a statement about all integers, you might split
        into two cases: &ldquo;n is even&rdquo; and &ldquo;n is odd.&rdquo;
        Since every integer is either even or odd, the two cases are exhaustive.
      </p>
      <p>
        <strong>Key requirement:</strong> the cases must be <em>exhaustive</em>{" "}
        &mdash; they must cover every possible scenario. If you accidentally
        omit a case, the proof is incomplete.
      </p>

      <h2>Choosing the Right Technique</h2>
      <p>
        Here is a practical guide for selecting a proof strategy:
      </p>
      <ul>
        <li>
          <strong>Direct proof</strong> &mdash; try this first. If you can
          unpack the definitions and chain the logic, you are done.
        </li>
        <li>
          <strong>Contrapositive</strong> &mdash; use when the conclusion is
          hard to use directly, but its negation gives you something workable.
        </li>
        <li>
          <strong>Contradiction</strong> &mdash; use when the statement is
          existential (&ldquo;there is no...&rdquo;) or when a direct approach
          seems stuck. Also the go-to for proving irrationality.
        </li>
        <li>
          <strong>Cases</strong> &mdash; use when there is a natural partition
          of possibilities (even/odd, positive/negative/zero, etc.).
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="proof-tech-q1"
        question="To prove 'if n² is even, then n is even,' which proof technique is most natural?"
        options={[
          {
            text: "Direct proof",
            feedback:
              "A direct proof would start with 'n² is even' and try to show n is even. This is possible but awkward — you'd need to reason about factors.",
          },
          {
            text: "Proof by contrapositive",
            feedback:
              "Correct! The contrapositive is: 'if n is odd, then n² is odd.' Assuming n = 2k+1 gives n² = 4k²+4k+1 = 2(2k²+2k)+1, which is odd. Much cleaner!",
          },
          {
            text: "Proof by contradiction",
            feedback:
              "Contradiction would work, but the contrapositive is simpler here — it gives you a concrete starting point (n is odd) that's easy to square.",
          },
          {
            text: "Proof by cases",
            feedback:
              "There is no natural case split in this problem. The even/odd structure is better handled by the contrapositive.",
          },
        ]}
        correctIndex={1}
        hint="Think about which direction is easier: starting with 'n² is even' or starting with 'n is odd.'"
        explanation="The contrapositive 'if n is odd, then n² is odd' is much easier to prove directly. Let n = 2k+1, then n² = (2k+1)² = 4k²+4k+1 = 2(2k²+2k)+1, which is odd."
      />

      <InteractiveQuestion
        id="proof-tech-q2"
        question="In a proof by contradiction, what do you assume at the beginning?"
        options={[
          {
            text: "The statement you want to prove is true",
            feedback:
              "That would be a direct proof. In contradiction, you assume the statement is FALSE.",
          },
          {
            text: "The negation of the statement you want to prove",
            feedback:
              "Correct! You assume the opposite of what you want to prove, then show this leads to a logical impossibility.",
          },
          {
            text: "The contrapositive of the statement",
            feedback:
              "That would be a proof by contrapositive. Contradiction assumes the negation, not the contrapositive.",
          },
          {
            text: "Nothing — you start from scratch",
            feedback:
              "Every proof starts with some assumption. Contradiction specifically assumes the negation of the desired conclusion.",
          },
        ]}
        correctIndex={1}
        hint="The word 'contradiction' tells you something about the approach — you need to derive an impossibility from a false assumption."
        explanation="In proof by contradiction, you assume ¬P (the statement is false), then derive a contradiction. Since contradictions cannot exist in mathematics, the assumption ¬P must be wrong, so P is true."
      />

      <h3>Practice: Prove by Contrapositive</h3>
      <p>
        Prove: If n&sup2; is even, then n is even.
      </p>
      <RevealAnswer label="Show proof">
        <p>
          <strong>Proof (by contrapositive):</strong> We prove the equivalent
          statement: if n is odd, then n&sup2; is odd.
        </p>
        <p>
          Assume n is odd. Then n = 2k + 1 for some integer k. Squaring:
        </p>
        <MathBlock
          latex="n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1"
          display
        />
        <p>
          Since 2k&sup2; + 2k is an integer, n&sup2; has the form 2m + 1 and is
          therefore odd. By contrapositive, if n&sup2; is even, then n is even.
          &blacksquare;
        </p>
      </RevealAnswer>

      <h3>Code Challenge: Proof Verifier</h3>
      <p>
        While we cannot automate proof writing in general, we can verify simple
        number-theoretic claims computationally. Below is a script that checks
        the claim &ldquo;if n&sup2; is even then n is even&rdquo; for the first
        1000 integers. This is not a proof, but it builds intuition!
      </p>
      <CodeEditor
        language="python"
        description="Verify number-theoretic claims computationally for small cases. This does not replace a proof, but helps build intuition."
        initialCode={`# Computational verification (NOT a proof!)
# Check: if n^2 is even, then n is even

counterexample_found = False
for n in range(1, 1001):
    n_sq_is_even = (n * n) % 2 == 0
    n_is_even = n % 2 == 0

    # If n^2 is even but n is NOT even, we found a counterexample
    if n_sq_is_even and not n_is_even:
        print(f"Counterexample: n={n}, n^2={n*n}")
        counterexample_found = True
        break

if not counterexample_found:
    print("No counterexample in 1..1000.")
    print("(This suggests the claim is true, but only a proof makes it certain!)")`}
        solution={`# Computational verification (NOT a proof!)
# Check: if n^2 is even, then n is even

counterexample_found = False
for n in range(1, 1001):
    n_sq_is_even = (n * n) % 2 == 0
    n_is_even = n % 2 == 0

    if n_sq_is_even and not n_is_even:
        print(f"Counterexample: n={n}, n^2={n*n}")
        counterexample_found = True
        break

if not counterexample_found:
    print("No counterexample in 1..1000.")
    print("(This suggests the claim is true, but only a proof makes it certain!)")

# Output: No counterexample in 1..1000.
# The claim holds for all tested values.
# The actual PROOF uses the contrapositive (see lesson above).`}
      />
    </div>
  );
}
