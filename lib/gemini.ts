import type { ProposalInput, ProposalOutput } from "@/types/proposal";

// gemini-2.5-flash experiences intermittent 503 (high demand) on free tier.
// gemini-2.5-flash-lite provides the same quality with better availability.
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

function buildPrompt(input: ProposalInput): string {
  const industry = input.industry?.trim() || "General";
  return `You are an expert proposal writer helping small business owners win clients.
Use industry-appropriate terminology while keeping the proposal clear and easy for clients to understand.

Please write a professional business proposal based on the following information:
Industry: ${industry}
Prepared by: ${input.yourName?.trim() || "Not specified"}
Client Name: ${input.clientName}
Scope of Work: ${input.scope}
Budget: ${input.budget}
Timeline: ${input.timeline?.trim() || "To be discussed"}

Structure the proposal as follows:
1. Executive Summary
2. Problem Statement & Client Needs
3. Proposed Solution & Scope of Work
4. Timeline & Milestones
5. Investment (Pricing & Cost Breakdown)
6. Why Choose Us
7. Next Steps & Call to Action

Write in Markdown format. Use professional American business English.
If "Prepared by" is specified, include it in the header/closing.`;
}

export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly isQuotaExceeded: boolean = false
  ) {
    super(message);
    this.name = "GeminiError";
  }
}

// @AX:ANCHOR: [AUTO] primary generation entry point — called by route handler and tests
export async function generateProposal(
  input: ProposalInput
): Promise<ProposalOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiError("GEMINI_API_KEY is not configured", 500);
  }

  const prompt = buildPrompt(input);

  let response: Response;
  try {
    response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });
  } catch {
    throw new GeminiError("Please try again in a moment.", 503);
  }

  if (response.status === 429) {
    // @AX:NOTE: [AUTO] heuristic quota detection — "quota"/"rate" substring in body
    const body = await response.json().catch(() => ({}));
    const isQuota =
      JSON.stringify(body).toLowerCase().includes("quota") ||
      JSON.stringify(body).toLowerCase().includes("rate");
    throw new GeminiError(
      isQuota
        ? "Daily quota exceeded. Please try again tomorrow."
        : "Please try again in a moment.",
      503,
      isQuota
    );
  }

  if (!response.ok) {
    throw new GeminiError("Please try again in a moment.", 503);
  }

  const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const rawText: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!rawText) {
    throw new GeminiError("Failed to generate proposal. Please try again.", 503);
  }

  // @AX:NOTE: [AUTO] strip markdown code fence wrapper — Gemini occasionally wraps output in
  // ```markdown ... ``` which causes react-markdown to render raw monospace text instead of HTML
  const codeFenceMatch = rawText.match(/^```(?:\w+)?\n([\s\S]*?)\n```\s*$/);
  const text = codeFenceMatch ? codeFenceMatch[1] : rawText;

  return {
    text,
    generatedAt: new Date().toISOString(),
  };
}
