"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function IntegrationTechniques() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Beyond Basic Antiderivatives</h2>
      <p>
        You already know that integration reverses differentiation. For simple
        functions like x&#178; or sin(x), antiderivatives come from pattern
        recognition. But most real-world integrals require <strong>techniques
        </strong> &mdash; systematic methods to transform difficult integrals
        into ones you already know how to solve.
      </p>
      <p>
        The two most important techniques are <strong>u-substitution</strong>{" "}
        (the inverse of the chain rule) and <strong>integration by parts</strong>{" "}
        (the inverse of the product rule).
      </p>

      <h2>U-Substitution</h2>
      <p>
        U-substitution works when the integrand contains a function and its
        derivative. The idea: identify an inner function u = g(x), compute
        du = g&apos;(x) dx, and rewrite the integral entirely in terms of u.
      </p>
      <MathBlock
        latex="\int f(g(x)) \cdot g'(x)\, dx = \int f(u)\, du \quad \text{where } u = g(x)"
        display
      />

      <StepByStep
        title="Evaluate ∫ 2x cos(x²) dx"
        steps={[
          {
            title: "Identify the inner function",
            content:
              "The argument of cosine is x². Notice that its derivative, 2x, appears as a factor. Let u = x².",
            latex: "u = x^2, \\quad du = 2x\\, dx",
          },
          {
            title: "Substitute",
            content: "Replace x² with u and 2x dx with du.",
            latex: "\\int 2x \\cos(x^2)\\, dx = \\int \\cos(u)\\, du",
          },
          {
            title: "Integrate",
            content: "The antiderivative of cos(u) is sin(u).",
            latex: "\\int \\cos(u)\\, du = \\sin(u) + C",
          },
          {
            title: "Substitute back",
            content: "Replace u with x².",
            latex: "\\sin(x^2) + C",
          },
        ]}
      />

      <h2>Visualizing the Area</h2>
      <p>
        The graph below shows f(x) = 2x cos(x&#178;). The signed area under this
        curve from 0 to any point x is given by sin(x&#178;), the antiderivative
        we just found.
      </p>
      <GraphPlayground
        equation="2*x*cos(x^2)"
        xRange={[-3, 3]}
        yRange={[-4, 4]}
        interactive
        showGrid
        color="#10b981"
      />

      <h2>Integration by Parts</h2>
      <p>
        Integration by parts comes from reversing the product rule. If you have
        two functions multiplied together and one gets simpler when
        differentiated, this technique applies:
      </p>
      <MathBlock
        latex="\int u\, dv = uv - \int v\, du"
        display
      />
      <p>
        The mnemonic <strong>LIATE</strong> helps you choose u: pick the function
        that is highest in the list Logarithmic, Inverse trig, Algebraic,
        Trigonometric, Exponential. That function becomes u (it gets
        differentiated); the rest becomes dv (it gets integrated).
      </p>

      <StepByStep
        title="Evaluate ∫ x eˣ dx"
        steps={[
          {
            title: "Choose u and dv",
            content:
              "By LIATE, the algebraic function x is higher priority than the exponential eˣ.",
            latex: "u = x, \\quad dv = e^x\\, dx",
          },
          {
            title: "Compute du and v",
            content: "Differentiate u and integrate dv.",
            latex: "du = dx, \\quad v = e^x",
          },
          {
            title: "Apply the formula",
            content: "Substitute into the integration by parts formula.",
            latex: "\\int x e^x\\, dx = x e^x - \\int e^x\\, dx",
          },
          {
            title: "Evaluate the remaining integral",
            content: "The remaining integral is elementary.",
            latex: "x e^x - e^x + C = e^x(x - 1) + C",
          },
        ]}
      />

      <h2>Recognizing Which Technique to Use</h2>
      <p>
        Choosing the right technique is often the hardest part. Here are some
        guidelines:
      </p>
      <ul>
        <li>
          <strong>U-substitution:</strong> Look for a composition f(g(x)) where
          g&apos;(x) appears as a factor. Common clues: powers inside trig functions,
          expressions like e&#94;(3x) where the &ldquo;inner&rdquo; derivative is a constant.
        </li>
        <li>
          <strong>Integration by parts:</strong> Look for a product of two
          different &ldquo;types&rdquo; of functions (e.g., polynomial times exponential,
          polynomial times trig). One should simplify when differentiated.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="inttech-q1"
        question="Which technique would you use for ∫ x² sin(x) dx?"
        options={[
          { text: "U-substitution with u = x²", feedback: "U-substitution would give du = 2x dx, but there is no clean way to rewrite sin(x) dx in terms of u alone." },
          { text: "Integration by parts", feedback: "Correct! This is a product of a polynomial (x²) and a trig function (sin x). By LIATE, let u = x² and dv = sin(x) dx. You will need to apply parts twice since differentiating x² takes two steps to reach a constant." },
          { text: "Direct antiderivative lookup", feedback: "There is no standard formula for ∫ x² sin(x) dx. A technique is needed." },
          { text: "Partial fractions", feedback: "Partial fractions apply to rational functions (polynomial divided by polynomial), not products with trig functions." },
        ]}
        correctIndex={1}
        hint="You have a polynomial times a trig function. Which technique handles products of different function types?"
        explanation="Integration by parts handles products like polynomial × trig. Let u = x² (algebraic, higher in LIATE) and dv = sin(x) dx."
      />

      <InteractiveQuestion
        id="inttech-q2"
        question="What is ∫ 3x² eˣ³ dx?"
        options={[
          { text: "eˣ³ + C", feedback: "Correct! Let u = x³, then du = 3x² dx. The integral becomes ∫ eᵘ du = eᵘ + C = eˣ³ + C. The 3x² is exactly the derivative of x³." },
          { text: "x³ eˣ³ + C", feedback: "This would require integration by parts, but the integral is much simpler with u-substitution." },
          { text: "3eˣ³ + C", feedback: "The factor of 3 is consumed by the substitution du = 3x² dx." },
          { text: "eˣ³ / 3 + C", feedback: "No division by 3 is needed because du already accounts for the 3x² factor." },
        ]}
        correctIndex={0}
        hint="Notice that 3x² is the derivative of x³. What substitution does that suggest?"
        explanation="With u = x³, du = 3x² dx. The integral becomes ∫ eᵘ du = eᵘ + C = eˣ³ + C."
      />

      <h3>Challenge</h3>
      <p>
        Evaluate ∫ ln(x) dx using integration by parts. (Hint: let u = ln(x)
        and dv = dx.)
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Let u = ln(x), dv = dx. Then du = (1/x) dx, v = x.
        </p>
        <MathBlock
          latex="\int \ln(x)\, dx = x\ln(x) - \int x \cdot \frac{1}{x}\, dx = x\ln(x) - x + C"
          display
        />
      </RevealAnswer>
    </div>
  );
}
