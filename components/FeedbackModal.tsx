"use client";

import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Bug Report",
  "Feature Request",
  "General Feedback",
  "Other",
] as const;

const PLACEHOLDERS: Record<string, string> = {
  "Bug Report":
    "Describe the issue or unexpected behavior you encountered.\ne.g. 'The generate button does nothing when I click it' / 'PDF download isn't working'",
  "Feature Request":
    "Share a feature idea or improvement you'd like to see.\ne.g. 'It would be great to save proposals and revisit them later'",
  "General Feedback":
    "Tell us what you think — what you liked, what felt off, or what you'd change.\ne.g. 'The proposal tone feels a bit too formal'",
  "Other":
    "Anything else on your mind — questions, thoughts, or just a hello.",
};

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [category, setCategory] = useState<string>("General Feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!isOpen) return null;

  function handleClose() {
    setCategory("General Feedback");
    setMessage("");
    setEmail("");
    setStatus("idle");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, message, email }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    background: "var(--surface)",
    color: "var(--ink-900)",
    fontSize: 13.5,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <>
      {/* backdrop */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 190 }}
        onClick={handleClose}
        aria-hidden
      />
      {/* sheet */}
      <div
        role="dialog"
        aria-modal
        aria-label="Share feedback"
        style={{
          position: "fixed",
          bottom: 80,
          right: 24,
          zIndex: 200,
          width: 340,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-card)",
          padding: 24,
        }}
      >
        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🙏</div>
            <p style={{ fontWeight: 600, color: "var(--ink-900)", marginBottom: 6, fontSize: 15 }}>
              Thanks for your feedback!
            </p>
            <p style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 20, lineHeight: 1.5 }}>
              We read every message and use it to improve ProposalKit.
            </p>
            <button className="btn btn-primary btn-sm" onClick={handleClose} style={{ width: "100%" }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-900)" }}>Share Feedback</h3>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-400)", fontSize: 20, lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 10 }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 10 }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={PLACEHOLDERS[category] ?? "내용을 입력해주세요."}
                required
                maxLength={1000}
                rows={4}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional — for follow-up)"
                style={inputStyle}
              />
            </div>

            {status === "error" && (
              <p style={{ fontSize: 12, color: "#DC2626", marginBottom: 8 }}>
                Failed to send. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={!message.trim() || status === "sending"}
              style={{ width: "100%", cursor: "pointer" }}
            >
              {status === "sending" ? "Sending…" : "Send Feedback"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
