// backend/lib/auth/sessions.ts
import { nanoid } from 'nanoid';
import type { Env } from '@src/types/env';

export async function createSession(env: Env, userId: string): Promise<string> {
  const sessionId = nanoid();
  await env.AUTH_KV.put(`session:${sessionId}`, userId, { expirationTtl: 3600 });
  return sessionId;
}

export async function getSession(env: Env, sessionId: string): Promise<{ userId: string } | null> {
  const userId = await env.AUTH_KV.get(`session:${sessionId}`);
  if (!userId) return null;
  return { userId };
}

export async function deleteSession(env: Env, sessionId: string): Promise<void> {
  await env.AUTH_KV.delete(`session:${sessionId}`);
}
