import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TrueFalse } from '@/components/interactive/TrueFalse'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  CheckCircle2: (props: Record<string, unknown>) => <span data-testid="check-circle" {...props} />,
  XCircle: (props: Record<string, unknown>) => <span data-testid="x-circle" {...props} />,
  Lightbulb: (props: Record<string, unknown>) => <span data-testid="lightbulb" {...props} />,
  Check: (props: Record<string, unknown>) => <span data-testid="check" {...props} />,
  X: (props: Record<string, unknown>) => <span data-testid="x" {...props} />,
  HelpCircle: (props: Record<string, unknown>) => <span data-testid="help-circle" {...props} />,
}))

const defaultProps = {
  id: 'tf1',
  statement: 'The sky is blue.',
  isTrue: true,
  explanation: 'The sky appears blue due to Rayleigh scattering.',
}

describe('TrueFalse', () => {
  // ── Renders the statement ─────────────────────────────────────────────

  it('renders the statement', () => {
    render(<TrueFalse {...defaultProps} />)
    expect(screen.getByText('The sky is blue.')).toBeInTheDocument()
  })

  // ── Renders True and False buttons ────────────────────────────────────

  it('renders True and False buttons', () => {
    render(<TrueFalse {...defaultProps} />)
    expect(screen.getByText('True')).toBeInTheDocument()
    expect(screen.getByText('False')).toBeInTheDocument()
  })

  // ── Clicking the correct answer shows success ─────────────────────────

  it('clicking the correct answer (True for isTrue=true) shows success', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('True'))
    expect(screen.getByText(/Correct!/)).toBeInTheDocument()
  })

  // ── Clicking wrong answer shows failure ───────────────────────────────

  it('clicking the wrong answer shows failure', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('False'))
    expect(screen.getByText(/Incorrect/)).toBeInTheDocument()
  })

  // ── Works when isTrue is false ────────────────────────────────────────

  it('clicking False is correct when isTrue is false', () => {
    render(
      <TrueFalse
        {...defaultProps}
        isTrue={false}
        statement="The earth is flat."
      />
    )
    fireEvent.click(screen.getByText('False'))
    expect(screen.getByText(/Correct!/)).toBeInTheDocument()
  })

  it('clicking True is wrong when isTrue is false', () => {
    render(
      <TrueFalse
        {...defaultProps}
        isTrue={false}
        statement="The earth is flat."
      />
    )
    fireEvent.click(screen.getByText('True'))
    expect(screen.getByText(/Incorrect/)).toBeInTheDocument()
  })

  // ── Explanation shows after answering ─────────────────────────────────

  it('explanation shows after answering correctly', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('True'))
    expect(
      screen.getByText('The sky appears blue due to Rayleigh scattering.')
    ).toBeInTheDocument()
  })

  it('explanation shows after answering incorrectly', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('False'))
    expect(
      screen.getByText('The sky appears blue due to Rayleigh scattering.')
    ).toBeInTheDocument()
  })

  // ── Correct answer disables further selection ─────────────────────────

  it('correct answer disables further clicks', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('True'))
    expect(screen.getByText(/Correct!/)).toBeInTheDocument()
    // The True button should be disabled now
    const trueButton = screen.getByText('True').closest('button')!
    expect(trueButton).toBeDisabled()
  })

  // ── Show hint after wrong answer ──────────────────────────────────────

  it('shows "Show hint" button after wrong answer when hint is provided', () => {
    render(<TrueFalse {...defaultProps} hint="Look outside!" />)
    expect(screen.queryByText(/Show hint/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('False'))
    expect(screen.getByText(/Show hint/)).toBeInTheDocument()
  })

  it('clicking "Show hint" reveals hint text', () => {
    render(<TrueFalse {...defaultProps} hint="Look outside!" />)
    fireEvent.click(screen.getByText('False'))
    fireEvent.click(screen.getByText(/Show hint/))
    expect(screen.getByText('Look outside!')).toBeInTheDocument()
  })

  it('does not show hint button when no hint provided', () => {
    render(<TrueFalse {...defaultProps} />)
    fireEvent.click(screen.getByText('False'))
    expect(screen.queryByText(/Show hint/)).not.toBeInTheDocument()
  })
})
