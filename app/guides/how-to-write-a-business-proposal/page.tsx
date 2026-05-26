import { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "How to Write a Business Proposal (Step-by-Step Guide) | ProposalKit",
  description:
    "A practical guide to writing business proposals that win clients. Covers structure, language patterns, pricing presentation, and common mistakes.",
  openGraph: {
    title: "How to Write a Business Proposal: Complete Guide",
    description:
      "Step-by-step framework for writing proposals that convert prospects into clients.",
  },
};

export default function HowToWriteProposalGuide() {
  return (
    <GuideLayout
      slug="how-to-write-a-business-proposal"
      title="How to write a business proposal that actually wins clients"
      description="A practical, no-fluff guide to the eight-section structure used by closers across freelance, agency, and consulting work — with the language patterns and pricing logic that separate winning proposals from generic ones."
      publishedDate="April 2026"
      readingTime="14 min"
      intro="Most business proposals lose for the same three reasons: they open with the wrong information, they describe activities instead of outcomes, and they end with a vague call to action. This guide walks through the eight sections every proposal should contain, with specific language examples drawn from proposals that have closed seven-figure deals in marketing, consulting, design, and skilled trades."
      sections={[
        {
          heading: "What a business proposal actually is (and isn't)",
          paragraphs: [
            "A business proposal is a written commercial document that defines a specific piece of work, its price, its timeline, and the terms under which it will be performed. It exists to convert a buyer's interest into a signed agreement. A proposal is not a marketing brochure, a sales deck, or a contract — though it often borrows elements from all three.",
            "The single most common mistake new business owners make is treating proposals interchangeably with quotes or estimates. A quote is just a price. An estimate is a rough price range with light scope. A proposal is a complete document that binds the commercial terms of the engagement and serves as the basis for the contract that follows. Sending an estimate when you should have sent a proposal is the easiest way to lose a deal to a more thorough competitor.",
            "Proposals are also not contracts. The proposal handles scope, deliverables, timeline, and price — the commercial layer. The contract handles legal terms like intellectual property, indemnification, governing law, and dispute resolution. Many small businesses combine both into one document; that's fine, but understanding the distinction helps you write each section better.",
          ],
        },
        {
          heading: "Section 1: The cover (date, addressee, project title)",
          paragraphs: [
            "Open with a clean cover that includes the date, the name of the person you're submitting to, their company, and a one-line project title. 'Q2 2026 Brand Refresh — Acme Corp — Submitted April 14, 2026' is enough. Skip the generic 'Dear Sir/Madam' opener. If you don't know the recipient's name, you haven't done enough discovery to send a proposal.",
            "If your business has a logo, place it discreetly at the top — not at the size of a movie poster. Buyers care about whether you can do the work; they don't need to see your branding fight for attention with theirs. The cover sets the tone of professionalism without consuming a page of real estate.",
          ],
        },
        {
          heading: "Section 2: Executive summary",
          paragraphs: [
            "The executive summary is the most-read section of any proposal, and the only section many decision-makers will read in full. It should be a single page (or 200–300 words) that summarizes the entire proposal: the client's situation in one paragraph, your proposed approach in one paragraph, and the total investment plus timeline in one paragraph.",
            "Write the executive summary last. You can't summarize what you haven't written yet. The mistake most freelancers make is writing the summary first while their thinking is still unformed, then leaving it half-written when they revise the body. By writing it last, the summary captures the actual proposal — not the proposal you intended to write.",
            "Lead with the client's situation in their language. 'Your team is evaluating a refresh of the Acme brand following the Series B raise. You've identified three priorities: a refreshed visual identity, an updated voice and tone framework, and a tighter customer-facing message hierarchy.' That single sentence proves you listened and frames everything that follows as a solution to a real business need.",
          ],
        },
        {
          heading: "Section 3: Problem statement (or situation analysis)",
          paragraphs: [
            "This section articulates the underlying business problem in more depth — typically 2–4 paragraphs. Where the executive summary states what you heard, the problem statement explains why it matters and what's at stake if it isn't addressed.",
            "Use cause-and-effect language. 'The current brand was designed in 2019 when Acme was a five-person engineering-led team. Today the company has 40+ employees and a different ICP, and the brand reads as more technical than the new buyer expects. This mismatch is likely contributing to lower-than-expected inbound conversion rates and longer-than-expected sales cycles.' That paragraph turns 'we need a rebrand' into 'we need a rebrand because of three specific business symptoms.'",
            "Avoid blaming previous vendors, internal teams, or the client. The problem statement is a diagnosis, not an indictment. Frame everything in neutral, observable terms: 'The current state has these characteristics, which produce these business outcomes, which the client wants to change.'",
          ],
        },
        {
          heading: "Section 4: Proposed solution and approach",
          paragraphs: [
            "Now describe what you'll do — but at a strategic level, not a tactical one. The reader should finish this section understanding your methodology, why it fits their problem, and what makes your approach different from a generic vendor. Save the detailed deliverables for the next section.",
            "Lead with the framework or method you'll use. 'Our approach is structured in three phases: a positioning sprint to align the executive team on target audience and message hierarchy, a visual exploration phase that produces three distinct directions for selection, and a system build phase that produces the final brand kit and usage guidelines.' That paragraph signals seniority and a repeatable process.",
            "Tie each phase to an outcome. 'Phase 1 results in a written positioning brief signed off by your CEO and CMO. Phase 2 results in a single chosen visual direction. Phase 3 results in a finished brand system ready for application across web, sales materials, and product UI.' Buyers should be able to read this section and instantly understand what they get after each phase.",
          ],
        },
        {
          heading: "Section 5: Scope of work (deliverables)",
          paragraphs: [
            "This is where the proposal becomes a contract-level document. List every deliverable as a countable, specific item. 'A complete brand system' is not a deliverable. '1 logo (primary + 2 variations), 1 type system (3 fonts mapped to 6 use cases), 1 color system (8 colors with usage rules), 1 brand voice document (8 pages, including 12 example sentences), 1 90-page brand guidelines PDF' is a deliverable list.",
            "Critically, add an 'Out of scope' subsection. List everything a reasonable buyer might assume is included but isn't: 'This proposal does not include website design, social media template creation, or printed marketing materials. These can be added as Phase 4 at separately quoted rates.' Spelling out exclusions prevents the most common form of scope creep — the soft assumption that 'while you're at it' tasks are part of the package.",
            "For each deliverable, include a brief description of what 'done' looks like. The buyer should never have to ask 'when is the logo considered final?' The proposal should answer: 'The logo is considered final when delivered in the agreed file formats (.ai, .eps, .svg, .png at 3 resolutions) and accompanied by usage guidelines.' Define the finish line in advance.",
          ],
        },
        {
          heading: "Section 6: Timeline and milestones",
          paragraphs: [
            "Present the timeline as a sequence of milestones tied to deliverables, not as a calendar of meetings. 'Week 1: kickoff meeting' is the wrong framing. 'Milestone 1 (by end of Week 2): written positioning brief delivered for client review' is the right framing. Milestones make the timeline measurable.",
            "Include explicit dependencies on the client. 'This timeline assumes client provides final inputs and approvals within 3 business days of each milestone. Delays in client response will extend the timeline by an equal duration.' This isn't pedantic — it's the documentation that protects your delivery date when the client's team is slow to respond.",
            "Allow buffer time. The most common reason proposals lose credibility post-acceptance is missed timelines. Quote 25–40% more time than your best-case estimate. Buyers don't know your internal velocity, so a slightly longer timeline reads as 'they're being honest about how long good work takes' rather than 'they're slow.'",
          ],
        },
        {
          heading: "Section 7: Investment (pricing)",
          paragraphs: [
            "Lead with the total before breaking down components. 'Total investment for the brand refresh: $42,000.' Putting the total first respects the reader's time and avoids the awkward 'so what's the total?' moment. Following the total, break it down by phase or deliverable so the reader can see how the number was built.",
            "Use the word 'investment' rather than 'cost' or 'price.' This is not corporate fluff; it's a real psychological signal. 'Cost' implies expense to be minimized. 'Investment' implies value to be evaluated. Many proposals report 15–25% higher acceptance rates after this single word change.",
            "Specify the payment schedule explicitly: 'Payment schedule: 33% retainer due upon signed agreement, 33% due upon delivery of positioning brief, 34% due upon delivery of final brand system.' Tying payments to deliverables protects both sides and creates the structured checkpoints that distinguish a real engagement from an open-ended project.",
            "If you offer multiple pricing options (a 'good/better/best' menu), present them as three columns, with the recommended option in the middle and visually highlighted. Most buyers will choose the middle option — it's a well-documented behavioral pattern. Use this consciously: design your middle option to be the engagement you actually want to deliver.",
          ],
        },
        {
          heading: "Section 8: Acceptance and next steps",
          paragraphs: [
            "Don't end with 'Looking forward to hearing your thoughts.' End with a specific next action: 'To accept this proposal, reply to this email confirming acceptance. Upon receipt of confirmation, we will send a signed agreement via DocuSign and invoice for the initial 33% retainer ($13,860). Work will commence within 5 business days of payment receipt.' Specificity converts.",
            "Include a proposal expiration date. 'This proposal is valid through May 14, 2026. Pricing and availability are subject to change after that date.' Short expirations move serious buyers forward and let you politely close the loop on prospects who shop forever. Two to four weeks is a reasonable default.",
            "Provide your direct contact details for questions: a name, an email, and a phone number. Make it easy to ask a quick question without escalating to a full meeting. Many proposals are accepted after a 10-minute clarifying call — you can't have that call if your contact info is buried.",
          ],
        },
        {
          heading: "Common mistakes that cost you the deal",
          paragraphs: [
            "Mistake one: opening with your company's history. Every page the buyer spends reading about you is a page they're not reading about their own problem. Lead with their situation; save your bio for the final page.",
            "Mistake two: padding the proposal to look more impressive. A focused six-page proposal outperforms a generic 30-page one. Pages don't earn fees; clarity does. Decision-makers reading proposals across multiple vendors will favor the one they can absorb fastest.",
            "Mistake three: vague scope. 'A modern responsive website' could mean five pages or fifty. 'A 12-page responsive website with a CMS, blog, contact form, and Shopify integration' is enforceable. Specificity protects you from scope creep and signals to the buyer that you've thought through the work.",
            "Mistake four: hourly pricing in the proposal. The moment a buyer sees an hourly rate, they begin doing math: 'how many hours should this really take?' A fixed price or value-based price avoids that conversation entirely and lets you charge for outcomes, not time.",
            "Mistake five: weak acceptance step. 'Let me know if you have any questions' is not a next step. 'Reply to this email to accept; we'll send a contract and invoice within 24 hours' is. The harder you make it for the buyer to act, the more likely they postpone the decision indefinitely.",
          ],
        },
        {
          heading: "When to use a proposal vs. simpler alternatives",
          paragraphs: [
            "Not every opportunity requires a full proposal. For small repair jobs, simple one-off tasks, or quick consulting calls, a short email with scope and price is enough. The right format depends on the dollar size of the engagement, the complexity, and the buyer's expectations.",
            "Use a proposal when: the engagement value is above $1,500–$3,000, the work has multiple phases or deliverables, the buyer is comparing you to other vendors, or the relationship is new and needs structure. Use a quote or estimate when: the engagement is straightforward, the buyer is repeat business, or the dollar size doesn't justify the proposal effort.",
            "A useful rule of thumb: if drafting the proposal will take you more than 90 minutes, you should be charging enough for the engagement that the time is worth it. If you find yourself spending hours on proposals for $500 jobs, your minimum project size is probably too low — not your proposal process.",
          ],
        },
      ]}
      relatedGuides={[
        { href: "/guides/proposal-vs-quote-vs-estimate", label: "Proposal vs. quote vs. estimate: which one to send" },
        { href: "/guides/proposal-pricing-strategies", label: "Proposal pricing strategies that win at full fee" },
        { href: "/for/freelancers", label: "Freelance proposals — playbook and template" },
      ]}
    />
  );
}
