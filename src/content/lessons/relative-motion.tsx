"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function RelativeMotion() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Motion Depends on Who Is Watching</h2>
      <p>
        Imagine you are sitting on a train moving at 80 km/h. You toss a ball
        straight up and catch it. From <em>your</em> perspective, the ball went
        straight up and came straight down. But a person standing on the platform
        sees the ball trace a parabolic arc, because it was also moving
        horizontally at 80 km/h along with you and the train.
      </p>
      <p>
        Who is right? <strong>Both of you.</strong> There is no absolute
        &ldquo;true&rdquo; velocity. All motion is relative to a chosen{" "}
        <strong>reference frame</strong> &mdash; a coordinate system attached to
        a particular observer. This idea is one of the deepest principles in
        physics, and it forms the foundation of both Newtonian mechanics and
        Einstein&apos;s relativity.
      </p>

      <h2>Reference Frames</h2>
      <p>
        A <strong>reference frame</strong> is simply a choice of origin and
        coordinate axes that an observer uses to measure positions and
        velocities. Common examples:
      </p>
      <ul>
        <li>The ground (the &ldquo;lab frame&rdquo; or &ldquo;Earth frame&rdquo;)</li>
        <li>A moving train or airplane</li>
        <li>A spinning merry-go-round</li>
      </ul>
      <p>
        An <strong>inertial reference frame</strong> is one that is not
        accelerating &mdash; it moves at constant velocity (or is at rest).
        Newton&apos;s laws take their simplest form in inertial frames. A
        spinning or accelerating frame is called a{" "}
        <strong>non-inertial frame</strong>, and strange &ldquo;fictitious
        forces&rdquo; (like the centrifugal force on a merry-go-round) appear in
        such frames.
      </p>

      <h2>Galilean Velocity Addition</h2>
      <p>
        In classical mechanics (speeds much less than the speed of light), the
        rule for converting velocities between frames is remarkably simple.
        If frame B moves with velocity{" "}
        <MathBlock latex="\vec{v}_{B/A}" /> relative to frame A, and an
        object has velocity <MathBlock latex="\vec{v}_{obj/B}" /> in frame B,
        then its velocity in frame A is:
      </p>
      <MathBlock
        latex="\vec{v}_{obj/A} = \vec{v}_{obj/B} + \vec{v}_{B/A}"
        display
      />
      <p>
        This is <strong>Galilean velocity addition</strong>: you simply add
        the velocity vectors. The subscript notation reads like a chain:
        &ldquo;object relative to A&rdquo; equals &ldquo;object relative to
        B&rdquo; plus &ldquo;B relative to A.&rdquo; The middle subscripts (B)
        cancel, much like fractions.
      </p>

      <h2>One-Dimensional Examples</h2>
      <p>
        Consider a person walking at 1.5 m/s toward the front of a train that
        moves at 30 m/s relative to the ground. From the ground frame:
      </p>
      <MathBlock
        latex="v_{\text{person/ground}} = v_{\text{person/train}} + v_{\text{train/ground}} = 1.5 + 30 = 31.5 \; \text{m/s}"
        display
      />
      <p>
        If the person instead walks toward the <em>rear</em> of the train (i.e.,
        at &minus;1.5 m/s relative to the train), the ground velocity is
        30 &minus; 1.5 = 28.5 m/s. The addition rule handles signs
        automatically.
      </p>

      <h2>Two-Dimensional Velocity Addition</h2>
      <p>
        When velocities point in different directions, we must add them as
        vectors. This is where relative motion problems become interesting.
        The most classic example is a boat crossing a river.
      </p>
      <SliderExploration
        title="Boat Crossing a River"
        description="A boat tries to cross a river. Adjust the river current speed to see how it affects the boat's actual path. The boat always aims straight across, but the current pushes it downstream."
        parameters={[
          { name: "c", label: "River current speed (m/s)", min: 0, max: 5, step: 0.25, default: 2 },
        ]}
        equation="(c/3)*x"
        xRange={[0, 10]}
        yRange={[0, 20]}
      />

      <h2>Worked Example: Boat Crossing a River</h2>
      <p>
        A boat can travel at 5 m/s in still water. It needs to cross a river
        that is 80 m wide and has a current of 3 m/s flowing eastward. The boat
        aims straight north (perpendicular to the riverbank). Find the
        boat&apos;s actual velocity, the time to cross, and how far downstream
        it lands.
      </p>
      <StepByStep
        title="Boat crossing a river with perpendicular velocity addition"
        steps={[
          {
            title: "Define the reference frame",
            content:
              "Let north (across the river) be the y-direction and east (downstream) be the x-direction. The boat's velocity relative to the water is purely in the y-direction: v_boat/water = 5 m/s north. The water's velocity relative to the ground is purely in the x-direction: v_water/ground = 3 m/s east.",
            latex: "\\vec{v}_{B/W} = (0, 5) \\; \\text{m/s}, \\quad \\vec{v}_{W/G} = (3, 0) \\; \\text{m/s}",
          },
          {
            title: "Apply Galilean velocity addition",
            content:
              "The boat's velocity relative to the ground is the vector sum:",
            latex: "\\vec{v}_{B/G} = \\vec{v}_{B/W} + \\vec{v}_{W/G} = (3, 5) \\; \\text{m/s}",
          },
          {
            title: "Find the speed and direction",
            content:
              "The magnitude of the resultant velocity tells us the actual speed. The angle tells us the drift direction.",
            latex: "|\\vec{v}_{B/G}| = \\sqrt{3^2 + 5^2} = \\sqrt{34} \\approx 5.83 \\; \\text{m/s}",
          },
          {
            title: "Calculate the crossing time",
            content:
              "The time to cross depends only on the component of velocity perpendicular to the river (the y-component). The current does not help or hinder the crossing.",
            latex: "t = \\frac{80 \\; \\text{m}}{5 \\; \\text{m/s}} = 16 \\; \\text{s}",
          },
          {
            title: "Calculate the downstream drift",
            content:
              "During those 16 seconds, the current carries the boat eastward.",
            latex: "d = v_{\\text{current}} \\times t = 3 \\times 16 = 48 \\; \\text{m downstream}",
          },
        ]}
      />
      <p>
        A key insight: if the boat wants to land directly across (zero drift),
        it must aim upstream at an angle. The upstream component of its velocity
        must exactly cancel the current. Can you figure out the required angle?
      </p>

      <h2>The Symmetry of Relative Velocity</h2>
      <p>
        Relative velocity obeys an important symmetry. If object A sees object B
        moving at velocity <em>v</em> to the right, then object B sees object A
        moving at velocity <em>v</em> to the <em>left</em>:
      </p>
      <MathBlock latex="\vec{v}_{A/B} = -\vec{v}_{B/A}" display />
      <p>
        This is intuitive once you think about it: if you see a car approaching
        you at 60 km/h, the car&apos;s driver sees you approaching at 60 km/h
        from the opposite direction.
      </p>

      <h2>Inertial vs. Non-Inertial Frames</h2>
      <p>
        Newton&apos;s laws work perfectly in inertial frames (constant velocity).
        But in an accelerating frame, objects appear to accelerate for no
        apparent reason. To make Newton&apos;s laws &ldquo;work&rdquo; in such
        frames, we introduce <strong>fictitious forces</strong>:
      </p>
      <ul>
        <li>
          <strong>Centrifugal force</strong> &mdash; pushes objects outward in a
          rotating frame (why you feel thrown sideways in a turning car).
        </li>
        <li>
          <strong>Coriolis force</strong> &mdash; deflects moving objects in a
          rotating frame (why hurricanes rotate and why long-range artillery
          must account for Earth&apos;s rotation).
        </li>
      </ul>
      <p>
        These forces are &ldquo;fictitious&rdquo; because they vanish when you
        switch back to an inertial frame. They are mathematical consequences of
        choosing a non-inertial reference frame, not real interactions between
        objects.
      </p>

      <h2>Challenge Problem</h2>
      <RevealAnswer label="Reveal the solution">
        <p>
          <strong>Problem:</strong> An airplane has an airspeed of 250 km/h and
          needs to fly due north. There is a crosswind of 50 km/h blowing from
          west to east. At what angle west of north must the pilot aim the plane?
        </p>
        <p>
          <strong>Solution:</strong> The pilot must aim the plane so that the
          eastward component of the plane&apos;s velocity (relative to the air)
          exactly cancels the crosswind. Let &theta; be the angle west of north.
        </p>
        <MathBlock
          latex="\sin\theta = \frac{v_{\text{wind}}}{v_{\text{airspeed}}} = \frac{50}{250} = 0.2"
          display
        />
        <MathBlock
          latex="\theta = \arcsin(0.2) \approx 11.5° \text{ west of north}"
          display
        />
        <p>
          The plane&apos;s ground speed (the northward component) will be:
        </p>
        <MathBlock
          latex="v_{\text{ground}} = 250\cos(11.5°) \approx 245 \; \text{km/h}"
          display
        />
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="rel-q1"
        question="A passenger on a train moving at 25 m/s throws a ball at 10 m/s toward the front of the train. What is the ball's speed relative to the ground?"
        options={[
          {
            text: "15 m/s",
            feedback:
              "That would be the case if the ball were thrown toward the rear. The ball is thrown forward, so velocities add.",
          },
          {
            text: "25 m/s",
            feedback:
              "That would mean the ball's velocity relative to the train is zero. Add the two velocities.",
          },
          {
            text: "35 m/s",
            feedback:
              "Correct! By Galilean addition: 10 + 25 = 35 m/s relative to the ground.",
          },
          {
            text: "250 m/s",
            feedback:
              "You may have multiplied instead of added. Galilean velocity addition is a sum, not a product.",
          },
        ]}
        correctIndex={2}
        hint="Use the Galilean velocity addition formula: v_ball/ground = v_ball/train + v_train/ground."
        explanation="The ball's ground velocity is the sum of its velocity relative to the train (10 m/s forward) and the train's velocity relative to the ground (25 m/s forward): 10 + 25 = 35 m/s."
      />

      <InteractiveQuestion
        id="rel-q2"
        question="A boat can travel at 4 m/s in still water. It crosses a river with a 3 m/s current, aiming straight across. What is the boat's actual speed relative to the ground?"
        options={[
          {
            text: "1 m/s",
            feedback:
              "Subtracting would only apply if the velocities were in opposite directions. Here they are perpendicular.",
          },
          {
            text: "5 m/s",
            feedback:
              "Correct! The two perpendicular velocities form a right triangle: √(4² + 3²) = √25 = 5 m/s.",
          },
          {
            text: "7 m/s",
            feedback:
              "You added the magnitudes directly, but perpendicular vectors must be combined using the Pythagorean theorem.",
          },
          {
            text: "3.5 m/s",
            feedback:
              "That would be the average of the two speeds. Use the Pythagorean theorem for perpendicular velocities.",
          },
        ]}
        correctIndex={1}
        hint="The boat's velocity across the river and the current's velocity downstream are perpendicular. Use the Pythagorean theorem."
        explanation="Since the velocities are perpendicular, the resultant speed is √(4² + 3²) = √(16 + 9) = √25 = 5 m/s. This is a classic 3-4-5 right triangle."
      />
    </div>
  );
}
