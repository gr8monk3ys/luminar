"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function SvdIntuition() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Every Matrix Is a Rotation, a Stretch, and Another Rotation</h2>
      <p>
        The <strong>Singular Value Decomposition</strong> (SVD) is one of the
        most important factorizations in all of linear algebra. It reveals that
        <em> any</em> matrix &mdash; even a rectangular one &mdash; can be
        decomposed into three intuitive geometric operations:
      </p>
      <MathBlock latex="A = U \Sigma V^T" display />
      <ul>
        <li><strong>V&#7511;</strong> rotates (or reflects) the input space.</li>
        <li>
          <strong>&#931;</strong> stretches along the coordinate axes by the
          <em> singular values</em> &#963;&#8321;, &#963;&#8322;, ...
        </li>
        <li><strong>U</strong> rotates (or reflects) the output space.</li>
      </ul>
      <p>
        Every linear transformation is, at its core, a rotation-stretch-rotation
        sandwich. The SVD makes this explicit.
      </p>

      <h2>What Are Singular Values?</h2>
      <p>
        The singular values &#963;&#8321; &#8805; &#963;&#8322; &#8805; ... &#8805; 0
        are the diagonal entries of &#931;. They tell you how much the
        transformation stretches along each principal direction. Geometrically,
        if you apply A to the unit sphere, it becomes an ellipsoid whose
        semi-axis lengths are the singular values.
      </p>
      <MathBlock
        latex="\Sigma = \begin{pmatrix}\sigma_1 & 0 & \cdots \\ 0 & \sigma_2 & \cdots \\ \vdots & \vdots & \ddots\end{pmatrix}"
        display
      />

      <h2>SVD vs. Eigendecomposition</h2>
      <p>
        The eigendecomposition A = PDP&#8315;&#185; requires A to be square and
        (usually) have a full set of independent eigenvectors. The SVD has no
        such restrictions:
      </p>
      <ul>
        <li>Works for <em>any</em> matrix, including rectangular ones.</li>
        <li>U and V are always orthogonal (U&#7511;U = I, V&#7511;V = I).</li>
        <li>Singular values are always real and non-negative.</li>
      </ul>
      <p>
        For a symmetric positive definite matrix, the SVD and eigendecomposition
        coincide: the singular values equal the eigenvalues, and U = V.
      </p>

      <StepByStep
        title="SVD of a 2×2 matrix — conceptual walkthrough"
        steps={[
          {
            title: "Start with A",
            content: "Take any 2×2 matrix A. It maps the unit circle to an ellipse.",
            latex: "A = \\begin{pmatrix}3 & 1\\\\1 & 3\\end{pmatrix}",
          },
          {
            title: "Find AᵀA and its eigenvalues",
            content:
              "The eigenvalues of AᵀA are the squares of the singular values. AᵀA = [[10, 6], [6, 10]] has eigenvalues 16 and 4.",
            latex: "\\sigma_1 = \\sqrt{16} = 4, \\quad \\sigma_2 = \\sqrt{4} = 2",
          },
          {
            title: "Interpret geometrically",
            content:
              "The unit circle gets stretched by factor 4 along one direction and by factor 2 along the perpendicular direction. The result is an ellipse with semi-axes 4 and 2.",
          },
          {
            title: "Build the decomposition",
            content:
              "V contains the input directions (eigenvectors of AᵀA), Σ contains the stretching factors, and U contains the output directions (eigenvectors of AAᵀ).",
            latex: "A = U\\begin{pmatrix}4 & 0\\\\0 & 2\\end{pmatrix}V^T",
          },
        ]}
      />

      <h2>Explore: Singular Values and Stretching</h2>
      <SliderExploration
        title="How Singular Values Shape the Ellipse"
        description="The parameter σ represents a singular value — the amount of stretching along one principal axis. Larger σ means more elongation in that direction."
        parameters={[
          { name: "sigma", label: "Singular value σ", min: 0.1, max: 5, step: 0.1, default: 2 },
        ]}
        equation="sigma * sin(x)"
        xRange={[0, 6.3]}
        yRange={[-5, 5]}
      />

      <h2>Applications: Data Compression</h2>
      <p>
        The SVD is the engine behind many practical applications. In
        <strong> image compression</strong>, an image is stored as a matrix of
        pixel values. The SVD factors it into U&#931;V&#7511;. By keeping only
        the largest k singular values (and the corresponding columns of U and V),
        we get a <strong>rank-k approximation</strong> that captures the most
        important structure:
      </p>
      <MathBlock
        latex="A \approx \sum_{i=1}^{k} \sigma_i \vec{u}_i \vec{v}_i^T"
        display
      />
      <p>
        This is optimal in the sense of minimizing the Frobenius norm of the
        error (the Eckart-Young theorem). Other applications include:
      </p>
      <ul>
        <li><strong>Noise reduction:</strong> Small singular values often correspond to noise.</li>
        <li><strong>Recommendation systems:</strong> Latent factor models via truncated SVD.</li>
        <li><strong>Natural language processing:</strong> Latent semantic analysis uses SVD to find hidden topic structure.</li>
        <li><strong>Pseudoinverse:</strong> The Moore-Penrose pseudoinverse is built from the SVD.</li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="svd-q1"
        question="In A = UΣVᵀ, what are the singular values?"
        options={[
          { text: "The diagonal entries of U", feedback: "U is an orthogonal matrix, not a diagonal one. Its diagonal entries are not the singular values." },
          { text: "The eigenvalues of A", feedback: "Singular values are related to eigenvalues of AᵀA, not of A itself. They are always non-negative." },
          { text: "The diagonal entries of Σ", feedback: "Correct! The singular values σ₁ ≥ σ₂ ≥ ... ≥ 0 sit on the diagonal of Σ and represent the stretching factors along principal directions." },
          { text: "The columns of V", feedback: "The columns of V are the right singular vectors, not the singular values." },
        ]}
        correctIndex={2}
        hint="Which matrix in the decomposition is diagonal?"
        explanation="Σ is the diagonal matrix in the SVD. Its diagonal entries are the singular values, which measure the stretching along each principal direction."
      />

      <InteractiveQuestion
        id="svd-q2"
        question="Why is the SVD more general than the eigendecomposition?"
        options={[
          { text: "SVD only works for symmetric matrices", feedback: "Actually, SVD works for ANY matrix. It is the eigendecomposition that has restrictions." },
          { text: "SVD works for any matrix, including rectangular ones", feedback: "Correct! The eigendecomposition requires a square matrix with enough independent eigenvectors. The SVD works for any m×n matrix." },
          { text: "SVD produces complex numbers while eigendecomposition does not", feedback: "It is the opposite: eigenvalues can be complex, but singular values are always real and non-negative." },
          { text: "SVD is faster to compute", feedback: "Computational cost is not the key difference. The generality is about which matrices it applies to." },
        ]}
        correctIndex={1}
        hint="Think about what types of matrices each decomposition requires."
        explanation="The SVD exists for every matrix (any size, any rank). The eigendecomposition requires a square matrix and may not exist if the matrix is defective."
      />

      <h3>Challenge</h3>
      <p>
        A matrix A has singular values 5, 3, and 0.01. If you want to compress
        the data by keeping only 2 singular values, what fraction of the total
        &ldquo;energy&rdquo; (sum of squared singular values) is retained?
      </p>
      <RevealAnswer label="Show answer">
        <p>
          Total energy = 5&#178; + 3&#178; + 0.01&#178; = 25 + 9 + 0.0001 = 34.0001.
          Keeping the top 2: 25 + 9 = 34. Fraction retained: 34 / 34.0001
          &#8776; 99.9997%. The tiny singular value 0.01 contributes almost
          nothing &mdash; discarding it loses virtually no information.
        </p>
      </RevealAnswer>
    </div>
  );
}
