import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Proposal Generator for Web Designers & Developers",
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
      longGuide={{
        title: "The web design and development proposal that prevents scope creep",
        intro:
          "Most freelance designers and developers have faced the same nightmare project: a friendly client, a vague handshake agreement, and a deliverable that kept growing until the hourly rate dropped below minimum wage. The fix isn't more meetings or stronger willpower — it's a written proposal that defines the project as a finite set of deliverables before the work begins. This guide walks through the seven sections every design or development proposal should contain, and the specific language that converts difficult conversations into clean signed agreements.",
        sections: [
          {
            heading: "1. Open with a problem statement, not a feature list",
            body: [
              "Clients don't hire you to build features. They hire you to solve a business problem. Open the proposal by restating that problem in your own words: 'Acme Corp's current website was built in 2018 on a custom CMS that the original developer no longer supports. Page load times average 6.2 seconds, mobile conversions are 40% lower than desktop, and the marketing team cannot update content without engineering help.' This single paragraph proves you listened during discovery and frames everything that follows as a solution to a real business need.",
              "Avoid the temptation to lead with deliverables ('We will build a 12-page website using Next.js and Tailwind'). Tech-first openings make you look like a vendor competing on price. Problem-first openings position you as a strategic partner — and partners get paid more.",
            ],
          },
          {
            heading: "2. Specify deliverables in countable units",
            body: [
              "Vague scope is the root cause of scope creep. Replace phrases like 'a clean modern website' with countable units: '5 unique page templates (home, about, services, blog index, contact), 1 reusable hero component, 1 site-wide navigation, and 1 footer.' Counting forces both sides to agree on the actual size of the project. If the client later asks for a sixth template, the proposal makes it obvious that's a change order, not 'just a small addition.'",
              "For development work, count features the same way: '1 user authentication system (email + Google OAuth, no SSO), 1 admin dashboard with 3 views, 1 public API with 8 endpoints, 1 webhook integration with Stripe.' Specifics also make estimation easier on your side — you can defend the timeline because you've already broken the work into atomic pieces.",
            ],
          },
          {
            heading: "3. Phase the project so payments tie to milestones",
            body: [
              "A typical design and dev project should be split into 3–5 phases, each with a deliverable the client signs off on before the next phase begins. A common structure: Phase 1 Discovery (research, sitemap, wireframes), Phase 2 Visual Design (style guide, key page mockups), Phase 3 Development (build, integrate, test), Phase 4 Launch (QA, deployment, training), Phase 5 Post-launch Support (30 days of bug fixes included).",
              "Tie payments to phase completion: 25% deposit, 25% on design approval, 25% on staging deployment, 25% on launch. This protects your cash flow and gives the client clear checkpoints to confirm direction before more money is spent. Avoid the 50% upfront / 50% on completion split — it incentivizes you to drag out the project and gives the client zero leverage at the end.",
            ],
          },
          {
            heading: "4. Define revisions as a finite resource",
            body: [
              "'Unlimited revisions' is the most expensive phrase in your vocabulary. Every project should specify a fixed number of revision rounds per phase. Standard language: 'This proposal includes 2 rounds of revisions on the wireframes and 2 rounds of revisions on the visual design. Additional revisions are billed at $X per hour.' Clients almost always converge their feedback when they know revisions are limited.",
              "Define what counts as a 'round.' A round is a single batch of consolidated feedback delivered in one document or email — not a stream of individual messages spread over a week. State this explicitly: 'Each revision round must be submitted as a single consolidated document within 5 business days of receiving the deliverable.' This forces clients to think before they speak.",
            ],
          },
          {
            heading: "5. Address third-party dependencies and assumptions",
            body: [
              "Most project delays are caused by things outside your control — content delivery, brand assets, third-party API access, hosting credentials. List your assumptions explicitly: 'This proposal assumes the client will provide final copy and images for all 5 pages within 14 days of project kickoff. Delays in content delivery may extend the project timeline by an equal duration.' This is not nitpicking. This is the documentation that protects your launch date.",
              "Also specify what platforms, services, and credentials the client must provide: 'Client will provide admin access to: AWS Route 53, GoDaddy domain registrar, Google Workspace email, and Stripe account. All credentials must be shared via 1Password or Bitwarden — credentials sent over email or Slack will not be accepted.' Security best practices written into the proposal protect both sides.",
            ],
          },
          {
            heading: "6. Price the project as an investment, not a cost",
            body: [
              "Reframe how you present the number. 'Total cost: $18,000' sounds like an expense. 'Total investment: $18,000, framed against the additional revenue a faster, higher-converting site can generate' sounds like a business case. Even if you can't promise specific ROI numbers, leading with 'investment' signals strategic thinking. Framing the price as an investment rather than a cost shifts the conversation from minimizing an expense to evaluating value — which tends to make the number easier for a client to approve.",
              "Show a breakdown by phase: Discovery $2,400 | Design $5,600 | Development $8,000 | Launch $1,200 | Post-launch $800. Clients comparing your proposal to a competitor's all-in-one number will see the structure and reason that you've thought about this more carefully. Itemization is also useful if the client tries to cut scope — you can offer to drop a phase rather than discount the total.",
            ],
          },
          {
            heading: "7. End with a specific acceptance procedure",
            body: [
              "The acceptance section is where most proposals waste momentum. Don't end with 'Looking forward to hearing from you!' End with a specific next action: 'To accept this proposal, reply to this email confirming acceptance and we will send a contract for e-signature via DocuSign. Upon receipt of signed contract and 25% deposit ($4,500), Phase 1 Discovery will begin within 5 business days.' Specificity converts.",
              "Include a proposal expiration date — typically 14 or 30 days. 'This proposal is valid through [date]. Pricing and availability are subject to change after expiration.' This is not a high-pressure sales tactic; it's a way to keep your project pipeline moving and avoid clients who shop around for months and then come back asking for the same price.",
            ],
          },
        ],
      }}
      faqs={[
        {
          q: "What should a web design proposal include?",
          a: "A strong web design proposal covers seven distinct sections: an executive summary that restates the client's business problem in your words, a proposed solution that explains your approach without diving into technical detail, a scope of work that lists deliverables as countable units (pages, features, components), a phased timeline tied to payment milestones, a clearly bounded revision policy, an investment breakdown by phase, and a specific acceptance procedure with an expiration date. ProposalKit generates a complete structured draft of all these sections based on the client name, scope, and budget you provide. You can then refine the language and add any agency-specific clauses before sending.",
        },
        {
          q: "How do I handle revision rounds in a proposal?",
          a: "Specify revisions as a finite, countable resource — never use the phrase 'unlimited revisions.' A typical structure is two revision rounds per phase: two on wireframes, two on visual design, two on the built site. Define what counts as a round (a single batch of consolidated feedback in one document, not a stream of messages over a week) and require the client to submit feedback within a set window (typically 3–5 business days). State the hourly rate for revisions beyond the included rounds, usually $100–$200 per hour depending on your seniority. This structure protects your margins and trains the client to send thoughtful, batched feedback.",
        },
        {
          q: "Should I include a contract in my proposal?",
          a: "A proposal and a contract serve different purposes. The proposal documents scope, deliverables, timeline, and price — the commercial terms. The contract handles legal terms like intellectual property assignment, indemnification, governing law, dispute resolution, and confidentiality. Many freelancers combine both into a single 'Statement of Work plus Master Services Agreement' document, while agencies typically keep them separate. ProposalKit focuses on the commercial proposal — once accepted, you should layer on a contract from a template like the Freelancers Union contract creator or a custom agreement from a lawyer who specializes in your jurisdiction.",
        },
        {
          q: "How do I price a web design project in a proposal?",
          a: "Present pricing as a phased investment, not a flat cost. Break the total into 3–5 phases (Discovery, Design, Development, Launch, Post-launch Support) and assign a price to each. Tie 20–25% of the total to each phase as the payment due upon completion of that phase. For most freelance projects, the breakdown might look like Discovery 15%, Design 30%, Development 40%, Launch 10%, Support 5%. This structure makes pricing transparent, gives the client confidence that you've thought through the work, and protects your cash flow. Position the total as an investment expected to drive business outcomes — improved conversions, faster page loads, lower maintenance costs — rather than a one-time expense.",
        },
      ]}
      ctaLabel="Generate Your Design Proposal — Free"
    />
  );
}
