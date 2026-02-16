"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function MatrixMultiplication() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Composing Transformations</h2>
      <p>
        In the previous lesson we saw that a matrix represents a linear
        transformation. What if we want to apply two transformations in
        sequence &mdash; first rotate, then shear? The combined effect is
        another linear transformation, and its matrix is the <strong>product</strong>{" "}
        of the two matrices. Matrix multiplication is really
        <em> function composition</em> in disguise.
      </p>
      <p>
        If <em>A</em> is an <em>m × n</em> matrix and <em>B</em> is an
        <em> n × p</em> matrix, their product <em>AB</em> is an
        <em> m × p</em> matrix. The inner dimensions must match: the number of
        columns of <em>A</em> must equal the number of rows of <em>B</em>.
      </p>

      <h2>The Row-Column Rule</h2>
      <p>
        The entry in row <em>i</em>, column <em>j</em> of the product is the
        dot product of the <em>i</em>-th row of <em>A</em> with the
        <em> j</em>-th column of <em>B</em>:
      </p>
      <MathBlock
        latex="(AB)_{ij} = \sum_{k=1}^{n} A_{ik}\,B_{kj}"
        display
      />
      <p>
        This formula is mechanical but easy to mess up. A good strategy: for
        each entry, put your left index finger on the correct row of <em>A</em>{" "}
        and your right index finger on the correct column of <em>B</em>, then
        multiply and sum across.
      </p>

      <h2>Worked Example</h2>
      <StepByStep
        title="Multiply two 2×2 matrices"
        steps={[
          {
            title: "Write the matrices",
            content: "We will compute AB.",
            latex:
              "A = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}, \\quad B = \\begin{pmatrix}5 & 6\\\\7 & 8\\end{pmatrix}",
          },
          {
            title: "Compute entry (1,1)",
            content: "Row 1 of A · Column 1 of B.",
            latex: "1 \\cdot 5 + 2 \\cdot 7 = 5 + 14 = 19",
          },
          {
            title: "Compute entry (1,2)",
            content: "Row 1 of A · Column 2 of B.",
            latex: "1 \\cdot 6 + 2 \\cdot 8 = 6 + 16 = 22",
          },
          {
            title: "Compute entry (2,1)",
            content: "Row 2 of A · Column 1 of B.",
            latex: "3 \\cdot 5 + 4 \\cdot 7 = 15 + 28 = 43",
          },
          {
            title: "Compute entry (2,2)",
            content: "Row 2 of A · Column 2 of B.",
            latex: "3 \\cdot 6 + 4 \\cdot 8 = 18 + 32 = 50",
          },
          {
            title: "Assemble the result",
            content: "Put the entries into the product matrix.",
            latex: "AB = \\begin{pmatrix}19 & 22\\\\43 & 50\\end{pmatrix}",
          },
        ]}
      />

      <h2>Key Properties</h2>
      <p>
        Matrix multiplication has some familiar properties and some surprising
        ones:
      </p>
      <ul>
        <li><strong>Associative:</strong> <em>(AB)C = A(BC)</em></li>
        <li><strong>Distributive:</strong> <em>A(B + C) = AB + AC</em></li>
        <li>
          <strong>NOT commutative:</strong> In general, <em>AB ≠ BA</em>.
          Order matters! Rotating then shearing is different from shearing then
          rotating.
        </li>
      </ul>
      <p>
        The non-commutativity of matrix multiplication is one of the most common
        pitfalls for beginners. Always pay attention to the order.
      </p>

      <h2>The Identity Matrix</h2>
      <MathBlock
        latex="I = \begin{pmatrix}1 & 0\\0 & 1\end{pmatrix} \qquad AI = IA = A"
        display
      />
      <p>
        The identity matrix is the &ldquo;do nothing&rdquo; transformation. It
        sends every vector to itself. Multiplying any matrix by the identity
        gives back the original matrix.
      </p>

      <h2>Code It: Matrix Multiplication</h2>
      <p>
        Implement matrix multiplication in Python. The function should work for
        any compatible matrix sizes, not just 2×2.
      </p>
      <CodeEditor
        language="python"
        initialCode={`def matrix_multiply(A, B):
    """Multiply matrix A (m x n) by matrix B (n x p).
    A and B are lists of lists. Return the product as a list of lists."""
    m = len(A)
    n = len(A[0])
    p = len(B[0])
    # Initialize result with zeros
    result = [[0] * p for _ in range(m)]
    # TODO: Fill in the multiplication logic
    for i in range(m):
        for j in range(p):
            pass  # compute result[i][j]
    return result

# Test
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
print(matrix_multiply(A, B))  # Expected: [[19, 22], [43, 50]]`}
        solution={`def matrix_multiply(A, B):
    """Multiply matrix A (m x n) by matrix B (n x p).
    A and B are lists of lists. Return the product as a list of lists."""
    m = len(A)
    n = len(A[0])
    p = len(B[0])
    result = [[0] * p for _ in range(m)]
    for i in range(m):
        for j in range(p):
            for k in range(n):
                result[i][j] += A[i][k] * B[k][j]
    return result

# Test
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
print(matrix_multiply(A, B))  # Expected: [[19, 22], [43, 50]]`}
        description="Implement the triple nested loop for matrix multiplication. The innermost loop computes the dot product of a row of A with a column of B."
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="matmul-q1"
        question="Can you multiply a 3×2 matrix by a 2×4 matrix?"
        options={[
          { text: "No — the matrices must be the same size", feedback: "Matrices do not need to be the same size, only the inner dimensions must match." },
          { text: "Yes — the result is a 3×4 matrix", feedback: "Correct! The inner dimensions (2 and 2) match, so the product is defined. It has 3 rows and 4 columns." },
          { text: "Yes — the result is a 2×2 matrix", feedback: "The result dimensions come from the outer dimensions: 3 rows and 4 columns." },
          { text: "Only if both matrices are square", feedback: "Matrix multiplication works for non-square matrices too, as long as inner dimensions match." },
        ]}
        correctIndex={1}
        hint="An (m×n) times (n×p) product yields an (m×p) matrix."
        explanation="3×2 multiplied by 2×4: the inner dimensions (2) match, and the result is 3×4."
      />

      <InteractiveQuestion
        id="matmul-q2"
        question="Is matrix multiplication commutative (does AB always equal BA)?"
        options={[
          { text: "Yes, always", feedback: "Try A = [[1,2],[0,0]] and B = [[0,0],[3,4]]. AB ≠ BA." },
          { text: "No, never", feedback: "It can sometimes be equal (e.g., when both are diagonal), but it is not guaranteed." },
          { text: "No, not in general (but it can be for special cases)", feedback: "Correct! Matrix multiplication is generally non-commutative, though there are special cases like diagonal or identity matrices where AB = BA." },
          { text: "Only for 2×2 matrices", feedback: "Non-commutativity applies to all sizes, including 2×2." },
        ]}
        correctIndex={2}
        hint="Think about geometric transformations: rotate then shear vs. shear then rotate."
        explanation="AB ≠ BA in general. The order of matrix multiplication matters because it represents the order of applying transformations."
      />

      <h3>Practice</h3>
      <p>Compute the product:</p>
      <MathBlock
        latex="\\begin{pmatrix}2 & 0\\\\1 & 3\\end{pmatrix}\\begin{pmatrix}1 & 4\\\\5 & 2\\end{pmatrix}"
        display
      />
      <RevealAnswer label="Show solution">
        <MathBlock
          latex="\\begin{pmatrix}2\\cdot1+0\\cdot5 & 2\\cdot4+0\\cdot2\\\\1\\cdot1+3\\cdot5 & 1\\cdot4+3\\cdot2\\end{pmatrix} = \\begin{pmatrix}2 & 8\\\\16 & 10\\end{pmatrix}"
          display
        />
      </RevealAnswer>
    </div>
  );
}
