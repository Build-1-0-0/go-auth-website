// frontend/src/@types/auth.ts

export interface User {
  id: string;
  email: string;
  username: string; // Add username here
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  // Add username to the register function signature
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

export interface Message {
  type: 'success' | 'error';
  text: string;
}