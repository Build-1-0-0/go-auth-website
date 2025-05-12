// frontend/src/hooks/useAuthActions.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ApiResponse } from '@/@types/auth';

export const useAuthActions = () => {
  const { login, register } = useAuth();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setMessage({ text: 'Login successful!', type: 'success' });
      return true;
    } catch (error) {
      const err = error as ApiResponse | Error;
      const errorMessage =
        'error' in err ? err.error : err instanceof Error ? err.message : 'Login failed. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      return false;
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      setMessage({ text: 'Registration successful! Please login.', type: 'success' });
      return true;
    } catch (error) {
      const err = error as ApiResponse | Error;
      const errorMessage =
        'error' in err ? err.error : err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      return false;
    }
  };

  return { handleLogin, handleRegister, message };
};