# SPEC-MVP-001 — Agent Assignment Plan (Sprint 1)

> Formal executor subagent dispatch plan for the 12-task implementation.
> Generated: 2026-04-25 by planner agent.

## Project Context

- Stack: Next.js 15 (App Router) + TypeScript 5 + Tailwind v4 + React 19
- Runtime: Cloudflare Pages edge (export const runtime = "edge")
- Repo: D:/dev/proposalkit — single repo, no submodules
- Profile: typescript / nextjs (executor profile hint)
- Quality Mode: balanced with adaptive enabled

## Assignment Table

| Task | Description | Agent | Profile | Mode | File Ownership | Dependencies | Complexity |
|------|-------------|-------|---------|------|----------------|--------------|-----------|
| T1 | Install deps, configure .env.example, wrangler.toml, next.config.ts | executor | nextjs | sequential | package.json, package-lock.json, .env.example, wrangler.toml, next.config.ts, vitest.config.ts | none | MEDIUM |
| T2 | Type definitions (ProposalInput, ProposalOutput, RateLimitResult) | executor | typescript | sequential | types/proposal.ts | T1 | LOW |
| T3 | NextAuth v5 beta skeleton (Google provider, JWT session) | executor | nextjs | sequential | auth.ts, app/api/auth/[...nextauth]/route.ts, lib/auth-helpers.ts | T1, T2 | MEDIUM |
| T4 | Gemini 2.5 Flash client via raw fetch (NO SDK) + prompt builder | executor | typescript | parallel | lib/gemini.ts, lib/gemini.test.ts | T2 | MEDIUM |
| T5 | Cloudflare KV rate limiter (5/month, user_id only, in-memory fallback) | executor | typescript | parallel | lib/rate-limit.ts, lib/rate-limit.test.ts | T2 | HIGH |
| T6 | ProposalForm.tsx — 4-field form, 500-char counter, mobile-first | executor | nextjs | parallel | components/ProposalForm.tsx, components/ProposalForm.test.tsx | T2 | MEDIUM |
| T7 | ProposalResult.tsx — inline textarea editor + clipboard copy | executor | nextjs | parallel | components/ProposalResult.tsx, components/ProposalResult.test.tsx | T2 | MEDIUM |
| T8 | Auth UI — LoginPrompt.tsx, UpgradeModal.tsx, GoogleSignInButton.tsx | executor | nextjs | parallel | components/LoginPrompt.tsx, components/UpgradeModal.tsx, components/GoogleSignInButton.tsx | T3 | MEDIUM |
| T9 | Assemble app/page.tsx (full replace) + app/layout.tsx; sessionStorage 1-free tracking | executor | nextjs | sequential | app/page.tsx, app/layout.tsx | T6, T7, T8 | HIGH |
| T10 | app/api/generate/route.ts — POST, edge runtime, auth branch, Gemini + KV | executor | nextjs | sequential | app/api/generate/route.ts, app/api/generate/route.test.ts | T3, T4, T5 | HIGH |
| T11 | app/dashboard/page.tsx — auth guard, usage display, reuse form/result | executor | nextjs | sequential | app/dashboard/page.tsx | T9, T10 | MEDIUM |
| T12 | Final responsive review + npm run build verification | reviewer | - | sequential | (read-only review across all files) | T11 | LOW |

### Mode Legend
- sequential: must run after dependencies complete; no concurrent peers
- parallel: runs in isolated worktree alongside other parallel peers in the same group

## File Ownership Conflicts

Audited — no overlapping file paths between any parallel tasks (T4–T8). Each Core Layer task owns a disjoint file set, so worktree merges are conflict-free.

| Pair | Shared Files | Resolution |
|------|--------------|------------|
| T4 / T5 | none | parallel safe |
| T4 / T6, T7, T8 | none | parallel safe |
| T5 / T6, T7, T8 | none | parallel safe |
| T6 / T7 / T8 | none (distinct component files) | parallel safe |

## Worktree Isolation (Phase 2)

Per worktree-safety.md, the following tasks run in isolated worktrees during G2 parallel execution:

- T4 -> .git/worktrees/exec-t4
- T5 -> .git/worktrees/exec-t5
- T6 -> .git/worktrees/exec-t6
- T7 -> .git/worktrees/exec-t7
- T8 -> .git/worktrees/exec-t8

Constraints:
- Concurrent worktree count: 5 (at the documented hard cap — no queueing required)
- All git commands MUST use `git -c gc.auto=0 <command>` while parallel executors are active
- On any executor failure: `git worktree remove --force <path>` and exclude its changes from merge

## Validation Commands (Gate 2)

Replaces Go-style `go vet` / `go test` gates with the Next.js toolchain.

### Per-Task Gate (run inside each worktree before merge)

```bash
# 1. Type check (fast, no emit)
npx tsc --noEmit

# 2. Lint
npx eslint . --max-warnings=0

# 3. Unit tests (Vitest) — only files touched by the task
npx vitest run --reporter=verbose <task-files>
```

### Full Pipeline Gate (run on main worktree after all merges)

```bash
# 1. Clean install verification
npm ci

# 2. Type check entire project
npx tsc --noEmit

# 3. Lint everything
npm run lint

# 4. Full test suite
npm test -- --run

# 5. Production build (catches edge runtime issues)
npm run build

# 6. Cloudflare Pages adapter dry-run (validates edge compatibility)
npx @cloudflare/next-on-pages --skip-build --dry-run || true
```

### Gate Failure Policy

- Type errors -> block merge, return to executor for fix
- Lint warnings -> block merge (`--max-warnings=0`)
- Test failures -> block merge
- `npm run build` failure -> block merge, likely indicates edge-runtime incompatibility (most common: importing Node-only modules in route handlers)

## Test Framework Recommendation

Vitest (recommended for Next.js 15 + React 19).

### Rationale
- Native ESM and TS support — no Jest/Babel transform overhead
- Vite-based; mirrors modern Next.js tooling philosophy
- @testing-library/react works seamlessly with Vitest
- Faster cold-start than Jest (~3-5x in our project size class)
- React 19 compatibility is more current in the Vitest ecosystem than Jest

### Trade-off Disclosure
- Some Next.js-specific helpers (e.g., `next/jest` preset) only ship for Jest. We accept this because we are NOT testing Next.js internals — only our own modules and components. Route handler tests will mock `next/server` primitives directly.
- @testing-library/jest-dom matchers work with Vitest via `expect.extend(matchers)` in setup.

### Required Dev Dependencies (installed in T1)

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event jsdom \
  @types/node
```

### Required Config Files (created in T1)

- vitest.config.ts — jsdom environment, React plugin, setup file
- vitest.setup.ts — imports @testing-library/jest-dom/vitest
- tsconfig.json — add types: ["vitest/globals", "@cloudflare/workers-types"]
- package.json scripts: "test": "vitest", "test:run": "vitest run"

## Critical Technical Constraints (carry into executor prompts)

These are HARD constraints from research.md and brainstorms/. Each executor prompt MUST include the relevant subset:

1. D4 — Gemini via fetch: T4 MUST use raw fetch against the REST endpoint `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`. Do NOT install or import @google/generative-ai.
2. D3 — next-auth@5 beta: T3 MUST use next-auth@beta (v5). Do NOT use v4 patterns (no pages-router [...nextauth].ts file).
3. D6 — Edge runtime: T10, T11, and any route handler MUST export `export const runtime = "edge"`.
4. Q1 — KV access: T5 MUST use getRequestContext() from @cloudflare/next-on-pages to access KV. In-memory fallback only when getRequestContext throws (local `next dev`).
5. KV key pattern: `rate:{userId}:{YYYY-MM}` with TTL set to next-month-1st 00:00 UTC (compute via Date.UTC(y, m+1, 1)).
6. Rate limit identity: user_id ONLY. Never derive from IP — explicit hard constraint from BS.
7. Guest 1-free: sessionStorage key `pk:guest_used` (boolean). Client-only; never trusted server-side.
8. Mobile-first: components default to mobile layout; desktop via Tailwind `md:` breakpoint upward.

## Adaptive Quality Model Assignment

Per `balanced` mode with adaptive enabled:

| Task | Complexity | Model |
|------|-----------|-------|
| T1 | MEDIUM | sonnet (default) |
| T2 | LOW | sonnet (default) |
| T3 | MEDIUM | sonnet (default) |
| T4 | MEDIUM | sonnet (default) |
| T5 | HIGH | opus |
| T6 | MEDIUM | sonnet (default) |
| T7 | MEDIUM | sonnet (default) |
| T8 | MEDIUM | sonnet (default) |
| T9 | HIGH | opus |
| T10 | HIGH | opus |
| T11 | MEDIUM | sonnet (default) |
| T12 | LOW | sonnet (default) |

Rationale for HIGH assignments:
- T5: race-window read-modify-write + edge KV API + month-boundary TTL math + fallback path = high logic density
- T9: full-page replacement assembling 3 components, sessionStorage state machine, mobile/desktop layout
- T10: edge route handler with auth branch + Gemini call + KV increment + error mapping = composite logic across 4 boundaries

## Context7 Doc Fetch (Phase 1.8)

Detected libraries (5-library limit respected):

1. next-auth (v5 beta) — for T3, T10, T11
2. @cloudflare/next-on-pages — for T1, T5, T10
3. vitest — for T1, all test files
4. @testing-library/react — for T6, T7, T8 component tests
5. (slot reserved for per-executor refinement query)

Skipped (standard / no Context7 value): next, react, typescript, tailwindcss.

## Execution Pipeline Summary

```
Phase 1.8: Context7 doc fetch (5 libs)
   |
Phase 2 — G1 Foundation (sequential):
   T1 -> T2 -> T3
   |
Phase 2 — G2 Core (5-way parallel in worktrees):
   |-- T4 (Gemini)
   |-- T5 (KV rate-limit)  [opus]
   |-- T6 (ProposalForm)
   |-- T7 (ProposalResult)
   +-- T8 (Auth UI)
   | (merge worktrees, run full-pipeline gate)
Phase 2 — G3 Integration (sequential):
   T9 [opus] -> T10 [opus] -> T11 -> T12 (review)
   |
Phase 3: Final gate (build + edge adapter dry-run)
```

## Next Step

Spawn executor subagents starting with T1 (no dependencies). G1 must complete fully before G2 worktree fan-out.
