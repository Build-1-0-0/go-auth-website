// src/pages/LoginPage.tsx
import { AuthForm } from '../components/auth/AuthForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="auth-page">
      <AuthForm isLogin={true} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};
