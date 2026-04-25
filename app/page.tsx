"use client";

import { useState } from "react";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalResult } from "@/components/ProposalResult";
import { LoginPrompt } from "@/components/LoginPrompt";
import { UpgradeModal } from "@/components/UpgradeModal";
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
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            ProposalKit
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Enter your industry, client & scope — get a professional proposal in 30 seconds.
          </p>
        </div>

        {/* Main grid */}
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
      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </main>
  );
}
