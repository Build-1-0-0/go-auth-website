import { Hono } from 'hono';
import { hashPassword } from '@lib/auth/passwords';
import { createSession, getSession } from '@lib/auth/sessions';
import { createUser, getUserByEmail } from '@lib/db/users';
import { validate } from '@lib/utils/validation';
import type { Env } from '@src/types/env';

const auth = new Hono<{ Bindings: Env }>();

auth.post('/register', async (c) => {
  const { email, password } = await c.req.json();

  // Validate input
  const validation = validate({ email, password });
  if (!validation.valid) {
    return c.json({ error: validation.errors }, 400);
  }

  // Check if user exists
  const existingUser = await getUserByEmail(c.env, email);
  if (existingUser) {
    return c.json({ error: 'User already exists' }, 409);
  }

  // Create user
  const hashedPassword = await hashPassword(password, c.env);
  const user = await createUser(c.env, { email, password: hashedPassword });

  // Create session
  const sessionId = await createSession(c.env, user.id);

  return c.json(
    {
      user: { id: user.id, email: user.email },
      sessionId
    },
    201
  );
});

auth.get('/session/:id', async (c) => {
  const sessionId = c.req.param('id');
  const session = await getSession(c.env, sessionId);
  if (!session) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }
  return c.json({ userId: session.userId });
});

export default auth;