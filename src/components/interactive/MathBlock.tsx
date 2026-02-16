"use client";

import katex from "katex";
import { useMemo } from "react";

interface MathBlockProps {
  latex: string;
  display?: boolean;
}

export function MathBlock({ latex, display = true }: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return `<span class="text-red-500">Error rendering: ${latex}</span>`;
    }
  }, [latex, display]);

  if (display) {
    return (
      <div className="my-6 overflow-x-auto py-4 text-center">
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
