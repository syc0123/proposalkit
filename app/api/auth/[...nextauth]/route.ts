export const runtime = "edge";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

async function getCloudflareEnv(): Promise<Record<string, string | undefined>> {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    return getRequestContext().env as Record<string, string | undefined>;
  } catch {
    return process.env as Record<string, string | undefined>;
  }
}

function buildHandlers(env: Record<string, string | undefined>) {
  const { handlers } = NextAuth({
    trustHost: true,
    secret: env.AUTH_SECRET ?? process.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: env.AUTH_GOOGLE_ID ?? process.env.AUTH_GOOGLE_ID ?? "",
        clientSecret: env.AUTH_GOOGLE_SECRET ?? process.env.AUTH_GOOGLE_SECRET ?? "",
      }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
      jwt({ token, account, profile }) {
        if (account) {
          token.sub = profile?.sub ?? token.sub;
        }
        return token;
      },
      session({ session, token }) {
        if (session.user && token.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
    pages: {
      signIn: "/",
    },
    // @AX:NOTE: debug mode — remove after auth is fixed
    logger: {
      error(err) {
        console.error("[NextAuth Error]", err.name, err.message, (err as Error).stack ?? "");
      },
      warn(code) {
        console.warn("[NextAuth Warn]", code);
      },
    },
  });
  return handlers;
}

export async function GET(req: Request): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return handlers.GET(req as Parameters<typeof handlers.GET>[0]);
}

export async function POST(req: Request): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return handlers.POST(req as Parameters<typeof handlers.POST>[0]);
}
