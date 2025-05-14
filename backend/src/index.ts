import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { nanoid } from 'nanoid';
import auth from './routes/auth';
import protectedRoutes from './routes/protected';
import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env; Variables: { nonce: string } }>();

// CSP Middleware
app.use('*', async (c, next) => {
  const nonce = nanoid(16);
  c.set('nonce', nonce);
  await next();
  c.header(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com;
      style-src 'self' 'unsafe-inline';
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://go-auth-website.africancontent807.workers.dev https://sentry.io;
      img-src 'self' data:;
      manifest-src 'self';
      frame-ancestors 'none';
      form-action 'self';
      base-uri 'self'
    `.trim().replace(/\s+/g, ' ')
  );
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

// CORS Middleware
app.use(
  '*',
  cors({
    origin: ['https://go-auth-website.pages.dev', 'http://localhost:5173'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    credentials: true,
    exposeHeaders: ['Set-Cookie'],
  })
);

// Routes
app.get('/', (c) => c.text('API Running'));
app.route('/auth', auth);
app.route('/protected', protectedRoutes);

// Error Handling
app.onError((err, c) => {
  console.error('Server error:', {
    message: err.message,
    stack: err.stack,
    path: c.req.path,
    method: c.req.method,
    timestamp: new Date().toISOString(),
  });
  return c.json({ error: 'Internal server error', details: err.message }, 500);
});

export default app;