import { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Proposal vs. Quote vs. Estimate: Which One to Send",
  description:
    "The three documents are not interchangeable. Learn when to send each, what makes them legally binding, and how the wrong choice costs deals.",
};

export default function ProposalVsQuoteGuide() {
  return (
    <GuideLayout
      slug="proposal-vs-quote-vs-estimate"
      title="Proposal vs. quote vs. estimate: which one to send (and why it matters)"
      description="Three documents, three different commercial outcomes. Learn what separates a proposal from a quote, when each is legally binding, and the mistake that costs small businesses thousands of dollars each year."
      publishedDate="April 2026"
      readingTime="11 min"
      intro="Most service-business owners use the words 'proposal,' 'quote,' and 'estimate' interchangeably. Buyers do not. To a buyer, each word signals a different level of commitment, completeness, and risk. Sending the wrong document for the situation is one of the most common — and most expensive — small business mistakes. This guide explains exactly what each document is, when each is appropriate, and how the wrong choice can cost you both deals and money."
      sections={[
        {
          heading: "The short version",
          paragraphs: [
            "A quote is a firm price for a clearly defined piece of work. An estimate is an approximate price for work that hasn't been fully defined yet. A proposal is a complete commercial document that includes the price, the scope, the timeline, the terms, and a path to acceptance. Quotes and estimates are documents about price. Proposals are documents about the whole engagement.",
            "If a buyer asks 'how much would this cost?' they want a quote or estimate. If a buyer asks 'how would you approach this?' they want a proposal. Sending a price-only document when the buyer wanted a full proposal makes you look like a vendor competing on price. Sending a full proposal when the buyer only wanted a quick price makes you look slow and overcomplicating.",
          ],
        },
        {
          heading: "What a quote actually is",
          paragraphs: [
            "A quote is a written statement of the exact price for a specific, well-defined piece of work. Quotes are firm — once delivered, the quoting party is generally bound to that price for a stated validity period (often 30 days). Quotes are appropriate when the work is standard, the scope is unambiguous, and both parties already share an understanding of what's being delivered.",
            "A simple quote might read: 'Replace existing 50-gallon natural gas water heater with new Bradford White unit including disposal of old unit and standard fittings. Total: $1,850. Valid for 30 days.' That's it. No methodology, no executive summary, no situational analysis. Just the work and the price.",
            "Quotes work well for established trades like plumbing, electrical, HVAC, auto repair, locksmithing, and similar service work where the buyer has a specific job in mind and the contractor has done that job hundreds of times before. The buyer needs a number, not a strategic narrative.",
          ],
        },
        {
          heading: "What an estimate actually is",
          paragraphs: [
            "An estimate is a written approximation of the price for work whose scope is not yet fully known. Estimates are non-binding — the actual final price may be higher or lower depending on what's discovered as the work progresses. Estimates are common for repair work where the full extent of the problem can't be seen without opening walls, lifting hoods, or pulling diagnostic data.",
            "A simple estimate might read: 'Estimated cost to diagnose and repair persistent leak under master bathroom: $400–$900. Actual cost will be confirmed after diagnostic visit ($150, applied to repair if proceeding). Major issues found during diagnostic may extend scope and require separate written authorization before proceeding.' That estimate honestly communicates uncertainty.",
            "Many states have specific rules about estimates and the right of the consumer to authorize additional work that exceeds the original estimate by a certain percentage (often 10–20%). Check your state's contractor or consumer protection rules before sending estimates — the legal requirements vary significantly.",
          ],
        },
        {
          heading: "What a proposal actually is",
          paragraphs: [
            "A proposal is a complete commercial document that includes the price plus the scope of work, the timeline, the payment schedule, the warranty or guarantee terms, and a clear path to acceptance. A proposal does not just say 'this will cost $X.' It says 'this will cost $X, here is exactly what you get, here is when, here is how we'll work together, and here is how you accept.'",
            "Proposals are appropriate when the engagement is larger than a single transaction, the scope is custom or complex, the buyer is comparing multiple vendors, or the engagement requires the buyer to trust your judgment over time. Marketing engagements, custom development projects, consulting work, home renovations, and large commercial trade work all warrant proposals rather than quotes.",
            "The big advantage of proposals over quotes is that they let you compete on something other than price. A buyer comparing three plumbers on price will pick the cheapest. A buyer comparing three contractors based on full proposals — where one has clearer scope, better timeline, stronger warranty, and a more thoughtful approach — will often pick the second or third cheapest because the proposal made the higher price feel justified.",
          ],
        },
        {
          heading: "When each document is legally binding",
          paragraphs: [
            "Legal enforceability varies by jurisdiction, but the general pattern in most US states and similar common-law jurisdictions is consistent. A quote, once accepted by the buyer in writing within its validity period, creates a binding contract for the stated price. The buyer can hold the contractor to that price; the contractor can hold the buyer to payment upon completion.",
            "An estimate is typically not binding on price — the contractor can charge more if scope expands, provided the buyer is given written notice and the opportunity to authorize the change. However, an estimate can still create implied obligations around the work being undertaken at all, and many consumer protection statutes give buyers specific rights to written estimates and change-order authorizations.",
            "A proposal, once signed by both parties, generally creates a complete contract covering not just the price but every term included in the proposal. This is why proposals are more legally durable than quotes for complex work — they bind not just the price but the scope, the timeline, the payment schedule, and the warranty terms.",
            "Whichever document you send, retain a copy with the date, the recipient, and the version. Email the document as a PDF rather than an editable Word file so the buyer can't alter terms before signing. Disputes about who agreed to what are dramatically harder to resolve when both sides are looking at different versions of the document.",
          ],
        },
        {
          heading: "The most expensive mistake: sending the wrong document",
          paragraphs: [
            "The classic small-business mistake is sending a one-line quote when the buyer wanted a proposal. The contractor says 'Bathroom remodel: $12,000.' The competitor sends a six-page proposal with scope, timeline, materials, warranty, and payment schedule. The buyer picks the competitor — not because the price is better, but because the proposal answered every question the quote left open.",
            "The reverse mistake is sending a 20-page proposal when the buyer asked for a quote. The buyer wanted a quick price to compare against two other vendors. They didn't want to read your methodology or your team bios. By over-delivering, you signaled that you don't understand the situation — and you wasted 90 minutes of your own time in the process.",
            "Match the document to the request. If the buyer asks 'how much?' send a quote. If the buyer asks 'how would you handle this?' send a proposal. If the buyer asks 'roughly what would this cost?' send an estimate with explicit caveats about what could change.",
          ],
        },
        {
          heading: "When in doubt, send the longer document",
          paragraphs: [
            "If you can't tell whether the buyer wants a quote or a proposal, default to the proposal. Buyers who wanted a quote can still extract the price from a proposal in 30 seconds. Buyers who wanted a proposal cannot extract the missing scope, timeline, and terms from a one-line quote. The downside of over-delivering is small; the downside of under-delivering is losing the deal.",
            "This is especially true for engagements above $3,000–$5,000. At that price point, buyers are almost always comparing multiple vendors, and the document that wins is usually the one that gives them the most information to defend their decision internally. A buyer presenting your proposal to their CFO needs more than a number — they need a story.",
          ],
        },
        {
          heading: "How to upgrade a quote into a proposal in 30 minutes",
          paragraphs: [
            "If you've been sending quotes for work that should be receiving proposals, the upgrade is faster than you'd think. Start with the price you would have quoted. Add a one-paragraph problem statement describing the buyer's situation. Add a scope-of-work list specifying exactly what you'll do (and a short 'not included' subsection). Add a timeline with milestones. Add a payment schedule (typically 30–50% deposit, balance on completion or milestones). Add a warranty paragraph. Add a one-line acceptance instruction.",
            "Most of that content is the same across every proposal you send — the warranty, the payment schedule, the acceptance procedure are all reusable. Only the problem statement, scope, and price need to be customized per buyer. Once you've written your first three or four proposals, the time per proposal drops to 15–30 minutes — well worth the conversion rate improvement.",
            "Tools like ProposalKit generate the full structured draft in 30 seconds based on three discovery inputs, leaving you to focus on the customization that actually wins the client. Whether you write proposals manually or with AI assistance, the principle is the same: match the document to the situation, and don't let speed of quoting cost you the deals where a proposal would have won.",
          ],
        },
      ]}
      relatedGuides={[
        { href: "/guides/how-to-write-a-business-proposal", label: "How to write a business proposal: complete guide" },
        { href: "/guides/proposal-pricing-strategies", label: "Proposal pricing strategies that win at full fee" },
        { href: "/for/contractors", label: "Contractor proposals — playbook and template" },
      ]}
    />
  );
}
