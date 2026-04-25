import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProposalForm } from '@/components/ProposalForm'

// ProposalInput type matching implementation
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

  it('4개의 입력 필드를 렌더링해야 한다 (industry 선택, 나머지 필수)', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    // Use specific placeholders that are unique to each field
    expect(screen.getByPlaceholderText('예: 홍길동 고객님')).toBeInTheDocument()   // 고객명
    expect(screen.getByPlaceholderText(/욕실 배관 교체/)).toBeInTheDocument()      // 작업 내용 (textarea)
    expect(screen.getByPlaceholderText('예: 50만원, 협의 가능')).toBeInTheDocument() // 예산
    expect(screen.getByPlaceholderText('예: 배관, 인테리어, 컨설팅')).toBeInTheDocument() // 업종 (input)
  })

  it('글자 수 카운터를 표시해야 한다', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    // Counter renders as "0/500자" with spaces between spans
    expect(screen.getByText(/500/)).toBeInTheDocument()
  })

  it('필수 필드가 비어 있을 때 제출 버튼이 비활성화되어야 한다', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /생성|제출|submit/i })
    expect(submitButton).toBeDisabled()
  })

  it('입력 글자 수가 500자를 초과하면 추가 입력이 차단되어야 한다', () => {
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const scopeField = screen.getByPlaceholderText(/욕실 배관 교체/) as HTMLTextAreaElement
    const longText = 'a'.repeat(501)

    // Use fireEvent.change to bypass slow userEvent.type for long strings
    fireEvent.change(scopeField, { target: { value: longText } })

    // The onChange handler clamps at 500 chars: if value.length <= 500 setScope
    // So the field should not contain more than 500 chars
    expect(scopeField.value.length).toBeLessThanOrEqual(500)
  })

  it('필수 필드 입력 후 폼 제출 시 onSubmit을 올바른 ProposalInput과 함께 호출해야 한다', async () => {
    const user = userEvent.setup()
    render(<ProposalForm onSubmit={mockOnSubmit} />)

    const clientNameField = screen.getByPlaceholderText('예: 홍길동 고객님')
    const scopeField = screen.getByPlaceholderText(/욕실 배관 교체/)
    const budgetField = screen.getByPlaceholderText('예: 50만원, 협의 가능')

    // Use fireEvent.change for reliable controlled input update
    fireEvent.change(clientNameField, { target: { value: '(주)테스트' } })
    fireEvent.change(scopeField, { target: { value: '웹 서비스 개발' } })
    fireEvent.change(budgetField, { target: { value: '5천만원' } })

    const submitButton = screen.getByRole('button', { name: /생성|제출|submit/i })
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    const submittedInput: ProposalInput = mockOnSubmit.mock.calls[0][0]
    expect(submittedInput.clientName).toBe('(주)테스트')
    expect(submittedInput.scope).toBe('웹 서비스 개발')
    expect(submittedInput.budget).toBe('5천만원')
  })
})
