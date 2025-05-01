import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as argon2 from 'argon2'

type Bindings = {
  DB: D1Database
  AUTH_KV: KVNamespace
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: ['https://your-frontend.pages.dev'],
  credentials: true
}))

// Registration with email verification
app.post('/register', async (c) => {
  const { email, password } = await c.req.json()
  
  // ... existing validation ...

  const verificationToken = crypto.randomUUID()
  await c.env.AUTH_KV.put(`verify:${verificationToken}`, userId, {
    expirationTtl: 3600
  })

  // In a real app, you would send this link via email
  const verificationLink = `https://${c.req.url}/verify-email?token=${verificationToken}`

  return c.json({ 
    message: 'User created - please verify email',
    verificationLink // Remove in production!
  }, 201)
})

// Email verification endpoint
app.get('/verify-email', async (c) => {
  const token = c.req.query('token')
  if (!token) return c.json({ error: 'Token required' }, 400)

  const userId = await c.env.AUTH_KV.get(`verify:${token}`)
  if (!userId) return c.json({ error: 'Invalid token' }, 400)

  await c.env.DB.prepare('UPDATE users SET verified = 1 WHERE id = ?')
    .bind(userId)
    .run()

  await c.env.AUTH_KV.delete(`verify:${token}`)

  return c.json({ message: 'Email verified successfully' })
})

// Login with session in KV
app.post('/login', async (c) => {
  const { email, password } = await c.req.json()
  
  // ... existing validation ...

  const sessionToken = crypto.randomUUID()
  await c.env.AUTH_KV.put(`session:${sessionToken}`, JSON.stringify({
    userId: user.id,
    expiresAt: Date.now() + 86400 * 1000
  }), { expirationTtl: 86400 })

  return c.json(
    { message: 'Logged in' },
    { headers: { 'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=86400` } }
  )
})

// Protected route example
app.get('/profile', async (c) => {
  const sessionToken = c.req.cookie('session')
  if (!sessionToken) return c.json({ error: 'Unauthorized' }, 401)

  const sessionData = await c.env.AUTH_KV.get(`session:${sessionToken}`)
  if (!sessionData) return c.json({ error: 'Unauthorized' }, 401)

  const { userId } = JSON.parse(sessionData)
  const user = await c.env.DB.prepare(
    'SELECT id, email FROM users WHERE id = ?'
  ).bind(userId).first()

  return c.json({ user })
})

export default app
