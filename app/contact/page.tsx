import { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact — ProposalKit",
  description:
    "Get in touch with the ProposalKit team. Send feedback, report a bug, request a feature, or ask a question about your account.",
};

export default function ContactPage() {
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
        <section className="about-hero">
          <h1>Contact ProposalKit</h1>
          <p>
            We read every message. Reach out for support, feedback, or to be notified when Pro
            launches.
          </p>
        </section>

        <section className="about-section">
          <p
            style={{
              color: "var(--ink-700)",
              fontSize: 16,
              lineHeight: 1.75,
              marginBottom: 24,
            }}
          >
            ProposalKit is built and maintained by a small team. We don&apos;t have a phone line or a
            help desk staffed by tier-one support agents — what we do have is direct email access to
            the people actually building the product. If you write us, you&apos;ll hear back from
            someone who can actually fix the issue or change the roadmap.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>
            How to reach us
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>In-app feedback</h3>
              <p style={{ fontSize: 14, color: "var(--ink-600)", marginBottom: 8 }}>
                The fastest way to reach us — click the Feedback button at the bottom-right of any
                page. Bug reports, feature requests, and general feedback all land in our inbox
                within seconds.
              </p>
            </div>

            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>General inquiries</h3>
              <p style={{ fontSize: 14, color: "var(--ink-600)" }}>
                Email{" "}
                <a href="mailto:hello@proposalkit.app" style={{ color: "#2563EB" }}>
                  hello@proposalkit.app
                </a>{" "}
                — typical response time is 1–2 business days. Use this for product questions,
                partnership inquiries, or anything that doesn&apos;t fit the categories below.
              </p>
            </div>

            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Privacy and data requests</h3>
              <p style={{ fontSize: 14, color: "var(--ink-600)" }}>
                Email{" "}
                <a href="mailto:privacy@proposalkit.app" style={{ color: "#2563EB" }}>
                  privacy@proposalkit.app
                </a>{" "}
                — for data deletion requests, GDPR/CCPA inquiries, or questions about how we handle
                your information. We honor verified deletion requests within 30 days as outlined in
                our{" "}
                <Link href="/privacy" style={{ color: "#2563EB" }}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                background: "var(--surface)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Security disclosures</h3>
              <p style={{ fontSize: 14, color: "var(--ink-600)" }}>
                If you&apos;ve discovered a security vulnerability, please email{" "}
                <a href="mailto:security@proposalkit.app" style={{ color: "#2563EB" }}>
                  security@proposalkit.app
                </a>{" "}
                with details. We acknowledge receipt within 48 hours and aim to resolve verified
                issues within 14 days. We do not currently offer a bug bounty, but we credit
                researchers in our public security acknowledgments page upon resolution.
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>
            What we respond to (and what we don&apos;t)
          </h2>
          <p style={{ color: "var(--ink-700)", fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>
            We respond to: bug reports with reproduction steps, feature requests with context,
            questions about your account or usage limits, partnership and integration proposals,
            press inquiries, and privacy or security matters. If you write us a thoughtful question,
            you will hear back.
          </p>
          <p style={{ color: "var(--ink-700)", fontSize: 15, lineHeight: 1.75 }}>
            We don&apos;t respond to: unsolicited sales pitches for SEO services, link-building
            schemes, AI content marketing offers, or generic outreach templates. Those go to the
            spam folder, no offense intended. We&apos;re a small team and our time is reserved for
            the people who actually use the product.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>
            Frequently asked questions
          </h2>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
              How do I delete my account?
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
              Email{" "}
              <a href="mailto:privacy@proposalkit.app" style={{ color: "#2563EB" }}>
                privacy@proposalkit.app
              </a>{" "}
              from the address associated with your Google sign-in. We verify the request and remove
              your data within 30 days. Self-service account deletion is on the roadmap.
            </p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
              Will my monthly quota increase if I email asking?
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
              The free tier is fixed at 5 proposals per month per signed-in user. We don&apos;t make
              one-off exceptions, but if you have a use case for higher volume, let us know — it
              helps us prioritize the paid tier roadmap.
            </p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
              Do you offer custom integrations or API access?
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.65 }}>
              Not currently. The product is delivered through the web app at proposalkit.pages.dev.
              If you have a specific integration need (e.g. Zapier, CRM, document automation), email
              us — these requests inform our roadmap.
            </p>
          </div>
        </section>

        <section className="cta-card">
          <h3>Or just try the product</h3>
          <p>Most questions are easier to answer once you&apos;ve seen the generator in action.</p>
          <Link className="btn btn-primary" href="/" style={{ background: "#2563EB" }}>
            Try ProposalKit free
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
