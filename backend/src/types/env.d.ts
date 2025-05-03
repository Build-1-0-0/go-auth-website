/// <reference types="@cloudflare/workers-types" />
import type { BlankInput } from 'hono';

export interface Env {
  Bindings: {
    DB: D1Database;
    AUTH_KV: KVNamespace;
    SESSION_SECRET: string;
  };
  Variables: {
    userId: string;
    sessionId: string;
  };
}