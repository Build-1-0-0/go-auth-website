import type { Env } from '@src/types/env';

export interface User {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export interface UserInput {
  email: string;
  password: string;
}

export const createUser = async (env: Env, input: UserInput): Promise<User> => {
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  const stmt = env.DB.prepare(
    'INSERT INTO users (id, email, password, created_at) VALUES (?, ?, ?, ?) RETURNING *'
  );
  const result = await stmt.bind(id, input.email, input.password, created_at).first<User>();

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
};

export const getUserByEmail = async (env: Env, email: string): Promise<User | null> => {
  const stmt = env.DB.prepare('SELECT * FROM users WHERE email = ?');
  const result = await stmt.bind(email).first<User>();

  return result || null;
};