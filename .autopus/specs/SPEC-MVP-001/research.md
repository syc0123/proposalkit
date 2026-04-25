# SPEC-MVP-001 리서치

## 기존 코드 분석

### 현재 상태 (코드베이스 스캔)

- **루트**: `D:/dev/proposalkit/`
- **package.json** (D:/dev/proposalkit/package.json:1):
  - `next@16.2.4`, `react@19.2.4`, `react-dom@19.2.4`
  - Tailwind CSS v4 (`@tailwindcss/postcss`, `tailwindcss@^4`)
  - TypeScript 5, ESLint 9
  - **NextAuth, Gemini SDK, Cloudflare Workers types 미설치**
- **app/page.tsx** (D:/dev/proposalkit/app/page.tsx:1-65): create-next-app 기본 스캐폴딩 — Vercel/Next.js 로고와 anchor 링크만 존재. 전면 교체 필요.
- **app/layout.tsx**, **app/globals.css**: Tailwind v4 기본 스캐폴딩 — 메타 정보 정도만 수정 필요.
- **public/**: 기본 SVG 자산 (next.svg, vercel.svg)
- **next.config.ts**: 비어있는 기본 설정
- **tsconfig.json**: Next.js 표준 (paths alias 없음)

### 재사용 가능 자산

거의 없음 — 스캐폴딩 단계라 모든 비즈니스 로직은 신규 작성. layout/globals.css는 유지하되 메타 텍스트만 수정.

## 외부 의존성 리서치

### 1. NextAuth v5 + Cloudflare Pages

**핵심 결정 포인트**:
- NextAuth v5는 `next-auth@5.0.0-beta.x` 라인으로 배포 중 (v4와 API 차이 큼)
- v5는 Edge runtime 호환 — Cloudflare Pages와 적합
- 패턴: `auth.ts`에서 `NextAuth({ providers })` 호출 → `auth`, `signIn`, `signOut`, `handlers` 익스포트
- App Router에서는 `app/api/auth/[...nextauth]/route.ts`에 `export { GET, POST } from "@/auth"` 또는 `handlers.GET/handlers.POST` 재익스포트

**권장 설정**:
```ts
// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },  // edge runtime 호환
})
```

**환경 변수 (NextAuth v5 표준)**:
- `AUTH_SECRET` (v4의 `NEXTAUTH_SECRET` 대체)
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` (v4의 `GOOGLE_CLIENT_*` 대체)
- `AUTH_URL` (옵션, production에서 권장)

**Cloudflare Pages 주의점**:
- JWT 세션 전략 필수 (database 세션은 edge에서 어댑터 제약)
- `cookies()` API는 edge에서 정상 동작 — App Router 표준
- middleware.ts에서 `auth` 헬퍼 사용 가능

### 2. Gemini 2.5 Flash API

**SDK**: `@google/generative-ai` (공식 Node SDK, edge runtime 호환은 fetch 기반 직접 호출이 더 안전)

**모델 식별자**: `gemini-2.5-flash` (또는 stable 별칭 `gemini-2.5-flash-latest`)

**Edge runtime 호환 패턴**: 공식 SDK 대신 `fetch`로 REST 호출하는 게 Cloudflare Pages에 가장 안전:

```ts
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  }
)
```

**Quota / Pricing**:
- Free tier: 1,500 RPD (requests per day), 15 RPM
- 응답 코드 패턴: 502/503은 일시 다운, 429는 quota 초과 가능 (메시지 파싱 필요)

**프롬프트 설계** (R2 fallback 포함):
```
system: "당신은 소상공인의 견적서/제안서 작성을 돕는 전문가입니다.
업종 맥락에 맞는 전문 용어를 사용하되 고객이 이해하기 쉽게 작성하세요."

user template:
  업종: {industry || "일반"}
  고객명: {clientName}
  작업 내용: {scope}
  예산: {budget}

  위 정보로 1) 인사 2) 작업 범위 3) 일정/단계 4) 견적 근거 5) 마무리
  순서의 전문 제안서를 마크다운으로 작성하세요.
```

### 3. Cloudflare KV (Rate limiting)

**바인딩 패턴 (Cloudflare Pages)**:

`wrangler.toml` (또는 Pages 대시보드 KV namespace 바인딩):
```toml
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "..."
```

**App Router에서 접근**:
```ts
// Pages는 globalThis.process.env가 아닌 context.env로 KV 접근
import { getRequestContext } from "@cloudflare/next-on-pages"

export const runtime = "edge"

export async function POST(req: Request) {
  const { env } = getRequestContext()
  const kv = env.RATE_LIMIT_KV
  ...
}
```

**Rate limit 알고리즘**:
- 키: `rate:{userId}:{YYYY-MM}`
- 값: 정수 카운트 (string으로 저장, parseInt)
- TTL: 다음 달 1일 00:00 UTC까지 (계산: `Date.UTC(year, month+1, 1)` - now)
- Race condition: read → check → put 사이 동시성 — Phase A는 약간 새는 것 허용 (KV는 atomic increment 미지원, Durable Objects가 필요하나 Sprint 1 out-of-scope)

**로컬 개발**: `wrangler pages dev` 또는 `lib/rate-limit.ts`에 in-memory Map fallback 추가

### 4. Next.js 15 App Router 패턴

- **Server Components 기본**: 페이지 컴포넌트는 RSC, 폼 인터랙션 부분만 `"use client"`
- **Server Actions vs Route Handlers**: `/api/generate`는 외부 호출 가능성·캐시 분리·디버깅 용이성 때문에 Route Handler 사용 권장
- **Edge runtime 선언**: route handler에 `export const runtime = "edge"` (Cloudflare Pages 필수)
- **Tailwind v4**: `@import "tailwindcss"` 단일 import, `@theme` 디렉티브로 토큰 정의 — `tailwind.config.ts` 불필요

## 설계 결정

### D1: Rate limit 키는 user_id only (IP 미사용)

**근거**: 브레인스톰 기각 대안에 명시 — VPN 우회, 공유 IP UX 손상 위험. user_id만으로 단순화. (R9 C3 제약)

**대안 검토**:
- IP+user_id 조합: 공유 사무실 환경(소상공인 카페 작업) 등에서 정상 사용자 차단 위험 → 기각
- IP만: 미로그인 사용자 1회 free에는 IP 사용 가능하나 본 SPEC에서는 클라이언트 sessionStorage로 대체 → C4

### D2: 미로그인 1회 free는 sessionStorage

**근거**: Phase A에 DB 없음. 서버 측 게스트 추적 시 IP가 유일 식별자가 되어 D1과 충돌. 클라이언트 sessionStorage는 우회 가능하지만 "가치 증명 1회"라는 마케팅 목적에는 충분.

**Trade-off**: 사용자가 incognito/storage clear로 무한 free 가능 — 허용. 핵심 KPI는 "첫 생성 → 로그인 전환율"이며, 우회 사용자도 최소한 가치를 경험하면 입소문 효과는 유지됨.

### D3: NextAuth v5 (beta) 채택 vs v4 안정판

**근거**: v4는 Cloudflare Pages edge runtime 호환성이 떨어짐 (database 어댑터·Node API 의존). v5는 처음부터 edge first 설계. Beta 리스크는 버전 핀고정으로 완화.

**확신도**: medium — v5가 stable 진입 시점에 따라 마이너 변경 가능

### D4: Gemini SDK 미사용, fetch 직접 호출

**근거**: `@google/generative-ai` SDK는 Node 환경 가정 코드가 일부 포함 — Cloudflare Workers/Edge에서 간헐 이슈 보고. fetch 기반 REST 호출은 의존성 ↓, edge 호환 ↑, 디버깅 ↑.

**Trade-off**: SDK가 제공하는 streaming/safety settings 추상화 포기. Sprint 1에서는 단순 generateContent 한 번이면 충분.

### D5: KV race condition 허용

**근거**: KV는 atomic increment 미지원. Durable Objects나 D1(SQLite) 도입은 Sprint 1 범위 초과. 동시 요청 시 5회 제한이 6~7회까지 새는 것을 허용.

**확신도**: high — 사용자가 의도적으로 동시 요청 5+개를 보낼 가능성 낮음. Pro 업셀 전환 손실은 무시 가능.

### D6: Edge runtime 강제

**근거**: Cloudflare Pages 배포 가정. Node runtime 사용 시 빌드 실패 또는 어댑터 의존. 모든 route handler에 `export const runtime = "edge"` 명시.

**예외**: NextAuth handler는 v5가 자동 edge 호환 — 별도 선언 불필요할 수 있음 (v5 docs 확인 필요)

## 미해결 질문 (Sprint 1 종료 전 결정 필요)

- Q1: Cloudflare Pages 배포 방식 — 표준 Pages 빌드 vs `@cloudflare/next-on-pages` 어댑터? → T1에서 결정
- Q2: 모바일 폼에서 결과 영역으로 자동 스크롤 — UX 개선? → T9 구현 시 검토
- Q3: 미로그인 1회 free 결과 저장은 의도적으로 안 함 (로그인 유도) — 그러나 사용자가 새로고침 시 결과 사라짐 — 알림 표시 필요? → T9에서 결정

## 참조 파일 (구현 시 우선 확인)

- `D:/dev/proposalkit/package.json` — 의존성 추가 위치
- `D:/dev/proposalkit/app/page.tsx` — 전면 교체 대상
- `D:/dev/proposalkit/app/layout.tsx` — 메타 정보 수정
- `D:/dev/proposalkit/next.config.ts` — Cloudflare Pages 옵션 추가 가능성
- `D:/dev/proposalkit/.gitignore` — `.env.local`, `.dev.vars` 추가 확인
