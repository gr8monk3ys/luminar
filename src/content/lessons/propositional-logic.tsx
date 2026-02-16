"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function PropositionalLogic() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Propositional Logic: The Language of Reasoning</h2>
      <p>
        Every mathematical proof, every computer program, and every logical
        argument rests on a foundation of <strong>propositional logic</strong>.
        It is the formal language we use to express statements that are either
        true or false, and to combine them using precise connectives. Mastering
        propositional logic is like learning the grammar of mathematics &mdash;
        once you have it, everything else becomes expressible.
      </p>
      <p>
        A <strong>proposition</strong> is a declarative sentence that is either
        true (T) or false (F), but not both. &ldquo;The sky is blue&rdquo; is a
        proposition. &ldquo;Close the door&rdquo; is not &mdash; it is a
        command. &ldquo;Is it raining?&rdquo; is not &mdash; it is a question.
        We typically denote propositions by lowercase letters like{" "}
        <em>p</em>, <em>q</em>, and <em>r</em>.
      </p>

      <h2>Logical Connectives</h2>
      <p>
        Simple propositions can be combined into compound propositions using
        five fundamental <strong>logical connectives</strong>:
      </p>
      <ul>
        <li>
          <strong>Negation (NOT)</strong>, written <em>&not;p</em>: flips the
          truth value. If <em>p</em> is true, <em>&not;p</em> is false, and
          vice versa.
        </li>
        <li>
          <strong>Conjunction (AND)</strong>, written <em>p &and; q</em>: true
          only when <em>both</em> p and q are true.
        </li>
        <li>
          <strong>Disjunction (OR)</strong>, written <em>p &or; q</em>: true
          when <em>at least one</em> of p or q is true. This is the
          inclusive &ldquo;or&rdquo; &mdash; both being true still counts.
        </li>
        <li>
          <strong>Implication (IF...THEN)</strong>, written{" "}
          <em>p &rarr; q</em>: false only when p is true and q is false. Think
          of it as a promise: the only way to break a promise is to have the
          condition met but not deliver.
        </li>
        <li>
          <strong>Biconditional (IF AND ONLY IF)</strong>, written{" "}
          <em>p &harr; q</em>: true when p and q have the <em>same</em> truth
          value.
        </li>
      </ul>
      <p>
        The implication connective trips up many students. The statement
        &ldquo;If pigs fly, then the moon is made of cheese&rdquo; is
        technically <em>true</em> in logic, because the hypothesis (&ldquo;pigs
        fly&rdquo;) is false. A false hypothesis makes the implication vacuously
        true &mdash; the promise was never activated, so it was never broken.
      </p>

      <h2>Truth Tables</h2>
      <p>
        A <strong>truth table</strong> systematically lists all possible
        combinations of truth values for the component propositions and shows
        the resulting truth value of the compound expression. For <em>n</em>{" "}
        variables, there are 2<sup>n</sup> rows. Truth tables are the
        brute-force approach to verifying logical equivalences &mdash; if two
        expressions produce the same column of outputs, they are logically
        equivalent.
      </p>
      <MathBlock
        latex="\begin{array}{cc|c|c|c|c} p & q & p \land q & p \lor q & p \to q & p \leftrightarrow q \\ \hline T & T & T & T & T & T \\ T & F & F & T & F & F \\ F & T & F & T & T & F \\ F & F & F & F & T & T \end{array}"
        display
      />
      <p>
        Study that table carefully. Notice that <em>p &rarr; q</em> is false
        in exactly one case: when <em>p</em> is true and <em>q</em> is false.
        The biconditional is true exactly when both sides match.
      </p>

      <h2>Important Logical Equivalences</h2>
      <p>
        Two propositions are <strong>logically equivalent</strong> (written
        &equiv;) if they have the same truth value under every possible
        assignment of truth values to their variables. Here are the most
        important equivalences you will use repeatedly:
      </p>
      <MathBlock
        latex="\textbf{De Morgan's Laws:} \quad \neg(p \land q) \equiv \neg p \lor \neg q \qquad \neg(p \lor q) \equiv \neg p \land \neg q"
        display
      />
      <p>
        De Morgan&apos;s laws tell you how negation distributes over AND and
        OR: negate each part and flip the connective. Think of it like breaking
        apart a combined condition.
      </p>
      <MathBlock
        latex="\textbf{Contrapositive:} \quad (p \to q) \equiv (\neg q \to \neg p)"
        display
      />
      <p>
        The contrapositive is logically equivalent to the original implication.
        This is one of the most useful tools in proof writing &mdash; instead of
        proving &ldquo;if p then q,&rdquo; you can prove &ldquo;if not q then
        not p.&rdquo;
      </p>
      <MathBlock
        latex="\textbf{Implication as Disjunction:} \quad (p \to q) \equiv (\neg p \lor q)"
        display
      />
      <p>
        This equivalence reveals the true nature of implication: &ldquo;if p
        then q&rdquo; is the same as &ldquo;either p is false, or q is
        true.&rdquo; We will verify this with a truth table below.
      </p>

      <h2>Tautologies and Contradictions</h2>
      <p>
        A <strong>tautology</strong> is a proposition that is always true,
        regardless of the truth values of its components. The classic example is
        the law of excluded middle:
      </p>
      <MathBlock latex="p \lor \neg p \equiv T" display />
      <p>
        A <strong>contradiction</strong> is a proposition that is always false:
      </p>
      <MathBlock latex="p \land \neg p \equiv F" display />
      <p>
        A <strong>contingency</strong> is a proposition that is neither a
        tautology nor a contradiction &mdash; its truth value depends on the
        input. Most propositions are contingencies.
      </p>

      <h2>Worked Example: Verifying a Key Equivalence</h2>
      <StepByStep
        title="Building a truth table for (p → q) ↔ (¬p ∨ q)"
        steps={[
          {
            title: "List all combinations of p and q",
            content:
              "With two variables, there are 2² = 4 rows. We enumerate every possible pair: (T,T), (T,F), (F,T), (F,F).",
          },
          {
            title: "Compute p → q for each row",
            content:
              "The implication p → q is false only when p is true and q is false. So: T→T = T, T→F = F, F→T = T, F→F = T.",
            latex: "p \\to q: \\quad T, F, T, T",
          },
          {
            title: "Compute ¬p ∨ q for each row",
            content:
              "First negate p: ¬T = F, ¬T = F, ¬F = T, ¬F = T. Then OR with q: F∨T = T, F∨F = F, T∨T = T, T∨F = T.",
            latex: "\\neg p \\lor q: \\quad T, F, T, T",
          },
          {
            title: "Compare the two columns",
            content:
              "Both columns are identical: T, F, T, T. Therefore the biconditional (p → q) ↔ (¬p ∨ q) is true in every row.",
            latex: "(p \\to q) \\leftrightarrow (\\neg p \\lor q) \\equiv T \\quad \\text{(tautology)}",
          },
          {
            title: "Conclusion",
            content:
              "Since the biconditional is always true, we have proven that p → q and ¬p ∨ q are logically equivalent. This is one of the most frequently used equivalences in discrete mathematics.",
          },
        ]}
      />

      <h2>Code It: Truth Table Generator</h2>
      <p>
        Writing a truth table by hand is fine for two variables, but with three
        or four variables it gets tedious. Here is a Python program that
        generates truth tables automatically. Study the code and try modifying
        it to test different logical expressions.
      </p>
      <CodeEditor
        language="python"
        description="A Python truth table generator using itertools. Modify the expression in the evaluate function to explore different logical formulas."
        initialCode={`from itertools import product

def truth_table(variables, expression_name, evaluate):
    """Print a truth table for the given expression."""
    header = "  ".join(variables) + "  |  " + expression_name
    print(header)
    print("-" * len(header))

    for values in product([True, False], repeat=len(variables)):
        env = dict(zip(variables, values))
        result = evaluate(env)
        row = "  ".join("T" if v else "F" for v in values)
        row += "  |  " + ("T" if result else "F")
        print(row)

# Example: verify De Morgan's Law
# ¬(p ∧ q) should equal (¬p ∨ ¬q)
print("=== ¬(p ∧ q) ===")
truth_table(
    ["p", "q"],
    "¬(p ∧ q)",
    lambda e: not (e["p"] and e["q"])
)
print()
print("=== ¬p ∨ ¬q ===")
truth_table(
    ["p", "q"],
    "¬p ∨ ¬q",
    lambda e: (not e["p"]) or (not e["q"])
)`}
        solution={`from itertools import product

def truth_table(variables, expression_name, evaluate):
    """Print a truth table for the given expression."""
    header = "  ".join(variables) + "  |  " + expression_name
    print(header)
    print("-" * len(header))

    for values in product([True, False], repeat=len(variables)):
        env = dict(zip(variables, values))
        result = evaluate(env)
        row = "  ".join("T" if v else "F" for v in values)
        row += "  |  " + ("T" if result else "F")
        print(row)

# Verify De Morgan's Law: ¬(p ∧ q) ≡ ¬p ∨ ¬q
print("=== ¬(p ∧ q) ===")
truth_table(
    ["p", "q"],
    "¬(p ∧ q)",
    lambda e: not (e["p"] and e["q"])
)
print()
print("=== ¬p ∨ ¬q ===")
truth_table(
    ["p", "q"],
    "¬p ∨ ¬q",
    lambda e: (not e["p"]) or (not e["q"])
)
# Output columns match — De Morgan's Law verified!`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="prop-logic-q1"
        question="Which of the following is logically equivalent to ¬(p ∨ q)?"
        options={[
          {
            text: "¬p ∨ ¬q",
            feedback:
              "This is De Morgan's law applied to conjunction, not disjunction. Negating an OR flips to AND.",
          },
          {
            text: "¬p ∧ ¬q",
            feedback:
              "Correct! By De Morgan's law, ¬(p ∨ q) ≡ ¬p ∧ ¬q. Negate each part and flip OR to AND.",
          },
          {
            text: "p ∧ q",
            feedback:
              "This drops the negations entirely. De Morgan's law requires negating each component.",
          },
          {
            text: "¬p → ¬q",
            feedback:
              "An implication is not equivalent to a negated disjunction. Try building the truth table to verify.",
          },
        ]}
        correctIndex={1}
        hint="De Morgan's law: when you negate a disjunction, negate each part and switch OR to AND."
        explanation="By De Morgan's second law: ¬(p ∨ q) ≡ ¬p ∧ ¬q. The negation distributes and flips the connective from OR to AND."
      />

      <InteractiveQuestion
        id="prop-logic-q2"
        question="The statement p → q is false. What can we conclude about p and q?"
        options={[
          {
            text: "p is false and q is false",
            feedback:
              "If p is false, then p → q is vacuously true (the promise was never activated).",
          },
          {
            text: "p is true and q is true",
            feedback:
              "When both are true, the implication is true — the promise was kept.",
          },
          {
            text: "p is true and q is false",
            feedback:
              "Correct! The implication p → q is false only in this one case: the hypothesis holds but the conclusion fails.",
          },
          {
            text: "p is false and q is true",
            feedback:
              "A false hypothesis makes any implication vacuously true.",
          },
        ]}
        correctIndex={2}
        hint="An implication is a promise — it can only be broken in one specific way."
        explanation="p → q is false only when p is true and q is false. This is the single row in the truth table where the implication fails. Think of it as: the condition was met, but the conclusion was not delivered."
      />

      <h3>Challenge</h3>
      <p>
        Show that the <strong>converse</strong> of an implication is NOT
        logically equivalent to the original. That is, find truth values where{" "}
        <em>p &rarr; q</em> and <em>q &rarr; p</em> differ.
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Let p = F and q = T. Then p &rarr; q = F &rarr; T = T, but
          q &rarr; p = T &rarr; F = F. Since they differ, the converse is NOT
          equivalent to the original implication.
        </p>
        <MathBlock
          latex="p = F, \; q = T: \quad (p \to q) = T \quad \text{but} \quad (q \to p) = F"
          display
        />
        <p>
          However, the <em>contrapositive</em> (&not;q &rarr; &not;p) IS always
          equivalent to p &rarr; q. Do not confuse the converse with the
          contrapositive!
        </p>
      </RevealAnswer>
    </div>
  );
}
