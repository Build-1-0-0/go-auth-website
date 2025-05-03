// backend/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth';
import protectedRoutes from './routes/protected';
import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env }>();

app.use(
  '*',
  cors({
    origin: ['https://go-auth-website.pages.dev', 'http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (c) => c.text('API Running'));
app.route('/auth', auth);
app.route('/protected', protectedRoutes);

export default app;