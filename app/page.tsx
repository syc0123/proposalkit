export const runtime = "edge";

import { auth } from "@/auth";
import type { Session } from "next-auth";
import { getRemainingCount } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";
import { HomeClient } from "@/app/HomeClient";

export default async function HomePage() {
  // @AX:WARN: auth() throws MissingSecret in production if AUTH_SECRET is not set in CF Pages env vars.
  // Wrap in try-catch so the page degrades gracefully (unauthenticated UI) instead of returning 500.
  let session: Session | null = null;
  try {
    session = await auth();
  } catch {
    // AUTH_SECRET missing or NextAuth misconfiguration — show unauthenticated UI
    session = null;
  }

  let remaining: number | null = null;
  let isAdmin = false;

  if (session?.user) {
    const userId = session.user.id ?? session.user.email ?? "";
    isAdmin = isAdminEmail(session.user.email);
    if (!isAdmin) {
      try {
        remaining = await getRemainingCount(userId);
      } catch {
        // KV unavailable in local dev — show optimistic max
        remaining = 5;
      }
    }
  }

  return (
    <HomeClient
      user={session?.user ?? null}
      remaining={remaining}
      isAdmin={isAdmin}
    />
  );
}
