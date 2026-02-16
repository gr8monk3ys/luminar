"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function WhatAreVectors() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Arrows, Lists, or Something More?</h2>
      <p>
        A <strong>vector</strong> is one of the most versatile concepts in
        mathematics. In physics, it is an arrow with magnitude and direction. In
        data science, it is a list of numbers representing features. In linear
        algebra, it is an element of a <em>vector space</em> that obeys certain
        rules of addition and scaling. All three viewpoints describe the same
        underlying idea.
      </p>
      <p>
        We will begin with the geometric picture in two dimensions and then
        generalize. A 2D vector can be written as an ordered pair:
      </p>
      <MathBlock latex="\vec{v} = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}" display />
      <p>
        The numbers <em>v₁</em> and <em>v₂</em> are the <strong>components</strong>{" "}
        of the vector. Geometrically, think of an arrow starting at the origin
        and ending at the point (v₁, v₂).
      </p>

      <h2>Vector Addition</h2>
      <p>
        Adding two vectors means placing them tip-to-tail. Algebraically we
        just add corresponding components:
      </p>
      <MathBlock
        latex="\begin{pmatrix}a_1\\a_2\end{pmatrix} + \begin{pmatrix}b_1\\b_2\end{pmatrix} = \begin{pmatrix}a_1+b_1\\a_2+b_2\end{pmatrix}"
        display
      />
      <p>
        This operation is commutative (<em>a + b = b + a</em>) and produces
        the diagonal of the parallelogram formed by the two vectors. Drag the
        graph below to explore different vector arrangements.
      </p>
      <GraphPlayground
        equation="x"
        xRange={[-5, 5]}
        yRange={[-5, 5]}
        interactive
        showGrid
        color="#6366f1"
      />

      <h2>Scalar Multiplication</h2>
      <p>
        Multiplying a vector by a <strong>scalar</strong> (a single number)
        stretches or shrinks the arrow. A negative scalar also flips its
        direction:
      </p>
      <MathBlock
        latex="c\,\vec{v} = c\begin{pmatrix}v_1\\v_2\end{pmatrix} = \begin{pmatrix}c\,v_1\\c\,v_2\end{pmatrix}"
        display
      />
      <SliderExploration
        title="Scalar Multiplication"
        description="Adjust the scalar c to see how it stretches or flips the vector (1, 2). When c is negative the vector reverses direction."
        parameters={[
          { name: "c", label: "Scalar c", min: -3, max: 3, step: 0.1, default: 1 },
        ]}
        equation="2*c*x"
        xRange={[-5, 5]}
        yRange={[-8, 8]}
      />

      <h2>Magnitude (Length)</h2>
      <p>
        The <strong>magnitude</strong> of a vector is its length, computed using
        the Pythagorean theorem:
      </p>
      <MathBlock latex="\|\vec{v}\| = \sqrt{v_1^2 + v_2^2}" display />
      <p>
        A vector with magnitude 1 is called a <strong>unit vector</strong>. You
        can convert any nonzero vector to a unit vector by dividing by its
        magnitude: <em>v̂ = v / ||v||</em>. Unit vectors encode direction only.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Find the magnitude and unit vector of v = (3, 4)"
        steps={[
          {
            title: "Compute the magnitude",
            content: "Apply the formula.",
            latex: "\\|\\vec{v}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5",
          },
          {
            title: "Divide by the magnitude",
            content: "Scale each component by 1/5.",
            latex: "\\hat{v} = \\frac{1}{5}\\begin{pmatrix}3\\\\4\\end{pmatrix} = \\begin{pmatrix}0.6\\\\0.8\\end{pmatrix}",
          },
          {
            title: "Verify",
            content: "Check that the result has magnitude 1.",
            latex: "\\sqrt{0.6^2 + 0.8^2} = \\sqrt{0.36+0.64} = \\sqrt{1} = 1 \\; \\checkmark",
          },
        ]}
      />

      <h2>Higher Dimensions</h2>
      <p>
        Everything above generalizes to <em>n</em> dimensions. A vector in
        ℝⁿ is simply a list of <em>n</em> numbers. Addition and scalar
        multiplication work component-by-component, and the magnitude formula
        extends naturally:
      </p>
      <MathBlock latex="\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}" display />
      <p>
        While we lose the ability to draw arrows in high dimensions, the
        algebraic rules remain identical. This is what makes linear algebra so
        powerful: the same framework describes 2D physics, 100-dimensional
        machine learning feature spaces, and everything in between.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="vec-q1"
        question="What is (2, 5) + (−1, 3)?"
        options={[
          { text: "(1, 8)", feedback: "Correct! Add component-wise: 2+(−1)=1, 5+3=8." },
          { text: "(3, 2)", feedback: "Check the arithmetic: 2+(−1)=1, not 3." },
          { text: "(−2, 15)", feedback: "You multiplied instead of adding." },
          { text: "(1, 2)", feedback: "The second component should be 5+3=8." },
        ]}
        correctIndex={0}
        hint="Add the first components together, then add the second components."
        explanation="Vector addition is done component-wise: (2+(−1), 5+3) = (1, 8)."
      />

      <InteractiveQuestion
        id="vec-q2"
        question="What is the magnitude of the vector (0, 3, 4)?"
        options={[
          { text: "7", feedback: "You added the components. Magnitude uses the square root of the sum of squares." },
          { text: "5", feedback: "Correct! √(0+9+16) = √25 = 5." },
          { text: "25", feedback: "That is the sum of squares before taking the square root." },
          { text: "√7", feedback: "Check your squares: 0²+3²+4² = 0+9+16 = 25." },
        ]}
        correctIndex={1}
        hint="||v|| = √(v₁² + v₂² + v₃²)."
        explanation="||v|| = √(0² + 3² + 4²) = √(25) = 5."
      />
    </div>
  );
}
