# SPEC-MVP-001: ProposalKit Sprint 1 — 즉시 생성·인라인 편집·로그인·Rate limit·반응형

**Status**: implemented
**Created**: 2026-04-25
**Domain**: MVP
**Sprint**: 1
**Scope**: R1, R2, R3, R4, R5, R9, R10

## 목적

소상공인(배관공·인테리어·컨설턴트)이 신규 고객용 견적서/제안서를 "3줄 입력 → 30초 안에 AI 생성"할 수 있는 웹 서비스의 MVP를 출시한다. Sprint 1은 **가치 증명(즉시 생성) → 온보딩(로그인) → Retention(Rate limit)**의 핵심 루프를 완성하는 데 초점을 둔다.

Proposify($29/월) 대비 무료·30초 생성·업종 자동 맞춤이라는 차별점을 검증할 수 있는 최소 기능 집합을 제공한다.

## 범위

### In-Scope (Sprint 1)
- R1, R2, R3, R4, R5, R9, R10

### Out-of-Scope (Sprint 2 이후)
- R6: 사업 프로필 (회사명·연락처·로고 저장)
- R7: 로고 자동 삽입
- R8: 제안서 히스토리 저장 (DB)
- R11: PDF 내보내기
- R13: Stripe Pro 구독 ($9.99/월)
- R14: 전역 상태 관리 (Zustand 등)

## 요구사항 (EARS)

### R1 — 즉시 생성 (로그인 불필요) [P0]

- WHEN 사용자가 처음 랜딩 페이지에 진입하고 업종·고객명·작업내용·예산을 입력한 뒤 "생성" 버튼을 클릭, THE SYSTEM SHALL 로그인 없이 1회 제안서를 생성하여 결과 화면에 표시한다.
- WHEN 미로그인 사용자가 1회 생성을 완료한 뒤 추가 생성을 시도, THE SYSTEM SHALL 로그인 유도 모달을 표시하고 Google 로그인 버튼을 노출한다.
- WHILE 미로그인 1회 free 권한이 사용 중, THE SYSTEM SHALL 브라우저 쿠키 또는 sessionStorage 기반으로 1회 사용 여부를 추적한다.

### R2 — Gemini 제안서 생성 [P0]

- WHEN 클라이언트가 `/api/generate`에 업종·고객명·작업내용·예산 페이로드를 POST, THE SYSTEM SHALL Gemini 2.5 Flash를 호출하여 한국어 또는 영어 전문 제안서 텍스트를 응답한다.
- WHERE 업종 필드가 비어있는 경우, THE SYSTEM SHALL 일반 제안서 fallback 프롬프트로 동작한다.
- WHEN Gemini API가 502/503을 반환, THE SYSTEM SHALL 클라이언트에 503 응답과 "잠시 후 다시 시도" 메시지를 전달한다.
- WHEN Gemini 일일 quota(1,500회)가 소진된 상태, THE SYSTEM SHALL 503 + "오늘 사용량이 초과됐습니다" 응답을 반환한다.
- WHERE 사용자 입력이 500자를 초과, THE SYSTEM SHALL 클라이언트단에서 입력을 차단하고 카운터로 한도를 안내한다.

### R3 — 인라인 편집 [P0]

- WHEN 제안서가 생성되어 결과 화면에 렌더링, THE SYSTEM SHALL `<textarea>` 또는 `contenteditable` 영역으로 표시하여 사용자가 직접 수정 가능하게 한다.
- WHILE 사용자가 텍스트를 수정 중, THE SYSTEM SHALL 변경 내용을 클라이언트 상태에 즉시 반영한다 (서버 저장 없음).

### R4 — 원클릭 복사 [P0]

- WHEN 사용자가 "복사" 버튼을 클릭, THE SYSTEM SHALL 현재 편집된 제안서 전체 텍스트를 `navigator.clipboard.writeText`로 클립보드에 복사하고 토스트 "복사되었습니다"를 표시한다.
- WHERE `navigator.clipboard` API가 미지원 환경, THE SYSTEM SHALL `document.execCommand('copy')` fallback을 사용한다.

### R5 — Google 소셜 로그인 [P0]

- WHEN 사용자가 "Google로 로그인" 버튼을 클릭, THE SYSTEM SHALL NextAuth v5의 Google Provider를 통해 OAuth 인증 플로우를 시작한다.
- WHEN OAuth 인증이 성공, THE SYSTEM SHALL 세션 쿠키를 발급하고 `/dashboard`로 리다이렉트한다.
- WHILE 사용자 세션이 유효, THE SYSTEM SHALL `auth()` 헬퍼로 user_id(이메일 기반)에 접근하여 Rate limit 키로 사용한다.
- WHERE 환경 변수 `AUTH_GOOGLE_ID`·`AUTH_GOOGLE_SECRET`·`AUTH_SECRET`이 누락, THE SYSTEM SHALL 빌드 시점 또는 첫 요청 시 명확한 에러 메시지를 출력한다.

### R9 — 무료 5회/월 제한 [P0]

- WHEN 로그인된 사용자가 `/api/generate`를 호출, THE SYSTEM SHALL Cloudflare KV에서 키 `rate:{user_id}:{YYYY-MM}` 값을 읽어 현재 카운트를 확인한다.
- WHERE 카운트가 5 이상, THE SYSTEM SHALL 429 응답과 "이번 달 무료 한도(5회)를 모두 사용했습니다" 메시지를 반환하고 클라이언트는 업셀 모달을 표시한다.
- WHEN 카운트가 5 미만이고 생성이 성공, THE SYSTEM SHALL 카운트를 +1 증가시키고 KV에 저장한다 (TTL: 다음 달 1일 자정까지).
- WHILE Rate limit 키가 user_id 기반, THE SYSTEM SHALL IP 주소를 키 구성에 포함하지 않는다 (기각된 대안).

### R10 — 반응형 UI (모바일 우선) [P0]

- WHERE 뷰포트 폭이 640px 미만, THE SYSTEM SHALL 모바일 단일 컬럼 레이아웃으로 폼·결과를 세로 배치한다.
- WHERE 뷰포트 폭이 640px 이상, THE SYSTEM SHALL 데스크톱 2컬럼 레이아웃(폼 좌측·결과 우측)으로 전환한다.
- WHILE 모든 인터랙티브 요소(버튼·입력 필드)는 터치 타겟 최소 44x44px를 만족한다.

## 생성 파일 상세

```
app/
  page.tsx                       — 랜딩 + 즉시 생성 폼 (R1, R10)
  dashboard/page.tsx             — 로그인 후 대시보드 (R5)
  api/
    generate/route.ts            — Gemini 호출 + Rate limit (R2, R9)
    auth/[...nextauth]/route.ts  — NextAuth handler (R5)
  layout.tsx                     — 글로벌 레이아웃 (수정)
  globals.css                    — Tailwind 4 (수정)

auth.ts                          — NextAuth v5 config (Google Provider)
middleware.ts                    — 보호 라우트 (옵션, /dashboard)

components/
  ProposalForm.tsx               — 4필드 입력 폼 + 500자 카운터 (R1, R2)
  ProposalResult.tsx             — 인라인 에디터 + 복사 버튼 (R3, R4)
  LoginPrompt.tsx                — 1회 free 후 로그인 유도 배너 (R1, R5)
  UpgradeModal.tsx               — 5회 초과 업셀 모달 (R9)
  GoogleSignInButton.tsx         — OAuth 트리거 버튼 (R5)

lib/
  gemini.ts                      — Gemini 2.5 Flash 클라이언트 + 프롬프트 빌더 (R2)
  rate-limit.ts                  — KV 기반 5회/월 카운터 (R9)
  auth-helpers.ts                — 세션·user_id 추출 헬퍼 (R5)

types/
  proposal.ts                    — ProposalInput, ProposalOutput 타입

.env.example                     — 환경 변수 템플릿
wrangler.toml (or pages config)  — Cloudflare KV 바인딩
```

## 제약 (Constraints)

- C1: NextAuth v5 (`next-auth@beta` 또는 stable v5) 사용 — v4 금지
- C2: Gemini 2.5 Flash만 사용 — Pro/다른 모델 금지 (비용 통제)
- C3: Rate limit 키는 반드시 user_id 기반, IP 미사용 (브레인스톰 기각 대안)
- C4: 미로그인 1회 free는 클라이언트 sessionStorage/쿠키로만 추적 (Phase A에 DB 없음)
- C5: 모든 파일은 300줄 이하 (`file-size-limit` 규칙)
- C6: AdSense·외부 광고 스크립트 에디터 페이지 삽입 금지 (B2B 신뢰도)
- C7: Cloudflare Pages 배포 — Edge runtime 호환 필요 (NextAuth v5는 edge 호환)

## 엣지 케이스

| 케이스 | 처리 방식 |
|--------|-----------|
| 미로그인 1회 free 후 재시도 | LoginPrompt 표시, 생성 차단 |
| 로그인 후 5회 초과 | 429 응답 + UpgradeModal 표시 |
| Gemini 502/503 | 토스트 "잠시 후 다시 시도" + 재시도 버튼 |
| Gemini 일일 quota 초과 | 503 + "오늘 사용량이 초과됐습니다" |
| 빈 업종 입력 | 일반 fallback 프롬프트로 정상 생성 |
| 500자 초과 입력 | 클라이언트 입력 차단 + 카운터 표시 |
| XSS 페이로드 입력 | Gemini 프롬프트로만 전달, React 자동 이스케이프로 출력 안전 |
| 동일 user_id 동시 요청 | KV read-modify-write race 가능 — 5회 제한이 약간 새는 것 허용 (Phase A) |
| KV 바인딩 누락 | 503 + 서버 로그 경고 |

## 성공 지표 (참고)

- 미로그인 → 첫 제안서 생성 완료율 > 50%
- 첫 제안서 생성 → Google 로그인 전환율 > 20%
- 5회 모두 소진한 사용자 비율 (월간) — 측정 (Sprint 3 업셀 기반 데이터)

## 참조

- 브레인스톰: `.autopus/brainstorms/trio-forge/` (브리프·PRD)
- 차기 SPEC: SPEC-MVP-002 (Sprint 2 — R6, R7, R8 예정)


## 구현 완료

- 구현 커밋: d974fc2
- 구현일: 2026-04-25
- 테스트: 35/35 pass
- 보안 감사: PASS (S-01, S-05, S-06 해결)
- 미완료(Sprint 2): S-02 게스트 서버 rate limit, S-03 프롬프트 인젝션 펜싱, S-08 CSRF 체크
