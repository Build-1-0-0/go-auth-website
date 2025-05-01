// src/@types/auth.ts
export interface User {
  id: string;
  email: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
  }
