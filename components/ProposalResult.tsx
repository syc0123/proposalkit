"use client";

import { useState, useCallback } from "react";

interface ProposalResultProps {
  text: string | null;
  isLoading?: boolean;
  showSignin?: boolean;
}

export function ProposalResult({ text, isLoading, showSignin }: ProposalResultProps) {
  const [editedText, setEditedText] = useState(text ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const displayText = editedText || text || "";
  const wordCount = displayText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const isEmpty = !text && !isLoading;

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(displayText);
      } else {
        // @AX:NOTE: [AUTO] execCommand("copy") is deprecated — legacy fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = displayText;
        ta.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }, [displayText]);

  return (
    <div className={`result-card${isEmpty ? " result-empty" : ""}`}>
      <div className="card-head">
        <h3>{isEmpty ? "Your proposal will appear here" : "Generated Proposal"}</h3>
        {!isEmpty && !isLoading && (
          <div className="card-head-actions">
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => setIsEditing((v) => !v)}
            >
              {isEditing ? "Done" : "Edit"}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={handleCopy}
              aria-label="Copy proposal"
            >
              {copyStatus === "copied" ? "✓ Copied" : copyStatus === "error" ? "Failed" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {isEmpty ? (
        <EmptySkeleton />
      ) : isLoading ? (
        <LoadingState />
      ) : isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="result-text"
          aria-label="Edit proposal"
        />
      ) : (
        <div className="result-rendered">
          <pre
            style={{
              margin: 0,
              fontFamily: "inherit",
              fontSize: 14,
              lineHeight: 1.65,
              whiteSpace: "pre-wrap",
              color: "var(--ink-700)",
            }}
          >
            {displayText}
          </pre>
        </div>
      )}

      {!isEmpty && !isLoading && (
        <div className="result-foot">
          <span>
            {isEditing
              ? "Edit mode · markdown syntax supported"
              : <>Click <strong>Edit</strong> to tweak the proposal directly.</>}
          </span>
          <span className="result-meta">
            {displayText.length.toLocaleString()} chars · ~{readTime} min read
          </span>
        </div>
      )}

      {showSignin && !isEmpty && !isLoading && (
        <div
          className="signin-banner"
          style={{
            borderColor: "rgba(37,99,235,0.2)",
            background: "rgba(37,99,235,0.05)",
          }}
        >
          <div className="signin-text">
            <strong>Sign in to save proposals</strong>
            <span>and generate more — free, no credit card.</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/auth/signin/google?callbackUrl=/"
            className="btn btn-google"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2.01c-.71.48-1.63.76-2.71.76-2.09 0-3.86-1.41-4.49-3.3H.84v2.07A8 8 0 008 16z" fill="#34A853"/>
              <path d="M3.51 9.51A4.8 4.8 0 013.26 8c0-.52.09-1.03.25-1.51V4.42H.84A8 8 0 000 8c0 1.3.31 2.52.84 3.58l2.67-2.07z" fill="#FBBC05"/>
              <path d="M8 3.18c1.18 0 2.23.41 3.06 1.2l2.3-2.3A8 8 0 00.84 4.42l2.67 2.07C4.14 4.59 5.91 3.18 8 3.18z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
        </div>
      )}
    </div>
  );
}

function EmptySkeleton() {
  return (
    <div className="empty">
      <div className="empty-skeleton">
        <div className="sk-line sk-line-h" />
        <div className="sk-line sk-line-meta" />
        <div className="sk-block">
          <div className="sk-line w90" />
          <div className="sk-line w75" />
          <div className="sk-line w85" />
        </div>
        <div className="sk-block">
          <div className="sk-line w60 head" />
          <div className="sk-line w95" />
          <div className="sk-line w80" />
        </div>
      </div>
      <div className="empty-cta" style={{ color: "#2563EB" }}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Fill in the form to generate
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading">
      <div className="loading-bar">
        <span />
      </div>
      <div className="loading-steps">
        <span className="ls active">Reading scope</span>
        <span className="ls active">Drafting sections</span>
        <span className="ls">Polishing tone</span>
      </div>
    </div>
  );
}
