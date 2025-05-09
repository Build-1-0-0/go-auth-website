// backend/src/types/env.ts
export interface Env {
  DB: D1Database;
  AUTH_KV: KVNamespace;
  SESSION_SECRET: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}
