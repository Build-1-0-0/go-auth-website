import type { Env } from '@src/types/env';
import { nanoid } from 'nanoid';

export interface User {
  id: string;
  email: string;
  password: string;
}

export const createUser = async (env: Env, user: Omit<User, 'id'>): Promise<User> => {
  const id = nanoid();
  const createdUser = { id, ...user };

  await env.DB.prepare(`
    INSERT INTO users (id, email, password)
    VALUES (?, ?, ?)
  `).bind(id, user.email, user.password).run();

  return createdUser;
};

export const getUserByEmail = async (env: Env, email: string): Promise<User | null> => {
  const result = await env.DB.prepare(`
    SELECT id, email, password
    FROM users
    WHERE email = ?
  `).bind(email).first<User>();

  return result || null;
};

export const getUserById = async (env: Env, id: string): Promise<User | null> => {
  const result = await env.DB.prepare(`
    SELECT id, email, password
    FROM users
    WHERE id = ?
  `).bind(id).first<User>();

  return result || null;
};