import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Proposal Generator for Marketing & Creative Agencies | ProposalKit",
  description:
    "Generate professional agency proposals in 30 seconds. Free AI proposal tool for marketing, advertising, PR, and creative agencies.",
};

export default function AgenciesPage() {
  return (
    <ForLandingTemplate
      profession="Agencies"
      h1="Free Proposal Generator for Marketing & Creative Agencies"
      tagline="Win more pitches. Generate a polished, client-ready agency proposal in 30 seconds — without the all-night deck scramble."
      features={[
        {
          icon: "🚀",
          title: "Pitch faster",
          desc: "Respond to RFPs and new business inquiries the same day. Speed signals commitment and often wins the deal.",
        },
        {
          icon: "📈",
          title: "Outcome-driven framing",
          desc: "Frame your proposal around business results — leads, revenue, brand awareness — not just deliverables.",
        },
        {
          icon: "🎨",
          title: "Works for any service",
          desc: "SEO, paid media, social media management, branding, PR, content marketing — the AI adapts to your agency's specialty.",
        },
        {
          icon: "📄",
          title: "Export to PDF",
          desc: "Download a clean PDF version to attach to your email pitch or send as a formal proposal document.",
        },
      ]}
      whatIncludes={[
        "Executive Summary — the client's opportunity and your approach",
        "Situation Analysis — where the client stands today",
        "Proposed Strategy & Services",
        "Scope of Work & Deliverables",
        "Campaign Timeline & Milestones",
        "Investment & Retainer Structure",
        "Why Our Agency",
        "Next Steps — how to get started",
      ]}
      faqs={[
        {
          q: "What should a marketing agency proposal include?",
          a: "A strong agency proposal includes a situation analysis showing you understand the client's market, a clear strategy tied to their business goals, specific deliverables, a timeline, your pricing structure, and a compelling reason to choose your agency.",
        },
        {
          q: "How do agencies typically price proposals?",
          a: "Agencies use retainer models (monthly fee for ongoing services), project-based pricing (fixed fee for a defined scope), or performance-based pricing. State clearly which model you're proposing and what's included.",
        },
        {
          q: "How quickly should I respond to a new business inquiry?",
          a: "Same day or next day. Clients often reach out to multiple agencies at once — the first credible proposal often sets the benchmark. ProposalKit lets you generate a first draft in 30 seconds.",
        },
        {
          q: "Should agency proposals include case studies?",
          a: "Yes — but keep them brief. One or two relevant examples as bullet points in the 'Why Our Agency' section is sufficient for the initial proposal. Save detailed case studies for follow-up presentations.",
        },
      ]}
      ctaLabel="Generate Your Agency Proposal — Free"
    />
  );
}
