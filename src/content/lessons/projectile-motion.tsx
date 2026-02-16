"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";

export default function ProjectileMotion() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Two Dimensions, One Big Idea</h2>
      <p>
        In the previous lesson, objects moved along a single line. Now we let
        them fly through the air &mdash; a ball thrown at an angle, a basketball
        arcing toward the hoop, or a cannonball launched from a cliff. The key
        insight that makes projectile motion manageable is deceptively simple:
      </p>
      <p>
        <strong>
          The horizontal and vertical motions are completely independent of each
          other.
        </strong>
      </p>
      <p>
        Gravity pulls only downward. It does not care about horizontal motion.
        This means we can treat the x-direction and y-direction as two separate
        one-dimensional problems happening simultaneously, then stitch the
        results together.
      </p>

      <h2>Setting Up the Equations</h2>
      <p>
        Suppose a projectile is launched from the origin with initial speed{" "}
        <em>v&#8320;</em> at an angle <em>&theta;</em> above the horizontal.
        We decompose the initial velocity into components:
      </p>
      <MathBlock latex="v_{0x} = v_0 \cos\theta, \qquad v_{0y} = v_0 \sin\theta" display />
      <p>
        In the horizontal direction there is no acceleration (ignoring air
        resistance), so the motion is uniform:
      </p>
      <MathBlock latex="x(t) = v_{0x}\,t = (v_0 \cos\theta)\,t" display />
      <p>
        In the vertical direction, gravity provides a constant downward
        acceleration <em>g</em>:
      </p>
      <MathBlock latex="y(t) = v_{0y}\,t - \tfrac{1}{2}g\,t^2 = (v_0 \sin\theta)\,t - \tfrac{1}{2}g\,t^2" display />
      <p>
        Together, these two equations describe a <strong>parabola</strong> &mdash;
        the classic arc of every thrown object near Earth&apos;s surface.
      </p>

      <h2>The Parabolic Trajectory</h2>
      <p>
        The graph below shows the path of a projectile. Notice the symmetry: the
        ascending half mirrors the descending half (when launched and landing at
        the same height). The peak occurs exactly halfway through the flight.
      </p>
      <GraphPlayground
        equation="-0.02*x^2 + x"
        xRange={[0, 55]}
        yRange={[0, 15]}
        interactive
        showGrid
        color="#f97316"
      />

      <h2>Key Quantities</h2>
      <h3>Time of Flight</h3>
      <p>
        The projectile lands when <em>y(t) = 0</em> again. Setting the vertical
        equation to zero and solving (discarding <em>t = 0</em>):
      </p>
      <MathBlock latex="T = \frac{2v_0 \sin\theta}{g}" display />

      <h3>Maximum Height</h3>
      <p>
        At the peak, the vertical velocity is zero. Using{" "}
        <MathBlock latex="v_y^2 = v_{0y}^2 - 2g\,h" /> with{" "}
        <em>v&#7527; = 0</em>:
      </p>
      <MathBlock latex="h_{\max} = \frac{v_0^2 \sin^2\theta}{2g}" display />

      <h3>Range</h3>
      <p>
        The horizontal distance traveled during the full flight time is the{" "}
        <strong>range</strong>:
      </p>
      <MathBlock latex="R = v_{0x} \cdot T = \frac{v_0^2 \sin(2\theta)}{g}" display />
      <p>
        This elegant formula reveals something beautiful: the range depends on{" "}
        <MathBlock latex="\sin(2\theta)" />, which is maximized when{" "}
        <em>2&theta; = 90&deg;</em>, i.e., <strong>&theta; = 45&deg;</strong>.
        Launching at 45 degrees gives the longest range on flat ground. Notice
        also that complementary angles (like 30&deg; and 60&deg;) give the same
        range but with very different trajectories &mdash; one low and fast, the
        other high and loopy.
      </p>

      <h2>Explore: Adjust the Launch Angle</h2>
      <p>
        Use the slider below to change the launch angle and watch how the
        trajectory and range change. Can you find the angle that maximizes the
        range? Try comparing 30&deg; and 60&deg; to see why they produce equal
        ranges.
      </p>
      <SliderExploration
        title="Projectile Trajectory vs. Launch Angle"
        description="Adjust the launch angle θ (in degrees). The curve shows the parabolic path of the projectile. Notice how 45° maximizes the range, and complementary angles yield equal ranges."
        parameters={[
          { name: "theta", label: "Launch angle θ (degrees)", min: 5, max: 85, step: 1, default: 45 },
        ]}
        equation="x*Math.tan(theta*Math.PI/180) - (9.8*x*x)/(2*20*20*Math.pow(Math.cos(theta*Math.PI/180),2))"
        xRange={[0, 50]}
        yRange={[0, 25]}
      />

      <h2>Worked Example: Cannonball Problem</h2>
      <p>
        A cannonball is fired with an initial speed of 50 m/s at an angle of
        37&deg; above the horizontal. Find the range and maximum height.
        (Use g = 10 m/s&sup2; and note that sin 37&deg; &asymp; 0.6, cos 37&deg; &asymp; 0.8.)
      </p>
      <StepByStep
        title="Find the range and maximum height of a cannonball"
        steps={[
          {
            title: "Decompose the initial velocity",
            content:
              "Split v₀ = 50 m/s into horizontal and vertical components using the given angle.",
            latex: "v_{0x} = 50 \\cos 37° = 50(0.8) = 40 \\; \\text{m/s}, \\quad v_{0y} = 50 \\sin 37° = 50(0.6) = 30 \\; \\text{m/s}",
          },
          {
            title: "Find the time of flight",
            content:
              "The projectile lands when y = 0 again. Using T = 2v₀sin θ / g:",
            latex: "T = \\frac{2(50)(0.6)}{10} = \\frac{60}{10} = 6 \\; \\text{s}",
          },
          {
            title: "Calculate the range",
            content:
              "The horizontal distance is simply the horizontal velocity times the total flight time.",
            latex: "R = v_{0x} \\cdot T = 40 \\times 6 = 240 \\; \\text{m}",
          },
          {
            title: "Calculate the maximum height",
            content:
              "At the peak, v_y = 0. Using the formula h_max = v₀²sin²θ / (2g):",
            latex: "h_{\\max} = \\frac{(50)^2 (0.6)^2}{2(10)} = \\frac{2500 \\times 0.36}{20} = \\frac{900}{20} = 45 \\; \\text{m}",
          },
          {
            title: "Verify with the range formula",
            content:
              "We can cross-check using R = v₀²sin(2θ)/g. Note that sin(74°) ≈ 0.96.",
            latex: "R = \\frac{(50)^2 \\sin(74°)}{10} = \\frac{2500 \\times 0.96}{10} = 240 \\; \\text{m} \\; \\checkmark",
          },
        ]}
      />

      <h2>Beyond the Idealized Case</h2>
      <p>
        Real projectiles experience air resistance, which introduces a drag force
        proportional to velocity (or velocity squared at high speeds). This makes
        the trajectory asymmetric: the descending arc is steeper than the
        ascending arc, and the optimum launch angle shifts below 45&deg;. In
        sports like golf and baseball, spin adds even more complexity through the
        Magnus effect. But the parabolic model remains an excellent first
        approximation and the foundation for understanding these richer
        scenarios.
      </p>

      <h2>The Independence Principle in Action</h2>
      <p>
        Here is a thought experiment that drives home the independence of
        horizontal and vertical motion. Imagine two balls released at the same
        instant from the same height: one is dropped straight down, and the other
        is fired horizontally. Which one hits the ground first?
      </p>
      <p>
        The answer: <strong>they land at the same time</strong>. The horizontal
        velocity of the second ball has no effect on how fast it falls. Gravity
        accelerates both balls downward at the same rate. The fired ball simply
        covers more horizontal distance before landing. This is not
        intuition &mdash; it is physics, and it has been verified by countless
        experiments.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="proj-q1"
        question="A projectile is launched at 60° above the horizontal. At what other angle would it have the same range (on flat ground)?"
        options={[
          {
            text: "20°",
            feedback:
              "Not quite. The complementary angle to 60° is 90° − 60° = 30°.",
          },
          {
            text: "30°",
            feedback:
              "Correct! Complementary angles (θ and 90°−θ) give the same range because sin(2θ) = sin(2(90°−θ)).",
          },
          {
            text: "45°",
            feedback:
              "45° gives the maximum range, but it is not the complementary angle of 60°.",
          },
          {
            text: "120°",
            feedback:
              "120° is the supplementary angle, not the complementary. It would actually mean launching backward and downward.",
          },
        ]}
        correctIndex={1}
        hint="The range formula depends on sin(2θ). What pair of angles gives the same value of sin(2θ)?"
        explanation="Since R ∝ sin(2θ), and sin(120°) = sin(60°), both θ = 30° and θ = 60° produce the same range."
      />

      <InteractiveQuestion
        id="proj-q2"
        question="A ball is thrown horizontally from a cliff. Which statement is true about its motion?"
        options={[
          {
            text: "The horizontal velocity increases during flight",
            feedback:
              "There is no horizontal force (ignoring air resistance), so horizontal velocity stays constant.",
          },
          {
            text: "The vertical acceleration depends on the horizontal velocity",
            feedback:
              "Horizontal and vertical motions are independent. The vertical acceleration is always g downward.",
          },
          {
            text: "The vertical velocity increases while horizontal velocity stays constant",
            feedback:
              "Correct! Gravity accelerates the ball downward, increasing v_y, while v_x remains unchanged.",
          },
          {
            text: "The ball travels in a straight line",
            feedback:
              "A straight line would require no acceleration. Gravity curves the path into a parabola.",
          },
        ]}
        correctIndex={2}
        hint="Think about what forces act in each direction. Gravity is vertical; there is no horizontal force."
        explanation="With no air resistance, the only force is gravity (downward). This changes the vertical velocity but leaves the horizontal velocity untouched. The result is a parabolic arc."
      />
    </div>
  );
}
