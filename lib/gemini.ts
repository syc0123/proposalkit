import type { ProposalInput, ProposalOutput } from "@/types/proposal";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function buildPrompt(input: ProposalInput): string {
  const industry = input.industry?.trim() || "일반";
  return `당신은 소상공인의 견적서/제안서 작성을 돕는 전문가입니다.
업종 맥락에 맞는 전문 용어를 사용하되 고객이 이해하기 쉽게 작성하세요.

아래 정보를 바탕으로 전문 제안서를 작성해주세요:
업종: ${industry}
고객명: ${input.clientName}
작업 내용: ${input.scope}
예산: ${input.budget}

다음 구조로 작성하세요:
1. 인사 및 소개
2. 작업 범위 및 내용
3. 예상 일정/단계
4. 견적 및 비용 근거
5. 마무리 및 연락처 안내

마크다운 형식으로 작성하세요.`;
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
    throw new GeminiError("잠시 후 다시 시도해 주세요.", 503);
  }

  if (response.status === 429) {
    // @AX:NOTE: [AUTO] heuristic quota detection — "quota"/"rate" substring in body
    const body = await response.json().catch(() => ({}));
    const isQuota =
      JSON.stringify(body).toLowerCase().includes("quota") ||
      JSON.stringify(body).toLowerCase().includes("rate");
    throw new GeminiError(
      isQuota
        ? "오늘 사용량이 초과됐습니다. 내일 다시 시도해 주세요."
        : "잠시 후 다시 시도해 주세요.",
      503,
      isQuota
    );
  }

  if (!response.ok) {
    throw new GeminiError("잠시 후 다시 시도해 주세요.", 503);
  }

  const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) {
    throw new GeminiError("제안서를 생성하지 못했습니다. 다시 시도해 주세요.", 503);
  }

  return {
    text,
    generatedAt: new Date().toISOString(),
  };
}
