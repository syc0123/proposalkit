"use client";

import { useState } from "react";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalResult } from "@/components/ProposalResult";
import { LoginPrompt } from "@/components/LoginPrompt";
import { UpgradeModal } from "@/components/UpgradeModal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { ProposalInput, ProposalOutput, GenerateApiResponse } from "@/types/proposal";

// @AX:NOTE: [AUTO] sessionStorage key for guest 1-free tracking — cleared on tab close
const GUEST_USED_KEY = "pk:guest_used";

export default function HomePage() {
  const [proposal, setProposal] = useState<ProposalOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestUsed, setGuestUsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(GUEST_USED_KEY) === "1";
  });
  const [showUpgrade, setShowUpgrade] = useState(false);

  async function handleGenerate(input: ProposalInput) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data: GenerateApiResponse = await res.json();

      if (res.status === 429) {
        setShowUpgrade(true);
        return;
      }

      if (!res.ok || !data.proposal) {
        setError(data.error ?? "Failed to generate proposal. Please try again.");
        return;
      }

      setProposal(data.proposal);

      // Mark guest as used (only for unauthenticated first-time users)
      if (!guestUsed) {
        sessionStorage.setItem(GUEST_USED_KEY, "1");
        setGuestUsed(true);
      }
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }

  // @AX:WARN: [AUTO] isBlocked only prevents form render — server does not enforce guest limit
  const isBlocked = guestUsed && !proposal;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Free AI Proposal Generator
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:text-lg max-w-xl mx-auto">
              Enter your industry, client name &amp; scope of work —{" "}
              <span className="text-blue-600 font-medium">get a professional proposal in 30 seconds.</span>{" "}
              No sign-up required.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">✓ Free to use</span>
              <span className="flex items-center gap-1">✓ AI-powered by Gemini</span>
              <span className="flex items-center gap-1">✓ Editable output</span>
              <span className="flex items-center gap-1">✓ No templates needed</span>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
          <div className={`grid gap-6 ${proposal ? "sm:grid-cols-2" : ""}`}>
            {/* Form column */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-gray-700">Proposal Details</h2>
              {isBlocked ? (
                <LoginPrompt />
              ) : (
                <ProposalForm onSubmit={handleGenerate} isLoading={isLoading} />
              )}
              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Result column (only when proposal exists) */}
            {proposal && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <ProposalResult key={proposal.generatedAt} text={proposal.text} />
                {guestUsed && (
                  <div className="mt-4">
                    <LoginPrompt />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white border-t border-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">How it works</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Enter 3 details",
                  desc: "Type your client name, scope of work, and budget. Industry is optional but improves the result.",
                },
                {
                  step: "2",
                  title: "AI generates your proposal",
                  desc: "Google Gemini writes a complete, industry-appropriate proposal with introduction, pricing, and timeline.",
                },
                {
                  step: "3",
                  title: "Edit & copy",
                  desc: "Tweak the result directly in your browser, then copy it to your email or document with one click.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border border-gray-100 p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Built for small business owners &amp; freelancers
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {[
              "Plumbers & contractors",
              "Interior designers",
              "Marketing consultants",
              "Web developers",
              "Landscapers & gardeners",
              "Accountants & bookkeepers",
            ].map((role) => (
              <div key={role} className="flex items-center gap-2 rounded-lg bg-white border border-gray-100 px-4 py-3 text-gray-700">
                <span className="text-blue-500">✓</span> {role}
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}
