// frontend/src/pages/RegisterPage.tsx
import AuthForm from '@/components/auth/AuthForm';

const RegisterPage: React.FC = () => {
  return <AuthForm isLogin={false} />;
};

export default RegisterPage;