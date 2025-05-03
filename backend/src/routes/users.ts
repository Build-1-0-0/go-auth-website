import { Hono } from 'hono';
import type { Env } from '../types/env';

const users = new Hono<{ Bindings: Env }>();

// Example routes
users.get('/', async (c) => {
  return c.json({ message: 'Users endpoint' });
});

export default users;