"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function WhatIsML() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Machines That Learn from Data</h2>
      <p>
        Imagine you need to build a program that recognizes handwritten digits.
        You could try writing explicit rules: &ldquo;if the top half has a loop
        and the bottom is a vertical stroke, it is a 9.&rdquo; But handwriting
        varies wildly &mdash; thick strokes, thin strokes, slanted, tiny, huge.
        Writing rules for every possible variation is essentially impossible.
      </p>
      <p>
        <strong>Machine learning</strong> takes a fundamentally different
        approach. Instead of programming rules, you provide <em>examples</em>.
        Show the computer thousands of handwritten &ldquo;9&rdquo;s labeled as
        9, thousands of &ldquo;3&rdquo;s labeled as 3, and so on. The algorithm
        discovers the patterns itself. This is the core paradigm: rather than
        telling the machine <em>how</em> to solve a problem, you give it data
        and let it <em>learn</em> the solution.
      </p>
      <p>
        More formally, Arthur Samuel defined machine learning as the field of
        study that gives computers the ability to learn without being explicitly
        programmed. Tom Mitchell later gave a precise definition:
      </p>
      <MathBlock
        latex="\text{A program learns from experience } E \text{ w.r.t. task } T \text{ and measure } P \text{ if its performance on } T \text{, as measured by } P \text{, improves with } E."
        display
      />
      <p>
        For a spam filter: <em>T</em> = classify emails as spam or not spam,
        <em> E</em> = a dataset of labeled emails, <em>P</em> = fraction of
        emails correctly classified.
      </p>

      <h2>The Three Pillars of Machine Learning</h2>
      <p>
        Machine learning algorithms are broadly categorized by the type of
        feedback they receive during training. Understanding these categories is
        the first step to choosing the right tool for any problem.
      </p>

      <h3>Supervised Learning</h3>
      <p>
        In <strong>supervised learning</strong>, each training example comes with
        a correct answer &mdash; a <em>label</em>. The algorithm learns a
        mapping from inputs (features) to outputs (labels). Think of a student
        studying with an answer key: for each practice problem, they can check
        whether they got it right and adjust.
      </p>
      <p>
        Examples: predicting house prices from square footage (regression),
        classifying emails as spam or not (classification), diagnosing diseases
        from medical images. The key ingredient is <em>labeled data</em>.
      </p>
      <MathBlock
        latex="\text{Training set: } \{(\mathbf{x}_1, y_1), (\mathbf{x}_2, y_2), \ldots, (\mathbf{x}_n, y_n)\}"
        display
      />
      <p>
        Here each <strong>x</strong> is a feature vector (the inputs) and each
        <em> y</em> is the label (the desired output). The goal is to find a
        function <em>f</em> such that <em>f</em>(<strong>x</strong>) &asymp; <em>y</em> for
        new, unseen examples.
      </p>

      <h3>Unsupervised Learning</h3>
      <p>
        In <strong>unsupervised learning</strong>, there are no labels. The
        algorithm must discover structure in the data on its own. Think of
        organizing a messy closet: nobody tells you the categories &mdash; you
        group similar items together by noticing patterns yourself.
      </p>
      <p>
        Examples: clustering customers into segments, reducing the
        dimensionality of data (like PCA, which you studied in linear algebra),
        anomaly detection, and topic modeling in text.
      </p>

      <h3>Reinforcement Learning</h3>
      <p>
        In <strong>reinforcement learning</strong>, an agent interacts with an
        environment and receives rewards or penalties for its actions. There is
        no explicit answer key &mdash; just a signal indicating how well the
        agent is doing. The agent learns to maximize cumulative reward through
        trial and error.
      </p>
      <p>
        Examples: a robot learning to walk, an AI playing chess or Go,
        autonomous driving, and recommendation systems that adapt based on user
        clicks.
      </p>

      <h2>Training Data: Features and Labels</h2>
      <p>
        The quality and structure of your data determine the ceiling of what any
        ML model can achieve. Two key concepts:
      </p>
      <ul>
        <li>
          <strong>Features</strong> (inputs): measurable properties of each data
          point. For a house price predictor, features might include square
          footage, number of bedrooms, zip code, and age of the house. Each data
          point is represented as a vector{" "}
          <strong>x</strong> &isin; &real;<sup>d</sup>, where <em>d</em> is the
          number of features. This is exactly the vector space you studied in
          linear algebra.
        </li>
        <li>
          <strong>Labels</strong> (outputs): the quantity or category we want to
          predict. For regression, this is a real number; for classification, a
          discrete category.
        </li>
      </ul>
      <MathBlock
        latex="\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_d \end{pmatrix} \in \mathbb{R}^d, \quad y \in \mathbb{R} \text{ (regression) or } y \in \{0, 1, \ldots, K\} \text{ (classification)}"
        display
      />
      <p>
        In matrix form, the entire training set can be organized as a design
        matrix <strong>X</strong> of shape <em>n &times; d</em> and a label
        vector <strong>y</strong> of length <em>n</em>. This connection to
        linear algebra is not a coincidence &mdash; it is the foundation upon
        which most ML algorithms are built.
      </p>

      <h2>The ML Pipeline</h2>
      <p>
        Every ML project follows a similar workflow, regardless of the specific
        algorithm:
      </p>
      <StepByStep
        title="The Machine Learning Pipeline"
        steps={[
          {
            title: "1. Collect and prepare data",
            content:
              "Gather raw data, clean it (handle missing values, outliers), and split into training, validation, and test sets. Typically: 70% train, 15% validation, 15% test.",
          },
          {
            title: "2. Extract features",
            content:
              "Transform raw data into numerical feature vectors. This might involve normalization, encoding categorical variables, or engineering new features from existing ones.",
          },
          {
            title: "3. Choose and train a model",
            content:
              "Select an algorithm (linear regression, decision tree, neural network, etc.) and train it on the training data. The model adjusts its parameters to minimize a loss function.",
            latex: "\\hat{\\theta} = \\arg\\min_\\theta \\mathcal{L}(\\theta; \\mathbf{X}, \\mathbf{y})",
          },
          {
            title: "4. Evaluate on validation data",
            content:
              "Measure performance on held-out data the model has never seen. This estimates how well the model will generalize to truly new data.",
          },
          {
            title: "5. Iterate and improve",
            content:
              "Based on validation performance, tune hyperparameters, try different features, or switch algorithms. Only test on the test set once at the very end.",
          },
          {
            title: "6. Deploy and monitor",
            content:
              "Put the model into production. Monitor its performance over time, since real-world data distributions can shift.",
          },
        ]}
      />

      <h2>Overfitting vs. Underfitting</h2>
      <p>
        The fundamental tension in machine learning is between fitting the
        training data well and generalizing to new data. Two failure modes arise:
      </p>
      <p>
        <strong>Underfitting</strong> occurs when the model is too simple to
        capture the underlying pattern. Imagine trying to fit a straight line to
        data that follows a quadratic curve. The model performs poorly on both
        training and test data. The model has <em>high bias</em> &mdash; it is
        making strong assumptions that do not match reality.
      </p>
      <p>
        <strong>Overfitting</strong> occurs when the model is too complex and
        memorizes the training data, including its noise and quirks, rather than
        learning the true pattern. A polynomial of degree 100 can pass through
        every training point perfectly, but it will oscillate wildly between
        points and fail on new data. The model has <em>high variance</em>{" "}
        &mdash; small changes in training data cause large changes in the
        model.
      </p>
      <MathBlock
        latex="\text{Underfitting: } E_{\text{train}} \text{ high}, \; E_{\text{test}} \text{ high} \qquad \text{Overfitting: } E_{\text{train}} \text{ low}, \; E_{\text{test}} \text{ high}"
        display
      />
      <p>
        The sweet spot is a model complex enough to capture the real pattern but
        not so complex that it memorizes noise. We will explore this tradeoff in
        depth in the Bias-Variance Tradeoff lesson.
      </p>

      <h2>Walkthrough: Building a Spam Classifier</h2>
      <StepByStep
        title="Spam Classifier: From Data to Predictions"
        steps={[
          {
            title: "Define the task",
            content:
              "Given an email, classify it as 'spam' or 'not spam' (ham). This is a supervised binary classification problem.",
          },
          {
            title: "Collect labeled data",
            content:
              "Gather thousands of emails, each labeled as spam or ham by human annotators. For example, 5,000 spam emails and 5,000 ham emails.",
          },
          {
            title: "Extract features",
            content:
              "Convert each email into a numerical vector. One approach: count how many times each word in a vocabulary appears. An email becomes a vector of word counts. If our vocabulary has 10,000 words, each email is a vector in R^10000.",
            latex: "\\mathbf{x} = (\\text{count}_{\\text{free}}, \\text{count}_{\\text{click}}, \\text{count}_{\\text{meeting}}, \\ldots) \\in \\mathbb{R}^{10000}",
          },
          {
            title: "Train a model",
            content:
              "Feed the feature vectors and labels into an algorithm (say, logistic regression). The model learns which words are strong indicators of spam (e.g., 'free', 'winner', 'click here') and which indicate ham (e.g., 'meeting', 'project', 'deadline').",
          },
          {
            title: "Make predictions",
            content:
              "For a new email, compute its feature vector, pass it through the trained model, and get a prediction: spam or ham. The model might output a probability, like 0.97 spam, and we classify based on a threshold.",
            latex: "P(\\text{spam} \\mid \\mathbf{x}) = 0.97 > 0.5 \\implies \\text{classify as spam}",
          },
        ]}
      />

      <h2>Why Not Just Write Rules?</h2>
      <RevealAnswer label="Think about it, then reveal the answer">
        <p>
          Rule-based systems fail for several reasons:
        </p>
        <ul>
          <li>
            <strong>Complexity:</strong> The number of rules explodes. Spam
            evolves constantly &mdash; new words, new tricks, new patterns.
            Maintaining rules becomes intractable.
          </li>
          <li>
            <strong>Brittleness:</strong> Hard-coded rules do not generalize.
            A rule like &ldquo;if email contains &apos;free money&apos;, it is
            spam&rdquo; misses emails that say &ldquo;fr3e m0ney&rdquo; or
            &ldquo;complimentary funds.&rdquo;
          </li>
          <li>
            <strong>Adaptability:</strong> ML models can be retrained on new
            data as patterns change. Rules must be manually updated by a human
            who understands every edge case.
          </li>
          <li>
            <strong>Subtle patterns:</strong> Some patterns are too subtle for
            humans to notice. ML can discover that a particular combination of
            sender domain, time of day, and formatting style is predictive,
            even if no single feature is a strong indicator alone.
          </li>
        </ul>
        <p>
          This is the power of learning from data: the machine discovers
          patterns that humans cannot easily articulate as rules.
        </p>
      </RevealAnswer>

      <h2>A Glimpse at the Math</h2>
      <p>
        At its core, supervised machine learning is an optimization problem. We
        define a <strong>loss function</strong> that measures how wrong our
        model's predictions are, and then we minimize it:
      </p>
      <MathBlock
        latex="\hat{\theta} = \arg\min_\theta \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}\big(f_\theta(\mathbf{x}_i),\; y_i\big)"
        display
      />
      <p>
        Here &theta; represents the model's learnable parameters (weights and
        biases), <em>f</em><sub>&theta;</sub> is the model's prediction
        function, and <em>L</em> measures the discrepancy between predictions
        and true labels. This is where calculus becomes essential: we will use
        derivatives (gradients) to find the &theta; that minimizes the loss.
        And the data lives in a vector space, so linear algebra provides the
        language for every computation.
      </p>

      <CodeEditor
        language="python"
        description="A simple conceptual ML pipeline in Python pseudocode."
        initialCode={`# The ML mindset: learn from data, don't hardcode rules

# Step 1: Data
emails = load_emails("inbox.csv")
features = extract_word_counts(emails)  # Each email -> vector in R^d
labels = emails["is_spam"]               # 0 or 1

# Step 2: Split
X_train, X_test, y_train, y_test = train_test_split(
    features, labels, test_size=0.2
)

# Step 3: Train
model = LogisticRegression()
model.fit(X_train, y_train)  # Model learns parameters from data

# Step 4: Evaluate
accuracy = model.score(X_test, y_test)
print(f"Test accuracy: {accuracy:.2%}")

# Step 5: Predict on new email
new_email = extract_word_counts(["Congratulations! You won!"])
prediction = model.predict(new_email)
print("Spam" if prediction[0] == 1 else "Not spam")`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="ml-intro-q1"
        question="A company wants to group its customers into segments based on purchasing behavior, without predefined categories. What type of ML is this?"
        options={[
          { text: "Supervised learning", feedback: "Supervised learning requires labeled data. Here, there are no predefined categories." },
          { text: "Unsupervised learning", feedback: "Correct! Clustering customers into groups without predefined labels is a classic unsupervised learning task. The algorithm discovers the structure in the data." },
          { text: "Reinforcement learning", feedback: "There is no agent taking actions and receiving rewards here. This is about finding structure in static data." },
          { text: "Semi-supervised learning", feedback: "While semi-supervised learning exists, the problem as stated has no labels at all, making it purely unsupervised." },
        ]}
        correctIndex={1}
        hint="Are there any labels (correct answers) provided in this scenario?"
        explanation="With no predefined labels, the algorithm must discover groupings on its own. This is unsupervised learning, typically solved with clustering algorithms like K-means."
      />

      <InteractiveQuestion
        id="ml-intro-q2"
        question="A model achieves 99% accuracy on training data but only 55% on test data. What is this an example of?"
        options={[
          { text: "Underfitting", feedback: "Underfitting would show poor performance on BOTH training and test data." },
          { text: "Overfitting", feedback: "Correct! The huge gap between training accuracy (99%) and test accuracy (55%) is the hallmark of overfitting. The model memorized training data but fails to generalize." },
          { text: "A well-fitted model", feedback: "A well-fitted model would have similar (and high) accuracy on both training and test data." },
          { text: "A data collection error", feedback: "While possible, the pattern of high train / low test accuracy is the classic signature of overfitting." },
        ]}
        correctIndex={1}
        hint="Compare the training and test performance. What does a large gap between them indicate?"
        explanation="When training performance is much higher than test performance, the model has memorized the training data (including noise) rather than learning the underlying pattern. This is overfitting — high variance, low bias."
      />

      <InteractiveQuestion
        id="ml-intro-q3"
        question="In the ML pipeline, why do we split data into training, validation, and test sets instead of using all data for training?"
        options={[
          { text: "To make training faster by using less data", feedback: "While using less data does speed up training, that is not the reason for splitting. We want to use as much training data as possible." },
          { text: "To estimate how well the model generalizes to unseen data", feedback: "Correct! The validation set helps tune hyperparameters, and the test set gives a final unbiased estimate of real-world performance. Without held-out data, we cannot detect overfitting." },
          { text: "Because ML algorithms cannot handle large datasets", feedback: "Most ML algorithms can handle very large datasets. The split is about evaluation, not computational limits." },
          { text: "It is just a convention with no practical benefit", feedback: "The split is essential. Without it, you have no way to know if your model will work on new data." },
        ]}
        correctIndex={1}
        hint="What would happen if you only measured performance on the data the model was trained on?"
        explanation="A model can always memorize its training data. Held-out data reveals whether it learned genuine patterns. The validation set guides model selection, and the test set provides a final, unbiased performance estimate."
      />
    </div>
  );
}
