import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — ProposalKit",
  description: "Terms and conditions for using ProposalKit.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using ProposalKit, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Service Description</h2>
              <p>ProposalKit is a free AI-powered proposal generator for small business owners and freelancers. We use Google Gemini to generate professional business proposals based on inputs you provide.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Free Tier Limits</h2>
              <p>Guest users may generate one (1) proposal per session. Registered users may generate up to five (5) proposals per calendar month at no charge. Additional usage will require a paid plan (coming soon).</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Acceptable Use</h2>
              <p>You agree not to use ProposalKit to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Generate fraudulent, misleading, or deceptive proposals.</li>
                <li>Attempt to circumvent rate limits through automated requests.</li>
                <li>Use the service for any unlawful purpose.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Intellectual Property</h2>
              <p>You own the proposals you generate. ProposalKit retains no rights to your generated content. The ProposalKit platform, branding, and source code remain our intellectual property.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Disclaimer of Warranties</h2>
              <p>ProposalKit is provided &quot;as is&quot; without warranties of any kind. AI-generated proposals should be reviewed before sending to clients. We are not responsible for the outcome of proposals sent to your clients.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Changes to Terms</h2>
              <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Contact</h2>
              <p>Questions about these terms? Contact us at: <strong>hello@proposalkit.app</strong></p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
