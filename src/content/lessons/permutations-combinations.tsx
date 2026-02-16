"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function PermutationsCombinations() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Permutations &amp; Combinations: Order Matters (Sometimes)</h2>
      <p>
        Two of the most fundamental questions in combinatorics are: &ldquo;how
        many ways can I <em>arrange</em> things?&rdquo; and &ldquo;how many
        ways can I <em>choose</em> things?&rdquo; The difference is subtle but
        critical: arrangements care about <strong>order</strong>, while
        selections do not. This distinction gives rise to{" "}
        <strong>permutations</strong> and <strong>combinations</strong>.
      </p>
      <p>
        Think of a podium at the Olympics. Gold-Silver-Bronze is different from
        Silver-Gold-Bronze &mdash; that is a permutation problem (order
        matters). But selecting 3 people from a group for a team is a
        combination problem &mdash; the team &#123;Alice, Bob, Carol&#125; is
        the same regardless of the order you pick them.
      </p>

      <h2>Permutations</h2>
      <p>
        A <strong>permutation</strong> is an ordered arrangement. The number of
        ways to arrange <em>r</em> objects chosen from <em>n</em> distinct
        objects is:
      </p>
      <MathBlock
        latex="P(n, r) = \frac{n!}{(n-r)!}"
        display
      />
      <p>
        The intuition: for the first position, you have <em>n</em> choices.
        For the second, <em>n &minus; 1</em>. For the third, <em>n &minus;
        2</em>. Continuing this pattern for <em>r</em> positions gives the
        falling factorial:
      </p>
      <MathBlock
        latex="P(n, r) = n \cdot (n-1) \cdot (n-2) \cdots (n-r+1)"
        display
      />
      <p>
        Special case: the number of ways to arrange ALL n objects is simply n!
        (n factorial).
      </p>

      <h2>Combinations</h2>
      <p>
        A <strong>combination</strong> is an unordered selection. The number of
        ways to choose <em>r</em> objects from <em>n</em> distinct objects
        (without regard to order) is:
      </p>
      <MathBlock
        latex="C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}"
        display
      />
      <p>
        Where does the <em>r!</em> in the denominator come from? Each
        combination of <em>r</em> objects can be arranged in <em>r!</em> ways.
        Since combinations ignore order, we divide out these redundant
        arrangements:
      </p>
      <MathBlock
        latex="C(n, r) = \frac{P(n, r)}{r!} = \frac{n!}{r!(n-r)!}"
        display
      />
      <p>
        The notation <MathBlock latex="\binom{n}{r}" display={false} /> is read
        &ldquo;n choose r&rdquo; and is called a <strong>binomial
        coefficient</strong>. It appears everywhere in mathematics &mdash; from
        probability to algebra to number theory.
      </p>

      <h2>Worked Example: Committee Selection</h2>
      <StepByStep
        title="How many 5-person committees from a group of 12?"
        steps={[
          {
            title: "Determine if order matters",
            content:
              "A committee is just a set of people — there is no president, vice-president, etc. So order does NOT matter. This is a combination problem.",
          },
          {
            title: "Apply the combination formula",
            content:
              "We need to choose 5 people from 12, without regard to order.",
            latex: "\\binom{12}{5} = \\frac{12!}{5! \\cdot 7!}",
          },
          {
            title: "Simplify using cancellation",
            content:
              "Rather than computing full factorials, cancel 7! from numerator and denominator:",
            latex: "\\frac{12 \\times 11 \\times 10 \\times 9 \\times 8}{5 \\times 4 \\times 3 \\times 2 \\times 1} = \\frac{95{,}040}{120} = 792",
          },
          {
            title: "Interpret",
            content:
              "There are 792 possible 5-person committees. If the committee had officers (president, secretary, etc.), it would be P(12,5) = 95,040 instead — much larger because order would matter.",
          },
        ]}
      />

      <h2>Key Properties of Binomial Coefficients</h2>
      <p>
        Binomial coefficients satisfy many beautiful identities:
      </p>
      <MathBlock
        latex="\binom{n}{0} = \binom{n}{n} = 1 \qquad \text{(one way to choose nothing or everything)}"
        display
      />
      <MathBlock
        latex="\binom{n}{r} = \binom{n}{n-r} \qquad \text{(symmetry: choosing r is the same as leaving out n-r)}"
        display
      />
      <MathBlock
        latex="\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r} \qquad \text{(Pascal's identity)}"
        display
      />
      <p>
        Pascal&apos;s identity is the recursive rule that generates{" "}
        <strong>Pascal&apos;s triangle</strong>: each entry is the sum of the
        two entries directly above it. This triangle encodes all binomial
        coefficients:
      </p>
      <MathBlock
        latex="\begin{array}{ccccccccc} & & & & 1 & & & & \\ & & & 1 & & 1 & & & \\ & & 1 & & 2 & & 1 & & \\ & 1 & & 3 & & 3 & & 1 & \\ 1 & & 4 & & 6 & & 4 & & 1 \end{array}"
        display
      />
      <p>
        Row <em>n</em> of Pascal&apos;s triangle gives{" "}
        <MathBlock latex="\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}" display={false} />.
        The sum of each row is 2<sup>n</sup>.
      </p>

      <h2>Stars and Bars</h2>
      <p>
        A powerful technique for counting with repetition is{" "}
        <strong>stars and bars</strong>. Suppose you want to distribute <em>n</em>{" "}
        identical objects into <em>k</em> distinct bins. Visualize the objects
        as stars (&star;) and use <em>k &minus; 1</em> bars (|) as dividers
        between bins. You need to arrange <em>n</em> stars and{" "}
        <em>k &minus; 1</em> bars, and the number of ways is:
      </p>
      <MathBlock
        latex="\binom{n + k - 1}{k - 1} = \binom{n + k - 1}{n}"
        display
      />
      <p>
        For example, distributing 10 identical candies among 4 children gives{" "}
        <MathBlock latex="\binom{10+4-1}{4-1} = \binom{13}{3} = 286" display={false} />{" "}
        ways. Each arrangement of stars and bars represents a unique
        distribution.
      </p>

      <h2>Code It: Computing C(n, r)</h2>
      <CodeEditor
        language="python"
        description="Implement the binomial coefficient C(n,r) in Python. Use the multiplicative formula to avoid computing enormous factorials."
        initialCode={`def choose(n, r):
    """Compute C(n, r) = n! / (r! * (n-r)!)
    Use the multiplicative approach to avoid huge factorials.
    """
    if r < 0 or r > n:
        return 0
    if r == 0 or r == n:
        return 1

    # Use symmetry: C(n, r) = C(n, n-r)
    # Pick the smaller of r and n-r for efficiency
    r = min(r, n - r)

    result = 1
    for i in range(r):
        # TODO: multiply and divide step by step
        # Hint: result = result * (n - i) // (i + 1)
        pass

    return result

# Test cases
print(f"C(12, 5) = {choose(12, 5)}")   # Expected: 792
print(f"C(10, 3) = {choose(10, 3)}")   # Expected: 120
print(f"C(52, 5) = {choose(52, 5)}")   # Expected: 2,598,960
print(f"C(13, 3) = {choose(13, 3)}")   # Expected: 286 (stars and bars)`}
        solution={`def choose(n, r):
    """Compute C(n, r) = n! / (r! * (n-r)!)
    Use the multiplicative approach to avoid huge factorials.
    """
    if r < 0 or r > n:
        return 0
    if r == 0 or r == n:
        return 1

    # Use symmetry: C(n, r) = C(n, n-r)
    r = min(r, n - r)

    result = 1
    for i in range(r):
        result = result * (n - i) // (i + 1)

    return result

# Test cases
print(f"C(12, 5) = {choose(12, 5)}")   # 792
print(f"C(10, 3) = {choose(10, 3)}")   # 120
print(f"C(52, 5) = {choose(52, 5)}")   # 2,598,960 (poker hands!)
print(f"C(13, 3) = {choose(13, 3)}")   # 286 (stars and bars)

# Verify Pascal's identity: C(n,r) = C(n-1,r-1) + C(n-1,r)
n, r = 10, 4
assert choose(n, r) == choose(n-1, r-1) + choose(n-1, r)
print(f"Pascal's identity verified: C(10,4) = C(9,3) + C(9,4) = {choose(9,3)} + {choose(9,4)} = {choose(10,4)}")`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="perm-comb-q1"
        question="A club has 20 members. In how many ways can a president, vice-president, and secretary be chosen?"
        options={[
          {
            text: "C(20, 3) = 1,140",
            feedback:
              "Combinations ignore order. But president, VP, and secretary are distinct roles — order matters here!",
          },
          {
            text: "P(20, 3) = 6,840",
            feedback:
              "Correct! Since the three positions are distinct (order matters), we use permutations: P(20,3) = 20 × 19 × 18 = 6,840.",
          },
          {
            text: "20³ = 8,000",
            feedback:
              "This would allow the same person to hold multiple positions. Each position must go to a different person.",
          },
          {
            text: "3! × 20 = 120",
            feedback:
              "This formula does not match any standard counting technique. Think step by step: 20 choices for president, then 19, then 18.",
          },
        ]}
        correctIndex={1}
        hint="The key question: does order matter? A president-VP-secretary arrangement is NOT the same as a VP-secretary-president arrangement."
        explanation="Since the roles are distinct, this is a permutation: P(20,3) = 20 × 19 × 18 = 6,840. If we were just choosing 3 people with no roles, it would be C(20,3) = 1,140."
      />

      <InteractiveQuestion
        id="perm-comb-q2"
        question="How many 5-card poker hands can be dealt from a standard 52-card deck?"
        options={[
          {
            text: "52⁵ = 380,204,032",
            feedback:
              "This allows the same card to appear multiple times. Each card in the deck is unique.",
          },
          {
            text: "P(52, 5) = 311,875,200",
            feedback:
              "Permutations count ordered sequences. But the hand {A♠, K♥, Q♦, J♣, 10♠} is the same regardless of the order dealt.",
          },
          {
            text: "C(52, 5) = 2,598,960",
            feedback:
              "Correct! A poker hand is an unordered set of 5 cards. C(52,5) = 52!/(5!·47!) = 2,598,960.",
          },
          {
            text: "52 × 51 × 50 × 49 × 48 / 52",
            feedback:
              "This formula does not simplify to the correct answer. Use the standard combination formula.",
          },
        ]}
        correctIndex={2}
        hint="Does the order in which you receive the 5 cards matter? Think about what defines a 'hand.'"
        explanation="A poker hand is a set of 5 cards where order does not matter. So we use combinations: C(52,5) = 2,598,960. This is the denominator in many poker probability calculations."
      />

      <h3>Challenge: Multiset Coefficients</h3>
      <p>
        An ice cream shop has 8 flavors. You order a sundae with 3 scoops, and
        you <em>can</em> repeat flavors. How many different sundaes are possible?
      </p>
      <RevealAnswer label="Show solution">
        <p>
          This is a stars-and-bars problem. We are distributing 3 identical
          scoops into 8 distinct flavors:
        </p>
        <MathBlock
          latex="\binom{3 + 8 - 1}{8 - 1} = \binom{10}{7} = \binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120"
          display
        />
        <p>
          There are 120 possible sundaes. This is called a{" "}
          <strong>multiset coefficient</strong> &mdash; choosing with repetition
          allowed. The formula{" "}
          <MathBlock latex="\binom{n+k-1}{k}" display={false} /> gives the
          number of ways to choose k items from n types with repetition.
        </p>
      </RevealAnswer>
    </div>
  );
}
