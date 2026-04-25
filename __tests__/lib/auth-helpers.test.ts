import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCurrentUserId, isAuthenticated } from '@/lib/auth-helpers'

// auth module is mocked via vitest alias: @/auth → __mocks__/auth.ts
import { auth } from '@/auth'

const mockAuth = vi.mocked(auth)

// Auth 세션 타입 (실제 구현에 맞게 조정될 수 있음)
interface MockSession {
  user?: {
    id?: string | null
    email?: string | null
    sub?: string | null
    name?: string | null
  } | null
}

describe('getCurrentUserId', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('user.id(Google sub)가 있으면 id를 우선 반환해야 한다', async () => {
    const session: MockSession = {
      user: {
        id: 'sub-123',
        email: 'test@example.com',
      },
    }

    const result = await getCurrentUserId(session)

    expect(result).toBe('sub-123')
  })

  it('세션이 null이면 null을 반환해야 한다', async () => {
    const result = await getCurrentUserId(null)

    expect(result).toBeNull()
  })

  it('id가 없고 user.sub가 있으면 sub를 반환해야 한다', async () => {
    const session: MockSession = {
      user: {
        id: null,
        email: null,
        sub: 'google-oauth2|abc123',
      },
    }

    const result = await getCurrentUserId(session)

    expect(result).toBe('google-oauth2|abc123')
  })

  it('user가 null이면 null을 반환해야 한다', async () => {
    const session: MockSession = {
      user: null,
    }

    const result = await getCurrentUserId(session)

    expect(result).toBeNull()
  })

  it('id와 sub가 없으면 email을 반환해야 한다', async () => {
    const session: MockSession = {
      user: {
        id: null,
        sub: null,
        email: 'fallback@example.com',
        name: '테스트 유저',
      },
    }

    const result = await getCurrentUserId(session)

    expect(result).toBe('fallback@example.com')
  })

  it('id, sub, email 모두 없으면 null을 반환해야 한다', async () => {
    const session: MockSession = {
      user: {
        id: null,
        sub: null,
        email: null,
        name: '테스트 유저',
      },
    }

    const result = await getCurrentUserId(session)

    expect(result).toBeNull()
  })

  it('세션을 전달하지 않으면 auth()를 호출해야 한다', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'sub-auth-456', email: 'auth@example.com' } } as never)

    const result = await getCurrentUserId(undefined)

    expect(mockAuth).toHaveBeenCalledTimes(1)
    expect(result).toBe('sub-auth-456')
  })
})

describe('isAuthenticated', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('세션에 user가 있으면 true를 반환해야 한다', async () => {
    mockAuth.mockResolvedValueOnce({ user: { email: 'user@example.com' } } as never)

    const result = await isAuthenticated()

    expect(result).toBe(true)
  })

  it('세션이 null이면 false를 반환해야 한다', async () => {
    mockAuth.mockResolvedValueOnce(null as never)

    const result = await isAuthenticated()

    expect(result).toBe(false)
  })
})
