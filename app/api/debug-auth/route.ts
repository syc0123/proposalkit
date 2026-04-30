export const runtime = "edge";

// TEMPORARY debug endpoint — remove after auth is fixed

export async function GET(): Promise<Response> {
  const result: Record<string, unknown> = {};

  // 1. Check process.env availability
  result.processEnv = {
    hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
    hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasAuthUrl: !!process.env.AUTH_URL,
    authUrl: process.env.AUTH_URL ?? null,
    trustHost: process.env.AUTH_TRUST_HOST ?? null,
    googleIdLen: process.env.AUTH_GOOGLE_ID?.length ?? 0,
  };

  // 2. Check getRequestContext().env
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const env = getRequestContext().env as Record<string, unknown>;
    result.cfEnv = {
      hasGoogleId: !!env.AUTH_GOOGLE_ID,
      hasGoogleSecret: !!env.AUTH_GOOGLE_SECRET,
      hasAuthSecret: !!env.AUTH_SECRET,
      hasAuthUrl: !!env.AUTH_URL,
      authUrl: env.AUTH_URL ?? null,
      trustHost: env.AUTH_TRUST_HOST ?? null,
      googleIdLen: (env.AUTH_GOOGLE_ID as string)?.length ?? 0,
    };
  } catch (e) {
    result.cfEnv = { error: String(e) };
  }

  // 3. Try NextAuth init with cfEnv
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const env = getRequestContext().env as Record<string, string>;
    const { default: NextAuth } = await import("next-auth");
    const { default: Google } = await import("next-auth/providers/google");
    const { handlers } = NextAuth({
      trustHost: true,
      secret: env.AUTH_SECRET,
      providers: [
        Google({
          clientId: env.AUTH_GOOGLE_ID ?? "",
          clientSecret: env.AUTH_GOOGLE_SECRET ?? "",
        }),
      ],
      session: { strategy: "jwt" },
    });
    result.nextAuthInit = { success: true, hasGet: !!handlers.GET, hasPost: !!handlers.POST };
  } catch (e) {
    result.nextAuthInit = { success: false, error: String(e) };
  }

  return Response.json(result);
}
