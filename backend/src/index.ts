import { Hono } from 'hono';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env }>();

// Register routes
app.route('/auth', authRoutes);
app.route('/users', userRoutes);

export default app;
