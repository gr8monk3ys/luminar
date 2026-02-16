"use client";

import { MathBlock } from "@/components/interactive/MathBlock";
import { InteractiveQuestion } from "@/components/interactive/InteractiveQuestion";
import { CodeEditor } from "@/components/interactive/CodeEditor";
import { StepByStep } from "@/components/interactive/StepByStep";
import { RevealAnswer } from "@/components/interactive/RevealAnswer";

export default function DpLongestCommonSubsequence() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2>Longest Common Subsequence</h2>
      <p>
        A <strong>subsequence</strong> of a string is obtained by deleting
        zero or more characters without changing the order of the remaining
        characters. For example, &ldquo;ACE&rdquo; is a subsequence of
        &ldquo;ABCDE&rdquo; (delete B and D), but &ldquo;AEC&rdquo; is not
        (the order is wrong).
      </p>
      <p>
        The <strong>Longest Common Subsequence (LCS)</strong> problem asks:
        given two strings X and Y, find the longest sequence that is a
        subsequence of both. This is one of the most important DP problems,
        with real-world applications everywhere:
      </p>
      <ul>
        <li>
          <strong>Diff tools</strong> (git diff, file comparison) use LCS to
          identify which lines are shared between two versions of a file.
        </li>
        <li>
          <strong>DNA sequence alignment</strong> in bioinformatics compares
          genetic sequences to find shared evolutionary patterns.
        </li>
        <li>
          <strong>Spell checkers</strong> and plagiarism detectors measure
          document similarity using LCS-based metrics.
        </li>
      </ul>

      <h2>Why Not Brute Force?</h2>
      <p>
        A string of length m has 2<sup>m</sup> subsequences. Checking all
        pairs of subsequences from two strings of lengths m and n would take
        O(2<sup>m</sup> &middot; 2<sup>n</sup>) time &mdash; astronomically
        slow. DP reduces this to O(mn) by recognizing overlapping
        subproblems.
      </p>

      <h2>The Recurrence</h2>
      <p>
        Let X = x<sub>1</sub>x<sub>2</sub>...x<sub>m</sub> and Y =
        y<sub>1</sub>y<sub>2</sub>...y<sub>n</sub>. Define dp[i][j] as the
        length of the LCS of X[1..i] and Y[1..j]:
      </p>
      <MathBlock
        latex="dp[i][j] = \begin{cases} 0 & \text{if } i = 0 \text{ or } j = 0 \\ dp[i-1][j-1] + 1 & \text{if } x_i = y_j \\ \max(dp[i-1][j],\; dp[i][j-1]) & \text{if } x_i \neq y_j \end{cases}"
        display
      />
      <p>
        The intuition: when the last characters match, they must be part of
        the LCS (extend it by 1). When they do not match, the LCS either
        excludes the last character of X or the last character of Y &mdash;
        take whichever gives a longer result.
      </p>

      <h2>Building the DP Table</h2>
      <StepByStep
        title='Build LCS table for X = "ABCBDAB" and Y = "BDCAB"'
        steps={[
          {
            title: "Initialize the table",
            content:
              'Create an 8x6 table (including row 0 and column 0 for empty prefixes). dp[0][j] = 0 for all j, and dp[i][0] = 0 for all i. These represent the LCS of any string with the empty string.',
          },
          {
            title: "Fill row 1 (X[1] = A)",
            content:
              'Compare A with each character of Y = BDCAB. A matches Y[4]=A. dp[1][1..3] = 0 (no match yet with B,D,C). dp[1][4] = dp[0][3]+1 = 1 (A=A). dp[1][5] = 1 (carry forward: max(dp[0][5], dp[1][4]) = 1).',
          },
          {
            title: "Fill row 2 (X[2] = B)",
            content:
              'B matches Y[1]=B and Y[5]=B. dp[2][1] = dp[1][0]+1 = 1 (B=B). dp[2][2..3] = 1 (carry forward). dp[2][4] = max(dp[1][4], dp[2][3]) = max(1,1) = 1. dp[2][5] = dp[1][4]+1 = 2 (B=B, extending LCS "A" to "AB").',
          },
          {
            title: "Fill rows 3-7 similarly",
            content:
              'Continue matching. Key entries: dp[3][3] = 2 (C=C, extending to "BC"). dp[4][5] = 3 (B=B, extending). dp[5][2] = 2 (D=D). dp[6][4] = 3 (A=A). dp[7][5] = 4 (B=B). Each match extends the best LCS found so far.',
          },
          {
            title: "Read the answer",
            content:
              'dp[7][5] = 4. The LCS has length 4. We will backtrack to find it is "BCAB".',
            latex: "\\text{LCS length} = dp[7][5] = 4",
          },
        ]}
      />

      <h2>Backtracking to Find the Actual LCS</h2>
      <p>
        The table gives us the length, but we want the actual subsequence.
        Starting from dp[m][n], trace backward:
      </p>
      <ul>
        <li>
          If X[i] = Y[j], this character is in the LCS. Record it, and move
          diagonally to dp[i-1][j-1].
        </li>
        <li>
          If X[i] &ne; Y[j], move in the direction of the larger value:
          go to dp[i-1][j] if it is larger, or dp[i][j-1] otherwise.
        </li>
      </ul>
      <p>
        The characters are collected in reverse order, so reverse the result
        at the end.
      </p>

      <h2>Python Implementation</h2>
      <CodeEditor
        language="python"
        description="Implement LCS with DP table construction and backtracking to recover the subsequence."
        initialCode={`def lcs(X, Y):
    """
    Find the longest common subsequence of strings X and Y.
    Returns (length, the LCS string).
    """
    m, n = len(X), len(Y)
    # Create (m+1) x (n+1) table initialized to 0
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                # TODO: Characters match — extend LCS
                pass
            else:
                # TODO: Characters differ — take the max
                pass

    # Backtrack to find the actual LCS
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            # TODO: This character is in the LCS
            pass
        elif dp[i - 1][j] >= dp[i][j - 1]:
            # TODO: Move up
            pass
        else:
            # TODO: Move left
            pass

    result.reverse()
    return dp[m][n], "".join(result)

# Test
length, subseq = lcs("ABCBDAB", "BDCAB")
print(f"LCS length: {length}")
print(f"LCS: {subseq}")`}
        solution={`def lcs(X, Y):
    """
    Find the longest common subsequence of strings X and Y.
    Returns (length, the LCS string).
    """
    m, n = len(X), len(Y)
    # Create (m+1) x (n+1) table initialized to 0
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to find the actual LCS
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            result.append(X[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    result.reverse()
    return dp[m][n], "".join(result)

# Test
length, subseq = lcs("ABCBDAB", "BDCAB")
print(f"LCS length: {length}")
print(f"LCS: {subseq}")
# Output:
# LCS length: 4
# LCS: BCAB`}
      />

      <h2>Complexity</h2>
      <MathBlock
        latex="\text{Time: } O(mn) \qquad \text{Space: } O(mn)"
        display
      />
      <p>
        We fill an m &times; n table, with each cell requiring O(1) work.
        Space can be reduced to O(min(m, n)) if we only need the length (use
        two rows), though backtracking for the actual LCS requires the full
        table or additional bookkeeping.
      </p>

      <h2>LCS vs. Other String Problems</h2>
      <p>
        The LCS is closely related to several other important problems:
      </p>
      <ul>
        <li>
          <strong>Edit distance (Levenshtein):</strong> minimum insertions,
          deletions, and substitutions to transform one string into another.
          Uses a very similar DP table with different recurrence.
        </li>
        <li>
          <strong>Longest Common Substring:</strong> must be contiguous
          (unlike subsequence). Matching characters must be adjacent. The DP
          resets to 0 on mismatch instead of taking the max.
        </li>
        <li>
          <strong>Shortest Common Supersequence:</strong> the shortest string
          that has both X and Y as subsequences. Its length is m + n -
          LCS(X, Y).
        </li>
      </ul>

      <RevealAnswer label="Show the relationship between LCS and diff output">
        <p>
          When <code>git diff</code> compares two versions of a file, it
          treats each line as a &ldquo;character.&rdquo; The LCS of the two
          files gives the lines that are unchanged. Lines in the old file
          but not in the LCS are marked with <code>-</code> (deleted). Lines
          in the new file but not in the LCS are marked with <code>+</code>{" "}
          (added). This is why diff output shows the minimum set of changes
          &mdash; it is solving the LCS problem on lines of text.
        </p>
        <MathBlock
          latex="\text{Diff deletions} = m - \text{LCS} \quad \text{Diff insertions} = n - \text{LCS}"
          display
        />
      </RevealAnswer>

      <h2>Check Your Understanding</h2>
      <InteractiveQuestion
        id="lcs-q1"
        question='What is the length of the LCS of "AGGTAB" and "GXTXAYB"?'
        options={[
          {
            text: "3",
            feedback:
              'You can do better. Try matching more characters. Hint: "GTAB" is a common subsequence.',
          },
          {
            text: "4",
            feedback:
              'Correct! The LCS is "GTAB" (length 4). G appears in both, T appears in both (after G), A appears in both (after T), and B appears in both (after A).',
          },
          {
            text: "5",
            feedback:
              "That would require 5 matching characters in order. Check that your proposed subsequence maintains order in both strings.",
          },
          {
            text: "2",
            feedback:
              'There are longer common subsequences than length 2. For instance, "GA" is common but you can extend it further.',
          },
        ]}
        correctIndex={1}
        hint='Try to find matching characters in order. Start with G, then look for what comes next in both strings after G.'
        explanation='The LCS is "GTAB". In "AGGTAB": positions 3,4,5,6. In "GXTXAYB": positions 1,3,5,7. Both preserve order. The DP table confirms dp[6][7] = 4.'
      />

      <InteractiveQuestion
        id="lcs-q2"
        question="In the LCS recurrence, why do we take max(dp[i-1][j], dp[i][j-1]) when X[i] ≠ Y[j]?"
        options={[
          {
            text: "Because we need to try skipping a character from either string",
            feedback:
              "Correct! When the current characters do not match, the LCS cannot use both simultaneously. We either skip X[i] (look at dp[i-1][j]) or skip Y[j] (look at dp[i][j-1]) and take whichever gives a longer LCS. This exhaustively considers both possibilities.",
          },
          {
            text: "Because we subtract 1 for the mismatch penalty",
            feedback:
              "There is no penalty in LCS — we simply do not extend the subsequence. We choose the better of two options: removing a character from X or from Y.",
          },
          {
            text: "Because the diagonal dp[i-1][j-1] is always smaller",
            feedback:
              "While dp[i-1][j-1] <= max(dp[i-1][j], dp[i][j-1]) is true, the reason for the max is that we are exploring two ways to shorten the problem.",
          },
          {
            text: "Because we need to add both values together",
            feedback:
              "We take the max, not the sum. Adding would double-count shared subsequences.",
          },
        ]}
        correctIndex={0}
        hint="If the last characters do not match, the LCS must exclude at least one of them. Which exclusion gives a longer result?"
        explanation="When X[i] ≠ Y[j], neither character can extend the LCS simultaneously. We branch into two subproblems: (1) LCS of X[1..i-1] and Y[1..j], or (2) LCS of X[1..i] and Y[1..j-1]. The max ensures we pick the better path."
      />
    </div>
  );
}
