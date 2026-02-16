"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function LinearCombinations() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Building Vectors from Other Vectors</h2>
      <p>
        A <strong>linear combination</strong> is what you get when you scale
        several vectors by constants and add them together. Given vectors
        <em> v₁, v₂, …, vₖ</em> and scalars <em>c₁, c₂, …, cₖ</em>, the
        expression:
      </p>
      <MathBlock latex="c_1\vec{v}_1 + c_2\vec{v}_2 + \cdots + c_k\vec{v}_k" display />
      <p>
        is a linear combination. This may sound abstract, but it is the single
        most important operation in linear algebra. Almost every concept &mdash;
        span, linear independence, bases, dimension, column space &mdash; is
        defined in terms of linear combinations.
      </p>
      <p>
        For example, the vector (5, 7) is a linear combination of (1, 0) and
        (0, 1) with coefficients 5 and 7. It is also a linear combination of
        (1, 1) and (1, −1) with coefficients 6 and −1. The same vector can be
        expressed as a linear combination of different sets of vectors.
      </p>

      <h2>What Is the Span?</h2>
      <p>
        The <strong>span</strong> of a set of vectors is the collection of
        <em> all</em> vectors that can be formed as linear combinations of
        those vectors. Think of it as everything you can &ldquo;reach&rdquo;
        using only scaling and adding.
      </p>
      <MathBlock
        latex="\text{span}(\vec{v}_1, \vec{v}_2) = \{c_1\vec{v}_1 + c_2\vec{v}_2 \mid c_1, c_2 \in \mathbb{R}\}"
        display
      />
      <p>
        In 2D, two non-parallel vectors span the entire plane. Two parallel
        vectors span only a line. One nonzero vector spans a line through the
        origin. The zero vector spans only {0}.
      </p>

      <h2>Explore: Building Vectors Interactively</h2>
      <p>
        Use the sliders below to choose coefficients <em>c₁</em> and <em>c₂</em>.
        The resulting linear combination of two basis vectors traces out
        different points. With enough experimentation you will see that any
        point in the plane can be reached.
      </p>
      <SliderExploration
        title="Linear Combination Explorer"
        description="Adjust c₁ and c₂ to form c₁·(1,0) + c₂·(0,1) and see which point you land on."
        parameters={[
          { name: "c1", label: "c₁", min: -5, max: 5, step: 0.1, default: 1 },
          { name: "c2", label: "c₂", min: -5, max: 5, step: 0.1, default: 1 },
        ]}
        equation="c2/c1 * x"
        xRange={[-6, 6]}
        yRange={[-6, 6]}
      />

      <h2>Linear Independence</h2>
      <p>
        A set of vectors is <strong>linearly independent</strong> if no vector
        in the set can be written as a linear combination of the others.
        Equivalently, the only way to get the zero vector from the combination
        is by setting all coefficients to zero:
      </p>
      <MathBlock
        latex="c_1\vec{v}_1 + c_2\vec{v}_2 + \cdots + c_k\vec{v}_k = \vec{0} \implies c_1 = c_2 = \cdots = c_k = 0"
        display
      />
      <p>
        If there is a nontrivial solution (at least one cᵢ ≠ 0), the vectors
        are <strong>linearly dependent</strong>: one is redundant because it can
        be built from the others.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Are v₁ = (1, 2) and v₂ = (3, 6) linearly independent?"
        steps={[
          {
            title: "Set up the equation",
            content: "We need c₁v₁ + c₂v₂ = 0.",
            latex: "c_1\\begin{pmatrix}1\\\\2\\end{pmatrix} + c_2\\begin{pmatrix}3\\\\6\\end{pmatrix} = \\begin{pmatrix}0\\\\0\\end{pmatrix}",
          },
          {
            title: "Write the system of equations",
            content: "Component by component.",
            latex: "c_1 + 3c_2 = 0 \\qquad 2c_1 + 6c_2 = 0",
          },
          {
            title: "Solve",
            content: "The second equation is just 2× the first. We have infinitely many solutions, e.g., c₁ = −3, c₂ = 1.",
          },
          {
            title: "Conclusion",
            content: "Since a nontrivial solution exists, the vectors are linearly dependent. Indeed, v₂ = 3·v₁.",
          },
        ]}
      />

      <h2>Basis and Dimension</h2>
      <p>
        A <strong>basis</strong> for a vector space is a set of vectors that is
        linearly independent and spans the entire space. The number of vectors
        in a basis is the <strong>dimension</strong> of the space. For ℝ², any
        two linearly independent vectors form a basis, and the dimension is 2.
      </p>
      <MathBlock
        latex="\text{Standard basis for } \mathbb{R}^2: \quad \vec{e}_1 = \begin{pmatrix}1\\0\end{pmatrix},\; \vec{e}_2 = \begin{pmatrix}0\\1\end{pmatrix}"
        display
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="lincomb-q1"
        question="What is 2·(1, 3) + (−1)·(4, 2)?"
        options={[
          { text: "(−2, 4)", feedback: "Correct! 2·1+(−1)·4 = −2, and 2·3+(−1)·2 = 4." },
          { text: "(6, 8)", feedback: "Check the sign on the second term." },
          { text: "(−2, 8)", feedback: "Recheck the second component: 6 − 2 = 4, not 8." },
          { text: "(2, 4)", feedback: "The first component is 2 − 4 = −2, not 2." },
        ]}
        correctIndex={0}
        hint="Scale each vector, then add component-wise."
        explanation="2(1,3) = (2,6) and −1(4,2) = (−4,−2). Sum: (2−4, 6−2) = (−2, 4)."
      />

      <InteractiveQuestion
        id="lincomb-q2"
        question="Two vectors in ℝ² are linearly dependent. What does this mean geometrically?"
        options={[
          { text: "They are perpendicular", feedback: "Perpendicular vectors are independent, not dependent." },
          { text: "They lie on the same line through the origin", feedback: "Correct! Dependent vectors are scalar multiples of each other, so they point along the same line." },
          { text: "They span all of ℝ²", feedback: "Dependent vectors span only a line, not the full plane." },
          { text: "They have equal length", feedback: "Length has nothing to do with dependence. (1,0) and (2,0) are dependent despite different lengths." },
        ]}
        correctIndex={1}
        hint="If one vector is a scalar multiple of the other, what does that mean visually?"
        explanation="Linearly dependent vectors in ℝ² are parallel — they lie on the same line through the origin."
      />

      <h3>Practice</h3>
      <p>Express the vector (7, 11) as a linear combination of (1, 2) and (3, 1).</p>
      <RevealAnswer label="Show solution">
        <p>We need c₁(1,2) + c₂(3,1) = (7,11). This gives the system:</p>
        <MathBlock latex="c_1 + 3c_2 = 7 \qquad 2c_1 + c_2 = 11" display />
        <p>From the first equation, c₁ = 7 − 3c₂. Substituting: 2(7 − 3c₂) + c₂ = 11 → 14 − 5c₂ = 11 → c₂ = 3/5. Then c₁ = 7 − 9/5 = 26/5.</p>
        <MathBlock latex="\\frac{26}{5}\\begin{pmatrix}1\\\\2\\end{pmatrix} + \\frac{3}{5}\\begin{pmatrix}3\\\\1\\end{pmatrix} = \\begin{pmatrix}7\\\\11\\end{pmatrix}" display />
      </RevealAnswer>
    </div>
  );
}
