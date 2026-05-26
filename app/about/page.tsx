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
          <Link href="/guides">Guides</Link>
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
          <span className="kicker">Why we built it</span>
          <h2>The problem with most proposal tools</h2>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
            Most proposal software is built for enterprise sales teams. It assumes you have a CRM, a sales operations function, a marketing department to handle templates, and several hours each week to maintain it. For a solo contractor, a freelance designer, or a two-person consulting practice, that workflow is the opposite of what they need. They need to write one good proposal, send it, and get back to running their business.
          </p>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
            We built ProposalKit after watching dozens of freelancers and small business owners lose work to slow proposals. Not bad proposals — slow ones. A roofer who took three days to put together a written estimate because they didn&apos;t have a template. A consultant who delayed sending a proposal for two weeks because the format felt wrong. A web designer who lost a $14,000 project to a competitor who responded same-day with a basic but well-structured document. Speed and structure beat polish in almost every case.
          </p>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75 }}>
            The tool exists to close that gap. You give us three pieces of context — who the client is, what they need, and the budget — and we produce a complete proposal in 30 seconds that you can edit and send the same day. No templates to maintain. No software to learn. No monthly subscription for a workflow you&apos;ll use four times a month.
          </p>
        </section>

        <section className="about-section">
          <span className="kicker">What it is</span>
          <h2>A free AI proposal generator for the people closing deals</h2>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
            ProposalKit is built for small business owners and freelancers — plumbers, consultants, interior designers, web developers, marketing agencies, contractors, and accountants — who need to win clients without spending hours writing. You give us three details. We hand you back a polished proposal you can send today.
          </p>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75 }}>
            No bloat, no setup, no learning curve. The AI is powered by Google Gemini 2.5 Flash, which is fast enough to draft a complete multi-section proposal in under a minute and is industry-aware enough to use the right terminology for your trade. Plumbing proposals don&apos;t sound like consulting proposals; design proposals don&apos;t sound like roofing estimates. The model adapts to your context.
          </p>
        </section>

        <section className="about-section">
          <span className="kicker">How it works</span>
          <h2>Three steps, one proposal</h2>
          <ul className="feat-list">
            <li>
              <span className="feat-bullet">1</span>
              <span className="feat-text">
                <strong>Enter 3 details</strong>
                <span>
                  Client name, scope of work, and budget. Optionally add your industry, your business name, and a target timeline. That&apos;s it — no sign-up, no setup, no credit card.
                </span>
              </span>
            </li>
            <li>
              <span className="feat-bullet">2</span>
              <span className="feat-text">
                <strong>AI generates your proposal</strong>
                <span>
                  Gemini drafts a complete, structured proposal in about 30 seconds. The output includes executive summary, scope of work, timeline, pricing breakdown, payment schedule, and a call to action — all in clean markdown.
                </span>
              </span>
            </li>
            <li>
              <span className="feat-bullet">3</span>
              <span className="feat-text">
                <strong>Edit and send</strong>
                <span>
                  Refine any section inline, then copy the markdown into email or download as a PDF. Most users spend 5–10 minutes customizing the draft before sending — about an hour faster than writing from scratch.
                </span>
              </span>
            </li>
          </ul>
        </section>

        <section className="about-section">
          <span className="kicker">What makes it different</span>
          <h2>Built for speed, not feature lists</h2>
          <ul className="feat-list">
            {[
              {
                title: "Free to start, free to keep using",
                desc: "No credit card required. Guest users get one free proposal per browser session. Signed-in users get five free proposals per calendar month, which covers most freelancers doing 2–4 client conversations per week.",
              },
              {
                title: "30-second generation",
                desc: "Powered by Google Gemini 2.5 Flash for fast, fluent drafts. The model is tuned for business document generation, so the output reads like a proposal — not like a chatbot response.",
              },
              {
                title: "Industry-aware",
                desc: "The AI uses terminology appropriate for your specific trade. A contractor proposal includes scope-of-work language, materials breakdowns, and warranty terms. A consulting proposal frames the engagement around outcomes and methodology. The same tool, different vocabulary.",
              },
              {
                title: "Editable output",
                desc: "The generated proposal opens in an editable view in your browser. Change any sentence, add custom clauses, adjust the tone, or restructure sections. The AI provides the structure and standard language; you provide the specifics that win the client.",
              },
              {
                title: "Privacy-respecting",
                desc: "We don't sell your data, we don't train models on your proposals, and we don't share your inputs with third parties beyond the Gemini API call needed to generate the output. The full privacy policy is linked at the bottom of every page.",
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
          <span className="kicker">Who it&apos;s for</span>
          <h2>Industries we serve</h2>
          <p style={{ color: "var(--ink-700)", fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
            ProposalKit is designed for solo operators and small teams across a wide range of service businesses. We&apos;ve tuned the AI to produce proposals that feel native to each industry&apos;s conventions and vocabulary. Detailed guides and proposal templates are available for the following segments:
          </p>
          <ul className="feat-list">
            <li>
              <span className="feat-bullet">🔧</span>
              <div className="feat-text">
                <strong><Link href="/for/contractors">Contractors & trades</Link></strong>
                <span>Plumbers, electricians, roofers, HVAC technicians, general contractors, and landscapers. Proposals include scope-of-work language, materials and labor breakdowns, warranty terms, and payment schedules that comply with most state contractor licensing requirements.</span>
              </div>
            </li>
            <li>
              <span className="feat-bullet">🎨</span>
              <div className="feat-text">
                <strong><Link href="/for/designers">Web designers & developers</Link></strong>
                <span>Freelance and small-studio designers and developers building websites, apps, or design systems. Proposals are structured around phased delivery, bounded revision rounds, and milestone-based payments to prevent scope creep.</span>
              </div>
            </li>
            <li>
              <span className="feat-bullet">📊</span>
              <div className="feat-text">
                <strong><Link href="/for/consultants">Business consultants</Link></strong>
                <span>Strategy, marketing, HR, operations, and financial consultants. Proposals open with a situation analysis, articulate the engagement as 3–4 phases with named deliverables, and price the work by value rather than hours.</span>
              </div>
            </li>
            <li>
              <span className="feat-bullet">📈</span>
              <div className="feat-text">
                <strong><Link href="/for/agencies">Marketing & creative agencies</Link></strong>
                <span>Marketing, paid media, SEO, social media, branding, PR, and creative agencies pitching new business. Proposals lead with the projected business outcome and structure pricing as retainer-plus-performance for stronger differentiation.</span>
              </div>
            </li>
            <li>
              <span className="feat-bullet">💼</span>
              <div className="feat-text">
                <strong><Link href="/for/freelancers">Freelancers (all categories)</Link></strong>
                <span>Writers, photographers, illustrators, video editors, voice-over artists, and other independent professionals. Proposals are sized appropriately for solo work — professional enough to compete with agencies, personal enough to convey individual expertise.</span>
              </div>
            </li>
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
                  Up to 5 proposals per month after signing in with Google. Guests get 1 free per session. No credit card required. No trial expiration.
                </span>
              </div>
              <span className="pricing-price">$0</span>
            </div>
            <div className="pricing-row">
              <div>
                <span className="pricing-name">Pro</span>
                <span className="pricing-meta">
                  Unlimited proposals, custom templates, branded exports, multi-user accounts for small teams. On the roadmap, not yet launched. Sign in with Google to be notified when Pro is available.
                </span>
              </div>
              <span className="pricing-price soon">Coming soon</span>
            </div>
          </div>
        </section>

        <section className="cta-card">
          <h3>Try it free — no sign-up required</h3>
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
