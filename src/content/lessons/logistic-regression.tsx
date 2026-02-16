"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function LogisticRegression() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>From Predicting Numbers to Making Decisions</h2>
      <p>
        Linear regression predicts a continuous value: house price, temperature,
        stock return. But many real-world problems require a <em>yes or no</em>{" "}
        answer: Is this email spam? Does this patient have cancer? Will this
        customer churn? These are <strong>classification</strong> problems, and
        they need a different approach.
      </p>
      <p>
        The naive idea &mdash; just use linear regression and round the output
        &mdash; fails badly. Linear regression can produce outputs of &minus;5
        or 42, which make no sense as probabilities. We need a model whose
        output is always between 0 and 1, naturally interpretable as a
        probability. Enter the <strong>sigmoid function</strong>.
      </p>

      <h2>The Sigmoid Function</h2>
      <p>
        The <strong>sigmoid</strong> (also called the logistic function) maps
        any real number to the interval (0, 1):
      </p>
      <MathBlock
        latex="\sigma(z) = \frac{1}{1 + e^{-z}}"
        display
      />
      <p>
        This S-shaped curve has beautiful properties:
      </p>
      <ul>
        <li>
          As <em>z</em> &rarr; +&infin;, &sigma;(<em>z</em>) &rarr; 1
        </li>
        <li>
          As <em>z</em> &rarr; &minus;&infin;, &sigma;(<em>z</em>) &rarr; 0
        </li>
        <li>
          At <em>z</em> = 0, &sigma;(0) = 0.5 &mdash; maximum uncertainty
        </li>
        <li>
          Its derivative has a remarkably clean form:
          &sigma;&prime;(<em>z</em>) = &sigma;(<em>z</em>)(1 &minus;
          &sigma;(<em>z</em>)), which simplifies gradient calculations
        </li>
      </ul>

      <h3>Visualize the Sigmoid</h3>
      <p>
        The graph below shows the sigmoid function. Notice how it smoothly
        transitions from 0 to 1, with the steepest change near <em>z</em> = 0.
        This is the &ldquo;squashing&rdquo; function that turns any real number
        into a probability.
      </p>
      <GraphPlayground
        equation="1 / (1 + Math.exp(-x))"
        xRange={[-8, 8]}
        yRange={[-0.1, 1.1]}
        interactive
        showGrid
        color="#8b5cf6"
      />

      <h2>The Logistic Regression Model</h2>
      <p>
        Logistic regression wraps linear regression in a sigmoid. The input
        features are combined linearly, then passed through the sigmoid to
        produce a probability:
      </p>
      <MathBlock
        latex="P(y = 1 \mid \mathbf{x}) = \sigma(\mathbf{w}^\top \mathbf{x} + b) = \frac{1}{1 + e^{-(\mathbf{w}^\top \mathbf{x} + b)}}"
        display
      />
      <p>
        The model outputs the probability that the input belongs to class 1. We
        classify based on a threshold (typically 0.5):
      </p>
      <MathBlock
        latex="\hat{y} = \begin{cases} 1 & \text{if } \sigma(\mathbf{w}^\top\mathbf{x} + b) \geq 0.5 \\ 0 & \text{if } \sigma(\mathbf{w}^\top\mathbf{x} + b) < 0.5 \end{cases}"
        display
      />
      <p>
        Despite its name, logistic &ldquo;regression&rdquo; is a{" "}
        <strong>classification</strong> algorithm. The name comes from the
        logistic function (sigmoid), not from the nature of the task.
      </p>

      <h2>The Decision Boundary</h2>
      <p>
        The <strong>decision boundary</strong> is the set of points where the
        model is exactly uncertain: &sigma;(<em>z</em>) = 0.5, which means{" "}
        <em>z</em> = 0. For logistic regression, this gives:
      </p>
      <MathBlock
        latex="\mathbf{w}^\top \mathbf{x} + b = 0"
        display
      />
      <p>
        This is a <strong>linear equation</strong> &mdash; a line in 2D, a
        plane in 3D, or a hyperplane in higher dimensions. Points on one side
        are classified as 1; points on the other side as 0. The decision
        boundary divides the feature space into two half-spaces, just like the
        hyperplanes you studied in linear algebra.
      </p>
      <p>
        The weight vector <strong>w</strong> is perpendicular to the decision
        boundary. Its magnitude controls how quickly the probability transitions
        from 0 to 1 &mdash; a large ||<strong>w</strong>|| creates a sharp
        boundary, while a small ||<strong>w</strong>|| creates a gradual one.
      </p>

      <h2>Explore: Move the Decision Boundary</h2>
      <p>
        Adjust the weight <em>w</em> and bias <em>b</em> below to shift and
        scale the sigmoid. The parameter <em>w</em> controls the steepness (how
        rapidly the probability changes), and <em>b</em> shifts the boundary
        left or right. The decision boundary is where the output equals 0.5.
      </p>
      <SliderExploration
        title="Decision Boundary Explorer"
        description="Adjust w and b in σ(wx + b). Larger |w| makes the transition sharper. Changing b shifts the boundary. The decision boundary is at x = -b/w."
        parameters={[
          { name: "w", label: "w (weight)", min: -5, max: 5, step: 0.1, default: 1 },
          { name: "b", label: "b (bias)", min: -5, max: 5, step: 0.1, default: 0 },
        ]}
        equation="1 / (1 + Math.exp(-(w * x + b)))"
        xRange={[-8, 8]}
        yRange={[-0.1, 1.1]}
      />

      <h2>The Cross-Entropy Loss</h2>
      <p>
        We cannot use MSE for logistic regression. Why? When the sigmoid
        is composed with MSE, the resulting cost surface is non-convex &mdash;
        it has local minima that gradient descent can get stuck in. We need a
        loss function that is convex for logistic regression.
      </p>
      <p>
        The <strong>cross-entropy loss</strong> (also called log loss) is:
      </p>
      <MathBlock
        latex="\mathcal{L}(\hat{y}, y) = -\big[y \log(\hat{y}) + (1 - y)\log(1 - \hat{y})\big]"
        display
      />
      <p>
        Why does this work? Consider the two cases:
      </p>
      <ul>
        <li>
          When <em>y</em> = 1: Loss = &minus;log(&ycirc;). If the model
          predicts &ycirc; close to 1 (correct), &minus;log(1) &asymp; 0. If
          the model predicts &ycirc; close to 0 (wrong), &minus;log(0) &rarr;
          &infin;. The loss explodes when the model is confidently wrong.
        </li>
        <li>
          When <em>y</em> = 0: Loss = &minus;log(1 &minus; &ycirc;). Similarly,
          the loss is near 0 when &ycirc; &asymp; 0 (correct) and explodes when
          &ycirc; &asymp; 1 (wrong).
        </li>
      </ul>
      <MathBlock
        latex="J(\mathbf{w}, b) = -\frac{1}{n}\sum_{i=1}^{n}\big[y_i\log(\hat{y}_i) + (1 - y_i)\log(1 - \hat{y}_i)\big]"
        display
      />
      <p>
        This cost function is convex when &ycirc; = &sigma;(<strong>w</strong>&sup;T<strong>x</strong> + <em>b</em>),
        guaranteeing that gradient descent finds the global minimum. The
        connection to information theory runs deep: cross-entropy measures the
        &ldquo;distance&rdquo; between the true distribution (labels) and the
        predicted distribution (model outputs).
      </p>

      <h2>Walkthrough: Classify a Point</h2>
      <StepByStep
        title="Classify the point x = (2, 3) with w = (0.5, -0.3) and b = 0.1"
        steps={[
          {
            title: "Compute the linear combination",
            content: "Calculate z = w^T x + b using the dot product from linear algebra.",
            latex: "z = (0.5)(2) + (-0.3)(3) + 0.1 = 1.0 - 0.9 + 0.1 = 0.2",
          },
          {
            title: "Apply the sigmoid",
            content: "Pass z through the sigmoid function to get a probability.",
            latex: "\\hat{y} = \\sigma(0.2) = \\frac{1}{1 + e^{-0.2}} = \\frac{1}{1 + 0.8187} \\approx 0.5498",
          },
          {
            title: "Make the classification",
            content: "Compare the probability to the threshold of 0.5.",
            latex: "0.5498 > 0.5 \\implies \\text{classify as class } 1",
          },
          {
            title: "Interpret the result",
            content:
              "The model is barely confident (55%) that this point belongs to class 1. The point is close to the decision boundary. If w^T x + b were much larger (say, 5), σ(5) ≈ 0.993, giving very high confidence.",
          },
          {
            title: "Compute the loss (if true label is y = 1)",
            content: "Use cross-entropy to measure how well the model did.",
            latex: "\\mathcal{L} = -\\log(0.5498) \\approx 0.598",
          },
        ]}
      />

      <h2>Gradient of the Cross-Entropy Loss</h2>
      <p>
        To train logistic regression with gradient descent, we need the
        gradient of the cost function. A beautiful mathematical coincidence
        emerges: the gradient has the exact same form as for linear regression:
      </p>
      <MathBlock
        latex="\frac{\partial J}{\partial w_j} = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i) \cdot x_{ij}"
        display
      />
      <p>
        The only difference is that &ycirc;<sub>i</sub> = &sigma;(<strong>w</strong>&sup;T<strong>x</strong><sub>i</sub> + <em>b</em>)
        instead of <strong>w</strong>&sup;T<strong>x</strong><sub>i</sub> + <em>b</em>.
        This simplicity is a consequence of the sigmoid&apos;s derivative
        &sigma;&prime; = &sigma;(1 &minus; &sigma;) canceling perfectly with
        terms in the cross-entropy gradient. Calculus at its finest.
      </p>

      <h2>Logistic Regression Is a Building Block</h2>
      <p>
        Logistic regression is not just a standalone algorithm &mdash; it is the
        fundamental building block of neural networks. A single neuron with a
        sigmoid activation function <em>is</em> logistic regression. When you
        stack many of these neurons in layers, you get a neural network. We will
        explore this connection in the Neural Networks Intuition lesson.
      </p>
      <MathBlock
        latex="\text{Logistic Regression} \xrightarrow{\text{stack layers}} \text{Neural Network}"
        display
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="logreg-q1"
        question="What is σ(0), the sigmoid function evaluated at z = 0?"
        options={[
          { text: "0", feedback: "σ(z) approaches 0 as z → -∞, but at z = 0 it is not 0." },
          { text: "0.5", feedback: "Correct! σ(0) = 1/(1 + e⁰) = 1/(1 + 1) = 1/2 = 0.5. This is the point of maximum uncertainty — the model is equally unsure about both classes." },
          { text: "1", feedback: "σ(z) approaches 1 as z → +∞, but at z = 0 it is not 1." },
          { text: "Undefined", feedback: "The sigmoid is defined everywhere. σ(0) = 1/(1+1) = 0.5." },
        ]}
        correctIndex={1}
        hint="Substitute z = 0 into the formula: 1/(1 + e^(-0)) = 1/(1 + 1)."
        explanation="σ(0) = 1/(1 + e⁰) = 1/2. This makes geometric sense: at z = 0 (the decision boundary), the model assigns equal probability to both classes. The point z = 0 is the inflection point of the sigmoid."
      />

      <InteractiveQuestion
        id="logreg-q2"
        question="Why can't we use Mean Squared Error as the loss function for logistic regression?"
        options={[
          { text: "MSE is not defined for values between 0 and 1", feedback: "MSE is defined for any real-valued predictions. The issue is about the optimization landscape, not the domain." },
          { text: "MSE combined with the sigmoid creates a non-convex cost surface", feedback: "Correct! When you compose MSE with the sigmoid, the resulting cost function has local minima. Gradient descent can get stuck and fail to find the best parameters. Cross-entropy loss maintains convexity." },
          { text: "MSE cannot handle binary labels", feedback: "MSE can technically be computed for binary labels (0 and 1). The problem is that the resulting optimization is non-convex." },
          { text: "MSE is too slow to compute", feedback: "MSE is actually very fast to compute. The issue is the shape of the resulting cost surface, not computation speed." },
        ]}
        correctIndex={1}
        hint="Think about what happens to the shape of the cost function J(w) when you compose a quadratic (MSE) with a sigmoid."
        explanation="The sigmoid is a nonlinear function. Composing the quadratic MSE with the sigmoid produces a wavy, non-convex surface with multiple local minima. Cross-entropy loss is specifically designed to produce a convex cost surface when combined with the sigmoid, ensuring gradient descent converges to the global optimum."
      />

      <InteractiveQuestion
        id="logreg-q3"
        question="The decision boundary in logistic regression is where w^T x + b = 0. In 2D with features x₁ and x₂, what shape is this boundary?"
        options={[
          { text: "A curve (parabola)", feedback: "A parabola is a quadratic curve. The equation w₁x₁ + w₂x₂ + b = 0 is linear." },
          { text: "A straight line", feedback: "Correct! The equation w₁x₁ + w₂x₂ + b = 0 defines a straight line in 2D. This is the same type of linear equation you studied in linear algebra. Logistic regression can only create linear decision boundaries." },
          { text: "A circle", feedback: "A circle is a nonlinear boundary. Logistic regression produces linear boundaries." },
          { text: "Any arbitrary shape", feedback: "Logistic regression is limited to linear (straight-line) boundaries. For complex shapes, you need more powerful models like neural networks." },
        ]}
        correctIndex={1}
        hint="What kind of geometric object does a linear equation in two variables define?"
        explanation="w₁x₁ + w₂x₂ + b = 0 is a linear equation in x₁ and x₂, which defines a straight line. This is the fundamental limitation of logistic regression: it can only separate classes with a linear boundary. Data that is not linearly separable requires nonlinear models."
      />
    </div>
  );
}
