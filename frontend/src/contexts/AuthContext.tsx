// frontend/src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '@/api/authService';
import { User, AuthContextType } from '@/@types/auth'; // Import updated types
import { useNavigate } from 'react-router-dom';

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
        const response = await AuthService.getProfile();
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
    const response = await AuthService.login(email, password);
    if (response.data) {
      setUser(response.data);
    } else {
      throw new Error(response.error || 'Login failed');
    }
  };

  // Updated register function to accept username
  const register = async (email: string, password: string, username: string) => {
    const response = await AuthService.register(email, password, username);
    if (!response.data) {
      throw new Error(response.error || 'Registration failed');
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = { user, loading, login, register, logout };
  
  // Return null or a global spinner while checking auth status
  if (loading) return <LoadingSpinner fullPage />;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};