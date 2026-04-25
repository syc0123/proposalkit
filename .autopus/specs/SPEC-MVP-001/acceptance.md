# SPEC-MVP-001 수락 기준

각 요구사항별로 happy path와 error case를 Given-When-Then 형식으로 정의한다. 모든 시나리오가 통과하면 Sprint 1을 "Done"으로 간주한다.

## R1 — 즉시 생성 (로그인 불필요)

### S1.1 (Happy): 미로그인 1회 free 생성
- **Given**: 사용자가 처음 방문하여 sessionStorage에 `pk:guest_used` 키가 없다
- **When**: 업종 "배관공", 고객명 "홍길동", 작업내용 "주방 싱크대 누수 수리", 예산 "20만원"을 입력하고 "생성" 버튼을 클릭한다
- **Then**:
  - 로그인 화면을 거치지 않는다
  - 30초 이내에 제안서 텍스트가 결과 영역에 표시된다
  - sessionStorage에 `pk:guest_used = "1"`이 저장된다

### S1.2 (Error): 미로그인 2회차 시도
- **Given**: sessionStorage에 `pk:guest_used = "1"`이 존재한다
- **When**: 사용자가 폼을 다시 채우고 "생성"을 클릭한다
- **Then**:
  - LoginPrompt 컴포넌트가 표시된다
  - "Google로 로그인" 버튼이 노출된다
  - `/api/generate` 호출이 발생하지 않는다

## R2 — Gemini 제안서 생성

### S2.1 (Happy): 정상 생성
- **Given**: 유효한 `GEMINI_API_KEY`와 폼 입력이 준비됐다
- **When**: `POST /api/generate`에 `{ industry: "인테리어", clientName: "ACME", scope: "사무실 30평 리모델링", budget: "1000만원" }`을 전송한다
- **Then**:
  - 200 응답과 `{ text: "...", generatedAt: ISO8601 }` JSON을 받는다
  - 응답 텍스트는 비어있지 않으며 고객명·작업내용을 포함한다

### S2.2 (Edge): 빈 업종 fallback
- **Given**: 업종 필드가 빈 문자열이다
- **When**: `POST /api/generate`로 나머지 3필드만 전송한다
- **Then**:
  - 200 응답을 받는다 (일반 fallback 프롬프트가 사용됨)

### S2.3 (Error): Gemini 502/503
- **Given**: Gemini API가 502를 반환하도록 모킹됐다
- **When**: `/api/generate`를 호출한다
- **Then**:
  - 503 응답과 `{ error: "잠시 후 다시 시도" }` 메시지를 받는다
  - 클라이언트는 토스트와 재시도 버튼을 표시한다

### S2.4 (Error): 일일 quota 초과
- **Given**: Gemini가 quota exceeded 에러를 반환한다
- **When**: `/api/generate`를 호출한다
- **Then**: 503 + `{ error: "오늘 사용량이 초과됐습니다" }`를 받는다

### S2.5 (Edge): 500자 초과 입력 차단
- **Given**: 작업내용 필드에 500자를 초과하는 텍스트가 입력된다
- **When**: 사용자가 추가 문자를 입력한다
- **Then**: 입력이 차단되고 카운터가 빨간색으로 한도를 표시한다

## R3 — 인라인 편집

### S3.1 (Happy): 텍스트 수정
- **Given**: 제안서가 생성되어 결과 영역에 표시된다
- **When**: 사용자가 결과 텍스트의 한 단락을 수정한다
- **Then**:
  - 수정사항이 즉시 화면에 반영된다
  - 이후 "복사" 버튼은 수정된 최신 텍스트를 복사한다
  - 서버에 저장 요청이 발생하지 않는다

## R4 — 원클릭 복사

### S4.1 (Happy): 클립보드 복사
- **Given**: 제안서가 표시되어 있고 brower가 `navigator.clipboard`를 지원한다
- **When**: 사용자가 "복사" 버튼을 클릭한다
- **Then**:
  - 클립보드에 현재 편집된 전체 텍스트가 저장된다
  - "복사되었습니다" 토스트가 2초간 표시된다

### S4.2 (Edge): clipboard API 미지원
- **Given**: 구형 브라우저에서 `navigator.clipboard`가 undefined이다
- **When**: 사용자가 "복사"를 클릭한다
- **Then**: `document.execCommand('copy')` fallback으로 복사가 성공한다

## R5 — Google 소셜 로그인

### S5.1 (Happy): OAuth 성공
- **Given**: `AUTH_GOOGLE_ID`·`AUTH_GOOGLE_SECRET`·`AUTH_SECRET`이 설정됐다
- **When**: 사용자가 "Google로 로그인" 클릭 → Google 계정 선택 → 동의를 완료한다
- **Then**:
  - NextAuth 세션 쿠키가 발급된다
  - `/dashboard`로 리다이렉트된다
  - `auth()` 호출 시 user 이메일이 반환된다

### S5.2 (Error): 환경 변수 누락
- **Given**: `AUTH_SECRET`이 설정되지 않았다
- **When**: 빌드 또는 첫 요청이 발생한다
- **Then**: 명확한 에러 메시지("AUTH_SECRET is required")가 로그·콘솔에 출력된다

## R9 — 무료 5회/월 제한

### S9.1 (Happy): 5회 미만 정상 통과
- **Given**: 로그인된 user_id의 KV 키 `rate:user@example.com:2026-04` 카운트가 3이다
- **When**: `/api/generate`를 호출한다
- **Then**:
  - 200 응답을 받는다
  - KV 카운트가 4로 증가한다

### S9.2 (Error): 5회 초과 차단
- **Given**: KV 카운트가 5이다
- **When**: `/api/generate`를 호출한다
- **Then**:
  - 429 응답 + `{ error: "이번 달 무료 한도(5회)를 모두 사용했습니다" }`를 받는다
  - KV 카운트는 5로 유지된다 (증가하지 않음)
  - 클라이언트가 UpgradeModal을 표시한다

### S9.3 (Edge): 월 경계 리셋
- **Given**: 4월에 카운트 5에 도달한 사용자
- **When**: 5월 1일 00:00 이후 첫 요청
- **Then**: 새 키 `rate:{userId}:2026-05`로 카운트 1부터 시작 (이전 키는 TTL로 자동 만료)

### S9.4 (Constraint): IP 키 미사용 검증
- **Given**: Rate limit 구현 코드를 검사한다
- **When**: `lib/rate-limit.ts` 키 생성 로직을 확인한다
- **Then**: 키는 `rate:{userId}:{YYYY-MM}` 패턴이며 IP 주소가 키에 포함되지 않는다

## R10 — 반응형 UI

### S10.1 (Happy): 모바일 단일 컬럼
- **Given**: 뷰포트 폭 375px (iPhone SE)
- **When**: 랜딩 페이지를 열고 폼·결과 영역을 확인한다
- **Then**:
  - 폼과 결과가 세로 단일 컬럼으로 배치된다
  - 모든 버튼이 44x44px 이상의 터치 타겟을 만족한다
  - 가로 스크롤이 발생하지 않는다

### S10.2 (Happy): 데스크톱 2컬럼
- **Given**: 뷰포트 폭 1280px
- **When**: 랜딩 페이지를 연다
- **Then**: 좌측 폼·우측 결과 2컬럼 레이아웃으로 전환된다

### S10.3 (Edge): 태블릿 경계
- **Given**: 뷰포트 폭 640px
- **When**: 페이지를 연다
- **Then**: 데스크톱 2컬럼 레이아웃이 적용된다 (Tailwind sm: 브레이크)

## 빌드 및 배포 검증

### S-Build.1: 로컬 빌드
- **Given**: `.env.local`에 모든 필수 환경 변수가 설정됐다
- **When**: `npm run build`를 실행한다
- **Then**: 에러 없이 빌드가 완료된다

### S-Build.2: Cloudflare Pages 호환
- **Given**: 빌드 산출물
- **When**: Cloudflare Pages에 배포한다
- **Then**: 배포가 성공하며 edge runtime 경고/에러가 없다 (또는 `@cloudflare/next-on-pages` 어댑터 정상 동작)

## "Done" 정의

- [ ] 모든 시나리오 (S1.1 ~ S10.3, S-Build.*) 통과
- [ ] 모든 파일 300줄 이하
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
- [ ] 수동 회귀: 모바일·데스크톱에서 미로그인 → 로그인 → 5회 소진까지 전체 흐름 검증
