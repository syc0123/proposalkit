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
          <Link href="/about">About</Link>
          <Link href="/guides">Guides</Link>
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
            ProposalKit (&quot;we&quot;, &quot;our&quot;, or &quot;the service&quot;) is a free web
            application that helps small business owners and freelancers draft client proposals
            using AI. This Privacy Policy explains what information we collect, why we collect it,
            how we use and share it, what your rights are, and the choices available to you. We
            collect the minimum information necessary to operate the service, and we never sell
            personal data to third parties.
          </p>

          <p>
            This policy applies to all users of the ProposalKit website at proposalkit.pages.dev,
            including guest users (those who use the service without signing in) and registered
            users (those who sign in with their Google account). By using the service, you consent
            to the collection and use of information as described in this policy. If you do not
            agree with any part of this policy, please do not use the service.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect three categories of information:</p>
            <h3>Account Information (registered users only)</h3>
            <p>
              When you sign in with Google, we receive your name, email address, and a stable Google
              account identifier (the &quot;sub&quot; field from the Google ID token). We do not
              receive your Google password, payment methods, contacts, calendar, or any other Google
              data beyond what is strictly required to identify you between sessions. The Google
              sub-identifier is used as the primary key for your usage records in our database.
            </p>
            <h3>Proposal Inputs</h3>
            <p>
              When you generate a proposal, the form fields you fill in (industry, your name or
              business name, client name, scope of work, budget, and timeline) are transmitted to
              our API and forwarded to the Google Gemini API for processing. These inputs are not
              stored on our servers — they exist only in the request lifecycle and the response is
              returned directly to your browser. We do not retain the contents of the proposals you
              generate.
            </p>
            <h3>Usage Data</h3>
            <p>
              We collect aggregate usage data necessary to operate the service: counts of proposals
              generated per user per month (to enforce the free-tier limit of 5 proposals per
              calendar month), HTTP request metadata such as user-agent and approximate geographic
              region (for abuse prevention), and standard server logs that may include IP addresses
              and request timestamps. Server logs are retained for up to 30 days and then deleted.
              We do not link IP addresses to individual user accounts in our application database.
            </p>
            <h3>Feedback You Submit</h3>
            <p>
              If you submit feedback through the in-app Feedback button or send email to one of our
              contact addresses, we receive the content of your message, the email address you
              provide (if any), and the timestamp. Feedback messages are stored in our database
              indefinitely so we can act on them, identify patterns, and follow up with you if you
              opted in. You can request deletion of your feedback at any time.
            </p>
          </section>

          <section>
            <h2>2. How We Use Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>
                <strong>Service delivery.</strong> To generate the proposals you request, manage
                your account, enforce the free-tier usage limit, and provide customer support when
                you contact us.
              </li>
              <li>
                <strong>Abuse prevention.</strong> To detect and prevent fraudulent use, rate-limit
                abuse, automated scraping, and security incidents.
              </li>
              <li>
                <strong>Service improvement.</strong> To analyze aggregate usage patterns,
                identify common failure modes, and prioritize product improvements. This analysis
                is performed on aggregated, anonymized data rather than individual records.
              </li>
              <li>
                <strong>Communication.</strong> To respond to your inquiries, send service-related
                notifications (e.g., security alerts, material changes to terms), and — only if you
                explicitly opt in — send occasional product updates.
              </li>
              <li>
                <strong>Legal compliance.</strong> To comply with applicable laws, respond to
                lawful requests from authorities, enforce our Terms of Service, and protect the
                rights and safety of ProposalKit, our users, and the public.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Share Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties for
              marketing or advertising purposes. We share information only with the third-party
              service providers required to operate ProposalKit:
            </p>
            <ul>
              <li>
                <strong>Google (Gemini API).</strong> Your proposal inputs are sent to the Google
                Gemini API to generate the proposal text. Google&apos;s handling of this data is
                governed by their{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and the Gemini API terms. According to Google&apos;s documentation, paid Gemini API
                inputs are not used to train their models; free-tier inputs may be used for service
                improvement. We use the paid API tier where applicable.
              </li>
              <li>
                <strong>Google (Sign-In with Google).</strong> If you choose to sign in, Google
                processes your authentication and shares your basic profile information with us.
                You can revoke this connection at any time in your Google Account settings.
              </li>
              <li>
                <strong>Cloudflare.</strong> Our application is hosted on Cloudflare Pages, and our
                rate-limit data is stored in Cloudflare KV. Cloudflare may process request metadata
                (IP, user-agent, headers) as part of standard CDN and security operations,
                governed by{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloudflare&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Resend.</strong> Feedback submissions trigger email notifications via the
                Resend API. Resend processes the email content and delivery metadata in accordance
                with{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Legal requirements.</strong> We may disclose information if required by
                applicable law, subpoena, court order, or other legal process, or if we believe in
                good faith that disclosure is necessary to protect rights, property, or safety.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Cookies, Local Storage, and Similar Technologies</h2>
            <p>
              ProposalKit uses minimal client-side storage to operate the service. We do not use
              third-party advertising cookies, tracking pixels, or cross-site analytics tools.
            </p>
            <ul>
              <li>
                <strong>Authentication cookie.</strong> When you sign in with Google, we set a
                secure HTTP-only JWT cookie (named per NextAuth conventions) to keep you signed in
                across requests. The cookie is set with the SameSite=Lax attribute and Secure flag,
                and is encrypted using the AUTH_SECRET key.
              </li>
              <li>
                <strong>Session storage.</strong> Guest users have a short marker in their browser
                session storage (key: <code>pk:guest_used</code>) used to track whether the
                one-per-session free generation has been used. Session storage clears automatically
                when you close the browser tab.
              </li>
              <li>
                <strong>Local storage.</strong> We save your most recently generated proposal in
                browser local storage (key: <code>pk:last_proposal</code>) so that it survives a
                page refresh. This data is stored only on your device, expires after 24 hours, and
                is never transmitted to our servers.
              </li>
              <li>
                <strong>Theme preference.</strong> Your light/dark theme preference is saved in
                local storage (key: <code>theme</code>) to remember your selection across sessions.
              </li>
            </ul>
            <p>
              You can clear all client-side storage by clearing your browser&apos;s site data for
              proposalkit.pages.dev. Doing so will sign you out and remove your saved theme
              preference and last-generated proposal.
            </p>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>
              We retain different categories of data for different periods, based on the minimum
              necessary to provide the service:
            </p>
            <ul>
              <li>
                <strong>Generated proposal content:</strong> Not stored on our servers. The proposal
                is returned to your browser and may be saved locally for 24 hours (see section 4).
              </li>
              <li>
                <strong>Usage counts:</strong> Monthly proposal counts in Cloudflare KV expire and
                are reset on the 1st of each calendar month UTC.
              </li>
              <li>
                <strong>Account records:</strong> Retained while your account is active. Deleted
                within 30 days of a verified deletion request, except where retention is required
                by law.
              </li>
              <li>
                <strong>Server logs:</strong> Retained for up to 30 days for security and abuse
                prevention purposes, then automatically purged.
              </li>
              <li>
                <strong>Feedback submissions:</strong> Retained indefinitely so we can act on
                product feedback. Deleted on request.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Your Rights (GDPR, CCPA, and Other Privacy Laws)</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights regarding your
              personal information:
            </p>
            <ul>
              <li>
                <strong>Right of access.</strong> You can request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Right to rectification.</strong> You can request correction of inaccurate
                or incomplete data.
              </li>
              <li>
                <strong>Right to erasure (&quot;right to be forgotten&quot;).</strong> You can
                request deletion of your account and associated data. We honor verified deletion
                requests within 30 days.
              </li>
              <li>
                <strong>Right to data portability.</strong> You can request your data in a
                machine-readable format.
              </li>
              <li>
                <strong>Right to object.</strong> You can object to certain types of processing,
                including any use of your data for direct marketing (we do not currently send
                marketing emails).
              </li>
              <li>
                <strong>Right to withdraw consent.</strong> Where processing is based on consent
                (e.g., optional newsletter signup), you can withdraw that consent at any time.
              </li>
              <li>
                <strong>Right to lodge a complaint.</strong> If you believe your privacy rights
                have been violated, you can file a complaint with your local data protection
                authority. For EU residents, see the{" "}
                <a
                  href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  list of national supervisory authorities
                </a>
                .
              </li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@proposalkit.app">privacy@proposalkit.app</a> from the email
              address associated with your account. We will verify your identity before fulfilling
              the request and will respond within 30 days.
            </p>
          </section>

          <section>
            <h2>7. Children&apos;s Privacy</h2>
            <p>
              ProposalKit is not directed to children under 16, and we do not knowingly collect
              personal information from children under 16. If you believe a child under 16 has
              provided us with personal information, please email us and we will delete the
              information promptly.
            </p>
          </section>

          <section>
            <h2>8. International Data Transfers</h2>
            <p>
              ProposalKit is operated from infrastructure provided by Cloudflare, which uses a
              global network. Your data may be processed in locations outside your country of
              residence, including the United States. By using the service, you consent to the
              transfer of your data to these locations. Where required by law, we rely on standard
              contractual clauses or other approved transfer mechanisms to protect your data during
              international transfers.
            </p>
          </section>

          <section>
            <h2>9. Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your information,
              including HTTPS encryption in transit, HTTP-only and Secure cookies, encrypted
              storage of API keys and secrets, and regular review of access controls. However, no
              transmission over the internet is 100% secure, and we cannot guarantee absolute
              security. You are responsible for keeping your Google account credentials safe and
              for promptly notifying us of any suspected unauthorized access.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time as the service evolves. When we
              make material changes, we will update the &quot;Last updated&quot; date at the top of
              this page and, for registered users, send an email notification if the changes
              materially affect how we process your data. Continued use of the service after the
              effective date of the changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>
              For privacy-specific questions, data requests, or to exercise your rights under this
              policy, email{" "}
              <a href="mailto:privacy@proposalkit.app">privacy@proposalkit.app</a>. For general
              support questions, see our <Link href="/contact">contact page</Link>. We aim to
              respond to all privacy inquiries within 5 business days.
            </p>
          </section>
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
