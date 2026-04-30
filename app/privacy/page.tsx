import { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Privacy Policy — ProposalKit",
  description:
    "How ProposalKit collects, uses, and protects your data. We don't sell data; we share only with the providers required to run the service.",
};

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="meta">Last updated: April 2026</p>
        </header>

        <p>
          ProposalKit (&quot;we&quot;, &quot;our&quot;) is a free tool that helps small business
          owners draft proposals. We collect the minimum information necessary to operate the
          service. This document explains what we collect, how we use it, and the choices you have.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              <strong>Account info.</strong> If you sign in with Google, we receive your name, email
              address, and a stable Google account identifier.
            </li>
            <li>
              <strong>Proposal inputs.</strong> The industry, client name, scope of work, and budget
              you enter into the form.
            </li>
            <li>
              <strong>Usage data.</strong> Aggregate counts of proposals generated, pages viewed,
              and basic device/browser metadata for reliability and abuse prevention.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use It</h2>
          <ul>
            <li>To generate the proposal you requested.</li>
            <li>
              To track free-tier usage (5 proposals per month per signed-in user).
            </li>
            <li>To improve output quality and detect failure modes in aggregate.</li>
            <li>
              To send occasional product updates — only if you&apos;ve opted in.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Data Sharing</h2>
          <p>
            We do not sell your data. We share data only with the providers required to run the
            service:
          </p>
          <ul>
            <li>
              <strong>Google Gemini API</strong> — receives your proposal inputs to generate the
              response.
            </li>
            <li>
              <strong>Cloudflare</strong> — hosts the site and runs the KV store used for
              rate-limit tracking.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies &amp; Storage</h2>
          <ul>
            <li>
              <strong>Session storage</strong> tracks the 1-per-session guest trial in your
              browser.
            </li>
            <li>
              <strong>Secure JWT cookie</strong> keeps you signed in once you authenticate with
              Google. The cookie is HttpOnly, SameSite=Lax, and Secure.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            Generated proposals are <strong>not stored</strong> on our servers — the AI response
            is returned directly to your browser. Free-tier usage counts in our KV store reset on
            the 1st of each month.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            You can request deletion of your account and associated data at any time by emailing
            us. We honor verified deletion requests within 30 days.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href="mailto:privacy@proposalkit.app">privacy@proposalkit.app</a> and we&apos;ll
            respond within a few business days.
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
