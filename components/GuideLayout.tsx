import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface GuideLayoutProps {
  title: string;
  description: string;
  publishedDate: string;
  readingTime: string;
  intro: string;
  sections: Section[];
  relatedGuides?: { href: string; label: string }[];
}

export default function GuideLayout({
  title,
  description,
  publishedDate,
  readingTime,
  intro,
  sections,
  relatedGuides = [],
}: GuideLayoutProps) {
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
          <Link href="/guides">Guides</Link>
          <ThemeToggle />
          <Link className="btn btn-primary btn-sm" href="/" style={{ background: "#2563EB" }}>
            Try free
          </Link>
        </nav>
      </header>

      <div className="page">
        <article className="doc" style={{ maxWidth: 760, margin: "0 auto" }}>
          <header className="doc-head">
            <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 8 }}>
              <Link href="/guides" style={{ color: "var(--ink-500)" }}>
                Guides
              </Link>{" "}
              ·{" "}
              <span>{readingTime} read</span>
            </p>
            <h1>{title}</h1>
            <p className="meta">Published {publishedDate}</p>
            <p style={{ color: "var(--ink-600)", fontSize: 17, lineHeight: 1.65, marginTop: 16 }}>
              {description}
            </p>
          </header>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "var(--ink-700)",
              marginBottom: 32,
              fontStyle: "italic",
              borderLeft: "3px solid var(--ink-200)",
              paddingLeft: 16,
            }}
          >
            {intro}
          </p>

          {sections.map((section) => (
            <section key={section.heading} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "var(--ink-900)" }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: "var(--ink-700)",
                    marginBottom: 16,
                  }}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          {relatedGuides.length > 0 && (
            <section style={{ borderTop: "1px solid var(--border)", paddingTop: 32, marginTop: 48 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Related guides</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {relatedGuides.map((g) => (
                  <li key={g.href} style={{ marginBottom: 8 }}>
                    <Link href={g.href} style={{ color: "#2563EB", fontSize: 15 }}>
                      → {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="cta-card" style={{ marginTop: 48 }}>
            <h3>Ready to write your proposal?</h3>
            <p>Use ProposalKit&apos;s free AI generator to draft a complete proposal in 30 seconds.</p>
            <Link href="/#generator" className="btn btn-primary" style={{ background: "#2563EB" }}>
              Generate a proposal — free
            </Link>
          </div>
        </article>

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
