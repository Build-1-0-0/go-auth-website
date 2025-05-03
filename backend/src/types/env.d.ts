export interface Env {
  DB: D1Database;
  AUTH_KV: KVNamespace;
  SESSION_SECRET: string;
}

declare module 'hono' {
  interface ContextVariableMap {
    userId: string;
  }
}