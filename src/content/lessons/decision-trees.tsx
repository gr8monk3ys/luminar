"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DecisionTrees() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Asking Questions to Make Decisions</h2>
      <p>
        A <strong>decision tree</strong> is perhaps the most intuitive machine
        learning model. It mirrors how humans make decisions: by asking a
        sequence of yes/no questions. Should I play tennis today? Is it sunny?
        If yes, is the humidity high? If the humidity is high, do not play;
        otherwise, play.
      </p>
      <p>
        Each internal node of the tree asks a question about a feature (e.g.,
        &ldquo;Is temperature &gt; 75&deg;F?&rdquo;). Each branch represents an
        answer. Each leaf node gives a classification (or regression value). To
        classify a new data point, start at the root and follow the branches
        until you reach a leaf.
      </p>
      <p>
        Decision trees are powerful because they can model non-linear decision
        boundaries &mdash; something logistic regression cannot do. The
        boundary is piecewise-constant: the tree partitions the feature space
        into rectangular regions, each assigned to a class.
      </p>

      <h2>How to Choose the Best Question: Information Gain</h2>
      <p>
        The key challenge in building a decision tree is deciding <em>which
        feature to split on</em> at each node. We want to choose the question
        that gives us the most useful information &mdash; the one that best
        separates the classes. This is formalized using <strong>information
        gain</strong>.
      </p>
      <p>
        Information gain is rooted in <strong>entropy</strong> from information
        theory &mdash; a concept deeply connected to the probability you studied.
        Entropy measures the &ldquo;disorder&rdquo; or &ldquo;uncertainty&rdquo;
        in a set of labels:
      </p>
      <MathBlock
        latex="H(S) = -\sum_{c=1}^{C} p_c \log_2(p_c)"
        display
      />
      <p>
        Here <em>p<sub>c</sub></em> is the proportion of examples in class{" "}
        <em>c</em>. Key properties:
      </p>
      <ul>
        <li>
          <strong>Maximum entropy:</strong> When all classes are equally likely
          (e.g., 50% positive, 50% negative), entropy is maximized. This is
          the state of greatest uncertainty.
        </li>
        <li>
          <strong>Zero entropy:</strong> When all examples belong to one class
          (pure node), entropy is 0. There is no uncertainty.
        </li>
        <li>
          For binary classification: <em>H</em> = &minus;<em>p</em> log<sub>2</sub>(<em>p</em>)
          &minus; (1 &minus; <em>p</em>) log<sub>2</sub>(1 &minus; <em>p</em>),
          which peaks at <em>p</em> = 0.5 with a value of 1 bit.
        </li>
      </ul>
      <MathBlock
        latex="H_{\text{binary}}(p) = -p\log_2(p) - (1-p)\log_2(1-p)"
        display
      />

      <h2>Information Gain</h2>
      <p>
        <strong>Information gain</strong> measures how much a split reduces
        entropy. If we split dataset <em>S</em> on feature <em>A</em> into
        subsets <em>S<sub>1</sub></em>, <em>S<sub>2</sub></em>, ..., then:
      </p>
      <MathBlock
        latex="\text{IG}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|} H(S_v)"
        display
      />
      <p>
        The second term is the weighted average entropy after the split. We
        choose the feature <em>A</em> that maximizes information gain &mdash;
        the one that reduces uncertainty the most.
      </p>

      <h2>Gini Impurity: An Alternative Criterion</h2>
      <p>
        An alternative to entropy is <strong>Gini impurity</strong>, used in
        the CART algorithm (Classification and Regression Trees):
      </p>
      <MathBlock
        latex="G(S) = 1 - \sum_{c=1}^{C} p_c^2"
        display
      />
      <p>
        Gini impurity measures the probability that a randomly chosen element
        would be misclassified if randomly labeled according to the
        distribution. Like entropy, it is 0 for pure nodes and maximized for
        uniform distributions. In practice, Gini and entropy produce very
        similar trees &mdash; the choice rarely matters.
      </p>

      <h2>Building a Decision Tree: Weather Dataset</h2>
      <StepByStep
        title="Build a decision tree: Should we play tennis today?"
        steps={[
          {
            title: "The dataset",
            content:
              "We have 14 days of weather data with features Outlook (Sunny/Overcast/Rain), Temperature (Hot/Mild/Cool), Humidity (High/Normal), and Wind (Weak/Strong). The label is Play Tennis (Yes/No). Of 14 days: 9 Yes, 5 No.",
            latex: "H(S) = -\\frac{9}{14}\\log_2\\frac{9}{14} - \\frac{5}{14}\\log_2\\frac{5}{14} \\approx 0.940 \\text{ bits}",
          },
          {
            title: "Evaluate splitting on Outlook",
            content:
              "Sunny: 5 days (2 Yes, 3 No) → H = 0.971. Overcast: 4 days (4 Yes, 0 No) → H = 0. Rain: 5 days (3 Yes, 2 No) → H = 0.971.",
            latex: "H_{\\text{after}} = \\frac{5}{14}(0.971) + \\frac{4}{14}(0) + \\frac{5}{14}(0.971) = 0.693",
          },
          {
            title: "Compute information gain for Outlook",
            content: "Information gain is the reduction in entropy after splitting.",
            latex: "\\text{IG}(S, \\text{Outlook}) = 0.940 - 0.693 = 0.247 \\text{ bits}",
          },
          {
            title: "Compare with other features",
            content:
              "Similarly compute: IG(Temperature) ≈ 0.029, IG(Humidity) ≈ 0.152, IG(Wind) ≈ 0.048. Outlook has the highest information gain (0.247), so it becomes the root node.",
          },
          {
            title: "Recurse on subtrees",
            content:
              "For the Overcast branch: all 4 examples are Yes → leaf node (Play = Yes). For Sunny and Rain branches: recurse and find the next best split. Sunny splits best on Humidity; Rain splits best on Wind.",
          },
          {
            title: "The final tree",
            content:
              "Root: Outlook? → Sunny: Humidity? (High→No, Normal→Yes). Overcast → Yes. Rain: Wind? (Strong→No, Weak→Yes). This tree correctly classifies all 14 training examples.",
          },
        ]}
      />

      <h2>The ID3 and CART Algorithms</h2>
      <p>
        The procedure above is the <strong>ID3 algorithm</strong> (Iterative
        Dichotomiser 3): at each node, choose the feature with the highest
        information gain, split, and recurse. <strong>CART</strong> uses Gini
        impurity and always creates binary splits (for continuous features, it
        finds the best threshold).
      </p>
      <p>
        Both algorithms are <strong>greedy</strong>: they make the locally
        optimal choice at each node without considering the global tree
        structure. This does not guarantee the globally optimal tree (that
        problem is NP-hard), but it works remarkably well in practice.
      </p>

      <h2>Pruning: Preventing Overfitting</h2>
      <p>
        A fully grown decision tree can have one leaf per training example,
        achieving 100% training accuracy. But this is extreme overfitting
        &mdash; the tree memorizes every quirk of the training data, including
        noise.
      </p>
      <p>
        <strong>Pruning</strong> combats this by simplifying the tree:
      </p>
      <ul>
        <li>
          <strong>Pre-pruning (early stopping):</strong> Stop growing the tree
          when a split does not sufficiently improve the criterion, or when a
          node has fewer than a minimum number of examples, or when the tree
          reaches a maximum depth.
        </li>
        <li>
          <strong>Post-pruning:</strong> Grow the full tree, then remove
          subtrees that do not improve validation accuracy. Replace each pruned
          subtree with a leaf labeled by the majority class.
        </li>
      </ul>
      <p>
        The depth of the tree directly controls the bias-variance tradeoff.
        Shallow trees have high bias (underfitting); deep trees have high
        variance (overfitting). This is a theme we will revisit in the
        Bias-Variance Tradeoff lesson.
      </p>

      <RevealAnswer label="Why are deep trees prone to overfitting?">
        <p>
          A deep tree creates very specific, narrow regions in feature space.
          Each leaf might correspond to just a handful of training examples.
          The predictions in these tiny regions are based on very little data,
          so they are heavily influenced by noise.
        </p>
        <p>
          Consider the extreme: a tree so deep that each leaf contains exactly
          one training example. It has zero training error but will perform
          terribly on new data because it has essentially memorized the training
          set. The decision boundaries will be jagged and complex, fitting
          random noise rather than the true underlying pattern.
        </p>
        <p>
          By contrast, a shallow tree (e.g., depth 2) makes broad, simple
          decisions based on many examples per leaf, giving smoother and more
          generalizable predictions. The art is finding the right depth.
        </p>
      </RevealAnswer>

      <h2>Implementation: A Simple Decision Tree</h2>
      <CodeEditor
        language="python"
        description="Building a decision tree classifier with scikit-learn and examining its structure."
        initialCode={`from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Generate synthetic data
X, y = make_classification(
    n_samples=200, n_features=4, n_informative=3,
    n_redundant=1, random_state=42
)

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Train decision trees with different depths
for max_depth in [1, 3, 5, None]:  # None = no limit
    tree = DecisionTreeClassifier(max_depth=max_depth, random_state=42)
    tree.fit(X_train, y_train)

    train_acc = accuracy_score(y_train, tree.predict(X_train))
    test_acc = accuracy_score(y_test, tree.predict(X_test))

    depth_str = str(max_depth) if max_depth else "unlimited"
    print(f"Depth {depth_str:>9}: "
          f"Train acc = {train_acc:.3f}, "
          f"Test acc = {test_acc:.3f}, "
          f"Nodes = {tree.tree_.node_count}")

# Note: as depth increases, train accuracy rises but
# test accuracy may drop — this is overfitting!`}
        solution={`from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Generate synthetic data
X, y = make_classification(
    n_samples=200, n_features=4, n_informative=3,
    n_redundant=1, random_state=42
)

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Train decision trees with different depths
for max_depth in [1, 3, 5, None]:  # None = no limit
    tree = DecisionTreeClassifier(max_depth=max_depth, random_state=42)
    tree.fit(X_train, y_train)

    train_acc = accuracy_score(y_train, tree.predict(X_train))
    test_acc = accuracy_score(y_test, tree.predict(X_test))

    depth_str = str(max_depth) if max_depth else "unlimited"
    print(f"Depth {depth_str:>9}: "
          f"Train acc = {train_acc:.3f}, "
          f"Test acc = {test_acc:.3f}, "
          f"Nodes = {tree.tree_.node_count}")

# Typical output:
# Depth         1: Train acc = 0.871, Test acc = 0.883, Nodes = 3
# Depth         3: Train acc = 0.936, Test acc = 0.917, Nodes = 13
# Depth         5: Train acc = 0.979, Test acc = 0.917, Nodes = 27
# Depth unlimited: Train acc = 1.000, Test acc = 0.883, Nodes = 29
# Notice: unlimited depth overfits (perfect train, lower test)`}
      />

      <h2>Decision Trees and Feature Importance</h2>
      <p>
        A practical advantage of decision trees is <strong>interpretability</strong>.
        You can trace exactly why the model made a prediction by following the
        path from root to leaf. Features that appear higher in the tree
        (closer to the root) are more important &mdash; they split the data
        most effectively.
      </p>
      <p>
        Feature importance can be quantified as the total information gain
        (or Gini reduction) provided by splits on that feature across the
        entire tree. This gives a ranking of which features matter most for
        prediction.
      </p>

      <h2>Connection to Ensemble Methods</h2>
      <p>
        Individual decision trees are fast and interpretable but can be
        unstable &mdash; small changes in data can produce very different
        trees. <strong>Random Forests</strong> and <strong>Gradient Boosted
        Trees</strong> (like XGBoost) address this by combining many trees:
      </p>
      <ul>
        <li>
          <strong>Random Forest:</strong> Train many trees on random subsets of
          data and features, then average (or vote). This reduces variance.
        </li>
        <li>
          <strong>Gradient Boosting:</strong> Train trees sequentially, where
          each new tree corrects the errors of the ensemble so far. This
          reduces bias.
        </li>
      </ul>
      <p>
        These ensemble methods are among the most successful ML algorithms in
        practice, winning many Kaggle competitions and powering real-world
        systems at scale.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="dtree-q1"
        question="A dataset has 50 positive and 50 negative examples. What is the entropy of this dataset?"
        options={[
          { text: "0 bits", feedback: "Entropy is 0 only when all examples belong to one class (pure set). A 50/50 split is the opposite — maximum uncertainty." },
          { text: "0.5 bits", feedback: "For binary entropy, H = -0.5 log₂(0.5) - 0.5 log₂(0.5) = -0.5(-1) - 0.5(-1) = 1 bit, not 0.5." },
          { text: "1 bit", feedback: "Correct! H = -0.5 log₂(0.5) - 0.5 log₂(0.5) = -(0.5)(-1) - (0.5)(-1) = 0.5 + 0.5 = 1 bit. A 50/50 split has maximum binary entropy — maximum uncertainty." },
          { text: "2 bits", feedback: "The maximum entropy for binary classification is 1 bit, not 2. Two bits would be the maximum for 4 equally likely classes." },
        ]}
        correctIndex={2}
        hint="Compute H = -p log₂(p) - (1-p) log₂(1-p) with p = 0.5. Remember that log₂(0.5) = -1."
        explanation="With p = 0.5: H = -0.5·(-1) - 0.5·(-1) = 1 bit. This is maximum binary entropy. Intuitively, a coin flip carries 1 bit of information — you need exactly one yes/no question to determine the outcome."
      />

      <InteractiveQuestion
        id="dtree-q2"
        question="After splitting a dataset on Feature A, subset 1 has all positive examples and subset 2 has a mix. What can you say about the entropy of subset 1?"
        options={[
          { text: "H = 1 (maximum entropy)", feedback: "Maximum entropy occurs when classes are evenly mixed. A pure subset is the opposite." },
          { text: "H = 0 (zero entropy)", feedback: "Correct! A subset containing only positive examples is perfectly pure — there is no uncertainty about the class. H = -1·log₂(1) = 0. This is the ideal outcome of a split." },
          { text: "H depends on the size of the subset", feedback: "Entropy depends on the class proportions, not the absolute size. A subset that is 100% positive has entropy 0 regardless of size." },
          { text: "Cannot determine without more information", feedback: "We know all examples are positive, which is enough. H = -1·log₂(1) - 0·log₂(0) = 0." },
        ]}
        correctIndex={1}
        hint="If all examples in a subset belong to one class, what is the uncertainty about the class of a random element?"
        explanation="A pure subset (100% one class) has zero entropy — there is no uncertainty. H = -1·log₂(1) = 0. This is the best possible outcome for a split: one child is completely pure. The information gain from this split will be high."
      />
    </div>
  );
}
