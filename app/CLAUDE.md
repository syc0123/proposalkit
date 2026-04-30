## 역할
Next.js App Router 페이지 및 API 엔드포인트. 홈(미인증 1회), 대시보드(인증 월 5회), API 라우트(생성/인증), SEO 랜딩 페이지로 구성된다. Cloudflare Pages edge runtime에서 동작.

## 주요 파일
- **layout.tsx** — 루트 레이아웃, Inter 서체, 라이트 테마 기본값, 공통 메타데이터
- **page.tsx** (홈) — 미인증 사용자 1회 무료 생성. `sessionStorage("pk:guest_used")`로 클라이언트 추적. showSignin prop으로 로그인 배너 표시.
- **api/generate/route.ts** — POST 제안서 생성 엔드포인트. 유효성 검사 → 인증 확인 → 레이트 리밋 → Gemini 호출. `export const runtime = "edge"` 필수.
- **api/auth/[...nextauth]/route.ts** — NextAuth 핸들러. `export const runtime = "edge"` 필수.
- **dashboard/page.tsx** — 서버 컴포넌트. auth() 세션 검증, isAdminEmail 체크, getRemainingCount 호출, DashboardClient 위임.
- **dashboard/DashboardClient.tsx** — 클라이언트 컴포넌트. ProposalForm + ProposalResult 상태 관리. 429 → UpgradeModal.
- **for/*/page.tsx** — 5개 직업별 SEO 랜딩 페이지 (ForLandingTemplate 사용).
- **sitemap.ts** / **robots.ts** — SEO 메타데이터 자동 생성.
- **auth.ts** (루트) — NextAuth 5 설정. Google OAuth, JWT 세션, `token.sub` → `session.user.id` 복사.
- **middleware.ts** (루트) — `/dashboard` 인증 필수. 실패 시 `/?redirect=/dashboard` 리다이렉트.

## 연결 고리
- `auth.ts` → `middleware.ts` → `/dashboard` 접근 제어
- `page.tsx` → `POST /api/generate` → 429 시 UpgradeModal, 성공 시 proposal 상태 업데이트
- `api/generate` → `lib/rate-limit.ts` `checkAndIncrement` (KV 바인딩 `getRequestContext()`)
- `api/generate` → `lib/gemini.ts` `generateProposal` → `GeminiError` 처리
- `dashboard/page.tsx` → `lib/admin.ts` `isAdminEmail` → 관리자이면 `getRemainingCount` 스킵
- `dashboard/page.tsx` → `lib/rate-limit.ts` `getRemainingCount` (KV 불가 시 catch → remaining = 5 기본값)

## 등록 절차
**새 API 라우트 추가 시:**
1. `export const runtime = "edge"` 선언 필수
2. `auth()` 호출로 세션 확인
3. 레이트 리밋이 필요하면 `checkAndIncrement` 연동

**새 SEO 랜딩 페이지 추가 시:**
1. `app/for/{segment}/page.tsx` 생성
2. `app/sitemap.ts`에 URL 추가

## 절대 금지
- **`export const runtime = "edge"` 누락 금지** — api/generate, api/auth, dashboard/page 모두 필수. 누락 시 Cloudflare Workers 배포 실패.
- **sessionStorage 클라이언트 체크를 서버 강제로 오해 금지** — `page.tsx`의 `pk:guest_used`는 UI 숨김용, 서버는 KV 기반으로 독립 검사
- **dashboard/page.tsx에서 getRemainingCount 실패 시 throw 금지** — 반드시 `catch` 후 `remaining = 5` 기본값 할당
- **관리자 확인 전 getRemainingCount 호출 금지** — 관리자는 rate-limit 스킵

## 숨겨진 스펙
- dashboard displayName 우선순위: `session.user.name` → `session.user.email` → "User"
- `DashboardClient`의 `key={proposal.generatedAt}` — 새 생성마다 ProposalResult 강제 리마운트
- 홈 page.tsx sessionStorage 체크는 서버 미강제 (`@AX:WARN` 주석 명시)
- rate-limit KV get+put 비원자적 — 동시 요청 시 FREE_LIMIT 초과 가능 (Phase A 수용, `@AX:WARN` 주석)

@MISTAKES.md
