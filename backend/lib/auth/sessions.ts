import type { Env } from '@src/types/env';
import { nanoid } from 'nanoid';

export const createSession = async (env: Env, userId: string): Promise<string> => {
  const sessionId = nanoid();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 1 week

  await env.AUTH_KV.put(`session:${sessionId}`, JSON.stringify({ userId, expiresAt }), {
    expiration: Math.floor(expiresAt / 1000)
  });

  return sessionId;
};

export const getSession = async (env: Env, sessionId: string): Promise<{ userId: string } | null> => {
  const session = await env.AUTH_KV.get(`session:${sessionId}`);
  if (!session) return null;

  const { userId, expiresAt } = JSON.parse(session);
  if (expiresAt < Date.now()) {
    await env.AUTH_KV.delete(`session:${sessionId}`);
    return null;
  }

  return { userId };
};