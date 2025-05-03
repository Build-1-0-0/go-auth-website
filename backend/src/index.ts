import { Hono } from 'hono';
import authRoutes from '@src/routes/auth';
import userRoutes from '@src/routes/users';
import type { Env } from '@src/types/env';

const app = new Hono<{ Bindings: Env }>();

app.route('/auth', authRoutes);
app.route('/users', userRoutes);

app.get('/', (c) => c.text('API Running'));

export default app;