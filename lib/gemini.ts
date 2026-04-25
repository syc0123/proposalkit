import type { ProposalInput, ProposalOutput } from "@/types/proposal";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function buildPrompt(input: ProposalInput): string {
  const industry = input.industry?.trim() || "General";
  return `You are an expert proposal writer helping small business owners win clients.
Use industry-appropriate terminology while keeping the proposal clear and easy for clients to understand.

Please write a professional business proposal based on the following information:
Industry: ${industry}
Client Name: ${input.clientName}
Scope of Work: ${input.scope}
Budget: ${input.budget}

Structure the proposal as follows:
1. Introduction & Greeting
2. Scope of Work & Deliverables
3. Timeline & Milestones
4. Pricing & Cost Breakdown
5. Closing & Contact Information

Write in Markdown format.`;
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
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) {
    throw new GeminiError("Failed to generate proposal. Please try again.", 503);
  }

  return {
    text,
    generatedAt: new Date().toISOString(),
  };
}
