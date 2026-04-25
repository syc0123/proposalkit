import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { ProposalResult } from '@/components/ProposalResult'

describe('ProposalResult', () => {
  const sampleProposal = '# Proposal for Acme Corp\n\nThank you for the opportunity.'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders proposal text in textarea', () => {
    render(<ProposalResult text={sampleProposal} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect((textarea as HTMLTextAreaElement).value).toBe(sampleProposal)
  })

  it('allows editing textarea content', () => {
    render(<ProposalResult text={sampleProposal} />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    fireEvent.change(textarea, { target: { value: 'Updated proposal content' } })

    expect(textarea.value).toBe('Updated proposal content')
  })

  it('calls navigator.clipboard.writeText on copy button click', async () => {
    const user = userEvent.setup()

    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    render(<ProposalResult text={sampleProposal} />)

    const copyButton = screen.getByRole('button', { name: /copy/i })
    await user.click(copyButton)

    expect(writeTextSpy).toHaveBeenCalledTimes(1)
    expect(writeTextSpy).toHaveBeenCalledWith(sampleProposal)

    writeTextSpy.mockRestore()
  })

  it('shows "Copied!" toast after copy', async () => {
    const user = userEvent.setup()
    render(<ProposalResult text={sampleProposal} />)

    const copyButton = screen.getByRole('button', { name: /copy/i })
    await user.click(copyButton)

    await waitFor(() => {
      expect(screen.getByText(/Copied!/)).toBeInTheDocument()
    })
  })
})
