export const runtime = "edge";

import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import type { Session } from "next-auth";

interface KVWithList {
  get(key: string): Promise<string | null>;
  list(opts: { prefix: string }): Promise<{ keys: Array<{ name: string }> }>;
}

export async function GET(): Promise<Response> {
  let session: Session | null = null;
  try { session = await auth(); } catch { /* no secret in dev */ }

  if (!isAdminEmail(session?.user?.email)) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const kv = (getRequestContext().env as Record<string, unknown>)["RATE_LIMIT_KV"] as KVWithList;
    const { keys } = await kv.list({ prefix: "feedback:" });

    const items = await Promise.all(
      keys.map(async ({ name }) => {
        const raw = await kv.get(name);
        return raw ? JSON.parse(raw) as Record<string, unknown> : null;
      })
    );

    return Response.json({
      count: items.length,
      // newest first
      items: items
        .filter((item): item is Record<string, unknown> => item !== null)
        .sort((a, b) =>
          new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
        ),
    });
  } catch {
    return Response.json({ error: "KV unavailable" }, { status: 503 });
  }
}
