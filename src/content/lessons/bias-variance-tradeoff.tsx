"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function BiasVarianceTradeoff() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Central Tension in Machine Learning</h2>
      <p>
        Every machine learning practitioner faces the same fundamental
        dilemma: a model that is too simple misses the real pattern in the data,
        while a model that is too complex memorizes noise. The{" "}
        <strong>bias-variance tradeoff</strong> is the mathematical framework
        for understanding this tension. It explains <em>why</em> models fail,
        <em> how</em> to diagnose the failure mode, and <em>what</em> to do
        about it.
      </p>
      <p>
        This concept ties together everything you have learned so far: the
        overfitting and underfitting you saw in the first lesson, the choice
        of <em>k</em> in KNN, the depth of decision trees, the number of
        layers in a neural network, and the regularization terms we will
        introduce here. It is the unifying principle of model selection.
      </p>

      <h2>The Error Decomposition</h2>
      <p>
        For a given data point <strong>x</strong>, the expected prediction
        error of a model can be decomposed into three irreducible components:
      </p>
      <MathBlock
        latex="\mathbb{E}\left[(y - \hat{f}(\mathbf{x}))^2\right] = \underbrace{\text{Bias}^2(\hat{f}(\mathbf{x}))}_{\text{systematic error}} + \underbrace{\text{Var}(\hat{f}(\mathbf{x}))}_{\text{sensitivity to data}} + \underbrace{\sigma^2}_{\text{irreducible noise}}"
        display
      />
      <p>
        Let us unpack each term:
      </p>

      <h3>Bias</h3>
      <p>
        <strong>Bias</strong> measures how far off the model&apos;s average
        prediction is from the true value. It captures the systematic error
        introduced by the model&apos;s assumptions:
      </p>
      <MathBlock
        latex="\text{Bias}(\hat{f}(\mathbf{x})) = \mathbb{E}[\hat{f}(\mathbf{x})] - f(\mathbf{x})"
        display
      />
      <p>
        If you trained the model on many different training sets drawn from the
        same distribution, bias is the difference between the average of all
        those predictions and the true function. A model with high bias
        consistently gets the answer wrong in the same direction &mdash; it is
        systematically off because its assumptions are too restrictive.
      </p>
      <p>
        <strong>Example:</strong> Fitting a straight line to data that follows a
        parabola. No matter how many data points you provide, a linear model
        <em> cannot</em> capture the curvature. The error is baked into the
        model&apos;s functional form.
      </p>

      <h3>Variance</h3>
      <p>
        <strong>Variance</strong> measures how much the model&apos;s predictions
        fluctuate across different training sets:
      </p>
      <MathBlock
        latex="\text{Var}(\hat{f}(\mathbf{x})) = \mathbb{E}\left[(\hat{f}(\mathbf{x}) - \mathbb{E}[\hat{f}(\mathbf{x})])^2\right]"
        display
      />
      <p>
        If you trained the model on many different training sets, variance is
        how spread out the predictions are around their average. A model with
        high variance gives wildly different predictions depending on the
        specific training data it saw &mdash; it is too sensitive to the
        particular sample.
      </p>
      <p>
        <strong>Example:</strong> Fitting a degree-20 polynomial to 25 data
        points. The polynomial passes through every point perfectly but
        oscillates wildly between them. A slightly different set of 25 points
        would produce a completely different polynomial.
      </p>

      <h3>Irreducible Noise</h3>
      <p>
        The term &sigma;&sup2; represents inherent randomness in the data that
        no model can predict. Even the true function <em>f</em> cannot predict
        the noise. This sets a floor on achievable error.
      </p>

      <h2>Underfitting vs. Overfitting</h2>
      <p>
        These two failure modes correspond directly to the bias and variance
        terms:
      </p>
      <ul>
        <li>
          <strong>Underfitting (high bias, low variance):</strong> The model is
          too simple. It consistently misses the pattern, regardless of the
          training data. Symptoms: poor performance on both training and test
          data. <em>The model is not complex enough to capture the truth.</em>
        </li>
        <li>
          <strong>Overfitting (low bias, high variance):</strong> The model is
          too complex. It captures the pattern <em>and</em> the noise. Symptoms:
          excellent training performance but poor test performance. <em>The
          model is so flexible it fits randomness.</em>
        </li>
      </ul>
      <MathBlock
        latex="\text{Underfitting: } \text{Bias}^2 \gg \text{Var} \qquad \text{Overfitting: } \text{Var} \gg \text{Bias}^2"
        display
      />

      <h2>The Model Complexity Curve</h2>
      <p>
        As model complexity increases (more polynomial degrees, deeper trees,
        more neurons), bias decreases but variance increases. The total error
        has a U-shape with a sweet spot in the middle:
      </p>
      <MathBlock
        latex="\text{Total Error} = \text{Bias}^2 + \text{Variance} + \sigma^2"
        display
      />
      <SliderExploration
        title="Model Complexity vs. Error"
        description="Adjust the model complexity parameter. As complexity increases, training error decreases monotonically, but test error follows a U-shaped curve. The gap between them indicates overfitting. The optimal complexity minimizes test error."
        parameters={[
          { name: "c", label: "Model complexity", min: 1, max: 20, step: 1, default: 1 },
        ]}
        equation="(10 / x) + 0.05 * x + 0.5"
        xRange={[0.5, 20]}
        yRange={[0, 12]}
      />
      <p>
        The sweet spot is the model complexity that minimizes the total
        prediction error on unseen data. Finding this sweet spot is the central
        challenge of machine learning practice.
      </p>

      <h2>Analyzing Increasing Polynomial Degree</h2>
      <StepByStep
        title="Polynomial regression: how degree affects bias and variance"
        steps={[
          {
            title: "Degree 1 (linear fit)",
            content:
              "A straight line. If the true function is nonlinear, the line systematically misses the curvature. High bias, low variance. Different training sets produce similar lines — all wrong in the same way.",
            latex: "\\hat{f}(x) = w_1 x + w_0 \\quad \\text{(2 parameters)}",
          },
          {
            title: "Degree 3 (cubic fit)",
            content:
              "A cubic polynomial can capture one inflection point. For many real-world functions, this is a good balance. Moderate bias, moderate variance. The fit is flexible enough to capture the main trend but stable across different training sets.",
            latex: "\\hat{f}(x) = w_3 x^3 + w_2 x^2 + w_1 x + w_0 \\quad \\text{(4 parameters)}",
          },
          {
            title: "Degree 10 (high-degree polynomial)",
            content:
              "With 11 parameters, the polynomial can wiggle through many data points. If we only have 15 training points, the model is dangerously close to interpolating all of them. Low bias (it can represent the true function) but high variance (sensitive to the specific training points).",
            latex: "\\hat{f}(x) = \\sum_{k=0}^{10} w_k x^k \\quad \\text{(11 parameters)}",
          },
          {
            title: "Degree 20 with 25 data points",
            content:
              "The polynomial has 21 parameters for 25 points. It nearly interpolates the data, passing close to every training point. Training error is near zero, but the polynomial oscillates wildly between points. A slightly different training set would produce a completely different curve. Extreme overfitting.",
          },
          {
            title: "The lesson",
            content:
              "As degree increases: bias decreases monotonically (more flexibility), variance increases monotonically (more sensitivity). Total test error decreases initially, then increases — the U-curve. The optimal degree depends on the true complexity of the underlying function and the amount of training data.",
            latex:
              "E_{\\text{test}} = \\text{Bias}^2 \\downarrow + \\text{Variance} \\uparrow + \\sigma^2",
          },
        ]}
      />

      <h2>Regularization: Taming Complexity</h2>
      <p>
        Instead of choosing model complexity directly (e.g., polynomial degree),
        we can use a flexible model and add a <strong>penalty</strong> for
        complexity. This is <strong>regularization</strong> &mdash; it discourages
        the model from becoming too complex by adding a term to the loss
        function:
      </p>
      <MathBlock
        latex="J_{\text{reg}}(\mathbf{w}) = \frac{1}{n}\sum_{i=1}^{n}\mathcal{L}(\hat{y}_i, y_i) + \lambda \cdot R(\mathbf{w})"
        display
      />
      <p>
        Here &lambda; &gt; 0 is the <strong>regularization strength</strong>{" "}
        (a hyperparameter), and <em>R</em>(<strong>w</strong>) penalizes large
        weights. Two common choices:
      </p>

      <h3>L2 Regularization (Ridge)</h3>
      <MathBlock
        latex="R(\mathbf{w}) = \|\mathbf{w}\|_2^2 = \sum_j w_j^2"
        display
      />
      <p>
        L2 regularization penalizes the squared magnitude of the weight vector.
        It pushes all weights toward zero but rarely makes them exactly zero.
        The geometric interpretation: the solution is constrained to lie within
        a sphere of radius determined by &lambda;. From linear algebra, this is
        equivalent to adding &lambda;<strong>I</strong> to the matrix{" "}
        <strong>X</strong><sup>T</sup><strong>X</strong> in the normal equation:
      </p>
      <MathBlock
        latex="\hat{\mathbf{w}}_{\text{ridge}} = (\mathbf{X}^\top\mathbf{X} + \lambda\mathbf{I})^{-1}\mathbf{X}^\top\mathbf{y}"
        display
      />
      <p>
        This guarantees invertibility even when features are correlated
        (multicollinearity) &mdash; the eigenvalues of{" "}
        <strong>X</strong><sup>T</sup><strong>X</strong> + &lambda;<strong>I</strong>{" "}
        are all at least &lambda;, so the matrix is always positive definite.
      </p>

      <h3>L1 Regularization (Lasso)</h3>
      <MathBlock
        latex="R(\mathbf{w}) = \|\mathbf{w}\|_1 = \sum_j |w_j|"
        display
      />
      <p>
        L1 regularization penalizes the absolute values of weights. Its key
        property is <strong>sparsity</strong>: it drives many weights to
        exactly zero, effectively performing feature selection. If you have
        1000 features but only 20 are truly relevant, L1 can discover this
        automatically.
      </p>
      <p>
        The geometric reason: the L1 constraint region is a diamond (hypercube
        rotated 45&deg;), which has corners. The optimal point often lands on a
        corner where some coordinates are exactly zero.
      </p>

      <RevealAnswer label="When should you use L1 vs. L2 regularization?">
        <p>
          <strong>Use L1 (Lasso) when:</strong>
        </p>
        <ul>
          <li>
            You suspect many features are irrelevant and want automatic feature
            selection. L1 drives unimportant weights to exactly zero.
          </li>
          <li>
            You want a sparse, interpretable model. A model with 20 nonzero
            weights out of 1000 is easier to understand and deploy.
          </li>
          <li>
            The true underlying function depends on only a few features.
          </li>
        </ul>
        <p>
          <strong>Use L2 (Ridge) when:</strong>
        </p>
        <ul>
          <li>
            Most features are expected to be relevant (no need for sparsity).
            L2 shrinks all weights evenly rather than eliminating them.
          </li>
          <li>
            Features are correlated (multicollinearity). L2 handles this
            gracefully by spreading weights among correlated features. L1
            tends to arbitrarily pick one feature from a correlated group.
          </li>
          <li>
            You want a smooth, stable solution. L2 gives a closed-form
            solution; L1 requires iterative optimization.
          </li>
        </ul>
        <p>
          <strong>Elastic Net</strong> combines both: &lambda;<sub>1</sub>||<strong>w</strong>||<sub>1</sub> + &lambda;<sub>2</sub>||<strong>w</strong>||<sub>2</sub>&sup2;.
          This is often the best choice when you are unsure, as it gets the
          feature selection of L1 with the stability of L2.
        </p>
      </RevealAnswer>

      <h2>Cross-Validation: Estimating Generalization Error</h2>
      <p>
        How do we choose the right model complexity or regularization strength?
        We need to estimate how well the model will perform on unseen data.{" "}
        <strong>Cross-validation</strong> is the standard technique:
      </p>
      <MathBlock
        latex="\text{CV Error} = \frac{1}{K}\sum_{k=1}^{K} \mathcal{L}\big(\hat{f}_{-k}, \; D_k\big)"
        display
      />
      <p>
        In <strong>K-fold cross-validation</strong>:
      </p>
      <ol>
        <li>Split the training data into <em>K</em> equal folds (typically <em>K</em> = 5 or 10).</li>
        <li>For each fold <em>k</em>: train on the other <em>K</em> &minus; 1 folds, evaluate on fold <em>k</em>.</li>
        <li>Average the <em>K</em> evaluation scores.</li>
      </ol>
      <p>
        This gives an unbiased estimate of test error using only the training
        data. You can then select the hyperparameter (complexity, &lambda;,
        <em> k</em> in KNN, tree depth, etc.) that minimizes the
        cross-validated error.
      </p>
      <p>
        The extreme case is <strong>leave-one-out cross-validation</strong>{" "}
        (LOOCV), where <em>K</em> = <em>n</em>. Each fold is a single data
        point. This has low bias but high variance and is computationally
        expensive. In practice, 5-fold or 10-fold CV strikes a good balance.
      </p>

      <h2>Diagnosing Bias vs. Variance</h2>
      <p>
        In practice, you can diagnose the failure mode by examining
        <strong> learning curves</strong>:
      </p>
      <ul>
        <li>
          <strong>High bias (underfitting):</strong> Both training error and
          validation error are high. Adding more data does not help much
          &mdash; the model is fundamentally too simple. Solution: increase
          model complexity, add features, reduce regularization.
        </li>
        <li>
          <strong>High variance (overfitting):</strong> Training error is low
          but validation error is high (large gap). Adding more training data
          helps because it gives the model more signal to separate from noise.
          Solution: reduce model complexity, add regularization, get more data,
          or use dropout/ensemble methods.
        </li>
      </ul>
      <MathBlock
        latex="\begin{array}{lll} & \text{Training Error} & \text{Validation Error} \\ \text{High Bias:} & \text{high} & \text{high (similar)} \\ \text{High Variance:} & \text{low} & \text{high (large gap)} \\ \text{Good Fit:} & \text{low} & \text{low (small gap)} \end{array}"
        display
      />

      <h2>Regularization Across Models</h2>
      <p>
        The bias-variance tradeoff appears everywhere, and regularization
        takes different forms in different models:
      </p>
      <ul>
        <li>
          <strong>Linear/logistic regression:</strong> L1/L2 weight penalties.
        </li>
        <li>
          <strong>Decision trees:</strong> Maximum depth, minimum samples per
          leaf, pruning.
        </li>
        <li>
          <strong>KNN:</strong> Increasing <em>k</em> (more neighbors =
          smoother, less overfit).
        </li>
        <li>
          <strong>Neural networks:</strong> L2 weight decay, dropout (randomly
          zeroing neurons during training), early stopping (stopping before the
          model fully converges on training data).
        </li>
        <li>
          <strong>Ensembles:</strong> Bagging (averaging) reduces variance;
          boosting reduces bias.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="bv-q1"
        question="A linear model is used to fit data that follows a sinusoidal pattern. Training error is high and test error is high. What is the problem?"
        options={[
          { text: "Overfitting (high variance)", feedback: "With overfitting, training error would be LOW. Here both errors are high." },
          { text: "Underfitting (high bias)", feedback: "Correct! A linear model cannot capture a sinusoidal pattern. The model is too simple, resulting in high bias. Both training and test errors are high because the error is systematic — no amount of data or parameter tuning can make a line fit a sine wave." },
          { text: "Irreducible noise is too high", feedback: "Irreducible noise affects both models equally. Here the issue is the model's fundamental inability to capture the pattern." },
          { text: "The data is too noisy to model", feedback: "The high error on TRAINING data (not just test) indicates the model structure is wrong, not that the data is too noisy." },
        ]}
        correctIndex={1}
        hint="High training error AND high test error points to which failure mode?"
        explanation="When both training and test errors are high, the model is underfitting — it is too simple to capture the underlying pattern. A straight line cannot approximate a sine wave. The solution is to increase model complexity: use a polynomial, add sinusoidal features, or switch to a more flexible model like a neural network."
      />

      <InteractiveQuestion
        id="bv-q2"
        question="You add L2 regularization (λ = 10) to a neural network that was overfitting. What happens to bias and variance?"
        options={[
          { text: "Both bias and variance decrease", feedback: "Regularization is a tradeoff — you cannot reduce both simultaneously. Reducing variance comes at the cost of increased bias." },
          { text: "Bias increases, variance decreases", feedback: "Correct! L2 regularization constrains the weights, reducing the model's effective complexity. This increases bias (the model makes stronger assumptions) but decreases variance (predictions are more stable). If λ is chosen well, the net effect is lower total error." },
          { text: "Bias decreases, variance increases", feedback: "This is backwards. Regularization reduces complexity, which increases bias and decreases variance." },
          { text: "Neither changes — regularization only affects training speed", feedback: "Regularization fundamentally changes the model by constraining its parameters, directly affecting the bias-variance balance." },
        ]}
        correctIndex={1}
        hint="Regularization constrains the model's flexibility. What does less flexibility mean for bias and variance?"
        explanation="L2 regularization pushes weights toward zero, effectively reducing the model's complexity. This means the model makes stronger implicit assumptions (higher bias) but is less sensitive to the particular training set (lower variance). The art is choosing λ so that the variance reduction outweighs the bias increase, minimizing total error."
      />

      <InteractiveQuestion
        id="bv-q3"
        question="In the error decomposition Error = Bias² + Variance + σ², what is σ²?"
        options={[
          { text: "The error caused by the model's assumptions", feedback: "That is bias, not σ². The irreducible noise is a property of the data, not the model." },
          { text: "The error caused by overfitting", feedback: "Overfitting is captured by high variance. σ² is independent of the model." },
          { text: "The inherent noise in the data that no model can predict", feedback: "Correct! σ² represents the randomness that exists in the true data-generating process. Even the perfect model (f(x) itself) would have this error. It sets a fundamental lower bound on prediction error that cannot be beaten by any algorithm." },
          { text: "The standard deviation of the training data", feedback: "σ² specifically refers to the variance of the noise in the label y, not the spread of the input data." },
        ]}
        correctIndex={2}
        hint="Even if you knew the true function f(x) exactly, would your predictions be perfect?"
        explanation="σ² is the variance of the noise ε in y = f(x) + ε. It represents irreducible randomness: measurement error, unobserved variables, inherent stochasticity. No model, no matter how complex or well-trained, can predict ε. This is why it is called 'irreducible' — it is the floor below which no prediction error can go."
      />
    </div>
  );
}
