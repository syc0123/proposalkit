export const runtime = "edge";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";

// @AX:NOTE: @cloudflare/next-on-pages passes plain Request (no nextUrl)
// NextAuth v5 App Router handlers need:
//  1. NextRequest (with .nextUrl) — wrapping plain Request
//  2. Route context (ctx) — contains params.nextauth for action parsing

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
    // duplex required for streaming body in some environments
    duplex: "half",
  });
}

// Next.js 15 App Router: ctx.params is a Promise<{ nextauth: string[] }>
// NextAuth v5 beta types only expose 1-arg handler, but runtime needs ctx
// for params.nextauth action parsing — cast to accept 2 args.
type HandlerFn = (req: NextRequest, ctx?: unknown) => Promise<Response>;
type RouteContext = { params: Promise<{ nextauth: string[] }> };

export async function GET(req: Request, ctx: RouteContext): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return (handlers.GET as HandlerFn)(toNextRequest(req), ctx);
}

export async function POST(req: Request, ctx: RouteContext): Promise<Response> {
  const env = await getCloudflareEnv();
  const handlers = buildHandlers(env);
  return (handlers.POST as HandlerFn)(toNextRequest(req), ctx);
}
