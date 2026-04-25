"use client";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  remaining?: number;
}

export function UpgradeModal({ isOpen, onClose, remaining = 0 }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900">Monthly limit reached</h2>
        <p className="mt-2 text-sm text-gray-600">
          {remaining === 0
            ? "You've used all 5 free proposals this month."
            : `${remaining} proposals remaining`}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Upgrade to Pro for unlimited proposals.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {/* @AX:TODO: [AUTO] Sprint 3에서 Stripe 결제 연동 필요 — 현재 disabled */}
          <button
            disabled
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white opacity-60 cursor-not-allowed min-h-[44px]"
            title="Coming soon"
          >
            Upgrade to Pro — $9.99/month (coming soon)
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
