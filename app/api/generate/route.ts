import { type NextRequest, NextResponse } from "next/server";
import { generateProposal, GeminiError } from "@/lib/gemini";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getCurrentUserId } from "@/lib/auth-helpers";
import type { GenerateApiRequest, GenerateApiResponse } from "@/types/proposal";

export const runtime = "edge";

function validateInput(body: unknown): body is GenerateApiRequest {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.clientName === "string" &&
    b.clientName.trim().length > 0 &&
    typeof b.scope === "string" &&
    b.scope.trim().length > 0 &&
    b.scope.length <= 500 &&
    typeof b.budget === "string" &&
    b.budget.trim().length > 0
  );
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateApiResponse>> {
  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (!validateInput(body)) {
    return NextResponse.json(
      { error: "필수 항목(고객명, 작업 내용, 예산)을 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  const userId = await getCurrentUserId();

  // Rate limit check — only for authenticated users
  if (userId) {
    // Access KV binding via @cloudflare/next-on-pages
    let kv: Parameters<typeof checkAndIncrement>[1] | undefined;
    // @AX:WARN: [AUTO] dynamic import fails outside Cloudflare Workers runtime — in-memory fallback
    try {
      const { getRequestContext } = await import("@cloudflare/next-on-pages");
      const ctx = getRequestContext();
      kv = (ctx.env as Record<string, unknown>)["RATE_LIMIT_KV"] as Parameters<typeof checkAndIncrement>[1];
    } catch {
      // Local dev without wrangler — use in-memory fallback (undefined kv)
    }

    const rateLimitResult = await checkAndIncrement(userId, kv);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "이번 달 무료 한도(5회)를 모두 사용했습니다.",
          rateLimitRemaining: 0,
        },
        { status: 429 }
      );
    }
  }
  // @AX:NOTE: [AUTO] guest bypass is client-side only (sessionStorage) — server does not enforce
  // Guest users: no server-side rate limit (client sessionStorage handles 1-free)

  // Generate proposal
  try {
    const proposal = await generateProposal({
      industry: typeof body.industry === "string" ? body.industry : undefined,
      clientName: body.clientName,
      scope: body.scope,
      budget: body.budget,
    });

    return NextResponse.json({ proposal });
  } catch (err) {
    if (err instanceof GeminiError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode });
    }
    return NextResponse.json(
      { error: "잠시 후 다시 시도해 주세요." },
      { status: 503 }
    );
  }
}
