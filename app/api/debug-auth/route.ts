export const runtime = "edge";

// TEMPORARY debug endpoint — remove after auth is fixed

import { NextRequest } from "next/server";

function toNextRequest(req: Request): NextRequest {
  return new NextRequest(req.url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    // @ts-expect-error duplex required for streaming body
    duplex: "half",
  });
}

function patchNextUrl(req: Request): Request {
  if (!("nextUrl" in req)) {
    Object.defineProperty(req, "nextUrl", {
      value: new URL(req.url),
      writable: true,
      configurable: true,
    });
  }
  return req;
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
    result.googleIdPrefix = (cfEnvObj.AUTH_GOOGLE_ID ?? "").slice(0, 12) + "...";
  } catch (e) {
    result.cfEnvError = String(e);
  }

  // 2. Check NextRequest.nextUrl presence
  try {
    const testUrl = new URL(req.url);
    testUrl.pathname = "/api/auth/signin/google";
    testUrl.search = "?callbackUrl=%2F";

    const wrappedReq = toNextRequest(new Request(testUrl.toString(), { method: "GET", headers: req.headers }));
    result.nextUrlCheck = {
      hasNextUrl: "nextUrl" in wrappedReq,
      nextUrlHref: (wrappedReq as NextRequest).nextUrl?.href ?? null,
      nextUrlPathname: (wrappedReq as NextRequest).nextUrl?.pathname ?? null,
    };
  } catch (e) {
    result.nextUrlCheckError = String(e);
  }

  // 3. Test with new NextRequest wrapping
  try {
    const { default: NextAuth } = await import("next-auth");
    const { default: Google } = await import("next-auth/providers/google");

    const { handlers } = NextAuth({
      trustHost: true,
      secret: cfEnvObj.AUTH_SECRET ?? process.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: cfEnvObj.AUTH_GOOGLE_ID ?? "",
          clientSecret: cfEnvObj.AUTH_GOOGLE_SECRET ?? "",
        }),
      ],
      session: { strategy: "jwt" },
    });

    const testUrl = new URL(req.url);
    testUrl.pathname = "/api/auth/signin/google";
    testUrl.search = "?callbackUrl=%2F";

    // Test A: plain NextRequest (same as our fixed auth route)
    const nextReq = toNextRequest(new Request(testUrl.toString(), { method: "GET", headers: req.headers }));
    try {
      const resp = await handlers.GET(nextReq);
      result.testA_nextRequest = {
        status: resp.status,
        location: resp.headers.get("location") ?? null,
        body: resp.status !== 302 ? await resp.text().catch(() => null) : null,
      };
    } catch (e) {
      result.testA_error = String(e);
      result.testA_stack = (e as Error).stack ?? null;
    }

    // Test B: patched plain Request (add nextUrl as URL directly)
    const plainReq = new Request(testUrl.toString(), { method: "GET", headers: req.headers });
    const patchedReq = patchNextUrl(plainReq) as Parameters<typeof handlers.GET>[0];
    try {
      const resp2 = await handlers.GET(patchedReq);
      result.testB_patched = {
        status: resp2.status,
        location: resp2.headers.get("location") ?? null,
        body: resp2.status !== 302 ? await resp2.text().catch(() => null) : null,
      };
    } catch (e) {
      result.testB_error = String(e);
      result.testB_stack = (e as Error).stack ?? null;
    }

  } catch (e) {
    result.signinTestError = String(e);
    result.signinTestStack = (e as Error).stack ?? null;
  }

  return Response.json(result);
}
