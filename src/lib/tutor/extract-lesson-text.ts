import * as ts from "typescript";
import type { LessonSection } from "./types";

/**
 * Names of JSX attributes / object-literal fields that hold learner-facing
 * prose in lesson components (MathBlock, StepByStep, InteractiveQuestion,
 * SliderExploration, MatchingExercise, SortingExercise, TrueFalse,
 * FillInTheBlank, ...). Anything not in this set (className, color, icon,
 * correctIndex, initialCode, ...) is presentation/behavior, not content.
 */
const CONTENT_FIELD_NAMES = new Set([
  "question",
  "explanation",
  "hint",
  "title",
  "content",
  "description",
  "instruction",
  "statement",
  "text",
  "left",
  "right",
  "equation",
  "latex",
  "items",
]);

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Climbs from a string literal to the nearest JsxAttribute/PropertyAssignment
 *  name, stopping at any JSX element boundary so unrelated strings (e.g. a
 *  lone `{" "}` spacer) never get attributed to an outer prop. */
function nearestFieldName(node: ts.Node): string | null {
  let current: ts.Node | undefined = node.parent;
  while (current) {
    if (ts.isJsxAttribute(current)) {
      return current.name.getText();
    }
    if (ts.isPropertyAssignment(current) && ts.isIdentifier(current.name)) {
      return current.name.text;
    }
    if (
      ts.isJsxElement(current) ||
      ts.isJsxSelfClosingElement(current) ||
      ts.isJsxFragment(current) ||
      ts.isJsxOpeningElement(current) ||
      ts.isSourceFile(current)
    ) {
      return null;
    }
    current = current.parent;
  }
  return null;
}

function jsxElementTagName(node: ts.JsxElement): string {
  return node.openingElement.tagName.getText();
}

function jsxInnerText(node: ts.Node): string {
  const parts: string[] = [];
  const visit = (n: ts.Node) => {
    if (ts.isJsxText(n)) {
      const text = collapseWhitespace(n.text);
      if (text) parts.push(text);
    }
    ts.forEachChild(n, visit);
  };
  ts.forEachChild(node, visit);
  return collapseWhitespace(parts.join(" "));
}

/**
 * Parses a lesson `.tsx` source file into ordered sections keyed by its
 * `<h2>` headings. Falls back to a single "Overview" section for any content
 * that appears before the first heading.
 */
export function extractLessonSections(source: string): LessonSection[] {
  const sourceFile = ts.createSourceFile(
    "lesson.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  const sections: { heading: string; parts: string[] }[] = [
    { heading: "Overview", parts: [] },
  ];
  const current = () => sections[sections.length - 1];

  const visit = (node: ts.Node) => {
    if (ts.isJsxElement(node) && jsxElementTagName(node) === "h2") {
      sections.push({ heading: jsxInnerText(node), parts: [] });
    } else if (ts.isJsxText(node)) {
      const text = collapseWhitespace(node.text);
      if (text) current().parts.push(text);
    } else if (ts.isStringLiteralLike(node)) {
      const field = nearestFieldName(node);
      if (field && CONTENT_FIELD_NAMES.has(field)) {
        const text = collapseWhitespace(node.text);
        if (text) current().parts.push(text);
      }
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(sourceFile, visit);

  return sections
    .map((section) => ({
      heading: section.heading,
      text: collapseWhitespace(section.parts.join(" ")),
    }))
    .filter((section) => section.text.length > 0);
}
