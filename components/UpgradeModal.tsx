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
        <h2 className="text-lg font-bold text-gray-900">이번 달 무료 한도 초과</h2>
        <p className="mt-2 text-sm text-gray-600">
          {remaining === 0
            ? "이번 달 무료 5회를 모두 사용했습니다."
            : `남은 횟수: ${remaining}회`}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Pro 플랜으로 업그레이드하면 무제한으로 이용할 수 있습니다.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {/* @AX:TODO: [AUTO] Sprint 3에서 Stripe 결제 연동 필요 — 현재 disabled */}
          <button
            disabled
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white opacity-60 cursor-not-allowed min-h-[44px]"
            title="Coming soon"
          >
            Pro 업그레이드 — $9.99/월 (준비 중)
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
