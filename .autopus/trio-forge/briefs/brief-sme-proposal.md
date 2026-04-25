# 브리프 — AI 소상공인 고객 제안서 생성기

## 만들려는 것
소상공인(배관공·인테리어·컨설턴트 등)이 신규 고객에게 보낼 견적서/제안서를 "3줄 입력 → 30초 안에 AI 생성"해주는 웹 서비스.

## 왜 만드는가
- 소상공인은 글쓰기가 약하고, 전문적인 제안서 없이 영업하면 계약 성사율이 낮다
- Proposify·PandaDoc 같은 경쟁사는 유료(월 $19~29)이고 복잡한 템플릿 UI → 비개발자가 쓰기 어렵다
- ChatGPT로 직접 쓰려면 프롬프트를 알아야 한다 → 소상공인은 모른다
- Google AdSense로 수익화: 소상공인 타깃 B2B 광고주(QuickBooks, CRM, 사업자보험) CPC $4~8

## 핵심 타깃
- 비개발자 소상공인: 배관공, 인테리어 업자, 프리랜서 컨설턴트, 청소 업체, 조경 업체
- 영어권 글로벌 (미국, 영국, 캐나다, 호주 우선)
- AI 코딩 도구 미구독자 (Claude Code, Copilot 모름)

## 핵심 기능 (MVP)
1. **사업 프로필 저장** — 업종, 서비스 목록, 단가, 약관 (Cloudflare KV)
2. **제안서 생성** — 고객명 + 작업 내용 + 예산 입력 → Gemini가 전문 제안서 생성
3. **복사/다운로드** — 생성된 제안서 원클릭 복사, PDF 다운로드
4. **히스토리** — 과거 제안서 저장 → 재사용 (Lock-in 핵심)
5. **무료 5회/월** → Stripe Pro $9.99/월 (무제한 + 더 긴 제안서 + 커버레터)

## 차별점 (vs 경쟁사)
| | 우리 | Proposify | ChatGPT |
|--|--|--|--|
| 가격 | 무료 (5회) | $29/월 | 무료 (프롬프트 작성 필요) |
| 속도 | 30초 | 15분+ (템플릿 채우기) | 3분+ (프롬프트 입력) |
| 업종 맞춤 | 자동 | 템플릿 선택 | 수동 |
| 히스토리 | ✅ | ✅ (유료) | ❌ |
| 비개발자 난이도 | 쉬움 | 어려움 | 보통 |

## 수익 모델
- **AdSense**: B2B 카테고리 CPC $4~8, 일 500 방문자 기준 월 $1,498
- **Stripe Pro**: $9.99/월 — 취업 후 이탈 없음 (소상공인은 계속 영업), LTV 높음

## 기술 스택
- Frontend: Next.js 15 (App Router) + Tailwind CSS
- Hosting: Cloudflare Pages (무료)
- AI: Gemini 2.5 Flash (무료 1,500회/일)
- 저장: Cloudflare KV (프로필, 히스토리, Rate limit)
- 결제: Stripe (Phase B)
- DB: 없음 (Phase A — 유지보수 최소화)

## SEO 핵심 키워드
1. `business proposal template free` (100K~1M/월)
2. `contractor estimate template` (10K~100K/월)
3. `how to write a quote for client` (10K~100K/월)
4. `free proposal generator for small business` (10K~/월)
5. `ai proposal writer` (성장 키워드)

## AdSense 승인 전략
- 이력서·프리랜서 분야와 달리 소상공인 B2B는 YMYL 아님
- 가이드 블로그 5~10개 병행 ("how to write a plumbing estimate", etc.)
- 론칭 3개월 후 AdSense 신청

## 검증 근거
- Claude + Gemini 3라운드 토론 완료
- /최선 프로세스 3라운드 자문자답 완료
- 기각된 대안: ResumeFit(LTV 0), 프리랜서 제안서(CPC $1~2), AI 동화(CPC $1~3), 임대차 분석기(재방문 낮음)
