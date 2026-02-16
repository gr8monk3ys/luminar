"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface GraphPlaygroundProps {
  equation: string;
  xRange?: [number, number];
  yRange?: [number, number];
  interactive?: boolean;
  showTangent?: boolean;
  showGrid?: boolean;
  color?: string;
  width?: number;
  height?: number;
}

function evaluateEquation(equation: string, x: number): number {
  const expr = equation
    .replace(/\^/g, "**")
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/sqrt/g, "Math.sqrt")
    .replace(/abs/g, "Math.abs")
    .replace(/log/g, "Math.log")
    .replace(/exp/g, "Math.exp")
    .replace(/pi/g, "Math.PI")
    .replace(/e(?!x)/g, "Math.E");

  try {
    const fn = new Function("x", `return ${expr}`);
    return fn(x);
  } catch {
    return NaN;
  }
}

function numericalDerivative(equation: string, x: number, h = 0.0001): number {
  return (evaluateEquation(equation, x + h) - evaluateEquation(equation, x - h)) / (2 * h);
}

function getCSSVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawD3Graph(
  svgEl: SVGSVGElement,
  props: {
    equation: string;
    xRange: [number, number];
    yRange: [number, number];
    interactive: boolean;
    showTangent: boolean;
    showGrid: boolean;
    color: string;
    width: number;
    height: number;
    onHoverX: (x: number | null) => void;
  }
) {
  const {
    equation, xRange, yRange, interactive, showTangent,
    showGrid, color, width, height, onHoverX,
  } = props;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const gridColor = getCSSVar("--graph-grid") || "#e2e8f0";
  const axisColor = getCSSVar("--graph-axis") || "#94a3b8";
  const labelColor = getCSSVar("--graph-label") || "#64748b";
  const hoverLabelColor = getCSSVar("--graph-hover-label") || "#334155";

  const xScale = d3.scaleLinear().domain(xRange).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain(yRange).range([innerHeight, 0]);

  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Grid
  if (showGrid) {
    g.selectAll(".grid-x")
      .data(xScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", gridColor)
      .attr("stroke-width", 0.5);

    g.selectAll(".grid-y")
      .data(yScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", gridColor)
      .attr("stroke-width", 0.5);
  }

  // Zero axes
  const zeroX = xScale(0);
  const zeroY = yScale(0);

  if (zeroX >= 0 && zeroX <= innerWidth) {
    g.append("line")
      .attr("x1", zeroX).attr("x2", zeroX)
      .attr("y1", 0).attr("y2", innerHeight)
      .attr("stroke", axisColor).attr("stroke-width", 1.5);
  }
  if (zeroY >= 0 && zeroY <= innerHeight) {
    g.append("line")
      .attr("x1", 0).attr("x2", innerWidth)
      .attr("y1", zeroY).attr("y2", zeroY)
      .attr("stroke", axisColor).attr("stroke-width", 1.5);
  }

  // Axis labels
  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(10))
    .selectAll("text")
    .attr("fill", labelColor)
    .style("font-size", "11px");

  g.append("g")
    .call(d3.axisLeft(yScale).ticks(10))
    .selectAll("text")
    .attr("fill", labelColor)
    .style("font-size", "11px");

  g.selectAll(".domain").attr("stroke", axisColor);
  g.selectAll(".tick line").attr("stroke", gridColor);

  // Function curve
  const numPoints = 500;
  const step = (xRange[1] - xRange[0]) / numPoints;
  const points: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const x = xRange[0] + i * step;
    const y = evaluateEquation(equation, x);
    if (isFinite(y) && Math.abs(y) < 1000) {
      points.push([x, y]);
    }
  }

  const line = d3
    .line<[number, number]>()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    .curve(d3.curveMonotoneX);

  // Split into segments to handle discontinuities
  let segment: [number, number][] = [];
  const segments: [number, number][][] = [];

  for (let i = 0; i < points.length; i++) {
    if (i > 0) {
      const dy = Math.abs(points[i][1] - points[i - 1][1]);
      if (dy > (yRange[1] - yRange[0]) * 2) {
        if (segment.length > 1) segments.push(segment);
        segment = [];
      }
    }
    segment.push(points[i]);
  }
  if (segment.length > 1) segments.push(segment);

  segments.forEach((seg) => {
    g.append("path")
      .datum(seg)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2.5)
      .attr("d", line);
  });

  // Equation label
  g.append("text")
    .attr("x", innerWidth - 10)
    .attr("y", 20)
    .attr("text-anchor", "end")
    .attr("fill", color)
    .attr("font-size", "14px")
    .attr("font-weight", "600")
    .text(`y = ${equation}`);

  // Interactive hover + tangent
  if (interactive) {
    const hoverLine = g.append("line")
      .attr("stroke", axisColor)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4")
      .attr("opacity", 0);

    const hoverDot = g.append("circle")
      .attr("r", 5)
      .attr("fill", color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("opacity", 0);

    const hoverLabel = g.append("text")
      .attr("fill", hoverLabelColor)
      .attr("font-size", "12px")
      .attr("opacity", 0);

    let tangentLine: d3.Selection<SVGLineElement, unknown, null, undefined> | null = null;
    if (showTangent) {
      tangentLine = g.append("line")
        .attr("stroke", "#f97316")
        .attr("stroke-width", 2)
        .attr("opacity", 0);
    }

    const overlay = g.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      .attr("cursor", "crosshair");

    overlay.on("mousemove", (event: MouseEvent) => {
      const [mx] = d3.pointer(event);
      const x = xScale.invert(mx);
      const y = evaluateEquation(equation, x);

      if (!isFinite(y)) return;

      const px = xScale(x);
      const py = yScale(y);

      hoverLine.attr("x1", px).attr("x2", px)
        .attr("y1", 0).attr("y2", innerHeight)
        .attr("opacity", 0.5);

      hoverDot.attr("cx", px).attr("cy", py).attr("opacity", 1);

      hoverLabel
        .attr("x", px + 10)
        .attr("y", py - 10)
        .text(`(${x.toFixed(2)}, ${y.toFixed(2)})`)
        .attr("opacity", 1);

      if (showTangent && tangentLine) {
        const slope = numericalDerivative(equation, x);
        const dx = (xRange[1] - xRange[0]) * 0.15;
        tangentLine
          .attr("x1", xScale(x - dx)).attr("y1", yScale(y - slope * dx))
          .attr("x2", xScale(x + dx)).attr("y2", yScale(y + slope * dx))
          .attr("opacity", 1);
      }

      onHoverX(x);
    });

    overlay.on("mouseleave", () => {
      hoverLine.attr("opacity", 0);
      hoverDot.attr("opacity", 0);
      hoverLabel.attr("opacity", 0);
      if (tangentLine) tangentLine.attr("opacity", 0);
      onHoverX(null);
    });
  }
}

export function GraphPlayground({
  equation,
  xRange = [-5, 5],
  yRange = [-5, 5],
  interactive = true,
  showTangent = false,
  showGrid = true,
  color = "#6366f1",
  width = 600,
  height = 400,
}: GraphPlaygroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const drawProps = {
      equation, xRange, yRange, interactive, showTangent,
      showGrid, color, width, height, onHoverX: setHoverX,
    };

    drawD3Graph(svgRef.current, drawProps);

    // Redraw when theme changes
    const observer = new MutationObserver(() => {
      if (svgRef.current) {
        drawD3Graph(svgRef.current, drawProps);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [equation, xRange, yRange, showGrid, showTangent, interactive, color, width, height]);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: height }}
      />
      {interactive && hoverX !== null && showTangent && (
        <div className="border-t border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Slope at x = {hoverX.toFixed(2)}:{" "}
          <span className="font-mono font-medium text-orange-600">
            {numericalDerivative(equation, hoverX).toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
}
