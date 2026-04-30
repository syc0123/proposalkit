---
globs: __tests__/**/*.{ts,tsx}, __mocks__/**/*.ts
---

# Vitest 테스트 규칙

## 파일 구조
- `__tests__/components/` — 컴포넌트 테스트 (`*.test.tsx`)
- `__tests__/lib/` — 유틸리티/서비스 테스트 (`*.test.ts`)
- 파일명: `{원본파일명}.test.{ts,tsx}`

## describe/it 구조
- describe 기준: 함수명 또는 컴포넌트명 (`describe('generateProposal', ...)`)
- `beforeEach(() => vi.clearAllMocks())` — 모든 describe 블록 내 필수
- `it` 설명: "should {동작} {대상}" 형식

## 모킹
- `vi.fn()` — 콜백 함수 모킹. `mock.calls[0][0]`으로 인수 검증
- `vi.stubGlobal('fetch', mockFetch)` — fetch 전역 모킹
- `__mocks__/auth.ts` — `@/auth` 모킹. vitest.config.ts alias로 자동 적용 (vi.mock 선언 불필요)
- vitest.config.ts alias 순서: `@/auth` (구체) → `@/` (일반) — 역전 금지, 모킹 미작동

## 헬퍼 함수
- 테스트 파일 내에 재사용 헬퍼 선언: `makeGeminiResponse(text, status)`, `makeErrorResponse(status)` 등
- `candidates[0].content.parts[0].text` 경로가 Gemini 응답 구조 (헬퍼에서 유지)

## 환경변수 조작
- `delete process.env.GEMINI_API_KEY` — 테스트 내 설정 제거. 테스트 후 복구 필요

## 금지
- `Date` 고정값 모킹 금지 — rate-limit TTL 계산이 실시간 기반, 고정 시 만료 로직 깨짐
- `.env` 파일 직접 읽기 금지
