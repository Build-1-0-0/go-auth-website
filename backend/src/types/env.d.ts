/// <reference types="@cloudflare/workers-types" />
import type { BlankInput, Env as HonoEnv } from 'hono/types';

declare global {
  interface Env extends HonoEnv {
    Bindings: {
      DB: D1Database;
      SESSION_SECRET: string;
    };
    Variables: {
      userId: string;
      sessionId: string;
    };
  }
}

export {}; // Treat as module