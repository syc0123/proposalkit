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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          업종 <span className="text-gray-400 text-xs">(선택)</span>
        </label>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="예: 배관, 인테리어, 컨설팅"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          고객명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="예: 홍길동 고객님"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          작업 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={scope}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) setScope(e.target.value);
          }}
          placeholder="예: 욕실 배관 교체 및 누수 수리, 타일 주변 방수 처리 포함"
          rows={4}
          required
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            isOverLimit ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div
          className={`text-xs text-right mt-1 ${
            isOverLimit ? "text-red-500 font-medium" : "text-gray-400"
          }`}
        >
          {totalChars}/{MAX_CHARS}자
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          예산 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="예: 50만원, 협의 가능"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
      >
        {isLoading ? "생성 중..." : "제안서 생성하기"}
      </button>
    </form>
  );
}
