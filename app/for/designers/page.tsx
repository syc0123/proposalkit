import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Proposal Generator for Web Designers & Developers | ProposalKit",
  description:
    "Generate professional web design and development proposals in 30 seconds. Free AI proposal tool built for designers, developers, and UX professionals.",
};

export default function DesignersPage() {
  return (
    <ForLandingTemplate
      profession="Designers & Developers"
      h1="Free Proposal Generator for Web Designers & Developers"
      tagline="Scope creep starts with a vague agreement. Write a clear, professional proposal before every project — in 30 seconds, free."
      features={[
        {
          icon: "🎯",
          title: "Prevent scope creep",
          desc: "A detailed proposal defines exactly what's included — saving you from 'can you just add one more thing' conversations.",
        },
        {
          icon: "🧾",
          title: "Itemized project breakdown",
          desc: "Break down your work into phases: discovery, design, development, testing, and launch.",
        },
        {
          icon: "💬",
          title: "Professional tone",
          desc: "Impress clients with polished business language that positions you as a trusted partner, not just a vendor.",
        },
        {
          icon: "📄",
          title: "PDF export",
          desc: "Download your proposal as a clean PDF and attach it to your project kickoff email.",
        },
      ]}
      whatIncludes={[
        "Executive Summary — project goals and your approach",
        "Problem Statement — what the client needs to solve",
        "Proposed Solution — your design/dev strategy",
        "Scope of Work — pages, features, deliverables",
        "Project Timeline — phases and milestones",
        "Investment — total fee and payment schedule",
        "Next Steps — how to approve and kick off",
      ]}
      faqs={[
        {
          q: "What should a web design proposal include?",
          a: "A strong web design proposal covers: your understanding of the client's goals, the scope of work (number of pages, features, revisions), your design process, the project timeline, pricing, and clear next steps. ProposalKit generates all of these.",
        },
        {
          q: "How do I handle revision rounds in a proposal?",
          a: "Be specific. Instead of 'unlimited revisions,' state '2 rounds of revisions per phase.' Edit the generated proposal to add your specific revision policy before sending.",
        },
        {
          q: "Should I include a contract in my proposal?",
          a: "A proposal covers scope and pricing — a contract covers legal obligations. Many designers combine both in one document. Use ProposalKit for the proposal sections, then add your contract terms.",
        },
        {
          q: "How do I price a web design project in a proposal?",
          a: "Present pricing as an 'investment' rather than a cost. Break it into phases (e.g. Discovery $X, Design $Y, Development $Z) so clients see the value at each step.",
        },
      ]}
      ctaLabel="Generate Your Design Proposal — Free"
    />
  );
}
