---
globs: components/**/*.tsx
---

# React 컴포넌트 규칙

## 파일 구조
- 파일 최상단에 `"use client";` 선언 필수 (모든 컴포넌트는 클라이언트 컴포넌트)
- Props 인터페이스는 컴포넌트 정의 직전에 선언: `interface {ComponentName}Props { ... }`
- named export 사용: `export function ComponentName(...)`

## 네이밍
- 이벤트 핸들러: `handle{EventName}` 패턴 (`handleSubmit`, `handleCopy`, `handleGenerate`)
- 콜백 props: `on{EventName}` 패턴 (`onSubmit`, `onClose`, `onDismiss`)
- 불린 상태: `is{State}`, `show{Element}` 패턴 (`isLoading`, `showUpgrade`)

## 상태 관리
- 컴포넌트는 받은 props를 수정하지 않음 — 로컬 상태로 복사 후 관리
- 토스트/피드백 상태: `"idle" | "copied" | "error"` 3상태 패턴, `setTimeout(..., 2000)`으로 자동 초기화
- 상태 초기화가 window/document 접근을 필요로 하면 `useEffect`로 지연 (SSR hydration mismatch 방지)

## 클립보드 복사
- `navigator.clipboard.writeText` → `document.execCommand("copy")` 폴백 순서 유지
- 폴백 제거 금지 (구형 모바일 브라우저 지원)

## 스타일링
- 인라인 컬러: `#2563EB` (primary blue), `#DC2626` (error red), CSS 변수 `var(--ink-*)`
- 아이콘: SVG 인라인 삽입 (외부 아이콘 라이브러리 없음)
- 액션 버튼과 아이콘 버튼에 `aria-label` 필수

## 마크다운 렌더링
- `react-markdown` 사용, 커스텀 className 없음
- wrapper `div`에만 className 부여 (`ReactMarkdown` 컴포넌트 직접 className 전달 금지 — 타입 오류)
