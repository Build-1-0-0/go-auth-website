import type { Env } from '@src/types/env';
import { nanoid } from 'nanoid';

export const createSession = async (env: Env, userId: string): Promise<string> => {
  const sessionId = nanoid();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week

  await env.DB.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(sessionId, userId, expiresAt.toISOString())
    .run();

  return sessionId;
};