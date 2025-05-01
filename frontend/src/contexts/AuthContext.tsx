import { createContext, useContext, useEffect, useState } from 'react'
import { AuthService } from '../services/auth'

type User = { id: string; email: string } | null

const AuthContext = createContext<{
  user: User
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthService.getMe()
      .then(({ data }) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    await AuthService.login(email, password)
    const { data } = await AuthService.getMe()
    setUser(data.user)
  }

  const register = async (email: string, password: string) => {
    await AuthService.register(email, password)
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
