import { argon2id } from '@noble/hashes/argon2';
import type { Env } from '@src/types/env';

export const hashPassword = async (password: string, env: Env): Promise<string> => {
  const secret = new TextEncoder().encode(env.SESSION_SECRET);
  return argon2id(password, secret, {
    t: 2, // Iterations
    m: 19456, // Memory in KB
    p: 1, // Parallelism
    dkLen: 32 // Key length
  }).toString('hex');
};

export const verifyPassword = async (hash: string, password: string, env: Env): Promise<boolean> => {
  const secret = new TextEncoder().encode(env.SESSION_SECRET);
  const computedHash = argon2id(password, secret, {
    t: 2,
    m: 19456,
    p: 1,
    dkLen: 32
  }).toString('hex');
  return hash === computedHash;
};