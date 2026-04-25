"use client";

import { GoogleSignInButton } from "@/components/GoogleSignInButton";

interface LoginPromptProps {
  onDismiss?: () => void;
}

export function LoginPrompt({ onDismiss }: LoginPromptProps) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-blue-900">
          제안서를 저장하고 더 많이 생성하려면 로그인하세요
        </p>
        <p className="text-xs text-blue-700 mt-1">
          로그인 후 매월 5회 무료 · 로고 및 회사 정보 자동 삽입
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <GoogleSignInButton callbackUrl="/dashboard" className="flex-1" />
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-xs text-blue-500 underline px-2 min-h-[44px]"
          >
            나중에
          </button>
        )}
      </div>
    </div>
  );
}
