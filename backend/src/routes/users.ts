import { Hono } from 'hono';
import type { Env } from '@src/types/env';

const users = new Hono<{ Bindings: Env }>();

users.get('/', async (c) => {
  return c.json({ message: 'Users endpoint' });
});

export default users;