// src/pages/RegisterPage.tsx
import { AuthForm } from '../components/auth/AuthForm';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className="auth-page">
      <AuthForm isLogin={false} />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};
