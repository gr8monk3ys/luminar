"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";
import { CodeEditor } from "@/components/interactive/CodeEditor";

export default function CountingPrinciples() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Counting Principles: The Art of Enumeration</h2>
      <p>
        How many different passwords can you create? How many ways can you
        arrange books on a shelf? How many possible poker hands exist?
        Combinatorics &mdash; the mathematics of counting &mdash; answers
        these questions with elegant principles that scale from simple daily
        puzzles to the foundations of probability and computer science.
      </p>
      <p>
        At first glance, counting seems trivial. But counting becomes
        surprisingly subtle when you deal with large sets, overlapping
        conditions, or restrictions. The key is to decompose complex counting
        problems into simpler ones using a small set of powerful principles.
      </p>

      <h2>The Addition Principle (Sum Rule)</h2>
      <p>
        If you can do task A in <em>m</em> ways and task B in <em>n</em> ways,
        and the two tasks are <strong>mutually exclusive</strong> (you cannot do
        both simultaneously), then the number of ways to do A <em>or</em> B is:
      </p>
      <MathBlock latex="|A \cup B| = |A| + |B| \quad \text{(when } A \cap B = \emptyset \text{)}" display />
      <p>
        Think of it as choosing from separate menus with no overlap. If a
        restaurant has 5 appetizers and 3 soups, and you order exactly one
        starter, there are 5 + 3 = 8 choices. The key condition is{" "}
        <em>mutual exclusivity</em> &mdash; you cannot choose something that is
        both an appetizer and a soup.
      </p>

      <h2>The Multiplication Principle (Product Rule)</h2>
      <p>
        If you can do task A in <em>m</em> ways and <strong>then</strong> task B
        in <em>n</em> ways (regardless of how A was done), the number of ways
        to do both A <em>and</em> B in sequence is:
      </p>
      <MathBlock latex="|A \times B| = |A| \cdot |B| = m \cdot n" display />
      <p>
        This is the most frequently used counting principle. Every time you
        make a sequence of <em>independent</em> choices, you multiply the
        number of options at each step. Ordering an outfit with 4 shirts and
        6 pants gives 4 &times; 6 = 24 combinations.
      </p>

      <h2>Worked Example: License Plate Counting</h2>
      <StepByStep
        title="How many license plates of the form 3 letters followed by 4 digits?"
        steps={[
          {
            title: "Identify the choices",
            content:
              "A license plate has 7 positions: the first 3 are letters (A-Z, 26 choices each) and the last 4 are digits (0-9, 10 choices each). Letters and digits can repeat.",
          },
          {
            title: "Apply the multiplication principle",
            content:
              "Each position is an independent choice, so multiply the number of options at each position:",
            latex: "26 \\times 26 \\times 26 \\times 10 \\times 10 \\times 10 \\times 10",
          },
          {
            title: "Compute",
            content: "Simplify the expression.",
            latex: "26^3 \\times 10^4 = 17{,}576 \\times 10{,}000 = 175{,}760{,}000",
          },
          {
            title: "Interpret",
            content:
              "There are 175,760,000 possible license plates. That is enough for a state with millions of vehicles, with plenty of room to spare.",
          },
        ]}
      />

      <h2>Inclusion-Exclusion Principle</h2>
      <p>
        What if the events are NOT mutually exclusive? If sets A and B overlap,
        simply adding |A| + |B| double-counts the elements in the intersection.
        The <strong>inclusion-exclusion principle</strong> corrects for this:
      </p>
      <MathBlock
        latex="|A \cup B| = |A| + |B| - |A \cap B|"
        display
      />
      <p>
        The name reflects the pattern: include each set, then exclude the
        overlap. For three sets, the formula becomes:
      </p>
      <MathBlock
        latex="|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|"
        display
      />
      <p>
        You include individual sets, exclude pairs, then re-include the triple
        intersection (which was excluded too many times). The pattern alternates
        between adding and subtracting.
      </p>

      <StepByStep
        title="Inclusion-exclusion: Students studying French or Spanish"
        steps={[
          {
            title: "Set up the problem",
            content:
              "In a class of 40 students, 25 study French, 18 study Spanish, and 7 study both. How many study at least one of the two languages?",
            latex: "|F| = 25, \\quad |S| = 18, \\quad |F \\cap S| = 7",
          },
          {
            title: "Apply inclusion-exclusion",
            content:
              "The number studying French OR Spanish (or both) is:",
            latex: "|F \\cup S| = |F| + |S| - |F \\cap S| = 25 + 18 - 7 = 36",
          },
          {
            title: "Interpret",
            content:
              "36 students study at least one language. That means 40 - 36 = 4 students study neither French nor Spanish.",
          },
        ]}
      />

      <h2>Complementary Counting</h2>
      <p>
        Sometimes it is much easier to count what you <em>don&apos;t</em> want
        and subtract from the total. This is called{" "}
        <strong>complementary counting</strong>:
      </p>
      <MathBlock
        latex="|\text{desired}| = |\text{total}| - |\text{undesired}|"
        display
      />
      <p>
        For example, &ldquo;how many 4-digit PINs contain at least one
        zero?&rdquo; is hard to count directly (the zero could be in any
        position). But &ldquo;PINs with NO zeros&rdquo; is easy: 9 choices per
        digit, giving 9&sup4; = 6561. So the answer is 10&sup4; &minus; 9&sup4;
        = 10000 &minus; 6561 = 3439.
      </p>

      <h2>Putting It Together: A Code Perspective</h2>
      <CodeEditor
        language="python"
        description="Compute counting problems programmatically. Try modifying the parameters to explore different scenarios."
        initialCode={`# License plate counting
letters = 26
digits = 10
plates = (letters ** 3) * (digits ** 4)
print(f"License plates (3 letters + 4 digits): {plates:,}")

# Inclusion-exclusion
french = 25
spanish = 18
both = 7
at_least_one = french + spanish - both
print(f"Students studying French or Spanish: {at_least_one}")

# Complementary counting: 4-digit PINs with at least one zero
total_pins = 10 ** 4
no_zero_pins = 9 ** 4
pins_with_zero = total_pins - no_zero_pins
print(f"PINs with at least one zero: {pins_with_zero}")

# Challenge: How many 3-letter "words" use at least one vowel?
total_words = 26 ** 3
no_vowel_words = 21 ** 3  # 21 consonants
words_with_vowel = total_words - no_vowel_words
print(f"3-letter words with at least one vowel: {words_with_vowel:,}")`}
        solution={`# License plate counting
letters = 26
digits = 10
plates = (letters ** 3) * (digits ** 4)
print(f"License plates (3 letters + 4 digits): {plates:,}")
# Output: 175,760,000

# Inclusion-exclusion
french = 25
spanish = 18
both = 7
at_least_one = french + spanish - both
print(f"Students studying French or Spanish: {at_least_one}")
# Output: 36

# Complementary counting: 4-digit PINs with at least one zero
total_pins = 10 ** 4
no_zero_pins = 9 ** 4
pins_with_zero = total_pins - no_zero_pins
print(f"PINs with at least one zero: {pins_with_zero}")
# Output: 3439

# Challenge: How many 3-letter "words" use at least one vowel?
total_words = 26 ** 3
no_vowel_words = 21 ** 3  # 21 consonants (26 - 5 vowels)
words_with_vowel = total_words - no_vowel_words
print(f"3-letter words with at least one vowel: {words_with_vowel:,}")
# Output: 8,315`}
      />

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="counting-q1"
        question="A password must be 5 characters long. Each character is a lowercase letter (26 options) or a digit (10 options). How many passwords are possible?"
        options={[
          {
            text: "36 × 5 = 180",
            feedback:
              "You added instead of multiplied, and mixed up the operation. Each of the 5 positions has 36 choices, independently.",
          },
          {
            text: "36⁵ = 60,466,176",
            feedback:
              "Correct! Each of the 5 positions has 26 + 10 = 36 independent choices. By the multiplication principle, multiply: 36 × 36 × 36 × 36 × 36 = 36⁵.",
          },
          {
            text: "26⁵ + 10⁵ = 11,981,376 + 100,000",
            feedback:
              "This counts passwords that are ALL letters or ALL digits, but misses mixed passwords like 'a1b2c'.",
          },
          {
            text: "5 × 36 × 35 × 34 × 33 × 32",
            feedback:
              "This assumes no repetition and adds an extra factor of 5. Characters CAN repeat in passwords.",
          },
        ]}
        correctIndex={1}
        hint="Each position has 26 + 10 = 36 choices. The positions are independent and repetition is allowed."
        explanation="By the multiplication principle, 5 independent positions with 36 choices each gives 36⁵ = 60,466,176 possible passwords."
      />

      <InteractiveQuestion
        id="counting-q2"
        question="In a group of 100 people, 60 like coffee, 45 like tea, and 20 like both. How many like neither coffee nor tea?"
        options={[
          {
            text: "100 - 60 - 45 = -5",
            feedback:
              "You cannot get a negative count! You forgot to account for the 20 people who like both — they were subtracted twice.",
          },
          {
            text: "15",
            feedback:
              "Correct! By inclusion-exclusion: |coffee ∪ tea| = 60 + 45 - 20 = 85. So 100 - 85 = 15 like neither.",
          },
          {
            text: "20",
            feedback:
              "That is the number who like both, not the number who like neither.",
          },
          {
            text: "25",
            feedback:
              "Check your arithmetic. |coffee ∪ tea| = 60 + 45 - 20 = 85, and 100 - 85 = 15.",
          },
        ]}
        correctIndex={1}
        hint="First use inclusion-exclusion to find how many like at least one drink, then subtract from 100."
        explanation="By inclusion-exclusion: |C ∪ T| = 60 + 45 - 20 = 85 people like at least one. So 100 - 85 = 15 like neither."
      />

      <h3>Challenge</h3>
      <p>
        How many integers from 1 to 1000 are divisible by 3 or 5 (or both)?
      </p>
      <RevealAnswer label="Show solution">
        <p>
          Use inclusion-exclusion. Let A = multiples of 3, B = multiples of 5.
        </p>
        <MathBlock
          latex="|A| = \lfloor 1000/3 \rfloor = 333, \quad |B| = \lfloor 1000/5 \rfloor = 200"
          display
        />
        <MathBlock
          latex="|A \cap B| = \lfloor 1000/15 \rfloor = 66 \quad \text{(multiples of 15 = lcm(3,5))}"
          display
        />
        <MathBlock
          latex="|A \cup B| = 333 + 200 - 66 = 467"
          display
        />
        <p>
          So 467 integers from 1 to 1000 are divisible by 3 or 5. This is the
          same calculation behind the classic &ldquo;FizzBuzz&rdquo; programming
          problem!
        </p>
      </RevealAnswer>
    </div>
  );
}
