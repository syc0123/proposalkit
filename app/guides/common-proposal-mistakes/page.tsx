import { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "10 Common Proposal Mistakes That Cost You Deals",
  description:
    "The ten most common mistakes in business proposals — from vague scope to weak acceptance steps — and how to fix each one before you send.",
};

export default function CommonMistakesGuide() {
  return (
    <GuideLayout
      slug="common-proposal-mistakes"
      title="10 common proposal mistakes that cost you deals (and how to fix each one)"
      description="A diagnostic checklist of the ten most frequent mistakes in business proposals from freelancers, agencies, and consultants — and the specific fixes that turn a losing proposal into a winning one."
      publishedDate="April 2026"
      readingTime="12 min"
      intro="Most lost proposals share a small number of structural problems. Across freelancers and small business owners in many industries, the same patterns tend to appear over and over. This guide diagnoses the ten most common mistakes — many of which are invisible to the writer because they feel professional from inside the document — and provides specific fixes for each. If your proposals are losing more often than you'd like, there's a good chance several of these are contributing."
      sections={[
        {
          heading: "Mistake 1: Leading with your company history",
          paragraphs: [
            "Most proposals open with a section titled 'About Us' or 'Our Company.' This is the wrong opening. The first page of any proposal is high-attention real estate, and buyers don't care about your company history until they care about your understanding of their problem. Every paragraph you spend describing yourself is a paragraph the buyer is not reading about themselves.",
            "The fix: lead with a situation summary in the client's language. 'You mentioned your roofing system is showing signs of failure after the December storms and you need a replacement quote before insurance review on the 28th.' That single sentence does more to win the deal than three paragraphs about how long your company has been in business.",
            "Save the 'About us' content for the final page, framed as 'Why work with us.' By that point, the buyer has already evaluated your understanding of their problem. Credentials at the end reinforce a decision they're leaning toward; credentials at the beginning are an obstacle they have to read past.",
          ],
        },
        {
          heading: "Mistake 2: Vague scope of work",
          paragraphs: [
            "Vague scope is the single largest source of post-acceptance disputes. 'A complete kitchen remodel' could mean five different scopes depending on the buyer's expectations. 'Removing existing cabinets and countertops, installing 12 linear feet of new lower cabinets and 8 feet of upper cabinets (shaker-style maple, 5-piece construction), installing 35 sq ft of quartz countertop in selected color, retiling the 24 sq ft backsplash, and re-routing under-cabinet lighting' is enforceable.",
            "The fix: write scope in countable units. Pages, hours, features, square feet, line items, deliverables. Anything that can be counted should be. The act of counting forces both sides to agree on the actual size of the work and creates documentation that prevents the slow expansion of 'one more thing' requests.",
            "Add a 'Not included' subsection. List what a reasonable buyer might assume is part of the job but isn't. 'Painting of adjacent rooms is not included. Removal of asbestos, if discovered during demolition, will be quoted as a separate change order.' Buyers who read this and still hire you cannot later claim they thought painting was included.",
          ],
        },
        {
          heading: "Mistake 3: Hourly pricing in the proposal",
          paragraphs: [
            "The moment a buyer sees an hourly rate, they begin doing math: 'how many hours should this really take?' That conversation is uncomfortable, ongoing, and impossible to win. Hourly pricing also caps your earnings at how fast you can work and rewards inexperience over expertise.",
            "The fix: use fixed-fee or value-based pricing wherever the scope is definable enough to commit to. 'Total investment: $18,000' positions the engagement as outcome-based. 'Hourly rate: $150 per hour, estimated 120 hours, $18,000' invites the buyer to argue every hour. Same number, dramatically different post-acceptance dynamics.",
            "If you must use hourly billing (for genuinely unbounded retainers or reactive support), state the rate inside a clear retainer structure: 'Monthly retainer of 20 hours at $200/hour ($4,000/month), with unused hours rolling forward up to 10 hours per month.' Structure transforms hourly billing from a defensive position to a confident one.",
          ],
        },
        {
          heading: "Mistake 4: Weak or missing payment schedule",
          paragraphs: [
            "Many proposals state the total fee but leave payment timing vague: 'Payment due upon completion' or worse, no payment terms at all. This is how freelancers end up funding their clients' projects out of pocket for 60–90 days.",
            "The fix: specify the payment schedule explicitly. For most freelance work: 40–50% deposit at signing, balance in milestone payments tied to deliverables, with the final payment due within 7 days of completion. For larger engagements: 33% retainer, 33% mid-engagement, 34% on completion.",
            "State payment methods and late fees: 'Invoices due within 7 days. Payments accepted via Stripe, bank transfer, or check. Invoices not paid within 14 days incur a 1.5% monthly late fee.' Most freelancers under-collect late fees not because they're missing from the proposal but because they were never written down. Once they're documented, you can enforce them.",
          ],
        },
        {
          heading: "Mistake 5: Promising specific dates instead of sequences",
          paragraphs: [
            "Quoting a specific finish date ('Project complete by June 14') creates a single point of failure. The moment a client-side delay, supply chain issue, or weather event pushes things out, you're explaining why you missed a date you committed to.",
            "The fix: quote a sequence of working days from kickoff. 'Estimated 18 working days from kickoff, assuming brand assets are delivered within 3 business days of signing.' Sequences are honest, flexible, and tied to dependencies that surface the actual delay causes.",
            "Add a buffer. If you genuinely think the work will take 14 days, quote 18. Quoting your best-case timeline and missing it by a few days hurts your reputation more than quoting a slightly longer timeline and finishing on the early side. Building a margin into your estimate is standard practice, and the buffer is largely invisible to clients because they expect one anyway.",
          ],
        },
        {
          heading: "Mistake 6: Generic templates that don't reference the client",
          paragraphs: [
            "Buyers can tell immediately when they're reading a template you forgot to customize. The classic tells: pronouns that don't match (Mr./Ms. when the client signed off with their first name), references to 'your industry' without ever naming the industry, and a 'Why us' section that could be copy-pasted into a proposal for anyone.",
            "The fix: customize the first 30 seconds of reading. The client name appears on the cover. Their company name appears in the executive summary. Their stated business problem appears in the problem statement. Their specific terminology (the words they used in discovery) appears throughout. The rest of the document can be template content; the opening must feel custom.",
            "A useful test: copy your proposal, paste it into a notepad with the client's name removed, and re-read it. If it could plausibly be sent to a different client with just a name change, you haven't done enough customization. Specificity is the single highest-leverage signal of professionalism in proposal writing.",
          ],
        },
        {
          heading: "Mistake 7: Missing the 'why us' answer",
          paragraphs: [
            "Senior buyers will silently ask themselves 'why this vendor over the others?' even if they don't ask out loud. Proposals that don't answer this question lose to proposals that do, even when the unanswered proposal is better in other dimensions.",
            "The fix: include a short 'Why work with us' section near the end — 3 to 5 bullet points combining relevant experience with a unique point of view. 'We have completed 18 similar kitchen remodels in homes built before 1960, which require specific approaches to old plaster, knob-and-tube wiring, and uneven subfloors. Our typical project timeline is 5–10% shorter than category averages because we do our own demolition and disposal in-house.' That's enough.",
            "Don't pad this section. One concrete differentiator beats five vague ones. 'High-quality work, attention to detail, and excellent customer service' is what every vendor claims. 'We do our own demolition and disposal in-house' is a specific operational fact a buyer can verify and remember.",
          ],
        },
        {
          heading: "Mistake 8: Weak acceptance step",
          paragraphs: [
            "Most proposals end with some variation of 'Looking forward to hearing your thoughts!' or 'Let me know if you have any questions.' Neither is a next step. The buyer reads the proposal, agrees with it, and then has no clear path to action — so they procrastinate, and the deal cools.",
            "The fix: end with a specific, frictionless acceptance procedure. 'To accept this proposal, reply to this email confirming acceptance. Upon receipt, I'll send a contract for e-signature via DocuSign and invoice for the 40% deposit ($3,200). Work will begin within 5 business days of signed contract and deposit.' Specificity converts.",
            "Include exact dollar amounts so the client doesn't have to do math. Include the next step on your end so they know what happens after they say yes. Include a timeline expectation so they understand the commitment. An acceptance step that is clear, specific, and complete removes the friction that lets an agreeable buyer drift away — it converts intent into action while the decision is still warm.",
          ],
        },
        {
          heading: "Mistake 9: No proposal expiration date",
          paragraphs: [
            "Without an expiration date, your proposal stays valid forever. The price you quoted in March is still the price the buyer expects in October when they finally circle back. Materials costs have changed, your hourly capacity has changed, your business priorities have changed — but your quote hasn't.",
            "The fix: add an expiration paragraph. 'This proposal is valid through May 14, 2026. Pricing and availability are subject to change after that date.' Two to four weeks is reasonable for most engagements. Longer expirations are appropriate for large enterprise deals where the buyer's procurement process takes months.",
            "Expiration dates also serve as a gentle commitment device. Serious buyers move forward; tire-kickers self-select out. You're not pressuring anyone — you're being honest that your business circumstances can change. Most buyers who would have signed eventually still sign within the window. The small share who would only have circled back many months later are often the buyers you're better off not signing anyway.",
          ],
        },
        {
          heading: "Mistake 10: Sending without follow-up",
          paragraphs: [
            "The proposal is sent and you wait. A week passes, two weeks, and you don't want to seem pushy. Eventually the deal goes cold and you tell yourself the buyer wasn't serious. In reality, the buyer was busy, the proposal got buried under 200 unread emails, and a polite follow-up would have closed it.",
            "The fix: set a follow-up cadence before you send. 'I'll follow up on Tuesday if I haven't heard back.' Then actually do it. The follow-up email should be short — three sentences — and add value, not just ask 'any update?' Reference one specific detail from the proposal: 'Wanted to confirm you received the proposal. The lead times on the cabinet material I quoted are running 14 days right now, so happy to lock that in if helpful.'",
            "If you don't hear back after two follow-ups, send a 'closing the loop' email: 'Wanted to check in one last time before I assume you've gone in a different direction. If timing or budget shifted, I'm happy to revisit.' This often surfaces buyers who had hidden objections. Either way, you free up your mental bandwidth and avoid the ambient anxiety of an open loop.",
          ],
        },
      ]}
      relatedGuides={[
        { href: "/guides/how-to-write-a-business-proposal", label: "How to write a business proposal: complete guide" },
        { href: "/guides/proposal-follow-up-strategy", label: "The proposal follow-up strategy that closes more deals" },
        { href: "/guides/proposal-pricing-strategies", label: "Proposal pricing strategies that win at full fee" },
      ]}
    />
  );
}
