import type { Env } from '@src/types/env';
import type { User, UserInput } from '@src/types/user';

export const getUserByEmail = async (
  email: string,
  env: Env
): Promise<User | null> => {
  try {
    const stmt = env.DB.prepare(
      'SELECT id, email, password_hash, created_at FROM users WHERE email = ?'
    ).bind(email);
    
    const result = await stmt.first<User>();
    return result || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user');
  }
};

export const createUser = async (
  user: UserInput,
  env: Env
): Promise<string> => {
  try {
    const userId = crypto.randomUUID();
    const created_at = new Date().toISOString();
    
    const stmt = env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)'
    ).bind(userId, user.email, user.password_hash, created_at);
    
    await stmt.run();
    return userId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

// Additional useful functions
export const getUserByEmail = async (
  email: string,
  env: Env
): Promise<{ id: string; email: string; password_hash: string } | null> => {
  const result = await env.DB.prepare(
    'SELECT id, email, password_hash FROM users WHERE email = ?'
  ).bind(email).first();
  
  return result ? {
    id: result.id as string,
    email: result.email as string,
    password_hash: result.password_hash as string
  } : null;
};

export const getUserById = async (
  id: string,
  env: Env
): Promise<User | null> => {
  const stmt = env.DB.prepare(
    'SELECT id, email, password_hash, created_at FROM users WHERE id = ?'
  ).bind(id);
  
  return await stmt.first<User>();
};

export const deleteUser = async (
  id: string,
  env: Env
): Promise<boolean> => {
  const stmt = env.DB.prepare(
    'DELETE FROM users WHERE id = ?'
  ).bind(id);
  
  const { success } = await stmt.run();
  return success;
};