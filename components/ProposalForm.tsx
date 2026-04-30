"use client";

import { useState, useCallback } from "react";
import type { ProposalInput } from "@/types/proposal";

const MAX_CHARS = 500;

interface ProposalFormProps {
  onSubmit: (input: ProposalInput) => void;
  isLoading?: boolean;
}

export function ProposalForm({ onSubmit, isLoading = false }: ProposalFormProps) {
  const [industry, setIndustry] = useState("");
  const [clientName, setClientName] = useState("");
  const [scope, setScope] = useState("");
  const [budget, setBudget] = useState("");

  const totalChars = scope.length;
  const isOverLimit = totalChars > MAX_CHARS;
  const isValid = clientName.trim() && scope.trim() && budget.trim() && !isOverLimit;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid || isLoading) return;
      onSubmit({
        industry: industry.trim() || undefined,
        clientName: clientName.trim(),
        scope: scope.trim(),
        budget: budget.trim(),
      });
    },
    [industry, clientName, scope, budget, isValid, isLoading, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label className="field">
        <div className="field-row">
          <span className="field-label">Industry</span>
          <span className="field-opt">optional</span>
        </div>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g. Plumbing, Interior Design, Consulting"
        />
      </label>

      <label className="field">
        <div className="field-row">
          <span className="field-label">
            Client Name <span className="field-req">*</span>
          </span>
        </div>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g. John Smith"
          required
        />
      </label>

      <label className="field field-grow">
        <div className="field-row">
          <span className="field-label">
            Scope of Work <span className="field-req">*</span>
          </span>
          <span
            className="field-counter"
            style={isOverLimit ? { color: "#DC2626" } : undefined}
          >
            {totalChars}/{MAX_CHARS}
          </span>
        </div>
        <textarea
          value={scope}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) setScope(e.target.value);
          }}
          placeholder="e.g. Bathroom pipe replacement and leak repair, including waterproofing around tiles"
          rows={4}
          required
          className="grow-textarea"
          style={isOverLimit ? { borderColor: "#DC2626" } : undefined}
        />
      </label>

      <label className="field">
        <div className="field-row">
          <span className="field-label">
            Budget <span className="field-req">*</span>
          </span>
        </div>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. $500, negotiable"
          required
        />
      </label>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn btn-primary btn-block"
      >
        {isLoading ? (
          <>
            <span className="spinner" />
            Generating…
          </>
        ) : (
          <>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" style={{ flexShrink: 0 }}>
              <path
                d="M8 2v4M8 10v4M2 8h4M10 8h4M4 4l2.5 2.5M11.5 11.5L9.5 9.5M4 12l2.5-2.5M11.5 4.5L9.5 6.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Generate Proposal
          </>
        )}
      </button>
      <p className="form-foot">
        By generating, you agree to our terms. Drafts are not stored unless you sign in.
      </p>
    </form>
  );
}
