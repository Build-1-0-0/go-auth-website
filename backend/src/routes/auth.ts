// backend/src/routes/auth.ts
import { Hono } from 'hono';
import { hashPassword, verifyPassword } from '@lib/auth/passwords';
import { createSession, getSession, deleteSession } from '@lib/auth/sessions';
import { createUser, getUserByEmail } from '@lib/db/users';
import { validate } from '@lib/utils/validation';
import type { Env } from '@src/types/env';

const auth = new Hono<{ Bindings: Env }>();

auth.post('/register', async (c) => {
  const { email, password, username } = await c.req.json();

  // Validate input
  const validation = validate({ email, password, username });
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
  const user = await createUser(c.env, { email, username, password: hashedPassword, role: 'user' });

  // Create session
  const sessionId = await createSession(c.env, user.id);

  return c.json(
    {
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
      sessionId,
    },
    201
  );
});

auth.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  // Validate input
  const validation = validate({ email, password });
  if (!validation.valid) {
    return c.json({ error: validation.errors }, 400);
  }

  // Check if user exists
  const user = await getUserByEmail(c.env, email);
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash, c.env);
  if (!isValid) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  // Create session
  const sessionId = await createSession(c.env, user.id);

  return c.json(
    {
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
      sessionId,
    },
    200
  );
});

auth.post('/logout', async (c) => {
  const sessionId = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!sessionId) {
    return c.json({ error: 'Missing session ID' }, 400);
  }
  await deleteSession(c.env, sessionId);
  return c.json({ message: 'Logged out successfully' });
});

auth.get('/session/:id', async (c) => {
  const sessionId = c.req.param('id');
  const session = await getSession(c.env, sessionId);
  if (!session) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }
  return c.json({ userId: session.userId });
});

export default aut
