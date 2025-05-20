import { Helmet } from '@dr.pogodin/react-helmet';
import AuthForm from '@/components/auth/AuthForm';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Register - MyApp</title>
        <meta name="description" content="Create a new account to access MyApp." />
      </Helmet>
      <AuthForm isLogin={false} />
    </>
  );
};

export default RegisterPage;