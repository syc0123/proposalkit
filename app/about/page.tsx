import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About — ProposalKit",
  description: "ProposalKit helps small business owners create professional proposals in 30 seconds using AI.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">About ProposalKit</h1>

          <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
            <p>
              ProposalKit is a free AI-powered proposal generator built for small business owners —
              plumbers, consultants, designers, contractors, and freelancers who need to win clients
              without spending hours writing proposals.
            </p>

            <p>
              Most proposal tools (Proposify, PandaDoc) cost $19–$29/month and require learning
              complex editors. ProposalKit takes a different approach: enter 3 lines of information,
              and our AI generates a complete, professional proposal in under 30 seconds.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">How it works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your industry, client name, scope of work, and budget.</li>
              <li>Click &quot;Generate Proposal&quot; — our AI writes a full proposal tailored to your industry.</li>
              <li>Edit the result inline if needed, then copy and send to your client.</li>
            </ol>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">What makes it different</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Free to start</strong> — no credit card required. Guest users get 1 free proposal per session.</li>
              <li><strong>30-second generation</strong> — powered by Google Gemini 2.5 Flash.</li>
              <li><strong>Industry-aware</strong> — the AI uses terminology appropriate for your specific trade or profession.</li>
              <li><strong>Editable output</strong> — tweak the generated proposal directly in the browser before sending.</li>
            </ul>

            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">Pricing</h2>
            <p>
              ProposalKit is free for up to 5 proposals per month after signing in with Google.
              A Pro plan with unlimited proposals is coming soon.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Try it free — no sign-up required
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
