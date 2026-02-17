import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InteractiveQuestion } from '@/components/interactive/InteractiveQuestion'

// Mock lucide-react icons to simple spans
vi.mock('lucide-react', () => ({
  CheckCircle2: (props: Record<string, unknown>) => <span data-testid="check-icon" {...props} />,
  XCircle: (props: Record<string, unknown>) => <span data-testid="x-icon" {...props} />,
  Lightbulb: (props: Record<string, unknown>) => <span data-testid="lightbulb-icon" {...props} />,
  ChevronRight: (props: Record<string, unknown>) => <span data-testid="chevron-icon" {...props} />,
}))

const defaultProps = {
  id: 'q1',
  question: 'What is 2 + 2?',
  options: [
    { text: '3', feedback: 'Not quite right' },
    { text: '4', feedback: 'Correct!' },
    { text: '5', feedback: 'Too high' },
  ],
  correctIndex: 1,
  hint: 'Think about basic addition',
  explanation: 'Two plus two equals four.',
}

describe('InteractiveQuestion', () => {
  // ── Renders question text ─────────────────────────────────────────────

  it('renders question text', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  })

  // ── Renders all option buttons ────────────────────────────────────────

  it('renders all option buttons', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  // ── Clicking correct answer shows explanation ─────────────────────────

  it('clicking correct answer shows explanation', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    fireEvent.click(screen.getByText('4'))
    expect(screen.getByText('Two plus two equals four.')).toBeInTheDocument()
  })

  // ── Clicking wrong answer shows feedback ──────────────────────────────

  it('clicking wrong answer shows feedback', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    fireEvent.click(screen.getByText('3'))
    expect(screen.getByText('Not quite right')).toBeInTheDocument()
  })

  // ── Clicking wrong then "Try Again" resets selection ──────────────────

  it('clicking wrong then "Try Again" resets selection', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    fireEvent.click(screen.getByText('3'))
    expect(screen.getByText('Not quite right')).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Try Again/))
    // After reset, the feedback should be gone
    expect(screen.queryByText('Not quite right')).not.toBeInTheDocument()
  })

  // ── "Show hint" button appears after wrong answer ─────────────────────

  it('"Show hint" button appears after wrong answer (if hint provided)', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    // No hint button before answering
    expect(screen.queryByText(/Show hint/)).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('3'))
    expect(screen.getByText(/Show hint/)).toBeInTheDocument()
  })

  // ── Clicking "Show hint" reveals hint text ────────────────────────────

  it('clicking "Show hint" reveals hint text', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText(/Show hint/))
    expect(screen.getByText('Think about basic addition')).toBeInTheDocument()
  })

  // ── onAnswer callback fires with true for correct, false for incorrect ─

  it('onAnswer callback fires with true for correct, false for incorrect', () => {
    const onAnswer = vi.fn()
    const { unmount } = render(
      <InteractiveQuestion {...defaultProps} onAnswer={onAnswer} />
    )
    fireEvent.click(screen.getByText('3'))
    expect(onAnswer).toHaveBeenCalledWith(false)

    unmount()

    const onAnswer2 = vi.fn()
    render(<InteractiveQuestion {...defaultProps} onAnswer={onAnswer2} />)
    fireEvent.click(screen.getByText('4'))
    expect(onAnswer2).toHaveBeenCalledWith(true)
  })

  // ── Correct answer disables further selection ─────────────────────────

  it('correct answer disables further selection', () => {
    const onAnswer = vi.fn()
    render(<InteractiveQuestion {...defaultProps} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByText('4'))
    expect(onAnswer).toHaveBeenCalledTimes(1)

    // Clicking another option should not trigger onAnswer again
    fireEvent.click(screen.getByText('3'))
    expect(onAnswer).toHaveBeenCalledTimes(1)
  })

  // ── Shows attempt count after correct answer if attempts > 1 ──────────

  it('shows attempt count after correct answer if attempts > 1', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    // First attempt: wrong
    fireEvent.click(screen.getByText('3'))
    // Try again
    fireEvent.click(screen.getByText(/Try Again/))
    // Second attempt: correct
    fireEvent.click(screen.getByText('4'))
    expect(screen.getByText(/Solved in 2 attempts/)).toBeInTheDocument()
  })

  // ── No attempt count shown when solved on first try ───────────────────

  it('does not show attempt count when solved on first try', () => {
    render(<InteractiveQuestion {...defaultProps} />)
    fireEvent.click(screen.getByText('4'))
    expect(screen.queryByText(/Solved in/)).not.toBeInTheDocument()
  })

  // ── No hint button when hint prop is not provided ─────────────────────

  it('no hint button when hint prop is not provided', () => {
    const { hint, ...propsWithoutHint } = defaultProps
    render(<InteractiveQuestion {...propsWithoutHint} />)
    fireEvent.click(screen.getByText('3'))
    expect(screen.queryByText(/Show hint/)).not.toBeInTheDocument()
  })
})
