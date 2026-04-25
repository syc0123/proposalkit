import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — ProposalKit",
  description: "How ProposalKit collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
              <p>When you use ProposalKit, we may collect the following information:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Account information</strong>: When you sign in with Google, we receive your name and email address from Google.</li>
                <li><strong>Proposal inputs</strong>: The industry, client name, scope of work, and budget you enter to generate proposals.</li>
                <li><strong>Usage data</strong>: Pages visited, features used, and timestamps of actions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To generate AI-powered business proposals on your behalf.</li>
                <li>To track your monthly usage against the free tier limit (5 proposals/month).</li>
                <li>To improve the quality of proposal generation over time.</li>
                <li>To send product updates if you have opted in.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Data Sharing</h2>
              <p>We do not sell your personal information. We share data only with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Google Gemini API</strong>: Your proposal inputs are sent to Google&apos;s Gemini API to generate text. Google&apos;s privacy policy applies to this processing.</li>
                <li><strong>Cloudflare</strong>: We use Cloudflare Pages for hosting and Cloudflare KV for rate-limit tracking.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Cookies & Storage</h2>
              <p>We use session storage (not persistent cookies) to track your free trial usage as a guest. If you sign in, we use a secure JWT session cookie to keep you logged in.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Data Retention</h2>
              <p>Generated proposals are not stored on our servers — they are returned directly to your browser. Usage counts are stored in Cloudflare KV and reset automatically on the 1st of each month.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Your Rights</h2>
              <p>You may request deletion of your account and associated data at any time by contacting us at the email below.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Contact</h2>
              <p>For privacy-related questions, please contact us at: <strong>privacy@proposalkit.app</strong></p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
