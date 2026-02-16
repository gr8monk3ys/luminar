"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DotProduct() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Measuring Alignment Between Vectors</h2>
      <p>
        Given two vectors, one of the most fundamental questions is: how
        similar are their directions? The <strong>dot product</strong> (also
        called the scalar product or inner product) answers this question with
        a single number. When two vectors point in the same direction the dot
        product is large and positive. When they are perpendicular it is zero.
        When they point in opposite directions it is negative.
      </p>
      <p>
        For two vectors in ℝⁿ the dot product is defined as:
      </p>
      <MathBlock
        latex="\vec{a} \cdot \vec{b} = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n = \sum_{i=1}^n a_i b_i"
        display
      />
      <p>
        Notice that the result is a <em>scalar</em>, not a vector. That is why
        it is sometimes called the scalar product.
      </p>

      <h2>Geometric Interpretation</h2>
      <p>
        The dot product has an elegant geometric formula involving the angle
        θ between the two vectors:
      </p>
      <MathBlock
        latex="\vec{a} \cdot \vec{b} = \|\vec{a}\|\,\|\vec{b}\|\,\cos\theta"
        display
      />
      <p>
        This gives us a way to find the angle between any two vectors:
      </p>
      <MathBlock
        latex="\cos\theta = \frac{\vec{a} \cdot \vec{b}}{\|\vec{a}\|\,\|\vec{b}\|}"
        display
      />
      <p>
        Two vectors are <strong>orthogonal</strong> (perpendicular) if and only
        if their dot product is zero, because cos(90°) = 0. Orthogonality is
        one of the most important concepts in linear algebra and appears
        everywhere from least-squares regression to Fourier analysis.
      </p>

      <h2>Explore the Angle</h2>
      <SliderExploration
        title="Dot Product and Angle"
        description="Adjust the angle of the second vector (unit length) and observe how the dot product value changes. It is maximized when the vectors are aligned and zero when they are perpendicular."
        parameters={[
          { name: "theta", label: "Angle θ (degrees)", min: 0, max: 360, step: 1, default: 45 },
        ]}
        equation="cos(x)"
        xRange={[0, 6.28]}
        yRange={[-1.5, 1.5]}
      />

      <h2>Projection: The Shadow of One Vector onto Another</h2>
      <p>
        The <strong>scalar projection</strong> of <em>a</em> onto <em>b</em>{" "}
        tells you how much of <em>a</em> lies in the direction of <em>b</em>.
        It is like shining a light straight down onto <em>b</em> and measuring
        the shadow.
      </p>
      <MathBlock
        latex="\text{proj}_{\vec{b}}\,\vec{a} = \frac{\vec{a} \cdot \vec{b}}{\|\vec{b}\|^2}\,\vec{b}"
        display
      />
      <p>
        Projections are the foundation of least-squares fitting: when you fit a
        line to data, you are projecting the data vector onto the column space
        of the design matrix.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Find the dot product and angle between a = (1, 2, 3) and b = (4, −5, 6)"
        steps={[
          {
            title: "Compute the dot product",
            content: "Multiply corresponding components and sum.",
            latex: "\\vec{a}\\cdot\\vec{b} = 1(4) + 2(-5) + 3(6) = 4 - 10 + 18 = 12",
          },
          {
            title: "Find the magnitudes",
            content: "Use the Pythagorean extension.",
            latex:
              "\\|\\vec{a}\\| = \\sqrt{1+4+9} = \\sqrt{14}, \\quad \\|\\vec{b}\\| = \\sqrt{16+25+36} = \\sqrt{77}",
          },
          {
            title: "Compute cos θ",
            content: "Divide the dot product by the product of magnitudes.",
            latex:
              "\\cos\\theta = \\frac{12}{\\sqrt{14}\\,\\sqrt{77}} = \\frac{12}{\\sqrt{1078}} \\approx 0.365",
          },
          {
            title: "Find the angle",
            content: "Take the inverse cosine.",
            latex: "\\theta = \\cos^{-1}(0.365) \\approx 68.6°",
          },
        ]}
      />

      <h2>Properties of the Dot Product</h2>
      <ul>
        <li><strong>Commutative:</strong> <em>a · b = b · a</em></li>
        <li><strong>Distributive:</strong> <em>a · (b + c) = a · b + a · c</em></li>
        <li><strong>Scalar associative:</strong> <em>(ka) · b = k(a · b)</em></li>
        <li><strong>Self-dot:</strong> <em>a · a = ||a||²</em></li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="dot-q1"
        question="What is (1, 0, −2) · (3, 4, 5)?"
        options={[
          { text: "−7", feedback: "Correct! 1·3 + 0·4 + (−2)·5 = 3 + 0 − 10 = −7." },
          { text: "7", feedback: "Check the sign on the last term: (−2)(5) = −10." },
          { text: "17", feedback: "Did you add all absolute values? Watch the signs." },
          { text: "0", feedback: "Recompute: 3 + 0 − 10 ≠ 0." },
        ]}
        correctIndex={0}
        hint="Multiply each pair of components and add: 1·3 + 0·4 + (−2)·5."
        explanation="Dot product = 3 + 0 + (−10) = −7."
      />

      <InteractiveQuestion
        id="dot-q2"
        question="Two vectors have a dot product of 0. What does this tell us?"
        options={[
          { text: "They are parallel", feedback: "Parallel vectors have a nonzero dot product (unless one is zero)." },
          { text: "One of them is the zero vector", feedback: "Not necessarily — two nonzero vectors can have a zero dot product." },
          { text: "They are orthogonal (perpendicular)", feedback: "Correct! A dot product of zero means the angle between them is 90°." },
          { text: "They have equal magnitude", feedback: "The dot product depends on both magnitude and angle, not magnitude alone." },
        ]}
        correctIndex={2}
        hint="Recall the geometric formula: a · b = ||a|| ||b|| cos θ."
        explanation="If a · b = 0 and neither vector is zero, then cos θ = 0, which means θ = 90°. The vectors are perpendicular."
      />

      <h3>Practice</h3>
      <p>
        Find the scalar projection of <em>a = (3, 4)</em> onto <em>b = (1, 0)</em>.
      </p>
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="\text{comp}_{\vec{b}}\vec{a} = \frac{\vec{a}\cdot\vec{b}}{\|\vec{b}\|} = \frac{3 \cdot 1 + 4 \cdot 0}{1} = 3"
          display
        />
        <p>
          Since <em>b</em> points along the x-axis, the projection is just the
          x-component of <em>a</em>, which makes geometric sense.
        </p>
      </RevealAnswer>
    </div>
  );
}
