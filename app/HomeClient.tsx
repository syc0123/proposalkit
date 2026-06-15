"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalResult } from "@/components/ProposalResult";
import { UpgradeModal } from "@/components/UpgradeModal";
import { FeedbackModal } from "@/components/FeedbackModal";
import type { ProposalInput, ProposalOutput, GenerateApiResponse } from "@/types/proposal";
import { saveProposal, loadProposal } from "@/lib/proposal-storage";
import { faqSchema } from "@/lib/structured-data";

// @AX:NOTE: [AUTO] sessionStorage key for guest 1-free tracking — cleared on tab close
const GUEST_USED_KEY = "pk:guest_used";

interface SessionUser {
  name?: string | null;
  email?: string | null;
  id?: string | null;
}

interface HomeClientProps {
  user: SessionUser | null;
  remaining: number | null; // null = unlimited (admin)
  isAdmin: boolean;
}

const HOW_STEPS = [
  {
    num: "01",
    title: "Enter 3 details",
    desc: "Client, scope, and budget. That's it — no sign-up, no setup.",
  },
  {
    num: "02",
    title: "AI generates your proposal",
    desc: "Gemini drafts a complete, structured proposal in about 30 seconds.",
  },
  {
    num: "03",
    title: "Edit & copy",
    desc: "Tweak inline, then copy the markdown straight into email or your doc tool.",
  },
];

const CHIPS = [
  { icon: "🔧", label: "Plumbers & contractors", href: "/for/contractors" },
  { icon: "🎨", label: "Interior designers", href: "/for/designers" },
  { icon: "📊", label: "Marketing consultants", href: "/for/agencies" },
  { icon: "💻", label: "Web developers", href: "/for/designers" },
  { icon: "🌿", label: "Landscapers", href: "/for/contractors" },
  { icon: "📋", label: "Accountants", href: "/for/consultants" },
];

const HOME_FAQ = [
  {
    q: "Is ProposalKit free?",
    a: "Yes. You can generate one proposal with no account at all. Sign in with a free Google account and you get five proposals per calendar month at no cost — no credit card, no trial that converts to a paid plan. A paid Pro tier with unlimited generation is planned but not yet launched.",
  },
  {
    q: "What do I need to enter to generate a proposal?",
    a: "Three required fields — your client's name, the scope of work, and the budget. You can optionally add your industry, your business name, and a target timeline to make the draft more specific. The whole form takes under a minute, and generation takes about 30 seconds.",
  },
  {
    q: "Can I edit the proposal after it's generated?",
    a: "Yes. The output opens in an editable view in your browser. You can rewrite any section, adjust the tone, add your own clauses, then copy it as markdown or download it as a PDF. Most people spend five to ten minutes tailoring the draft before sending it.",
  },
  {
    q: "What kinds of businesses is it for?",
    a: "Solo operators and small teams in service businesses: contractors and trades, freelance designers and developers, consultants, marketing and creative agencies, and other independent professionals. The AI adapts its language and structure to your field rather than producing generic startup-speak.",
  },
  {
    q: "How accurate is the AI output?",
    a: "Treat every proposal as a strong first draft, not a finished document. AI-generated text can contain errors, outdated figures, or claims that don't fit your jurisdiction, so review and edit it before sending. The drafts are general guidance, not legal, financial, or professional advice.",
  },
  {
    q: "Is my data stored or shared?",
    a: "Generated proposals are not stored on our servers — the draft is returned to your browser and, for convenience, kept in your browser's local storage for 24 hours. Your form inputs are sent to the Google Gemini API to produce the proposal. See the Privacy Policy for the full detail on what we collect and why.",
  },
];

export function HomeClient({ user, remaining: initialRemaining, isAdmin }: HomeClientProps) {
  const [proposal, setProposal] = useState<ProposalOutput | null>(() => {
    if (typeof window === "undefined") return null;
    return loadProposal();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Decremented client-side after each successful generation
  const [remaining, setRemaining] = useState(initialRemaining);
  const [guestUsed, setGuestUsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(GUEST_USED_KEY) === "1";
  });
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  async function handleGenerate(input: ProposalInput) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data: GenerateApiResponse = await res.json();

      if (res.status === 429) {
        setShowUpgrade(true);
        return;
      }

      if (!res.ok || !data.proposal) {
        setError(data.error ?? "Failed to generate proposal. Please try again.");
        return;
      }

      setProposal(data.proposal);
      saveProposal(data.proposal);

      if (user) {
        // Decrement displayed count for authenticated non-admin users
        if (!isAdmin && remaining !== null) {
          setRemaining(Math.max(0, remaining - 1));
        }
      } else {
        if (!guestUsed) {
          sessionStorage.setItem(GUEST_USED_KEY, "1");
          setGuestUsed(true);
        }
      }
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }

  // @AX:WARN: [AUTO] isBlocked only prevents form render — server enforces limits independently
  const isBlocked = user
    ? (!isAdmin && remaining !== null && remaining <= 0 && !proposal)
    : (guestUsed && !proposal);

  const displayName = user?.name ?? user?.email ?? null;

  return (
    <>
      {/* ── Nav ── */}
      <header className="nav">
        <Link className="logo" href="/">
          <span className="logo-mark" style={{ color: "#2563EB" }}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="4" fill="currentColor" />
              <path
                d="M7 6.5h4.2a2.3 2.3 0 010 4.6H7V6.5zM7 11.1V14"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="logo-word">ProposalKit</span>
        </Link>
        <nav className="nav-links">
          <Link href="/about">About</Link>
          <ThemeToggle />
          {user ? (
            <>
              <span style={{ fontSize: 13, color: "var(--ink-500)" }}>
                {isAdmin ? "∞" : `${remaining ?? 0} left`}
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-600)", fontWeight: 500 }}>
                {displayName}
              </span>
              <button
                className="btn btn-ghost btn-sm"
                style={{ cursor: "pointer" }}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </>
          ) : (
            <a
              className="btn btn-primary btn-sm"
              href="#generator"
              style={{ background: "#2563EB" }}
            >
              Try free
            </a>
          )}
        </nav>
      </header>

      <div className="page">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" style={{ background: "#2563EB" }} />
            Free · No sign-up · 30 seconds
          </div>
          <h1 className="hero-title">
            Free AI Proposal
            <br />
            Generator
          </h1>
          <p className="hero-sub">
            Enter your industry, client &amp; scope — get a professional proposal in 30&nbsp;seconds.
          </p>
          <div className="trust">
            {["Free to use", "AI-powered", "Editable output", "No sign-up needed"].map((t) => (
              <span key={t} className="trust-badge">
                <span className="trust-check" style={{ color: "#2563EB" }}>
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── Generator ── */}
        <section id="generator" className="generator">
          <div className="gen-grid">
            <div className="form-card">
              <div className="card-head">
                <h3>Proposal Details</h3>
                <span className="card-tag">3 fields · 30 seconds</span>
              </div>

              {isBlocked ? (
                <div
                  className="signin-banner"
                  style={{ borderColor: "var(--ink-200)", background: "var(--ink-100)" }}
                >
                  {user ? (
                    <div className="signin-text">
                      <strong>You&apos;ve used all 5 proposals this month.</strong>
                      <span>Quota resets on the 1st of next month.</span>
                    </div>
                  ) : (
                    <>
                      <div className="signin-text">
                        <strong>You&apos;ve used your free proposal.</strong>
                        <span>Sign in with Google to get 5 free proposals per month.</span>
                      </div>
                      <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="btn btn-google"
                        style={{ cursor: "pointer" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87z" fill="#4285F4"/>
                          <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2.01c-.71.48-1.63.76-2.71.76-2.09 0-3.86-1.41-4.49-3.3H.84v2.07A8 8 0 008 16z" fill="#34A853"/>
                          <path d="M3.51 9.51A4.8 4.8 0 013.26 8c0-.52.09-1.03.25-1.51V4.42H.84A8 8 0 000 8c0 1.3.31 2.52.84 3.58l2.67-2.07z" fill="#FBBC05"/>
                          <path d="M8 3.18c1.18 0 2.23.41 3.06 1.2l2.3-2.3A8 8 0 00.84 4.42l2.67 2.07C4.14 4.59 5.91 3.18 8 3.18z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <ProposalForm onSubmit={handleGenerate} isLoading={isLoading} />
              )}

              {error && (
                <p
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(239,68,68,0.08)",
                    color: "#DC2626",
                    fontSize: 13,
                  }}
                >
                  {error}
                </p>
              )}

              <p style={{ marginTop: 14, fontSize: 12, color: "var(--ink-500)", lineHeight: 1.6 }}>
                ProposalKit produces an AI-generated first draft. Review and edit it before sending —
                AI output can contain errors, and the draft is general guidance, not legal,
                financial, or professional advice.
              </p>
            </div>

            {/* Result card — always visible; shows skeleton when empty */}
            <ProposalResult
              key={proposal?.generatedAt ?? "empty"}
              text={proposal?.text ?? null}
              isLoading={isLoading}
              showSignin={!user && guestUsed && !!proposal}
            />
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="section" id="how-it-works">
          <div className="section-head">
            <span className="section-kicker">How it works</span>
            <h2>Three steps, one proposal.</h2>
          </div>
          <div className="how-grid">
            {HOW_STEPS.map(({ num, title, desc }) => (
              <div key={num} className="how-card">
                <div className="how-num" style={{ color: "#2563EB" }}>{num}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Built for ── */}
        <section className="section">
          <div className="section-head">
            <span className="section-kicker">Built for</span>
            <h2>Solo operators and small teams.</h2>
          </div>
          <div className="chips">
            {CHIPS.map(({ icon, label, href }) => (
              <Link key={label} href={href} className="chip">
                <span className="chip-bar" />
                <span className="chip-icon">{icon}</span>
                <span className="chip-label">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why proposals matter (educational) ── */}
        <section className="section">
          <div className="section-head">
            <span className="section-kicker">Why proposals matter</span>
            <h2>The proposal is where you win — or lose — the deal.</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-700)", marginBottom: 16 }}>
              Most freelancers and small business owners treat the proposal as paperwork — something
              to send after the buyer has already decided to hire them. That framing is backwards.
              For competitive engagements, the proposal is where the decision actually gets made.
              A buyer comparing three vendors at similar prices will pick the one whose proposal
              feels clearest, most professional, and most specific to their situation. Speed of
              response, structure, and tone all influence the choice as much as price.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-700)", marginBottom: 16 }}>
              A well-written proposal does three jobs at once. It defines the commercial terms so
              both sides know what was agreed. It demonstrates strategic thinking by framing the
              work as a solution to the client&apos;s specific problem, not as a generic service
              menu. And it reduces the buyer&apos;s perceived risk by replacing uncertainty —
              about scope, timeline, payment, and the relationship — with documented commitments.
              The proposals that win consistently aren&apos;t the longest or the most polished;
              they&apos;re the ones that handle these three jobs in the fewest pages.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink-700)" }}>
              We built ProposalKit because most small business owners don&apos;t have time to draft
              a proposal from scratch for every opportunity, and the existing template libraries
              are either generic or locked behind expensive subscriptions. With three inputs —
              client, scope, budget — the AI drafts a complete, structured proposal in 30 seconds.
              You spend the next 5–10 minutes customizing it. Then you send it the same day you
              had the call. Speed and structure beat polish in almost every case.
            </p>
          </div>
        </section>

        {/* ── Guides preview ── */}
        <section className="section">
          <div className="section-head">
            <span className="section-kicker">Free guides</span>
            <h2>Learn what makes proposals close.</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link
              href="/guides/how-to-write-a-business-proposal"
              style={{
                display: "block",
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--ink-900)" }}>
                How to write a business proposal that actually wins clients
              </h4>
              <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
                The eight-section structure used by senior closers, with language patterns and
                pricing logic that separate winning proposals from generic ones.
              </p>
            </Link>
            <Link
              href="/guides/proposal-vs-quote-vs-estimate"
              style={{
                display: "block",
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--ink-900)" }}>
                Proposal vs. quote vs. estimate: which one to send
              </h4>
              <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
                Three documents, three commercial outcomes. When each is appropriate, what makes
                them legally binding, and the mistake that costs small businesses real money.
              </p>
            </Link>
            <Link
              href="/guides/proposal-pricing-strategies"
              style={{
                display: "block",
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
                textDecoration: "none",
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--ink-900)" }}>
                Proposal pricing strategies that win at full fee
              </h4>
              <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
                Six pricing structures used by senior consultants and agencies — and how to present
                them so buyers accept without negotiation.
              </p>
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" id="faq">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                faqSchema(HOME_FAQ.map((f) => ({ question: f.q, answer: f.a })))
              ),
            }}
          />
          <div className="section-head">
            <span className="section-kicker">FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 16px" }}>
            {HOME_FAQ.map(({ q, a }) => (
              <div key={q} style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--ink-900)" }}>
                  {q}
                </h3>
                <p style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <span>© 2026 ProposalKit. All rights reserved.</span>
          <nav>
            <Link href="/about">About</Link>
            <span className="sep">·</span>
            <Link href="/guides">Guides</Link>
            <span className="sep">·</span>
            <Link href="/contact">Contact</Link>
            <span className="sep">·</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="sep">·</span>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </footer>

        <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

        {/* Floating feedback button */}
        <button
          onClick={() => setShowFeedback(true)}
          aria-label="Share feedback"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 150,
            background: "var(--surface)",
            color: "var(--ink-600)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "9px 16px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "inherit",
            transition: "box-shadow .15s ease, transform .15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
          }}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3l3 2 3-2h3a1 1 0 001-1V3a1 1 0 00-1-1z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          Feedback
        </button>

        <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
      </div>
    </>
  );
}
