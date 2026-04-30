---
globs: app/**/*.tsx, app/api/**/*.ts, middleware.ts, auth.ts
---

# Next.js App Router 페이지 & API 규칙

## Edge Runtime
- `/api/**` 라우트와 `/dashboard` 페이지: `export const runtime = "edge";` 필수
- 누락 시 Cloudflare Pages 배포 실패

## API 라우트 패턴
- 입력 유효성은 route handler 첫 단계: type guard 함수 `validateInput(body: unknown): body is T` 사용
- 에러 응답 상태 코드: 400 (잘못된 요청), 429 (레이트 리밋), 500 (서버 설정 오류), 503 (외부 서비스 오류)
- `NextResponse.json({ ... }, { status: code })` 반환 — 절대 throw하지 않음
- 인증 확인 → 관리자 여부 → 레이트 리밋 순서 유지 (관리자는 rate-limit 스킵)

## KV 바인딩 (Cloudflare)
- edge runtime에서만: `getRequestContext().env["RATE_LIMIT_KV"]`
- 로컬 dev는 try-catch 후 `undefined` (in-memory fallback 자동 적용)

## 세션 & 인증
- `const session = await auth();` 후 `getCurrentUserId(session)` 호출 — 직접 session.user.id 접근 금지
- NextAuth JWT: `token.sub` = Google sub ID, session 콜백에서 `session.user.id`에 복사

## 서버/클라이언트 컴포넌트
- `"use client";` 없음 = 서버 컴포넌트 (기본값)
- 인터랙션이 필요한 경우만 클라이언트 컴포넌트 (`DashboardClient.tsx` 패턴)
- 대시보드: 서버 컴포넌트에서 인증/데이터 로드 → 클라이언트 컴포넌트에 위임

## 환경변수
- 미설정 허용: `process.env.KEY ?? ""` 패턴 (런타임 중 검증)
- `AUTH_SECRET` 미설정 시 빌드 단계 throw 금지 (정적 빌드 중단 방지)

## @AX 주석 태그
- `// @AX:ANCHOR` — 핵심 진입점
- `// @AX:NOTE` — 구현 세부 설명
- `// @AX:WARN` — 위험 요소 (동시성 문제, 클라이언트 미강제 등)
- `// [AUTO]` — 자동화된 로직, 수동 수정 금지
