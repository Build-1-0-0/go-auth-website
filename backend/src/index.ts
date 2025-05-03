import { Hono } from 'hono';
import { authRoutes } from './src/routes/auth';
import { userRoutes } from './src/routes/users';
import type { Env } from './src/types/env';

const app = new Hono<{ Bindings: Env }>();

// Register routes
app.route('/auth', authRoutes);
app.route('/users', userRoutes);

export default app;
