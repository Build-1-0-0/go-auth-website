// frontend/src/contexts/AuthContext.tsx (assumed)
import { createContext, useContext } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// AuthProvider implementation omitted (assumed to use authService.ts)