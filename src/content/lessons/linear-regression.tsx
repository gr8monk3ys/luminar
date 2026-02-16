"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function LinearRegression() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Simplest Predictive Model</h2>
      <p>
        Linear regression is where machine learning begins. The idea is
        beautifully simple: given input data, find the straight line (or
        hyperplane, in higher dimensions) that best predicts the output. It is
        the &ldquo;hello world&rdquo; of ML, yet it underlies an enormous range
        of practical applications &mdash; from predicting house prices to
        estimating the effect of a drug dosage.
      </p>
      <p>
        Suppose you have data on house sizes (in square feet) and their sale
        prices. Plotting them reveals a roughly linear trend: bigger houses
        cost more. Linear regression finds the line that best captures this
        relationship.
      </p>

      <h2>The Hypothesis Function</h2>
      <p>
        For a single feature <em>x</em>, the linear regression model predicts:
      </p>
      <MathBlock latex="h(x) = wx + b" display />
      <p>
        Here <em>w</em> is the <strong>weight</strong> (slope) and <em>b</em>{" "}
        is the <strong>bias</strong> (y-intercept). The model has two learnable
        parameters. For <em>d</em> features, this generalizes to:
      </p>
      <MathBlock
        latex="h(\mathbf{x}) = w_1 x_1 + w_2 x_2 + \cdots + w_d x_d + b = \mathbf{w}^\top \mathbf{x} + b"
        display
      />
      <p>
        Notice this is a <strong>dot product</strong> &mdash; exactly the
        operation you studied in linear algebra. The prediction is a linear
        combination of the input features, weighted by the model parameters.
        The entire machinery of vector spaces applies here: the set of all
        possible predictions forms a subspace of the output space.
      </p>

      <h2>Visualize the Line</h2>
      <p>
        The graph below shows a line <em>y = mx + b</em>. This is the
        geometric object that linear regression produces: a straight line in
        2D (or a hyperplane in higher dimensions) that best approximates the
        data.
      </p>
      <GraphPlayground
        equation="1.5 * x + 2"
        xRange={[-5, 10]}
        yRange={[-5, 20]}
        interactive
        showGrid
        color="#3b82f6"
      />

      <h2>The Cost Function: Mean Squared Error</h2>
      <p>
        How do we measure whether a line is a &ldquo;good fit&rdquo;? We need a
        <strong> cost function</strong> (also called loss function) that
        quantifies the discrepancy between predictions and actual values. The
        most common choice is the <strong>Mean Squared Error</strong> (MSE):
      </p>
      <MathBlock
        latex="J(w, b) = \frac{1}{n} \sum_{i=1}^{n} \big(h(x_i) - y_i\big)^2 = \frac{1}{n} \sum_{i=1}^{n} (wx_i + b - y_i)^2"
        display
      />
      <p>
        Why squared error? Several reasons:
      </p>
      <ul>
        <li>
          Squaring ensures positive and negative errors do not cancel out.
        </li>
        <li>
          Squaring penalizes large errors disproportionately &mdash; an error
          of 10 contributes 100 to the cost, while an error of 1 contributes
          only 1. This makes the model sensitive to outliers.
        </li>
        <li>
          The resulting optimization problem is <strong>convex</strong>{" "}
          &mdash; there is a single global minimum, no local minima to get
          trapped in. This connects to the quadratic forms you studied in
          linear algebra.
        </li>
        <li>
          It is differentiable everywhere, enabling gradient-based optimization
          (which we will explore in the next lesson).
        </li>
      </ul>

      <h2>Geometric Interpretation</h2>
      <p>
        Each data point (<em>x<sub>i</sub></em>, <em>y<sub>i</sub></em>) is a
        dot in the plane. The regression line passes through this cloud of
        points. The <strong>residual</strong> for each point is the vertical
        distance from the point to the line: <em>r<sub>i</sub></em> ={" "}
        <em>y<sub>i</sub></em> &minus; <em>h</em>(<em>x<sub>i</sub></em>).
      </p>
      <MathBlock
        latex="r_i = y_i - (wx_i + b)"
        display
      />
      <p>
        MSE is the average of the squared residuals. The best-fit line
        minimizes the total area of the squares drawn from each point to the
        line. This is why the method is called <strong>least squares</strong>.
      </p>

      <h2>Explore: Adjust Slope and Intercept</h2>
      <p>
        Use the sliders below to manually adjust the slope <em>w</em> and
        intercept <em>b</em> of a line. Try to minimize the error visually by
        making the line pass as close to the data trend as possible. This is
        exactly what the learning algorithm does automatically.
      </p>
      <SliderExploration
        title="Fit the Line Manually"
        description="Adjust w (slope) and b (intercept) to minimize the gap between the line y = wx + b and the data points. Try w ≈ 1.5 and b ≈ 2."
        parameters={[
          { name: "w", label: "w (slope)", min: -3, max: 5, step: 0.1, default: 0 },
          { name: "b", label: "b (intercept)", min: -5, max: 10, step: 0.1, default: 0 },
        ]}
        equation="w * x + b"
        xRange={[-2, 8]}
        yRange={[-5, 20]}
      />

      <h2>The Normal Equation: Closed-Form Solution</h2>
      <p>
        For linear regression, we do not actually need iterative optimization.
        By setting the gradient of <em>J</em> to zero and solving the resulting
        system of linear equations (using techniques from linear algebra), we
        obtain a direct formula for the optimal parameters:
      </p>
      <MathBlock
        latex="\hat{\mathbf{w}} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{y}"
        display
      />
      <p>
        This is the <strong>normal equation</strong>. Here <strong>X</strong> is
        the design matrix (each row is a data point's features), and{" "}
        <strong>y</strong> is the vector of labels. The expression{" "}
        <strong>X</strong><sup>T</sup><strong>X</strong> is a square matrix
        &mdash; its inverse exists as long as the features are linearly
        independent (no perfect multicollinearity). This is where determinants
        and matrix inverses from linear algebra become practically useful.
      </p>
      <p>
        The normal equation involves matrix multiplication (O(d&sup2;n) to
        compute <strong>X</strong><sup>T</sup><strong>X</strong>) and matrix
        inversion (O(d&sup3;)). For small <em>d</em>, this is fast. For large
        <em> d</em> (thousands of features), gradient descent is preferred.
      </p>

      <h2>Worked Example: Fit a Line to 4 Points</h2>
      <StepByStep
        title="Find the best-fit line for (1, 2), (2, 4), (3, 5), (4, 4)"
        steps={[
          {
            title: "Set up the design matrix and label vector",
            content:
              "Add a column of 1s for the bias term. Each row of X is [x_i, 1] and y is the vector of outputs.",
            latex:
              "\\mathbf{X} = \\begin{pmatrix} 1 & 1 \\\\ 2 & 1 \\\\ 3 & 1 \\\\ 4 & 1 \\end{pmatrix}, \\quad \\mathbf{y} = \\begin{pmatrix} 2 \\\\ 4 \\\\ 5 \\\\ 4 \\end{pmatrix}",
          },
          {
            title: "Compute X^T X",
            content: "Multiply the transpose of X by X.",
            latex:
              "\\mathbf{X}^\\top \\mathbf{X} = \\begin{pmatrix} 1&2&3&4 \\\\ 1&1&1&1 \\end{pmatrix} \\begin{pmatrix} 1&1 \\\\ 2&1 \\\\ 3&1 \\\\ 4&1 \\end{pmatrix} = \\begin{pmatrix} 30 & 10 \\\\ 10 & 4 \\end{pmatrix}",
          },
          {
            title: "Compute X^T y",
            content: "Multiply the transpose of X by the label vector.",
            latex:
              "\\mathbf{X}^\\top \\mathbf{y} = \\begin{pmatrix} 1&2&3&4 \\\\ 1&1&1&1 \\end{pmatrix} \\begin{pmatrix} 2\\\\4\\\\5\\\\4 \\end{pmatrix} = \\begin{pmatrix} 39 \\\\ 15 \\end{pmatrix}",
          },
          {
            title: "Solve the normal equation",
            content:
              "Compute (X^T X)^{-1} X^T y. The inverse of a 2x2 matrix [a,b;c,d] is (1/(ad-bc))[d,-b;-c,a].",
            latex:
              "(\\mathbf{X}^\\top\\mathbf{X})^{-1} = \\frac{1}{30 \\cdot 4 - 10 \\cdot 10}\\begin{pmatrix}4&-10\\\\-10&30\\end{pmatrix} = \\frac{1}{20}\\begin{pmatrix}4&-10\\\\-10&30\\end{pmatrix}",
          },
          {
            title: "Compute the optimal parameters",
            content: "Multiply to get the weight vector [w, b].",
            latex:
              "\\hat{\\mathbf{w}} = \\frac{1}{20}\\begin{pmatrix}4&-10\\\\-10&30\\end{pmatrix}\\begin{pmatrix}39\\\\15\\end{pmatrix} = \\frac{1}{20}\\begin{pmatrix}6\\\\60\\end{pmatrix} = \\begin{pmatrix}0.3\\\\3.0\\end{pmatrix}",
          },
          {
            title: "Write the best-fit line",
            content:
              "The slope is w = 0.3 and the intercept is b = 3.0. Notice how the line captures the general upward trend even though no point lies exactly on it.",
            latex: "h(x) = 0.3x + 3.0",
          },
        ]}
      />

      <h2>Connection to Linear Algebra</h2>
      <p>
        The normal equation is not just a formula to memorize &mdash; it has a
        beautiful geometric interpretation. The prediction{" "}
        <strong>X</strong><strong>w</strong> is a vector in the column space of{" "}
        <strong>X</strong>. The label vector <strong>y</strong> may not lie in
        this column space. The normal equation finds the projection of{" "}
        <strong>y</strong> onto the column space &mdash; the closest point in
        that subspace.
      </p>
      <MathBlock
        latex="\hat{\mathbf{y}} = \mathbf{X}\hat{\mathbf{w}} = \mathbf{X}(\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y} = \text{proj}_{\text{col}(\mathbf{X})}\mathbf{y}"
        display
      />
      <p>
        The residual vector <strong>y</strong> &minus; <strong>X</strong><strong>w</strong>{" "}
        is orthogonal to the column space. This is exactly the orthogonal
        projection you studied in linear algebra. Least squares regression is
        projection.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="linreg-q1"
        question="If a linear regression model has h(x) = 3x + 1, what is the predicted value when x = 4?"
        options={[
          { text: "12", feedback: "You forgot to add the bias. h(4) = 3(4) + 1 = 13." },
          { text: "13", feedback: "Correct! h(4) = 3(4) + 1 = 12 + 1 = 13." },
          { text: "7", feedback: "Check your arithmetic: 3 times 4 is 12, plus 1 is 13." },
          { text: "4", feedback: "You need to substitute x = 4 into the equation: 3(4) + 1." },
        ]}
        correctIndex={1}
        hint="Simply substitute x = 4 into h(x) = 3x + 1."
        explanation="h(4) = 3(4) + 1 = 12 + 1 = 13. The weight 3 tells us that for each unit increase in x, the prediction increases by 3."
      />

      <InteractiveQuestion
        id="linreg-q2"
        question="Why does the MSE cost function use squared errors instead of absolute errors?"
        options={[
          { text: "Squaring is computationally cheaper than absolute value", feedback: "Actually, absolute value is simpler computationally. The reason lies in mathematical properties." },
          { text: "Squared errors are always positive, while absolute errors can be negative", feedback: "Absolute errors |y - h(x)| are also always positive. That is not the distinguishing reason." },
          { text: "The MSE is differentiable everywhere and yields a convex optimization problem", feedback: "Correct! The absolute value function has a kink at 0 (not differentiable), and its optimization is harder. MSE is smooth and convex, giving a unique minimum solvable by calculus." },
          { text: "There is no particular reason; it is just a convention", feedback: "There are strong mathematical reasons: differentiability, convexity, and a closed-form solution via the normal equation." },
        ]}
        correctIndex={2}
        hint="Think about what happens when you try to take the derivative of |x| at x = 0."
        explanation="MSE is smooth (differentiable everywhere) and convex, meaning it has a single global minimum. This allows us to find the optimal solution using calculus (setting the gradient to zero) or gradient descent. The absolute error function is not differentiable at zero and leads to a harder optimization problem."
      />

      <InteractiveQuestion
        id="linreg-q3"
        question="In the normal equation, what does (X^T X)^{-1} X^T y compute geometrically?"
        options={[
          { text: "The determinant of the data matrix", feedback: "The determinant is a scalar, not a vector. The normal equation gives us the optimal parameter vector." },
          { text: "The projection of y onto the column space of X", feedback: "Close, but the projection is X(X^TX)^{-1}X^Ty, not (X^TX)^{-1}X^Ty. The normal equation gives the coefficients of that projection." },
          { text: "The coefficients of the projection of y onto the column space of X", feedback: "Correct! The normal equation finds the weight vector w such that Xw is the closest point to y in the column space of X. It combines projection with basis representation." },
          { text: "The eigenvalues of the data matrix", feedback: "Eigenvalues are a different computation. The normal equation is about finding optimal linear regression coefficients." },
        ]}
        correctIndex={2}
        hint="Think about what Xw represents in terms of the column space of X."
        explanation="Xw is a linear combination of the columns of X. The normal equation finds the specific coefficients w that make Xw as close as possible to y — i.e., the orthogonal projection. The residual y - Xw is perpendicular to every column of X."
      />
    </div>
  );
}
