import { Hono } from 'hono';
import { hashPassword } from '@lib/auth/passwords';
import { createSession } from '@lib/auth/sessions';
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
  const hashedPassword = await hashPassword(password);
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

export default auth;