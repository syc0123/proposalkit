import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Business Proposal Generator for Consultants",
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
      longGuide={{
        title: "The consultant's guide to proposals that close at full fee",
        intro:
          "Consulting proposals are different from contractor or design proposals because the deliverable is judgment, not artifacts. A client buying a kitchen remodel can see the kitchen at the end. A client buying strategy or organizational change is buying your thinking — which means your proposal has to demonstrate that thinking before they've paid you a dollar. This guide walks through how to structure a consulting proposal that earns your full fee without discounting, the language patterns that signal seniority, and the specific clauses that prevent the engagement from drifting into work you didn't price.",
        sections: [
          {
            heading: "1. Open with a situation analysis, not your credentials",
            body: [
              "Most consulting proposals open with 'About our firm' and three paragraphs of generic positioning. Buyers skip this. Instead, open with a one-page situation analysis: what you heard during discovery, what you observed, and what you believe the underlying problem is. 'During our discovery sessions, three patterns emerged: customer churn is concentrated in the 90-day post-onboarding window, the customer success team is structured around tickets rather than accounts, and the executive dashboard reports activation but not retention. Together these suggest that the current customer success function is optimized for the wrong outcome.' That single paragraph proves you listened and that you're already adding value.",
              "Save credentials for the back of the proposal, framed as 'Why work with us.' Senior buyers don't need to be sold on your resume — they're already considering you because of it. They need to see that you understand their specific situation. Lead with their problem, end with your qualifications.",
            ],
          },
          {
            heading: "2. Articulate the desired outcome in the client's language",
            body: [
              "Don't describe what you'll do. Describe what will be true when the engagement is over. 'At the end of this engagement, the leadership team will have a written customer retention strategy, an implementation roadmap with named owners, and a board-ready dashboard showing 30/60/90-day retention by cohort.' This is what executives buy — they buy a future state, not a process. Use language they used during your discovery call. If they said 'we need to stop the churn,' don't translate that to 'reduce attrition.' Mirror their words.",
              "Avoid jargon that signals you're a consultant talking to other consultants. 'Synergistic optimization' and 'value creation framework' don't impress real buyers. They make you sound interchangeable with every other firm that pitched them last quarter. Plain language signals senior thinking; jargon signals junior thinking dressed up.",
            ],
          },
          {
            heading: "3. Structure the engagement in phases with clear gates",
            body: [
              "A consulting engagement should have 3–4 phases, each ending with a deliverable the client signs off on before the next phase begins. A common structure: Phase 1 Diagnostic (2 weeks, interviews and data analysis, output is a written diagnostic memo), Phase 2 Design (3 weeks, workshops and decision frameworks, output is a written strategy document), Phase 3 Implementation Planning (2 weeks, roadmap and owner assignment, output is a 90-day execution plan).",
              "Tie payment to phase gates: 33% retainer at signing, 33% at diagnostic delivery, 34% at implementation plan delivery. This protects you against engagements that drift and gives the client structured checkpoints to evaluate progress. Critically, the proposal should state what triggers each payment — typically delivery of the named artifact, not the passage of time.",
            ],
          },
          {
            heading: "4. Be explicit about what is and isn't included",
            body: [
              "Consulting scope creep usually happens in one of three places: extra interviews, extra workshops, and 'just one more deliverable.' Address all three in the proposal. 'This engagement includes up to 12 stakeholder interviews. Additional interviews can be added at $X each. This engagement includes 2 workshops; additional workshops are billed at $Y per workshop including preparation time. This engagement produces the three named deliverables; ad-hoc analyses or memos outside this scope will be quoted separately.' Specificity prevents conversations that erode your margin.",
              "Also state what the client is responsible for: 'Client will provide access to relevant data within 5 business days, schedule stakeholder interviews within 2 business days of request, and designate a single point of contact for the engagement.' Most engagement delays are caused by the client side; the proposal should make their obligations explicit so delays don't become your problem.",
            ],
          },
          {
            heading: "5. Price by value, not by hours",
            body: [
              "Hourly billing caps your earnings at how fast you can work and signals to the client that they're buying time instead of outcomes. For most consulting engagements, fixed-fee or value-based pricing performs better. Calculate the fee based on the value the client receives — if you're saving them $500k annually, a $50k engagement fee is a 10x return and an easy approval. If you don't yet know the value, anchor on the cost of inaction: 'Without addressing this, projected revenue impact is $X over 12 months.'",
              "Never list your hourly rate in a proposal. The moment a client sees an hourly rate, they start doing math: 'How many hours is that really?' Instead, present the total engagement fee, broken into phase milestones. If the client asks about hours, redirect: 'We don't price by the hour because that creates the wrong incentives — to drag work out. We price by the outcome you receive.' This reframe is one of the single highest-leverage changes you can make to your proposals.",
            ],
          },
          {
            heading: "6. Address the 'why us' question without being defensive",
            body: [
              "Senior buyers will ask themselves 'why this firm?' even if they don't ask you directly. Address it in a short section near the end: three or four bullets that combine relevant experience with a unique point of view. 'We have led similar retention engagements at three Series B SaaS companies in the last 24 months. Our diagnostic methodology surfaces underlying causes, not just symptoms — typically uncovering 2–3 root issues that previous internal efforts missed. We work with executive teams, not just operational managers, which means our recommendations land in the room where decisions get made.' That's enough.",
              "Don't list every client logo you've ever worked with. Buyers know logos can be cherry-picked. Instead, give one or two specific outcomes with named (or describably anonymous) clients: 'Reduced 90-day churn by 32% over 6 months for a $40M ARR SaaS company in the legal tech space.' One specific outcome beats ten logos.",
            ],
          },
          {
            heading: "7. End with a clear next step and expiration",
            body: [
              "Don't end with 'Let me know what you think.' End with: 'To accept this proposal, please confirm acceptance by email and we will send a master services agreement for e-signature. Upon receipt of signed agreement and initial 33% retainer, Phase 1 Diagnostic will commence within 5 business days.' Specificity converts. Include the exact dollar amount of the retainer so the client doesn't have to do math.",
              "Add a proposal expiration: 'This proposal is valid through [30 days from issue]. Pricing and availability are subject to change after that date.' This is not a high-pressure tactic. It's a way to keep your pipeline moving and to surface the buyers who would otherwise come back months later asking for the same price. It also signals to serious buyers that your time is in demand.",
            ],
          },
        ],
      }}
      faqs={[
        {
          q: "What should a consulting proposal include?",
          a: "A strong consulting proposal opens with a one-page situation analysis that proves you understood the client's specific problem, then articulates the desired outcome in their language. It defines the engagement as 3–4 phases with named deliverables at each phase gate, ties payment milestones to deliverable acceptance, and is explicit about both inclusions (specific number of interviews, workshops, deliverables) and exclusions (what would trigger a scope expansion). It closes with a short credentials section, a specific acceptance procedure, and a proposal expiration date. ProposalKit generates the full structured draft based on the three discovery details you provide, and you can refine the language to match your firm's voice before sending.",
        },
        {
          q: "How do I price consulting services in a proposal?",
          a: "Price by value or fixed fee, not by hourly rate. The moment a client sees an hourly rate, they begin calculating whether the work 'should really take that long' — a conversation you cannot win. Calculate the fee based on the value the engagement will deliver: if your recommendations are expected to save the client $500k annually, a $50k fee is a 10x return and an easy approval. Present the total fee as a single number, broken into 3–4 phase milestones. If asked about hours, redirect: 'We price by outcome, not by hour, because hourly pricing creates the wrong incentive — to drag work out. You're paying for the result.' This reframe shifts the conversation away from auditing your hours and toward the value the client receives, which is often where higher fees become easier to justify.",
        },
        {
          q: "Should I send a proposal before or after a discovery call?",
          a: "Always after a discovery call, never before. A proposal sent without discovery is generic by definition — it cannot reflect the specific situation the client described, because you don't know it yet. Generic proposals get compared to other generic proposals on price, and you lose the ability to differentiate on insight. After a discovery call, write the proposal within 24–48 hours while the conversation is fresh. Open the proposal with the specific phrases and concerns the client raised. This signals that you listened, that you're investing thinking into their problem, and that you would be the kind of consultant who stays close to the actual situation throughout the engagement.",
        },
        {
          q: "How long should a consulting proposal be?",
          a: "2–4 pages for most engagements, 5–8 pages for large or complex engagements involving multiple workstreams. Decision-makers are time-constrained — a concise, focused proposal that directly addresses their problem tends to land better than a 30-page document filled with frameworks and methodology diagrams. The proposal should be long enough to demonstrate that you understood the problem and have a clear approach, and short enough that the buyer can read it in 10–15 minutes and forward it to their CFO with a one-line note. If you're tempted to add more pages to justify the fee, the underlying issue is usually that you haven't yet articulated the value clearly enough to justify the fee on its own.",
        },
      ]}
      ctaLabel="Generate Your Consulting Proposal — Free"
    />
  );
}
