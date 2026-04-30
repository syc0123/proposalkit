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
          Sign in to save proposals and generate more
        </p>
        <p className="text-xs text-blue-700 mt-1">
          5 free proposals/month · Auto-insert your logo &amp; business info
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <GoogleSignInButton callbackUrl="/" className="flex-1" />
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-xs text-blue-500 underline px-2 min-h-[44px]"
          >
            Maybe later
          </button>
        )}
      </div>
    </div>
  );
}
