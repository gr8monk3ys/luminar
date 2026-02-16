"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function Determinants() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Determinant: Measuring How a Matrix Scales Space</h2>
      <p>
        The <strong>determinant</strong> of a square matrix is a single number
        that encodes a wealth of information about the transformation the matrix
        represents. Geometrically, the determinant tells you by what factor the
        matrix scales areas (in 2D) or volumes (in 3D). A determinant of 2 means
        areas double; a determinant of -1 means areas are preserved but
        orientation is flipped.
      </p>
      <MathBlock
        latex="\det(A) = \text{signed scale factor of the transformation}"
        display
      />

      <h2>The 2&#215;2 Determinant</h2>
      <p>
        For a 2&#215;2 matrix, the formula is simple and worth memorizing:
      </p>
      <MathBlock
        latex="\det\begin{pmatrix}a & b \\ c & d\end{pmatrix} = ad - bc"
        display
      />
      <p>
        This equals the signed area of the parallelogram formed by the column
        vectors (a, c) and (b, d). If the determinant is positive, the
        transformation preserves orientation (counterclockwise stays
        counterclockwise). If negative, orientation is reversed.
      </p>

      <StepByStep
        title="Compute det([[3, 1], [2, 4]])"
        steps={[
          {
            title: "Identify the entries",
            content: "a = 3, b = 1, c = 2, d = 4.",
            latex:
              "\\det\\begin{pmatrix}3 & 1\\\\2 & 4\\end{pmatrix}",
          },
          {
            title: "Apply the formula ad - bc",
            content: "Multiply the main diagonal and subtract the off-diagonal product.",
            latex: "(3)(4) - (1)(2) = 12 - 2 = 10",
          },
          {
            title: "Interpret",
            content:
              "The determinant is 10. This matrix scales areas by a factor of 10 and preserves orientation (positive sign).",
          },
        ]}
      />

      <h2>The 3&#215;3 Determinant</h2>
      <p>
        For a 3&#215;3 matrix, we use <strong>cofactor expansion</strong> along
        the first row. Each entry multiplies the determinant of its 2&#215;2 minor,
        with alternating signs:
      </p>
      <MathBlock
        latex="\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix} = a(ei-fh) - b(di-fg) + c(dh-eg)"
        display
      />

      <StepByStep
        title="Compute a 3×3 determinant"
        steps={[
          {
            title: "The matrix",
            content: "Let us compute the determinant of a concrete matrix.",
            latex:
              "A = \\begin{pmatrix}1 & 2 & 3\\\\4 & 5 & 6\\\\7 & 8 & 0\\end{pmatrix}",
          },
          {
            title: "Expand along the first row",
            content: "Apply cofactor expansion with alternating signs +, -, +.",
            latex:
              "1\\det\\begin{pmatrix}5&6\\\\8&0\\end{pmatrix} - 2\\det\\begin{pmatrix}4&6\\\\7&0\\end{pmatrix} + 3\\det\\begin{pmatrix}4&5\\\\7&8\\end{pmatrix}",
          },
          {
            title: "Evaluate each 2×2 determinant",
            content: "Use ad - bc for each minor.",
            latex:
              "1(0-48) - 2(0-42) + 3(32-35) = -48 + 84 - 9 = 27",
          },
        ]}
      />

      <h2>Explore: How Determinant Affects Area</h2>
      <p>
        Adjust the matrix entries below to see how the determinant changes. When
        the determinant approaches zero, the transformation collapses 2D space
        onto a line (or point), destroying area.
      </p>
      <SliderExploration
        title="Determinant and Area Scaling"
        description="The parameter scales one entry of a 2×2 matrix. Watch how the determinant (area scaling factor) changes. At det = 0, the matrix is singular."
        parameters={[
          { name: "d", label: "Entry d", min: -3, max: 5, step: 0.1, default: 2 },
        ]}
        equation="2*d - 3"
        xRange={[-3, 5]}
        yRange={[-10, 10]}
      />

      <h2>Key Properties of Determinants</h2>
      <ul>
        <li>
          <strong>det(AB) = det(A) &middot; det(B):</strong> Composing
          transformations multiplies their scaling factors.
        </li>
        <li>
          <strong>det(A&#7511;) = det(A):</strong> Transposing does not change
          the determinant.
        </li>
        <li>
          <strong>det(A) = 0:</strong> The matrix is <em>singular</em> &mdash;
          it collapses space into a lower dimension and has no inverse.
        </li>
        <li>
          <strong>Swapping two rows</strong> negates the determinant (flips
          the sign).
        </li>
        <li>
          <strong>Scaling one row by k</strong> multiplies the determinant by k.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="det-q1"
        question="What is det([[5, 3], [2, 4]])?"
        options={[
          { text: "14", feedback: "Correct! det = (5)(4) - (3)(2) = 20 - 6 = 14." },
          { text: "20", feedback: "That is just the main diagonal product ad = 20. You need to subtract bc = 6." },
          { text: "26", feedback: "You may have added instead of subtracted: ad + bc = 20 + 6 = 26." },
          { text: "6", feedback: "That is bc, the off-diagonal product. The determinant is ad - bc." },
        ]}
        correctIndex={0}
        hint="Use the formula ad - bc for a 2×2 matrix."
        explanation="For [[5, 3], [2, 4]]: det = 5·4 - 3·2 = 20 - 6 = 14."
      />

      <InteractiveQuestion
        id="det-q2"
        question="If det(A) = 3 and det(B) = -2, what is det(AB)?"
        options={[
          { text: "1", feedback: "Determinants multiply under matrix multiplication, they do not add." },
          { text: "-6", feedback: "Correct! det(AB) = det(A) · det(B) = 3 · (-2) = -6. The composed transformation scales areas by 6 and reverses orientation." },
          { text: "6", feedback: "The sign matters. One positive and one negative determinant give a negative product." },
          { text: "-5", feedback: "Determinants multiply, not subtract: det(AB) = det(A) · det(B)." },
        ]}
        correctIndex={1}
        hint="Recall the multiplicative property: det(AB) = det(A) · det(B)."
        explanation="det(AB) = det(A) · det(B) = 3 × (-2) = -6. The negative sign means the composition reverses orientation."
      />

      <h3>Challenge</h3>
      <p>
        A 3&#215;3 matrix has eigenvalues 2, 3, and 5. What is its determinant?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          The determinant of a matrix equals the product of its eigenvalues:
          det(A) = 2 &times; 3 &times; 5 = 30. This is because the determinant
          measures the total scaling of space, and each eigenvalue represents
          scaling along one eigenvector direction.
        </p>
      </RevealAnswer>
    </div>
  );
}
