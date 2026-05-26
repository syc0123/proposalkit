export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" data-theme="light">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          background: "#fff",
          color: "#111",
        }}
      >
        <main
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Error 404
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2 }}>
            We couldn&apos;t find that page
          </h1>
          <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 40, lineHeight: 1.65 }}>
            The link you followed may be broken, or the page may have moved. Here are a few places
            that might help.
          </p>

          <div
            style={{
              textAlign: "left",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
            }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#374151" }}>
              Popular destinations
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 10 }}>
                <Link href="/" style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}>
                  → Home: free proposal generator
                </Link>
              </li>
              <li style={{ marginBottom: 10 }}>
                <Link
                  href="/guides"
                  style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}
                >
                  → Proposal writing guides
                </Link>
              </li>
              <li style={{ marginBottom: 10 }}>
                <Link
                  href="/for/freelancers"
                  style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}
                >
                  → Proposals for freelancers
                </Link>
              </li>
              <li style={{ marginBottom: 10 }}>
                <Link
                  href="/for/contractors"
                  style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}
                >
                  → Proposals for contractors
                </Link>
              </li>
              <li style={{ marginBottom: 10 }}>
                <Link
                  href="/about"
                  style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}
                >
                  → About ProposalKit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: "#2563EB", fontSize: 15, textDecoration: "none" }}
                >
                  → Contact us
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#2563EB",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Go to homepage
          </Link>
        </main>
      </body>
    </html>
  );
}
