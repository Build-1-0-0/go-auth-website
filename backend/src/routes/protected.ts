import { Hono } from 'hono';
import { getSession } from '@lib/auth/sessions';
import { getUserById } from '@lib/db/users';
import type { Env } from '@src/types/env';

const protectedRoutes = new Hono<{
  Bindings: Env;
  Variables: { userId: string };
}>();

protectedRoutes.use('*', async (c, next) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) {
    return c.json({ error: 'Unauthorized: Missing session ID' }, 401);
  }

  const session = await getSession(c.env, sessionId);
  if (!session) {
    return c.json({ error: 'Unauthorized: Invalid or expired session' }, 401);
  }

  c.set('userId', session.userId);
  await next();
});

protectedRoutes.get('/profile', async (c) => {
  const userId = c.get('userId');
  const user = await getUserById(c.env, userId);
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json({ user: { id: user.id, email: user.email } });
});

export default protectedRoutes;