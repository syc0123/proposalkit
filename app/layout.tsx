import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ProposalKit — Free AI Business Proposal Generator",
    template: "%s | ProposalKit",
  },
  description:
    "Generate a professional business proposal in 30 seconds. Free AI proposal generator for freelancers, contractors, designers, and consultants. No sign-up required.",
  keywords: [
    "free business proposal generator",
    "proposal generator",
    "business proposal template",
    "free proposal template",
    "AI proposal generator",
  ],
  openGraph: {
    type: "website",
    siteName: "ProposalKit",
    title: "ProposalKit — Free AI Business Proposal Generator",
    description:
      "Generate a professional business proposal in 30 seconds. Free, no sign-up required.",
    url: "https://proposalkit.pages.dev",
  },
  twitter: {
    card: "summary",
    title: "ProposalKit — Free AI Business Proposal Generator",
    description: "Generate a professional business proposal in 30 seconds. Free.",
  },
  alternates: {
    canonical: "https://proposalkit.pages.dev",
  },
  other: {
    "google-adsense-account": "ca-pub-8182501552183853",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8182501552183853"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
