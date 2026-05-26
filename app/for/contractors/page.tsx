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
      longGuide={{
        title: "How to write a contractor proposal that wins jobs",
        intro:
          "After ten years estimating residential and small commercial work, I've learned one thing: the contractor who sends the clearest proposal usually gets the job — even when their price isn't the lowest. Homeowners and property managers are making a decision based on risk. They don't know if you'll show up, finish on time, or charge them for surprises. A well-structured proposal removes that uncertainty. This guide walks through every section a contractor proposal should contain and why each one matters.",
        sections: [
          {
            heading: "1. Start with the project address and a one-paragraph summary",
            body: [
              "Open the proposal with the property address, the client's name, and the date you're submitting. This sounds obvious but it tells the client you treat their job specifically — not as a copy-paste template. Below the header, write one paragraph summarizing the project: what they asked for, what you're proposing, and roughly how long it will take. A homeowner reading this should understand the entire scope in 30 seconds.",
              "Avoid generic openers like 'Thank you for considering our company.' Instead, lead with the substance: 'Replacing 12 squares of asphalt shingles on the main house and detached garage, including underlayment, drip edge, and disposal of the old roof. Estimated completion: 3 working days, weather permitting.' That single sentence does more to win the job than two paragraphs of fluff.",
            ],
          },
          {
            heading: "2. Define the scope of work with surgical precision",
            body: [
              "This is the section that prevents disputes later. List every task you'll perform, in the order you'll perform it. Use bullet points, not paragraphs. If you're remodeling a bathroom, don't write 'demo and remodel bathroom.' Write 'Remove existing toilet, vanity, tub, tile flooring, and drywall to studs. Install new 60-inch alcove tub with three-piece surround. Re-route hot water line to accommodate new vanity location. Install GFCI outlet at 42 inches above finished floor next to vanity.' That level of detail protects you.",
              "Critically, add a separate 'Not included' subsection. List anything a reasonable client might assume is part of the job but isn't: 'Painting of adjacent rooms is not included. Permits and inspection fees are billed separately. Removal of mold or asbestos, if discovered during demo, will be quoted as a change order.' Clients who read this and still hire you cannot claim later that they thought painting was included.",
            ],
          },
          {
            heading: "3. Break out materials and labor separately",
            body: [
              "Contractors who lump everything into one number look like they're hiding something. Break the price into materials, labor, equipment, and waste disposal. You don't need to disclose your supplier costs, but showing 'Materials: $3,400 | Labor: $4,200 | Permit: $250 | Disposal: $400 | Total: $8,250' gives the client a frame of reference and makes negotiation easier on both sides.",
              "If the client wants to provide their own fixtures (faucets, tile, lighting), state your policy. Most pros use language like: 'Owner-supplied materials must be delivered to the site 48 hours before installation. ProposalKit Contracting is not responsible for delays, defects, or warranty claims on materials we did not source.' Put this in writing now to avoid frustrating conversations later.",
            ],
          },
          {
            heading: "4. Specify a realistic timeline with milestones",
            body: [
              "Don't promise a finish date. Promise a sequence. 'Day 1: Demo and dumpster delivery. Days 2–3: Rough plumbing and electrical. Day 4: Inspection. Day 5: Drywall and prep. Days 6–8: Tile and finish work. Day 9: Final inspection and walk-through.' This is more honest, more flexible, and frankly easier to defend if weather, supply delays, or change orders push things out.",
              "Include a clear weather/contingency clause: 'Estimated working days assume normal site access and standard conditions. Major weather events, owner-requested changes, and unforeseen conditions discovered during demolition may extend the schedule. The contractor will provide written notice of any expected delays.' This is standard language in most state contractor licensing guides and protects you legally.",
            ],
          },
          {
            heading: "5. Lay out the payment schedule before you start",
            body: [
              "For most residential jobs, a fair payment schedule looks like this: 10% deposit at signing, 40% at material delivery / job start, 40% at substantial completion, 10% retainer due after the punch list is signed. Some states cap deposits at $1,000 or 10% — check your state contractor board's rules before drafting this. California, for example, limits residential deposits to 10% or $1,000, whichever is less.",
              "State your accepted payment methods, the consequences of late payment, and your policy on holdbacks. 'Invoices not paid within 7 days will accrue 1.5% monthly interest. Final 10% will be released within 5 business days of punch list completion.' Vague payment terms are the single most common cause of contractor cash flow problems. Write them down now.",
            ],
          },
          {
            heading: "6. Stand behind your work with a written warranty",
            body: [
              "Most states require a one-year workmanship warranty on residential work, but it's worth stating it explicitly. Sample language: 'ProposalKit Contracting warrants all labor for 12 months from substantial completion. Manufacturer warranties on installed products will be transferred to the homeowner upon final payment. This warranty does not cover damage from misuse, neglect, normal wear, or work performed by other contractors after completion.' Clients respond well to seeing this in writing — it signals confidence.",
              "If you offer extended warranties or maintenance contracts (common for roofers and HVAC), mention them here with a one-sentence pitch. Don't push hard, just plant the seed: 'Ask about our 5-year roofing maintenance plan, which includes annual inspections and priority repair scheduling.' Many contractors capture 15–20% of additional revenue this way.",
            ],
          },
          {
            heading: "7. End with a clear 'how to accept' section",
            body: [
              "Don't make the client guess what to do next. End every proposal with: 'To accept this proposal, sign and date below, then return one copy via email to [your email] or in person. Upon receipt of signed agreement and 10% deposit, work will be scheduled within 7–14 calendar days.' A specific call-to-action increases your acceptance rate measurably.",
              "Include space for the client's printed name, signature, date, and a checkbox confirming they've read and agreed to the scope. If you're using ProposalKit's output, the generated proposal includes this signature block by default — you just need to print or PDF it. Most homeowners sign within 48 hours of receiving a well-structured proposal, especially if you're the second or third bid they've reviewed.",
            ],
          },
        ],
      }}
      faqs={[
        {
          q: "Do contractors need written proposals?",
          a: "Yes — most states legally require a written contract for residential work over a certain threshold (often $500 or $1,000), and even where it's not legally required, a written proposal is the single best tool for preventing disputes. It documents what was agreed, sets expectations on scope and timeline, and makes you look measurably more professional than competitors who only give verbal quotes. Many state contractor licensing boards also require specific disclosures (cancellation rights, mechanic's lien notices) that you can only deliver in writing. Skipping the written proposal puts your license and your payment at risk.",
        },
        {
          q: "What's the difference between a proposal and an estimate?",
          a: "An estimate is just a price — usually a one-line dollar figure with maybe a brief description of the work. A proposal is a complete document that includes the price, the detailed scope of work, the materials and labor breakdown, the timeline, the payment schedule, the warranty terms, and a clear acceptance section with signature lines. Estimates are appropriate for very small repairs or initial conversations. Proposals are what you send when you actually want to win and bind the job. In most states, only a signed proposal — not an estimate — creates an enforceable contract.",
        },
        {
          q: "How do I write a contractor proposal?",
          a: "Start with the project address, the client's name, and the date. Write a one-paragraph summary of the work. List the detailed scope of work with bullets, including a clear 'not included' subsection. Break out materials, labor, equipment, and disposal as separate line items. Specify the timeline as a sequence of work days with a contingency clause. Lay out the payment schedule (typically 10% deposit, progress payments tied to milestones, 10% holdback). State your warranty terms. End with a signature block and a specific call-to-action. ProposalKit handles all of this structure automatically based on the three fields you fill in.",
        },
        {
          q: "Is this free for contractors?",
          a: "Yes. The first proposal is completely free with no account needed — guests can generate one proposal per browser session. If you sign in with a free Google account, you get five free proposals per calendar month, which is enough for most one- or two-person operations doing 2–4 estimates per week. There's no credit card required, no trial, and no automatic charges. A paid Pro tier with unlimited generations, custom templates, and branded PDF exports is planned but not yet launched.",
        },
      ]}
      ctaLabel="Generate Your Contractor Proposal — Free"
    />
  );
}
