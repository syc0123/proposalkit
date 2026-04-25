"use client";

import { useState, useCallback } from "react";

interface ProposalResultProps {
  text: string;
  onTextChange?: (text: string) => void;
}

export function ProposalResult({ text, onTextChange }: ProposalResultProps) {
  const [editedText, setEditedText] = useState(text);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setEditedText(newText);
      onTextChange?.(newText);
    },
    [onTextChange]
  );

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(editedText);
      } else {
        // @AX:NOTE: [AUTO] execCommand("copy") is deprecated — legacy fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = editedText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }, [editedText]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">생성된 제안서</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 min-h-[44px]"
          aria-label="제안서 복사"
        >
          {copyStatus === "copied" ? (
            <span className="text-green-600">✓ 복사되었습니다</span>
          ) : copyStatus === "error" ? (
            <span className="text-red-500">복사 실패</span>
          ) : (
            <span>복사</span>
          )}
        </button>
      </div>

      <textarea
        value={editedText}
        onChange={handleChange}
        rows={20}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        aria-label="제안서 편집"
      />

      <p className="text-xs text-gray-400">
        제안서를 직접 수정할 수 있습니다. 수정 내용은 자동으로 저장되지 않습니다.
      </p>
    </div>
  );
}
