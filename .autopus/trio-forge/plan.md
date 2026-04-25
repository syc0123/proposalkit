# ProposalKit — 기획서 v1.0

> Phase 1 Claude + Gemini 토론 완료 / 2026-04-25

---

## What / Why

소상공인(배관공·인테리어·컨설턴트 등)은 매주 5~20개의 견적/제안서를 써야 하지만 글쓰기에 약하고 전문 도구(Proposify $29/월, PandaDoc $19/월)는 비싸고 복잡하다. ProposalKit은 "업종·작업내용·고객명 → 30초 → 전문 제안서"를 무료로 제공하고, 비즈니스 성장 후 Stripe Pro로 전환한다.

---

## 요구사항 (MoSCoW)

### Must (A1 MVP)

| ID | 요구사항 | 상세 |
|----|---------|------|
| R1 | 즉시 생성 (로그인 불필요) | 첫 방문 → 바로 3줄 입력 → 제안서 생성. 가치 증명 우선, 온보딩 나중 |
| R2 | Gemini 제안서 생성 | 업종·고객명·작업내용·예산 → Gemini 2.5 Flash → 전문 제안서 텍스트 |
| R3 | 인라인 편집 | 생성된 제안서를 페이지에서 직접 수정 (contenteditable 또는 textarea) |
| R4 | 원클릭 복사 | 클립보드 복사 버튼 |
| R5 | Google 소셜 로그인 | NextAuth + Google OAuth — 프로필 저장·히스토리·Rate limit 기준 |
| R6 | 사업 프로필 등록 | 업종·서비스명·단가·결제조건·약관문구·로고 업로드 |
| R7 | 로고/회사정보 자동 삽입 | 프로필 등록 완료 시 생성 제안서 상단에 자동 포함 |
| R8 | 히스토리 저장 | 로그인 유저 기준 최근 20건 KV 저장 |
| R9 | 무료 5회/월 제한 | user_id 기반 KV (IP가 아닌 계정 기준) |
| R10 | 반응형 UI (모바일 우선) | 소상공인은 스마트폰 접근 비율 높음 |

### Should (A2)

| ID | 요구사항 |
|----|---------|
| R11 | PDF 다운로드 |
| R12 | 템플릿 선택 (간단형/상세형/긴급형) |
| R13 | Stripe Pro 업그레이드 게이트 ($9.99/월, 무제한) |
| R14 | 제안서 상태 관리 (발송대기/전송완료/승인/거절) |

### Could (B)

| ID | 요구사항 |
|----|---------|
| R15 | 공유 링크 (고객 직접 전송) |
| R16 | 이메일 발송 연동 |
| R17 | 커버레터 생성 |

### Won't (Phase A)
- 다국어 지원
- 전자서명 (DocuSign 연동)
- 팀 계정

---

## 엣지 케이스

| 케이스 | 처리 |
|--------|------|
| 미로그인 첫 생성 | 생성 허용 (1회 free, IP 기반), 결과 보여준 후 로그인 유도 |
| 로그인 후 5회 초과 | Stripe Pro 업셀 모달, 로그인 안 하면 blocked |
| Gemini API 502/503 | "잠시 후 다시 시도" 토스트 + 재시도 버튼, 로딩 상태 표시 |
| Gemini 1,500회/일 소진 | 503 반환 + "오늘 사용량이 초과됐습니다. 내일 다시 시도해주세요" |
| 빈 프로필 생성 | 일반 제안서 fallback (업종 없이도 동작) |
| 매우 긴 입력 (500자+) | 클라이언트 500자 제한 + 카운터 |
| XSS | 사용자 입력은 Gemini 프롬프트에만 사용, 출력은 React 자동 이스케이프 |
| 로고 업로드 | 최대 2MB, PNG/JPG/SVG, Cloudflare Images 저장 |

---

## 온보딩 플로우 (가치 우선)

```
1. 랜딩 페이지 → "지금 바로 무료로 만들어보세요"
2. [미로그인] 고객명 + 작업내용 + 예산 입력 → 제안서 생성 (1회 허용)
3. 결과 화면: "이 제안서를 저장하고 로고를 넣으려면 로그인하세요"
4. Google 로그인 → 프로필 설정 → 이후 5회/월 무료
5. 5회 초과 → Stripe Pro 업셀
```

---

## 수익 모델

### Phase A: AdSense (블로그 + 랜딩만)
- **에디터/생성 페이지**: 광고 없음 (집중 UX 유지, B2B 신뢰도 보호)
- **블로그 페이지**: 소상공인 가이드 콘텐츠 + AdSense
- **랜딩 페이지**: 하단 배너만
- CPC 예상: B2B 카테고리 $4~8
- 목표: 월 $300 (일 방문자 361명 기준)
- AdSense 승인 조건: 블로그 10개 이상 → 승인 가능성 높음

### Phase B: Stripe Pro ($9.99/월)
- 무제한 생성
- PDF 다운로드
- 브랜드 로고 자동 삽입
- 제안서 버전 저장 (30건 이상)
- 템플릿 3종

---

## 기술 스택

| 레이어 | 선택 | 이유 |
|--------|------|------|
| Frontend | Next.js 15 (App Router) | App Router + Server Actions |
| Auth | NextAuth v5 (Google OAuth) | IP 대신 계정 기반 Rate limit |
| Hosting | Cloudflare Pages | 무료, 글로벌 CDN |
| AI | Gemini 2.5 Flash | 무료 1,500회/일 (초기), 유료 전환 계획 |
| Storage | Cloudflare KV | 프로필·히스토리·Rate limit |
| 이미지 | Cloudflare Images | 로고 업로드 ($5/월부터) |
| 결제 | Stripe | Phase B |

### Gemini API 한도 대응 계획
- 초기: 무료 1,500회/일
- 유저 300명/일 도달 시: 유료 Gemini API 전환 (Vertex AI)
- 비용 구조: Gemini Flash 입출력 합계 ~1K토큰/요청 × $0.075/1M = $0.000075/회 → 1,000회 = $0.075/일 → 월 $2.25 수준으로 무시 가능

---

## 파일/모듈 구조

```
app/
  page.tsx                    — 랜딩 + 즉시 생성 폼 (미로그인)
  dashboard/page.tsx          — 로그인 후 대시보드 (히스토리)
  profile/page.tsx            — 사업 프로필 설정
  blog/[slug]/page.tsx        — SEO 블로그 (AdSense)
  api/
    generate/route.ts         — Gemini 제안서 생성
    profile/route.ts          — KV 프로필 CRUD
    history/route.ts          — KV 히스토리 CRUD
  auth/[...nextauth]/route.ts — Google OAuth

components/
  ProposalForm.tsx             — 입력 폼 (고객명·작업내용·예산)
  ProposalResult.tsx           — 인라인 에디터 + 복사 버튼
  ProfileForm.tsx              — 프로필 설정 폼 (로고 업로드 포함)
  UpgradeModal.tsx             — Stripe Pro 업셀 모달
  LoginPrompt.tsx              — 로그인 유도 배너

lib/
  gemini.ts                   — Gemini API 클라이언트 + 프롬프트
  rate-limit.ts               — KV user_id 기반 5회/월 제한
  profile.ts                  — KV 프로필 CRUD 헬퍼
  history.ts                  — KV 히스토리 CRUD 헬퍼
```

---

## 구현 우선순위

### Sprint 1 (MVP — 1주)
- R1, R2, R3, R4: 즉시 생성 + 인라인 편집 + 복사
- R5: Google 로그인 (NextAuth)
- R9: Rate limit (5회/월, user_id 기반)
- R10: 반응형 UI

### Sprint 2 (프로필 + 브랜딩 — 1주)
- R6, R7, R8: 프로필 등록 + 로고 삽입 + 히스토리

### Sprint 3 (수익화 — 2주)
- R11~R14: PDF + Stripe + 상태 관리

---

## 기각된 대안 (재도입 금지)

| 대안 | 기각 이유 |
|------|-----------|
| IP 기반 Rate limit | VPN 우회 가능, 공유 IP UX 파괴, 계정 기반으로 대체 |
| 에디터 페이지 AdSense | B2B 신뢰도 손상, 집중 UX 방해 |
| 로그인 없는 프로필 저장 | 보안 취약, localStorage는 공용 기기에서 위험 |
| DB 없이 모든 데이터 KV | 히스토리 20건 이상 스케일링 불가 → KV 유지하되 Phase B에서 D1 고려 |
