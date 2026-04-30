"use client";

import { useState } from "react";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalResult } from "@/components/ProposalResult";
import { UpgradeModal } from "@/components/UpgradeModal";
import type { ProposalInput, ProposalOutput, GenerateApiResponse } from "@/types/proposal";
import { saveProposal, loadProposal } from "@/lib/proposal-storage";

export function DashboardClient() {
  const [proposal, setProposal] = useState<ProposalOutput | null>(() => {
    if (typeof window === "undefined") return null;
    return loadProposal();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      if (res.status === 429) { setShowUpgrade(true); return; }
      if (!res.ok || !data.proposal) { setError(data.error ?? "Generation failed. Please try again."); return; }
      setProposal(data.proposal);
      saveProposal(data.proposal);
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`grid gap-6 ${proposal ? "sm:grid-cols-2" : ""}`}>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">New Proposal</h2>
        <ProposalForm onSubmit={handleGenerate} isLoading={isLoading} />
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
      {proposal && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <ProposalResult key={proposal.generatedAt} text={proposal.text} />
        </div>
      )}
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}
