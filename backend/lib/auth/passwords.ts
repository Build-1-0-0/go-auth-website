import { scrypt } from '@noble/hashes/scrypt';
import { bytesToHex } from '@noble/hashes/utils';
import type { Env } from '@src/types/env';

export const hashPassword = async (password: string, env: Env): Promise<string> => {
  const salt = new TextEncoder().encode(env.SESSION_SECRET);
  const key = scrypt(password, salt, { N: 2 ** 14, r: 8, p: 1, dkLen: 32 });
  return bytesToHex(key);
};

export const verifyPassword = async (hash: string, password: string, env: Env): Promise<boolean> => {
  const salt = new TextEncoder().encode(env.SESSION_SECRET);
  const key = scrypt(password, salt, { N: 2 ** 14, r: 8, p: 1, dkLen: 32 });
  return bytesToHex(key) === hash;
};