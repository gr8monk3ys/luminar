"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function PCAConnection() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>From Eigenvectors to Data Science</h2>
      <p>
        <strong>Principal Component Analysis (PCA)</strong> is one of the most
        widely used techniques in data science. It reduces the dimensionality
        of a dataset while preserving as much variance (information) as
        possible. And it is built directly on the eigenvector concepts from the
        last lesson.
      </p>
      <p>
        Imagine you have a cloud of data points in 100 dimensions. Visualizing
        100 dimensions is impossible, but most of the &ldquo;interesting
        variation&rdquo; might lie along just 2 or 3 directions. PCA finds
        those directions &mdash; the <strong>principal components</strong>{" "}
        &mdash; by computing eigenvectors of the data&apos;s covariance matrix.
      </p>

      <h2>The Covariance Matrix</h2>
      <p>
        Given a dataset with <em>n</em> features, the <strong>covariance
        matrix</strong> is an <em>n x n</em> symmetric matrix where entry
        (i, j) measures how features <em>i</em> and <em>j</em> vary together:
      </p>
      <MathBlock
        latex="C = \frac{1}{m-1}(X - \bar{X})^T(X - \bar{X})"
        display
      />
      <p>
        Here <em>X</em> is the data matrix (rows = samples, columns =
        features) and the bar denotes column means. The diagonal entries are
        variances; off-diagonal entries are covariances. Because <em>C</em> is
        symmetric, its eigenvalues are all real and its eigenvectors are
        orthogonal &mdash; perfect axes for a new coordinate system.
      </p>

      <h2>The PCA Algorithm</h2>
      <StepByStep
        title="Steps of PCA"
        steps={[
          {
            title: "Center the data",
            content:
              "Subtract the mean of each feature so the data is centered at the origin. This ensures PCA finds directions of maximum variance rather than being biased by the mean.",
            latex: "X_c = X - \\bar{X}",
          },
          {
            title: "Compute the covariance matrix",
            content:
              "Calculate C = (1/(m-1)) X^T X, where X is now the centered data matrix.",
            latex: "C = \\frac{1}{m-1}X_c^TX_c",
          },
          {
            title: "Find eigenvalues and eigenvectors of C",
            content:
              "Solve det(C - lambda I) = 0. The eigenvectors are the principal components (directions); the eigenvalues indicate how much variance each direction captures.",
          },
          {
            title: "Sort by eigenvalue (descending)",
            content:
              "The eigenvector with the largest eigenvalue is the first principal component — the direction of greatest variance. The second largest eigenvalue gives the second principal component, and so on.",
          },
          {
            title: "Project onto top k components",
            content:
              "To reduce from n dimensions to k, multiply the centered data by the matrix of the top k eigenvectors.",
            latex: "X_{\\text{reduced}} = X_c \\cdot V_k",
          },
        ]}
      />

      <h2>Visualizing the Idea</h2>
      <p>
        Below, imagine a scatter plot of 2D data that forms an elongated
        ellipse. The first principal component points along the long axis of
        the ellipse (maximum variance), and the second points along the short
        axis. By keeping only the first component, you project the cloud onto
        a line while retaining the most spread.
      </p>
      <GraphPlayground
        equation="0.5*x"
        xRange={[-5, 5]}
        yRange={[-5, 5]}
        interactive
        showGrid
        color="#10b981"
      />

      <h2>How Much Variance Is Retained?</h2>
      <p>
        The <strong>explained variance ratio</strong> of the <em>i</em>-th
        component is its eigenvalue divided by the sum of all eigenvalues:
      </p>
      <MathBlock
        latex="\text{Explained variance ratio}_i = \frac{\lambda_i}{\sum_{j=1}^n \lambda_j}"
        display
      />
      <p>
        If the first two eigenvalues account for 95% of the total, then
        projecting onto those two components preserves 95% of the data&apos;s
        variance. This is how PCA achieves dimensionality reduction without
        discarding much information.
      </p>

      <InteractiveQuestion
        id="pca-variance-q"
        question="If eigenvalues are [10, 3, 0.5, 0.1], what fraction of variance does PC1 capture?"
        options={[
          { text: "About 73.5% (10/13.6)", feedback: "Correct! Total variance = 10+3+0.5+0.1 = 13.6. PC1 captures 10/13.6 ≈ 73.5%." },
          { text: "25% (one of four)", feedback: "Components capture unequal variance — that is the whole point of PCA." },
          { text: "10%", feedback: "The eigenvalue 10 is not a percentage — divide by the total sum." },
          { text: "100%", feedback: "Only if all other eigenvalues were zero. Here the other components carry some variance too." },
        ]}
        correctIndex={0}
        hint="Divide the eigenvalue by the sum of all eigenvalues."
        explanation="Variance explained = eigenvalue / sum of all eigenvalues = 10/13.6 ≈ 73.5%."
      />

      <h2>Code It: PCA from Scratch</h2>
      <p>
        Implement PCA using NumPy. Center the data, compute the covariance
        matrix, find eigenvectors, and project.
      </p>
      <CodeEditor
        language="python"
        initialCode={`import numpy as np

def pca(X, n_components):
    """Perform PCA on data matrix X (rows=samples, cols=features).
    Return the projected data and the explained variance ratios."""
    # Step 1: Center the data
    mean = np.mean(X, axis=0)
    X_centered = X - mean

    # Step 2: Covariance matrix
    cov_matrix = np.cov(X_centered, rowvar=False)

    # Step 3: Eigendecomposition
    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

    # Step 4: Sort by eigenvalue (descending)
    # TODO: sort indices, reorder eigenvalues and eigenvectors

    # Step 5: Project onto top n_components
    # TODO: select top eigenvectors and project

    # Return projected data and explained variance ratios
    pass

# Test with random 5D data
np.random.seed(42)
X = np.random.randn(100, 5)
projected, ratios = pca(X, 2)
print(f"Projected shape: {projected.shape}")
print(f"Explained variance ratios: {ratios}")`}
        solution={`import numpy as np

def pca(X, n_components):
    """Perform PCA on data matrix X (rows=samples, cols=features).
    Return the projected data and the explained variance ratios."""
    # Step 1: Center the data
    mean = np.mean(X, axis=0)
    X_centered = X - mean

    # Step 2: Covariance matrix
    cov_matrix = np.cov(X_centered, rowvar=False)

    # Step 3: Eigendecomposition
    eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

    # Step 4: Sort by eigenvalue (descending)
    sorted_idx = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[sorted_idx]
    eigenvectors = eigenvectors[:, sorted_idx]

    # Step 5: Project onto top n_components
    top_vectors = eigenvectors[:, :n_components]
    projected = X_centered @ top_vectors

    # Explained variance ratios
    ratios = eigenvalues[:n_components] / np.sum(eigenvalues)

    return projected, ratios

# Test with random 5D data
np.random.seed(42)
X = np.random.randn(100, 5)
projected, ratios = pca(X, 2)
print(f"Projected shape: {projected.shape}")
print(f"Explained variance ratios: {ratios}")`}
        description="Complete the sorting and projection steps. Use np.argsort to get descending order, then slice the top eigenvectors and project X_centered onto them."
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="pca-q1"
        question="What does the first principal component represent?"
        options={[
          { text: "The feature with the highest variance", feedback: "PCA finds directions in feature space, not individual features. A principal component is usually a combination of features." },
          { text: "The direction of maximum variance in the data", feedback: "Correct! The first PC is the eigenvector of the covariance matrix with the largest eigenvalue — the direction along which the data varies the most." },
          { text: "The mean of the data", feedback: "The mean is subtracted before PCA. The first PC is a direction, not a location." },
          { text: "The smallest eigenvalue", feedback: "The first PC corresponds to the largest eigenvalue, not the smallest." },
        ]}
        correctIndex={1}
        hint="PCA seeks directions that capture the most spread in the data."
        explanation="The first principal component is the direction (eigenvector) along which the data has the greatest variance (largest eigenvalue)."
      />

      <InteractiveQuestion
        id="pca-q2"
        question="Why do we center the data (subtract the mean) before PCA?"
        options={[
          { text: "To make computation faster", feedback: "Centering does not significantly affect speed." },
          { text: "To ensure the covariance matrix captures variance around the mean, not around the origin", feedback: "Correct! Without centering, the covariance matrix would be influenced by the location of the data cloud, not its shape." },
          { text: "To make all eigenvalues positive", feedback: "Eigenvalues of a covariance matrix are non-negative regardless of centering." },
          { text: "It is not actually necessary", feedback: "It is necessary. Without centering, PCA may find directions biased by the data's offset from the origin." },
        ]}
        correctIndex={1}
        hint="What does the covariance matrix measure? What happens if the data is far from the origin?"
        explanation="Centering ensures that the covariance matrix reflects the spread of data around its mean. Without it, the principal components would be influenced by where the data sits rather than how it varies."
      />
    </div>
  );
}
