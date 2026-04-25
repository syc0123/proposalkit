import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getRemainingCount } from "@/lib/rate-limit";
import { DashboardClient } from "@/app/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const userId = session.user.id ?? session.user.email ?? "";
  // @AX:NOTE: [AUTO] default 5 is optimistic — shown only when KV is unreachable (local dev)
  let remaining = 5;

  // Try KV lookup — falls back to 5 if unavailable (local dev)
  try {
    remaining = await getRemainingCount(userId);
  } catch {
    // KV unavailable in local dev — default to max
  }

  const displayName = session.user.name ?? session.user.email ?? "사용자";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              안녕하세요, {displayName}님
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              이번 달 남은 무료 생성:{" "}
              <span className="font-semibold text-blue-600">{remaining}회</span>
            </p>
          </div>
          <p className="text-xs text-gray-400">매월 1일 초기화</p>
        </div>

        <DashboardClient />
      </div>
    </main>
  );
}
