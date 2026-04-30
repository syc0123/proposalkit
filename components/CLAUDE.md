## 역할
UI 컴포넌트 계층. 제안서 입력 폼, 생성 결과 렌더링, 헤더/푸터 레이아웃, 인증 유도 배너, 레이트 리밋 모달을 담당한다. 상태와 API 호출은 page.tsx/DashboardClient.tsx에서 관리하며 컴포넌트는 단방향 prop을 받는다.

## 주요 파일
- **ProposalForm.tsx** — 6개 필드 폼 (industry/yourName/clientName/scope/budget/timeline). clientName, scope, budget 필수. scope MAX_CHARS=500 하드코딩. onSubmit 콜백으로 ProposalInput 반환.
- **ProposalResult.tsx** — ReactMarkdown 렌더링, 수정 모드(editedText), 클립보드 복사(Clipboard API → execCommand 폴백), PDF 버튼. showSignin=true 시 하단 로그인 배너 표시.
- **GoogleSignInButton.tsx** — `signIn("google", {callbackUrl})` 호출. callbackUrl 기본값="/dashboard".
- **LoginPrompt.tsx** — "5 free proposals/month" 배너. onDismiss 콜백. ProposalResult 배너와 별개.
- **UpgradeModal.tsx** — 레이트 리밋 도달 모달. 업그레이드 버튼 disabled (Stripe 미연동).
- **ThemeToggle.tsx** — localStorage("theme"), `document.documentElement.dataset.theme` 동적 변경. SSR 불가, useEffect 초기화.
- **SiteHeader.tsx** / **SiteFooter.tsx** — 공통 헤더/푸터.
- **ForLandingTemplate.tsx** — 직업별 랜딩페이지 템플릿 (서버 컴포넌트). 자체 푸터 포함 (SiteFooter와 별개).

## 연결 고리
- ProposalForm의 onSubmit → page.tsx handleGenerate → `/api/generate` → 429 시 UpgradeModal
- ProposalResult의 showSignin prop → page.tsx에서만 true (미인증 사용자 생성 후). 대시보드는 false.
- DashboardClient.tsx: `key={proposal.generatedAt}` → 새 생성 시 ProposalResult 리마운트
- ForLandingTemplate ← app/for/*/page.tsx에서 props 공급

## 등록 절차
**새 폼 필드 추가 시 순서:**
1. ProposalForm.tsx — state 선언, JSX 추가, onSubmit에 포함
2. types/proposal.ts — ProposalInput 인터페이스에 추가 (필수/선택 명시)
3. app/api/generate/route.ts — 요청 처리 로직 추가
4. lib/gemini.ts — buildPrompt에 필드 주입

## 절대 금지
- **ProposalForm MAX_CHARS=500 단독 변경 금지** — textarea 제어 로직, 에러 메시지 색상과 연동
- **ProposalResult 내부에서 직접 fetch 금지** — 레이트 리밋 추적과 캐싱이 page/dashboard 레벨에서 관리됨
- **localStorage "theme" 키 변경 금지** — ThemeToggle과 CSS 선택자 `[data-theme="dark"]` 동기화 필요
- **execCommand("copy") 폴백 제거 금지** — 구형 모바일 브라우저 지원용

## 숨겨진 스펙
- ProposalResult의 editedText는 저장되지 않음 — 편집은 UI에만 반영, 새 생성 시 초기화
- LoginPrompt와 ProposalResult 하단 배너는 별개 컴포넌트 — onDismiss 동작이 다름
- ForLandingTemplate은 자체 푸터 HTML 포함 — 랜딩과 메인 사이트 푸터 디자인 별도 관리

@MISTAKES.md
