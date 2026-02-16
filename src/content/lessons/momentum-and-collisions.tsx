"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function MomentumAndCollisions() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Another Conserved Quantity</h2>
      <p>
        In the previous lesson, we discovered that energy is conserved. Now we
        meet another conserved quantity: <strong>momentum</strong>. While energy
        tells us about the <em>capacity to do work</em>, momentum captures the
        <em>quantity of motion</em> itself &mdash; how hard it is to stop a
        moving object.
      </p>
      <p>
        A slowly rolling bowling ball and a speeding bullet might have the same
        kinetic energy, but they feel very different to stop. Momentum captures
        this difference. It is defined as:
      </p>
      <MathBlock latex="\vec{p} = m\vec{v}" display />
      <p>
        Momentum is a <strong>vector</strong>: it has both magnitude and
        direction. A 0.01 kg bullet moving at 500 m/s has momentum{" "}
        <em>p</em> = 5 kg&middot;m/s, while a 5 kg bowling ball moving at
        1 m/s also has <em>p</em> = 5 kg&middot;m/s. Same momentum, same
        difficulty to bring to rest &mdash; but very different energies.
      </p>
      <p>
        The SI unit of momentum is kg&middot;m/s. There is no special name for
        this unit.
      </p>

      <h2>Newton&apos;s Second Law, Rewritten</h2>
      <p>
        Newton originally stated his second law not as <em>F = ma</em> but as:
      </p>
      <MathBlock latex="\vec{F}_{\text{net}} = \frac{d\vec{p}}{dt}" display />
      <p>
        Force is the rate of change of momentum. When mass is constant, this
        reduces to the familiar <em>F = ma</em>. But the momentum form is
        more fundamental because it also handles situations where mass changes
        (like a rocket burning fuel or a raindrop accumulating water).
      </p>

      <h2>Impulse: Force over Time</h2>
      <p>
        When a net force acts on an object for a time interval &Delta;t, it
        delivers an <strong>impulse</strong>:
      </p>
      <MathBlock latex="\vec{J} = \vec{F}_{\text{avg}} \cdot \Delta t = \Delta \vec{p}" display />
      <p>
        The <strong>impulse-momentum theorem</strong> states that the impulse
        equals the change in momentum. This has practical consequences:
      </p>
      <ul>
        <li>
          <strong>Airbags and crumple zones</strong> increase the collision time
          &Delta;t. Since the impulse (change in momentum) is fixed by the crash
          speed, a longer time means a smaller average force on the occupants.
        </li>
        <li>
          <strong>Catching a ball:</strong> You instinctively move your hands
          backward to increase the stopping time, reducing the force on your
          hands.
        </li>
        <li>
          <strong>Martial arts:</strong> A punch aims to minimize contact time,
          maximizing the force delivered for a given impulse.
        </li>
      </ul>

      <h2>Conservation of Momentum</h2>
      <p>
        Here is the big theorem: when no <em>external</em> net force acts on a
        system of objects, the total momentum of the system is conserved:
      </p>
      <MathBlock latex="\vec{p}_{\text{total,before}} = \vec{p}_{\text{total,after}}" display />
      <p>
        This holds even when the objects within the system exert huge forces on
        each other (like in a collision). Internal forces always come in
        Newton&apos;s-third-law pairs that cancel when you sum over the whole
        system. Only external forces can change the total momentum.
      </p>
      <p>
        For two objects colliding:
      </p>
      <MathBlock latex="m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}" display />
      <p>
        This equation is one of the most useful tools in all of mechanics.
      </p>

      <h2>Types of Collisions</h2>
      <p>
        Collisions are classified by what happens to kinetic energy:
      </p>
      <h3>Elastic Collisions</h3>
      <p>
        Both momentum <em>and</em> kinetic energy are conserved. The objects
        bounce off each other without any permanent deformation or heat
        generation. Ideal billiard ball collisions are approximately elastic.
      </p>
      <MathBlock latex="\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2" display />

      <h3>Inelastic Collisions</h3>
      <p>
        Momentum is conserved, but some kinetic energy is converted to other
        forms (heat, sound, deformation). Most real collisions are inelastic.
      </p>

      <h3>Perfectly Inelastic Collisions</h3>
      <p>
        The maximum possible kinetic energy is lost. The objects stick together
        and move as one unit after the collision. Conservation of momentum gives:
      </p>
      <MathBlock latex="m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)v_f" display />
      <MathBlock latex="v_f = \frac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2}" display />

      <h2>Worked Example: Two-Body Elastic Collision</h2>
      <p>
        A 2 kg ball moving at 6 m/s to the right collides head-on with a 4 kg
        ball that is initially at rest. The collision is perfectly elastic. Find
        the velocities of both balls after the collision.
      </p>
      <StepByStep
        title="Elastic collision: 2 kg ball hitting a stationary 4 kg ball"
        steps={[
          {
            title: "Write the conservation of momentum equation",
            content:
              "Let v₁ and v₂ be the final velocities of the 2 kg and 4 kg balls, respectively. The 4 kg ball starts at rest (v₂ᵢ = 0).",
            latex: "m_1 v_{1i} + m_2 v_{2i} = m_1 v_1 + m_2 v_2 \\quad \\Rightarrow \\quad 2(6) + 4(0) = 2v_1 + 4v_2",
          },
          {
            title: "Simplify the momentum equation",
            content:
              "This gives us our first equation relating v₁ and v₂:",
            latex: "12 = 2v_1 + 4v_2 \\quad \\Rightarrow \\quad 6 = v_1 + 2v_2 \\quad \\text{...(1)}",
          },
          {
            title: "Write the conservation of kinetic energy equation",
            content:
              "Since the collision is elastic:",
            latex: "\\frac{1}{2}(2)(6)^2 = \\frac{1}{2}(2)v_1^2 + \\frac{1}{2}(4)v_2^2 \\quad \\Rightarrow \\quad 36 = v_1^2 + 2v_2^2 \\quad \\text{...(2)}",
          },
          {
            title: "Use the relative velocity shortcut",
            content:
              "For elastic collisions, there is a powerful shortcut: the relative velocity of approach equals the relative velocity of separation (with opposite sign). This avoids solving a quadratic.",
            latex: "v_{1i} - v_{2i} = -(v_1 - v_2) \\quad \\Rightarrow \\quad 6 - 0 = v_2 - v_1 \\quad \\text{...(3)}",
          },
          {
            title: "Solve the system of equations",
            content:
              "From equations (1) and (3): v₁ + 2v₂ = 6 and v₂ − v₁ = 6. Adding these: 3v₂ = 12, so v₂ = 4 m/s. Substituting back: v₁ = 6 − 2(4) = −2 m/s.",
            latex: "v_1 = -2 \\; \\text{m/s (bounces back)}, \\quad v_2 = 4 \\; \\text{m/s (moves forward)}",
          },
          {
            title: "Verify: check momentum and energy conservation",
            content:
              "Momentum: 2(−2) + 4(4) = −4 + 16 = 12 ✓. Energy: ½(2)(4) + ½(4)(16) = 4 + 32 = 36 ✓. Both are conserved.",
            latex: "p_f = 12 \\; \\text{kg·m/s} \\; \\checkmark, \\quad KE_f = 36 \\; \\text{J} \\; \\checkmark",
          },
        ]}
      />
      <p>
        Notice a pattern: when a lighter object hits a heavier stationary one
        elastically, the lighter one bounces back. When a heavier object hits a
        lighter one, both move forward. And when equal masses collide
        elastically, the first one stops completely and the second one takes
        off with the first one&apos;s velocity (this is what happens in a Newton&apos;s
        cradle).
      </p>

      <h2>Collision Simulator</h2>
      <p>
        The Python code below simulates a one-dimensional elastic collision
        between two objects. Try changing the masses and initial velocities to
        see how the final velocities change. Verify that both momentum and
        kinetic energy are conserved.
      </p>
      <CodeEditor
        language="python"
        initialCode={`# Elastic collision simulator
# Change these values and observe the results

m1 = 2.0   # mass of object 1 (kg)
m2 = 4.0   # mass of object 2 (kg)
v1i = 6.0  # initial velocity of object 1 (m/s)
v2i = 0.0  # initial velocity of object 2 (m/s)

# Elastic collision formulas
v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2)
v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2)

print(f"=== Elastic Collision Results ===")
print(f"Object 1: m={m1} kg, v_i={v1i} m/s -> v_f={v1f:.2f} m/s")
print(f"Object 2: m={m2} kg, v_i={v2i} m/s -> v_f={v2f:.2f} m/s")

# Verify conservation laws
p_before = m1 * v1i + m2 * v2i
p_after = m1 * v1f + m2 * v2f
ke_before = 0.5 * m1 * v1i**2 + 0.5 * m2 * v2i**2
ke_after = 0.5 * m1 * v1f**2 + 0.5 * m2 * v2f**2

print(f"\\nMomentum before: {p_before:.2f} kg*m/s")
print(f"Momentum after:  {p_after:.2f} kg*m/s")
print(f"KE before: {ke_before:.2f} J")
print(f"KE after:  {ke_after:.2f} J")

# Try a perfectly inelastic collision too
v_stuck = (m1 * v1i + m2 * v2i) / (m1 + m2)
ke_inelastic = 0.5 * (m1 + m2) * v_stuck**2
ke_lost = ke_before - ke_inelastic

print(f"\\n=== Perfectly Inelastic Collision ===")
print(f"Combined velocity: {v_stuck:.2f} m/s")
print(f"KE after: {ke_inelastic:.2f} J")
print(f"KE lost to deformation/heat: {ke_lost:.2f} J")
print(f"Fraction of KE lost: {ke_lost/ke_before:.1%}")`}
        solution={`# Elastic collision simulator
# Example: Equal masses — the first ball stops!

m1 = 3.0   # mass of object 1 (kg)
m2 = 3.0   # mass of object 2 (kg)
v1i = 8.0  # initial velocity of object 1 (m/s)
v2i = 0.0  # initial velocity of object 2 (m/s)

# Elastic collision formulas
v1f = ((m1 - m2) * v1i + 2 * m2 * v2i) / (m1 + m2)
v2f = ((m2 - m1) * v2i + 2 * m1 * v1i) / (m1 + m2)

print(f"=== Elastic Collision Results ===")
print(f"Object 1: m={m1} kg, v_i={v1i} m/s -> v_f={v1f:.2f} m/s")
print(f"Object 2: m={m2} kg, v_i={v2i} m/s -> v_f={v2f:.2f} m/s")

# Verify conservation laws
p_before = m1 * v1i + m2 * v2i
p_after = m1 * v1f + m2 * v2f
ke_before = 0.5 * m1 * v1i**2 + 0.5 * m2 * v2i**2
ke_after = 0.5 * m1 * v1f**2 + 0.5 * m2 * v2f**2

print(f"\\nMomentum before: {p_before:.2f} kg*m/s")
print(f"Momentum after:  {p_after:.2f} kg*m/s")
print(f"KE before: {ke_before:.2f} J")
print(f"KE after:  {ke_after:.2f} J")

# Try a perfectly inelastic collision too
v_stuck = (m1 * v1i + m2 * v2i) / (m1 + m2)
ke_inelastic = 0.5 * (m1 + m2) * v_stuck**2
ke_lost = ke_before - ke_inelastic

print(f"\\n=== Perfectly Inelastic Collision ===")
print(f"Combined velocity: {v_stuck:.2f} m/s")
print(f"KE after: {ke_inelastic:.2f} J")
print(f"KE lost to deformation/heat: {ke_lost:.2f} J")
print(f"Fraction of KE lost: {ke_lost/ke_before:.1%}")`}
      />

      <h2>Challenge: Perfectly Inelastic Collision</h2>
      <RevealAnswer label="Reveal the solution">
        <p>
          <strong>Problem:</strong> A 1500 kg car moving at 20 m/s rear-ends a
          1000 kg car that is stopped at a red light. The cars lock bumpers and
          move together. Find their combined velocity and the fraction of kinetic
          energy lost.
        </p>
        <p>
          <strong>Conservation of momentum:</strong>
        </p>
        <MathBlock
          latex="m_1 v_{1i} + m_2 v_{2i} = (m_1 + m_2)v_f"
          display
        />
        <MathBlock
          latex="1500(20) + 1000(0) = (1500 + 1000)v_f"
          display
        />
        <MathBlock
          latex="30{,}000 = 2500 \, v_f \quad \Rightarrow \quad v_f = 12 \; \text{m/s}"
          display
        />
        <p>
          <strong>Kinetic energy analysis:</strong>
        </p>
        <MathBlock
          latex="KE_i = \frac{1}{2}(1500)(20)^2 = 300{,}000 \; \text{J}"
          display
        />
        <MathBlock
          latex="KE_f = \frac{1}{2}(2500)(12)^2 = 180{,}000 \; \text{J}"
          display
        />
        <MathBlock
          latex="\text{Fraction lost} = \frac{300{,}000 - 180{,}000}{300{,}000} = \frac{120{,}000}{300{,}000} = 40\%"
          display
        />
        <p>
          A full 40% of the kinetic energy is converted to heat, sound, and
          deformation of the vehicles. This is why car crashes are so destructive:
          even at moderate speeds, enormous amounts of energy are dissipated.
          The 120 kJ lost here is equivalent to dropping a 1200 kg object from
          a height of 10 m.
        </p>
      </RevealAnswer>

      <h2>Momentum in Two Dimensions</h2>
      <p>
        Momentum conservation applies independently to each direction. For a
        collision in two dimensions:
      </p>
      <MathBlock latex="m_1 v_{1x,i} + m_2 v_{2x,i} = m_1 v_{1x,f} + m_2 v_{2x,f}" display />
      <MathBlock latex="m_1 v_{1y,i} + m_2 v_{2y,i} = m_1 v_{1y,f} + m_2 v_{2y,f}" display />
      <p>
        This is used to analyze glancing collisions (like billiard balls hitting
        off-center) and explosions (where one object breaks into multiple
        pieces flying in different directions).
      </p>

      <h2>The Deep Connection Between Symmetry and Conservation</h2>
      <p>
        Why is momentum conserved? The answer, revealed by mathematician Emmy
        Noether in 1915, is one of the most beautiful results in physics:{" "}
        <strong>every symmetry of nature corresponds to a conservation law.</strong>
      </p>
      <ul>
        <li>
          <strong>Translational symmetry</strong> (the laws of physics are the
          same everywhere in space) gives <strong>conservation of momentum</strong>.
        </li>
        <li>
          <strong>Time symmetry</strong> (the laws of physics do not change over
          time) gives <strong>conservation of energy</strong>.
        </li>
        <li>
          <strong>Rotational symmetry</strong> (the laws of physics are the same
          in every direction) gives <strong>conservation of angular momentum</strong>.
        </li>
      </ul>
      <p>
        Noether&apos;s theorem elevates conservation laws from useful
        computational tricks to profound statements about the structure of the
        universe. Momentum is conserved not because of some arbitrary rule,
        but because space itself is uniform.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="momentum-q1"
        question="A 3 kg object moving at 4 m/s collides with a 1 kg object at rest. They stick together. What is their combined velocity?"
        options={[
          {
            text: "4 m/s",
            feedback:
              "This would only be true if the 1 kg object vanished. The combined mass is 4 kg, which slows the system down.",
          },
          {
            text: "3 m/s",
            feedback:
              "Correct! Using conservation of momentum: 3(4) + 1(0) = (3+1)v, so 12 = 4v, giving v = 3 m/s.",
          },
          {
            text: "1 m/s",
            feedback:
              "Check your algebra. 12/(3+1) = 12/4 = 3 m/s.",
          },
          {
            text: "12 m/s",
            feedback:
              "That is the total momentum (12 kg·m/s), not the velocity. Divide by the total mass.",
          },
        ]}
        correctIndex={1}
        hint="In a perfectly inelastic collision (objects stick together), use p_before = (m₁ + m₂)v_f."
        explanation="Conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f. So 3(4) + 1(0) = 4v_f, giving v_f = 12/4 = 3 m/s."
      />

      <InteractiveQuestion
        id="momentum-q2"
        question="Why do airbags reduce injuries in car crashes?"
        options={[
          {
            text: "They reduce the total impulse experienced by the occupant",
            feedback:
              "The impulse (change in momentum) is determined by the crash speed and cannot be reduced by airbags.",
          },
          {
            text: "They increase the time over which the momentum change occurs, reducing the average force",
            feedback:
              "Correct! Since J = FΔt = Δp, and Δp is fixed, increasing Δt decreases F. The airbag extends the deceleration time from milliseconds to tens of milliseconds.",
          },
          {
            text: "They absorb all the kinetic energy of the occupant",
            feedback:
              "Airbags do absorb some energy, but their primary mechanism is increasing the collision time to reduce peak force.",
          },
          {
            text: "They reduce the mass of the occupant",
            feedback:
              "Airbags obviously do not change the occupant's mass. They work by extending the deceleration time.",
          },
        ]}
        correctIndex={1}
        hint="Think about the impulse-momentum theorem: J = FΔt = Δp. If the change in momentum is fixed by the crash, what can we change?"
        explanation="The impulse-momentum theorem says Δp = F·Δt. The change in momentum is determined by the crash speed and mass. Airbags increase Δt (from ~5 ms to ~50 ms), which reduces the average force F by the same factor — roughly 10x."
      />
    </div>
  );
}
