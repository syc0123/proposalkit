import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { ProposalResult } from '@/components/ProposalResult'

describe('ProposalResult', () => {
  const sampleProposal = '귀사의 웹 서비스 개발 제안서입니다.\n상세 내용이 여기 포함됩니다.'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('textarea에 제안서 텍스트를 렌더링해야 한다', () => {
    // ProposalResult prop is `text`, not `proposal`
    render(<ProposalResult text={sampleProposal} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect((textarea as HTMLTextAreaElement).value).toBe(sampleProposal)
  })

  it('textarea 내용을 편집할 수 있어야 한다', () => {
    render(<ProposalResult text={sampleProposal} />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    // Use fireEvent.change for reliable controlled textarea update
    fireEvent.change(textarea, { target: { value: '수정된 제안서 내용' } })

    expect(textarea.value).toBe('수정된 제안서 내용')
  })

  it('복사 버튼 클릭 시 navigator.clipboard.writeText를 호출해야 한다', async () => {
    // userEvent.setup() stubs navigator.clipboard in the jsdom environment
    const user = userEvent.setup()

    // Spy AFTER userEvent.setup() has installed the clipboard stub
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    render(<ProposalResult text={sampleProposal} />)

    const copyButton = screen.getByRole('button', { name: /복사/i })
    await user.click(copyButton)

    expect(writeTextSpy).toHaveBeenCalledTimes(1)
    expect(writeTextSpy).toHaveBeenCalledWith(sampleProposal)

    writeTextSpy.mockRestore()
  })

  it('복사 후 "복사되었습니다" 토스트를 표시해야 한다', async () => {
    const user = userEvent.setup()
    render(<ProposalResult text={sampleProposal} />)

    const copyButton = screen.getByRole('button', { name: /복사/i })
    await user.click(copyButton)

    await waitFor(() => {
      expect(screen.getByText(/복사되었습니다/)).toBeInTheDocument()
    })
  })
})
