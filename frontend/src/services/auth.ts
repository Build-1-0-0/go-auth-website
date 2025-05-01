import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://your-worker.your-account.workers.dev' 
    : '/api',
  withCredentials: true
})

export const AuthService = {
  register: (email: string, password: string) => 
    api.post('/register', { email, password }),

  login: (email: string, password: string) => 
    api.post('/login', { email, password }),

  logout: () => api.post('/logout'),

  getMe: () => api.get('/me')
          }
