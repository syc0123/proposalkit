import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Business Proposal Generator for Freelancers",
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
      longGuide={{
        title: "The freelancer's proposal playbook: from inquiry to signed contract",
        intro:
          "Freelance proposals occupy a strange middle ground. They need to be professional enough to compete with agencies and small consultancies, but personal enough to convey that the client is hiring an individual with a specific point of view. The pattern most freelancers fall into — copying agency-style proposals or sending a casual email with a price quote — loses on both fronts. This guide walks through how to write a freelance proposal that signals senior professionalism without pretending to be a firm, covers the legal and commercial basics, and converts inquiries to signed work at a higher rate than email-quote alternatives.",
        sections: [
          {
            heading: "1. Treat the proposal as a sales tool, not a contract",
            body: [
              "A common mistake is to write a proposal that reads like a legal document — dense, defensive, and full of terms that scare off the client before they've signed anything. The proposal's job is to win the work; the contract's job is to define the legal terms after the work is won. Keep the proposal in plain conversational English, focused on what you'll deliver and what it costs. Save the IP assignment, indemnification, governing law, and dispute resolution clauses for the contract you send after the client accepts the proposal.",
              "That said, the proposal still needs to bind the commercial terms (scope, price, timeline, payment schedule) clearly enough that the client cannot later claim they thought something different was included. Write each section as if you'll be reading it back to the client in a phone call if there's a dispute six months later. If a clause is too vague to defend in that conversation, it's too vague.",
            ],
          },
          {
            heading: "2. Open with the client's situation, in their words",
            body: [
              "Don't open with 'About me' or your portfolio. Open with one paragraph that proves you listened. 'You mentioned during our call that your e-commerce site is built on Shopify but the product page conversion rate has stalled around 1.8% for the last 9 months. The Tuesday redesign launch increased mobile traffic but not mobile checkout completion. You're looking for someone to audit the funnel and rebuild the product detail page template before the holiday push in October.' That paragraph does more to win the work than three pages of capability content.",
              "Use the client's exact language wherever possible. If they said 'product detail page,' don't translate that to 'PDP.' If they said 'holiday push,' don't rewrite it as 'Q4 seasonal sales window.' Mirroring builds trust and signals you understood the conversation, not just the surface request.",
            ],
          },
          {
            heading: "3. Scope work as a list of countable deliverables",
            body: [
              "Replace vague scope with countable units. Instead of 'I will redesign your product page,' write '1 redesigned product detail page template covering 4 product types (apparel, accessories, footwear, gift cards). 1 A/B test setup comparing current vs. new template via Shopify Plus Launchpad. 1 deliverables document with implementation specs for your developer. 1 follow-up review session 14 days after launch.' Countability turns scope from an opinion into a definition.",
              "Add a short 'not included' subsection to address the most common assumptions: 'This proposal does not include implementing the new template into your live theme — that requires developer time and is outside scope. It also does not include rewriting product copy or sourcing new imagery; existing copy and assets will be used. Adding these is possible as a Phase 2 engagement.' Most scope creep dies in this paragraph.",
            ],
          },
          {
            heading: "4. Set a payment schedule that protects your cash flow",
            body: [
              "Avoid the temptation to invoice 100% on completion. For most freelance work, the right structure is 40–50% deposit at signing, with the remainder due at delivery or milestone completion. For projects longer than four weeks, split the remainder into milestones: 'Total fee $4,800. Payment schedule: 50% ($2,400) due upon proposal acceptance to schedule the work, 25% ($1,200) due upon delivery of design comp for review, 25% ($1,200) due upon delivery of final files.' This protects you against ghosting clients and gives the client structured checkpoints to confirm progress.",
              "State payment methods, due dates, and late fees explicitly: 'Invoices are due within 7 days. Payments accepted via direct bank transfer or Stripe. Invoices not paid within 14 days incur a 1.5% monthly late fee.' Most freelancers under-collect late fees not because they're missing from the proposal, but because they were never written down in the first place. Once they're in writing, you can defend them.",
            ],
          },
          {
            heading: "5. Set a realistic timeline with explicit dependencies",
            body: [
              "Project delays in freelance work are almost always caused by the client side: late asset delivery, slow approvals, missing brand guidelines. The proposal should make these dependencies explicit and tie the timeline to them. 'Estimated completion: 18 working days from kickoff, assuming brand assets and final product copy are delivered within 3 business days of signing. Each day of delay in asset delivery extends the completion date by one working day.' Now you have a documented basis to push back when scope-by-scope-creep starts.",
              "Build in a buffer. If you genuinely think the work will take 14 days, quote 18. Quoting your best-case timeline and then missing it by a few days hurts your reputation more than quoting a slightly longer timeline and finishing early. A common habit among experienced freelancers is to pad the internal estimate by a meaningful margin, and the gap is invisible to clients because they expect a buffer anyway.",
            ],
          },
          {
            heading: "6. Address the 'why you' question with one short paragraph",
            body: [
              "Don't include a multi-page 'About me' section. Senior freelancers earn their fees by demonstrating thinking, not by listing accomplishments. One paragraph of 3–5 sentences is enough: 'I focus on conversion-focused product page work for Shopify and Shopify Plus brands. A common pattern is teams treating the product page as a static brochure when it should be the conversion engine. The approach combines funnel data, qualitative session reviews, and a small set of proven layout patterns.' That paragraph beats a portfolio link.",
              "If the client asked for portfolio samples, include 2–3 links inline rather than a separate document. Each link should have one sentence of context naming the specific outcome you delivered — for example, the conversion metric a redesign moved and over what window. Specificity signals confidence; bulk linking signals desperation.",
            ],
          },
          {
            heading: "7. Close with a specific, frictionless acceptance step",
            body: [
              "Don't end with 'Let me know if you have any questions.' End with an explicit next action: 'To move forward, reply to this email confirming acceptance and I will send a contract for e-signature via HelloSign. Upon receipt of signed contract and 50% deposit ($2,400), I will schedule kickoff within 5 business days. The proposed start date assumes acceptance by Friday — beyond that I will need to update the timeline based on current availability.'",
              "Include a proposal expiration: 'This proposal is valid through [14 days from issue]. Pricing and availability are subject to change after that date.' Short expirations move serious buyers forward and let you politely close the loop on tire-kickers. Two weeks is a reasonable default — enough time for the client to think, not so long that your pipeline stalls.",
            ],
          },
        ],
      }}
      faqs={[
        {
          q: "What should a freelance proposal include?",
          a: "A strong freelance proposal opens with a one-paragraph restatement of the client's situation in their own language, demonstrating that you listened during discovery. It then defines the scope of work as a list of countable deliverables — not vague descriptions — with a separate 'not included' subsection to head off scope creep. The proposal should include a payment schedule with a 40–50% deposit and milestone-based progress payments, a realistic timeline tied to explicit client-side dependencies (asset delivery deadlines, approval windows), a short paragraph addressing why you specifically are the right freelancer for the work, and a specific acceptance procedure with a proposal expiration date. ProposalKit generates the full structured draft based on your discovery details so you can focus on refining the language.",
        },
        {
          q: "How long should a freelance proposal be?",
          a: "Two to four pages is right for most freelance engagements under $20,000. Longer than four pages and you start to look like an agency padding the document; shorter than two and you risk looking like you didn't take the opportunity seriously. The proposal should be long enough to demonstrate that you understood the problem and have a clear, defensible approach, and short enough that the client can read it in 5–8 minutes and forward it to their CFO or partner with a one-line note. If the engagement is larger than $20,000 or involves multiple phases, 5–8 pages is appropriate. Anything beyond that should probably be split into a short proposal plus a separate detailed scope-of-work document.",
        },
        {
          q: "Is ProposalKit really free?",
          a: "Yes. The first proposal is completely free with no account required — guests can generate one proposal per browser session, which is enough to evaluate whether the output meets your standards. After signing in with a free Google account, you get five proposals per calendar month, which covers most freelancers doing 2–4 client conversations per week. There is no credit card required, no trial that converts to a paid plan, and no automatic charges. A paid Pro tier with unlimited generations, custom templates, and branded PDF export is on the roadmap but not yet launched. Until then, the free tier is the full product for most freelancers.",
        },
        {
          q: "Can I edit the generated proposal?",
          a: "Yes — the generated proposal is yours to refine before you send it. Every proposal includes an inline Edit button that lets you modify any sentence, add custom clauses, adjust the tone, or rewrite entire sections directly in your browser without re-running generation. Most freelancers spend 5–10 minutes editing the AI draft to match their voice and add specifics the AI cannot know (your exact rate, your specific portfolio links, your jurisdiction-specific terms). The generated output is best treated as a strong first draft that handles the structure and standard language for you, freeing your time to focus on the customization that actually wins the client.",
        },
      ]}
      ctaLabel="Generate Your Freelance Proposal — Free"
    />
  );
}
