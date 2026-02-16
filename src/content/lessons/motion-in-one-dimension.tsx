"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function MotionInOneDimension() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Describing How Things Move</h2>
      <p>
        Before we can understand why objects move, we need a precise language for
        describing <em>how</em> they move. This branch of physics is called{" "}
        <strong>kinematics</strong> &mdash; the geometry of motion, stripped of
        any concern about forces or causes.
      </p>
      <p>
        Imagine standing on a straight road with a measuring tape stretching out
        in front of you. You mark your current spot as the <strong>origin</strong>.
        Every position along the road is now a number: positive to the right,
        negative to the left. This single number line is all we need to describe
        motion in one dimension.
      </p>

      <h2>Position and Displacement</h2>
      <p>
        <strong>Position</strong> (<em>x</em>) tells you where an object is at a
        given moment. It is a coordinate on our number line, measured in meters.
        But physics cares less about where you <em>are</em> and more about where
        you <em>went</em>. That is captured by <strong>displacement</strong>:
      </p>
      <MathBlock latex="\Delta x = x_f - x_i" display />
      <p>
        Displacement is a <em>signed</em> quantity. If you walk 5 m to the right
        and then 3 m to the left, your total distance traveled is 8 m, but your
        displacement is only +2 m. Displacement cares about the net change, not
        the winding path.
      </p>

      <h2>Velocity: The Rate of Position Change</h2>
      <p>
        How fast is the displacement happening? That question leads to{" "}
        <strong>velocity</strong>. The average velocity over a time interval is:
      </p>
      <MathBlock latex="v_{\text{avg}} = \frac{\Delta x}{\Delta t} = \frac{x_f - x_i}{t_f - t_i}" display />
      <p>
        Velocity is a vector quantity in one dimension &mdash; it carries a sign.
        Positive velocity means motion in the positive direction; negative velocity
        means motion in the negative direction. This is different from{" "}
        <strong>speed</strong>, which is always positive and tells you how fast
        you are going regardless of direction.
      </p>
      <p>
        The <strong>instantaneous velocity</strong> is the velocity at a single
        instant, obtained by shrinking the time interval to zero. If you know
        calculus, this is simply the derivative of position with respect to time:
      </p>
      <MathBlock latex="v(t) = \frac{dx}{dt}" display />

      <h2>Acceleration: The Rate of Velocity Change</h2>
      <p>
        When velocity itself changes over time, we say the object is{" "}
        <strong>accelerating</strong>. Average acceleration is defined
        analogously to average velocity:
      </p>
      <MathBlock latex="a_{\text{avg}} = \frac{\Delta v}{\Delta t} = \frac{v_f - v_i}{t_f - t_i}" display />
      <p>
        Acceleration also carries a sign. A car speeding up in the positive
        direction has positive acceleration, but a car slowing down in the
        positive direction has <em>negative</em> acceleration (deceleration).
        Think of acceleration as the &ldquo;velocity of velocity.&rdquo;
      </p>
      <MathBlock latex="a(t) = \frac{dv}{dt} = \frac{d^2 x}{dt^2}" display />

      <h2>The Kinematic Equations</h2>
      <p>
        When acceleration is <strong>constant</strong> (a very common and useful
        special case), the relationships between position, velocity,
        acceleration, and time collapse into a tidy set of equations. These are
        the workhorses of one-dimensional kinematics:
      </p>
      <MathBlock latex="v = v_0 + at" display />
      <MathBlock latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" display />
      <MathBlock latex="v^2 = v_0^2 + 2a(x - x_0)" display />
      <p>
        Each equation connects a different subset of the five kinematic
        variables: <em>x</em>, <em>x&#8320;</em>, <em>v</em>, <em>v&#8320;</em>,{" "}
        <em>a</em>, and <em>t</em>. When you know three of them, you can find
        the others. The trick is choosing the right equation &mdash; pick the one
        that contains your unknowns and your knowns, leaving out the variable you
        do not need.
      </p>

      <h2>Visualizing Constant Acceleration</h2>
      <p>
        The graph below plots position versus time for an object under constant
        acceleration. Notice the parabolic shape: constant acceleration produces
        a quadratic position-time curve. The steeper the parabola, the faster the
        object is moving at that moment.
      </p>
      <GraphPlayground
        equation="0.5*x^2"
        xRange={[0, 6]}
        yRange={[0, 20]}
        interactive
        showGrid
        color="#ef4444"
      />
      <p>
        Compare this to a straight line, which represents constant velocity
        (zero acceleration). The curvature is the visual fingerprint of
        acceleration.
      </p>

      <h2>Explore: Adjusting Initial Velocity and Acceleration</h2>
      <p>
        Use the sliders below to change the initial velocity (v&#8320;) and
        acceleration (a). Watch how the position-time curve reshapes. A larger
        initial velocity shifts the parabola upward, while a larger acceleration
        makes it curve more steeply.
      </p>
      <SliderExploration
        title="Position vs. Time under Constant Acceleration"
        description="Adjust v₀ and a to see how x = v₀t + ½at² changes shape. Try setting a = 0 to see uniform motion, or make a negative to see the object slow down and reverse."
        parameters={[
          { name: "v", label: "Initial velocity v₀ (m/s)", min: -5, max: 10, step: 0.5, default: 2 },
          { name: "a", label: "Acceleration a (m/s²)", min: -4, max: 4, step: 0.5, default: 1 },
        ]}
        equation="v*x + 0.5*a*x^2"
        xRange={[0, 6]}
        yRange={[-10, 40]}
      />

      <h2>Worked Example: Free-Fall from a Building</h2>
      <p>
        One of the most important applications of constant acceleration is{" "}
        <strong>free fall</strong> near Earth&apos;s surface, where every object
        accelerates downward at approximately <em>g = 9.8 m/s&sup2;</em>,
        regardless of mass (ignoring air resistance). Let us work through a
        classic problem.
      </p>
      <StepByStep
        title="A ball is dropped from a 45 m tall building. How long does it take to reach the ground?"
        steps={[
          {
            title: "Identify knowns and unknowns",
            content:
              "The ball is dropped (not thrown), so v₀ = 0. Taking downward as positive, a = g = 9.8 m/s². The displacement is Δx = 45 m. We want to find t.",
            latex: "v_0 = 0, \\quad a = 9.8 \\; \\text{m/s}^2, \\quad \\Delta x = 45 \\; \\text{m}, \\quad t = ?",
          },
          {
            title: "Choose the right kinematic equation",
            content:
              "We know Δx, v₀, and a, and we want t. The equation that relates these four quantities (and leaves out v) is:",
            latex: "\\Delta x = v_0 t + \\tfrac{1}{2}at^2",
          },
          {
            title: "Substitute and simplify",
            content:
              "Since v₀ = 0, the first term drops out. Substituting the known values:",
            latex: "45 = \\tfrac{1}{2}(9.8)t^2 = 4.9\\,t^2",
          },
          {
            title: "Solve for t",
            content: "Divide both sides by 4.9, then take the square root. We discard the negative root since time cannot be negative.",
            latex: "t^2 = \\frac{45}{4.9} \\approx 9.18 \\quad \\Rightarrow \\quad t \\approx 3.03 \\; \\text{s}",
          },
          {
            title: "Interpret the result",
            content:
              "The ball reaches the ground in about 3 seconds. This is surprisingly fast! Notice that the answer does not depend on the mass of the ball at all — a feather and a bowling ball would land at the same time in a vacuum.",
          },
        ]}
      />

      <h2>A Deep Insight: Graphs Tell the Story</h2>
      <p>
        In kinematics, the three graphs &mdash; position vs. time, velocity vs.
        time, and acceleration vs. time &mdash; are all connected by slopes and
        areas:
      </p>
      <ul>
        <li>
          The <strong>slope</strong> of the position-time graph gives velocity.
        </li>
        <li>
          The <strong>slope</strong> of the velocity-time graph gives acceleration.
        </li>
        <li>
          The <strong>area</strong> under the velocity-time graph gives displacement.
        </li>
        <li>
          The <strong>area</strong> under the acceleration-time graph gives the change in velocity.
        </li>
      </ul>
      <p>
        This slope-area duality is deeply connected to calculus. Differentiation
        takes you from position to velocity to acceleration. Integration takes
        you back in the other direction.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="motion-1d-q1"
        question="A car starts from rest and accelerates uniformly at 3 m/s² for 4 seconds. What is its final velocity?"
        options={[
          {
            text: "7 m/s",
            feedback:
              "Check the formula v = v₀ + at. With v₀ = 0 and a = 3, you get v = 3 × 4.",
          },
          {
            text: "12 m/s",
            feedback:
              "Correct! Using v = v₀ + at = 0 + 3(4) = 12 m/s.",
          },
          {
            text: "24 m/s",
            feedback:
              "You may have used the displacement formula instead. The velocity formula is v = v₀ + at.",
          },
          {
            text: "6 m/s",
            feedback:
              "You may have divided instead of multiplied. v = v₀ + at = 0 + 3 × 4 = 12.",
          },
        ]}
        correctIndex={1}
        hint="Start from rest means v₀ = 0. Use the first kinematic equation."
        explanation="Since v₀ = 0 and a = 3 m/s², after 4 seconds the velocity is v = 0 + 3(4) = 12 m/s."
      />

      <InteractiveQuestion
        id="motion-1d-q2"
        question="An object is thrown straight up with an initial velocity of 20 m/s. How high does it go? (Use g = 10 m/s² for simplicity.)"
        options={[
          {
            text: "10 m",
            feedback:
              "Check your arithmetic. Using v² = v₀² + 2a(Δx) with v = 0 at the top.",
          },
          {
            text: "20 m",
            feedback:
              "Correct! At the peak, v = 0. So 0 = 20² + 2(−10)(Δx), giving Δx = 400/20 = 20 m.",
          },
          {
            text: "40 m",
            feedback:
              "You may have forgotten the factor of 2 in the denominator. Re-check v² = v₀² + 2aΔx.",
          },
          {
            text: "2 m",
            feedback:
              "That seems too low. At the peak v = 0, so use v² = v₀² + 2aΔx to solve for Δx.",
          },
        ]}
        correctIndex={1}
        hint="At the highest point, the velocity is momentarily zero. Use the third kinematic equation with v = 0."
        explanation="At the peak, v = 0. Substituting into v² = v₀² + 2aΔx: 0 = 400 − 20Δx, so Δx = 20 m."
      />
    </div>
  );
}
