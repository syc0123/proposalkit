export const runtime = "edge";

import { auth } from "@/auth";
import { getRemainingCount } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";
import { HomeClient } from "@/app/HomeClient";

export default async function HomePage() {
  const session = await auth();

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
