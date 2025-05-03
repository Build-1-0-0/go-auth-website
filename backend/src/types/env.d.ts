/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
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

export {};