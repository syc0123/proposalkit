import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Faq {
  q: string;
  a: string;
}

interface LandingProps {
  profession: string;
  h1: string;
  tagline: string;
  features: Feature[];
  whatIncludes: string[];
  faqs: Faq[];
  ctaLabel: string;
}

export default function ForLandingTemplate({
  profession,
  h1,
  tagline,
  features,
  whatIncludes,
  faqs,
  ctaLabel,
}: LandingProps) {
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
        {/* Hero */}
        <section className="about-hero">
          <h1>{h1}</h1>
          <p className="about-hero p">{tagline}</p>
          <Link href="/#generator" className="btn btn-primary" style={{ marginTop: 28 }}>
            {ctaLabel}
          </Link>
        </section>

        {/* Features */}
        <section className="about-section">
          <span className="kicker">Why ProposalKit</span>
          <h2>Everything a {profession} proposal needs</h2>
          <ul className="feat-list">
            {features.map((f) => (
              <li key={f.title}>
                <span className="feat-bullet">{f.icon}</span>
                <div className="feat-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* What a proposal includes */}
        <section className="about-section">
          <span className="kicker">Proposal structure</span>
          <h2>What your {profession.toLowerCase()} proposal will include</h2>
          <div className="pricing-card">
            {whatIncludes.map((item, i) => (
              <div key={i} className="pricing-row">
                <span className="pricing-name">
                  {i + 1}. {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="about-section">
          <span className="kicker">FAQ</span>
          <h2>Common questions</h2>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{faq.q}</h3>
              <p style={{ color: "var(--ink-700)", fontSize: 15, lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
        </section>

        {/* CTA card */}
        <div className="cta-card">
          <h3>Ready to write your {profession.toLowerCase()} proposal?</h3>
          <p>Free, no sign-up required. Get a complete proposal in 30 seconds.</p>
          <Link href="/#generator" className="btn btn-primary">
            {ctaLabel}
          </Link>
        </div>

        <footer className="footer">
          <span>© 2026 ProposalKit. All rights reserved.</span>
          <nav>
            <Link href="/">Home</Link>
            <span className="sep">·</span>
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
