# app 오답노트

<!-- 형식:
### YYYY-MM-DD — 실패 요약 제목
**증상**: 어떤 오동작이 나타났는지
**원인**: 왜 그랬는지
**해결**: 어떻게 고쳤는지
**교훈**: 다음에 조심할 것 (한 줄)
-->

### 2026-04-30 — Google 로그인 "Server error" (error=Configuration)

**증상**: "Sign in with Google" 클릭 시 `/?error=Configuration` 또는 `/api/auth/error?error=Configuration`으로 리다이렉트됨.

**원인**: 세 가지 복합 버그였음.
1. `@cloudflare/next-on-pages`가 plain `Request`(nextUrl 없음)를 전달하는데 NextAuth v5가 `request.nextUrl.href`에 접근 → `TypeError: Cannot destructure property 'href' of 'e.nextUrl'`
2. `app/api/auth/[...nextauth]/route.ts`에서 환경변수를 모듈 초기화 시점에 읽어서 CF env가 주입되기 전에 빈 문자열이 사용됨 (이전 수정에서 해결)
3. 프론트엔드에서 `<a href="/api/auth/signin/google?callbackUrl=/">` (GET 방식)으로 OAuth 시작 → NextAuth v5는 GET `/api/auth/signin/{provider}`를 지원하지 않음 (`render.signin(providerId)` 에서 `UnknownAction` 던짐)

**해결**:
1. `toNextRequest()` 헬퍼로 plain `Request` → `NextRequest` 래핑 후 핸들러에 전달
2. `getCloudflareEnv()` 함수로 요청 시점에 `getRequestContext().env` 읽기
3. `<a href>` → `<button onClick={() => signIn("google", { callbackUrl })}>`로 교체 (next-auth/react `signIn()`은 CSRF fetch → POST 흐름을 자동 처리)

**교훈**: NextAuth v5에서 OAuth는 반드시 `signIn()` 클라이언트 함수를 통해 POST로 시작해야 함 — GET으로 provider 직접 호출은 지원 안 됨.

### 2026-04-30 — RESEND_API_KEY가 edge runtime에서 undefined

**증상**: 피드백 전송 시 Resend 이메일이 도착하지 않음. Resend 대시보드에 "No sent emails yet".

**원인**: `process.env.RESEND_API_KEY`를 사용했는데 Cloudflare edge runtime에서는 `process.env`가 동작하지 않음. `emailStatus: "no_key"` 응답으로 확인.

**해결**: KV 바인딩과 동일하게 `getRequestContext().env["RESEND_API_KEY"]`로 접근. 로컬 dev는 catch 블록에서 `process.env` 폴백 유지.

**교훈**: Cloudflare edge runtime에서 환경변수는 반드시 `getRequestContext().env`로 접근해야 함 — `process.env`는 동작하지 않음.
