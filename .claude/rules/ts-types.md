---
globs: types/**/*.ts
---

# types/ 타입 정의 규칙

## 네이밍
- 인터페이스 접미사: `Input`, `Output`, `Result`, `Request`, `Response`
  - 예: `ProposalInput`, `ProposalOutput`, `RateLimitResult`, `GenerateApiRequest`, `GenerateApiResponse`

## 필수/선택 필드
- 필수: `?` 없음 (`clientName`, `scope`, `budget`)
- 선택: `?` 접미사 (`industry?`, `yourName?`, `timeline?`)
- `string | null` — 의도적 null값 / `string | undefined` — 미설정값 구분

## API 응답 타입
- 성공/에러 필드는 상호 배타적: `proposal?: ProposalOutput` + `error?: string`
- 429 전용 필드는 조건부 추가: `rateLimitRemaining?: number`

## 시간 필드
- ISO 8601 문자열 (`generatedAt`, `resetAt`)
- `resetAt`: 항상 다음 달 1일 00:00 UTC

## 타입 변경 시 연쇄 수정 순서
1. `types/proposal.ts` 수정
2. `lib/gemini.ts` — `buildPrompt` 함수
3. `app/api/generate/route.ts` — 유효성 검사
4. `components/ProposalForm.tsx` — onSubmit 반환값
