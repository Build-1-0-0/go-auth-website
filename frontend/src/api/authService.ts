import { User, ApiResponse } from '@/@types/auth';

export const AuthService = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    return data;
  },

  async register(email: string, password: string, username: string): Promise<ApiResponse<User>> {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  },

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await fetch('/api/profile', {
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch profile');
    }
    return data;
  },

  async logout(): Promise<void> {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },
};