import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProposalForm } from '@/components/ProposalForm'

interface ProposalInput {
  industry?: string
  clientName: string
  scope: string
  budget: string
}

describe('ProposalForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders 4 input fields (industry optional, rest required)', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    expect(screen.getByPlaceholderText('e.g. John Smith')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Bathroom pipe replacement/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. $500, negotiable')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. Plumbing, Interior Design, Consulting')).toBeInTheDocument()
  })

  it('displays character counter', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText(/500/)).toBeInTheDocument()
  })

  it('disables submit button when required fields are empty', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /generate|submit/i })
    expect(submitButton).toBeDisabled()
  })

  it('blocks input beyond 500 characters', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const scopeField = screen.getByPlaceholderText(/Bathroom pipe replacement/) as HTMLTextAreaElement
    const longText = 'a'.repeat(501)

    fireEvent.change(scopeField, { target: { value: longText } })

    expect(scopeField.value.length).toBeLessThanOrEqual(500)
  })

  it('calls onSubmit with correct ProposalInput after filling required fields', async () => {
    const user = userEvent.setup()
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const clientNameField = screen.getByPlaceholderText('e.g. John Smith')
    const scopeField = screen.getByPlaceholderText(/Bathroom pipe replacement/)
    const budgetField = screen.getByPlaceholderText('e.g. $500, negotiable')

    fireEvent.change(clientNameField, { target: { value: 'Acme Corp' } })
    fireEvent.change(scopeField, { target: { value: 'Website redesign' } })
    fireEvent.change(budgetField, { target: { value: '$5,000' } })

    const submitButton = screen.getByRole('button', { name: /generate|submit/i })
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    const submittedInput: ProposalInput = mockOnSubmit.mock.calls[0][0]
    expect(submittedInput.clientName).toBe('Acme Corp')
    expect(submittedInput.scope).toBe('Website redesign')
    expect(submittedInput.budget).toBe('$5,000')
  })
})
