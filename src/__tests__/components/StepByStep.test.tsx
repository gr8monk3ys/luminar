import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StepByStep } from '@/components/interactive/StepByStep'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronDown: (props: Record<string, unknown>) => <span data-testid="chevron-down" {...props} />,
  ChevronRight: (props: Record<string, unknown>) => <span data-testid="chevron-right" {...props} />,
  CheckCircle2: (props: Record<string, unknown>) => <span data-testid="check-icon" {...props} />,
}))

// Mock MathBlock to avoid katex dependency
vi.mock('@/components/interactive/MathBlock', () => ({
  MathBlock: ({ latex }: { latex: string }) => (
    <span data-testid="math-block">{latex}</span>
  ),
}))

const defaultSteps = [
  { title: 'Step 1: Setup', content: 'Set up the equation' },
  { title: 'Step 2: Solve', content: 'Apply the quadratic formula' },
  { title: 'Step 3: Simplify', content: 'Simplify the result', latex: 'x = 4' },
]

describe('StepByStep', () => {
  // ── Renders the title ─────────────────────────────────────────────────

  it('renders the title', () => {
    render(<StepByStep steps={defaultSteps} title="My Solution" />)
    expect(screen.getByText('My Solution')).toBeInTheDocument()
  })

  // ── Uses "Solution" as default title ──────────────────────────────────

  it('uses "Solution" as default title when none provided', () => {
    render(<StepByStep steps={defaultSteps} />)
    expect(screen.getByText('Solution')).toBeInTheDocument()
  })

  // ── Initially shows step titles but not content ───────────────────────

  it('initially shows step titles but not their content', () => {
    render(<StepByStep steps={defaultSteps} />)
    // Step titles (in buttons) should be visible
    expect(screen.getByText('Step 1: Setup')).toBeInTheDocument()
    expect(screen.getByText('Step 2: Solve')).toBeInTheDocument()
    expect(screen.getByText('Step 3: Simplify')).toBeInTheDocument()
    // Content should not be visible yet
    expect(screen.queryByText('Set up the equation')).not.toBeInTheDocument()
    expect(screen.queryByText('Apply the quadratic formula')).not.toBeInTheDocument()
    expect(screen.queryByText('Simplify the result')).not.toBeInTheDocument()
  })

  // ── Clicking "Next step" reveals next step ──────────────────────────

  it('clicking "Next step" reveals the next unrevealed step', () => {
    render(<StepByStep steps={defaultSteps} />)
    fireEvent.click(screen.getByText('Next step'))
    expect(screen.getByText('Set up the equation')).toBeInTheDocument()
    expect(screen.queryByText('Apply the quadratic formula')).not.toBeInTheDocument()
  })

  // ── All steps can be revealed one by one ──────────────────────────────

  it('all steps can be revealed one by one via "Next step"', () => {
    render(<StepByStep steps={defaultSteps} />)
    fireEvent.click(screen.getByText('Next step'))
    expect(screen.getByText('Set up the equation')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Next step'))
    expect(screen.getByText('Apply the quadratic formula')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Next step'))
    expect(screen.getByText('Simplify the result')).toBeInTheDocument()
  })

  // ── "Show all" reveals all steps at once ──────────────────────────────

  it('"Show all" reveals all steps at once', () => {
    render(<StepByStep steps={defaultSteps} />)
    fireEvent.click(screen.getByText('Show all'))
    expect(screen.getByText('Set up the equation')).toBeInTheDocument()
    expect(screen.getByText('Apply the quadratic formula')).toBeInTheDocument()
    expect(screen.getByText('Simplify the result')).toBeInTheDocument()
  })

  // ── "Hide all" hides all steps after they were shown ──────────────────

  it('"Hide all" hides all steps after they were shown via "Show all"', () => {
    render(<StepByStep steps={defaultSteps} />)
    fireEvent.click(screen.getByText('Show all'))
    expect(screen.getByText('Set up the equation')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Hide all'))
    expect(screen.queryByText('Set up the equation')).not.toBeInTheDocument()
    expect(screen.queryByText('Apply the quadratic formula')).not.toBeInTheDocument()
  })

  // ── Clicking a step title toggles its content ─────────────────────────

  it('clicking a step title toggles its visibility', () => {
    render(<StepByStep steps={defaultSteps} />)
    // Click the first step title to open it
    fireEvent.click(screen.getByText('Step 1: Setup'))
    expect(screen.getByText('Set up the equation')).toBeInTheDocument()

    // Click again to close it
    fireEvent.click(screen.getByText('Step 1: Setup'))
    expect(screen.queryByText('Set up the equation')).not.toBeInTheDocument()
  })

  // ── LaTeX content is rendered when present ────────────────────────────

  it('renders MathBlock when latex is provided on a step', () => {
    render(<StepByStep steps={defaultSteps} />)
    fireEvent.click(screen.getByText('Show all'))
    expect(screen.getByTestId('math-block')).toBeInTheDocument()
    expect(screen.getByTestId('math-block')).toHaveTextContent('x = 4')
  })
})
