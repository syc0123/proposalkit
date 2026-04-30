export const runtime = "edge";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";

// @AX:NOTE: @cloudflare/next-on-pages passes plain Request (no nextUrl)
// NextAuth v5 requires NextRequest.nextUrl — wrap before passing to handler

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
  });
  return handlers;
}

function toNextRequest(req: Request): NextRequest {
  return new NextRequest(req.url, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    // @ts-expect-error duplex required for streaming body in some environments
    duplex: "half",
  });
}

export async function GET(req: Request): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return handlers.GET(toNextRequest(req));
}

export async function POST(req: Request): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return handlers.POST(toNextRequest(req));
}
