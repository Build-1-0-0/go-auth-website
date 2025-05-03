import { Hono } from 'hono';
import auth from './routes/auth';
import protectedRoutes from './routes/protected';
import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('API Running'));
app.route('/auth', auth);
app.route('/protected', protectedRoutes);

export default app;