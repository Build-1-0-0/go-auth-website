// frontend/src/components/auth/AuthForm.tsx
import { useState } from 'react';
import { useAuthActions } from '@/hooks/useAuthActions';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  isLogin?: boolean;
}

export const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added for registration
  const { handleLogin, handleRegister, message } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleLogin(email, password);
      } else {
        await handleRegister(username, email, password);
      }
    } catch (err) {
      // Error handled by useAuthActions
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 fade-in">
      <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs">
        <h2 className="text-2xl font-bold text-center text-foreground">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        {message && (
          <div
            className={`text-sm p-3 rounded-xs ${
              message.type === 'error' ? 'bg-error-light text-error' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-xs bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Link
            to={isLogin ? '/register' : '/login'}
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isLogin ? 'Register' : 'Login'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;