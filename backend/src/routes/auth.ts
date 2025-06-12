import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie'; // Import setCookie and deleteCookie
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
    // Return a structured error response, potentially with specific field errors
    return c.json({ error: validation.errors, message: 'Validation failed' }, 400);
  }

  // Check if user exists
  const existingUser = await getUserByEmail(c.env, email);
  if (existingUser) {
    return c.json({ error: 'User with this email already exists' }, 409);
  }

  try {
    // Create user: hash password and store in D1
    const hashedPassword = await hashPassword(password, c.env); // c.env is passed as per your existing code
    const user = await createUser(c.env, { email, username, password_hash: hashedPassword, role: 'user' });

    // Create session: store in KV and get session ID
    const sessionId = await createSession(c.env, user.id);

    // Set secure HttpOnly cookie for session management
    setCookie(c, 'sessionId', sessionId, {
      httpOnly: true,
      secure: c.env.NODE_ENV === 'production', // Use secure flag only in production (HTTPS)
      sameSite: 'Lax', // Recommended for most cases to prevent CSRF
      maxAge: 7 * 24 * 60 * 60, // Session expires in 7 days
      path: '/', // Cookie available across the entire domain
    });

    // Return user data and session ID (sessionId sent to frontend for convenience, though cookie is primary)
    return c.json(
      {
        user: { id: user.id, email: user.email, username: user.username, role: user.role },
        sessionId, // Frontend might use this to store in localStorage for state initialization
      },
      201
    );
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error during registration' }, 500);
  }
});

auth.post('/login', async (c) => {
  const { email, password } = await c.req.json();

  // Validate input
  const validation = validate({ email, password });
  if (!validation.valid) {
    return c.json({ error: validation.errors, message: 'Validation failed' }, 400);
  }

  try {
    // Check if user exists
    const user = await getUserByEmail(c.env, email);
    if (!user) {
      return c.json({ error: 'Invalid credentials: user not found' }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash, c.env); // c.env is passed as per your existing code
    if (!isValid) {
      return c.json({ error: 'Invalid credentials: password mismatch' }, 401);
    }

    // Create session
    const sessionId = await createSession(c.env, user.id);

    // Set secure HttpOnly cookie
    setCookie(c, 'sessionId', sessionId, {
      httpOnly: true,
      secure: c.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return c.json(
      {
        user: { id: user.id, email: user.email, username: user.username, role: user.role },
        sessionId,
      },
      200
    );
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error during login' }, 500);
  }
});

auth.post('/logout', async (c) => {
  // Get session ID from Authorization header (often used for frontend logic)
  const sessionIdFromHeader = c.req.header('Authorization')?.replace('Bearer ', '');
  // Also attempt to get from cookie (primary source for secure sessions)
  const sessionIdFromCookie = c.req.cookie('sessionId');

  const sessionIdToInvalidate = sessionIdFromHeader || sessionIdFromCookie;

  if (!sessionIdToInvalidate) {
    return c.json({ error: 'Missing session ID in header or cookie' }, 400);
  }

  try {
    await deleteSession(c.env, sessionIdToInvalidate);

    // Clear the HttpOnly cookie by setting its maxAge to 0 and an empty value
    deleteCookie(c, 'sessionId', {
      path: '/',
    });

    return c.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Internal server error during logout' }, 500);
  }
});

auth.get('/session/:id', async (c) => {
  const sessionId = c.req.param('id');

  if (!sessionId) {
    return c.json({ error: 'Session ID is required' }, 400);
  }

  try {
    const session = await getSession(c.env, sessionId);
    if (!session) {
      return c.json({ error: 'Invalid or expired session' }, 401);
    }
    // Return minimal session info, typically just the userId
    return c.json({ userId: session.userId });
  } catch (error) {
    console.error('Session validation error:', error);
    return c.json({ error: 'Internal server error during session validation' }, 500);
  }
});

export default auth;
