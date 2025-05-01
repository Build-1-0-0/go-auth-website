import { createContext, useContext, useEffect, useState } from 'react'

type User = { id: string; email: string } | null

const AuthContext = createContext<{
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  
  const fetchUser = async () => {
    try {
      const res = await fetch('https://auth-worker.your-account.workers.dev/me', {
        credentials: 'include'
      })
      if (res.ok) {
        const { user } = await res.json()
        setUser(user)
      }
    } catch (err) {
      console.error('Auth check failed', err)
    }
  }
  
  useEffect(() => { fetchUser() }, [])
  
  const login = async (email: string, password: string) => {
    const res = await fetch('https://auth-worker.your-account.workers.dev/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    if (!res.ok) throw new Error('Login failed')
    await fetchUser()
  }
  
  const register = async (email: string, password: string) => {
    const res = await fetch('https://auth-worker.your-account.workers.dev/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    if (!res.ok) throw new Error('Registration failed')
  }
  
  const logout = async () => {
    await fetch('https://auth-worker.your-account.workers.dev/logout', {
      method: 'POST',
      credentials: 'include'
    })
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
