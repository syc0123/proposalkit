import { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Terms of Service — ProposalKit",
  description:
    "The terms governing your use of ProposalKit, including free-tier limits, acceptable use, and intellectual property.",
};

export default function TermsPage() {
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

      <article className="doc">
        <header className="doc-head">
          <h1>Terms of Service</h1>
          <p className="meta">Last updated: April 2026</p>
        </header>

        <p>
          These Terms govern your use of ProposalKit. By using the service, you agree to them.
          Please read carefully.
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ProposalKit, you agree to be bound by these Terms and our Privacy
            Policy. If you don&apos;t agree, please don&apos;t use the service.
          </p>
        </section>

        <section>
          <h2>2. Service Description</h2>
          <p>
            ProposalKit is a free AI-powered proposal generator that uses Google Gemini to draft
            business proposals based on inputs you provide. Output quality depends on the AI model
            and the inputs supplied.
          </p>
        </section>

        <section>
          <h2>3. Free Tier Limits</h2>
          <ul>
            <li>
              <strong>Guest users</strong> — 1 proposal per browser session.
            </li>
            <li>
              <strong>Registered users</strong> — 5 proposals per month, free.
            </li>
            <li>
              <strong>Paid plan</strong> — Unlimited generation, coming soon.
            </li>
          </ul>
          <p>Limits may change. We&apos;ll notify registered users of material changes by email.</p>
        </section>

        <section>
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Generate fraudulent, deceptive, or misleading proposals.</li>
            <li>
              Use automation, scripts, or multiple accounts to circumvent rate limits.
            </li>
            <li>
              Use the service for any unlawful purpose or in violation of third-party rights.
            </li>
            <li>
              Attempt to disrupt, reverse-engineer, or probe the service for security
              vulnerabilities outside a coordinated disclosure.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            You own the proposals you generate. You&apos;re free to use, edit, and send them to
            clients without attribution.
          </p>
          <p>
            ProposalKit owns the platform itself: the brand, the website, the code, and the
            underlying product. You may not copy or rebrand the service.
          </p>
        </section>

        <section>
          <h2>6. Disclaimer</h2>
          <p>
            The service is provided &quot;as is&quot;, without warranties of any kind. AI-generated
            text may contain errors, omissions, or inaccuracies.{" "}
            <strong>Always review the output before sending it to a client.</strong> ProposalKit is
            not liable for business decisions made based on generated content.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the service after changes
            are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:hello@proposalkit.app">hello@proposalkit.app</a>.
          </p>
        </section>
      </article>

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
