# SPEC-MVP-001 구현 계획

## 구현 전략

Sprint 1은 7개 요구사항(R1, R2, R3, R4, R5, R9, R10)을 **3개 레이어**로 나눠 병렬·순차 혼합으로 진행한다.

1. **Foundation Layer** (T1~T3, 순차 필수): 의존성 설치 → 타입/환경 → NextAuth 골격
2. **Core Layer** (T4~T8, 병렬 가능): Gemini 클라이언트, Rate limit, UI 컴포넌트
3. **Integration Layer** (T9~T12, 순차): 페이지 조립 → API route 통합 → 반응형 검수

각 task는 독립 PR/커밋 단위로 검증 가능하도록 분리한다. 기존 `app/page.tsx`(스캐폴딩)는 T9에서 전면 교체한다.

## 태스크 목록

### Foundation Layer (순차)

- [ ] **T1: 의존성 설치 및 환경 설정** — `package.json`, `.env.example`, `next.config.ts`
  - 설치: `next-auth@beta`, `@auth/core`, `@google/generative-ai`, `@cloudflare/workers-types`
  - `.env.example` 작성: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `GEMINI_API_KEY`, `KV_BINDING` 명시
  - `next.config.ts`에 Cloudflare Pages 호환 옵션 추가 (필요 시 `experimental.runtime` 또는 `@cloudflare/next-on-pages` 검토)
  - 의존성: 없음

- [ ] **T2: 타입 정의** — `types/proposal.ts`
  - `ProposalInput { industry?: string; clientName: string; scope: string; budget: string }`
  - `ProposalOutput { text: string; generatedAt: string }`
  - `RateLimitResult { allowed: boolean; remaining: number; resetAt: string }`
  - 의존성: T1

- [ ] **T3: NextAuth v5 골격** — `auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth-helpers.ts`
  - `auth.ts`: `NextAuth({ providers: [Google], session: { strategy: "jwt" } })` 익스포트
  - `route.ts`: NextAuth handler 재익스포트 (`GET`, `POST`)
  - `auth-helpers.ts`: `getCurrentUserId()` — 세션 이메일 또는 sub 반환
  - 의존성: T1, T2

### Core Layer (T4, T5, T6, T7, T8 병렬)

- [ ] **T4: Gemini 클라이언트** — `lib/gemini.ts`
  - `generateProposal(input: ProposalInput): Promise<string>`
  - 프롬프트 빌더: 업종 비어있을 때 일반 fallback
  - 502/503 에러 매핑, 일일 quota 초과 감지 (응답 코드/메시지)
  - 의존성: T2

- [ ] **T5: Rate limit (Cloudflare KV)** — `lib/rate-limit.ts`
  - `checkAndIncrement(userId: string): Promise<RateLimitResult>`
  - 키: `rate:{userId}:{YYYY-MM}`, TTL: 다음 달 1일 자정까지
  - read-modify-write 패턴 (race 허용 — Phase A)
  - KV 바인딩 미존재 시 명확한 에러 throw
  - 의존성: T2

- [ ] **T6: ProposalForm 컴포넌트** — `components/ProposalForm.tsx`
  - 4 필드: 업종(optional), 고객명, 작업내용, 예산
  - 500자 카운터, 클라이언트 검증
  - submit → `onSubmit(input: ProposalInput)` 콜백
  - Tailwind 4 반응형 (mobile-first, sm: 브레이크)
  - 의존성: T2

- [ ] **T7: ProposalResult 컴포넌트** — `components/ProposalResult.tsx`
  - `<textarea>` 인라인 에디터 (R3)
  - "복사" 버튼: `navigator.clipboard.writeText` + `execCommand` fallback (R4)
  - 토스트 "복사되었습니다" — 단순 inline 알림 (라이브러리 없이)
  - 의존성: T2

- [ ] **T8: 보조 UI 컴포넌트** — `components/LoginPrompt.tsx`, `components/UpgradeModal.tsx`, `components/GoogleSignInButton.tsx`
  - LoginPrompt: 1회 free 사용 후 표시되는 배너 + Google 버튼
  - UpgradeModal: 429 응답 시 표시되는 모달 ("Pro 업그레이드 — Sprint 3 예정" placeholder CTA)
  - GoogleSignInButton: `signIn("google")` 호출
  - 의존성: T3

### Integration Layer (순차)

- [ ] **T9: 랜딩 페이지 통합** — `app/page.tsx` (전면 교체), `app/layout.tsx` (메타 수정)
  - 기존 스캐폴딩 제거
  - ProposalForm + ProposalResult 조립
  - 미로그인 1회 free 추적 (sessionStorage 키 `pk:guest_used`)
  - 1회 후 LoginPrompt 표시
  - 모바일 단일컬럼 / 데스크톱 2컬럼 (R10)
  - 의존성: T6, T7, T8

- [ ] **T10: /api/generate route** — `app/api/generate/route.ts`
  - POST 핸들러
  - 인증 분기: 로그인 → Rate limit 체크, 미로그인 → 통과 (1회 free는 클라이언트 책임)
  - Gemini 호출 → 성공 시 KV 카운트 +1
  - 에러 매핑: 429 (한도 초과), 503 (Gemini 다운/quota), 400 (입력 검증)
  - 의존성: T4, T5, T3

- [ ] **T11: 대시보드 페이지** — `app/dashboard/page.tsx`
  - `auth()` 가드 — 미로그인 시 `/`로 redirect
  - 환영 메시지 + 잔여 사용량 표시 (KV 조회)
  - 신규 제안서 생성 폼 재사용 (ProposalForm + ProposalResult)
  - 의존성: T9, T10

- [ ] **T12: 반응형 검수 및 빌드 확인** — 전 페이지
  - Chrome DevTools 모바일 에뮬레이션 (iPhone SE, iPad, Desktop)
  - 터치 타겟 44x44px 검증
  - `next build` 성공 확인
  - Cloudflare Pages 호환성 점검 (edge runtime 경고 확인)
  - 의존성: T11

## 병렬화 그룹

| Group | Tasks | 비고 |
|-------|-------|------|
| G1 (sequential) | T1 → T2 → T3 | Foundation, 순차 필수 |
| G2 (parallel) | T4, T5, T6, T7, T8 | Core, 5개 동시 가능 |
| G3 (sequential) | T9 → T10 → T11 → T12 | Integration, 의존성 사슬 |

worktree 동시 한도 5개 — G2는 정확히 5 task로 동시 실행 안전.

## 변경 범위 추정

| Task | 신규 파일 | 수정 파일 | 예상 LOC |
|------|-----------|-----------|----------|
| T1 | `.env.example` | `package.json`, `next.config.ts` | ~30 |
| T2 | `types/proposal.ts` | — | ~25 |
| T3 | `auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `lib/auth-helpers.ts` | — | ~60 |
| T4 | `lib/gemini.ts` | — | ~120 |
| T5 | `lib/rate-limit.ts` | — | ~90 |
| T6 | `components/ProposalForm.tsx` | — | ~150 |
| T7 | `components/ProposalResult.tsx` | — | ~100 |
| T8 | 3 components | — | ~180 (3 files) |
| T9 | — | `app/page.tsx`, `app/layout.tsx` | ~200 (page.tsx 전면 교체) |
| T10 | `app/api/generate/route.ts` | — | ~130 |
| T11 | `app/dashboard/page.tsx` | — | ~120 |
| T12 | — | (반응형 미세 조정) | ~30 |

총 예상: ~1,235 LOC, 14 신규 파일, 4 수정 파일. 모든 파일 300줄 이하 유지.

## 리스크 및 완화

- R-1: NextAuth v5는 beta — API 변경 가능 → `next-auth@5.0.0-beta.x` 핀고정
- R-2: Cloudflare Pages + Next.js 15 호환성 → `@cloudflare/next-on-pages` 어댑터 또는 표준 Pages 배포 검증 필요 (T1에서 결정)
- R-3: KV 바인딩은 로컬 dev에서 wrangler 필요 → `lib/rate-limit.ts`에 in-memory fallback 옵션 추가 검토
- R-4: Gemini 응답 시간 변동 (30초 목표 vs 실제 평균) → 클라이언트 타임아웃 60초, 로딩 인디케이터 필수
