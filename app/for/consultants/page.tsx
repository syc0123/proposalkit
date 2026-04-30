import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Business Proposal Generator for Consultants | ProposalKit",
  description:
    "Generate professional consulting proposals in 30 seconds. Free AI proposal tool for business, marketing, HR, and strategy consultants.",
};

export default function ConsultantsPage() {
  return (
    <ForLandingTemplate
      profession="Consultants"
      h1="Free Business Proposal Generator for Consultants"
      tagline="Your expertise is valuable. Make sure your proposal reflects it. Generate a clear, compelling consulting proposal in 30 seconds — free."
      features={[
        {
          icon: "🎖️",
          title: "Position your expertise",
          desc: "A well-structured proposal demonstrates your strategic thinking before the engagement even begins.",
        },
        {
          icon: "📊",
          title: "Outcome-focused structure",
          desc: "Frame your proposal around the client's desired outcomes, not just the tasks you'll perform.",
        },
        {
          icon: "💼",
          title: "Works for any consulting niche",
          desc: "Business strategy, marketing, HR, operations, financial consulting — the AI adapts to your specialty.",
        },
        {
          icon: "📄",
          title: "PDF ready to send",
          desc: "Download your proposal as a PDF and attach it to your follow-up email after a discovery call.",
        },
      ]}
      whatIncludes={[
        "Executive Summary — the client's situation and your solution",
        "Problem Statement — the challenge you've identified",
        "Proposed Engagement — your methodology and approach",
        "Scope of Work & Deliverables",
        "Engagement Timeline & Milestones",
        "Investment — fees and payment terms",
        "Why Work With You — credentials and approach",
        "Next Steps — how to move forward",
      ]}
      faqs={[
        {
          q: "What should a consulting proposal include?",
          a: "A strong consulting proposal demonstrates that you understand the client's problem, explains your methodology, defines deliverables clearly, states your fees, and shows why you're the right person. ProposalKit structures all of this automatically.",
        },
        {
          q: "How do I price consulting services in a proposal?",
          a: "Present fees as an investment tied to outcomes. Use terms like 'engagement fee' rather than 'hourly rate' where possible. Break fees into phases if the engagement is long.",
        },
        {
          q: "Should I send a proposal before or after a discovery call?",
          a: "Always after. A proposal should reflect your understanding of the client's specific situation. Use ProposalKit to quickly generate a customized proposal immediately after your call while the conversation is fresh.",
        },
        {
          q: "How long should a consulting proposal be?",
          a: "1-4 pages for most projects. Decision-makers are busy — a concise, focused proposal that directly addresses their problem performs better than a lengthy document.",
        },
      ]}
      ctaLabel="Generate Your Consulting Proposal — Free"
    />
  );
}
