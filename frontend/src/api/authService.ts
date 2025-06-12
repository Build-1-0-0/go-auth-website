import { ApiResponse, User } from '@/@types/auth';

// Helper function to handle API responses
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${url}`, { // Assuming a /api proxy prefix
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || `Request failed with status ${response.status}` };
    }
    return { data };
  } catch (err) {
    const error = err as Error;
    return { error: error.message || 'An unknown network error occurred' };
  }
}


export const AuthService = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    return fetchApi<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string, username: string): Promise<ApiResponse<User>> {
    return fetchApi<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });
  },

  async getProfile(): Promise<ApiResponse<User>> {
    // A single endpoint to get the current user's profile based on their session cookie
    return fetchApi<User>('/protected/profile', {
      method: 'GET',
    });
  },

  async logout(): Promise<ApiResponse<{}>> {
    return fetchApi('/auth/logout', {
      method: 'POST',
    });
  },
};