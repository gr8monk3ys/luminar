"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

interface SliderParam {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

interface SliderExplorationProps {
  title: string;
  description?: string;
  parameters: SliderParam[];
  equation: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

function evaluateWithParams(
  equation: string,
  x: number,
  params: Record<string, number>
): number {
  let expr = equation
    .replace(/\^/g, "**")
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/sqrt/g, "Math.sqrt")
    .replace(/abs/g, "Math.abs")
    .replace(/log/g, "Math.log")
    .replace(/pi/g, "Math.PI");

  for (const [name, value] of Object.entries(params)) {
    expr = expr.replace(new RegExp(`\\b${name}\\b`, "g"), String(value));
  }

  try {
    const fn = new Function("x", `return ${expr}`);
    return fn(x);
  } catch {
    return NaN;
  }
}

export function SliderExploration({
  title,
  description,
  parameters,
  equation,
  xRange = [-5, 5],
  yRange = [-5, 5],
}: SliderExplorationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paramValues, setParamValues] = useState<Record<string, number>>(
    () => {
      const initial: Record<string, number> = {};
      parameters.forEach((p) => {
        initial[p.name] = p.default;
      });
      return initial;
    }
  );

  const width = 600;
  const height = 350;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain(xRange).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(yRange).range([innerHeight, 0]);

    // Grid
    g.selectAll(".grid-x")
      .data(xScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 0.5);

    g.selectAll(".grid-y")
      .data(yScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 0.5);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(10));

    g.append("g").call(d3.axisLeft(yScale).ticks(10));

    // Curve
    const numPoints = 300;
    const step = (xRange[1] - xRange[0]) / numPoints;
    const points: [number, number][] = [];

    for (let i = 0; i <= numPoints; i++) {
      const x = xRange[0] + i * step;
      const y = evaluateWithParams(equation, x, paramValues);
      if (isFinite(y) && Math.abs(y) < 1000) {
        points.push([x, y]);
      }
    }

    const line = d3
      .line<[number, number]>()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", "#6366f1")
      .attr("stroke-width", 2.5)
      .attr("d", line);
  }, [paramValues, equation, xRange, yRange, innerWidth, innerHeight, margin.left, margin.top]);

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
      />

      <div className="space-y-4 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
        {parameters.map((param) => (
          <div key={param.name}>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {param.label}
              </label>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-sm text-indigo-600 dark:bg-slate-700 dark:text-indigo-400">
                {paramValues[param.name]}
              </span>
            </div>
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={paramValues[param.name]}
              onChange={(e) =>
                setParamValues((prev) => ({
                  ...prev,
                  [param.name]: parseFloat(e.target.value),
                }))
              }
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{param.min}</span>
              <span>{param.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
