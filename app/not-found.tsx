export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" data-theme="light">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "var(--bg, #fff)",
          color: "var(--ink-900, #111)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, margin: "0 0 8px" }}>404</h1>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 24 }}>
            This page could not be found.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#2563EB",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
