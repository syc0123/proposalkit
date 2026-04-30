## 역할
Vitest + React Testing Library 기반 단위 테스트 스위트. 컴포넌트 동작, 인증 헬퍼, Gemini API 호출, 레이트 리미팅을 검증한다. `@/auth` 별칭을 `__mocks__/auth.ts`로 교체해 네트워크 의존성을 제거한다.

## 주요 파일
- **setup.ts** — `@testing-library/jest-dom` 임포트만. 추가 설정 없음.
- **components/ProposalForm.test.tsx** — 필수 필드 검증, 500자 제한, onSubmit 콜백.
- **components/ProposalResult.test.tsx** — textarea 렌더링, 편집, 클립보드 복사("Copied!" 토스트 2초), `navigator.clipboard.writeText` 스파이.
- **lib/auth-helpers.test.ts** — `getCurrentUserId` 우선순위 (id → sub → email → null), `isAuthenticated` 반환값.
- **lib/gemini.test.ts** — 정상 응답 `{text, generatedAt}`, 429+"quota" → `isQuotaExceeded:true`, 500/503 에러 변환, `GEMINI_API_KEY` 미설정 → statusCode 500.
- **lib/rate-limit.test.ts** — 첫 호출 `{allowed:true, remaining:4}`, 5회 초과 `{allowed:false, remaining:0}`, KV 키 형식, TTL(다음 달 1일 UTC), 인메모리 폴백.
- **__mocks__/auth.ts** — `auth()` 함수 모킹. `vi.mock("@/auth")` 없이 vitest.config.ts alias로 자동 적용.

## 연결 고리
- `vitest.config.ts`의 alias 순서: `@/auth` (구체) → `@/` (일반). 이 순서가 역전되면 모킹 미적용.
- `gemini.test.ts`의 `makeGeminiResponse` 헬퍼: `candidates[0].content.parts[0].text` 경로 고정.
- `auth-helpers.test.ts`의 `SessionLike` 타입: test 파일 내 정의, 실제 next-auth 타입과 구조 맞춰야 함.

## 등록 절차
- **새 테스트 파일 추가 시:** `vitest.config.ts`의 `include` 패턴(`**/__tests__/**/*.{test,spec}.{ts,tsx}`) 확인
- **새 lib 모듈 추가 시:** 대응하는 테스트 파일을 `__tests__/lib/`에 생성
- **각 describe 블록:** `beforeEach(() => vi.clearAllMocks())` 필수 (상태 누적 방지)

## 절대 금지
- **rate-limit.test.ts에서 Date 고정값 모킹 금지** — TTL 계산이 실시간 기반이므로 고정하면 만료 검증 깨짐
- **.env 파일 직접 읽기 금지** — `process.env.GEMINI_API_KEY`는 테스트 내 `delete`로 조작
- **vitest.config.ts alias 순서 변경 금지** — `@/auth` 가 `@/` 보다 먼저 와야 모킹 작동

## 숨겨진 스펙
- ProposalForm 버튼 탐색: `/generate|submit/i` 정규식 (실제 텍스트 "Generate Proposal")
- ProposalResult textarea: `screen.getByRole('textbox')` (role 기반 쿼리)
- rate-limit 인메모리 폴백 맵은 각 테스트 격리를 위해 모듈 re-import 또는 내부 초기화 필요

@MISTAKES.md
