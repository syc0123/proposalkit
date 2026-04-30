export const runtime = "edge";

// TEMPORARY debug endpoint — remove after auth is fixed

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

  // 2. Try actual signin handler call
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

    // Simulate a GET to /api/auth/signin/google
    const testUrl = new URL(req.url);
    testUrl.pathname = "/api/auth/signin/google";
    testUrl.search = "?callbackUrl=%2F";
    const testReq = new Request(testUrl.toString(), { method: "GET", headers: req.headers });

    const resp = await handlers.GET(testReq as Parameters<typeof handlers.GET>[0]);
    result.signinTest = {
      status: resp.status,
      location: resp.headers.get("location") ?? null,
      body: resp.status !== 302 ? await resp.text().catch(() => null) : null,
    };
  } catch (e) {
    result.signinTestError = String(e);
    result.signinTestStack = (e as Error).stack ?? null;
  }

  return Response.json(result);
}
