// frontend/src/api/authService.ts
import axios, { AxiosResponse } from 'axios';
import { ApiResponse, User } from '../@types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://go-auth-website.africancontent807.workers.dev',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class AuthService {
  static async register(email: string, password: string, username: string = email.split('@')[0]): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<User> = await api.post('/auth/register', { email, password, username });
      return { data: response.data, status: response.status };
    } catch (error: any) {
      return AuthService.handleError(error);
    }
  }

  static async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<User> = await api.post('/auth/login', { email, password });
      return { data: response.data, status: response.status };
    } catch (error: any) {
      return AuthService.handleError(error);
    }
  }

  static async logout(): Promise<ApiResponse> {
    try {
      const response = await api.post('/auth/logout');
      return { status: response.status };
    } catch (error: any) {
      return AuthService.handleError(error);
    }
  }

  static async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<User> = await api.get('/auth/me');
      return { data: response.data, status: response.status };
    } catch (error: any) {
      return AuthService.handleError(error);
    }
  }

  private static handleError(error: any): ApiResponse {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data?.error || error.message,
        status: error.response?.status || 500,
      };
    }
    return {
      error: 'An unexpected error occurred',
      status: 500,
    };
  }
}