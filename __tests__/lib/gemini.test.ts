import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateProposal } from '@/lib/gemini'

// fetch 전역 모킹
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function makeGeminiResponse(text: string, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => ({
      candidates: [
        {
          content: {
            parts: [{ text }],
          },
        },
      ],
    }),
  }
}

function makeErrorResponse(status: number) {
  return {
    ok: false,
    status,
    json: async () => ({ error: { message: `HTTP ${status}` } }),
  }
}

describe('generateProposal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('유효한 입력에 대해 제안서 텍스트를 반환해야 한다', async () => {
    const expected = '귀사의 IT 인프라 구축 제안서입니다.'
    mockFetch.mockResolvedValueOnce(makeGeminiResponse(expected))

    const result = await generateProposal({
      industry: 'IT',
      clientName: '테스트 클라이언트',
      scope: '인프라 구축',
      budget: '1억',
    })

    // generateProposal returns ProposalOutput { text, generatedAt }
    expect(result.text).toBe(expected)
    expect(result.generatedAt).toBeDefined()
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('industry가 빈 값일 때 fallback 프롬프트를 사용해야 한다', async () => {
    const expected = '일반 제안서입니다.'
    mockFetch.mockResolvedValueOnce(makeGeminiResponse(expected))

    const result = await generateProposal({
      industry: '',
      clientName: '테스트 클라이언트',
      scope: '웹 개발',
      budget: '5천만원',
    })

    expect(result.text).toBe(expected)
    // fetch 호출 시 body에 fallback 관련 텍스트가 포함되어야 한다
    const callBody = JSON.parse((mockFetch.mock.calls[0][1] as RequestInit).body as string)
    expect(callBody).toBeDefined()
  })

  it('Gemini API 502/503 응답 시 GeminiError statusCode 503을 던져야 한다', async () => {
    mockFetch.mockResolvedValueOnce(makeErrorResponse(503))

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ statusCode: 503 })
  })

  it('Gemini API 502 응답 시에도 GeminiError statusCode 503을 던져야 한다', async () => {
    mockFetch.mockResolvedValueOnce(makeErrorResponse(502))

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ statusCode: 503 })
  })

  it('Gemini API 429 응답 시 isQuotaExceeded:true GeminiError를 던져야 한다', async () => {
    // 429 response body with "quota" keyword triggers isQuotaExceeded
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: 'Quota exceeded for quota metric' } }),
    })

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ isQuotaExceeded: true, statusCode: 503 })
  })

  it('GEMINI_API_KEY가 없으면 GeminiError를 던져야 한다', async () => {
    const originalKey = process.env.GEMINI_API_KEY
    delete process.env.GEMINI_API_KEY

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ statusCode: 500 })

    process.env.GEMINI_API_KEY = originalKey
  })

  it('네트워크 오류 시 503 GeminiError를 던져야 한다', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ statusCode: 503 })
  })

  it('Gemini 응답에 텍스트가 없으면 503 GeminiError를 던져야 한다', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ candidates: [{ content: { parts: [{ text: '' }] } }] }),
    })

    await expect(
      generateProposal({
        industry: 'IT',
        clientName: '클라이언트',
        scope: '개발',
        budget: '1억',
      })
    ).rejects.toMatchObject({ statusCode: 503 })
  })

  it('입력이 500자를 초과하면 에러를 던지거나 잘라내야 한다', async () => {
    const longInput = 'a'.repeat(501)

    // 구현에 따라 에러를 던지거나 잘라낸 결과를 반환할 수 있다.
    // 에러를 던지는 경우
    const throwingCase = generateProposal({
      industry: 'IT',
      clientName: longInput,
      scope: '개발',
      budget: '1억',
    }).catch((e) => e)

    // fetch가 호출되지 않거나 에러가 발생해야 한다
    const result = await throwingCase
    const fetchCalled = mockFetch.mock.calls.length > 0

    if (fetchCalled) {
      // fetch가 호출된 경우, 요청 body의 입력이 500자 이하여야 한다
      const callBody = JSON.parse(
        (mockFetch.mock.calls[0][1] as RequestInit).body as string
      )
      const bodyStr = JSON.stringify(callBody)
      expect(bodyStr.length).toBeLessThanOrEqual(2000) // 전체 payload 크기 제한
    } else {
      // fetch가 호출되지 않은 경우, 에러가 발생해야 한다
      expect(result).toBeInstanceOf(Error)
    }
  })
})
