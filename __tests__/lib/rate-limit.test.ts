import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkAndIncrement, getRemainingCount } from '@/lib/rate-limit'

// Cloudflare KV 바인딩을 Map으로 모킹
function makeKVMock() {
  const store = new Map<string, string>()
  return {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string, opts?: { expirationTtl?: number }) => {
      store.set(key, value)
    }),
    delete: vi.fn(async (key: string) => { store.delete(key) }),
    _store: store,
  }
}

type KVMock = ReturnType<typeof makeKVMock>

describe('checkAndIncrement', () => {
  let kv: KVMock

  beforeEach(() => {
    kv = makeKVMock()
    vi.clearAllMocks()
  })

  it('첫 번째 호출 시 allowed:true, remaining:4를 반환해야 한다', async () => {
    const result = await checkAndIncrement('user-abc', kv)

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it('count가 5 이상이면 allowed:false를 반환해야 한다', async () => {
    const userId = 'user-abc'
    const now = new Date()
    // Implementation uses UTC dates
    const key = `rate:${userId}:${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
    kv._store.set(key, '5')

    const result = await checkAndIncrement(userId, kv)

    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('올바른 키 형식 rate:{userId}:{YYYY-MM}을 사용해야 한다', async () => {
    const userId = 'user-xyz'
    await checkAndIncrement(userId, kv)

    const now = new Date()
    // Implementation uses UTC dates
    const year = now.getUTCFullYear()
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    const expectedKey = `rate:${userId}:${year}-${month}`

    const putCalls = kv.put.mock.calls
    const usedKey = putCalls[0]?.[0]
    expect(usedKey).toBe(expectedKey)
  })

  it('TTL을 다음 달 1일 자정으로 설정해야 한다', async () => {
    const before = Date.now()
    await checkAndIncrement('user-abc', kv)
    const after = Date.now()

    // Implementation uses UTC: Date.UTC(year, month+1, 1, 0, 0, 0, 0)
    const midpoint = new Date((before + after) / 2)
    const nextMonthUTC = new Date(
      Date.UTC(midpoint.getUTCFullYear(), midpoint.getUTCMonth() + 1, 1, 0, 0, 0, 0)
    )
    const expectedTtl = Math.ceil((nextMonthUTC.getTime() - midpoint.getTime()) / 1000)

    const putCalls = kv.put.mock.calls
    const opts = putCalls[0]?.[2] as { expirationTtl?: number } | undefined
    const actualTtl = opts?.expirationTtl ?? 0

    // TTL은 예상값의 ±5초 오차 허용
    expect(actualTtl).toBeGreaterThan(expectedTtl - 5)
    expect(actualTtl).toBeLessThanOrEqual(expectedTtl + 5)
  })

  it('KV 바인딩이 없을 때 인메모리 fallback을 사용해야 한다', async () => {
    // KV를 undefined로 전달
    const result = await checkAndIncrement('user-fallback-A', undefined)

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)

    // 두 번째 호출도 카운트가 누적되어야 한다
    const result2 = await checkAndIncrement('user-fallback-A', undefined)
    expect(result2.remaining).toBe(3)
  })
})

describe('getRemainingCount', () => {
  let kv: ReturnType<typeof makeKVMock>

  beforeEach(() => {
    kv = makeKVMock()
    vi.clearAllMocks()
  })

  it('사용 기록이 없으면 5를 반환해야 한다', async () => {
    const result = await getRemainingCount('new-user', kv)
    expect(result).toBe(5)
  })

  it('2회 사용 후 남은 횟수 3을 반환해야 한다', async () => {
    const userId = 'user-count'
    const now = new Date()
    const key = `rate:${userId}:${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
    kv._store.set(key, '2')

    const result = await getRemainingCount(userId, kv)
    expect(result).toBe(3)
  })

  it('5회 초과 사용 시 0을 반환해야 한다', async () => {
    const userId = 'user-over'
    const now = new Date()
    const key = `rate:${userId}:${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
    kv._store.set(key, '10')

    const result = await getRemainingCount(userId, kv)
    expect(result).toBe(0)
  })
})
