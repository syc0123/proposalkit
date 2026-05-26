"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie consent banner — required for GDPR/CCPA compliance and AdSense.
// Stores consent state in localStorage so the banner doesn't re-appear after dismissal.

const STORAGE_KEY = "pk:cookie_consent";

type ConsentState = "accepted" | "declined" | "pending";

export default function CookieConsent() {
  const [state, setState] = useState<ConsentState>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setState(stored);
      }
    } catch {
      // localStorage unavailable — show banner
    }
  }, []);

  function persist(value: ConsentState) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable — state still updates in memory
    }
    setState(value);
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted || state !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        padding: "16px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--ink-700)",
              margin: 0,
            }}
          >
            We use cookies and similar technologies to keep you signed in, remember your
            preferences, and understand how the site is used. We do not use advertising cookies and
            do not sell your data. See our{" "}
            <Link
              href="/privacy"
              style={{ color: "#2563EB", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => persist("declined")}
            style={{
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--ink-700)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => persist("accepted")}
            style={{
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              background: "#2563EB",
              border: "1px solid #2563EB",
              borderRadius: 6,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
