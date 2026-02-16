"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { SliderExploration } from "@/components/interactive/SliderExploration";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function NewtonsLaws() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Three Laws That Govern Motion</h2>
      <p>
        Kinematics describes <em>how</em> objects move. Now we ask the deeper
        question: <em>why</em> do they move the way they do? The answer was
        given by Isaac Newton in 1687, in three laws so powerful and concise that
        they governed our understanding of the universe for over two centuries
        &mdash; and still work beautifully for everything from falling apples to
        orbiting planets (at everyday speeds and scales).
      </p>

      <h2>Newton&apos;s First Law: Inertia</h2>
      <p>
        <strong>
          An object at rest stays at rest, and an object in motion stays in
          motion with constant velocity, unless acted upon by a net external
          force.
        </strong>
      </p>
      <p>
        This sounds obvious, but it was revolutionary. Before Newton, people
        believed (following Aristotle) that objects naturally slow down and stop.
        Newton realized that stopping requires a force &mdash; friction, air
        resistance, or something else. In the absence of any force, an object
        would glide forever in a straight line at constant speed.
      </p>
      <p>
        The tendency of an object to resist changes in its velocity is called{" "}
        <strong>inertia</strong>, and mass is the quantitative measure of
        inertia. A bowling ball has more inertia than a tennis ball &mdash; it is
        harder to start, stop, or redirect.
      </p>
      <p>
        The first law also defines what an <strong>inertial reference frame</strong>{" "}
        is: any frame in which the first law holds. A train moving at constant
        velocity on smooth tracks is an inertial frame. An accelerating rocket is
        not.
      </p>

      <h2>Newton&apos;s Second Law: F = ma</h2>
      <p>
        The first law tells us what happens when there is no net force. The
        second law tells us what happens when there <em>is</em> one:
      </p>
      <MathBlock latex="\vec{F}_{\text{net}} = m\vec{a}" display />
      <p>
        The net force on an object equals its mass times its acceleration. This
        is the most important equation in classical mechanics. Let us unpack it:
      </p>
      <ul>
        <li>
          <strong>Force is a vector.</strong> It has both magnitude and direction.
          The net force is the vector sum of all individual forces acting on the
          object.
        </li>
        <li>
          <strong>Acceleration is proportional to force.</strong> Push twice as
          hard, and the object accelerates twice as fast.
        </li>
        <li>
          <strong>Acceleration is inversely proportional to mass.</strong> The
          same force applied to a heavier object produces less acceleration.
        </li>
      </ul>
      <MathBlock latex="a = \frac{F_{\text{net}}}{m}" display />
      <p>
        The SI unit of force is the <strong>newton</strong> (N), defined as the
        force needed to accelerate a 1 kg mass at 1 m/s&sup2;:
      </p>
      <MathBlock latex="1 \; \text{N} = 1 \; \text{kg} \cdot \text{m/s}^2" display />

      <h2>Explore: F = ma in Action</h2>
      <p>
        Use the sliders below to adjust the applied force and the mass.
        Watch how the resulting acceleration changes. Notice the inverse
        relationship between mass and acceleration for a fixed force.
      </p>
      <SliderExploration
        title="Newton's Second Law: F = ma"
        description="Adjust the force (F) and mass (m) to see how acceleration (a = F/m) responds. Try doubling the force — does the acceleration double? Try doubling the mass — what happens?"
        parameters={[
          { name: "F", label: "Force F (N)", min: 1, max: 50, step: 1, default: 10 },
          { name: "m", label: "Mass m (kg)", min: 1, max: 20, step: 0.5, default: 5 },
        ]}
        equation="(F/m)*x"
        xRange={[0, 5]}
        yRange={[0, 60]}
      />

      <h2>Newton&apos;s Third Law: Action and Reaction</h2>
      <p>
        <strong>
          For every action, there is an equal and opposite reaction.
        </strong>
      </p>
      <p>
        When you push on a wall, the wall pushes back on you with the same force.
        When Earth pulls you down with gravity, you pull Earth up with the same
        gravitational force. These are called <strong>action-reaction pairs</strong>,
        and they always:
      </p>
      <ul>
        <li>Have equal magnitude</li>
        <li>Point in opposite directions</li>
        <li>Act on <em>different</em> objects</li>
      </ul>
      <MathBlock latex="\vec{F}_{A \to B} = -\vec{F}_{B \to A}" display />
      <p>
        The critical detail is that action-reaction forces act on{" "}
        <em>different</em> objects. This is why they do not cancel each other
        out. When you push a box, the box accelerates because of the force{" "}
        <em>you</em> exert on <em>it</em>. The equal and opposite force that
        the box exerts on <em>you</em> is what you feel as resistance, but it
        acts on your body, not on the box.
      </p>

      <h2>A Common Misconception</h2>
      <p>
        Students often ask: &ldquo;If action and reaction forces are always
        equal, how does anything ever accelerate?&rdquo; The answer lies in
        the detail above. The two forces act on <em>different objects</em>.
        To determine whether an object accelerates, you only consider the
        forces acting <em>on that object</em>. The action-reaction pair is
        split across two different free-body diagrams.
      </p>

      <h2>Worked Example: The Atwood Machine</h2>
      <p>
        The Atwood machine is a classic physics problem that beautifully
        demonstrates Newton&apos;s second law. It consists of two masses
        connected by a string over a frictionless, massless pulley.
      </p>
      <StepByStep
        title="Find the acceleration and tension in an Atwood machine with m₁ = 5 kg and m₂ = 3 kg"
        steps={[
          {
            title: "Draw free-body diagrams",
            content:
              "For mass m₁ (heavier): gravity pulls it down (m₁g) and tension pulls it up (T). For mass m₂ (lighter): gravity pulls it down (m₂g) and tension pulls it up (T). The tension is the same throughout the string (massless, inextensible string).",
          },
          {
            title: "Write Newton's second law for each mass",
            content:
              "Taking downward as positive for m₁ and upward as positive for m₂ (so both accelerate in the positive direction with the same magnitude a):",
            latex: "m_1 g - T = m_1 a \\qquad \\text{and} \\qquad T - m_2 g = m_2 a",
          },
          {
            title: "Add the two equations",
            content:
              "Adding eliminates the tension T:",
            latex: "m_1 g - m_2 g = (m_1 + m_2)a",
          },
          {
            title: "Solve for acceleration",
            content:
              "Factor and isolate a:",
            latex: "a = \\frac{(m_1 - m_2)}{(m_1 + m_2)}\\,g = \\frac{(5 - 3)}{(5 + 3)} \\times 9.8 = \\frac{2}{8} \\times 9.8 = 2.45 \\; \\text{m/s}^2",
          },
          {
            title: "Solve for tension",
            content:
              "Substitute back into either equation. Using the second equation:",
            latex: "T = m_2(g + a) = 3(9.8 + 2.45) = 3(12.25) = 36.75 \\; \\text{N}",
          },
          {
            title: "Check limiting cases",
            content:
              "If m₁ = m₂, then a = 0 (the system is balanced). If m₂ = 0, then a = g (free fall). Both make physical sense, confirming our formula.",
          },
        ]}
      />

      <h2>The Deep Insight: Force as Interaction</h2>
      <p>
        Newton&apos;s laws reframe motion as a story about{" "}
        <strong>interactions</strong>. An object does not just &ldquo;move&rdquo;
        &mdash; it responds to pushes and pulls from everything around it.
        The first law establishes the default behavior (constant velocity).
        The second law quantifies how forces change that behavior. The third law
        ensures that forces always come in pairs, reflecting the fact that
        interaction is a two-way street.
      </p>
      <p>
        Together, these three laws (plus a specification of the forces involved)
        are sufficient to predict the motion of planets, bridges, rockets, and
        everything in between. They are the backbone of engineering, and they
        remain valid for all practical purposes in everyday life.
      </p>

      <h2>Applying Newton&apos;s Laws: A Strategy</h2>
      <p>
        Here is a systematic approach to solving any Newton&apos;s second law problem:
      </p>
      <ol>
        <li><strong>Identify the system</strong> &mdash; what object are you analyzing?</li>
        <li><strong>Draw a free-body diagram (FBD)</strong> &mdash; draw the object as a dot and draw all forces acting on it as arrows.</li>
        <li><strong>Choose a coordinate system</strong> &mdash; pick axes that simplify the math (e.g., along the direction of acceleration).</li>
        <li><strong>Apply F = ma</strong> along each axis.</li>
        <li><strong>Solve</strong> the resulting equations.</li>
      </ol>

      <RevealAnswer label="Bonus: Why does the heavier mass NOT fall at g?">
        <p>
          In the Atwood machine, the heavier mass does not fall at g because
          the string connects it to the lighter mass. The tension in the string
          partially supports the heavier mass while simultaneously pulling the
          lighter mass upward. The system accelerates as a <em>whole</em>, and
          the net driving force (m&#8321;g &minus; m&#8322;g) must accelerate the
          total mass (m&#8321; + m&#8322;). This is why the acceleration is always
          less than g when both masses are nonzero.
        </p>
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="newton-q1"
        question="A 2 kg object experiences a net force of 10 N. What is its acceleration?"
        options={[
          {
            text: "20 m/s²",
            feedback:
              "You multiplied F × m instead of dividing. Acceleration is a = F/m.",
          },
          {
            text: "5 m/s²",
            feedback:
              "Correct! a = F/m = 10/2 = 5 m/s².",
          },
          {
            text: "0.2 m/s²",
            feedback:
              "You computed m/F instead of F/m. Try again.",
          },
          {
            text: "10 m/s²",
            feedback:
              "That would be the case for a 1 kg object. Remember to divide by mass.",
          },
        ]}
        correctIndex={1}
        hint="Newton's second law: a = F_net / m."
        explanation="Using F = ma, we get a = F/m = 10 N / 2 kg = 5 m/s². The force and acceleration point in the same direction."
      />

      <InteractiveQuestion
        id="newton-q2"
        question="You push against a wall with 50 N of force. The wall does not move. Which of the following correctly describes the action-reaction pair?"
        options={[
          {
            text: "Your push and the friction from the floor on your feet",
            feedback:
              "These forces act on different objects but are not an action-reaction pair — they arise from different interactions.",
          },
          {
            text: "Your push on the wall and the wall's push back on you, both 50 N",
            feedback:
              "Correct! This is the action-reaction pair: you push the wall with 50 N, and the wall pushes you with 50 N in the opposite direction.",
          },
          {
            text: "Your push and the normal force from the ground on the wall",
            feedback:
              "The normal force from the ground acts on the wall but pairs with the wall pushing on the ground, not with your push.",
          },
          {
            text: "Your push on the wall and gravity pulling you down",
            feedback:
              "These are completely different interactions. The reaction to gravity on you is your gravitational pull on Earth.",
          },
        ]}
        correctIndex={1}
        hint="Action-reaction pairs involve the same two objects interacting with each other. Who is pushing whom?"
        explanation="By Newton's third law, if you push the wall with 50 N, the wall pushes you with 50 N in the opposite direction. They act on different objects (you and the wall), which is why they don't cancel."
      />
    </div>
  );
}
