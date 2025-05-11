
// frontend/src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  sessionId: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface AuthResponse {
  user: User;
  sessionId: string;
}

interface ApiResponse {
  error?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_AUTH_API_URL || 'https://go-auth-website.africancontent807.workers.dev';

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
      setUser(data.user);
      setSessionId(data.sessionId);
      localStorage.setItem('sessionId', data.sessionId);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? error.response?.data.error || 'Login failed' : 'Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/register', { username, email, password });
      setUser(data.user);
      setSessionId(data.sessionId);
      localStorage.setItem('sessionId', data.sessionId);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      throw new Error(axios.isAxiosError(error) ? error.response?.data.error || 'Registration failed' : 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      if (sessionId) {
        await axiosInstance.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${sessionId}` },
        });
      }
    } finally {
      setUser(null);
      setSessionId(null);
      localStorage.removeItem('sessionId');
      setLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      axiosInstance
        .get<{ user: User }>('/protected/profile', {
          headers: { Authorization: `Bearer ${storedSessionId}` },
        })
        .then(({ data }) => {
          setUser(data.user);
          setSessionId(storedSessionId);
        })
        .catch(() => {
          localStorage.removeItem('sessionId');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, sessionId, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};