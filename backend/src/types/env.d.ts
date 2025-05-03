import type { BlankInput, Env as HonoEnv } from 'hono/types';

export interface Env extends HonoEnv {
  Bindings: {
    // Your Cloudflare bindings here
    DB: D1Database;
    SESSION_SECRET: string;
  };
  Variables: {
    userId: string;
    sessionId: string;
  };
}

// Make it a module
export {};