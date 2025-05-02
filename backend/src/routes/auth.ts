import { Hono } from 'hono';
import { hashPassword, verifyPassword } from '../lib/auth/passwords';
import { createSession } from '../lib/auth/sessions';
import { getUserByEmail } from '../lib/db/users';
import { validate } from '../lib/utils/validation';

export const authRoutes = new Hono<{ Bindings: Env }>()

authRoutes.post('/register', async (c) => {
  const { email, password } = await c.req.json();
  
  // Validate input
  if (!validate.email(email) || !validate.password(password)) {
    return c.json({ error: 'Invalid input' }, 400);
  }

  // Check if user exists
  if (await getUserByEmail(email, c.env)) {
    return c.json({ error: 'User already exists' }, 409);
  }

  // Create user
  const passwordHash = await hashPassword(password);
  const userId = await createUser({ email, password_hash: passwordHash }, c.env);

  return c.json({ userId }, 201);
});

authRoutes.post('/login', async (c) => {
  // ... similar modular approach
});
