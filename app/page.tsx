"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalResult } from "@/components/ProposalResult";
import { UpgradeModal } from "@/components/UpgradeModal";
import type { ProposalInput, ProposalOutput, GenerateApiResponse } from "@/types/proposal";

// @AX:NOTE: [AUTO] sessionStorage key for guest 1-free tracking — cleared on tab close
const GUEST_USED_KEY = "pk:guest_used";

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

export default function HomePage() {
  const [proposal, setProposal] = useState<ProposalOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestUsed, setGuestUsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(GUEST_USED_KEY) === "1";
  });
  const [showUpgrade, setShowUpgrade] = useState(false);

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

      if (!guestUsed) {
        sessionStorage.setItem(GUEST_USED_KEY, "1");
        setGuestUsed(true);
      }
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }

  // @AX:WARN: [AUTO] isBlocked only prevents form render — server does not enforce guest limit
  const isBlocked = guestUsed && !proposal;

  return (
    <>
      {/* ── Nav (outside .page so sticky spans full viewport width) ── */}
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
          <a
            className="btn btn-primary btn-sm"
            href="#generator"
            style={{ background: "#2563EB" }}
          >
            Try free
          </a>
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
          {/* Form card */}
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
                <div className="signin-text">
                  <strong>You&apos;ve used your free proposal.</strong>
                  <span>Sign in with Google to get 5 free proposals per month.</span>
                </div>
                <button
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
          </div>

          {/* Result card — always visible; shows skeleton when empty */}
          <ProposalResult
            key={proposal?.generatedAt ?? "empty"}
            text={proposal?.text ?? null}
            isLoading={isLoading}
            showSignin={guestUsed && !!proposal}
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

      {/* ── Footer ── */}
      <footer className="footer">
        <span>© 2026 ProposalKit. All rights reserved.</span>
        <nav>
          <Link href="/about">About</Link>
          <span className="sep">·</span>
          <Link href="/privacy">Privacy Policy</Link>
          <span className="sep">·</span>
          <Link href="/terms">Terms of Service</Link>
        </nav>
      </footer>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
      </div>
    </>
  );
}
