"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function GradientDescent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Finding the Bottom of the Valley</h2>
      <p>
        In the previous lesson, we used the normal equation to find the optimal
        parameters for linear regression directly. But what if the cost function
        is not so simple? What if we have millions of features, or a non-linear
        model like a neural network? We need a general-purpose optimization
        algorithm that works for <em>any</em> differentiable cost function.
      </p>
      <p>
        <strong>Gradient descent</strong> is that algorithm. The idea is
        stunningly simple: imagine you are standing on a hilly landscape in
        thick fog and want to reach the lowest point. You cannot see the whole
        terrain, but you can feel the slope beneath your feet. Strategy: at each
        step, walk downhill in the steepest direction. Eventually, you reach a
        valley floor.
      </p>
      <p>
        Mathematically, the &ldquo;slope beneath your feet&rdquo; is the
        <strong> gradient</strong> &mdash; the vector of partial derivatives of
        the cost function with respect to each parameter. The gradient points
        in the direction of steepest <em>ascent</em>, so we move in the
        opposite direction to descend.
      </p>

      <h2>The Optimization Landscape</h2>
      <p>
        For a model with parameters &theta;, the cost function{" "}
        <em>J</em>(&theta;) defines a surface (or hypersurface in high
        dimensions). Each point on this surface corresponds to a particular
        choice of parameters, and the height is the error. Training a model
        means finding the lowest point on this surface.
      </p>
      <p>
        For linear regression with one parameter <em>w</em> (ignoring bias),
        the MSE cost function is a parabola &mdash; a bowl shape with a single
        minimum. Let us visualize this:
      </p>
      <GraphPlayground
        equation="x^2"
        xRange={[-4, 4]}
        yRange={[-1, 16]}
        interactive
        showGrid
        color="#ef4444"
      />
      <p>
        This is <em>J</em>(<em>w</em>) = <em>w</em>&sup2;, the simplest
        convex cost function. The minimum is at <em>w</em> = 0. Gradient
        descent will start at some initial <em>w</em> and iteratively move
        toward 0.
      </p>

      <h2>The Update Rule</h2>
      <p>
        The core of gradient descent is a single update rule, applied
        repeatedly:
      </p>
      <MathBlock
        latex="w \leftarrow w - \alpha \cdot \frac{\partial J}{\partial w}"
        display
      />
      <p>
        Here &alpha; (alpha) is the <strong>learning rate</strong>, a positive
        number that controls the step size. The partial derivative tells us the
        slope of the cost function at the current position. If the slope is
        positive (we are on the right side of the bowl), we subtract a positive
        number, moving <em>w</em> to the left &mdash; toward the minimum. If
        the slope is negative (left side of the bowl), we subtract a negative
        number, moving right &mdash; again toward the minimum.
      </p>
      <p>
        For multiple parameters, the update becomes a vector equation:
      </p>
      <MathBlock
        latex="\boldsymbol{\theta} \leftarrow \boldsymbol{\theta} - \alpha \nabla_{\boldsymbol{\theta}} J(\boldsymbol{\theta})"
        display
      />
      <p>
        The gradient &nabla;J is a vector of all partial derivatives &mdash;
        one per parameter. This is the multivariable calculus you studied:
        partial derivatives, gradients, and directional derivatives all come
        together here.
      </p>

      <h2>Learning Rate: The Goldilocks Problem</h2>
      <p>
        The learning rate &alpha; is the most critical hyperparameter in
        gradient descent. It must be &ldquo;just right&rdquo;:
      </p>
      <ul>
        <li>
          <strong>Too small:</strong> The algorithm takes tiny steps and
          converges painfully slowly. You might need millions of iterations to
          reach the minimum.
        </li>
        <li>
          <strong>Too large:</strong> The steps overshoot the minimum. The
          algorithm bounces back and forth across the valley, and may even
          diverge &mdash; the cost <em>increases</em> with each step.
        </li>
        <li>
          <strong>Just right:</strong> The algorithm converges quickly and
          smoothly to the minimum.
        </li>
      </ul>
      <SliderExploration
        title="Learning Rate Explorer"
        description="Adjust the learning rate α to see how it affects convergence. The curve shows J(w) = w². With α too small, convergence is slow. With α too large, the steps overshoot. Try values between 0.01 and 1.5."
        parameters={[
          { name: "a", label: "α (learning rate)", min: 0.01, max: 1.5, step: 0.01, default: 0.1 },
        ]}
        equation="x^2"
        xRange={[-4, 4]}
        yRange={[-1, 16]}
      />
      <p>
        A common practical approach is to start with a moderate learning rate
        (like 0.01 or 0.001) and use a <strong>learning rate schedule</strong>{" "}
        that gradually decreases &alpha; over time. Large steps early on make
        fast progress; smaller steps later allow precise convergence.
      </p>

      <h2>Worked Example: Gradient Descent on J(w) = w&sup2;</h2>
      <StepByStep
        title="Three iterations of gradient descent starting at w = 4, with α = 0.3"
        steps={[
          {
            title: "Setup",
            content:
              "Our cost function is J(w) = w². Its derivative is dJ/dw = 2w. We start at w₀ = 4 with learning rate α = 0.3.",
            latex: "J(w) = w^2, \\quad \\frac{dJ}{dw} = 2w, \\quad w_0 = 4, \\quad \\alpha = 0.3",
          },
          {
            title: "Iteration 1",
            content:
              "Compute the gradient at w = 4: dJ/dw = 2(4) = 8. Update: w = 4 - 0.3(8) = 4 - 2.4 = 1.6. The cost dropped from J(4) = 16 to J(1.6) = 2.56.",
            latex: "w_1 = 4 - 0.3 \\cdot 2(4) = 4 - 2.4 = 1.6 \\quad \\Rightarrow \\quad J(1.6) = 2.56",
          },
          {
            title: "Iteration 2",
            content:
              "Gradient at w = 1.6: dJ/dw = 2(1.6) = 3.2. Update: w = 1.6 - 0.3(3.2) = 1.6 - 0.96 = 0.64. Cost: J(0.64) = 0.4096.",
            latex: "w_2 = 1.6 - 0.3 \\cdot 2(1.6) = 1.6 - 0.96 = 0.64 \\quad \\Rightarrow \\quad J(0.64) = 0.4096",
          },
          {
            title: "Iteration 3",
            content:
              "Gradient at w = 0.64: dJ/dw = 2(0.64) = 1.28. Update: w = 0.64 - 0.3(1.28) = 0.64 - 0.384 = 0.256. Cost: J(0.256) = 0.0655.",
            latex: "w_3 = 0.64 - 0.3 \\cdot 2(0.64) = 0.64 - 0.384 = 0.256 \\quad \\Rightarrow \\quad J(0.256) \\approx 0.066",
          },
          {
            title: "Observe the pattern",
            content:
              "Each iteration, w is multiplied by (1 - 2α) = 0.4. The cost decreases rapidly: 16 → 2.56 → 0.41 → 0.07. After just 3 steps, the cost dropped by 99.6%. This is the power of gradient descent on a convex function.",
            latex: "w_t = (1 - 2\\alpha)^t \\cdot w_0 = 0.4^t \\cdot 4",
          },
        ]}
      />

      <h2>Batch vs. Stochastic vs. Mini-Batch</h2>
      <p>
        The gradient computation requires summing over data points. How many
        points should we use per update?
      </p>
      <h3>Batch Gradient Descent</h3>
      <p>
        Use <em>all n</em> training examples to compute the gradient at each
        step. The gradient is exact, so convergence is smooth. But for large
        datasets, each step is expensive.
      </p>
      <MathBlock
        latex="\nabla J = \frac{1}{n}\sum_{i=1}^{n} \nabla \mathcal{L}(h(\mathbf{x}_i), y_i)"
        display
      />

      <h3>Stochastic Gradient Descent (SGD)</h3>
      <p>
        Use <em>one</em> randomly chosen example per update. Each step is
        extremely fast but the gradient is noisy &mdash; it is an unbiased
        estimator of the true gradient, but with high variance. The path to the
        minimum is jagged but often reaches a good solution faster than batch
        GD for very large datasets.
      </p>
      <MathBlock
        latex="\nabla J \approx \nabla \mathcal{L}(h(\mathbf{x}_i), y_i) \quad \text{for a random } i"
        display
      />

      <h3>Mini-Batch Gradient Descent</h3>
      <p>
        The practical compromise: use a small batch of <em>B</em> examples
        (typically 32, 64, or 256). This reduces noise compared to SGD while
        being much faster than full batch. It also exploits hardware parallelism
        (GPUs process batches efficiently). This is what virtually every modern
        deep learning system uses.
      </p>
      <MathBlock
        latex="\nabla J \approx \frac{1}{B}\sum_{i \in \text{batch}} \nabla \mathcal{L}(h(\mathbf{x}_i), y_i)"
        display
      />

      <h2>Local Minima and Saddle Points</h2>
      <p>
        For convex functions (like MSE in linear regression), there is only one
        minimum &mdash; the global minimum. Gradient descent is guaranteed to
        find it. But for non-convex functions (like neural network loss
        surfaces), the landscape is far more complex:
      </p>
      <ul>
        <li>
          <strong>Local minima:</strong> valleys that are not the deepest point
          overall. Gradient descent can get stuck here.
        </li>
        <li>
          <strong>Saddle points:</strong> points where the gradient is zero but
          the point is neither a maximum nor a minimum &mdash; it is a minimum
          in some directions and a maximum in others. In high dimensions, saddle
          points are far more common than local minima.
        </li>
        <li>
          <strong>Plateaus:</strong> flat regions where the gradient is nearly
          zero, causing learning to stall.
        </li>
      </ul>
      <p>
        The Hessian matrix (matrix of second partial derivatives from
        multivariable calculus) characterizes these points. At a saddle point,
        the Hessian has both positive and negative eigenvalues &mdash; tying
        directly to the eigenvalue analysis you studied in linear algebra.
      </p>

      <RevealAnswer label="Why do saddle points matter more than local minima in practice?">
        <p>
          In high-dimensional spaces (neural networks can have millions of
          parameters), for a point to be a local minimum, the cost must curve
          upward in <em>every</em> direction. This requires all eigenvalues of
          the Hessian to be positive. With millions of dimensions, this is
          extremely unlikely by chance. Saddle points (a mix of positive and
          negative eigenvalues) are exponentially more common. Modern optimizers
          like Adam and SGD with momentum can escape saddle points effectively,
          but they remain a key challenge in optimization theory.
        </p>
      </RevealAnswer>

      <h2>Gradient Descent for Linear Regression</h2>
      <p>
        Applying gradient descent to the MSE cost function, we compute the
        partial derivatives:
      </p>
      <MathBlock
        latex="\frac{\partial J}{\partial w} = \frac{2}{n}\sum_{i=1}^{n}(wx_i + b - y_i) \cdot x_i \qquad \frac{\partial J}{\partial b} = \frac{2}{n}\sum_{i=1}^{n}(wx_i + b - y_i)"
        display
      />
      <p>
        These derivatives follow directly from the chain rule of calculus.
        The updates become:
      </p>
      <MathBlock
        latex="w \leftarrow w - \alpha \cdot \frac{2}{n}\sum_{i=1}^n (wx_i + b - y_i)x_i \qquad b \leftarrow b - \alpha \cdot \frac{2}{n}\sum_{i=1}^n (wx_i + b - y_i)"
        display
      />
      <p>
        Repeat these updates until convergence (when the change in <em>J</em>{" "}
        falls below a tolerance, or a maximum number of iterations is reached).
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="gd-q1"
        question="If the gradient of J at the current w is negative, what does gradient descent do?"
        options={[
          { text: "Decreases w (moves left)", feedback: "If the gradient is negative, we subtract a negative number, which INCREASES w." },
          { text: "Increases w (moves right)", feedback: "Correct! w ← w - α·(negative) = w + α·|gradient|. We move right, toward the minimum. The gradient points uphill, so moving opposite to it goes downhill." },
          { text: "Keeps w the same", feedback: "Gradient descent always updates w unless the gradient is exactly zero." },
          { text: "Jumps to the minimum directly", feedback: "Gradient descent takes incremental steps — it does not jump to the minimum in one step." },
        ]}
        correctIndex={1}
        hint="The update rule is w ← w - α·(dJ/dw). What happens when you subtract a negative number?"
        explanation="When dJ/dw < 0, the cost function is decreasing as w increases. So we should increase w to decrease the cost. The update w - α·(negative) = w + positive does exactly this."
      />

      <InteractiveQuestion
        id="gd-q2"
        question="Which variant of gradient descent is most commonly used in practice for training deep learning models?"
        options={[
          { text: "Batch gradient descent (use all data per step)", feedback: "Too slow for large datasets. Computing the gradient over millions of examples per step is impractical." },
          { text: "Stochastic gradient descent with batch size 1", feedback: "Too noisy and does not leverage GPU parallelism effectively. Modern practice uses larger batches." },
          { text: "Mini-batch gradient descent (e.g., batch size 32-256)", feedback: "Correct! Mini-batch GD strikes the balance: fast iterations, reasonable gradient estimates, and efficient use of GPU parallel processing." },
          { text: "The normal equation (no gradient descent needed)", feedback: "The normal equation only works for linear regression. Neural networks require iterative optimization." },
        ]}
        correctIndex={2}
        hint="Think about the tradeoff between computation time per step and gradient quality."
        explanation="Mini-batch GD (typically batch size 32-256) is the standard in deep learning. It balances noise reduction with computational efficiency and parallelizes well on GPUs. Pure batch GD is too slow; pure SGD (batch size 1) is too noisy and cannot leverage hardware parallelism."
      />

      <InteractiveQuestion
        id="gd-q3"
        question="Starting at w = 2 with J(w) = w² and α = 0.5, what is w after one gradient descent step?"
        options={[
          { text: "0", feedback: "Close, but check: w - α·2w = 2 - 0.5·4 = 2 - 2 = 0. Actually correct! With α = 0.5, one step lands exactly at the minimum." },
          { text: "1", feedback: "Compute: dJ/dw = 2w = 4 at w=2. Update: w = 2 - 0.5(4) = 2 - 2 = 0, not 1." },
          { text: "-2", feedback: "That would mean the step was too large. Check: 2 - 0.5·2·2 = 2 - 2 = 0." },
          { text: "0.5", feedback: "Compute carefully: dJ/dw = 2(2) = 4. w = 2 - 0.5(4) = 0." },
        ]}
        correctIndex={0}
        hint="dJ/dw = 2w. At w = 2, the gradient is 4. Apply the update: w ← w - α · gradient."
        explanation="At w = 2: gradient = 2(2) = 4. Update: w = 2 - 0.5(4) = 0. With this particular learning rate, we reach the minimum in one step! This happens because α = 1/(2·1) = 1/2 perfectly compensates the curvature of J = w²."
      />
    </div>
  );
}
