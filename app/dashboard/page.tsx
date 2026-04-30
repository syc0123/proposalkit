export const runtime = "edge";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getRemainingCount } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";
import { DashboardClient } from "@/app/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id ?? session.user.email ?? "";
  const adminUser = isAdminEmail(session.user.email);

  // @AX:NOTE: [AUTO] default 5 is optimistic — shown only when KV is unreachable (local dev)
  let remaining = 5;

  // Try KV lookup — falls back to 5 if unavailable (local dev)
  if (!adminUser) {
    try {
      remaining = await getRemainingCount(userId);
    } catch {
      // KV unavailable in local dev — default to max
    }
  }

  const displayName = session.user.name ?? session.user.email ?? "User";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome, {displayName}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Free proposals this month:{" "}
              <span className="font-semibold text-blue-600">
                {adminUser ? "Unlimited ∞" : `${remaining} remaining`}
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-400">Resets on the 1st of each month</p>
        </div>

        <DashboardClient />
      </div>
    </main>
  );
}
