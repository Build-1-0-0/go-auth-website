// src/hooks/useAuthActions.ts
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ApiResponse } from '../@types/auth';

export const useAuthActions = () => {
  const { login, register } = useAuth();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setMessage({ text: 'Login successful!', type: 'success' });
      return true;
    } catch (error) {
      const err = error as ApiResponse;
      setMessage({ text: err.error || 'Login failed', type: 'error' });
      return false;
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      await register(email, password);
      setMessage({ text: 'Registration successful! Please login.', type: 'success' });
      return true;
    } catch (error) {
      const err = error as ApiResponse;
      setMessage({ text: err.error || 'Registration failed', type: 'error' });
      return false;
    }
  };

  return { handleLogin, handleRegister, message, setMessage };
};
