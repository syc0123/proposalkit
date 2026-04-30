## 역할
인증, Gemini API 호출, 레이트 리미팅, 관리자 판정 등 핵심 비즈니스 로직 계층. 모든 route handler와 서버 컴포넌트에서 이 모듈을 호출한다. types/proposal.ts의 타입 계약과 강하게 결합되어 있다.

## 주요 파일
- **auth-helpers.ts** — `getCurrentUserId(session)`: user.id → user.sub → user.email 우선순위 폴백. `isAuthenticated(session)`: 불린 반환.
- **admin.ts** — `isAdminEmail(email)`: ADMIN_EMAILS 환경변수 쉼표 파싱, 대소문자 무시. env 미설정 시 모두 false.
- **gemini.ts** — `generateProposal(input)`: Gemini 2.5 Flash 호출, 온도 0.7, 2048 토큰. `GeminiError` 클래스 (statusCode, isQuotaExceeded 필드). 429 응답 body에 "quota"/"rate" 부분문자열로 쿼터 초과 판정.
- **rate-limit.ts** — `checkAndIncrement(userId, kv?)`: FREE_LIMIT=5. `getRemainingCount(userId, kv?)`: 사용 없으면 5 반환. KV 미전달 시 인메모리 폴백.

## 연결 고리
- **getCurrentUserId** ← auth.ts jwt/session 콜백이 `token.sub`을 `session.user.id`에 복사
- **checkAndIncrement** → KV 키 형식 `rate:{userId}:{YYYY-MM}` UTC 기준, TTL = 다음 달 1일 자정 UTC
- **generateProposal** ← ProposalInput (clientName/scope/budget 필수, scope ≤500자)
- **isAdminEmail** ← ADMIN_EMAILS env 변수 (app/dashboard/page.tsx에서 호출)

## 단일 진입점
- 레이트 리밋 체크는 `/api/generate` route handler에서만 (`checkAndIncrement`). 클라이언트 sessionStorage 체크는 서버에서 강제하지 않음.
- `getRemainingCount`는 대시보드 표시용으로만 사용.

## 절대 금지
- **세션 없이 getCurrentUserId 직접 접근 금지** — 반드시 `getCurrentUserId` 헬퍼에 위임해야 우선순위 폴백이 적용됨
- **GeminiError 외부 재처리 금지** — route handler는 `error.statusCode`와 `error.isQuotaExceeded`만 소비. 429 판정 로직을 외부에서 중복 구현하지 않을 것
- **KV get+put 사이에 유효성 검사 추가 금지** — 비원자적 패턴 (Phase A 수용). 원자성이 필요하면 별도 설계 필요

## 숨겨진 스펙
- rate-limit KV 키: `rate:{userId}:{YYYY-MM}`, UTC 기준 달력월
- KV 동시성 미보호: get → put 사이 경합 시 FREE_LIMIT 초과 가능 (수용된 설계)
- Gemini 쿼터 감지 휴리스틱: response body에 "quota" 또는 "rate" 포함 여부로 판정
- edge runtime에서 동작: `@cloudflare/next-on-pages`의 `getRequestContext()`로 KV 주입

---

## types/ 요약

**types/proposal.ts** — API 계약 타입 정의.

- `ProposalInput`: clientName, scope, budget 필수 / industry, yourName, timeline 선택
- `ProposalOutput`: text (마크다운), generatedAt (ISO 문자열)
- `RateLimitResult`: allowed, remaining (0~5), resetAt (다음 달 1일 UTC ISO)
- `GenerateApiResponse`: proposal과 error는 상호 배타적. rateLimitRemaining은 429 시에만 포함.

**타입 변경 시** route handler, gemini.ts buildPrompt, ProposalForm onSubmit을 함께 수정할 것.

@MISTAKES.md
