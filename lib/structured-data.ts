// JSON-LD structured data helpers for SEO and AdSense content signals.
// These produce schema.org-compliant JSON-LD blocks for inclusion in <script type="application/ld+json"> tags.

interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName: string;
  authorUrl?: string;
}

export function articleSchema(input: ArticleSchemaInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.publishedDate,
    dateModified: input.modifiedDate ?? input.publishedDate,
    author: {
      "@type": "Person",
      name: input.authorName,
      url: input.authorUrl ?? "https://proposalkit.pages.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "ProposalKit",
      url: "https://proposalkit.pages.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProposalKit",
    url: "https://proposalkit.pages.dev",
    description:
      "Free AI-powered proposal generator for freelancers, contractors, consultants, and small business owners.",
    foundingDate: "2026",
    sameAs: [],
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface WebSiteSchemaInput {
  name?: string;
  description?: string;
}

export function webSiteSchema(input: WebSiteSchemaInput = {}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name ?? "ProposalKit",
    url: "https://proposalkit.pages.dev",
    description:
      input.description ??
      "Free AI-powered business proposal generator. Draft professional proposals in 30 seconds.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://proposalkit.pages.dev/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
