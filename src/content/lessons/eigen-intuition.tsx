"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function EigenIntuition() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Vectors That Survive a Transformation</h2>
      <p>
        When a matrix transforms a vector, the output usually points in a
        completely different direction. But some special vectors only get
        <em> scaled</em> &mdash; they stay on the same line through the origin.
        These are called <strong>eigenvectors</strong>, and the scaling factor
        is the <strong>eigenvalue</strong>.
      </p>
      <MathBlock latex="A\vec{v} = \lambda\vec{v}" display />
      <p>
        Here <em>v</em> is an eigenvector and <em>λ</em> (lambda) is the
        corresponding eigenvalue. The prefix &ldquo;eigen&rdquo; comes from
        German and means &ldquo;own&rdquo; or &ldquo;characteristic.&rdquo;
        Eigenvectors are the directions that the transformation
        &ldquo;owns&rdquo; &mdash; they reveal the natural axes of the
        transformation.
      </p>
      <p>
        Why do we care? Eigenvectors and eigenvalues appear everywhere:
        Google&apos;s PageRank algorithm, quantum mechanics, vibration analysis,
        principal component analysis (PCA), and stability of dynamical systems.
        Understanding eigenvectors is one of the most rewarding investments in
        linear algebra.
      </p>

      <h2>Geometric Picture</h2>
      <p>
        Consider a shear matrix that pushes everything to the right in
        proportion to its height. Most vectors change direction, but vectors
        along the x-axis stay put (they are eigenvectors with λ = 1). The
        graph below shows the function <em>y = x</em> representing the line
        along which eigenvectors of a particular matrix would lie.
      </p>
      <GraphPlayground
        equation="x"
        xRange={[-5, 5]}
        yRange={[-5, 5]}
        interactive
        showGrid
        color="#8b5cf6"
      />

      <h2>Finding Eigenvalues</h2>
      <p>
        The eigenvalue equation <em>Av = λv</em> can be rewritten as:
      </p>
      <MathBlock latex="(A - \lambda I)\vec{v} = \vec{0}" display />
      <p>
        For a nonzero <em>v</em> to exist, the matrix <em>(A − λI)</em> must
        be singular. That means its determinant must be zero:
      </p>
      <MathBlock latex="\det(A - \lambda I) = 0" display />
      <p>
        This equation is called the <strong>characteristic equation</strong>.
        Solving it gives the eigenvalues. For a 2×2 matrix it produces a
        quadratic; for an n×n matrix it produces a degree-n polynomial.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Find eigenvalues and eigenvectors of A = [[2, 1], [1, 2]]"
        steps={[
          {
            title: "Set up the characteristic equation",
            content: "Compute det(A − λI) = 0.",
            latex:
              "\\det\\begin{pmatrix}2-\\lambda & 1\\\\1 & 2-\\lambda\\end{pmatrix} = (2-\\lambda)^2 - 1 = 0",
          },
          {
            title: "Solve the quadratic",
            content: "Expand and factor.",
            latex:
              "\\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3) = 0 \\implies \\lambda = 1,\\; \\lambda = 3",
          },
          {
            title: "Find eigenvector for λ = 1",
            content: "Solve (A − I)v = 0.",
            latex:
              "\\begin{pmatrix}1 & 1\\\\1 & 1\\end{pmatrix}\\vec{v}=\\vec{0} \\implies v_1+v_2=0 \\implies \\vec{v}=\\begin{pmatrix}1\\\\-1\\end{pmatrix}",
          },
          {
            title: "Find eigenvector for λ = 3",
            content: "Solve (A − 3I)v = 0.",
            latex:
              "\\begin{pmatrix}-1 & 1\\\\1 & -1\\end{pmatrix}\\vec{v}=\\vec{0} \\implies v_1=v_2 \\implies \\vec{v}=\\begin{pmatrix}1\\\\1\\end{pmatrix}",
          },
          {
            title: "Interpret",
            content:
              "Along the direction (1, 1), the matrix stretches by factor 3. Along (1, −1), it only stretches by factor 1 (no change). These are the natural axes of the transformation.",
          },
        ]}
      />

      <h2>Explore: Eigenvalue Effects</h2>
      <p>
        Adjust the parameter below to see how changing an eigenvalue affects the
        overall transformation. Larger eigenvalues cause more stretching along
        the corresponding eigenvector direction.
      </p>
      <SliderExploration
        title="Stretching Along an Eigenvector"
        description="The parameter λ controls how much stretching occurs along one eigenvector direction."
        parameters={[
          { name: "lambda", label: "Eigenvalue λ", min: -3, max: 3, step: 0.1, default: 1 },
        ]}
        equation="lambda * x"
        xRange={[-5, 5]}
        yRange={[-10, 10]}
      />

      <h2>Special Cases</h2>
      <ul>
        <li>
          <strong>λ = 0:</strong> The eigenvector gets sent to zero. The matrix
          is singular (det = 0) and the corresponding direction gets
          &ldquo;crushed.&rdquo;
        </li>
        <li>
          <strong>λ = 1:</strong> The eigenvector is unchanged. Points along
          this direction are fixed by the transformation.
        </li>
        <li>
          <strong>λ &lt; 0:</strong> The eigenvector flips direction and scales.
          A negative eigenvalue reverses orientation along that axis.
        </li>
        <li>
          <strong>Complex eigenvalues:</strong> Indicate rotation. A 2D rotation
          matrix has eigenvalues <em>e^(±iθ)</em> — no real eigenvectors exist
          because no direction survives a pure rotation.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="eigen-q1"
        question="If Av = 5v, what is the eigenvalue?"
        options={[
          { text: "v", feedback: "v is the eigenvector, not the eigenvalue." },
          { text: "A", feedback: "A is the matrix, not the eigenvalue." },
          { text: "5", feedback: "Correct! The scalar multiplying v on the right side is the eigenvalue." },
          { text: "5v", feedback: "5v is the result of Av, not the eigenvalue itself." },
        ]}
        correctIndex={2}
        hint="In Av = λv, which symbol represents the eigenvalue?"
        explanation="In the equation Av = λv, λ is the eigenvalue. Here λ = 5."
      />

      <InteractiveQuestion
        id="eigen-q2"
        question="A 2×2 matrix has eigenvalues 0 and 4. What is its determinant?"
        options={[
          { text: "4", feedback: "Remember: det = product of eigenvalues, not the larger one." },
          { text: "0", feedback: "Correct! The determinant equals the product of all eigenvalues: 0 × 4 = 0. This means the matrix is singular." },
          { text: "2", feedback: "The determinant is the product of eigenvalues, not their average." },
          { text: "−4", feedback: "The product of 0 and 4 is 0, not −4." },
        ]}
        correctIndex={1}
        hint="The determinant of a matrix equals the product of its eigenvalues."
        explanation="det(A) = λ₁ · λ₂ = 0 · 4 = 0. The matrix is singular because one eigenvalue is zero."
      />
    </div>
  );
}
