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

// Simulate the route context that Next.js App Router provides for [...nextauth]
function makeCtx(segments: string[]) {
  return { params: Promise.resolve({ nextauth: segments }) };
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
    result.authSecretLen = (cfEnvObj.AUTH_SECRET ?? "").length;
    result.authSecretType = typeof cfEnvObj.AUTH_SECRET;
    result.googleIdLen = (cfEnvObj.AUTH_GOOGLE_ID ?? "").length;
    result.googleSecretLen = (cfEnvObj.AUTH_GOOGLE_SECRET ?? "").length;
    result.authUrlValue = cfEnvObj.AUTH_URL ?? "(not set)";
  } catch (e) {
    result.cfEnvError = String(e);
  }

  // 2. Test with NextRequest + ctx (simulating App Router behavior)
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
    });

    const testUrl = new URL(req.url);
    testUrl.pathname = "/api/auth/signin/google";
    testUrl.search = "?callbackUrl=%2F";

    const nextReq = toNextRequest(new Request(testUrl.toString(), { method: "GET", headers: req.headers }));

    // Pass ctx with params.nextauth = ["signin", "google"] — the fix
    const ctx = makeCtx(["signin", "google"]);
    type HandlerFn = (req: NextRequest, ctx?: unknown) => Promise<Response>;
    const resp = await (handlers.GET as HandlerFn)(nextReq, ctx);

    result.signinResult = {
      status: resp.status,
      location: resp.headers.get("location") ?? null,
      isGoogleOAuth: resp.headers.get("location")?.includes("accounts.google.com") ?? false,
    };

  } catch (e) {
    result.signinTestError = String(e);
    result.signinTestStack = (e as Error).stack ?? null;
  }

  return Response.json(result);
}
