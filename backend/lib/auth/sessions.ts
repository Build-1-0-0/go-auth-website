import { nanoid } from 'nanoid';
import type { Env } from '../../types/env';

export const createSession = async (
  userId: string,
  env: Env
): Promise<string> => {
  const sessionId = nanoid(32);
  await env.KV.put(`session:${sessionId}`, userId, {
    expirationTtl: 60 * 60 * 24 * 7, // 1 week
  });
  return sessionId;
};

export const validateSession = async (
  sessionId: string,
  env: Env
): Promise<string | null> => {
  return await env.KV.get(`session:${sessionId}`);
};
