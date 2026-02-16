"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function KNNAlgorithm() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Simplest Classifier: Ask Your Neighbors</h2>
      <p>
        K-Nearest Neighbors (KNN) is one of the most intuitive algorithms in
        all of machine learning. The idea is almost embarrassingly simple: to
        classify a new data point, find the <em>k</em> closest points in the
        training data and let them vote. The majority class wins.
      </p>
      <p>
        There is <strong>no training phase</strong>. The algorithm simply stores
        the entire training dataset and does all the work at prediction time.
        This makes KNN a <strong>lazy learner</strong> (or instance-based
        learner) &mdash; in contrast to &ldquo;eager learners&rdquo; like
        logistic regression or neural networks, which build an explicit model
        during training.
      </p>
      <p>
        Despite its simplicity, KNN can model highly complex, nonlinear
        decision boundaries. The boundary emerges from the data itself, not
        from any parametric assumption about its shape.
      </p>

      <h2>Distance Metrics</h2>
      <p>
        The heart of KNN is measuring &ldquo;closeness.&rdquo; This requires a
        <strong>distance metric</strong> &mdash; a function that quantifies how
        far apart two points are. The choice of metric matters enormously.
      </p>

      <h3>Euclidean Distance</h3>
      <p>
        The most common choice, directly from the Pythagorean theorem
        generalized to <em>d</em> dimensions:
      </p>
      <MathBlock
        latex="d_{\text{Euclidean}}(\mathbf{x}, \mathbf{z}) = \sqrt{\sum_{j=1}^{d}(x_j - z_j)^2} = \|\mathbf{x} - \mathbf{z}\|_2"
        display
      />
      <p>
        This is the L2 norm of the difference vector &mdash; the same vector
        norm you studied in linear algebra. It measures the &ldquo;as the crow
        flies&rdquo; distance between two points.
      </p>

      <h3>Manhattan Distance</h3>
      <p>
        Also called the L1 distance or &ldquo;taxicab distance&rdquo; &mdash;
        the distance a taxi would travel on a grid:
      </p>
      <MathBlock
        latex="d_{\text{Manhattan}}(\mathbf{x}, \mathbf{z}) = \sum_{j=1}^{d}|x_j - z_j| = \|\mathbf{x} - \mathbf{z}\|_1"
        display
      />
      <p>
        Manhattan distance is less sensitive to outliers in individual features
        because it does not square the differences. It can be preferable when
        features have different scales or when sparse differences are expected.
      </p>

      <h3>General Minkowski Distance</h3>
      <p>
        Both Euclidean and Manhattan are special cases of the Minkowski
        distance:
      </p>
      <MathBlock
        latex="d_p(\mathbf{x}, \mathbf{z}) = \left(\sum_{j=1}^{d}|x_j - z_j|^p\right)^{1/p} = \|\mathbf{x} - \mathbf{z}\|_p"
        display
      />
      <p>
        With <em>p</em> = 1 (Manhattan), <em>p</em> = 2 (Euclidean), and{" "}
        <em>p</em> &rarr; &infin; (Chebyshev distance, which considers only the
        largest component difference). The choice of <em>p</em> shapes what
        &ldquo;nearby&rdquo; means.
      </p>

      <h2>The KNN Algorithm</h2>
      <p>
        The algorithm for classification is straightforward:
      </p>
      <ol>
        <li>Store the entire training dataset.</li>
        <li>For a new query point <strong>x</strong><sub>q</sub>, compute the
          distance from <strong>x</strong><sub>q</sub> to every training point.</li>
        <li>Find the <em>k</em> training points with the smallest distances.</li>
        <li>Among these <em>k</em> neighbors, count the class labels.</li>
        <li>Predict the majority class (break ties arbitrarily or by distance).</li>
      </ol>
      <p>
        For regression, replace the majority vote with the average (or
        weighted average) of the neighbors&apos; values.
      </p>

      <h2>Walkthrough: Classify a Point with k = 3</h2>
      <StepByStep
        title="Classify query point (3, 4) with k = 3"
        steps={[
          {
            title: "Training data",
            content:
              "We have 6 training points: A(1,1) class 0, B(2,2) class 0, C(2,4) class 1, D(4,3) class 1, E(5,5) class 1, F(5,1) class 0. The query point is Q(3,4).",
          },
          {
            title: "Compute distances to all training points",
            content: "Using Euclidean distance from Q(3,4) to each point.",
            latex:
              "d(Q,A) = \\sqrt{(3-1)^2+(4-1)^2} = \\sqrt{13} \\approx 3.61 \\quad d(Q,B) = \\sqrt{1+4} \\approx 2.24",
          },
          {
            title: "Continue computing distances",
            content: "Compute the remaining four distances.",
            latex:
              "d(Q,C) = \\sqrt{1+0} = 1.00 \\quad d(Q,D) = \\sqrt{1+1} \\approx 1.41 \\quad d(Q,E) = \\sqrt{4+1} \\approx 2.24 \\quad d(Q,F) = \\sqrt{4+9} \\approx 3.61",
          },
          {
            title: "Find the 3 nearest neighbors",
            content:
              "Sorted by distance: C(1.00, class 1), D(1.41, class 1), B(2.24, class 0) or E(2.24, class 1). The 3 nearest are C, D, and B (or E — tied).",
          },
          {
            title: "Majority vote",
            content:
              "Taking C(class 1), D(class 1), B(class 0): the vote is 2-to-1 in favor of class 1. If we take E instead of B: 3-to-0 for class 1. Either way, Q is classified as class 1.",
            latex: "\\hat{y} = \\text{mode}(1, 1, 0) = 1",
          },
        ]}
      />

      <h2>Choosing k: The Bias-Variance Tradeoff</h2>
      <p>
        The hyperparameter <em>k</em> controls the tradeoff between bias and
        variance:
      </p>
      <ul>
        <li>
          <strong>k = 1:</strong> The decision boundary is extremely complex
          &mdash; every training point creates its own small region. This has
          low bias but high variance: small changes in training data cause
          large changes in the boundary. Prone to overfitting.
        </li>
        <li>
          <strong>Large k:</strong> The decision boundary becomes smoother as
          each prediction averages over more neighbors. This reduces variance
          but increases bias: the model may underfit if <em>k</em> is too
          large. In the extreme, <em>k</em> = <em>n</em> predicts the majority
          class for everything.
        </li>
        <li>
          <strong>Odd k:</strong> For binary classification, an odd <em>k</em>{" "}
          avoids ties in the majority vote.
        </li>
      </ul>
      <SliderExploration
        title="Effect of k on Classification"
        description="Adjust k to see how the decision boundary changes. Small k creates complex boundaries that follow noise; large k creates smooth boundaries that may miss real patterns. The ideal k balances these effects."
        parameters={[
          { name: "k", label: "k (number of neighbors)", min: 1, max: 21, step: 2, default: 3 },
        ]}
        equation="1 / (1 + Math.exp(-x / k))"
        xRange={[-10, 10]}
        yRange={[-0.1, 1.1]}
      />
      <p>
        In practice, <em>k</em> is chosen using cross-validation: try several
        values, evaluate each on a held-out set, and pick the one with the best
        validation performance. Typical good values range from 3 to 20.
      </p>

      <h2>The Curse of Dimensionality</h2>
      <p>
        KNN works beautifully in low dimensions but struggles as the number of
        features <em>d</em> grows. This phenomenon is called the{" "}
        <strong>curse of dimensionality</strong>, and it is one of the most
        important concepts in machine learning.
      </p>
      <p>
        The core issue: in high-dimensional spaces, data points become
        surprisingly far apart. To understand why, consider a <em>d</em>-dimensional
        unit hypercube [0, 1]<sup>d</sup>. The volume of a small
        &ldquo;neighborhood&rdquo; around a point shrinks exponentially with
        dimension.
      </p>
      <MathBlock
        latex="\text{To capture 10\% of data in 1D: need interval of length 0.1}"
        display
      />
      <MathBlock
        latex="\text{To capture 10\% of data in 10D: need hypercube of side } 0.1^{1/10} \approx 0.79"
        display
      />
      <p>
        In 10 dimensions, to capture just 10% of the data, you need a
        neighborhood that spans 79% of each feature&apos;s range! This means
        &ldquo;nearest&rdquo; neighbors are not nearby at all &mdash; they
        might be far away in most dimensions.
      </p>
      <p>
        Practical consequences:
      </p>
      <ul>
        <li>
          KNN becomes unreliable as <em>d</em> grows because distances between
          all points converge to similar values.
        </li>
        <li>
          The amount of training data needed grows exponentially with dimension
          to maintain the same density.
        </li>
        <li>
          Feature selection and dimensionality reduction (PCA, which you
          studied in linear algebra) become essential preprocessing steps.
        </li>
      </ul>

      <h2>Feature Scaling Is Essential</h2>
      <p>
        KNN relies on distances. If one feature is measured in thousands (e.g.,
        salary in dollars) and another in single digits (e.g., years of
        experience), the first feature will dominate the distance calculation.
        <strong>Normalization</strong> or <strong>standardization</strong> is
        critical:
      </p>
      <MathBlock
        latex="\text{Standardize: } x_j' = \frac{x_j - \mu_j}{\sigma_j} \qquad \text{Normalize: } x_j' = \frac{x_j - \min_j}{\max_j - \min_j}"
        display
      />

      <RevealAnswer label="When would you choose KNN over logistic regression?">
        <p>
          Choose KNN when:
        </p>
        <ul>
          <li>
            <strong>The decision boundary is complex and nonlinear.</strong>{" "}
            Logistic regression can only create linear boundaries. KNN can
            model any shape.
          </li>
          <li>
            <strong>You have few features</strong> (say, 2&ndash;20). The curse
            of dimensionality makes KNN impractical in very high dimensions.
          </li>
          <li>
            <strong>Interpretability at the instance level</strong> is
            important. You can explain a KNN prediction by showing the
            neighbors: &ldquo;This patient was classified as high-risk because
            the 5 most similar patients in our database all developed the
            condition.&rdquo;
          </li>
          <li>
            <strong>The dataset is small to moderate.</strong> KNN stores the
            entire dataset and computes distances at prediction time, making
            it slow for very large datasets.
          </li>
        </ul>
        <p>
          Choose logistic regression when you need fast predictions, the
          decision boundary is approximately linear, or you have many features.
        </p>
      </RevealAnswer>

      <h2>Implementation: KNN from Scratch</h2>
      <CodeEditor
        language="python"
        description="Implement the KNN algorithm from scratch using only NumPy."
        initialCode={`import numpy as np
from collections import Counter

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X_train, y_train):
        """Store the training data."""
        self.X_train = np.array(X_train)
        self.y_train = np.array(y_train)

    def predict(self, X_test):
        """Predict class labels for each test point."""
        X_test = np.array(X_test)
        predictions = []

        for x_query in X_test:
            # TODO: Compute distances from x_query to all training points
            # TODO: Find the k nearest neighbors
            # TODO: Majority vote among the k nearest labels
            # TODO: Append the predicted label
            pass

        return np.array(predictions)

# Test with simple data
X_train = [[1,1], [2,2], [2,4], [4,3], [5,5], [5,1]]
y_train = [0, 0, 1, 1, 1, 0]

knn = KNN(k=3)
knn.fit(X_train, y_train)
print(knn.predict([[3, 4]]))  # Expected: [1]
print(knn.predict([[1, 1], [5, 5]]))  # Expected: [0, 1]`}
        solution={`import numpy as np
from collections import Counter

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X_train, y_train):
        """Store the training data."""
        self.X_train = np.array(X_train)
        self.y_train = np.array(y_train)

    def predict(self, X_test):
        """Predict class labels for each test point."""
        X_test = np.array(X_test)
        predictions = []

        for x_query in X_test:
            # Compute Euclidean distances to all training points
            diffs = self.X_train - x_query
            distances = np.sqrt(np.sum(diffs ** 2, axis=1))

            # Find indices of the k nearest neighbors
            k_nearest_idx = np.argsort(distances)[:self.k]

            # Get the labels of the k nearest neighbors
            k_nearest_labels = self.y_train[k_nearest_idx]

            # Majority vote
            most_common = Counter(k_nearest_labels).most_common(1)
            predictions.append(most_common[0][0])

        return np.array(predictions)

# Test with simple data
X_train = [[1,1], [2,2], [2,4], [4,3], [5,5], [5,1]]
y_train = [0, 0, 1, 1, 1, 0]

knn = KNN(k=3)
knn.fit(X_train, y_train)
print(knn.predict([[3, 4]]))  # Output: [1]
print(knn.predict([[1, 1], [5, 5]]))  # Output: [0, 1]`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="knn-q1"
        question="With KNN (k=1), what is the training accuracy?"
        options={[
          { text: "Depends on the dataset", feedback: "Think about it: with k=1, each training point's nearest neighbor is itself." },
          { text: "100%", feedback: "Correct! With k=1, the nearest neighbor of any training point is the point itself (distance 0), so it always predicts its own label. This is 100% training accuracy — but likely terrible generalization." },
          { text: "Around 50% for binary classification", feedback: "The nearest neighbor of a training point is itself, so k=1 always correctly classifies training data." },
          { text: "0%", feedback: "Each training point is classified by its own label (its nearest neighbor is itself), so training accuracy is perfect." },
        ]}
        correctIndex={1}
        hint="When you query a training point, what is the closest point in the training set?"
        explanation="With k=1, each training point is its own nearest neighbor (distance 0), so it is classified by its own label — 100% accuracy. This is a clear sign of overfitting: perfect training accuracy but potentially poor test accuracy due to the highly complex, noisy decision boundary."
      />

      <InteractiveQuestion
        id="knn-q2"
        question="Why does KNN struggle in high-dimensional spaces (the curse of dimensionality)?"
        options={[
          { text: "The algorithm's time complexity increases linearly with dimension", feedback: "While computation does grow, the fundamental issue is geometric: distances become meaningless in high dimensions." },
          { text: "High-dimensional data requires more RAM than is available", feedback: "Memory can be an issue, but the core problem is mathematical, not hardware-related." },
          { text: "In high dimensions, all points become roughly equidistant, making 'nearest neighbor' meaningless", feedback: "Correct! As the number of dimensions increases, the ratio of the farthest distance to the nearest distance approaches 1. All points are approximately the same distance apart, so the concept of 'nearest' loses its discriminative power." },
          { text: "KNN cannot handle more than 10 features", feedback: "There is no hard limit. The performance degrades gradually as dimensions increase, but the algorithm still runs." },
        ]}
        correctIndex={2}
        hint="Think about what happens to the geometry of distance in very high-dimensional spaces."
        explanation="In high dimensions, the volume of space grows exponentially. Data points become sparse, and the difference between the nearest and farthest neighbor shrinks. When all distances are similar, the k nearest neighbors are not meaningfully 'near' — they might be just as far as the rest of the data. This is why dimensionality reduction (like PCA) is essential preprocessing for KNN."
      />
    </div>
  );
}
