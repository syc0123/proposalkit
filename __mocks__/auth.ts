// Vitest mock stub for next-auth module (auth.ts)
// Prevents next-auth from importing next/server in test environment
import { vi } from "vitest";

export const auth = vi.fn().mockResolvedValue(null);
export const signIn = vi.fn();
export const signOut = vi.fn();
export const handlers = { GET: vi.fn(), POST: vi.fn() };
