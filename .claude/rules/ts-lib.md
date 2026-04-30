---
globs: lib/**/*.ts
---

# lib/ TypeScript 규칙

## 에러 클래스
- 커스텀 에러는 `Error` 상속. 필드: `statusCode: number`, `isQuotaExceeded?: boolean`
- 호출자는 에러의 `statusCode`, `isQuotaExceeded`만 소비 — 외부에서 429 판정 로직 중복 구현 금지

## Gemini API
- 모델: `gemini-2.5-flash`, temperature: 0.7, maxOutputTokens: 2048
- 쿼터 초과 판정: response body를 stringify → lowercase → "quota" 또는 "rate" 포함 여부 확인
- buildPrompt 내 빈 값 fallback: industry → "General", yourName → "Not specified", timeline → "To be discussed"

## Rate Limit
- KV 키 형식: `rate:{userId}:{YYYY-MM}` (UTC 기준 달력월)
- TTL: 다음 달 1일 자정 UTC (`getSecondsUntilNextMonth()` 사용)
- `FREE_LIMIT = 5` 상수
- get+put 비원자적 패턴 — 동시 요청 시 FREE_LIMIT 초과 가능, Phase A 수용, `@AX:WARN` 주석 명시
- KV 미전달 시 `Map<string, {value, expiresAt}>` 인메모리 폴백 자동 적용

## 인증 헬퍼
- `getCurrentUserId(session)`: `user.id` → `user.sub` → `user.email` → `null` 우선순위 폴백 — 이 함수에만 위임
- `isAdminEmail(email)`: `ADMIN_EMAILS` env 변수를 쉼표로 분리, trim + toLowerCase 비교

## Export 스타일
- named export: `export async function 이름()` 또는 `export class 이름`
- default export 없음

## 주석
- 비즈니스 로직 위에 `// 설명` 한 줄. 복잡한 흐름은 `@AX:ANCHOR` / `@AX:NOTE` / `@AX:WARN` 태그 사용
