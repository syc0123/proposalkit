// Single source of truth for the real author identity used in bylines,
// the About page, and Article structured data (E-E-A-T signal).

export const AUTHOR = {
  name: "Yechul Shin",
  role: "Full-stack developer",
  bio: "Full-stack developer and the creator of ProposalKit. He builds practical tools that help freelancers and small businesses win clients with less friction.",
  portfolio: "https://yechul-portfolio.pages.dev",
  github: "https://github.com/syc0123",
  // Initials shown in the byline avatar
  initials: "YS",
} as const;
