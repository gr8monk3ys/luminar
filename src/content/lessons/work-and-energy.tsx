"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { GraphPlayground } from "@/components/interactive/GraphPlayground";

export default function WorkAndEnergy() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>A New Way to Think About Motion</h2>
      <p>
        Newton&apos;s laws give us a force-based approach to mechanics: draw free
        body diagrams, resolve forces, apply <em>F = ma</em>, solve for
        acceleration, then integrate to find velocity and position. This works
        beautifully, but it can become algebraically messy for complex systems.
        There is another approach &mdash; one that sidesteps forces entirely and
        instead tracks a quantity called <strong>energy</strong>.
      </p>
      <p>
        Energy methods are powerful because they deal with{" "}
        <em>scalars</em> (plain numbers), not vectors. You never need to
        decompose anything into x and y components. Even more remarkably, energy
        is <strong>conserved</strong> &mdash; it cannot be created or destroyed,
        only transformed from one form to another. This conservation law is one
        of the deepest principles in all of physics.
      </p>

      <h2>Work: The Transfer of Energy</h2>
      <p>
        In physics, <strong>work</strong> has a precise definition. When a
        constant force <em>F</em> acts on an object that moves through a
        displacement <em>d</em>, the work done by that force is:
      </p>
      <MathBlock latex="W = Fd\cos\theta" display />
      <p>
        where &theta; is the angle between the force vector and the displacement
        vector. This formula captures three important cases:
      </p>
      <ul>
        <li>
          <strong>&theta; = 0&deg;</strong> (force parallel to motion): Maximum
          positive work. <MathBlock latex="W = Fd" />.
        </li>
        <li>
          <strong>&theta; = 90&deg;</strong> (force perpendicular to motion):
          Zero work. A force at right angles does not speed up or slow down the
          object. This is why the normal force on a flat surface does no work,
          and why centripetal force does no work on an orbiting object.
        </li>
        <li>
          <strong>&theta; = 180&deg;</strong> (force opposite to motion):
          Maximum negative work. <MathBlock latex="W = -Fd" />. Friction does
          negative work, removing energy from the system.
        </li>
      </ul>
      <p>
        The SI unit of work (and energy) is the <strong>joule</strong> (J), where
        1 J = 1 N &middot; m.
      </p>

      <h2>Kinetic Energy</h2>
      <p>
        <strong>Kinetic energy</strong> is the energy an object possesses due to
        its motion:
      </p>
      <MathBlock latex="KE = \frac{1}{2}mv^2" display />
      <p>
        A 1000 kg car moving at 30 m/s has a kinetic energy of
        &frac12;(1000)(30)&sup2; = 450,000 J = 450 kJ. Kinetic energy depends
        on the <em>square</em> of speed, which is why high-speed collisions are
        so devastating: doubling your speed quadruples your kinetic energy (and
        the energy that must be dissipated in a crash).
      </p>

      <h2>The Work-Energy Theorem</h2>
      <p>
        The <strong>work-energy theorem</strong> connects force and energy in a
        single elegant statement:
      </p>
      <MathBlock latex="W_{\text{net}} = \Delta KE = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2" display />
      <p>
        The net work done on an object equals the change in its kinetic energy.
        Positive net work speeds the object up; negative net work slows it down.
        This theorem is actually just Newton&apos;s second law in disguise, but
        expressed in terms of energy rather than forces and acceleration.
      </p>

      <h2>Potential Energy</h2>
      <p>
        Some forces have a special property: the work they do depends only on the
        starting and ending positions, not on the path taken. These are called{" "}
        <strong>conservative forces</strong>, and we can associate a{" "}
        <strong>potential energy</strong> with each one.
      </p>
      <h3>Gravitational Potential Energy</h3>
      <p>
        Near Earth&apos;s surface, the gravitational potential energy of an
        object at height <em>h</em> above a chosen reference level is:
      </p>
      <MathBlock latex="PE = mgh" display />
      <p>
        The choice of reference level (where <em>h</em> = 0) is arbitrary.
        Only <em>changes</em> in potential energy matter physically, and those
        are independent of where you set the zero.
      </p>
      <h3>Elastic Potential Energy</h3>
      <p>
        A compressed or stretched spring stores elastic potential energy:
      </p>
      <MathBlock latex="PE_{\text{spring}} = \frac{1}{2}kx^2" display />
      <p>
        where <em>k</em> is the spring constant and <em>x</em> is the
        displacement from equilibrium.
      </p>

      <h2>Conservation of Mechanical Energy</h2>
      <p>
        When only conservative forces do work (no friction, no air resistance,
        no external pushes), the total mechanical energy is conserved:
      </p>
      <MathBlock latex="KE_i + PE_i = KE_f + PE_f" display />
      <p>
        This is a remarkably powerful tool. Instead of tracking forces at every
        instant, we can simply compare energies at two points in time and skip
        everything in between. The ball does not care <em>how</em> it got from
        point A to point B &mdash; only the heights and speeds at those two
        points matter.
      </p>
      <MathBlock latex="\frac{1}{2}mv_i^2 + mgh_i = \frac{1}{2}mv_f^2 + mgh_f" display />

      <h2>Visualizing KE and PE on a Slope</h2>
      <p>
        Use the sliders to adjust the height and mass of an object at the top
        of a frictionless slope. The graph shows how kinetic and potential
        energy trade off as the object descends. At the top, all energy is
        potential. At the bottom, all energy is kinetic. In between, the sum
        stays constant.
      </p>
      <SliderExploration
        title="Energy Exchange on a Frictionless Slope"
        description="Adjust the initial height (h) and mass (m). The curve shows KE = mgh₀ - mgx as the object descends from height h to ground level. The total energy mgh₀ is constant throughout."
        parameters={[
          { name: "m", label: "Mass m (kg)", min: 1, max: 10, step: 0.5, default: 2 },
          { name: "h", label: "Initial height h (m)", min: 1, max: 20, step: 1, default: 10 },
        ]}
        equation="m * 9.8 * (h - x)"
        xRange={[0, 20]}
        yRange={[0, 2000]}
      />

      <h2>Worked Example: Roller Coaster Energy Conservation</h2>
      <p>
        A roller coaster car (mass 500 kg) starts from rest at the top of a
        hill that is 40 m high. It then descends to a valley and climbs to a
        second hill that is 25 m high. Assuming no friction, find the speed of
        the car at (a) the bottom of the valley and (b) the top of the second
        hill. Use g = 10 m/s&sup2;.
      </p>
      <StepByStep
        title="Roller coaster energy conservation"
        steps={[
          {
            title: "Identify the energy at the starting point",
            content:
              "At the top of the first hill, the car is at rest (KE = 0) and at height h₁ = 40 m. All energy is potential.",
            latex: "E_{\\text{total}} = KE_i + PE_i = 0 + mgh_1 = 500 \\times 10 \\times 40 = 200{,}000 \\; \\text{J}",
          },
          {
            title: "Find the speed at the bottom of the valley",
            content:
              "At the valley floor, h = 0, so all energy is kinetic. By conservation of energy:",
            latex: "\\frac{1}{2}mv^2 = mgh_1 \\quad \\Rightarrow \\quad v = \\sqrt{2gh_1} = \\sqrt{2 \\times 10 \\times 40} = \\sqrt{800} \\approx 28.3 \\; \\text{m/s}",
          },
          {
            title: "Notice: mass cancelled out!",
            content:
              "The speed at the bottom does not depend on the mass of the car. A heavier car and a lighter car arrive at the same speed (on a frictionless track). This is analogous to how all objects fall at the same rate.",
          },
          {
            title: "Find the speed at the top of the second hill",
            content:
              "At height h₂ = 25 m, the car has both KE and PE. Using conservation:",
            latex: "mgh_1 = \\frac{1}{2}mv^2 + mgh_2 \\quad \\Rightarrow \\quad v = \\sqrt{2g(h_1 - h_2)}",
          },
          {
            title: "Calculate the numerical value",
            content:
              "Substituting the values:",
            latex: "v = \\sqrt{2 \\times 10 \\times (40 - 25)} = \\sqrt{2 \\times 10 \\times 15} = \\sqrt{300} \\approx 17.3 \\; \\text{m/s}",
          },
          {
            title: "Can the car reach a hill higher than 40 m?",
            content:
              "No! The car's total energy is mgh₁. To reach a height h, it needs at least mgh of potential energy. If h > h₁, there is not enough energy, and the car would stop before reaching the top. Energy conservation sets absolute limits on what is physically possible.",
          },
        ]}
      />

      <h2>When Energy Is Not Conserved: The Role of Friction</h2>
      <p>
        In real systems, friction converts mechanical energy into thermal energy
        (heat). The modified energy equation becomes:
      </p>
      <MathBlock latex="KE_i + PE_i = KE_f + PE_f + W_{\text{friction}}" display />
      <p>
        where <MathBlock latex="W_{\text{friction}}" /> is the magnitude of
        energy lost to friction (always positive, since friction removes
        mechanical energy). Even when friction is present, total energy (including
        thermal energy) is still conserved &mdash; it just becomes less useful
        for doing mechanical work. This is the essence of the second law of
        thermodynamics.
      </p>

      <h2>Power: The Rate of Energy Transfer</h2>
      <p>
        <strong>Power</strong> measures how fast work is done or energy is
        transferred:
      </p>
      <MathBlock latex="P = \frac{W}{t} = \frac{dE}{dt}" display />
      <p>
        For a force applied to an object moving at velocity <em>v</em>:
      </p>
      <MathBlock latex="P = Fv" display />
      <p>
        The SI unit of power is the <strong>watt</strong> (W), where 1 W = 1 J/s.
        A typical car engine produces about 150,000 W (200 horsepower) at peak
        performance.
      </p>

      <h2>Why Energy Methods Are So Powerful</h2>
      <p>
        Energy conservation lets you solve problems that would be nightmarishly
        difficult with forces alone. Consider a ball rolling down a winding,
        hilly track. To use <em>F = ma</em>, you would need to know the track&apos;s
        shape at every point to compute normal forces and friction. But with
        energy conservation, you only need the starting height and ending height.
        Everything in between is irrelevant (on a frictionless track).
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="energy-q1"
        question="A 2 kg ball is dropped from a height of 5 m. What is its speed just before hitting the ground? (Use g = 10 m/s², ignore air resistance.)"
        options={[
          {
            text: "5 m/s",
            feedback:
              "Check the formula: v = √(2gh) = √(2 × 10 × 5) = √100.",
          },
          {
            text: "10 m/s",
            feedback:
              "Correct! Using energy conservation: mgh = ½mv², so v = √(2gh) = √(100) = 10 m/s.",
          },
          {
            text: "50 m/s",
            feedback:
              "You may have forgotten the square root. v = √(2gh), not 2gh.",
          },
          {
            text: "100 m/s",
            feedback:
              "That is 2gh without the square root and without the factor of ½. Check the formula v = √(2gh).",
          },
        ]}
        correctIndex={1}
        hint="Use conservation of energy: mgh = ½mv². The mass cancels. Solve for v."
        explanation="By conservation of energy, mgh = ½mv², so v = √(2gh) = √(2 × 10 × 5) = √100 = 10 m/s. Notice the mass cancels — the speed is independent of mass."
      />

      <InteractiveQuestion
        id="energy-q2"
        question="A force of 10 N pushes an object 3 m along a surface, but the force acts at 60° to the direction of motion. How much work is done?"
        options={[
          {
            text: "30 J",
            feedback:
              "This would be the work if the force were parallel to motion (θ = 0°). You must account for the angle: W = Fd cos θ.",
          },
          {
            text: "15 J",
            feedback:
              "Correct! W = Fd cos θ = 10 × 3 × cos 60° = 10 × 3 × 0.5 = 15 J.",
          },
          {
            text: "26 J",
            feedback:
              "You may have used cos 30° instead of cos 60°. The angle between force and displacement is 60°.",
          },
          {
            text: "0 J",
            feedback:
              "Zero work only occurs when θ = 90°. At 60°, the force has a component along the direction of motion.",
          },
        ]}
        correctIndex={1}
        hint="Work = Fd cos θ. The angle θ is between the force vector and the displacement vector."
        explanation="W = Fd cos θ = (10 N)(3 m)(cos 60°) = 30 × 0.5 = 15 J. Only the component of force along the direction of motion does work."
      />
    </div>
  );
}
