import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Business Proposal Generator for Contractors | ProposalKit",
  description:
    "Generate professional contractor proposals in 30 seconds. Free AI proposal tool for plumbers, electricians, roofers, and general contractors.",
};

export default function ContractorsPage() {
  return (
    <ForLandingTemplate
      profession="Contractors"
      h1="Free Business Proposal Generator for Contractors"
      tagline="Win more jobs with professional proposals. No paperwork, no templates — just fill in the details and get a complete proposal in 30 seconds."
      features={[
        {
          icon: "🏆",
          title: "Look more professional than competitors",
          desc: "Clients choose contractors who present themselves professionally. A clear, detailed proposal builds trust before the job starts.",
        },
        {
          icon: "🔧",
          title: "Works for any trade",
          desc: "Plumbing, electrical, roofing, HVAC, general contracting, landscaping — the AI adapts to your specific trade.",
        },
        {
          icon: "💵",
          title: "Clear pricing & scope",
          desc: "Avoid scope creep by clearly defining what's included — and what's not — before work begins.",
        },
        {
          icon: "📄",
          title: "PDF ready to email",
          desc: "Download your proposal as a PDF and attach it to your estimate email. Clean, professional, done.",
        },
      ]}
      whatIncludes={[
        "Executive Summary — project overview and your qualifications",
        "Scope of Work — detailed description of what you will and won't do",
        "Materials & Labor Breakdown",
        "Project Timeline — start date, milestones, completion",
        "Total Investment & Payment Schedule",
        "Warranty & Guarantee Terms",
        "How to Accept & Next Steps",
      ]}
      faqs={[
        {
          q: "Do contractors need written proposals?",
          a: "Yes — a written proposal protects both you and the client. It documents what was agreed, prevents disputes about scope, and makes you look more professional than competitors who only give verbal quotes.",
        },
        {
          q: "What's the difference between a proposal and an estimate?",
          a: "An estimate is just a price. A proposal includes the price plus the scope of work, timeline, terms, and a clear call to action. Proposals close more jobs because they answer the client's questions before they ask.",
        },
        {
          q: "How do I write a contractor proposal?",
          a: "Start with your client's name and the job address, describe the full scope of work, list the materials you'll use, provide a timeline, and state your price clearly. ProposalKit structures all of this automatically based on what you enter.",
        },
        {
          q: "Is this free for contractors?",
          a: "Yes. The first proposal is completely free with no account needed. Sign in with Google for up to 5 free proposals per month.",
        },
      ]}
      ctaLabel="Generate Your Contractor Proposal — Free"
    />
  );
}
