import { Metadata } from "next";
import ForLandingTemplate from "@/components/ForLandingTemplate";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Free Proposal Generator for Marketing & Creative Agencies",
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
      longGuide={{
        title: "Winning agency proposals: a playbook for new business pitches",
        intro:
          "Agency new business is brutal. You're often pitching against three to seven competitors, the brief is incomplete, the timeline is unreasonable, and the decision-makers won't be in the meeting where they choose. The agencies that win consistently are not the ones with the prettiest decks — they're the ones whose proposals demonstrate the clearest commercial thinking. This guide walks through how to structure an agency proposal that converts at higher rates, with specific patterns drawn from RFP responses across marketing, PR, paid media, and creative work.",
        sections: [
          {
            heading: "1. Lead with the business outcome the client cares about",
            body: [
              "Agency proposals lose because they lead with services ('We propose a six-month integrated campaign with paid media, organic social, and influencer activations'). Clients don't buy services — they buy outcomes. Rewrite that opening: 'Over the next six months we will drive 8,400 qualified leads at a target CPL of $42, growing demo-request volume by 60% over your current baseline.' That sentence frames the entire proposal as an investment with measurable returns, not as a bundle of activities.",
              "If you don't have specific numbers, use anchored ranges based on benchmarks: 'Based on category benchmarks and similar engagements, we project a 40–60% increase in qualified inbound leads within the first 90 days.' Even a range outperforms vague claims like 'meaningful growth' or 'measurable impact.' Specificity signals that you've done this before and that you're willing to be held accountable.",
            ],
          },
          {
            heading: "2. Build a situation analysis the client didn't give you",
            body: [
              "Every RFP comes with a brief. The agencies that win build a situation analysis that goes beyond the brief. Spend two hours doing competitive research: pull the client's last 12 months of paid media using a tool like SimilarWeb or Semrush, screenshot their top three organic competitors, identify three opportunities they probably haven't noticed. Then open the proposal with: 'Three things stood out when we audited your current presence. First, you're paying 2.4x the category CPC on branded search terms a competitor is now bidding against. Second, your top-performing organic page has not been updated in 14 months and is losing positions weekly. Third, your category has a long-tail keyword cluster you're not covering that drives 12,000 monthly searches industry-wide.'",
              "That paragraph does more to win the pitch than ten pages of capability statements. It proves you treated the opportunity specifically, that you have the technical depth to find non-obvious patterns, and that you're already adding value before you've been hired. Most competing agencies will not have done this work — and that gap is your moat.",
            ],
          },
          {
            heading: "3. Frame services as a strategy, not a menu",
            body: [
              "Generic agency proposals list services as a bulleted menu: 'SEO, Paid Media, Email, Social, Content.' Winning proposals connect services into a single strategic narrative. 'Our recommendation is a three-phase strategy. Phase 1 (months 1–2) focuses on technical and content fixes to capture demand you're already losing — this is where we expect the fastest measurable lift. Phase 2 (months 3–4) launches a paid demand-generation engine sized to your CAC target. Phase 3 (months 5–6) builds the always-on content and SEO engine that compounds over the following 18 months.' Strategy framing positions you as a partner; menu framing positions you as a vendor.",
              "Avoid the temptation to include every service your agency offers. Proposals that include 'we also do PR, branding, and video production' even when those aren't needed dilute the strategic argument. Pitch exactly the services that match the recommended strategy, and signal the rest with one line: 'Adjacent services (PR, brand, video) are available but are not part of this proposed scope.'",
            ],
          },
          {
            heading: "4. Price the engagement with a retainer-plus-performance structure",
            body: [
              "Pure retainer pricing ('$15k/month for 6 months') is the default agency model but it's vulnerable to commoditization — every competitor will pitch a retainer and you'll compete on price. Differentiate with a hybrid structure: a base retainer covering operations plus a performance fee tied to a specific KPI. 'Base retainer: $12,000 per month covering strategy, execution, reporting, and a dedicated account team. Performance bonus: $250 per qualified lead above the 700/month baseline, capped at $8,000 per month.' This structure aligns you with the client's outcomes and signals confidence in your ability to deliver.",
              "Be specific about what's included in the retainer. List hours by function ('45 hours of strategy and account management, 80 hours of execution, 25 hours of reporting and analysis per month') or by deliverable ('4 blog posts, 12 social posts, 1 monthly performance review'). When clients see a clear scope for their fee, the negotiation tends to shift away from the price itself and toward the value being delivered, which makes pushback less likely.",
            ],
          },
          {
            heading: "5. Address the implementation risk the client is worried about",
            body: [
              "Every client buying agency services is worried about the same things: account team turnover, junior staff doing the actual work, reporting that hides what's really happening. Address all three explicitly. 'Your account will be led by [named senior strategist] who will remain on your account for the duration of the engagement. We do not bait-and-switch with senior pitch teams and junior execution teams.' A direct commitment like this speaks to a real anxiety buyers rarely say out loud, and it can carry more weight in the decision than the price.",
              "On reporting, be specific: 'You will receive a weekly performance digest every Monday and a monthly business review on the second Thursday of each month, with quarterly executive reviews scheduled in advance. All data is available in a real-time dashboard you can access at any time.' Vague reporting promises trigger the buyer's anxiety; specific commitments calm it.",
            ],
          },
          {
            heading: "6. Include a credibility section, not a credentials section",
            body: [
              "Most agency proposals waste 4–6 pages on 'About Us' content — agency size, office locations, awards, logo soup. Senior buyers ignore all of it. Replace credentials with credibility: three short case studies that mirror the client's situation, each with a specific outcome and a one-line lesson learned. A strong case study reads like this template — name the client situation, the move you made, the measured result, and the takeaway: 'For a B2B SaaS in legal tech, we grew pipeline-qualified leads over nine months by shifting the majority of paid spend from brand to bottom-funnel demand keywords. Key lesson: brand spend was masking weak bottom-funnel performance.' Fill in your own real numbers; never borrow or invent them.",
              "Specificity beats volume. One credible, on-point case study outperforms ten unrelated client logos. If you don't have a directly comparable case study, use the closest analog and explain why the lessons translate: 'While we haven't worked in your exact category, we have run nearly identical engagements in two adjacent B2B SaaS verticals, where the buyer journey and CAC dynamics behave the same way.'",
            ],
          },
          {
            heading: "7. Close with a clear next step and decision timeline",
            body: [
              "Don't end with 'We look forward to hearing from you.' End with: 'To move forward, please confirm acceptance by reply email. Upon signed MSA and initial 30-day retainer of $12,000, kickoff will be scheduled within 5 business days, with the first weekly digest delivered 10 business days after kickoff.' Clear next steps reduce the friction between buyer interest and buyer commitment.",
              "If the client has indicated a decision timeline, mirror it: 'We understand a decision is targeted for the week of [date]. This proposal and pricing are valid through that window. If the decision extends beyond [date + 14 days], we will need to revisit availability of the proposed account team.' This is honest, not pushy, and it surfaces clients who are not actually as far along in their decision as they claimed.",
            ],
          },
        ],
      }}
      faqs={[
        {
          q: "What should a marketing agency proposal include?",
          a: "A strong agency proposal opens with the business outcome the client cares about — projected leads, revenue lift, or growth percentage — not with a list of services. It then includes a situation analysis that goes beyond what was in the RFP brief, demonstrating proprietary research and category understanding. The services section should be framed as a phased strategy with clear sequencing, not a menu. The investment section should specify exactly what's included in the retainer, broken down by function or deliverable. It should also include a credibility section with one or two directly comparable case studies, an explicit account team commitment, a reporting cadence, and a specific next step with a decision-timeline acknowledgment. ProposalKit produces the full structured draft for you to refine.",
        },
        {
          q: "How do agencies typically price proposals?",
          a: "There are three common structures, each suited to different engagement types. Retainer pricing — a fixed monthly fee for ongoing services — works well for SEO, social, and content where the work is continuous and the value compounds. Project-based pricing — a fixed total fee for a defined scope — works well for branding, web design, and campaign launches with a clear start and end. Performance-based pricing or a hybrid retainer-plus-performance — base fee plus bonus tied to specific KPIs — works well for paid media and demand generation where outcomes are measurable. The best agencies typically lead with hybrid pricing because it aligns incentives with the client and differentiates from competitors pitching pure retainers. State your model clearly in the proposal so the client can compare apples to apples.",
        },
        {
          q: "How quickly should I respond to a new business inquiry?",
          a: "Same-day acknowledgment, full proposal within 48 hours, and a scheduled discovery call within one business week. Speed is a strong signal of commitment and capacity. Most clients reach out to multiple agencies simultaneously, and the first credible proposal often sets the framing the others are then compared against. If you can produce a clear, well-structured proposal in 24 hours when competitors take a week, you have established a competitive advantage before the comparative work has begun. ProposalKit makes the first-draft generation a 30-second task so you can spend the rest of the time customizing for the specific account, layering in the situation analysis, and rehearsing your delivery.",
        },
        {
          q: "Should agency proposals include case studies?",
          a: "Yes, but be selective and specific. Include one to three case studies, each in the body of the proposal as 2–3 short paragraphs, not as separate appendix attachments. Each case study should mirror the client's situation in category, size, or business model — generic logos and unrelated wins do not move buyers. The most effective case study format includes the client situation in one sentence, the strategic approach in one sentence, the specific outcome with a number, and a one-line 'lesson learned' that demonstrates pattern recognition. Save detailed case study decks and award showcases for follow-up presentations after the proposal has earned you a meeting; in the initial proposal, depth beats volume.",
        },
      ]}
      ctaLabel="Generate Your Agency Proposal — Free"
    />
  );
}
