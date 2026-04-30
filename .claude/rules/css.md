---
globs: **/*.css
---

# CSS 스타일 규칙

## Tailwind CSS 4
- `@tailwindcss/postcss` v4 사용. 유틸리티 클래스 우선.

## CSS 변수
- 컬러 변수: `--ink-100`, `--ink-200` 등 `var(--ink-*)` 형식으로 참조
- 컴포넌트 인라인 컬러가 필요하면 `style={{ color: "#2563EB" }}` 사용

## 클래스 네이밍
- BEM 미사용. 단순 `kebab-case` (`result-text`, `field-label`, `form-card`)
- Tailwind와 커스텀 클래스 혼용 가능

## globals.css 범위
- 기본 reset + CSS 변수 정의만 — 컴포넌트 전용 스타일은 className 인라인으로
