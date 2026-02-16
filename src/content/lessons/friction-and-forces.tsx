"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function FrictionAndForces() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Force That Resists Motion</h2>
      <p>
        In the idealized world of physics problems, surfaces are often
        &ldquo;frictionless.&rdquo; But in the real world, friction is
        everywhere &mdash; and thank goodness for that. Without friction, you
        could not walk, drive, or even pick up a glass of water. Friction is the
        force that resists the relative sliding motion between two surfaces in
        contact. Understanding it is essential for solving realistic mechanics
        problems.
      </p>

      <h2>The Normal Force</h2>
      <p>
        Before we can discuss friction, we need the <strong>normal force</strong>.
        When an object rests on a surface, the surface pushes back
        perpendicular (&ldquo;normal&rdquo;) to itself. For a book on a flat
        table, the normal force balances gravity:
      </p>
      <MathBlock latex="N = mg" display />
      <p>
        But this simple formula only works on flat, horizontal surfaces with no
        other vertical forces. In general, the normal force adjusts to prevent
        the object from passing through the surface. On an inclined plane, the
        normal force is less than <em>mg</em> because only a component of
        gravity pushes into the surface.
      </p>
      <MathBlock latex="N = mg\cos\theta \quad \text{(on an inclined plane at angle } \theta \text{)}" display />

      <h2>Static vs. Kinetic Friction</h2>
      <p>
        Friction comes in two varieties, and they behave quite differently:
      </p>
      <h3>Static Friction</h3>
      <p>
        <strong>Static friction</strong> (<em>f&#8347;</em>) acts on an object
        that is <em>not</em> sliding. It matches the applied force up to a
        maximum value, keeping the object stationary:
      </p>
      <MathBlock latex="f_s \leq \mu_s N" display />
      <p>
        The coefficient <MathBlock latex="\mu_s" /> (mu-sub-s) is the{" "}
        <strong>coefficient of static friction</strong>, a dimensionless number
        that depends on the two surfaces in contact. Notice the inequality:
        static friction is whatever it needs to be to prevent sliding, up to the
        maximum <MathBlock latex="\mu_s N" />. Once the applied force
        exceeds this maximum, the object begins to slide.
      </p>
      <h3>Kinetic Friction</h3>
      <p>
        <strong>Kinetic friction</strong> (<em>f&#8342;</em>) acts on an object
        that <em>is</em> sliding. It has a fixed magnitude:
      </p>
      <MathBlock latex="f_k = \mu_k N" display />
      <p>
        The coefficient of kinetic friction <MathBlock latex="\mu_k" /> is
        typically <em>less than</em> <MathBlock latex="\mu_s" /> for the same
        pair of surfaces. This is why it is harder to start pushing a heavy box
        across the floor than it is to keep it moving once it starts sliding.
      </p>

      <h2>Key Properties of Friction</h2>
      <ul>
        <li>
          Friction always opposes the direction of motion (or attempted motion).
        </li>
        <li>
          The friction force depends on the <em>normal force</em>, not on the
          contact area. A wide box and a narrow box with the same weight
          experience the same friction (in the simple model).
        </li>
        <li>
          Friction coefficients are properties of the <em>pair</em> of surfaces,
          not of a single surface. Rubber on asphalt is very different from steel
          on ice.
        </li>
      </ul>

      <h2>Free-Body Diagrams: The Problem-Solving Superpower</h2>
      <p>
        A <strong>free-body diagram</strong> (FBD) is a sketch showing all the
        forces acting on a single object as arrows originating from the
        object&apos;s center of mass. Drawing an accurate FBD is the most
        important step in any Newton&apos;s law problem. Here is the recipe:
      </p>
      <ol>
        <li>Draw the object as a simple dot or box.</li>
        <li>Draw the <strong>weight</strong> (mg) pointing straight down.</li>
        <li>
          Draw the <strong>normal force</strong> (N) perpendicular to the
          contact surface, pointing away from the surface.
        </li>
        <li>
          Draw the <strong>friction force</strong> parallel to the surface,
          opposing the motion (or tendency to move).
        </li>
        <li>
          Draw any <strong>applied forces</strong>, tensions, or other forces.
        </li>
        <li>Choose coordinate axes (often tilted to align with the surface).</li>
      </ol>

      <h2>The Inclined Plane: A Classic Problem</h2>
      <p>
        The inclined plane is the canonical friction problem. A block sits on a
        ramp tilted at angle &theta;. Gravity has two components: one pushing the
        block into the ramp (<MathBlock latex="mg\cos\theta" />) and one pulling
        it down the ramp (<MathBlock latex="mg\sin\theta" />). Friction opposes
        the tendency to slide down.
      </p>
      <SliderExploration
        title="Forces on an Inclined Plane"
        description="Adjust the incline angle θ. Watch how the component of gravity along the ramp (mg sin θ) increases relative to the normal component (mg cos θ). At some critical angle, the block will start sliding."
        parameters={[
          { name: "theta", label: "Incline angle θ (degrees)", min: 0, max: 60, step: 1, default: 20 },
        ]}
        equation="Math.tan(theta * Math.PI / 180) * x"
        xRange={[0, 10]}
        yRange={[0, 20]}
      />

      <h2>Worked Example: Block on an Inclined Plane with Friction</h2>
      <p>
        A 10 kg block is placed on a ramp inclined at 30&deg;. The coefficient of
        kinetic friction between the block and the ramp is &mu;&#8342; = 0.2.
        The block slides down. Find its acceleration.
        (Use g = 10 m/s&sup2;.)
      </p>
      <StepByStep
        title="Block sliding down a ramp with friction"
        steps={[
          {
            title: "Draw the free-body diagram and choose axes",
            content:
              "Tilt the axes so that x is along the ramp (positive down the ramp) and y is perpendicular to the ramp (positive away from the surface). Three forces act on the block: weight (mg) straight down, normal force (N) in the +y direction, and kinetic friction (f_k) in the −x direction (opposing the downhill sliding).",
          },
          {
            title: "Resolve weight into components",
            content:
              "The weight mg has components along the tilted axes:",
            latex: "mg\\sin\\theta = 10(10)(0.5) = 50 \\; \\text{N (down the ramp)}, \\quad mg\\cos\\theta = 10(10)(0.866) = 86.6 \\; \\text{N (into the ramp)}",
          },
          {
            title: "Find the normal force",
            content:
              "There is no acceleration perpendicular to the ramp, so the y-equation gives:",
            latex: "N = mg\\cos\\theta = 86.6 \\; \\text{N}",
          },
          {
            title: "Calculate kinetic friction",
            content:
              "Using f_k = μ_k N:",
            latex: "f_k = \\mu_k N = 0.2 \\times 86.6 = 17.3 \\; \\text{N}",
          },
          {
            title: "Apply Newton's second law along the ramp",
            content:
              "The net force down the ramp is the gravitational component minus friction:",
            latex: "F_{\\text{net}} = mg\\sin\\theta - f_k = 50 - 17.3 = 32.7 \\; \\text{N}",
          },
          {
            title: "Calculate acceleration",
            content:
              "Using F = ma:",
            latex: "a = \\frac{F_{\\text{net}}}{m} = \\frac{32.7}{10} = 3.27 \\; \\text{m/s}^2 \\; \\text{(down the ramp)}",
          },
          {
            title: "Interpret the result",
            content:
              "Without friction the acceleration would be g sin 30° = 5 m/s². Friction reduces this by about 35%. The block accelerates down the ramp, but more slowly than it would on a frictionless surface.",
          },
        ]}
      />

      <h2>When Does the Block Start Sliding?</h2>
      <p>
        A block on a ramp remains stationary as long as static friction can
        balance the gravitational component down the ramp. The critical angle
        &theta;&#8318; at which sliding begins is found by setting static
        friction to its maximum:
      </p>
      <MathBlock latex="mg\sin\theta_c = \mu_s\, mg\cos\theta_c" display />
      <MathBlock latex="\tan\theta_c = \mu_s" display />
      <p>
        This beautiful result means that the critical angle depends only on the
        coefficient of static friction, not on the mass of the block. This is
        actually a practical way to measure &mu;&#8347;: gradually tilt a surface
        until the object just starts to slide, then measure the angle.
      </p>

      <h2>Challenge: Stacked Blocks</h2>
      <RevealAnswer label="Reveal the solution">
        <p>
          <strong>Problem:</strong> A 3 kg block sits on top of a 5 kg block,
          which sits on a frictionless table. The coefficient of static friction
          between the two blocks is &mu;&#8347; = 0.4. A horizontal force F is
          applied to the bottom block. What is the maximum F that can be applied
          so that the top block does not slide off? (Use g = 10 m/s&sup2;.)
        </p>
        <p>
          <strong>Solution:</strong> The top block accelerates only because of
          static friction from the bottom block. The maximum friction is:
        </p>
        <MathBlock latex="f_{s,\max} = \mu_s \cdot m_{\text{top}} \cdot g = 0.4 \times 3 \times 10 = 12 \; \text{N}" display />
        <p>
          This friction gives the top block a maximum acceleration of:
        </p>
        <MathBlock latex="a_{\max} = \frac{f_{s,\max}}{m_{\text{top}}} = \frac{12}{3} = 4 \; \text{m/s}^2" display />
        <p>
          Both blocks must accelerate together at this rate. The total system
          mass is 3 + 5 = 8 kg, so:
        </p>
        <MathBlock latex="F_{\max} = (m_{\text{top}} + m_{\text{bottom}}) \cdot a_{\max} = 8 \times 4 = 32 \; \text{N}" display />
      </RevealAnswer>

      <h2>Friction: Friend and Foe</h2>
      <p>
        It is tempting to think of friction as the enemy of motion, but it is
        often the <em>cause</em> of motion. When you walk, your foot pushes
        backward on the ground, and static friction pushes your foot forward
        &mdash; propelling you. When a car accelerates, it is static friction
        between the tires and the road that pushes the car forward. Without
        friction, wheels would just spin uselessly.
      </p>
      <p>
        Even in cases where friction is unwanted (like in engines and
        machinery), engineers use lubricants and bearings to reduce it rather
        than eliminate it entirely, because some friction is needed for control
        and stability.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="friction-q1"
        question="A 20 kg crate sits on a floor where μs = 0.5 and μk = 0.3. What minimum horizontal force is needed to START the crate sliding? (Use g = 10 m/s².)"
        options={[
          {
            text: "60 N",
            feedback:
              "You used the kinetic friction coefficient. To start the crate sliding, you need to overcome static friction.",
          },
          {
            text: "100 N",
            feedback:
              "Correct! f_s,max = μs × N = 0.5 × 20 × 10 = 100 N. You must exceed this to start sliding.",
          },
          {
            text: "200 N",
            feedback:
              "You may have forgotten to use the friction coefficient. The force needed is μs × mg, not mg itself.",
          },
          {
            text: "10 N",
            feedback:
              "That is much too low. Calculate f_s,max = μs × mg = 0.5 × 200 = 100 N.",
          },
        ]}
        correctIndex={1}
        hint="To start the crate sliding, the applied force must exceed the maximum static friction: f_s,max = μs × N = μs × mg."
        explanation="The maximum static friction is f_s,max = μs × mg = 0.5 × 20 × 10 = 100 N. Any force exceeding this will start the crate sliding. Once moving, friction drops to f_k = μk × mg = 60 N."
      />

      <InteractiveQuestion
        id="friction-q2"
        question="Why is the coefficient of static friction typically larger than the coefficient of kinetic friction?"
        options={[
          {
            text: "Because heavier objects are harder to move",
            feedback:
              "The coefficients do not depend on mass. They depend on the microscopic nature of the surfaces.",
          },
          {
            text: "Because stationary surfaces have more time to form microscopic bonds, requiring more force to break",
            feedback:
              "Correct! When surfaces are at rest relative to each other, microscopic irregularities interlock more thoroughly, requiring a larger force to initiate sliding.",
          },
          {
            text: "Because kinetic friction acts over a larger area",
            feedback:
              "In the simple friction model, contact area does not affect friction force. The difference is due to microscopic bonding.",
          },
          {
            text: "Because Newton's third law makes moving objects easier to push",
            feedback:
              "Newton's third law applies equally in both static and kinetic cases. The difference is in surface interactions.",
          },
        ]}
        correctIndex={1}
        hint="Think about what happens at the microscopic level when two surfaces sit still versus when they slide past each other."
        explanation="When two surfaces are stationary, their microscopic asperities (bumps) settle into each other, forming stronger bonds. Once sliding begins, these bonds break and reform rapidly, never reaching the same level of interlocking."
      />
    </div>
  );
}
