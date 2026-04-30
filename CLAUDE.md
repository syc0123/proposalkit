# ProposalKit — AI 기반 프리랜서 제안서 생성 SaaS

Next.js 15 + Cloudflare Workers + Gemini API. 미인증 사용자 1회, 인증 사용자 월 5회 무료 제안서 생성.

---

## 디렉토리별 CLAUDE.md

| 디렉토리 | 내용 |
|---------|------|
| [components/](components/CLAUDE.md) | UI 컴포넌트 (폼, 결과, 헤더/푸터, 모달) |
| [lib/](lib/CLAUDE.md) | 비즈니스 로직 (인증, Gemini API, 레이트 리미팅, 관리자) |
| [app/](app/CLAUDE.md) | 페이지 라우팅, API 엔드포인트, 대시보드 |
| [__tests__/](__tests__/CLAUDE.md) | Vitest 테스트 스위트 (컴포넌트 + lib) |

---

## 공용 환경 변수

모두 필수. 누락 시 런타임 에러 또는 silent failure 발생.

| 변수 | 용도 |
|------|------|
| `AUTH_SECRET` | NextAuth 세션 서명 (32바이트 base64) |
| `AUTH_GOOGLE_ID` | Google OAuth 클라이언트 ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth 클라이언트 시크릿 |
| `GEMINI_API_KEY` | Gemini 2.5 Flash API 키 |
| `AUTH_URL` | 배포 시 NextAuth 호스트 검증용 |
| `ADMIN_EMAILS` | 관리자 이메일 쉼표 구분 (선택사항) |

## 공용 아키텍처 제약

- **모든 API 라우트와 대시보드 페이지는 `export const runtime = "edge"`** — Cloudflare Pages 호환 필수
- **KV 바인딩** — `wrangler.toml`의 `RATE_LIMIT_KV` 설정. 로컬 미설정 시 인메모리 폴백으로 동작
- **NextAuth 세션 사용자 ID 우선순위** — `user.id` → `user.sub` → `user.email` 순 (`lib/auth-helpers.ts`의 `getCurrentUserId` 위임)

## 개발 커맨드

```bash
npm run dev       # 로컬 개발 서버
npm test          # Vitest 단위 테스트
npm run build     # Next.js 빌드
npx wrangler pages dev .vercel/output/static  # Cloudflare Pages 로컬 에뮬레이션
```
