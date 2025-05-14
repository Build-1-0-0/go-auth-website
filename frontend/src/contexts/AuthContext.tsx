import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '@/api/authService';
import { User, ApiResponse } from '@/@types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: ApiResponse<User> = await AuthService.getProfile();
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response: ApiResponse<User> = await AuthService.login(email, password);
    if (response.data) {
      setUser(response.data);
      navigate('/dashboard');
    } else {
      throw new Error(response.error || 'Login failed');
    }
  };

  const register = async (email: string, password: string, username: string) => {
    const response: ApiResponse<User> = await AuthService.register(email, password, username);
    if (response.data) {
      navigate('/login');
    } else {
      throw new Error(response.error || 'Registration failed');
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    navigate('/login');
  };

  if (loading) return null; // Or a loading spinner

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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