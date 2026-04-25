import type { RateLimitResult } from "@/types/proposal";

// @AX:NOTE: [AUTO] magic constant — monthly free quota per user
const FREE_LIMIT = 5;

// KV interface compatible with Cloudflare KV + in-memory fallback
interface KVStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

// In-memory fallback for local development (no wrangler)
const memoryStore = new Map<string, { value: string; expiresAt: number }>();

function getMemoryKV(): KVStore {
  return {
    async get(key: string) {
      const entry = memoryStore.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expiresAt) {
        memoryStore.delete(key);
        return null;
      }
      return entry.value;
    },
    async put(key: string, value: string, options?: { expirationTtl?: number }) {
      const expiresAt = options?.expirationTtl
        ? Date.now() + options.expirationTtl * 1000
        : Infinity;
      memoryStore.set(key, { value, expiresAt });
    },
  };
}

function getRateLimitKey(userId: string): string {
  const now = new Date();
  const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  return `rate:${userId}:${month}`;
}

function getSecondsUntilNextMonth(): number {
  const now = new Date();
  const nextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0)
  );
  return Math.ceil((nextMonth.getTime() - now.getTime()) / 1000);
}

// @AX:ANCHOR: [AUTO] rate-limit gate — called by route handler per authenticated request
export async function checkAndIncrement(
  userId: string,
  kv?: KVStore
): Promise<RateLimitResult> {
  // Use provided KV (production) or in-memory fallback (local dev)
  const store: KVStore = kv ?? getMemoryKV();

  const key = getRateLimitKey(userId);
  const ttlSeconds = getSecondsUntilNextMonth();

  const nextMonthDate = new Date();
  nextMonthDate.setUTCMonth(nextMonthDate.getUTCMonth() + 1, 1);
  nextMonthDate.setUTCHours(0, 0, 0, 0);
  const resetAt = nextMonthDate.toISOString();

  const raw = await store.get(key);
  const current = raw ? parseInt(raw, 10) : 0;

  if (current >= FREE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt };
  }

  // @AX:WARN: [AUTO] get+put is not atomic — concurrent requests may exceed FREE_LIMIT
  // Increment (race condition accepted in Phase A)
  await store.put(key, String(current + 1), { expirationTtl: ttlSeconds });

  return {
    allowed: true,
    remaining: FREE_LIMIT - (current + 1),
    resetAt,
  };
}

export async function getRemainingCount(
  userId: string,
  kv?: KVStore
): Promise<number> {
  const store: KVStore = kv ?? getMemoryKV();
  const key = getRateLimitKey(userId);
  const raw = await store.get(key);
  const current = raw ? parseInt(raw, 10) : 0;
  return Math.max(0, FREE_LIMIT - current);
}
