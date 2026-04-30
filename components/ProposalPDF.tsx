// Utility: markdown → react-pdf document → download as .pdf
// All @react-pdf/renderer imports are dynamic to keep it out of the initial bundle.

import type { ReactNode } from "react";

// Parse **bold** and *italic* inline markdown into react-pdf Text nodes.
// react-pdf requires JSX from @react-pdf/renderer — must be called after dynamic import.
function parseInline(
  str: string,
  TextComp: React.ElementType,
): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  for (const m of str.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push(str.slice(last, idx));
    if (m[1] !== undefined)
      parts.push(
        <TextComp key={idx} style={{ fontFamily: "Helvetica-Bold" }}>
          {m[1]}
        </TextComp>
      );
    else if (m[2] !== undefined)
      parts.push(
        <TextComp key={idx} style={{ fontFamily: "Helvetica-Oblique" }}>
          {m[2]}
        </TextComp>
      );
    last = idx + m[0].length;
  }
  if (last < str.length) parts.push(str.slice(last));
  return parts.length ? parts : [str];
}

export async function downloadProposalPDF(text: string): Promise<void> {
  // @AX:NOTE: [AUTO] lazy-loaded to exclude ~285KB from initial bundle
  const { pdf, Document, Page, Text, View, StyleSheet } =
    await import("@react-pdf/renderer");

  const S = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 52,
      paddingBottom: 52,
      paddingHorizontal: 56,
      color: "#374151",
      lineHeight: 1.55,
    },
    h1: { fontFamily: "Helvetica-Bold", fontSize: 18, marginBottom: 10, color: "#0B1220" },
    h2Wrap: { marginTop: 22, marginBottom: 6, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
    h2: { fontFamily: "Helvetica-Bold", fontSize: 13, color: "#0B1220" },
    h3: { fontFamily: "Helvetica-Bold", fontSize: 11.5, marginTop: 16, marginBottom: 4, color: "#0B1220" },
    para: { marginBottom: 8, lineHeight: 1.6 },
    bulletRow: { flexDirection: "row", marginBottom: 4, paddingLeft: 10 },
    bulletMark: { width: 16, color: "#2563EB" },
    bulletText: { flex: 1, lineHeight: 1.5 },
    hr: { borderTopWidth: 1, borderTopColor: "#E5E7EB", marginTop: 14, marginBottom: 14 },
    tableCell: { marginBottom: 6, color: "#374151" },
  });

  const pi = (str: string) => parseInline(str, Text);
  const nodes: ReactNode[] = [];

  text.split("\n").forEach((line, i) => {
    if (line.startsWith("# ")) {
      nodes.push(<Text key={i} style={S.h1}>{pi(line.slice(2))}</Text>);
    } else if (line.startsWith("## ")) {
      nodes.push(
        <View key={i} style={S.h2Wrap}>
          <Text style={S.h2}>{pi(line.slice(3))}</Text>
        </View>
      );
    } else if (line.startsWith("### ")) {
      nodes.push(<Text key={i} style={S.h3}>{pi(line.slice(4))}</Text>);
    } else if (/^[-*] /.test(line)) {
      nodes.push(
        <View key={i} style={S.bulletRow}>
          <Text style={S.bulletMark}>•</Text>
          <Text style={S.bulletText}>{pi(line.slice(2))}</Text>
        </View>
      );
    } else if (/^(\d+)\. (.+)/.test(line)) {
      const m = line.match(/^(\d+)\. (.+)/)!;
      nodes.push(
        <View key={i} style={S.bulletRow}>
          <Text style={S.bulletMark}>{m[1]}.</Text>
          <Text style={S.bulletText}>{pi(m[2])}</Text>
        </View>
      );
    } else if (/^-{3,}$/.test(line.trim())) {
      nodes.push(<View key={i} style={S.hr} />);
    } else if (/^\|/.test(line) && !/^\|[-:|]/.test(line)) {
      // Table row — render cells as plain text (skip separator rows)
      const cells = line.split("|").filter(c => c.trim()).map(c => c.trim()).join("   ");
      nodes.push(<Text key={i} style={S.tableCell}>{cells}</Text>);
    } else if (line.trim()) {
      nodes.push(<Text key={i} style={S.para}>{pi(line)}</Text>);
    }
  });

  // Extract title from first H1 for the filename
  const titleLine = text.split("\n").find(l => l.startsWith("# "));
  const title = titleLine ? titleLine.slice(2).trim() : "Proposal";
  const filename = title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 60) + ".pdf";

  const blob = await pdf(
    <Document title={title}>
      <Page size="A4" style={S.page}>{nodes}</Page>
    </Document>
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
