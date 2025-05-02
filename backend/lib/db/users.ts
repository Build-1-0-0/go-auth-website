import type { Env } from '../../types/env';
import type { User } from '../../types/user';

export const getUserByEmail = async (
  email: string,
  env: Env
): Promise<User | null> => {
  return await env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first<User>();
};

export const createUser = async (
  user: Omit<User, 'id' | 'created_at'>,
  env: Env
): Promise<string> => {
  const userId = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)'
  ).bind(userId, user.email, user.password_hash).run();
  return userId;
};
