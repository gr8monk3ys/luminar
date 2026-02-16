"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function MatrixAsTransformation() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Matrices Are Functions on Space</h2>
      <p>
        A <strong>matrix</strong> is not just a grid of numbers &mdash; it is a
        <em> function</em> that transforms vectors. When you multiply a 2×2
        matrix by a 2D vector, you get a new 2D vector. The entire plane gets
        &ldquo;remapped&rdquo;: points move, lines stretch, and angles may
        change. Understanding this geometric viewpoint is the key to truly
        grasping linear algebra.
      </p>
      <MathBlock
        latex="A\vec{v} = \begin{pmatrix}a & b\\c & d\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = \begin{pmatrix}ax+by\\cx+dy\end{pmatrix}"
        display
      />
      <p>
        The output is a linear combination of the columns of <em>A</em>,
        weighted by the components of <em>v</em>. This column-centric view is
        extremely powerful: the columns of the matrix tell you where the
        standard basis vectors land after the transformation.
      </p>

      <h2>Common Transformations</h2>
      <p>
        Many familiar geometric operations are encoded as 2×2 matrices:
      </p>
      <ul>
        <li>
          <strong>Rotation by θ:</strong>
          <MathBlock latex="\begin{pmatrix}\cos\theta & -\sin\theta\\\sin\theta & \cos\theta\end{pmatrix}" />
        </li>
        <li>
          <strong>Scaling by s:</strong>
          <MathBlock latex="\begin{pmatrix}s & 0\\0 & s\end{pmatrix}" />
        </li>
        <li>
          <strong>Reflection over x-axis:</strong>
          <MathBlock latex="\begin{pmatrix}1 & 0\\0 & -1\end{pmatrix}" />
        </li>
        <li>
          <strong>Shear:</strong>
          <MathBlock latex="\begin{pmatrix}1 & k\\0 & 1\end{pmatrix}" />
        </li>
      </ul>

      <h2>Where Do the Basis Vectors Go?</h2>
      <p>
        To understand any matrix transformation, ask: where does it send
        <em> e₁ = (1, 0)</em> and <em>e₂ = (0, 1)</em>? The answers are simply
        the first and second columns of the matrix. Every other vector is a
        linear combination of e₁ and e₂, so knowing where those two land
        determines the entire transformation.
      </p>

      <h2>Explore: Rotation</h2>
      <p>
        Use the slider to rotate the plane by angle θ. Watch how the entire
        coordinate grid twists, but straight lines remain straight and the
        origin stays fixed. These are the hallmarks of a <em>linear</em>{" "}
        transformation.
      </p>
      <SliderExploration
        title="2D Rotation"
        description="Adjust θ to rotate the plane. The curve shows how the point (1, 0) traces a circle."
        parameters={[
          { name: "theta", label: "Angle θ (radians)", min: 0, max: 6.28, step: 0.01, default: 0 },
        ]}
        equation="sin(x + theta)"
        xRange={[-6.28, 6.28]}
        yRange={[-1.5, 1.5]}
      />

      <h2>Worked Example</h2>
      <StepByStep
        title="Apply a shear matrix to the vector (2, 1)"
        steps={[
          {
            title: "Write the matrix and vector",
            content: "We use a horizontal shear with k = 3.",
            latex:
              "A = \\begin{pmatrix}1 & 3\\\\0 & 1\\end{pmatrix}, \\quad \\vec{v} = \\begin{pmatrix}2\\\\1\\end{pmatrix}",
          },
          {
            title: "Multiply",
            content: "Compute each component of the result.",
            latex:
              "A\\vec{v} = \\begin{pmatrix}1\\cdot2 + 3\\cdot1\\\\0\\cdot2 + 1\\cdot1\\end{pmatrix} = \\begin{pmatrix}5\\\\1\\end{pmatrix}",
          },
          {
            title: "Interpret",
            content:
              "The y-component is unchanged, but the x-component shifted by 3·y = 3. This is the characteristic behavior of a shear: layers slide horizontally by an amount proportional to their height.",
          },
        ]}
      />

      <h2>The Determinant as Area Factor</h2>
      <p>
        The <strong>determinant</strong> of a 2×2 matrix tells you by what
        factor the transformation scales areas. If det(A) = 2, every region
        doubles in area. If det(A) = −1, areas are preserved but orientation is
        flipped (like a reflection).
      </p>
      <MathBlock
        latex="\det\begin{pmatrix}a & b\\c & d\end{pmatrix} = ad - bc"
        display
      />
      <p>
        A determinant of zero means the transformation collapses the plane into
        a lower dimension (a line or a point). Such matrices are
        <strong> singular</strong> and have no inverse.
      </p>

      <GraphPlayground
        equation="x"
        xRange={[-5, 5]}
        yRange={[-5, 5]}
        interactive
        showGrid
        color="#f59e0b"
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="mat-trans-q1"
        question="The matrix [[0, −1], [1, 0]] sends (1, 0) to (0, 1). What transformation is this?"
        options={[
          { text: "Reflection over the x-axis", feedback: "A reflection would send (1,0) to (1,0), not (0,1)." },
          { text: "Scaling by 2", feedback: "Scaling would change the magnitude, but ||(0,1)|| = ||(1,0)|| = 1." },
          { text: "90° counter-clockwise rotation", feedback: "Correct! (1,0)→(0,1) and (0,1)→(−1,0), which is a quarter-turn CCW." },
          { text: "Horizontal shear", feedback: "A shear preserves one coordinate axis; here both basis vectors move." },
        ]}
        correctIndex={2}
        hint="Check where both basis vectors land and match against known transformations."
        explanation="e₁ → (0,1) and e₂ → (−1,0). Both points rotate 90° counter-clockwise around the origin."
      />

      <InteractiveQuestion
        id="mat-trans-q2"
        question="What does it mean if det(A) = 0?"
        options={[
          { text: "A is a rotation matrix", feedback: "Rotation matrices have det = ±1, not 0." },
          { text: "A preserves areas", feedback: "det = 1 preserves areas. det = 0 collapses them to zero." },
          { text: "A collapses space to a lower dimension", feedback: "Correct! A zero determinant means the transformation squishes all of space onto a line or point. The matrix is singular and non-invertible." },
          { text: "A doubles all areas", feedback: "Doubling would give det = 2." },
        ]}
        correctIndex={2}
        hint="A determinant of zero means the area scaling factor is 0."
        explanation="When det(A) = 0, the transformation compresses the entire plane into a lower-dimensional subspace, and the matrix has no inverse."
      />
    </div>
  );
}
