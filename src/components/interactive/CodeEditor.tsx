"use client";

import { useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/components/ThemeProvider";
import { RotateCcw, CheckCircle2, Eye, EyeOff } from "lucide-react";

interface CodeEditorProps {
  language?: string;
  initialCode: string;
  solution?: string;
  description?: string;
}

export function CodeEditor({
  language = "python",
  initialCode,
  solution,
  description,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [showSolution, setShowSolution] = useState(false);
  const { resolvedTheme } = useTheme();

  const syntaxStyle = resolvedTheme === "dark" ? oneDark : oneLight;

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setShowSolution(false);
  }, [initialCode]);

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {description && (
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <div className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Code Exercise
          </div>
          <p className="mt-1 text-slate-700 dark:text-slate-200">
            {description}
          </p>
        </div>
      )}

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {language}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
            {solution && (
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                {showSolution ? (
                  <>
                    <EyeOff className="h-3 w-3" /> Hide Solution
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3" /> Show Solution
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute inset-0 z-10 w-full resize-none bg-transparent p-4 font-mono text-sm text-transparent caret-slate-900 outline-none dark:caret-white"
          spellCheck={false}
          style={{
            lineHeight: "1.5",
            tabSize: 2,
          }}
        />
        <SyntaxHighlighter
          language={language}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {showSolution && solution && (
        <div className="border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-emerald-50 px-4 py-2 dark:border-slate-700 dark:bg-emerald-900/20">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Solution
            </span>
          </div>
          <SyntaxHighlighter
            language={language}
            style={syntaxStyle}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
            }}
          >
            {solution}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
