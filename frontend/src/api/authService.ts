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
      return { error: data.error || 'Login failed' };
    }
    // Store sessionId in localStorage or cookies if needed
    localStorage.setItem('sessionId', data.sessionId);
    return { data: data.user };
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
      return { error: data.error || 'Registration failed' };
    }
    return { data: data.user };
  },

  async getProfile(): Promise<ApiResponse<User>> {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      return { error: 'No session found' };
    }
    const response = await fetch(`/api/session/${sessionId}`, {
      headers: { Authorization: `Bearer ${sessionId}` },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to fetch profile' };
    }
    const user = await fetch(`/api/user/${data.userId}`, {
      headers: { Authorization: `Bearer ${sessionId}` },
      credentials: 'include',
    }).then((res) => res.json());
    return { data: user };
  },

  async logout(): Promise<void> {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionId}` },
        credentials: 'include',
      });
      localStorage.removeItem('sessionId');
    }
  },
};