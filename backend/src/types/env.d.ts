/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
  AUTH_KV: KVNamespace;
  SESSION_SECRET: string;
  userId?: string;
  sessionId?: string;
}