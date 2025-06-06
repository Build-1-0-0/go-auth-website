import { useState } from 'react'; import { Link, useNavigate } from 'react-router-dom'; import { useAuthActions } from '@/hooks/useAuthActions';

interface AuthFormProps { isLogin: boolean; }

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => { const navigate = useNavigate(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [username, setUsername] = useState(''); const [formError, setFormError] = useState<string | null>(null); const { handleLogin, handleRegister, message, isLoading } = useAuthActions();

const validateForm = (): string | null => { if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) { return 'Please enter a valid email address.'; } if (password.length < 8) { return 'Password must be at least 8 characters long.'; } if (!isLogin && username.length < 3) { return 'Username must be at least 3 characters long.'; } return null; };

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (isLoading) return;

const validationError = validateForm();
if (validationError) {
  setFormError(validationError);
  return;
}
setFormError(null);

try {
  if (isLogin) {
    await handleLogin(email, password);
  } else {
    await handleRegister(email, password, username);
    await handleLogin(email, password);
  }
  navigate('/dashboard');
} catch (err) {
  // Errors are handled by useAuthActions message
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 fade-in"> <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xs shadow-xs"> <h2 className="text-2xl font-bold text-center text-foreground"> {isLogin ? 'Login' : 'Register'} </h2>

<div role="alert" aria-live="assertive">
      {formError && (
        <div className="text-sm p-3 rounded-xs bg-error-light text-error">
          {formError}
        </div>
      )}
      {message && (
        <div
          className={`text-sm p-3 rounded-xs ${
            message.type === 'error'
              ? 'bg-error-light text-error'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={isLoading}
          className="mt-1 block w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xs shadow-xs focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-xs text-white ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-3 focus:ring-primary-dark'
        }`}
      >
        {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
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

); };

export default AuthForm;

