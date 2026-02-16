"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function FundamentalTheorem() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Bridge Between Derivatives and Integrals</h2>
      <p>
        At first glance, differentiation (finding slopes) and integration
        (finding areas) look like completely unrelated operations. The
        <strong> Fundamental Theorem of Calculus (FTC)</strong> reveals the
        stunning truth: they are inverses of each other. This single theorem
        unifies the two main branches of calculus and makes practical
        computation of integrals possible.
      </p>
      <p>
        The theorem comes in two parts. Together they say: differentiating an
        integral gives back the original function, and integrating a derivative
        recovers the net change.
      </p>

      <h2>Part 1: Differentiation Undoes Integration</h2>
      <p>
        Define an &ldquo;accumulation function&rdquo; <em>F(x)</em> as the area
        under <em>f(t)</em> from a fixed starting point <em>a</em> to a
        variable endpoint <em>x</em>:
      </p>
      <MathBlock latex="F(x) = \int_a^x f(t)\,dt" display />
      <p>
        Part 1 of the FTC says that if <em>f</em> is continuous, then <em>F</em>{" "}
        is differentiable and its derivative is simply <em>f</em> again:
      </p>
      <MathBlock latex="F'(x) = \frac{d}{dx}\int_a^x f(t)\,dt = f(x)" display />
      <p>
        In other words, the rate at which accumulated area grows equals the
        height of the curve at that point. This is deeply intuitive: if the
        function is tall, area accumulates quickly; if the function is near
        zero, area barely grows.
      </p>

      <h2>Part 2: The Evaluation Theorem</h2>
      <p>
        Part 2 gives us the practical tool for computing definite integrals. If
        <em>F</em> is any antiderivative of <em>f</em> (meaning
        <em> F&apos; = f</em>), then:
      </p>
      <MathBlock latex="\int_a^b f(x)\,dx = F(b) - F(a)" display />
      <p>
        Instead of taking limits of Riemann sums (an arduous process), we
        simply find an antiderivative and plug in the bounds. This is why
        antiderivatives are so important.
      </p>

      <h2>Visualizing the Accumulation Function</h2>
      <p>
        Below is the graph of <em>f(x) = sin(x)</em>. Think of sliding the
        right endpoint of the integral from 0 toward 2π and watching the total
        accumulated area grow and shrink. When <em>f</em> is positive, the
        accumulated area increases; when <em>f</em> is negative, it decreases.
      </p>
      <GraphPlayground
        equation="sin(x)"
        xRange={[-1, 7]}
        yRange={[-1.5, 1.5]}
        interactive
        showGrid
        color="#6366f1"
      />
      <p>
        The accumulation function for sin(x) starting at 0 is
        <em> F(x) = 1 − cos(x)</em>. Notice <em>F&apos;(x) = sin(x)</em>,
        confirming Part 1 of the FTC.
      </p>
      <GraphPlayground
        equation="1 - cos(x)"
        xRange={[-1, 7]}
        yRange={[-0.5, 2.5]}
        interactive
        showGrid
        color="#8b5cf6"
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Evaluate ∫₁⁴ (2x + 1) dx using the FTC"
        steps={[
          {
            title: "Find the antiderivative",
            content: "An antiderivative of 2x + 1 is x² + x.",
            latex: "F(x) = x^2 + x",
          },
          {
            title: "Evaluate at the bounds",
            content: "Compute F(4) and F(1).",
            latex: "F(4) = 16 + 4 = 20, \\quad F(1) = 1 + 1 = 2",
          },
          {
            title: "Subtract",
            content: "Apply the Evaluation Theorem.",
            latex: "\\int_1^4 (2x+1)\\,dx = 20 - 2 = 18",
          },
        ]}
      />

      <h2>Why This Theorem Matters</h2>
      <p>
        Before the FTC, computing areas required summing infinite series &mdash;
        a process that took Archimedes immense effort for even simple curves.
        The FTC transforms integration into a mechanical process: find an
        antiderivative and evaluate. This insight, independently discovered by
        Newton and Leibniz in the 17th century, is arguably the most important
        single result in all of mathematics.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="ftc-q1"
        question="If F(x) = ∫₀ˣ t³ dt, what is F'(x)?"
        options={[
          { text: "x⁴/4", feedback: "That is F(x) itself (the antiderivative evaluated). We want F'(x)." },
          { text: "x³", feedback: "Correct! By Part 1 of the FTC, the derivative of the accumulation function is the integrand evaluated at x." },
          { text: "3x²", feedback: "You differentiated x³, but the FTC says F'(x) = f(x), not f'(x)." },
          { text: "t³", feedback: "Replace the dummy variable t with x. F'(x) = x³." },
        ]}
        correctIndex={1}
        hint="Part 1 of the FTC says d/dx ∫ₐˣ f(t) dt = f(x)."
        explanation="The FTC Part 1 tells us directly: F'(x) = x³. The derivative of the integral gives back the original function."
      />

      <InteractiveQuestion
        id="ftc-q2"
        question="What is ∫₀³ 2x dx?"
        options={[
          { text: "3", feedback: "Check your antiderivative: the antiderivative of 2x is x², not x." },
          { text: "6", feedback: "Close — that would be 2·3, but you need to evaluate x² at the bounds." },
          { text: "9", feedback: "Correct! Antiderivative is x². Evaluate: 3² − 0² = 9." },
          { text: "18", feedback: "You may have used 2x² as the antiderivative. The correct one is x²." },
        ]}
        correctIndex={2}
        hint="The antiderivative of 2x is x² (reverse Power Rule)."
        explanation="∫₀³ 2x dx = [x²]₀³ = 9 − 0 = 9."
      />

      <h3>Practice</h3>
      <p>Use the FTC to evaluate:</p>
      <MathBlock latex="\int_0^{\pi} \cos(x)\,dx" display />
      <RevealAnswer label="Show solution">
        <p>The antiderivative of cos(x) is sin(x).</p>
        <MathBlock latex="\left[\sin(x)\right]_0^{\pi} = \sin(\pi) - \sin(0) = 0 - 0 = 0" display />
        <p>
          The positive area from 0 to π/2 and the... wait — actually sin(π) = 0
          and sin(0) = 0, so the integral is 0. But that seems surprising! The
          issue is that cos(x) is positive on [0, π/2] and negative on [π/2, π],
          so the signed areas cancel. Indeed, ∫₀^(π/2) cos(x) dx = 1 and
          ∫_(π/2)^π cos(x) dx = −1.
        </p>
      </RevealAnswer>
    </div>
  );
}
