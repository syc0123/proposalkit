import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Business Proposal Generator for Freelancers | ProposalKit",
  description:
    "Create professional freelance proposals in 30 seconds. Free AI-powered proposal generator — enter your scope & budget, get a complete client-ready proposal.",
};

export default function FreelancersPage() {
  return (
    <ForLandingTemplate
      profession="Freelancers"
      h1="Free Business Proposal Generator for Freelancers"
      tagline="Stop losing clients to slow proposals. Generate a professional, client-ready proposal in 30 seconds — completely free."
      features={[
        {
          icon: "⚡",
          title: "Win clients faster",
          desc: "Send a polished proposal within minutes of a call — before your competitors do.",
        },
        {
          icon: "📋",
          title: "Covers every section",
          desc: "Executive summary, scope of work, timeline, pricing breakdown, and a clear call to action.",
        },
        {
          icon: "✏️",
          title: "Edit before you send",
          desc: "Tweak every line to match your voice and the client's needs — it's your proposal, AI just drafts it.",
        },
        {
          icon: "📄",
          title: "Download as PDF",
          desc: "Export to PDF with one click. Attach it to your email or share a clean document link.",
        },
      ]}
      whatIncludes={[
        "Executive Summary — who you are and what you'll deliver",
        "Problem Statement — the client's challenge you're solving",
        "Proposed Solution & Scope of Work",
        "Timeline & Milestones",
        "Investment (Pricing & Payment Terms)",
        "Why Choose You — your unique value",
        "Next Steps & How to Get Started",
      ]}
      faqs={[
        {
          q: "What should a freelance proposal include?",
          a: "A strong freelance proposal includes an executive summary, a clear description of the client's problem, your proposed solution, a detailed scope of work, timeline, pricing, and a call to action. ProposalKit generates all of these sections automatically.",
        },
        {
          q: "How long should a freelance proposal be?",
          a: "Most effective freelance proposals are 1-3 pages. They should be long enough to be thorough but short enough to respect the client's time. ProposalKit generates concise, focused proposals that hit the right length.",
        },
        {
          q: "Is ProposalKit really free?",
          a: "Yes — the first proposal is free with no sign-up required. Create a free account with Google to generate up to 5 proposals per month.",
        },
        {
          q: "Can I edit the generated proposal?",
          a: "Absolutely. Click the Edit button on any generated proposal to modify any section directly in the browser. When you're done, copy it to your clipboard or download as PDF.",
        },
      ]}
      ctaLabel="Generate Your Freelance Proposal — Free"
    />
  );
}
