"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";
import { StepByStep } from "@/components/interactive/StepByStep";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function CircularMotion() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Moving in Circles</h2>
      <p>
        Not all motion follows straight lines. Planets orbit stars, cars round
        curves, and electrons spiral in magnetic fields. Circular motion is one
        of the most common types of motion in the universe, and understanding it
        requires a subtle but powerful idea: even if an object moves at constant
        speed, it can still be <strong>accelerating</strong>.
      </p>
      <p>
        How? Because acceleration is the rate of change of <em>velocity</em>,
        which is a vector. Even when the magnitude of velocity (speed) stays
        constant, if the <em>direction</em> keeps changing, there is
        acceleration. In circular motion, the direction of the velocity vector is
        continuously changing &mdash; it is always tangent to the circle &mdash;
        so there must always be an acceleration.
      </p>

      <h2>Centripetal Acceleration</h2>
      <p>
        For an object moving in a circle of radius <em>r</em> at constant speed{" "}
        <em>v</em>, the acceleration points <strong>toward the center</strong>{" "}
        of the circle at every instant. This is called{" "}
        <strong>centripetal acceleration</strong> (from the Latin for
        &ldquo;center-seeking&rdquo;):
      </p>
      <MathBlock latex="a_c = \frac{v^2}{r}" display />
      <p>
        This formula reveals two important relationships:
      </p>
      <ul>
        <li>
          <strong>Faster speed means more acceleration</strong> &mdash; and it
          scales as the <em>square</em> of speed. Doubling your speed on a curve
          quadruples the required centripetal acceleration.
        </li>
        <li>
          <strong>Tighter curves require more acceleration.</strong> A smaller
          radius means a sharper turn, demanding greater centripetal
          acceleration.
        </li>
      </ul>
      <p>
        We can also express centripetal acceleration using the{" "}
        <strong>angular velocity</strong> &omega; (omega), where{" "}
        <MathBlock latex="v = \omega r" />:
      </p>
      <MathBlock latex="a_c = \omega^2 r" display />

      <h2>Visualizing Centripetal Acceleration vs. Radius</h2>
      <p>
        The graph below shows how centripetal acceleration varies with radius for
        a fixed speed. Notice that as the radius increases, the centripetal
        acceleration decreases &mdash; gentle curves demand less inward
        acceleration. As the radius approaches zero, the acceleration shoots up
        toward infinity (which is why very tight turns at high speed are so
        dangerous).
      </p>
      <GraphPlayground
        equation="100/x"
        xRange={[1, 20]}
        yRange={[0, 50]}
        interactive
        showGrid
        color="#8b5cf6"
      />
      <p>
        This curve represents <MathBlock latex="a_c = v^2/r" /> with{" "}
        <em>v</em> = 10 m/s. At <em>r</em> = 2 m, the acceleration is 50
        m/s&sup2; (over 5 times gravity!). At <em>r</em> = 10 m, it drops to a
        more manageable 10 m/s&sup2;.
      </p>

      <h2>Centripetal Force</h2>
      <p>
        By Newton&apos;s second law, if there is centripetal acceleration, there
        must be a net force causing it. The <strong>centripetal force</strong> is
        not a new type of force &mdash; it is simply the name we give to
        whatever real force (or combination of forces) points toward the center
        and maintains the circular path:
      </p>
      <MathBlock latex="F_c = ma_c = \frac{mv^2}{r}" display />
      <p>
        Different situations provide the centripetal force through different
        mechanisms:
      </p>
      <ul>
        <li>
          <strong>Planet orbiting a star:</strong> Gravity provides the
          centripetal force.
        </li>
        <li>
          <strong>Car on a flat curve:</strong> Static friction provides the
          centripetal force.
        </li>
        <li>
          <strong>Ball on a string:</strong> Tension in the string provides the
          centripetal force.
        </li>
        <li>
          <strong>Car on a banked curve:</strong> A component of the normal
          force provides (some or all of) the centripetal force.
        </li>
      </ul>

      <h2>Explore: How Speed and Radius Affect Centripetal Force</h2>
      <SliderExploration
        title="Centripetal Force vs. Speed"
        description="Adjust the mass and radius of circular motion. The graph shows how the required centripetal force grows with speed. Notice the quadratic (parabolic) shape — doubling speed requires quadruple the force."
        parameters={[
          { name: "m", label: "Mass (kg)", min: 1, max: 10, step: 0.5, default: 2 },
          { name: "r", label: "Radius (m)", min: 1, max: 10, step: 0.5, default: 5 },
        ]}
        equation="(m/r)*x*x"
        xRange={[0, 10]}
        yRange={[0, 100]}
      />

      <h2>Banked Curves: Engineering Meets Physics</h2>
      <p>
        Highway engineers bank (tilt) curves so that cars can navigate them
        safely even on icy roads where friction is minimal. On a banked curve at
        angle &theta;, the normal force has a horizontal component that points
        toward the center of the curve, providing centripetal force.
      </p>
      <p>
        For a frictionless banked curve, the &ldquo;design speed&rdquo; at which
        no friction is needed is given by:
      </p>
      <MathBlock latex="\tan\theta = \frac{v^2}{rg}" display />
      <p>
        At this particular speed, the car rounds the curve with no tendency to
        slide inward or outward. Drive faster, and you slide outward; drive
        slower, and you slide inward.
      </p>

      <h2>Worked Example: Car on a Banked Curve</h2>
      <p>
        A highway curve has a radius of 200 m and is banked at 15&deg;. What is
        the design speed (the speed at which no friction is needed)?
        Use g = 9.8 m/s&sup2;.
      </p>
      <StepByStep
        title="Finding the design speed of a banked curve"
        steps={[
          {
            title: "Draw the free-body diagram",
            content:
              "On the banked curve, the car experiences weight (mg downward) and the normal force (perpendicular to the banked surface). There is no friction at the design speed. The normal force has a vertical component (N cos θ balancing weight) and a horizontal component (N sin θ providing centripetal force).",
          },
          {
            title: "Write the equations for each direction",
            content:
              "Vertical equilibrium: N cos θ = mg. Horizontal (centripetal): N sin θ = mv²/r.",
            latex: "N\\cos\\theta = mg \\qquad \\text{and} \\qquad N\\sin\\theta = \\frac{mv^2}{r}",
          },
          {
            title: "Divide the equations to eliminate N and m",
            content:
              "Dividing the horizontal equation by the vertical equation:",
            latex: "\\frac{N\\sin\\theta}{N\\cos\\theta} = \\frac{mv^2/r}{mg} \\quad \\Rightarrow \\quad \\tan\\theta = \\frac{v^2}{rg}",
          },
          {
            title: "Solve for v",
            content:
              "Rearranging for the speed:",
            latex: "v = \\sqrt{rg\\tan\\theta} = \\sqrt{200 \\times 9.8 \\times \\tan 15°}",
          },
          {
            title: "Calculate the numerical value",
            content:
              "Using tan 15° ≈ 0.268:",
            latex: "v = \\sqrt{200 \\times 9.8 \\times 0.268} = \\sqrt{525} \\approx 22.9 \\; \\text{m/s} \\approx 82 \\; \\text{km/h}",
          },
          {
            title: "Interpret the result",
            content:
              "The design speed is about 82 km/h (roughly 51 mph). At this speed, even on perfectly icy roads with zero friction, the car would navigate the curve without sliding. This is why banked curves are an important safety feature on highways.",
          },
        ]}
      />

      <h2>Orbital Motion: Gravity as Centripetal Force</h2>
      <p>
        One of Newton&apos;s most profound insights was recognizing that the
        Moon&apos;s circular orbit is simply a free-fall trajectory that
        continuously &ldquo;misses&rdquo; the Earth. For any object in a
        circular orbit, gravity provides the centripetal force:
      </p>
      <MathBlock latex="\frac{GMm}{r^2} = \frac{mv^2}{r}" display />
      <p>
        Simplifying (the mass <em>m</em> of the orbiting object cancels!):
      </p>
      <MathBlock latex="v_{\text{orbit}} = \sqrt{\frac{GM}{r}}" display />
      <p>
        This is the orbital speed for a circular orbit at radius <em>r</em>
        around a body of mass <em>M</em>. Notice that the orbital speed does not
        depend on the mass of the orbiting object &mdash; a satellite and an
        astronaut at the same altitude orbit at the same speed. This is the same
        equivalence principle that makes all objects fall at the same rate in a
        gravitational field.
      </p>

      <h2>A Warning: &ldquo;Centrifugal Force&rdquo;</h2>
      <p>
        You have probably heard of &ldquo;centrifugal force&rdquo; &mdash; the
        force that seems to push you outward when a car turns. In an inertial
        (non-rotating) reference frame, centrifugal force does not exist. What
        you feel is your body&apos;s inertia: you tend to continue in a straight
        line while the car turns underneath you. The car door pushes you inward
        (centripetally), and you <em>interpret</em> this as being pushed
        outward.
      </p>
      <p>
        In a rotating reference frame, centrifugal force appears as a
        &ldquo;fictitious force&rdquo; that is useful for calculations but does
        not represent a real physical interaction.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="circ-q1"
        question="A car moves at 20 m/s around a circular track of radius 50 m. What is the centripetal acceleration?"
        options={[
          {
            text: "0.4 m/s²",
            feedback:
              "You may have divided v by r instead of v² by r. The formula is a = v²/r.",
          },
          {
            text: "8 m/s²",
            feedback:
              "Correct! a = v²/r = (20)²/50 = 400/50 = 8 m/s², directed toward the center.",
          },
          {
            text: "400 m/s²",
            feedback:
              "You calculated v² but forgot to divide by r. a = v²/r = 400/50 = 8.",
          },
          {
            text: "2 m/s²",
            feedback:
              "Check your arithmetic. a = v²/r = 400/50 = 8 m/s².",
          },
        ]}
        correctIndex={1}
        hint="Use the centripetal acceleration formula: a_c = v²/r. Make sure to square the velocity first."
        explanation="Centripetal acceleration = v²/r = (20 m/s)²/(50 m) = 400/50 = 8 m/s². This acceleration points toward the center of the circle at every instant."
      />

      <InteractiveQuestion
        id="circ-q2"
        question="If you double the speed of an object moving in a circle of fixed radius, what happens to the centripetal force?"
        options={[
          {
            text: "It doubles",
            feedback:
              "Centripetal force is proportional to v², not v. Doubling speed does more than doubling the force.",
          },
          {
            text: "It quadruples",
            feedback:
              "Correct! F_c = mv²/r. Since F_c ∝ v², doubling v multiplies F_c by 2² = 4.",
          },
          {
            text: "It stays the same",
            feedback:
              "The centripetal force depends on speed. Faster motion requires more inward force.",
          },
          {
            text: "It halves",
            feedback:
              "The centripetal force increases with speed, not decreases. F_c = mv²/r.",
          },
        ]}
        correctIndex={1}
        hint="Look at the centripetal force formula: F = mv²/r. What happens when you replace v with 2v?"
        explanation="Since F_c = mv²/r, replacing v with 2v gives F_c = m(2v)²/r = 4mv²/r. The force quadruples. This is why high-speed turns are so much more demanding than low-speed turns."
      />
    </div>
  );
}
