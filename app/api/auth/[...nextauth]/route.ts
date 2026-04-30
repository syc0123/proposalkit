export const runtime = "edge";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// @AX:NOTE: [AUTO] auth.ts의 static init은 모듈 로드 시점에 process.env가 undefined일 수 있음
// getRequestContext().env로 요청 시점에 Cloudflare 시크릿을 직접 읽어 Google 프로바이더 초기화

async function getCloudflareEnv(): Promise<Record<string, string | undefined>> {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    return getRequestContext().env as Record<string, string | undefined>;
  } catch {
    // local dev — fall back to process.env
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
