// backend/lib/db/users.ts
import type { Env } from '@src/types/env';
import { nanoid } from 'nanoid';

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

export const createUser = async (env: Env, user: Omit<User, 'id' | 'created_at'>): Promise<User> => {
  const id = nanoid();
  const created_at = new Date().toISOString();
  const createdUser = { id, ...user, created_at };

  await env.DB.prepare(`
    INSERT INTO users (id, username, email, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, user.username, user.email, user.password_hash, user.role, created_at).run();

  return createdUser;
};

export const getUserByEmail = async (env: Env, email: string): Promise<User | null> => {
  const result = await env.DB.prepare(`
    SELECT id, username, email, password_hash, role, created_at
    FROM users
    WHERE email = ?
  `).bind(email).first<User>();

  return result || null;
};

export const getUserById = async (env: Env, id: string): Promise<User | null> => {
  const result = await env.DB.prepare(`
    SELECT id, username, email, password_hash, role, created_at
    FROM users
    WHERE id = ?
  `).bind(id).first<User>();

  return result || null;
};