// Client-side localStorage helper for persisting the last generated proposal.
// Survives page refresh; expires after 24 hours.

import type { ProposalOutput } from "@/types/proposal";

const KEY = "pk:last_proposal";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface StoredProposal {
  proposal: ProposalOutput;
  savedAt: number;
}

export function saveProposal(proposal: ProposalOutput): void {
  try {
    const data: StoredProposal = { proposal, savedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Ignore: storage quota exceeded or private browsing mode
  }
}

export function loadProposal(): ProposalOutput | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { proposal, savedAt } = JSON.parse(raw) as StoredProposal;
    if (Date.now() - savedAt > TTL_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return proposal;
  } catch {
    return null;
  }
}
