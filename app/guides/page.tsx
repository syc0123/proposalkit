import { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Proposal Writing Guides",
  description:
    "Long-form guides on writing business proposals that win clients. Pricing strategies, structure, and the difference between proposals, quotes, and estimates.",
};

const GUIDES = [
  {
    href: "/guides/how-to-write-a-business-proposal",
    title: "How to write a business proposal that actually wins clients",
    description:
      "The eight-section structure used by closers across freelance, agency, and consulting work, with language patterns and pricing logic that separate winning proposals from generic ones.",
    readingTime: "14 min",
    topics: ["Structure", "Language", "Conversion"],
  },
  {
    href: "/guides/proposal-vs-quote-vs-estimate",
    title: "Proposal vs. quote vs. estimate: which one to send (and why it matters)",
    description:
      "Three documents, three different commercial outcomes. When each is appropriate, what makes them legally binding, and the mistake that costs small businesses thousands of dollars each year.",
    readingTime: "11 min",
    topics: ["Documents", "Legal", "Sales"],
  },
  {
    href: "/guides/proposal-pricing-strategies",
    title: "Proposal pricing strategies that win at full fee",
    description:
      "Six pricing structures used by senior consultants, agencies, and freelancers — and how to present them in proposals so buyers accept without discounting.",
    readingTime: "13 min",
    topics: ["Pricing", "Negotiation", "Value-based"],
  },
  {
    href: "/guides/common-proposal-mistakes",
    title: "10 common proposal mistakes that cost you deals (and how to fix each one)",
    description:
      "A diagnostic checklist of the ten most frequent mistakes in business proposals — from vague scope to weak acceptance steps — and the specific fixes that turn a losing proposal into a winning one.",
    readingTime: "12 min",
    topics: ["Diagnostics", "Conversion", "Checklist"],
  },
  {
    href: "/guides/proposal-follow-up-strategy",
    title: "The proposal follow-up strategy that closes more deals",
    description:
      "Most proposals don't lose to better competitors. They lose to silence. A five-touch follow-up cadence with email templates and timing principles that close stalled deals.",
    readingTime: "10 min",
    topics: ["Follow-up", "Sales", "Cadence"],
  },
  {
    href: "/guides/proposal-negotiation",
    title: "How to negotiate proposal pricing without losing the deal",
    description:
      "Most freelancers either cave on price or lose the deal. The third option — negotiate by adjusting scope, not discounting fee — wins more often and protects your effective rate.",
    readingTime: "11 min",
    topics: ["Negotiation", "Pricing", "Sales"],
  },
];

export default function GuidesIndexPage() {
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
          <Link href="/about">About</Link>
          <ThemeToggle />
          <Link className="btn btn-primary btn-sm" href="/" style={{ background: "#2563EB" }}>
            Try free
          </Link>
        </nav>
      </header>

      <div className="page">
        <section className="about-hero">
          <h1>Proposal writing guides</h1>
          <p>
            Long-form guides on writing business proposals that win clients — structure, pricing
            strategies, and the language patterns used by senior freelancers, consultants, and
            agencies.
          </p>
        </section>

        <section className="about-section">
          <p
            style={{
              color: "var(--ink-700)",
              fontSize: 16,
              lineHeight: 1.75,
              marginBottom: 40,
            }}
          >
            These guides are written for solo operators and small teams who write proposals
            themselves and need practical, opinionated advice — not generic templates or AI-generated
            filler. Each guide takes 10–15 minutes to read and includes specific language examples
            you can apply to your next proposal today.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                style={{
                  display: "block",
                  padding: 24,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  transition: "border-color .15s ease, transform .15s ease",
                }}
              >
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  {g.topics.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--ink-500)",
                        padding: "2px 8px",
                        background: "var(--ink-100)",
                        borderRadius: 4,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--ink-500)",
                      marginLeft: "auto",
                    }}
                  >
                    {g.readingTime} read
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: "var(--ink-900)",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {g.title}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-600)",
                    lineHeight: 1.65,
                  }}
                >
                  {g.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="cta-card">
          <h3>Try the free proposal generator</h3>
          <p>Generate a complete proposal in 30 seconds — no sign-up required.</p>
          <Link className="btn btn-primary" href="/" style={{ background: "#2563EB" }}>
            Start writing
          </Link>
        </section>

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
      </div>
    </>
  );
}
