import { auth } from "@/auth";

interface SessionLike {
  user?: {
    email?: string | null;
    id?: string | null;
    sub?: string | null;
    name?: string | null;
  } | null;
}

// @AX:ANCHOR: [AUTO] user identity resolver — called by route handler and dashboard page
export async function getCurrentUserId(
  session?: SessionLike | null
): Promise<string | null> {
  // If no session passed in, fetch from auth()
  const resolved: SessionLike | null =
    session !== undefined ? session : await auth();
  if (!resolved?.user) return null;
  // Use Google sub (stable) over email (can change on account re-link)
  return (
    resolved.user.id ??
    resolved.user.sub ??
    resolved.user.email ??
    null
  );
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
}
