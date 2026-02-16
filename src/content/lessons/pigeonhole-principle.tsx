"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { SliderExploration } from "@/components/interactive/SliderExploration";

export default function PigeonholePrinciple() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>The Pigeonhole Principle: Simple Idea, Powerful Results</h2>
      <p>
        The <strong>pigeonhole principle</strong> is one of the simplest yet most
        surprisingly powerful ideas in all of mathematics. The statement is
        almost embarrassingly obvious: if you put more pigeons than pigeonholes,
        at least one pigeonhole must contain more than one pigeon. And yet, this
        trivial observation proves deep and non-trivial theorems.
      </p>
      <MathBlock
        latex="\text{If } n \text{ items are placed into } m \text{ containers and } n > m, \text{ then at least one container holds } \geq 2 \text{ items.}"
        display
      />
      <p>
        The principle is a pure existence result &mdash; it tells you that
        something <em>must</em> exist, but it does not tell you <em>where</em>.
        You know some pigeonhole is crowded, but you cannot always point to
        which one. This existential nature makes pigeonhole proofs elegant
        but sometimes feel like magic.
      </p>

      <h2>Classic Applications</h2>
      <p>
        Let us build intuition through some famous applications before moving
        to the generalized principle.
      </p>
      <h3>The Sock Drawer</h3>
      <p>
        A drawer contains socks of 4 different colors (red, blue, green,
        black), all mixed up. If you grab socks in the dark, how many must
        you take to guarantee a matching pair? The answer is 5: with 4 colors
        (pigeonholes) and 5 socks (pigeons), at least two socks share a color
        by the pigeonhole principle. Taking only 4 could theoretically give
        one of each color.
      </p>
      <h3>The Birthday Paradox Connection</h3>
      <p>
        While the famous &ldquo;birthday paradox&rdquo; concerns probability
        (how likely is a match in a group of 23?), the pigeonhole principle
        gives a <em>certainty</em> result: in a group of 367 people, at least
        two must share a birthday. Why? There are only 366 possible birthdays
        (including February 29th), so 367 people in 366 pigeonholes guarantees
        a collision.
      </p>

      <h2>Worked Example: Birth Months</h2>
      <StepByStep
        title="Prove: Among 13 people, at least 2 share a birth month"
        steps={[
          {
            title: "Identify pigeons and pigeonholes",
            content:
              "The 13 people are the pigeons. The 12 months of the year are the pigeonholes. Each person is 'placed' in the month of their birthday.",
          },
          {
            title: "Check the pigeonhole condition",
            content:
              "We have 13 pigeons and 12 pigeonholes. Since 13 > 12, the condition n > m is satisfied.",
            latex: "n = 13 > 12 = m",
          },
          {
            title: "Apply the principle",
            content:
              "By the pigeonhole principle, at least one month must contain at least 2 people. Therefore, at least 2 of the 13 people share a birth month.",
          },
          {
            title: "Note what we CANNOT conclude",
            content:
              "The principle tells us a collision exists but not which month it occurs in. It also does not tell us the probability — it gives absolute certainty. With 12 people, a match is likely but not guaranteed.",
          },
        ]}
      />

      <h2>The Generalized Pigeonhole Principle</h2>
      <p>
        The basic principle says &ldquo;at least 2.&rdquo; The generalized
        version lets us push the bound higher:
      </p>
      <MathBlock
        latex="\text{If } n \text{ items are placed into } m \text{ containers, then at least one container holds at least } \left\lceil \frac{n}{m} \right\rceil \text{ items.}"
        display
      />
      <p>
        Here &lceil;x&rceil; denotes the <strong>ceiling function</strong> &mdash;
        the smallest integer greater than or equal to x. For instance, if you
        distribute 25 students among 7 study groups, at least one group has
        &lceil;25/7&rceil; = &lceil;3.57&rceil; = 4 students.
      </p>
      <p>
        The generalized principle follows from a simple observation: if every
        container held fewer than &lceil;n/m&rceil; items, the total would be
        less than n &mdash; a contradiction since we started with n items.
      </p>

      <h2>Explore: Pigeons into Pigeonholes</h2>
      <SliderExploration
        title="Guaranteed Minimum per Pigeonhole"
        description="As you increase the number of pigeons (items) distributed among a fixed number of pigeonholes (containers), the guaranteed minimum occupancy rises. The graph shows ⌈n/m⌉ where m = 10 pigeonholes. Watch how the staircase pattern emerges."
        parameters={[
          {
            name: "n",
            label: "Number of pigeons",
            min: 1,
            max: 100,
            step: 1,
            default: 10,
          },
        ]}
        equation="Math.ceil(x / 10)"
        xRange={[1, 100]}
        yRange={[0, 12]}
      />

      <h2>More Subtle Applications</h2>
      <h3>Divisibility</h3>
      <p>
        Consider any set of <em>n + 1</em> integers from
        &#123;1, 2, ..., 2n&#125;. Among them, at least two must be
        consecutive &mdash; and therefore their difference is 1. But there is
        an even more elegant result: among any <em>n + 1</em> integers chosen
        from &#123;1, 2, ..., 2n&#125;, at least one divides another. The
        proof uses a clever pigeonhole argument based on writing each number
        as 2<sup>a</sup> &middot; b where b is odd.
      </p>
      <h3>Points in a Plane</h3>
      <p>
        If 5 points are placed inside a unit square, at least two of them must
        be within distance &radic;2/2 &asymp; 0.707 of each other. This
        follows by dividing the square into 4 smaller squares (side 1/2 each)
        &mdash; 5 points in 4 squares means some square has 2 points, and the
        maximum distance within a square of side 1/2 is the diagonal
        &radic;2/2.
      </p>

      <h2>Why Pigeonhole Proofs Feel Like Magic</h2>
      <p>
        The art in a pigeonhole argument is always the same: creatively define
        the pigeons and the pigeonholes. The principle itself is trivial; the
        genius lies in the setup. Ask yourself:
      </p>
      <ul>
        <li>
          <strong>What are the objects?</strong> (pigeons)
        </li>
        <li>
          <strong>What are the categories?</strong> (pigeonholes)
        </li>
        <li>
          <strong>Why are there more objects than categories?</strong>
        </li>
      </ul>
      <p>
        Once you frame the problem this way, the conclusion follows
        automatically. The hard part is the framing, not the principle.
      </p>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="pigeonhole-q1"
        question="You have 10 pairs of socks in 10 different colors, all mixed in a drawer. Grabbing socks in the dark, what is the minimum number you must take to GUARANTEE a matching pair?"
        options={[
          {
            text: "2",
            feedback:
              "With only 2 socks, you might get two different colors. You need a guarantee, not just a possibility.",
          },
          {
            text: "10",
            feedback:
              "With 10 socks and 10 colors, you could theoretically get one of each color. You need one more to force a duplicate.",
          },
          {
            text: "11",
            feedback:
              "Correct! With 10 colors (pigeonholes) and 11 socks (pigeons), the pigeonhole principle guarantees at least one color appears twice.",
          },
          {
            text: "20",
            feedback:
              "That is the total number of socks. You reach a guaranteed match much sooner — after just 11.",
          },
        ]}
        correctIndex={2}
        hint="The pigeonholes are the colors. How many colors are there, and how many socks force a collision?"
        explanation="With 10 colors, you need 11 socks to guarantee a match by the pigeonhole principle. The worst case is drawing one of each color in the first 10 draws, so the 11th must repeat."
      />

      <InteractiveQuestion
        id="pigeonhole-q2"
        question="A website has 1000 users. Each user selects a 3-digit PIN (000 to 999). Can we guarantee that at least two users share the same PIN?"
        options={[
          {
            text: "No, because there are exactly 1000 possible PINs for 1000 users",
            feedback:
              "Careful! There are 1000 PINs (000-999) and 1000 users. The pigeonhole principle requires STRICTLY more pigeons than pigeonholes.",
          },
          {
            text: "Yes, because 1000 > 999",
            feedback:
              "The count of PINs is 1000 (from 000 to 999), not 999. So we have 1000 users and 1000 PINs — no guarantee yet.",
          },
          {
            text: "Not necessarily — 1000 users can each have a unique PIN from the 1000 available",
            feedback:
              "Correct! Since there are exactly 1000 PINs and 1000 users, it is possible (though unlikely) for every user to have a distinct PIN. We would need 1001 users to guarantee a collision.",
          },
          {
            text: "Yes, by the birthday paradox",
            feedback:
              "The birthday paradox is about probability, not certainty. It makes collisions LIKELY with far fewer users, but the pigeonhole principle needs n > m for a guarantee.",
          },
        ]}
        correctIndex={2}
        hint="Count carefully: how many 3-digit PINs exist from 000 to 999?"
        explanation="There are exactly 1000 PINs (000 through 999) and 1000 users. Since n = m (not n > m), the pigeonhole principle does not apply. It IS possible for everyone to have a unique PIN. With 1001 users, a collision would be guaranteed."
      />

      <h3>Challenge: Points in a Unit Square</h3>
      <p>
        Prove that if 5 points are placed inside a 1 &times; 1 square, at least
        two of them are within distance &radic;2/2 of each other.
      </p>
      <RevealAnswer label="Show proof">
        <p>
          <strong>Proof:</strong> Divide the unit square into 4 smaller squares
          of side length 1/2 (a 2 &times; 2 grid). There are 5 points and 4
          small squares, so by the pigeonhole principle, at least one small
          square contains at least 2 points.
        </p>
        <p>
          The maximum distance between two points in a square of side 1/2 is
          the diagonal:
        </p>
        <MathBlock
          latex="d = \sqrt{\left(\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^2} = \sqrt{\frac{1}{4} + \frac{1}{4}} = \sqrt{\frac{1}{2}} = \frac{\sqrt{2}}{2} \approx 0.707"
          display
        />
        <p>
          Therefore, the two points in the same small square are at most
          &radic;2/2 apart. &blacksquare;
        </p>
      </RevealAnswer>
    </div>
  );
}
