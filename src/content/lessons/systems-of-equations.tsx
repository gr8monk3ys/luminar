"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function SystemsOfEquations() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Solving Ax = b</h2>
      <p>
        One of the most fundamental problems in linear algebra is solving a
        system of linear equations. Given a coefficient matrix A, an unknown
        vector x, and a right-hand side vector b, we want to find x such that:
      </p>
      <MathBlock latex="A\vec{x} = \vec{b}" display />
      <p>
        The systematic approach is <strong>Gaussian elimination</strong>: use
        elementary row operations to transform the augmented matrix [A | b] into
        a simpler form where the solution can be read off directly.
      </p>

      <h2>Elementary Row Operations</h2>
      <p>
        Three operations are allowed (each is reversible, so they do not change
        the solution set):
      </p>
      <ol>
        <li><strong>Swap</strong> two rows.</li>
        <li><strong>Scale</strong> a row by a nonzero constant.</li>
        <li><strong>Add</strong> a multiple of one row to another.</li>
      </ol>
      <p>
        The goal is to produce <strong>row echelon form</strong>: an upper
        triangular structure where each leading entry (pivot) is to the right of
        the one above it, and all entries below each pivot are zero.
      </p>

      <h2>Worked Example: Gaussian Elimination</h2>
      <StepByStep
        title="Solve the system: x + 2y + z = 9, 2x - y + 3z = 8, 3x + y - z = 3"
        steps={[
          {
            title: "Write the augmented matrix",
            content: "Encode the system as [A | b].",
            latex:
              "\\left(\\begin{array}{ccc|c}1 & 2 & 1 & 9\\\\2 & -1 & 3 & 8\\\\3 & 1 & -1 & 3\\end{array}\\right)",
          },
          {
            title: "Eliminate below the first pivot",
            content: "R₂ ← R₂ - 2R₁ and R₃ ← R₃ - 3R₁.",
            latex:
              "\\left(\\begin{array}{ccc|c}1 & 2 & 1 & 9\\\\0 & -5 & 1 & -10\\\\0 & -5 & -4 & -24\\end{array}\\right)",
          },
          {
            title: "Eliminate below the second pivot",
            content: "R₃ ← R₃ - R₂.",
            latex:
              "\\left(\\begin{array}{ccc|c}1 & 2 & 1 & 9\\\\0 & -5 & 1 & -10\\\\0 & 0 & -5 & -14\\end{array}\\right)",
          },
          {
            title: "Back substitution",
            content:
              "From row 3: -5z = -14, so z = 14/5. From row 2: -5y + z = -10, so y = (10 + 14/5)/5 = 64/25. From row 1: x + 2y + z = 9, solve for x.",
            latex:
              "z = \\frac{14}{5}, \\quad y = \\frac{64}{25}, \\quad x = 9 - 2\\cdot\\frac{64}{25} - \\frac{14}{5} = \\frac{27}{25}",
          },
        ]}
      />

      <h2>Row Echelon Form vs. Reduced Row Echelon Form</h2>
      <p>
        <strong>Row echelon form (REF)</strong> has zeros below each pivot. You
        then use back substitution to find the solution. <strong>Reduced row
        echelon form (RREF)</strong> goes further: each pivot is 1 and all
        entries above and below each pivot are zero. RREF lets you read the
        solution directly without back substitution.
      </p>
      <MathBlock
        latex="\text{RREF: } \left(\begin{array}{ccc|c}1 & 0 & 0 & x\\\\0 & 1 & 0 & y\\\\0 & 0 & 1 & z\\end{array}\right)"
        display
      />

      <h2>What Can Go Wrong?</h2>
      <ul>
        <li>
          <strong>No solution:</strong> A row of the form [0 0 0 | b] with b &#8800; 0
          indicates the system is inconsistent. The equations contradict each other.
        </li>
        <li>
          <strong>Infinitely many solutions:</strong> Fewer pivots than unknowns
          means free variables exist. The solution is a line, plane, or
          higher-dimensional subspace.
        </li>
        <li>
          <strong>Unique solution:</strong> Every column has a pivot. This
          happens when det(A) &#8800; 0.
        </li>
      </ul>

      <h2>Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement forward elimination to convert a matrix to row echelon form."
        initialCode={`def gaussian_elimination(matrix):
    """Convert augmented matrix to row echelon form."""
    m = [row[:] for row in matrix]  # copy
    rows, cols = len(m), len(m[0])

    pivot_row = 0
    for col in range(cols - 1):  # skip augmented column
        # Find pivot (first nonzero in this column)
        found = False
        for row in range(pivot_row, rows):
            if m[row][col] != 0:
                # TODO: Swap this row with pivot_row
                # TODO: Eliminate all rows below
                found = True
                break
        if found:
            pivot_row += 1

    return m

# Test: augmented matrix for x+2y=5, 3x+4y=6
matrix = [[1, 2, 5],
          [3, 4, 6]]
print(gaussian_elimination(matrix))
# Expected: [[1, 2, 5], [0, -2, -9]]`}
        solution={`def gaussian_elimination(matrix):
    """Convert augmented matrix to row echelon form."""
    m = [row[:] for row in matrix]  # copy
    rows, cols = len(m), len(m[0])

    pivot_row = 0
    for col in range(cols - 1):
        found = False
        for row in range(pivot_row, rows):
            if m[row][col] != 0:
                m[pivot_row], m[row] = m[row], m[pivot_row]
                for r in range(pivot_row + 1, rows):
                    factor = m[r][col] / m[pivot_row][col]
                    for c in range(cols):
                        m[r][c] -= factor * m[pivot_row][c]
                found = True
                break
        if found:
            pivot_row += 1

    return m

matrix = [[1, 2, 5],
          [3, 4, 6]]
print(gaussian_elimination(matrix))
# Output: [[1, 2, 5], [0.0, -2.0, -9.0]]`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="sys-q1"
        question="During Gaussian elimination, what does a row [0, 0, 0 | 5] in the augmented matrix indicate?"
        options={[
          { text: "The system has a unique solution", feedback: "A row of all zeros on the left with a nonzero right side is a contradiction: 0 = 5 is impossible." },
          { text: "The system has no solution (inconsistent)", feedback: "Correct! The row says 0x + 0y + 0z = 5, which is impossible. The original equations contradict each other." },
          { text: "There are infinitely many solutions", feedback: "Infinitely many solutions arise from free variables, not from contradictions." },
          { text: "You made an arithmetic error", feedback: "This is a valid outcome. Inconsistent systems genuinely produce such rows." },
        ]}
        correctIndex={1}
        hint="What equation does the row [0 0 0 | 5] represent?"
        explanation="The row represents 0 = 5, which is impossible. This means the system is inconsistent — no solution exists."
      />

      <InteractiveQuestion
        id="sys-q2"
        question="A 3×3 system in row echelon form has pivots in columns 1 and 2 only. How many solutions exist?"
        options={[
          { text: "Exactly one", feedback: "One solution requires a pivot in every column (3 pivots for 3 unknowns)." },
          { text: "None", feedback: "No solution requires an inconsistent row. Having fewer pivots just means free variables." },
          { text: "Infinitely many — one free variable", feedback: "Correct! With only 2 pivots for 3 unknowns, column 3 has no pivot, making the third variable free. The solution set is a line in 3D space." },
          { text: "Exactly two", feedback: "Linear systems never have exactly two solutions. The answer is 0, 1, or infinitely many." },
        ]}
        correctIndex={2}
        hint="How many unknowns minus how many pivots equals how many free variables?"
        explanation="3 unknowns - 2 pivots = 1 free variable. Each free variable introduces a parameter, yielding infinitely many solutions forming a line."
      />

      <h3>Challenge</h3>
      <p>
        Why can a system of linear equations never have exactly two solutions?
      </p>
      <RevealAnswer label="Show explanation">
        <p>
          If x&#8321; and x&#8322; are both solutions of Ax = b, then any affine
          combination t&middot;x&#8321; + (1 - t)&middot;x&#8322; is also a
          solution (verify by substituting). This means the entire line between
          x&#8321; and x&#8322; consists of solutions, giving infinitely many.
          Thus a linear system has either 0, 1, or infinitely many solutions.
        </p>
      </RevealAnswer>
    </div>
  );
}
