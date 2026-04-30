export const runtime = "edge";

// TEMPORARY debug endpoint — remove after auth is fixed

import { NextRequest } from "next/server";

function toNextRequest(req: Request): NextRequest {
  return new NextRequest(req.url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    // duplex required for streaming body
    duplex: "half",
  });
}

export async function GET(req: Request): Promise<Response> {
  const result: Record<string, unknown> = {};

  // 1. Check env vars
  let cfEnvObj: Record<string, string | undefined> = {};
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    cfEnvObj = getRequestContext().env as Record<string, string | undefined>;
    result.cfEnvKeys = Object.keys(cfEnvObj).filter(k =>
      ["AUTH_GOOGLE_ID","AUTH_GOOGLE_SECRET","AUTH_SECRET","AUTH_URL","AUTH_TRUST_HOST"].includes(k)
    );
    result.googleIdLen = (cfEnvObj.AUTH_GOOGLE_ID ?? "").length;
    result.googleSecretLen = (cfEnvObj.AUTH_GOOGLE_SECRET ?? "").length;
    result.authSecretLen = (cfEnvObj.AUTH_SECRET ?? "").length;
    result.authSecretType = typeof cfEnvObj.AUTH_SECRET;
    result.authUrlValue = cfEnvObj.AUTH_URL ?? "(not set)";
    result.authTrustHostValue = cfEnvObj.AUTH_TRUST_HOST ?? "(not set)";
  } catch (e) {
    result.cfEnvError = String(e);
  }

  // 2. Test with NextRequest wrapping + catch the actual error
  try {
    const { default: NextAuth } = await import("next-auth");
    const { default: Google } = await import("next-auth/providers/google");

    const secret = cfEnvObj.AUTH_SECRET;
    result.secretPassedToNextAuth = secret ? `${String(secret).length} chars` : "(falsy)";

    const { handlers } = NextAuth({
      trustHost: true,
      secret,
      providers: [
        Google({
          clientId: cfEnvObj.AUTH_GOOGLE_ID ?? "",
          clientSecret: cfEnvObj.AUTH_GOOGLE_SECRET ?? "",
        }),
      ],
      session: { strategy: "jwt" },
      logger: {
        error(err) {
          // captured below via result
          result.nextAuthInternalError = {
            name: (err as Error).name ?? "unknown",
            message: (err as Error).message ?? String(err),
          };
        },
      },
    });

    const testUrl = new URL(req.url);
    testUrl.pathname = "/api/auth/signin/google";
    testUrl.search = "?callbackUrl=%2F";

    const nextReq = toNextRequest(new Request(testUrl.toString(), { method: "GET", headers: req.headers }));
    const resp = await handlers.GET(nextReq);

    result.signinResult = {
      status: resp.status,
      location: resp.headers.get("location") ?? null,
      contentType: resp.headers.get("content-type") ?? null,
    };

    // If not a redirect, grab the body for more info
    if (resp.status !== 302 && resp.status !== 301) {
      const body = await resp.text().catch(() => null);
      result.signinBody = body ? body.slice(0, 500) : null;
    }

  } catch (e) {
    result.signinTestError = String(e);
    result.signinTestStack = (e as Error).stack ?? null;
  }

  return Response.json(result);
}
