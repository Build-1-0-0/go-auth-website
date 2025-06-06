import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '@/@types/auth';

export const useAuthActions = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (message) {
      timer = setTimeout(() => setMessage(null), 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
      setMessage({ text: 'Login successful!', type: 'success' });
      navigate('/dashboard');
      return true;
    } catch (error: unknown) {
      let errorMessage = 'Login failed. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'error' in error) {
        errorMessage = (error as ApiResponse).error || errorMessage;
      }
      console.error('Login error:', error);
      setMessage({ text: errorMessage, type: 'error' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      await register(email, password, username);
      setMessage({ text: 'Registration successful! Please login.', type: 'success' });
      navigate('/login');
      return true;
    } catch (error: unknown) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'error' in error) {
        errorMessage = (error as ApiResponse).error || errorMessage;
      }
      console.error('Register error:', error);
      setMessage({ text: errorMessage, type: 'error' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, handleRegister, message, isLoading };
};