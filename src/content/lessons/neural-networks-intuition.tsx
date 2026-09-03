"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function NeuralNetworksIntuition() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>From Biology to Computation</h2>
      <p>
        The human brain contains roughly 86 billion neurons, each connected to
        thousands of others through synapses. A neuron receives electrical
        signals from its input connections, integrates them, and fires an
        output signal if the combined input exceeds a threshold. This simple
        mechanism, repeated billions of times, gives rise to thought,
        perception, and intelligence.
      </p>
      <p>
        <strong>Artificial neural networks</strong> are a vastly simplified
        mathematical model of this biological process. Each artificial neuron
        computes a weighted sum of its inputs, adds a bias, and passes the
        result through a nonlinear <strong>activation function</strong>. Despite
        the simplification, these networks are extraordinarily powerful &mdash;
        they can approximate any continuous function to arbitrary precision.
      </p>
      <p>
        This lesson builds your intuition for how neural networks work. We will
        connect every concept back to the linear algebra and calculus you
        already know, because neural networks are, at their core, compositions
        of linear transformations and nonlinear activations.
      </p>

      <h2>The Perceptron: A Single Artificial Neuron</h2>
      <p>
        The simplest neural network is a single neuron, called a{" "}
        <strong>perceptron</strong>. Given input features{" "}
        <strong>x</strong> = (<em>x</em><sub>1</sub>, <em>x</em><sub>2</sub>, ..., <em>x</em><sub>d</sub>),
        weights <strong>w</strong>, and bias <em>b</em>:
      </p>
      <MathBlock
        latex="z = \mathbf{w}^\top \mathbf{x} + b = \sum_{j=1}^{d} w_j x_j + b"
        display
      />
      <MathBlock
        latex="a = \phi(z)"
        display
      />
      <p>
        The first step is a <strong>linear transformation</strong> &mdash; a
        dot product plus bias. This is exactly what you studied in linear
        algebra: the vector <strong>w</strong> defines a direction, and the dot
        product measures how much the input aligns with that direction.
      </p>
      <p>
        The second step applies an <strong>activation function</strong>{" "}
        &phi; to introduce nonlinearity. Without the activation, stacking
        multiple linear layers would still produce a linear transformation
        (since the composition of linear functions is linear). The activation
        function is what gives neural networks their power.
      </p>

      <h2>Activation Functions</h2>
      <p>
        Several activation functions are commonly used, each with different
        properties:
      </p>

      <h3>Sigmoid</h3>
      <MathBlock
        latex="\sigma(z) = \frac{1}{1 + e^{-z}} \quad \text{Range: } (0, 1)"
        display
      />
      <p>
        You already know this from logistic regression. It squashes any input
        to (0, 1). Historically popular, but it suffers from the{" "}
        <strong>vanishing gradient problem</strong>: for large |<em>z</em>|,
        the derivative is nearly 0, which slows learning in deep networks.
      </p>

      <h3>Tanh</h3>
      <MathBlock
        latex="\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} \quad \text{Range: } (-1, 1)"
        display
      />
      <p>
        A rescaled sigmoid: tanh(<em>z</em>) = 2&sigma;(2<em>z</em>) &minus; 1.
        It is zero-centered, which often helps training converge faster. But it
        still has the vanishing gradient problem.
      </p>

      <h3>ReLU (Rectified Linear Unit)</h3>
      <MathBlock
        latex="\text{ReLU}(z) = \max(0, z) \quad \text{Range: } [0, \infty)"
        display
      />
      <p>
        The workhorse of modern deep learning. ReLU is dead simple: output{" "}
        <em>z</em> if positive, 0 otherwise. It does not saturate for positive
        inputs (gradient is always 1), which dramatically speeds up training.
        The kink at <em>z</em> = 0 is not differentiable in the classical sense,
        but it works perfectly in practice with a subgradient of 0 or 1.
      </p>

      <h3>Visualize ReLU</h3>
      <GraphPlayground
        equation="Math.max(0, x)"
        xRange={[-5, 5]}
        yRange={[-1, 5]}
        interactive
        showGrid
        color="#10b981"
      />

      <h2>Explore: How a Perceptron Works</h2>
      <p>
        Adjust the weights and bias below to see how a single perceptron
        (with a sigmoid activation) responds to a single input. The output
        is &sigma;(<em>wx</em> + <em>b</em>). Notice how <em>w</em> controls
        the steepness and <em>b</em> shifts the transition point.
      </p>
      <SliderExploration
        title="Single Perceptron Explorer"
        description="Adjust weight w and bias b of a perceptron with sigmoid activation. Output = σ(wx + b). The weight controls sensitivity; the bias shifts the decision point."
        parameters={[
          { name: "w", label: "w (weight)", min: -5, max: 5, step: 0.1, default: 1 },
          { name: "b", label: "b (bias)", min: -5, max: 5, step: 0.1, default: 0 },
        ]}
        equation="1 / (1 + Math.exp(-(w * x + b)))"
        xRange={[-8, 8]}
        yRange={[-0.1, 1.1]}
      />

      <h2>Multi-Layer Networks</h2>
      <p>
        A single perceptron can only model linear decision boundaries (it is
        equivalent to logistic regression). To model complex, nonlinear
        patterns, we stack neurons in <strong>layers</strong>:
      </p>
      <ul>
        <li>
          <strong>Input layer:</strong> Receives the feature vector{" "}
          <strong>x</strong> &isin; &real;<sup>d</sup>. No computation happens
          here &mdash; it just passes data forward.
        </li>
        <li>
          <strong>Hidden layers:</strong> One or more layers of neurons. Each
          neuron in a hidden layer takes inputs from all neurons in the
          previous layer. These layers learn intermediate representations
          &mdash; features of features.
        </li>
        <li>
          <strong>Output layer:</strong> Produces the final prediction. For
          binary classification, one neuron with sigmoid. For multi-class,
          multiple neurons with softmax. For regression, one neuron with no
          activation.
        </li>
      </ul>
      <p>
        The computation in each layer is a matrix multiplication followed by
        an activation:
      </p>
      <MathBlock
        latex="\mathbf{h}^{(l)} = \phi\big(\mathbf{W}^{(l)} \mathbf{h}^{(l-1)} + \mathbf{b}^{(l)}\big)"
        display
      />
      <p>
        Here <strong>W</strong><sup>(<em>l</em>)</sup> is the weight matrix for
        layer <em>l</em> (from linear algebra: a linear transformation), and
        &phi; is applied element-wise. The weight matrix maps the previous
        layer&apos;s output to the current layer&apos;s pre-activation values.
        If layer <em>l</em> &minus; 1 has <em>m</em> neurons and layer{" "}
        <em>l</em> has <em>n</em> neurons, then{" "}
        <strong>W</strong><sup>(<em>l</em>)</sup> is an <em>n &times; m</em>{" "}
        matrix &mdash; exactly the matrix transformations you studied.
      </p>

      <h2>The Forward Pass</h2>
      <p>
        The <strong>forward pass</strong> computes the network&apos;s output by
        propagating the input through each layer sequentially. It is a chain
        of composed functions:
      </p>
      <MathBlock
        latex="f(\mathbf{x}) = \phi_L\big(\mathbf{W}^{(L)} \cdot \phi_{L-1}\big(\mathbf{W}^{(L-1)} \cdots \phi_1(\mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}) \cdots + \mathbf{b}^{(L-1)}\big) + \mathbf{b}^{(L)}\big)"
        display
      />
      <p>
        This composition of linear transformations and nonlinear activations
        is what makes neural networks so powerful. Each layer transforms the
        representation of the data, making it progressively easier for the
        final layer to make a good prediction.
      </p>

      <h2>Walkthrough: Forward Pass Through a 2-Layer Network</h2>
      <StepByStep
        title="Forward pass: input (1, 0.5) through a network with 2 hidden neurons and 1 output"
        steps={[
          {
            title: "Define the network",
            content:
              "Input: x = (1, 0.5). Hidden layer: 2 neurons with ReLU activation. Output layer: 1 neuron with sigmoid. Weights and biases given below.",
            latex:
              "\\mathbf{W}^{(1)} = \\begin{pmatrix} 0.3 & 0.7 \\\\ -0.5 & 0.4 \\end{pmatrix}, \\; \\mathbf{b}^{(1)} = \\begin{pmatrix} 0.1 \\\\ -0.2 \\end{pmatrix}, \\; \\mathbf{W}^{(2)} = \\begin{pmatrix} 0.6 & -0.8 \\end{pmatrix}, \\; b^{(2)} = 0.1",
          },
          {
            title: "Hidden layer: linear combination",
            content: "Compute z = W¹x + b¹ using matrix-vector multiplication.",
            latex:
              "\\mathbf{z}^{(1)} = \\begin{pmatrix}0.3 & 0.7 \\\\ -0.5 & 0.4\\end{pmatrix}\\begin{pmatrix}1\\\\0.5\\end{pmatrix} + \\begin{pmatrix}0.1\\\\-0.2\\end{pmatrix} = \\begin{pmatrix}0.65+0.1\\\\-0.3-0.2\\end{pmatrix} = \\begin{pmatrix}0.75\\\\-0.5\\end{pmatrix}",
          },
          {
            title: "Hidden layer: apply ReLU",
            content: "Apply ReLU element-wise: max(0, z).",
            latex:
              "\\mathbf{h}^{(1)} = \\text{ReLU}\\begin{pmatrix}0.75\\\\-0.5\\end{pmatrix} = \\begin{pmatrix}0.75\\\\0\\end{pmatrix}",
          },
          {
            title: "Output layer: linear combination",
            content: "Compute z² = W²h¹ + b².",
            latex:
              "z^{(2)} = \\begin{pmatrix}0.6 & -0.8\\end{pmatrix}\\begin{pmatrix}0.75\\\\0\\end{pmatrix} + 0.1 = 0.45 + 0 + 0.1 = 0.55",
          },
          {
            title: "Output layer: apply sigmoid",
            content: "Apply sigmoid to get the final prediction.",
            latex:
              "\\hat{y} = \\sigma(0.55) = \\frac{1}{1 + e^{-0.55}} \\approx 0.634",
          },
          {
            title: "Interpret the output",
            content:
              "The network outputs 0.634, meaning it assigns a 63.4% probability to class 1. Notice how the second hidden neuron 'died' (ReLU output was 0) — this is the sparsity property of ReLU, which acts as automatic feature selection.",
          },
        ]}
      />

      <h2>The Universal Approximation Theorem</h2>
      <p>
        Why should we believe that neural networks can learn complex patterns?
        The <strong>universal approximation theorem</strong> (Cybenko, 1989)
        provides the theoretical foundation:
      </p>
      <p>
        A feedforward network with a single hidden layer containing enough
        neurons can approximate any continuous function on a compact domain to
        arbitrary accuracy.
      </p>
      <MathBlock
        latex="\forall \varepsilon > 0, \; \exists \; N, \; \mathbf{W}^{(1)}, \mathbf{b}^{(1)}, \mathbf{W}^{(2)}, b^{(2)} \text{ such that } \sup_{\mathbf{x} \in K} |f(\mathbf{x}) - \hat{f}(\mathbf{x})| < \varepsilon"
        display
      />
      <p>
        This theorem says neural networks are <strong>universal
        approximators</strong>. However, it does not tell us how to find the
        right weights (that is the job of gradient descent and
        backpropagation), nor does it say how many neurons are needed (it could
        be astronomically many). Deep networks (many layers) are often vastly
        more efficient than wide, shallow networks for the same task &mdash;
        a key insight behind deep learning.
      </p>

      <RevealAnswer label="Why do deep networks work better than wide, shallow ones?">
        <p>
          Deep networks build <strong>hierarchical representations</strong>.
          Each layer transforms the input into a progressively more abstract
          representation:
        </p>
        <ul>
          <li>
            In image recognition: early layers detect edges, middle layers
            detect textures and parts, deep layers detect objects.
          </li>
          <li>
            In language: early layers capture word patterns, middle layers
            capture phrases, deep layers capture meaning.
          </li>
        </ul>
        <p>
          This compositionality mirrors how complex functions can be built
          from simpler ones. A function that takes O(2<sup>n</sup>) neurons in
          a shallow network might be represented with O(n) neurons in a deep
          one, because each layer reuses the computations of the previous
          layer. This exponential efficiency gap is why depth matters.
        </p>
        <p>
          Mathematically, deep networks can represent certain function classes
          with exponentially fewer parameters than shallow networks. This is
          connected to the tensor decomposition ideas from linear algebra.
        </p>
      </RevealAnswer>

      <h2>Backpropagation: Training the Network</h2>
      <p>
        How do we find the right weights? We use gradient descent, just as
        before. The challenge is computing the gradient of the loss with
        respect to every weight in every layer. This is done by{" "}
        <strong>backpropagation</strong> &mdash; an efficient algorithm based
        on the chain rule from calculus:
      </p>
      <MathBlock
        latex="\frac{\partial \mathcal{L}}{\partial w_{ij}^{(l)}} = \frac{\partial \mathcal{L}}{\partial z_i^{(l)}} \cdot \frac{\partial z_i^{(l)}}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot h_j^{(l-1)}"
        display
      />
      <p>
        The &ldquo;error signal&rdquo; &delta; propagates backward through the
        network, layer by layer. This is the chain rule applied to the
        composition of functions that defines the network. The gradient for
        each weight depends on the local input (from the forward pass) and the
        backpropagated error (from the loss).
      </p>
      <p>
        The entire training loop is: (1) forward pass to compute predictions,
        (2) compute loss, (3) backward pass to compute gradients, (4) update
        weights. Repeat for many epochs over the training data.
      </p>

      <h2>Putting It All Together</h2>
      <MathBlock
        latex="\text{Data } \xrightarrow{\text{forward pass}} \text{Predictions } \xrightarrow{\text{loss}} \text{Error } \xrightarrow{\text{backprop}} \text{Gradients } \xrightarrow{\text{update}} \text{Better weights}"
        display
      />
      <p>
        Neural networks combine three mathematical pillars:
      </p>
      <ul>
        <li>
          <strong>Linear algebra:</strong> Matrix multiplications transform
          data between layers. Weight matrices define linear maps.
          Eigenanalysis explains training dynamics.
        </li>
        <li>
          <strong>Calculus:</strong> The chain rule enables backpropagation.
          Gradient descent optimizes the loss. Taylor expansions justify
          learning rate schedules.
        </li>
        <li>
          <strong>Probability:</strong> Loss functions are derived from maximum
          likelihood. Dropout regularization has a Bayesian interpretation.
          The output layer produces probability distributions.
        </li>
      </ul>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="nn-q1"
        question="Why are activation functions essential in neural networks?"
        options={[
          { text: "They speed up the matrix multiplications", feedback: "Activation functions add computation, not reduce it. Their role is about expressiveness, not speed." },
          { text: "Without them, stacking layers would still produce only a linear function", feedback: "Correct! A composition of linear functions is still linear: W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂) = W'x + b'. Without nonlinear activations, depth adds no representational power — a 100-layer network would be equivalent to a single-layer one." },
          { text: "They normalize the outputs to be between 0 and 1", feedback: "Only sigmoid does that. ReLU outputs can be any non-negative number. The key role of activations is introducing nonlinearity." },
          { text: "They prevent the network from memorizing training data", feedback: "Activations do not prevent overfitting — that is the role of regularization. Activations provide nonlinearity for expressiveness." },
        ]}
        correctIndex={1}
        hint="What is the composition of two linear functions? Is it linear or nonlinear?"
        explanation="The composition of linear maps is linear: f(x) = Ax + b and g(x) = Cx + d gives g(f(x)) = C(Ax+b)+d = (CA)x + (Cb+d), which is still linear. Without activations, no matter how many layers you stack, the network can only represent linear functions. Activation functions break this linearity, enabling the network to approximate any continuous function."
      />

      <InteractiveQuestion
        id="nn-q2"
        question="In the forward pass, what is ReLU(−3)?"
        options={[
          { text: "−3", feedback: "ReLU clips negative values to 0. It does not pass negative numbers through." },
          { text: "3", feedback: "ReLU is not the absolute value function. It returns 0 for negative inputs." },
          { text: "0", feedback: "Correct! ReLU(z) = max(0, z). Since −3 < 0, the output is 0. The neuron is 'inactive' or 'dead' for this input. This sparsity property means only a subset of neurons fire for any given input, which is computationally efficient and acts as a form of feature selection." },
          { text: "1", feedback: "That would be the Heaviside step function. ReLU returns 0 for negative inputs, not 1." },
        ]}
        correctIndex={2}
        hint="ReLU(z) = max(0, z). What is max(0, -3)?"
        explanation="ReLU(−3) = max(0, −3) = 0. The ReLU function passes positive values unchanged and maps all negative values to 0. This creates sparsity: for any given input, many neurons output 0, meaning only a subset of the network is 'active.' This is both computationally efficient and empirically beneficial for learning."
      />

      <InteractiveQuestion
        id="nn-q3"
        question="A network has an input layer with 784 neurons, a hidden layer with 128 neurons, and an output layer with 10 neurons. How many learnable weights are in the weight matrices (excluding biases)?"
        options={[
          { text: "784 + 128 + 10 = 922", feedback: "Those are the number of neurons, not the number of weights. Weights connect neurons between layers." },
          { text: "784 × 128 + 128 × 10 = 101,632", feedback: "Correct! Each connection between layers has a weight. Layer 1→2: 784×128 = 100,352 weights. Layer 2→3: 128×10 = 1,280 weights. Total: 101,632. Each weight matrix has dimensions (output_neurons × input_neurons), just like a linear transformation matrix." },
          { text: "784 × 128 × 10 = 1,003,520", feedback: "Weights are per connection between adjacent layers, not all three layers multiplied together." },
          { text: "128 × 10 = 1,280", feedback: "You counted only the weights between the hidden and output layers. Don't forget the 784×128 weights between input and hidden layers." },
        ]}
        correctIndex={1}
        hint="Each weight matrix W^(l) has shape (neurons in layer l) × (neurons in layer l-1)."
        explanation="The weight matrix between the input (784) and hidden (128) layers has 784 × 128 = 100,352 entries. The weight matrix between hidden (128) and output (10) has 128 × 10 = 1,280 entries. Total: 101,632 weights. This is why a network for MNIST digit classification (784 input pixels, 10 output classes) has over 100,000 parameters — and that is a small network!"
      />
    </div>
  );
}
