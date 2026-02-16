"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function ConvergenceTests() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Does the Series Converge?</h2>
      <p>
        A Taylor series is only useful if it actually converges. More broadly,
        given any infinite series, the fundamental question is: does the sum
        approach a finite number, or does it blow up to infinity (or oscillate
        forever)? This lesson equips you with a toolkit of{" "}
        <strong>convergence tests</strong> &mdash; each suited to different
        types of series.
      </p>
      <MathBlock
        latex="\sum_{n=1}^{\infty} a_n = a_1 + a_2 + a_3 + \cdots \quad \text{converges if } S = \lim_{N \to \infty} \sum_{n=1}^{N} a_n \text{ exists and is finite.}"
        display
      />
      <p>
        The challenge: you cannot simply &ldquo;add up infinitely many
        terms.&rdquo; You need a proof strategy. That is what convergence
        tests provide.
      </p>

      <h2>Test 1: The Divergence Test (nth-Term Test)</h2>
      <p>
        The simplest test is also the most frequently forgotten. If the terms
        of the series do not approach zero, the series <em>cannot</em>{" "}
        converge:
      </p>
      <MathBlock
        latex="\text{If } \lim_{n \to \infty} a_n \neq 0, \text{ then } \sum a_n \text{ diverges.}"
        display
      />
      <p>
        <strong>Warning:</strong> The converse is false! Terms going to zero
        does <em>not</em> guarantee convergence. The harmonic series is the
        classic counterexample:
      </p>
      <MathBlock
        latex="\sum_{n=1}^{\infty} \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \cdots \quad \text{diverges, even though } \frac{1}{n} \to 0."
        display
      />
      <p>
        Think of the divergence test as a quick filter: it can prove
        divergence but never prove convergence.
      </p>

      <h2>Test 2: The Integral Test</h2>
      <p>
        If f(x) is a positive, continuous, decreasing function for x &ge; 1
        and a<sub>n</sub> = f(n), then the series and the improper integral
        converge or diverge together:
      </p>
      <MathBlock
        latex="\sum_{n=1}^{\infty} f(n) \text{ converges} \iff \int_1^{\infty} f(x)\, dx \text{ converges.}"
        display
      />
      <p>
        This test is how we prove the harmonic series diverges and the
        p-series converges for p &gt; 1:
      </p>
      <MathBlock
        latex="\sum_{n=1}^{\infty} \frac{1}{n^p} \begin{cases} \text{converges} & \text{if } p > 1 \\ \text{diverges} & \text{if } p \le 1 \end{cases}"
        display
      />

      <h2>Test 3: The Comparison Test</h2>
      <p>
        Compare your series to one you already know. If every term of your
        series is smaller than the corresponding term of a convergent series,
        your series converges too. Conversely, if every term is larger than
        the corresponding term of a divergent series, your series diverges.
      </p>
      <MathBlock
        latex="\text{If } 0 \le a_n \le b_n \text{ and } \sum b_n \text{ converges, then } \sum a_n \text{ converges.}"
        display
      />
      <MathBlock
        latex="\text{If } 0 \le b_n \le a_n \text{ and } \sum b_n \text{ diverges, then } \sum a_n \text{ diverges.}"
        display
      />
      <p>
        The <strong>limit comparison test</strong> is a more flexible variant.
        If a<sub>n</sub> and b<sub>n</sub> are both positive and their ratio
        tends to a positive finite limit, the two series share the same
        convergence behavior:
      </p>
      <MathBlock
        latex="\text{If } \lim_{n \to \infty} \frac{a_n}{b_n} = L, \quad 0 < L < \infty, \text{ then } \sum a_n \text{ and } \sum b_n \text{ both converge or both diverge.}"
        display
      />

      <h2>Test 4: The Ratio Test</h2>
      <p>
        The ratio test is the workhorse for series involving factorials,
        exponentials, or products. Compute the limit of the ratio of
        consecutive terms:
      </p>
      <MathBlock
        latex="L = \lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right| \quad \begin{cases} L < 1 & \text{converges absolutely} \\ L > 1 & \text{diverges} \\ L = 1 & \text{inconclusive} \end{cases}"
        display
      />

      <StepByStep
        title="Apply the ratio test to Σ n!/nⁿ"
        steps={[
          {
            title: "Write the ratio of consecutive terms",
            content:
              "We need |a_{n+1}/a_n| where a_n = n!/n^n.",
            latex:
              "\\frac{a_{n+1}}{a_n} = \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!}",
          },
          {
            title: "Simplify the factorial",
            content:
              "(n+1)! = (n+1) * n!, so the n! terms cancel.",
            latex:
              "= \\frac{(n+1) \\cdot n!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\frac{n^n}{(n+1)^n}",
          },
          {
            title: "Rewrite as a power",
            content: "Factor the expression as a ratio raised to the nth power.",
            latex:
              "= \\left(\\frac{n}{n+1}\\right)^n = \\left(\\frac{1}{1 + 1/n}\\right)^n",
          },
          {
            title: "Take the limit",
            content:
              "This is a classic limit. As n approaches infinity, (1 + 1/n)^n approaches e.",
            latex:
              "L = \\lim_{n \\to \\infty} \\frac{1}{(1 + 1/n)^n} = \\frac{1}{e} \\approx 0.368",
          },
          {
            title: "Conclude",
            content:
              "Since L = 1/e < 1, the ratio test confirms that Σ n!/nⁿ converges absolutely.",
          },
        ]}
      />

      <h2>Test 5: The Alternating Series Test (Leibniz Test)</h2>
      <p>
        An <strong>alternating series</strong> has terms that switch sign:
      </p>
      <MathBlock
        latex="\sum_{n=1}^{\infty} (-1)^{n+1} b_n = b_1 - b_2 + b_3 - b_4 + \cdots"
        display
      />
      <p>
        The alternating series test says: if the absolute values b<sub>n</sub>{" "}
        are decreasing and approach zero, the series converges.
      </p>
      <MathBlock
        latex="\text{If } b_n > 0, \; b_{n+1} \le b_n, \text{ and } \lim_{n \to \infty} b_n = 0, \text{ then } \sum (-1)^{n+1} b_n \text{ converges.}"
        display
      />

      <StepByStep
        title="Apply the alternating series test to Σ (-1)^(n+1) / n"
        steps={[
          {
            title: "Identify the components",
            content:
              "This is the alternating harmonic series. Here b_n = 1/n.",
            latex:
              "\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = 1 - \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} + \\cdots",
          },
          {
            title: "Check that b_n is positive",
            content: "b_n = 1/n > 0 for all n >= 1. Condition satisfied.",
          },
          {
            title: "Check that b_n is decreasing",
            content:
              "b_{n+1} = 1/(n+1) < 1/n = b_n for all n >= 1. The terms are strictly decreasing.",
          },
          {
            title: "Check the limit",
            content: "lim(1/n) = 0 as n approaches infinity. Condition satisfied.",
            latex: "\\lim_{n \\to \\infty} \\frac{1}{n} = 0",
          },
          {
            title: "Conclude",
            content:
              "All three conditions are met, so the alternating harmonic series converges. (It converges to ln(2), though the AST does not tell us the sum.)",
            latex:
              "\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = \\ln 2 \\approx 0.693",
          },
        ]}
      />

      <h2>Decision Flowchart: Which Test to Use?</h2>
      <p>
        With five tests available, choosing the right one is half the battle.
        Here is a practical decision strategy:
      </p>
      <ol>
        <li>
          <strong>Always try the Divergence Test first.</strong> If the terms
          do not approach zero, you are done &mdash; the series diverges.
        </li>
        <li>
          <strong>Alternating signs?</strong> Use the{" "}
          <strong>Alternating Series Test</strong>. Check that |terms| are
          decreasing and approach zero.
        </li>
        <li>
          <strong>Factorials or n-th powers?</strong> Use the{" "}
          <strong>Ratio Test</strong>. It handles n!, a<sup>n</sup>, and n<sup>n</sup>{" "}
          beautifully.
        </li>
        <li>
          <strong>Looks like a p-series or familiar form?</strong> Use the{" "}
          <strong>Comparison Test</strong> (or limit comparison). Compare with
          1/n<sup>p</sup>.
        </li>
        <li>
          <strong>Can you integrate the general term?</strong> Use the{" "}
          <strong>Integral Test</strong>. Best for smooth, decreasing functions
          where the integral is tractable.
        </li>
      </ol>

      <RevealAnswer label="Show a quick-reference summary table">
        <table>
          <thead>
            <tr>
              <th>Test</th>
              <th>When to Use</th>
              <th>What It Proves</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Divergence</td>
              <td>Always check first</td>
              <td>Divergence only</td>
            </tr>
            <tr>
              <td>Integral</td>
              <td>f(x) positive, continuous, decreasing</td>
              <td>Convergence or divergence</td>
            </tr>
            <tr>
              <td>Comparison</td>
              <td>Resembles a known series</td>
              <td>Convergence or divergence</td>
            </tr>
            <tr>
              <td>Ratio</td>
              <td>Factorials, exponentials, products</td>
              <td>Absolute convergence or divergence</td>
            </tr>
            <tr>
              <td>Alternating Series</td>
              <td>Alternating signs</td>
              <td>Convergence (conditional)</td>
            </tr>
          </tbody>
        </table>
      </RevealAnswer>

      <h2>Practice: Identifying the Right Test</h2>
      <CodeEditor
        language="python"
        description="Explore partial sums numerically. This code computes partial sums for several series so you can observe convergence and divergence behavior."
        initialCode={`import math

def partial_sum(term_fn, N):
    """Compute the partial sum of term_fn(n) from n=1 to N."""
    return sum(term_fn(n) for n in range(1, N + 1))

# Series 1: Σ n!/n^n (converges by ratio test)
s1 = partial_sum(lambda n: math.factorial(n) / n**n, 20)
print(f"Σ n!/n^n (20 terms): {s1:.6f}")

# Series 2: Σ (-1)^(n+1)/n (converges to ln(2))
s2 = partial_sum(lambda n: (-1)**(n+1) / n, 1000)
print(f"Alt. harmonic (1000 terms): {s2:.6f}")
print(f"ln(2) = {math.log(2):.6f}")

# Series 3: Σ 1/n^2 (converges to π²/6)
s3 = partial_sum(lambda n: 1 / n**2, 10000)
print(f"Σ 1/n² (10000 terms): {s3:.6f}")
print(f"π²/6 = {math.pi**2/6:.6f}")

# Series 4: Σ 1/n (diverges!)
s4 = partial_sum(lambda n: 1 / n, 10000)
print(f"Σ 1/n (10000 terms): {s4:.6f} (still growing!)")`}
        solution={`import math

def partial_sum(term_fn, N):
    """Compute the partial sum of term_fn(n) from n=1 to N."""
    return sum(term_fn(n) for n in range(1, N + 1))

# Series 1: Σ n!/n^n (converges by ratio test)
s1 = partial_sum(lambda n: math.factorial(n) / n**n, 20)
print(f"Σ n!/n^n (20 terms): {s1:.6f}")
# Output: ~1.879854

# Series 2: Σ (-1)^(n+1)/n (converges to ln(2))
s2 = partial_sum(lambda n: (-1)**(n+1) / n, 1000)
print(f"Alt. harmonic (1000 terms): {s2:.6f}")
print(f"ln(2) = {math.log(2):.6f}")
# Output: ~0.693147

# Series 3: Σ 1/n^2 (converges to π²/6)
s3 = partial_sum(lambda n: 1 / n**2, 10000)
print(f"Σ 1/n² (10000 terms): {s3:.6f}")
print(f"π²/6 = {math.pi**2/6:.6f}")
# Output: ~1.644834 vs 1.644934

# Series 4: Σ 1/n (diverges!)
s4 = partial_sum(lambda n: 1 / n, 10000)
print(f"Σ 1/n (10000 terms): {s4:.6f} (still growing!)")
# Output: ~9.787606 and grows without bound`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="convergence-q1"
        question="Which test is most appropriate for determining whether Σ (3ⁿ)/(n!) converges?"
        options={[
          {
            text: "The Divergence Test",
            feedback:
              "The divergence test would show the terms approach 0, but that is inconclusive. You need a stronger test.",
          },
          {
            text: "The Ratio Test",
            feedback:
              "Correct! The ratio test is ideal for series with factorials and exponentials. Computing |a_{n+1}/a_n| = 3/(n+1), which approaches 0 < 1, proving absolute convergence.",
          },
          {
            text: "The Alternating Series Test",
            feedback:
              "This series has all positive terms (3ⁿ/n! > 0), so the alternating series test does not apply.",
          },
          {
            text: "The Integral Test",
            feedback:
              "Integrating x!/... is not straightforward. The ratio test is a much better fit for factorials.",
          },
        ]}
        correctIndex={1}
        hint="The series involves both an exponential (3ⁿ) and a factorial (n!). Which test handles these well?"
        explanation="The ratio test gives |a_{n+1}/a_n| = 3^(n+1)/(n+1)! * n!/3^n = 3/(n+1) → 0 < 1. The factorial in the denominator eventually dominates, and the series converges."
      />

      <InteractiveQuestion
        id="convergence-q2"
        question="The series Σ (-1)ⁿ·n/(n+1) — does it converge or diverge, and which test decides?"
        options={[
          {
            text: "Converges by the Alternating Series Test",
            feedback:
              "Be careful! Before using the AST, check whether the terms approach 0. Here |aₙ| = n/(n+1) → 1 ≠ 0.",
          },
          {
            text: "Diverges by the Divergence Test",
            feedback:
              "Correct! The terms aₙ = (-1)ⁿ·n/(n+1) do not approach 0 (they oscillate between values approaching +1 and -1). The divergence test immediately tells us the series diverges.",
          },
          {
            text: "Converges by the Ratio Test",
            feedback:
              "The ratio test gives L = 1 (inconclusive) for this series. The divergence test is the right first step.",
          },
          {
            text: "Diverges by the Integral Test",
            feedback:
              "The integral test requires positive terms, but this series alternates in sign. The divergence test is simpler and sufficient here.",
          },
        ]}
        correctIndex={1}
        hint="What is lim n→∞ of n/(n+1)? If the limit is not zero, what does the divergence test say?"
        explanation="lim n→∞ (-1)ⁿ·n/(n+1) does not exist (the terms oscillate near ±1, never settling to 0). By the Divergence Test, if the terms do not approach 0, the series diverges. Always check this first!"
      />
    </div>
  );
}
