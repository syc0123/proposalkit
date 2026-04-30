import { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "About — ProposalKit",
  description:
    "ProposalKit is a free AI proposal generator built for small business owners and freelancers who need to win clients without spending hours writing.",
};

export default function AboutPage() {
  return (
    <>
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
          <ThemeToggle />
          <Link className="btn btn-primary btn-sm" href="/" style={{ background: "#2563EB" }}>
            Try free
          </Link>
        </nav>
      </header>
      <div className="page">

      <section className="about-hero">
        <h1>About ProposalKit</h1>
        <p>Built for the people who run the business, not just work in it.</p>
      </section>

      <section className="about-section">
        <span className="kicker">What it is</span>
        <h2>A free AI proposal generator for the people closing deals.</h2>
        <p>
          ProposalKit is built for small business owners and freelancers — plumbers, consultants,
          interior designers, web developers, and contractors — who need to win clients without
          spending hours writing. You give us three details. We hand you back a polished proposal
          you can send today.
        </p>
        <p>No bloat, no setup, no learning curve. Just the proposal.</p>
      </section>

      <section className="about-section">
        <span className="kicker">How it works</span>
        <h2>Three steps, one proposal.</h2>
        <ul className="feat-list">
          <li>
            <span className="feat-bullet">1</span>
            <span className="feat-text">
              <strong>Enter 3 details</strong>
              <span>
                Client name, scope of work, and budget. That&apos;s it — no sign-up, no setup.
              </span>
            </span>
          </li>
          <li>
            <span className="feat-bullet">2</span>
            <span className="feat-text">
              <strong>AI generates your proposal</strong>
              <span>Gemini drafts a complete, structured proposal in about 30 seconds.</span>
            </span>
          </li>
          <li>
            <span className="feat-bullet">3</span>
            <span className="feat-text">
              <strong>Edit &amp; copy</strong>
              <span>
                Tweak inline, then copy the markdown straight into email or your doc tool.
              </span>
            </span>
          </li>
        </ul>
      </section>

      <section className="about-section">
        <span className="kicker">What makes it different</span>
        <h2>Built for speed, not feature lists.</h2>
        <ul className="feat-list">
          {[
            {
              title: "Free to start",
              desc: "No credit card required. Guest users get 1 free proposal per session.",
            },
            {
              title: "30-second generation",
              desc: "Powered by Google Gemini 2.5 Flash for fast, fluent drafts.",
            },
            {
              title: "Industry-aware",
              desc: "The AI uses terminology appropriate for your specific trade — not generic startup-speak.",
            },
            {
              title: "Editable output",
              desc: "Tweak the result directly in your browser before sending. No re-generation needed.",
            },
          ].map(({ title, desc }) => (
            <li key={title}>
              <span className="feat-bullet">
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
              <span className="feat-text">
                <strong>{title}</strong>
                <span>{desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section">
        <span className="kicker">Pricing</span>
        <h2>Free now. Pro later.</h2>
        <div className="pricing-card">
          <div className="pricing-row">
            <div>
              <span className="pricing-name">Free</span>
              <span className="pricing-meta">
                Up to 5 proposals per month after signing in with Google. Guests get 1 free per
                session.
              </span>
            </div>
            <span className="pricing-price">$0</span>
          </div>
          <div className="pricing-row">
            <div>
              <span className="pricing-name">Pro</span>
              <span className="pricing-meta">
                Unlimited proposals, custom templates, branded exports.
              </span>
            </div>
            <span className="pricing-price soon">Coming soon</span>
          </div>
        </div>
      </section>

      <section className="cta-card">
        <h3>Try it free — no sign-up required.</h3>
        <p>Three fields. Thirty seconds. A finished proposal.</p>
        <Link className="btn btn-primary" href="/" style={{ background: "#2563EB" }}>
          Generate a proposal
        </Link>
      </section>

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
    </div>
    </>
  );
}
