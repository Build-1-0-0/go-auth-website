import { Helmet } from '@dr.pogodin/react-helmet';
import AuthForm from '@/components/auth/AuthForm';
// Layout import is removed as it's no longer used directly here

const RegisterPage: React.FC = () => {
  return (
    <> {/* Using a Fragment as the root element */}
      <Helmet>
        <title>Register - MyApp</title>
        <meta name="description" content="Create a new account to access MyApp." />
      </Helmet>
      <AuthForm isLogin={false} />
    </>
  );
};

export default RegisterPage;
